import { Theme } from "@emotion/react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Slider from "@mui/material/Slider"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import { SxProps } from "@mui/system"
import * as chroma from "chroma.ts"
import * as React from "react"
import { ReactElement, useCallback, useEffect, useRef, useState } from "react"
import {
  arrayFromFunction,
  clamp,
  DEG,
  emod,
  int,
  lerp,
  lerpInv,
  M4,
  PI,
  V,
  V3,
} from "ts3dutils"
import { GL_COLOR, Mesh, Shader, Texture, TSGLContext } from "tsgl"
import { BoundNumberField } from "../common/BoundNumberField"

import { useHashState } from "../common/useHashState"
import { FlyCameraController } from "../raymarch/FlyCameraController"
import { OrbitCameraController } from "../raymarch/OrbitCameraController"
import {
  GenericDemo,
  ReactGlCanvas,
  Renderer,
  RendererConstructor,
  RendererConstructorOptions,
  SimpleCanvasRenderer,
} from "../sdfs/SimpleCanvasRenderer"
import { PanController } from "./PanController"

const gradients = arrayFromFunction(512, () =>
  V3.polar(1, (Math.random() - 0.5) * 2 * Math.PI),
)

const initialState = {
  bandCount: 8,
  a: 0.5,
  b: 0.5,
  c: 0.5,
  cam: "0~0~0",
}
type State = typeof initialState

const perlin = (x: number, y: number, o1: boolean) => {
  const x0 = x | 0
  const x1 = x0 + 1
  const y0 = y | 0
  const y1 = y0 + 1

  const smoothstep = (x: number) => x * x * (3 - 2 * x)

  const dotGridGradient = (ix: int, iy: int, x: number, y: number) => {
    // Compute the distance vector
    const dx = x - ix
    const dy = y - iy

    const gradient = emod(gradients, ix * 59 + iy)
    //console.log(dx, dy, gradient)
    // Compute the dot-product
    return gradient.dot(new V3(dx, dy, 0))
  }
  // Interpolate between grid point gradients

  const n00 = dotGridGradient(x0, y0, x, y)
  const n10 = dotGridGradient(x1, y0, x, y)
  const ny0 = lerp(n00, n10, o1 ? smoothstep(x - x0) : x - x0)

  const n01 = dotGridGradient(x0, y1, x, y)
  const n11 = dotGridGradient(x1, y1, x, y)
  const ny1 = lerp(n01, n11, o1 ? smoothstep(x - x0) : x - x0)

  return lerp(ny0, ny1, o1 ? smoothstep(y - y0) : y - y0)
}

function makeCubicGridMesh(cylinderMesh: Mesh) {
  const cylMeshes: Mesh[] = []
  for (let x = -5; x < 5; x++) {
    for (let y = -5; y < 5; y++) {
      for (let z = -5; z < 5; z++) {
        cylMeshes.push(
          cylinderMesh.transform(M4.scale(1, 0.01, 0.01).translate(x, y, z)),
          cylinderMesh.transform(
            M4.scale(1, 0.01, 0.01)
              .rotateY(Math.PI / 2)
              .translate(x, y, z),
          ),
          cylinderMesh.transform(
            M4.scale(1, 0.01, 0.01)
              .rotateZ(Math.PI / 2)
              .translate(x, y, z),
          ),
        )
      }
    }
  }
  const [first, ...rest] = cylMeshes
  return first.concat(...rest)
}

function makeTetrahedralGridMesh(cylinderMesh: Mesh) {
  const cylMeshes: Mesh[] = []

  const SIN60 = Math.sqrt(3) / 2
  const COS60 = Math.cos(Math.PI / 3)
  // when a regular tetrahedron is viewed projectively so that two faces are
  // perpendicular to the viewer, they make an isosceles triangle with sides
  // 1, sin 60°, sin 60°. gamma is the angle between the two short sides.
  const gamma = 2 * Math.asin(1 / Math.sqrt(3))
  for (let x = -0; x < 2; x++) {
    for (let y = -0; y < 2; y++) {
      for (let z = -0; z < 1; z++) {
        const dx = x + (y % 2 === 0 ? 0 : COS60)
        cylMeshes.push(
          cylinderMesh.transform(
            M4.scale(1, 0.01, 0.01).translate(dx, y * SIN60, z * SIN60),
          ),
          cylinderMesh.transform(
            M4.scale(1, 0.01, 0.01)
              .rotateZ(Math.PI / 3)
              .translate(dx, y * SIN60, z * SIN60),
          ),
          cylinderMesh.transform(
            M4.scale(1, 0.01, 0.01)
              .rotateZ((Math.PI / 3) * 2)
              .translate(dx, y * SIN60, z * SIN60),
          ),
          cylinderMesh.transform(
            M4.scale(1, 0.01, 0.01)
              .rotateZ(Math.PI / 2)
              .rotateX((Math.PI - gamma) / 2)
              .translate(dx, y * SIN60, z * SIN60),
          ),
          cylinderMesh.transform(
            M4.scale(1, 0.01, 0.01)
              .rotateY(-(Math.PI / 3) * 2)
              .rotateX(Math.PI / 2 - gamma)
              .translate(dx, y * SIN60, z * SIN60),
          ),
          cylinderMesh.transform(
            M4.scale(1, 0.01, 0.01)
              .rotateY(-(Math.PI / 3))
              .rotateX(Math.PI / 2 - gamma)
              .translate(dx, y * SIN60, z * SIN60),
          ),
        )
      }
    }
  }
  const [first, ...rest] = cylMeshes
  return first.concat(...rest)
}

export const band = (
  minValue: number,
  maxValue: number,
  bandCount: int,
  value: number,
): number =>
  lerp(
    minValue,
    maxValue,
    Math.floor(lerpInv(minValue, maxValue, value) * 4) / (4 - 1),
  )

function noises(
  gl: TSGLContext & WebGL2RenderingContextStrict,
  colors: { background: GL_COLOR; primary: GL_COLOR; secondary: GL_COLOR },
  dynamicState: State,
) {
  let o1 = true
  const w = 512,
    h = 512
  const data = new Uint8Array(w * h)
  const tex = new Texture(w, h, {
    format: gl.RED,
    type: gl.UNSIGNED_BYTE,
    internalFormat: gl.R8,
    // filter: gl.NEAREST,
  })
  const gradientsTex = new Texture(256, 256, {
    format: gl.RG,
    type: gl.FLOAT,
    internalFormat: gl.RG32F,
    data: V3.packXY(
      arrayFromFunction(256 * 256, () =>
        V3.polar(1, (Math.random() - 0.5) * 2 * Math.PI),
      ),
    ),
  })
  const redoTex = () => {
    let min = Infinity,
      max = -Infinity
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        //data[y * w + x] = ((x + y) / (w + h - 2)) * 255
        const perl = clamp(
          (perlin(
            dynamicState.xOffset + x / dynamicState.xScale,
            dynamicState.yOffset + y / dynamicState.yScale,
            o1,
          ) +
            0.5) *
            0.8,
          0,
          1,
        )
        const v = Math.random()
        data[y * w + x] = (Math.floor(perl * 4) / (4 - 1)) * 255
        max = Math.max(max, v)
        min = Math.min(min, v)
      }
    }
    data[0] = 0
    tex.setData(data)
  }

  // const lll = M4.lookAt(V(2, -10, 5), V3.O, V3.Z).times(
  //     M4.perspective(70, 1, 0.1, 100)
  // )
  // console.log("" + llli)
  // console.log(llli.transformPoint(V(-1, -1, 1)))
  // redoTex()
  const planeMesh = Mesh.plane({ detail: 128 })
  const sphereMesh = Mesh.sphere(0)
    .computeWireframeFromFlatTrianglesClosedMesh()
    .compile()
  const cylinderMesh = Mesh.rotation(
    [V3.Y, V3.XY],
    { anchor: V3.O, dir1: V3.X },
    2 * Math.PI,
    3,
    true,
  )
  const cubicGridMesh = makeTetrahedralGridMesh(cylinderMesh)
  console.log(sphereMesh)
  // const cubeMesh = Mesh.cube()
  const shader = Shader.create<{ color: "FLOAT_VEC4"; pointSize: "FLOAT" }, {}>(
    `
      uniform mat4 ts_ModelViewProjectionMatrix;
      attribute vec4 ts_Vertex;
      uniform float pointSize;
      varying vec4 foo;
      void main() {
        foo = vec4(1.0, 1.0, 1.0, 1.0);
        gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;
        gl_PointSize = pointSize;
      }
    `,
    `
      precision highp float;
      uniform vec4 color;
      varying vec4 bar;
      void main() {
        gl_FragColor = color;
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
          discard;
        }
      }
    `,
  )

  const perlinShader2 = Shader.create<
    {
      colorPrimary: "FLOAT_VEC4"
      colorBackground: "FLOAT_VEC4"
      scale: "FLOAT_VEC2"
      bandCount: "UNSIGNED_INT"
    },
    {}
  >(
    `#version 300 es
      precision highp float;
      
      uniform mat4 ts_ModelViewProjectionMatrix;
      in vec4 ts_Vertex;
      uniform float pointSize;
      uniform vec2 scale;
      uniform vec2 offset;
      in vec3 ts_TexCoordUVQ;
      in vec2 ts_TexCoord;
      out vec3 coordUVQ;
      out float n;
      out vec2 coord;
      void main() {
        vec2 texCoordAdjusted = offset + ts_TexCoord * scale;
        n = 0.0;  
        gl_Position = ts_ModelViewProjectionMatrix * 
          (ts_Vertex + vec4(0.0, 0.0, n, 0.0));
        gl_PointSize = pointSize;
        coordUVQ = ts_TexCoordUVQ;
        coord = texCoordAdjusted;
      }
  `,
    `#version 300 es
      precision highp float;
      
      uniform sampler2D texture;
      uniform vec4 colorPrimary;
      uniform vec4 colorBackground;
      uniform int bandCount;
      in float n;
      in vec2 coord;
      out vec4 fragColor;
      void main() {
        float fraction = (n + 0.5) * 0.5;
        fragColor = mix(colorBackground, colorPrimary, fraction);
        
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
          discard;
        }
      }
    `,
  )
  const texShader = Shader.create<
    {
      colorPrimary: "FLOAT_VEC4"
      colorBackground: "FLOAT_VEC4"
      pointSize: "FLOAT"
      texture: "SAMPLER_2D"
    },
    {}
  >(
    `
      uniform mat4 ts_ModelViewProjectionMatrix;
      attribute vec4 ts_Vertex;
      uniform float pointSize;
      attribute vec3 ts_TexCoordUVQ;
      attribute vec2 ts_TexCoord;
      varying vec4 foo;
      varying vec3 coordUVQ;
      varying vec2 coord;
      void main() {
        foo = vec4(1.0, 1.0, 1.0, 1.0);
        gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;
        gl_PointSize = pointSize;
        coordUVQ = ts_TexCoordUVQ;
        coord = ts_TexCoord;
      }
    `,
    `
      precision highp float;
      uniform sampler2D texture;
      uniform vec4 colorPrimary;
      uniform vec4 colorBackground;
      varying vec4 bar;
      varying vec3 coordUVQ;
      varying vec2 coord;
      void main() {
        float fraction = texture2D(texture, coord).r;
        gl_FragColor = mix(colorBackground, colorPrimary, fraction);
        
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
          discard;
        }
      }
    `,
  )

  const viewState = {
    pos: V(0.75, 0, 1),
    lookDir: V(0, 0, -1),
  }
  const saveViewState = () => {
    localStorage.setItem(
      "viewState",
      JSON.stringify({
        pos: viewState.pos.toArray(),
        lookDir: viewState.lookDir.toArray(),
      }),
    )
  }
  const loadViewState = () => {
    if (null !== localStorage.getItem("viewState")) {
      const json = JSON.parse(localStorage.getItem("viewState")!)
      viewState.pos = V3.fromArray(json.pos)
      viewState.lookDir = V3.fromArray(json.lookDir)
    }
  }
  loadViewState()

  gl.clearColor(...colors.background)
  gl.cullFace(gl.BACK)

  // setup camera
  const cam1 = () => {
    gl.matrixMode(gl.PROJECTION)
    gl.loadIdentity()
    gl.perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000)
    gl.lookAt(V(0, 0.5, 2.2), V3.O, V3.Y)
    gl.matrixMode(gl.MODELVIEW)
  }
  const cam2 = () => {
    gl.matrixMode(gl.PROJECTION)
    gl.loadIdentity()
    gl.perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000)
    gl.lookAt(V(0.75, 0, 1), V(0.75, 0, 0), V3.Y)
    gl.matrixMode(gl.MODELVIEW)
  }
  cam2()
  gl.pointSize(10)

  //gl.enable(gl.CULL_FACE)
  gl.disable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  const pressedKeys: { [key: string]: boolean | undefined } = {}
  console.log(gl.canvas)
  gl.canvas.contentEditable = "true" // make canvas focusable
  gl.canvas.focus()
  gl.canvas.onkeydown = function (e) {
    pressedKeys[e.key] = true

    if ("o" === e.key) {
      o1 = !o1
      redoTex()
    }
    if ("2" === e.key) {
      cam2()
    }
    if ("1" === e.key) {
      cam1()
    }
  }
  gl.canvas.onkeypress = function (e) {
    const dir = new V3(0, 0, 0)
  }
  gl.canvas.onkeyup = function (e) {
    pressedKeys[e.key] = false
  }
  let lastPos = V3.O
  let rot = M4.IDENTITY
  const zRot = 0
  const yRot = 0
  gl.canvas.onmousemove2 = function (e) {
    const pagePos = V(e.pageX, e.pageY)
    const delta = lastPos.to(pagePos)
    if (e.buttons & 1) {
      // zRot -= delta.x * 0.25 * DEG
      rot = rot.rotateZ(delta.x * 0.25 * DEG)
      rot = rot.rotateX(delta.y * 0.25 * DEG)
      // rot = rot.rotate(V3.O, rot.X, delta.y * 0.25 * DEG)
      // yRot = clamp(yRot - delta.y * 0.25 * DEG, -85 * DEG, 85 * DEG)
    }
    lastPos = pagePos
  }
  gl.canvas.onmousemove = function (e) {
    const pagePos = V(e.pageX, e.pageY)
    const delta = lastPos.to(pagePos)
    if (e.buttons & 1) {
      // zRot -= delta.x * 0.25 * DEG
      const rot = M4.rotateY(-delta.x * 0.25 * DEG).rotateX(
        -delta.y * 0.25 * DEG,
      )
      viewState.lookDir = rot.transformVector(viewState.lookDir).unit()
      // rot = rot.rotate(V3.O, rot.X, delta.y * 0.25 * DEG)
      // yRot = clamp(yRot - delta.y * 0.25 * DEG, -85 * DEG, 85 * DEG)
    }
    lastPos = pagePos
  }
  let outputllll = false
  return Object.assign(
    gl.animate(function (abs, _diff) {
      const speed = new V3(
        +!!pressedKeys.w - +!!pressedKeys.s,
        +!!pressedKeys.a - +!!pressedKeys.d,
        +!!pressedKeys.e - +!!pressedKeys.q + +!!pressedKeys[" "],
      ).times(0.05)
      if (!speed.likeO()) {
        const lookDirZ = viewState.lookDir

        viewState.pos = viewState.pos.plus(
          M4.forSys(lookDirZ, V3.Y.cross(lookDirZ).unit()).transformVector(
            speed,
          ),
        )
        saveViewState()
      }
      gl.matrixMode(gl.PROJECTION)
      gl.loadIdentity()
      gl.perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000)
      gl.lookAt(viewState.pos, viewState.pos.plus(viewState.lookDir), V3.Y)
      gl.matrixMode(gl.MODELVIEW)

      // const angleDeg = (abs / 1000) * 10
      // const angleDeg = 0
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.loadIdentity()
      // gl.rotate(yRot / DEG, 0, 1, 0)
      // gl.rotate(-zRot / DEG, 0, 0, 1)
      //gl.multMatrix(rot)

      gl.pushMatrix()

      gl.translate(0.25, -0.5, 0)
      // shader
      //   .uniforms({ color: colors.primary, pointSize: 12 })
      //   .draw(planeMesh, gl.LINES)
      tex.bind(0)
      gradientsTex.bind(1)

      const f = (abs / 1000 / 40) % 1
      //        vec3 spherepos = fromPolar(mix(-6., 6., f), abs(mix(-10., 10., f)) + PI / 2., 0.);
      const campos = (f: number) =>
        V3.polar(lerp(-6, 6, f), Math.abs(lerp(-10, 10, f)) + PI / 2, 0.5)

      const lll = M4.product(
        M4.perspective(70, 1, 0.1, 50),
        M4.lookAt(
          campos(f),
          campos(f + 0.005)
            .unit()
            .plus(V(0, 0, 0.2)),
          V3.Z,
        ),
        // M4.lookAt(V(10, 0, 10), V3.O, V3.Z),
        // M4.rotateZ(abs / 10_000),
      )
      const llli = lll.inversed()
      if (!outputllll) {
        console.log("" + lll)
        console.log(lll.transformPoint(V3.XYZ.negated()))
        console.log(lll.transformPoint(V3.XYZ))
        outputllll = true
      }

      // shader.uniforms({ color: colors.secondary }).draw(cubicGridMesh)

      //shader
      // .uniforms({
      //  color: chroma.css("grey").gl(),
      // pointSize: 10,
      // })
      //.drawBuffers(pointMesh.vertexBuffers, undefined, gl.POINTS)
      //shader.uniforms({ color: [1, 1, 0, 1] }).draw(pointMesh, gl.LINES)
      //shader.uniforms({ color: [0, 0, 0, 0.5] }).draw(pointMesh,
      // gl.TRIANGLES) gl.pushMatrix() gl.translate(30, 0, 0)
    }),
    {
      redoTex,
    },
  )
}

export class PanningCanvasRenderer extends SimpleCanvasRenderer {
  panController: PanController

  constructor(
    fragShader: () => string,
    canvas: HTMLCanvasElement,
    options: RendererConstructorOptions & { onCamChange?: (m: M4) => void },
  ) {
    super(fragShader, canvas, options)
    canvas.tabIndex = 0
    this.panController = new PanController(M4.identity(), options.onCamChange)
    this.panController.registerListeners(canvas)
  }

  protected uniforms() {
    return {
      modelView: this.panController.getTransform(),
      viewModel: this.panController.getTransform().inversed(),
    }
  }
  protected setCam(state: M4) {
    this.panController.setState(state)
  }

  public render(abs: number) {
    this.panController.tick()
    super.render(abs)
  }
}
const ShadertoyLikeDemo = ({
  frag,
  sx,
  animate,
  state,
}: {
  frag: string
  sx: SxProps<Theme>
  animate: boolean
  state: {}
  replacer?: string
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Renderer: RendererConstructor = useCallback(
    class extends PanningCanvasRenderer implements Renderer {
      ["constructor"]: RendererConstructor
      constructor(
        canvas: HTMLCanvasElement,
        options: RendererConstructorOptions,
      ) {
        super(() => require("./" + frag + ".frag"), canvas, options)
      }
    },
    [frag],
  )

  return (
    <GenericDemo sx={sx} Renderer={Renderer} animate={animate} state={state} />
  )
}
export default (): ReactElement => {
  const [state, setState] = useHashState(initialState)
  const [fps, setFps] = useState(0)
  const setStatePartial = useCallback(
    (o) => setState((s) => ({ ...s, ...o })),
    [setState],
  )
  const setCam = useCallback(
    ({ cam }: { cam: string }) => {
      const m = PanController.fromShortString(cam)
      setStatePartial({ cam: PanController.toShortString(m) })
    },
    [setStatePartial],
  )

  const simplexRef = useRef<any>()
  useEffect(() => {
    state.cam &&
      simplexRef.current?.setCam?.(PanController.fromShortString(state.cam))
  }, [])

  return (
    <Grid container style={{ height: "99%" }} spacing={2} padding={2}>
      <Grid container item sm={9} spacing={2}>
        {[
          "tree",
          // "mengerSlices",
          // "magic",
          // sphereOpenSimplex,
          // "simplex",
          // "test3",
          // "test",
          // "julias",
          // "test2",
        ].map((frag, i) => (
          <Grid item xs={12} key={i}>
            <ShadertoyLikeDemo
              sx={{ height: 400 }}
              animate={true}
              state={state}
              frag={frag}
              rendererRef={simplexRef}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        item
        xs={12}
        md={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "stretch",
          // "& > *": { margin: 1 },
          gap: 2,
        }}
      >
        <Card>
          <CardContent>
            Test with various noise generation functions.
          </CardContent>
        </Card>
        <BoundNumberField {...{ state, setStatePartial }} prop="bandCount" />
        <Slider
          value={state.a}
          onChange={(e, a) => setStatePartial({ a })}
          min={0}
          max={1}
          step={0.01}
        />
        <Slider
          value={state.b}
          onChange={(e, b) => setStatePartial({ b })}
          min={0}
          max={1}
          step={0.01}
        />
        <Slider
          value={state.c}
          onChange={(e, c) => setStatePartial({ c })}
          min={0}
          max={1}
          step={0.01}
        />
        {state.a}
        <div>fps: {fps}</div>
      </Grid>
    </Grid>
  )
}
