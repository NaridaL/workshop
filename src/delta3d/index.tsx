import { Chromable, w3cx11 } from "chroma.ts"
import * as chroma from "chroma.ts"
import * as React from "react"
import { useEffect, useRef } from "react"
import {
  arrayFromFunction,
  arraySwap,
  assert,
  bagRemoveIndex,
  clamp,
  clear,
  DEG,
  emod,
  indexWithMax,
  int,
  lerp,
  M4,
  PI,
  removeIndexes,
  TAU,
  Tuple3,
  unique,
  V,
  V3,
  withMax,
} from "ts3dutils"
import { Buffer, Mesh, Shader, Texture, TSGLContext } from "tsgl"

const hfcDefault = chroma.color("blue").gl()

class CyclicVertexBuffer {
  public pos = 0

  public data: Float32Array

  public lastUploaded = 0

  public readonly buffer: WebGLBuffer

  public constructor(
    public readonly gl: WebGL2RenderingContextStrict,
    public capacity: int,
  ) {
    this.buffer = gl.createBuffer()!
    this.data = new Float32Array(3 * capacity)
  }

  public push(v: V3) {
    this.data[this.pos++] = v.x
    this.data[this.pos++] = v.y
    this.data[this.pos++] = v.z
  }

  public upload() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.data, this.gl.DYNAMIC_DRAW)
  }
}

class SGN {
  children: SGN[] = []
  parent!: SGN
  gimbal?: boolean
  public constructor(
    public transform: M4 = M4.IDENTITY,
    public mesh?: Mesh | undefined,
    public color?: ReturnType<chroma.Color["gl"]> | undefined,
    ...children: SGN[]
  ) {
    children.forEach((c) => this.add(c))
  }

  public add(...nodes: SGN[]): void {
    for (const node of nodes) {
      this.children.push(node)
      node.parent = this
    }
  }

  public getTransform(sgn: SGN): M4 {
    let result = sgn.transform
    while (sgn.parent != this) {
      sgn = sgn.parent
      result = sgn.transform.times(result)
    }
    return result
  }

  public withGimbal() {
    this.gimbal = true
    return this
  }
}

const tree = new SGN()

const sleep = (ms: int) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms))

const rodLength = 12

function posToZOffsets(zBases: [V3, V3, V3], p: V3): [number, number, number] {
  return zBases.map((zBase) => {
    const xyD = p.xy().distanceTo(zBase)
    return p.z + Math.sqrt(rodLength * rodLength - xyD * xyD) + 1
  })
}

function trilaterate(
  c1: V3,
  r1: number,
  c2: V3,
  r2: number,
  c3: V3,
  r3: number,
) {
  const eX = c1.to(c2).unit()
  const eY = c1.to(c3).rejectedFrom1(eX).unit()
  const sys = M4.forSys(eX, eY, undefined, c1)
  const d = c1.to(c2).length()
  const i = c1.to(c3).dot(eX)
  const j = c1.to(c3).dot(eY)
  const x = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
  const y = (r1 * r1 - r3 * r3 - 2 * i * x + i * i + j * j) / (2 * j)
  const pSys = V(x, y, Math.sqrt(r1 * r1 - x * x - y * y))
  return sys.transformPoint(pSys)
}

export function quickhull(gl: TSGLContext) {
  const viewState = {
    pos: V(0.75, 0, 1),
    lookDir: V(0, 0, -1),
    axisPoss: [0, 0, 0],
  }
  const saveViewState = () => {
    localStorage.setItem(
      "viewState",
      JSON.stringify({
        pos: viewState.pos.toArray(),
        lookDir: viewState.lookDir.toArray(),
        axisPoss: viewState.axisPoss,
      }),
    )
  }
  const loadViewState = () => {
    if (null != localStorage.getItem("viewState")) {
      const json = JSON.parse(localStorage.getItem("viewState")!)
      viewState.pos = V3.fromArray(json.pos)
      viewState.lookDir = V3.fromArray(json.lookDir)
      viewState.axisPoss = json.axisPoss || viewState.axisPoss
    }
  }
  loadViewState()

  const cubeMesh = Mesh.cube()
  console.log("cubeMesh", cubeMesh)
  const pointerMesh = Mesh.rotation(
    [V3.O, V(1, 0, 1)],
    { anchor: V3.O, dir1: V3.Z },
    TAU,
    16,
  )
  const planeMesh = Mesh.plane()
  const sphereMesh = Mesh.sphere(1)
    .computeWireframeFromFlatTrianglesClosedMesh()
    .compile()
  const spiralMesh = Mesh.spiral(
    [V(-0.1, 1), V(0, 1.1), V(0.1, 1, 0)],
    { anchor: V3.O, dir1: V3.X },
    TAU * 320,
    16 * 320,
    0.2,
  )
    .computeNormalsFromFlatTriangles()
    .compile()
  console.log("spiralMesh", spiralMesh)
  const cylinderMesh = Mesh.rotation(
    [V3.Y, V3.XY],
    { anchor: V3.O, dir1: V3.X },
    2 * Math.PI,
    16,
    true,
  )
  const platformMesh = Mesh.rotation(
    [V3.O, V3.X, V(1, 0, 1), V3.Z],
    {
      anchor: V3.O,
      dir1: V3.Z,
    },
    PI * 2,
    3,
  )
  const trackLine = new Buffer(gl.ARRAY_BUFFER, Float32Array)
  let pos = 0
  const jointColors = chroma.scale("yellow", "black").colors(6, "gl")
  console.log(sphereMesh)
  const zAssemblies: SGN[] = []
  const spindles: SGN[] = []
  const zAssemblyJoinPoints: SGN[] = []
  const platformJoinPoints: SGN[] = []
  const joints: SGN[] = []
  let platform!: SGN
  const bars: SGN[] = []
  tree.add(
    new SGN(
      M4.translate(V(-0.5, -0.5, -1)).scale(30, 30, 1),
      cubeMesh,
      chroma.css("lightgreen").gl(),
    ).withGimbal(),
    (platform = new SGN(
      M4.translate(0, 0, 5),
      undefined,
      undefined,
      new SGN(
        M4.scale(3, 3, 1).rotateZ(Math.PI / 3),
        platformMesh,
        chroma.css("orange").gl(),
      ),
      new SGN(M4.translate(0, 0, -1), pointerMesh, chroma.css("silver").gl()),
      ...[0, 1, 2].flatMap((i) =>
        [0, 1].map(
          (j) =>
            (platformJoinPoints[i * 2 + j] = new SGN(
              M4.scale(0.2)
                .translate(1.5, j ? 1.5 : -1.5, 0.5)
                .rotateZ(TAU * ((1 / 3) * i)),
              sphereMesh,
              jointColors[i * 2 + j],
            )),
        ),
      ),
    )),
    ...[0, 1, 2, 3, 4, 5].map(
      (i) => (joints[i] = new SGN(undefined, cylinderMesh, jointColors[i])),
    ),
    ...[0, 1, 2].map(
      (i) =>
        new SGN(
          M4.translate(10, 0, 0).rotateZ(((PI * 2) / 3) * i),
          undefined,
          undefined,

          (spindles[i] = new SGN(
            M4.rotateY(-PI / 2),
            spiralMesh,
            chroma.css("green").gl(),
          )),
          new SGN(
            M4.scale(0.4).translate(-2.5, 0, 0),
            cubeMesh,
            chroma.css("cyan").gl(),
          ),
          (zAssemblies[i] = new SGN(
            M4.translate(0, 0, viewState.axisPoss[i]),
            undefined,
            undefined,

            new SGN(
              M4.translate(-0.5, -0.5).scale(2, 3, 1),
              cubeMesh,
              chroma.css("blue").gl(),
            ),
            ...[0, 1].map(
              (j) =>
                (zAssemblyJoinPoints[i * 2 + j] = new SGN(
                  M4.scale(0.2).translate(-1, j ? 1.5 : -1.5, 0.5),
                  sphereMesh,
                  jointColors[i * 2 + j],
                )),
            ),
          )),
        ),
    ),
  )
  const zBases = [0, 1, 2].map((i) =>
    tree.getTransform(zAssemblies[i]).transformPoint(V(-2.5, 0, 0)).xy(),
  ) as [V3, V3, V3]
  function fixJoints() {
    [0, 1, 2].forEach((i) => {
      zAssemblies[i].transform = M4.translate(0, 0, viewState.axisPoss[i])
      spindles[i].transform = M4.scale(1, 0.5, 0.5)
        .rotateX((TAU * -viewState.axisPoss[i]) / 0.2)
        .rotateY(-PI / 2)
    })

    const [p1, p2, p3] = [0, 1, 2].map((i) =>
      tree.getTransform(zAssemblies[i]).transformPoint(V(-2.5, 0, 0)),
    )
    const platCenter = trilaterate(p2, rodLength, p1, rodLength, p3, rodLength)
    platform.transform = M4.translate(platCenter)
    for (let i = 0; i < 6; i++) {
      const a = tree.getTransform(zAssemblyJoinPoints[i]).O
      const b = tree.getTransform(platformJoinPoints[i]).O
      joints[i].transform = M4.scale(rodLength, 0.1, 0.1)
        .rotateAB(V3.X, a.to(b))
        .translate(a)
    }
  }
  viewState.axisPoss = posToZOffsets(zBases, V3.O)
  fixJoints()
  // const cubeMesh = Mesh.cube()
  const shader = Shader.create<
    {
      color: "FLOAT_VEC4"
      pointSize: "FLOAT"
      texture: "SAMPLER_2D"
      lightPos: "FLOAT_VEC3"
    },
    {}
  >(
    `
	uniform mat4 ts_ModelViewMatrix;
	uniform mat3 ts_NormalMatrix;
	uniform mat4 ts_ModelViewProjectionMatrix;
	uniform float pointSize;

	attribute vec4 ts_Vertex;
	attribute vec3 ts_Normal;

	varying vec3 coordUVQ;
	varying vec2 coord;
	varying vec3 normal;
	varying vec3 position;

	void main() {

	  gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;
	  gl_PointSize = pointSize;

	  normal =ts_Normal;
	  vec4 position4 = ts_ModelViewMatrix * ts_Vertex;
	  position = position4.xyz;
	}
  `,
    `
	precision highp float;

	uniform sampler2D texture;
	uniform vec3 lightPos;
	uniform vec4 color;

	varying vec3 coordUVQ;
	varying vec2 coord;
	varying vec3 normal;
	varying vec3 position;

	void main() {
		vec3 normal1 = normalize(normal);
		vec3 lightPos = vec3(1000, 2000, 4000);
		vec3 lightDir = normalize(position.xyz - lightPos);
        float uMaterialShininess = 256.0;
		float lightIntensity = 0.2 + 0.8 * max(0.0, -dot(lightDir, normal1));
		gl_FragColor = vec4(normal,1.0);
		gl_FragColor = vec4(vec3(color) * lightIntensity, 1);
	}
	  `,
  )

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
  const pressedKeys: { [key: string]: boolean } = {}
  console.log(gl.canvas)
  gl.canvas.contentEditable = "true" // make canvas focusable
  gl.canvas.focus()
  gl.canvas.onkeydown = function (e) {
    pressedKeys[e.key] = true

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

  function renderNode(sgn: SGN) {
    gl.pushMatrix()
    gl.multMatrix(sgn.transform)

    if (sgn.gimbal) {
      gl.drawGimbal(0.1)
    }
    if (sgn.mesh) {
      shader
        .uniforms({
          color: sgn.color!,
          pointSize: 12,
          lightPos: V(100, 0, 100).toLength(-1),
        })
        .draw(sgn.mesh)
    }
    sgn.children.forEach(renderNode)
    gl.popMatrix()
  }

  function keyDir(plusKey: string, minusKey: string): number {
    return +!!pressedKeys[plusKey] - +!!pressedKeys[minusKey]
  }
  const keys = [
    ["u", "j"],
    ["i", "k"],
    ["o", "l"],
  ] as [string, string][]
  trackLine.data[pos++] = V3.O
  trackLine.data[pos++] = V3.O
  return gl.animate(function (abs, _diff) {
    const targetPos = M4.rotateX(70 * DEG)
      .translate(0, 0, 3)
      .transformPoint(V3.polar(2, abs / 500, 1 + abs / 100000))
    viewState.axisPoss = posToZOffsets(zBases, targetPos)
    trackLine.data[pos++] = targetPos
    trackLine.compile()
    fixJoints()
    for (let i = 0; i < 3; i++) {
      const speed = 0.1 * keyDir(...keys[i])
      if (speed !== 0) {
        viewState.axisPoss[i] += speed
        fixJoints()
        saveViewState()
      }
    }
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
    gl.rotate(-90, 1, 0, 0)
    // gl.rotate(yRot / DEG, 0, 1, 0)
    // gl.rotate(-zRot / DEG, 0, 0, 1)
    //gl.multMatrix(rot)
    gl.drawGimbal(0.1)

    renderNode(tree)
    shader
      .uniforms({ color: chroma.css("red").gl() })
      .drawBuffers({ ts_Vertex: trackLine }, undefined, gl.LINE_STRIP)

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
