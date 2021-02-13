import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Slider from "@material-ui/core/Slider"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import * as chroma from "chroma.ts"
import * as React from "react"
import { ReactElement, useCallback, useEffect, useRef } from "react"
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

import { useHashState } from "../paperBox1/useHashState"
import { buildShaders } from "./shaders"

const gradients = arrayFromFunction(512, () =>
  V3.polar(1, (Math.random() - 0.5) * 2 * Math.PI),
)

const initialState = {
  xOffset: 0,
  yOffset: 0,
  xScale: 64,
  yScale: 64,
  bandCount: 2,
  a: 0.5,
  b: 0.5,
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
      colorBg: "FLOAT_VEC4"
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
      uniform vec4 colorBg;
      uniform int bandCount;
      in float n;
      in vec2 coord;
      out vec4 fragColor;
      void main() {
        float fraction = (n + 0.5) * 0.5;
        fragColor = mix(colorBg, colorPrimary, fraction);
        
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
          discard;
        }
      }
    `,
  )
  let shaders = buildShaders()
  module.hot &&
    module.hot.accept("./shaders", () => {
      console.clear()
      try {
        shaders = buildShaders()
      } catch (e) {
        console.error(e)
      }
    })
  const texShader = Shader.create<
    {
      colorPrimary: "FLOAT_VEC4"
      colorBg: "FLOAT_VEC4"
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
      uniform vec4 colorBg;
      varying vec4 bar;
      varying vec3 coordUVQ;
      varying vec2 coord;
      void main() {
        float fraction = texture2D(texture, coord).r;
        gl_FragColor = mix(colorBg, colorPrimary, fraction);
        
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
      shaders.raymarch
        .uniforms({
          a: dynamicState.a,
          b: dynamicState.b,
          colorPrimary: colors.primary,
          colorSecondary: colors.secondary,
          colorBg: colors.background,
          scale: [dynamicState.xScale, dynamicState.yScale],
          offset: [dynamicState.xOffset, dynamicState.yOffset],
          bandCount: dynamicState.bandCount,
          highResTimeStamp: abs,
          secs: abs / 1000,
          gradients: 1,
          //campos,
          lll,
          llli,
        })
        .draw(planeMesh)

      gl.popMatrix()
      gl.pushMatrix()

      gl.translate(-0.75, 0, 0)
      gl.scale(0.5)
      gl.rotate(-90, 1, 0, 0)
      shaders.raymarch
        .uniforms({
          colorPrimary: colors.primary,
          colorBg: colors.background,
          pointSize: 12,
          texture: 0,
        })
        .draw(sphereMesh)
      shader
        .uniforms({ color: colors.primary, pointSize: 12 })
        .draw(sphereMesh, gl.LINES)
      gl.popMatrix()

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

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: 256,
    padding: theme.spacing(1),
    alignItems: "stretch",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 0,
    paddingTop: "100%", // 1:1
  },
}))

function BoundNumberField<T extends string>({
  state,
  prop,
  setStatePartial,
  ...props
}: {
  state: Record<T, number>
  prop: T
  setStatePartial: (newPartialState: Record<T, number>) => void
}) {
  return (
    <TextField
      variant="outlined"
      size="small"
      type="number"
      value={state[prop]}
      onChange={(e) =>
        setStatePartial({ [prop]: +e.target.value } as Record<T, number>)
      }
      label={prop}
      {...props}
    />
  )
}

export default (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [state, setState] = useHashState(initialState)
  const setStatePartial = useCallback(
    (o) => setState((s) => ({ ...s, ...o })),
    [setState],
  )
  const redoTex = useRef<() => void>()
  const fluid = useRef(Object.assign({}, state))

  const classes = useStyles()
  const theme = useTheme()
  useEffect(() => {
    const tsgl = TSGLContext.create({ canvas: canvasRef.current! })
    // tsgl.fixCanvasRes()
    //tsgl.addResizeListener()
    noises(
      tsgl,
      {
        background: chroma.css(theme.palette.background.default).gl(),
        primary: chroma.css(theme.palette.primary.main).gl(),
        secondary: chroma.css(theme.palette.secondary.main).gl(),
      },
      fluid.current,
    )
  }, [
    theme.palette.background.default,
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ])

  useEffect(() => {
    Object.assign(fluid.current, state)
  }, [state])

  return (
    <Grid container style={{ height: "99%" }}>
      <Grid item xs={12} md={9}>
        <div style={{ height: "100%" }}>
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%" }}
            width={128}
            height={128}
            tabIndex={0}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={3} className={classes.sidebar}>
        <Card>
          <CardContent>
            Test with various noise generation functions.
          </CardContent>
        </Card>
        <BoundNumberField {...{ state, setStatePartial }} prop="xOffset" />
        <BoundNumberField {...{ state, setStatePartial }} prop="yOffset" />
        <BoundNumberField {...{ state, setStatePartial }} prop="xScale" />
        <BoundNumberField {...{ state, setStatePartial }} prop="yScale" />
        <BoundNumberField {...{ state, setStatePartial }} prop="bandCount" />
        <div>
          <Slider
            value={state.a}
            onChange={(e, a) => setStatePartial({ a })}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <div>
          <Slider
            value={state.b}
            onChange={(e, b) => setStatePartial({ b })}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        {state.a}
      </Grid>
    </Grid>
  )
}

if (module.hot) {
  module.hot.accept("./shaders")
}
