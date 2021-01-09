import {
  V,
  V3,
  arrayFromFunction,
  lerp,
  int,
  bagRemoveIndex,
  indexWithMax,
  Tuple3,
  unique,
  withMax,
  arraySwap,
  clear,
  DEG,
  clamp,
  M4,
  removeIndexes,
  emod,
} from "ts3dutils"
import { Mesh, Shader, Texture, TSGLContext } from "tsgl"
import { Chromable, w3cx11 } from "chroma.ts"
import * as chroma from "chroma.ts"
import * as React from "react"
import { useEffect, useRef } from "react"

const hfcDefault = chroma.color("blue").gl()

const gradients = arrayFromFunction(512, (i) =>
  V3.polar(1, (Math.random() - 0.5) * 2 * Math.PI),
)

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

const sleep = (ms: int) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms))
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
  // when a regular tetrahedron is viewed projectively so that two faces are perpendicular
  // to the viewer, they make an isosceles triangle with sides 1, sin 60°, sin 60°.
  // gamma is the angle between the two short sides.
  const gamma = 2 * Math.asin(1 / Math.sqrt(3))
  for (let x = -0; x < 2; x++) {
    for (let y = -0; y < 2; y++) {
      for (let z = -0; z < 1; z++) {
        const dx = x + (y % 2 == 0 ? 0 : COS60)
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

export function quickhull(gl: TSGLContext & WebGL2RenderingContextStrict) {
  let o1 = true
  const w = 1024,
    h = 1024
  const data = new Uint8Array(w * h)
  const tex = new Texture(w, h, {
    format: gl.RED,
    type: gl.UNSIGNED_BYTE,
    internalFormat: gl.R8,
    // filter: gl.NEAREST,
  })
  const redoTex = () => {
    let min = Infinity,
      max = -Infinity
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        //data[y * w + x] = ((x + y) / (w + h - 2)) * 255
        const perl = clamp((perlin(x / 64, y / 64, o1) + 0.5) * 0.8, 0, 1)
        const v = Math.random()
        data[y * w + x] = 0.2 < perl && perl < 0.3 ? 0 : 254
        max = Math.max(max, v)
        min = Math.min(min, v)
      }
    }
    data[0] = 0
    console.log(data)
    tex.setData(data)
    console.log("min,max", min, max)
  }
  redoTex()
  const planeMesh = Mesh.plane()
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
  const texShader = Shader.create<
    { color: "FLOAT_VEC4"; pointSize: "FLOAT"; texture: "SAMPLER_2D" },
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
	  uniform vec4 color;
	  varying vec4 bar;
	  varying vec3 coordUVQ;
	  varying vec2 coord;
	  void main() {
		gl_FragColor = color;
		gl_FragColor = texture2D(texture, coordUVQ.xy / coordUVQ.z).rrra
			+ texture2D(texture, coord).rrra;
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
    if (null != localStorage.getItem("viewState")) {
      const json = JSON.parse(localStorage.getItem("viewState")!)
      viewState.pos = V3.fromArray(json.pos)
      viewState.lookDir = V3.fromArray(json.lookDir)
    }
  }
  loadViewState()

  gl.clearColor(1, 1, 1, 0)
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

  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  let pressedKeys: { [key: string]: boolean } = {}
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
  let zRot: number = 0
  let yRot: number = 0
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

  return gl.animate(function (abs, _diff) {
    const speed = new V3(
      +!!pressedKeys.w - +!!pressedKeys.s,
      +!!pressedKeys.a - +!!pressedKeys.d,
      +!!pressedKeys.e - +!!pressedKeys.q + +!!pressedKeys[" "],
    ).times(0.05)
    if (!speed.likeO()) {
      const lookDirZ = viewState.lookDir

      viewState.pos = viewState.pos.plus(
        M4.forSys(lookDirZ, V3.Y.cross(lookDirZ).unit()).transformVector(speed),
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
    shader
      .uniforms({ color: chroma.css("red").gl(), pointSize: 12 })
      .draw(planeMesh, gl.LINES)
    tex.bind(0)
    texShader
      .uniforms({ color: chroma.css("red").gl(), pointSize: 12, texture: 0 })
      .draw(planeMesh)

    gl.popMatrix()
    gl.pushMatrix()

    gl.translate(-0.75, 0, 0)
    gl.scale(0.5)
    gl.rotate(-90, 1, 0, 0)
    texShader
      .uniforms({ color: chroma.css("red").gl(), pointSize: 12, texture: 0 })
      .draw(sphereMesh)
    shader
      .uniforms({ color: chroma.css("red").gl(), pointSize: 12 })
      .draw(sphereMesh, gl.LINES)
    gl.popMatrix()

    shader.uniforms({ color: chroma.css("blue").gl() }).draw(cubicGridMesh)

    //shader
    // .uniforms({
    //  color: chroma.css("grey").gl(),
    // pointSize: 10,
    // })
    //.drawBuffers(pointMesh.vertexBuffers, undefined, gl.POINTS)
    //shader.uniforms({ color: [1, 1, 0, 1] }).draw(pointMesh, gl.LINES)
    //shader.uniforms({ color: [0, 0, 0, 0.5] }).draw(pointMesh, gl.TRIANGLES)
    // gl.pushMatrix()
    //gl.translate(30, 0, 0)
  })
}

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const tsgl = TSGLContext.create({ canvas: canvasRef.current! })
    tsgl.fixCanvasRes()
    tsgl.addResizeListener()
    quickhull(tsgl)
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <canvas ref={canvasRef} style={{ flexGrow: 1 }} tabIndex={0}></canvas>
    </div>
  )
}
