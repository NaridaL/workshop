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
} from "ts3dutils"
import { Mesh, Shader, Texture, TSGLContext } from "tsgl"
import { Chromable, w3cx11 } from "chroma.ts"
import * as chroma from "chroma.ts"
import * as React from "react"
import { useEffect, useRef } from "react"

// export function text(text: string, size: number, depth: number = 1, font: opentype.Font = defaultFont) {

//   const path = font.getPath(text, 0, 0, size)
//   const subpaths: opentype.PathCommand[][] = []
//   path.commands.forEach(c => {
//     if (c.type == 'M') {
//       subpaths.push([])
//     }
//     subpaths.last.push(c)
//   })
//   const loops = subpaths.map(sp => {
//     const path = new opentype.Path()
//     path.commands = sp
//     const loop = Edge.reversePath(Edge.pathFromSVG(path.toPathData(13))).map(e => e.mirrorY())
//     // assert(Edge.isLoop(loop))
//     return loop
//   })
//   // const faces = Face.assembleFacesFromLoops(loops, new PlaneSurface(P3.XY), PlaneFace as any)
//   // const generator = callsce('B2T.text', text, size, depth)
//   // return BRep.join(faces.map(face => B2T.extrudeFace(face as PlaneFace, V(0, 0, -depth))), generator)
// }

function distanceAboveTriangle(a: V3, b: V3, c: V3, x: V3) {
  const abcNormal = a.to(b).cross(a.to(c))
  return a.to(x).dot(abcNormal)
}
function filterIndexes<T>(
  arr: T[],
  test: (x: T, i: int, arr: T[]) => boolean,
): int[] {
  const result = []
  for (let i = 0; i < arr.length; i++) if (test(arr[i], i, arr)) result.push(i)
  return result
}
type Edge = [int, int]

function edgeEqual(e: Edge, j: Edge) {
  return (e[0] === j[0] && e[1] === j[1]) || (e[0] === j[1] && e[1] === j[0])
}

function index(points: V3[]): int[] {
  const [a, b, c, d] = points
  const facets: { triangle: Tuple3<number>; pointsAboveIndexes: int[] }[] = []
  // height of point "above" the facet i
  function height(i: int, x: V3) {
    const [ai, bi, ci] = facets[i].triangle
    return distanceAboveTriangle(points[ai], points[bi], points[ci], x)
  }
  facets.push({ triangle: [0, 1, 2], pointsAboveIndexes: [] })
  facets.push({ triangle: [1, 0, 3], pointsAboveIndexes: [] })
  facets.push({ triangle: [2, 1, 3], pointsAboveIndexes: [] })
  facets.push({ triangle: [0, 2, 3], pointsAboveIndexes: [] })
  console.log("glug", height(0, points[3]))
  if (height(0, points[3]) > 0)
    facets.forEach((f) => arraySwap(f.triangle, 0, 1))
  console.log("glug", height(0, points[3]))
  for (let i = 0; i < 4; i++) {
    facets[i].pointsAboveIndexes = filterIndexes(
      points,
      (x) => height(i, x) > 0,
    )
  }
  for (let fi = 0; fi < facets.length; fi++) {
    const facet = facets[fi]
    console.log("triangle", fi, "pointsAbove", facet.pointsAboveIndexes.length)
    if (0 === facet.pointsAboveIndexes.length) continue
    const highestPointIndex = withMax(facet.pointsAboveIndexes, (pi) => {
      const p = points[pi]
      return height(fi, p)
    })!
    const highestPoint = points[highestPointIndex]
    const visibleTriIndexes = filterIndexes(
      facets,
      (f, i) => height(i, highestPoint) > 0,
    )
    const horizonRidges: Edge[] = []
    for (const visibleTriIndex of visibleTriIndexes) {
      const addOrRemoveEdge = (e: Edge) => {
        const existingEdgeIndex = horizonRidges.findIndex((e2) =>
          edgeEqual(e2, e),
        )
        if (-1 === existingEdgeIndex) {
          horizonRidges.push(e)
        } else {
          bagRemoveIndex(horizonRidges, existingEdgeIndex)
        }
      }
      addOrRemoveEdge([
        facets[visibleTriIndex].triangle[0],
        facets[visibleTriIndex].triangle[1],
      ])
      addOrRemoveEdge([
        facets[visibleTriIndex].triangle[1],
        facets[visibleTriIndex].triangle[2],
      ])
      addOrRemoveEdge([
        facets[visibleTriIndex].triangle[2],
        facets[visibleTriIndex].triangle[0],
      ])
    }
    // create new triangles with "pointsAbove" arrays
    for (const horRidge of horizonRidges) {
      const newTriangleIndex = facets.length
      facets.push({
        triangle: [highestPointIndex, horRidge[0], horRidge[1]],
        pointsAboveIndexes: [],
      })
      facets[newTriangleIndex].pointsAboveIndexes = unique(
        visibleTriIndexes.flatMap((visibleTriIndex) =>
          facets[visibleTriIndex].pointsAboveIndexes.filter((pi) =>
            height(newTriangleIndex, points[pi]),
          ),
        ),
      )
    }
    // remove old triangles
    visibleTriIndexes.forEach((i) => {
      bagRemoveIndex(facets, i)
    })
    console.log("visibleTriIndexes", visibleTriIndexes)
    console.log("facets", facets)
  }
  return facets.flatMap((f) => f.triangle)
}

const GL_DELETE = chroma.color("orange").gl()

type AnnotationResult = [
  string,
  {
    triangles?: int[]
    hp?: int[]
    hf?: int[]
    hpc?: Chromable
    hfc?: GL_COLOR
  },
]

function* quickHullAnnotated(points: V3[]): Generator<AnnotationResult> {
  yield ["start", { triangles: [] }]
  const [a, b, c, d] = points
  const facets: {
    triangle: Tuple3<number>
    pointsAboveIndexes: int[]
    fInfex: int
  }[] = []
  // height of point "above" the facet i
  function height(i: int, x: V3) {
    const [ai, bi, ci] = facets[i].triangle
    return distanceAboveTriangle(points[ai], points[bi], points[ci], x)
  }
  let fInfex = 0
  facets.push({ triangle: [0, 1, 2], pointsAboveIndexes: [], fInfex: fInfex++ })
  facets.push({ triangle: [1, 0, 3], pointsAboveIndexes: [], fInfex: fInfex++ })
  facets.push({ triangle: [2, 1, 3], pointsAboveIndexes: [], fInfex: fInfex++ })
  facets.push({ triangle: [0, 2, 3], pointsAboveIndexes: [], fInfex: fInfex++ })
  console.log("glug", height(0, points[3]))
  if (height(0, points[3]) > 0)
    facets.forEach((f) => arraySwap(f.triangle, 0, 1))
  yield ["selecting first 4 points", { hp: [0, 1, 2, 3] }]
  for (let fi = 0; fi < 4; fi++) {
    const triangles = facets.slice(0, fi + 1).flatMap((f) => f.triangle)
    yield ["creating base tetra", { triangles, hf: [fi] }]
    const pais: int[] = []
    for (let pi = 0; pi < points.length; pi++) {
      const isAbove = height(fi, points[pi]) > 0
      isAbove && pais.push(pi)
      // yield ['finding points "above" facet', { triangles, hp: [pi], hpc: isAbove ? 'yes' : 'no' }]
    }
    facets[fi].pointsAboveIndexes = pais
    yield [
      'finding points "above" facet',
      { triangles, hf: [fi], hp: pais, hpc: "yes" },
    ]
  }
  for (let fi = 0; fi < facets.length; fi++) {
    const facet = facets[fi]
    console.log("triangle", fi, "pointsAbove", facet.pointsAboveIndexes.length)
    yield [
      "finding highest point above facet",
      { hf: [fi], hp: facet.pointsAboveIndexes },
    ]
    if (0 === facet.pointsAboveIndexes.length) continue
    const highestPointIndex = withMax(facet.pointsAboveIndexes, (pi) =>
      height(fi, points[pi]),
    )!
    yield ["highet point above facet", { hf: [fi], hp: [highestPointIndex] }]
    const highestPoint = points[highestPointIndex]
    const visibleTriIndexes = filterIndexes(
      facets,
      (f, i) => height(i, highestPoint) > 0,
    )
    yield [
      "facets visible from highest point",
      { hf: visibleTriIndexes, hp: [highestPointIndex] },
    ]
    const horizonRidges: Edge[] = []
    for (const visibleTriIndex of visibleTriIndexes) {
      const addOrRemoveEdge = (e: Edge) => {
        const existingEdgeIndex = horizonRidges.findIndex((e2) =>
          edgeEqual(e2, e),
        )
        if (-1 === existingEdgeIndex) {
          horizonRidges.push(e)
        } else {
          bagRemoveIndex(horizonRidges, existingEdgeIndex)
        }
      }
      addOrRemoveEdge([
        facets[visibleTriIndex].triangle[0],
        facets[visibleTriIndex].triangle[1],
      ])
      addOrRemoveEdge([
        facets[visibleTriIndex].triangle[1],
        facets[visibleTriIndex].triangle[2],
      ])
      addOrRemoveEdge([
        facets[visibleTriIndex].triangle[2],
        facets[visibleTriIndex].triangle[0],
      ])
    }
    // create new triangles with "pointsAbove" arrays
    for (const horRidge of horizonRidges) {
      const newFacetIndex = facets.length
      facets.push({
        triangle: [highestPointIndex, horRidge[0], horRidge[1]],
        pointsAboveIndexes: [],
        fInfex: fInfex++,
      })
      facets[newFacetIndex].pointsAboveIndexes = unique(
        visibleTriIndexes.flatMap((visibleTriIndex) =>
          facets[visibleTriIndex].pointsAboveIndexes.filter(
            (pi) => height(newFacetIndex, points[pi]) > 0,
          ),
        ),
      )
      yield [
        "creating new facet",
        { triangles: facets.flatMap((f) => f.triangle), hf: [newFacetIndex] },
      ]
      yield [
        'finding points "above" new facet',
        {
          hf: [newFacetIndex],
          hp: facets[newFacetIndex].pointsAboveIndexes,
          hpc: "yes",
        },
      ]
    }
    yield ["delete old triangles", { hf: visibleTriIndexes, hfc: GL_DELETE }]
    // remove old triangles
    // visibleTriIndexes.forEach((i) => {
    //   bagRemoveIndex(facets, i)
    // })
    console.log("removeIndexes", facets.slice(), visibleTriIndexes)
    removeIndexes(facets, visibleTriIndexes)
    console.log(facets.slice())
    fi -= visibleTriIndexes.filter((deletedFi) => deletedFi <= fi).length
    yield [
      "delete old triangles",
      { triangles: facets.flatMap((f) => f.triangle) },
    ]
    console.log("visibleTriIndexes", visibleTriIndexes)
    console.log("facets", facets)
  }
  return facets.flatMap((f) => f.triangle)
}

function magic(gl: TSGLContext) {
  // const cubeMesh = Mesh.cube()
  const points = arrayFromFunction(100, () => V3.random())
  // const points = arrayFromFunction(10000, () => {
  //   let p, pLength
  //   do {
  //     p = V3.random().times(2).minus(V3.XYZ)
  //     pLength = p.length()
  //   } while (!(0.3 <= pLength && pLength <= 0.7))
  //   return p
  // })
  // V3.randomUnit().times(lerp(0.3, 0.7, Math.random())))
  let pointMesh = new Mesh().addIndexBuffer("TRIANGLES")
  pointMesh.vertices.push(...points)
  pointMesh.TRIANGLES.push(...index(points))
  let pointMesh2 = pointMesh.computeWireframeFromFlatTriangles()
  console.log(pointMesh2.LINES)
  pointMesh2.compile()
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

  gl.clearColor(1, 1, 1, 0)
  gl.cullFace(gl.BACK)

  // setup camera
  gl.matrixMode(gl.PROJECTION)
  gl.loadIdentity()
  gl.perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000)
  gl.lookAt(V(0, -2, 1.5), V3.O, V3.Z)
  gl.matrixMode(gl.MODELVIEW)
  gl.pointSize(10)

  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  return gl.animate(function (abs, _diff) {
    const angleDeg = (abs / 1000) * 45
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.loadIdentity()
    gl.rotate(angleDeg, 0, 0, 1)
    gl.scale(1.5)
    gl.translate(-0.5, -0.5, -0.5)

    shader
      .uniforms({
        color: [1, 0, 0, 1],
        pointSize: 5,
      })
      .drawBuffers(pointMesh.vertexBuffers, undefined, gl.POINTS)
    shader.uniforms({ color: [0, 0, 0, 0.5] }).draw(pointMesh, gl.TRIANGLES)
    shader.uniforms({ color: [1, 1, 0, 1] }).draw(pointMesh, gl.LINES)
  })
}

const hfcDefault = chroma.color("blue").gl()

const sleep = (ms: int) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms))

export function quickhull(gl: TSGLContext) {
  // const cubeMesh = Mesh.cube()
  const points = arrayFromFunction(1000, () =>
    V3.randomUnit()
      .plus(V3.XYZ)
      .times(1 / 2),
  )
  let startMesh = new Mesh().addIndexBuffer("TRIANGLES").addIndexBuffer("LINES")
  startMesh.vertices = points
  const state: {
    description: string
    cd: AnnotationResult[1]
    mesh: Mesh & { TRIANGLES: int[]; LINES: int[] }
  }[] = []
  async function doo() {
    let mesh = new Mesh().addIndexBuffer("TRIANGLES").addIndexBuffer("LINES")
    for (const [description, cd] of quickHullAnnotated(points)) {
      if (cd.triangles) {
        mesh = new Mesh().addIndexBuffer("TRIANGLES").addIndexBuffer("LINES")
        mesh.vertices = points
        mesh.TRIANGLES = cd.triangles
        mesh.computeWireframeFromFlatTriangles()
        mesh.compile()
      }
      state.push({ mesh, description, cd })
      await sleep(100)
    }
    console.log("finished doo")
  }
  doo()
  console.log(state)
  let mi = 0
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

  gl.clearColor(1, 1, 1, 0)
  gl.cullFace(gl.BACK)

  // setup camera
  gl.matrixMode(gl.PROJECTION)
  gl.loadIdentity()
  gl.perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000)
  gl.lookAt(V(0, -2, 1.5), V3.O, V3.Z)
  gl.matrixMode(gl.MODELVIEW)
  gl.pointSize(10)

  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  console.log(gl.canvas)
  gl.canvas.contentEditable = "true" // make canvas focusable
  gl.canvas.focus()
  gl.canvas.onkeydown = function (e) {
    console.log("keydown")
    const newMi = clamp(
      mi + ("j" === e.key ? -1 : "k" === e.key ? +1 : 0),
      0,
      state.length - 1,
    )
    if (newMi != mi) {
      mi = newMi
      console.log(mi, state[mi].description, state[mi].cd)
    }
  }
  let lastPos = V3.O
  let rot = M4.IDENTITY
  let zRot: number = 0
  let yRot: number = 0
  gl.canvas.onmousemove = function (e) {
    console.log("onmousemove")
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

  return gl.animate(function (abs, _diff) {
    if (mi + 1 < state.length) mi++
    // const angleDeg = (abs / 1000) * 10
    // const angleDeg = 0
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.loadIdentity()
    // gl.rotate(yRot / DEG, 0, 1, 0)
    // gl.rotate(-zRot / DEG, 0, 0, 1)
    gl.multMatrix(rot)
    gl.scale(1.5)
    gl.translate(-0.5, -0.5, -0.5)

    const pointMesh = state[mi].mesh
    const currentDisplay = state[mi].cd
    gl.projectionMatrix.m[11] -= 1 / (1 << 20) // prevent Z-fighting
    for (const pi of currentDisplay.hp ?? []) {
      const color =
        "yes" === currentDisplay.hpc
          ? "lime"
          : "no" === currentDisplay.hpc
          ? "red"
          : "blue"
      shader
        .uniforms({ color: chroma.css(color).gl(), pointSize: 12 })
        .drawBuffers(pointMesh.vertexBuffers, undefined, gl.POINTS, pi, 1)
    }
    for (const ti of currentDisplay.hf ?? []) {
      shader
        .uniforms({ color: currentDisplay.hfc ?? hfcDefault })
        .draw(pointMesh, gl.TRIANGLES, ti * 3, 3)
    }
    gl.projectionMatrix.m[11] += 1 / (1 << 20) // prevent Z-fighting

    shader
      .uniforms({
        color: chroma.css("grey").gl(),
        pointSize: 10,
      })
      .drawBuffers(pointMesh.vertexBuffers, undefined, gl.POINTS)
    shader.uniforms({ color: [1, 1, 0, 1] }).draw(pointMesh, gl.LINES)
    shader.uniforms({ color: [0, 0, 0, 0.5] }).draw(pointMesh, gl.TRIANGLES)
    // gl.pushMatrix()
    //gl.translate(30, 0, 0)
  })
}

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const tsgl = TSGLContext.create({ canvas: canvasRef.current! })
    tsgl.addResizeListener()
    quickhull(tsgl)
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <canvas ref={canvasRef} style={{ flexGrow: 1 }} tabIndex={0}></canvas>
    </div>
  )
}
