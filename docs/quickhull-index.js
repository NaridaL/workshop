(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[244],{4230:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "quickhull": () => (/* binding */ quickhull),\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var chroma_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7392);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9526);\n/* harmony import */ var ts3dutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2182);\n/* harmony import */ var tsgl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9392);\nconst _jsxFileName = "C:\\\\Users\\\\aval\\\\tsdev\\\\workshop\\\\src\\\\quickhull\\\\index.tsx"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }\n\n\n\n\n\n\n// export function text(text: string, size: number, depth: number = 1, font: opentype.Font = defaultFont) {\n\n//   const path = font.getPath(text, 0, 0, size)\n//   const subpaths: opentype.PathCommand[][] = []\n//   path.commands.forEach(c => {\n//     if (c.type == \'M\') {\n//       subpaths.push([])\n//     }\n//     subpaths.last.push(c)\n//   })\n//   const loops = subpaths.map(sp => {\n//     const path = new opentype.Path()\n//     path.commands = sp\n//     const loop = Edge.reversePath(Edge.pathFromSVG(path.toPathData(13))).map(e => e.mirrorY())\n//     // assert(Edge.isLoop(loop))\n//     return loop\n//   })\n//   // const faces = Face.assembleFacesFromLoops(loops, new PlaneSurface(P3.XY), PlaneFace as any)\n//   // const generator = callsce(\'B2T.text\', text, size, depth)\n//   // return BRep.join(faces.map(face => B2T.extrudeFace(face as PlaneFace, V(0, 0, -depth))), generator)\n// }\n\nfunction distanceAboveTriangle(a, b, c, x) {\n  const abcNormal = a.to(b).cross(a.to(c))\n  return a.to(x).dot(abcNormal)\n}\nfunction filterIndexes(\n  arr,\n  test,\n) {\n  const result = []\n  for (let i = 0; i < arr.length; i++) if (test(arr[i], i, arr)) result.push(i)\n  return result\n}\n\n\nfunction edgeEqual(e, j) {\n  return (e[0] === j[0] && e[1] === j[1]) || (e[0] === j[1] && e[1] === j[0])\n}\n\nfunction index(points) {\n  const [a, b, c, d] = points\n  const facets = []\n  // height of point "above" the facet i\n  function height(i, x) {\n    const [ai, bi, ci] = facets[i].triangle\n    return distanceAboveTriangle(points[ai], points[bi], points[ci], x)\n  }\n  facets.push({ triangle: [0, 1, 2], pointsAboveIndexes: [] })\n  facets.push({ triangle: [1, 0, 3], pointsAboveIndexes: [] })\n  facets.push({ triangle: [2, 1, 3], pointsAboveIndexes: [] })\n  facets.push({ triangle: [0, 2, 3], pointsAboveIndexes: [] })\n  console.log("glug", height(0, points[3]))\n  if (height(0, points[3]) > 0)\n    facets.forEach((f) => arraySwap(f.triangle, 0, 1))\n  console.log("glug", height(0, points[3]))\n  for (let i = 0; i < 4; i++) {\n    facets[i].pointsAboveIndexes = filterIndexes(\n      points,\n      (x) => height(i, x) > 0,\n    )\n  }\n  for (let fi = 0; fi < facets.length; fi++) {\n    const facet = facets[fi]\n    console.log("triangle", fi, "pointsAbove", facet.pointsAboveIndexes.length)\n    if (0 === facet.pointsAboveIndexes.length) continue\n    const highestPointIndex = withMax(facet.pointsAboveIndexes, (pi) => {\n      const p = points[pi]\n      return height(fi, p)\n    })\n    const highestPoint = points[highestPointIndex]\n    const visibleTriIndexes = filterIndexes(\n      facets,\n      (f, i) => height(i, highestPoint) > 0,\n    )\n    const horizonRidges = []\n    for (const visibleTriIndex of visibleTriIndexes) {\n      const addOrRemoveEdge = (e) => {\n        const existingEdgeIndex = horizonRidges.findIndex((e2) =>\n          edgeEqual(e2, e),\n        )\n        if (-1 === existingEdgeIndex) {\n          horizonRidges.push(e)\n        } else {\n          bagRemoveIndex(horizonRidges, existingEdgeIndex)\n        }\n      }\n      addOrRemoveEdge([\n        facets[visibleTriIndex].triangle[0],\n        facets[visibleTriIndex].triangle[1],\n      ])\n      addOrRemoveEdge([\n        facets[visibleTriIndex].triangle[1],\n        facets[visibleTriIndex].triangle[2],\n      ])\n      addOrRemoveEdge([\n        facets[visibleTriIndex].triangle[2],\n        facets[visibleTriIndex].triangle[0],\n      ])\n    }\n    // create new triangles with "pointsAbove" arrays\n    for (const horRidge of horizonRidges) {\n      const newTriangleIndex = facets.length\n      facets.push({\n        triangle: [highestPointIndex, horRidge[0], horRidge[1]],\n        pointsAboveIndexes: [],\n      })\n      facets[newTriangleIndex].pointsAboveIndexes = unique(\n        visibleTriIndexes.flatMap((visibleTriIndex) =>\n          facets[visibleTriIndex].pointsAboveIndexes.filter((pi) =>\n            height(newTriangleIndex, points[pi]),\n          ),\n        ),\n      )\n    }\n    // remove old triangles\n    visibleTriIndexes.forEach((i) => {\n      bagRemoveIndex(facets, i)\n    })\n    console.log("visibleTriIndexes", visibleTriIndexes)\n    console.log("facets", facets)\n  }\n  return facets.flatMap((f) => f.triangle)\n}\n\nconst GL_DELETE = chroma_ts__WEBPACK_IMPORTED_MODULE_0__/* .color */ .$_("orange").gl()\n\n\n\n\n\n\n\n\n\n\n\n\nfunction* quickHullAnnotated(points) {\n  yield ["start", { triangles: [] }]\n  const [a, b, c, d] = points\n  const facets\n\n\n\n = []\n  // height of point "above" the facet i\n  function height(i, x) {\n    const [ai, bi, ci] = facets[i].triangle\n    return distanceAboveTriangle(points[ai], points[bi], points[ci], x)\n  }\n  let fInfex = 0\n  facets.push({ triangle: [0, 1, 2], pointsAboveIndexes: [], fInfex: fInfex++ })\n  facets.push({ triangle: [1, 0, 3], pointsAboveIndexes: [], fInfex: fInfex++ })\n  facets.push({ triangle: [2, 1, 3], pointsAboveIndexes: [], fInfex: fInfex++ })\n  facets.push({ triangle: [0, 2, 3], pointsAboveIndexes: [], fInfex: fInfex++ })\n  console.log("glug", height(0, points[3]))\n  if (height(0, points[3]) > 0)\n    facets.forEach((f) => (0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .arraySwap */ .qC)(f.triangle, 0, 1))\n  yield ["selecting first 4 points", { hp: [0, 1, 2, 3] }]\n  for (let fi = 0; fi < 4; fi++) {\n    const triangles = facets.slice(0, fi + 1).flatMap((f) => f.triangle)\n    yield ["creating base tetra", { triangles, hf: [fi] }]\n    const pais = []\n    for (let pi = 0; pi < points.length; pi++) {\n      const isAbove = height(fi, points[pi]) > 0\n      isAbove && pais.push(pi)\n      // yield [\'finding points "above" facet\', { triangles, hp: [pi], hpc: isAbove ? \'yes\' : \'no\' }]\n    }\n    facets[fi].pointsAboveIndexes = pais\n    yield [\n      \'finding points "above" facet\',\n      { triangles, hf: [fi], hp: pais, hpc: "yes" },\n    ]\n  }\n  for (let fi = 0; fi < facets.length; fi++) {\n    const facet = facets[fi]\n    console.log("triangle", fi, "pointsAbove", facet.pointsAboveIndexes.length)\n    yield [\n      "finding highest point above facet",\n      { hf: [fi], hp: facet.pointsAboveIndexes },\n    ]\n    if (0 === facet.pointsAboveIndexes.length) continue\n    const highestPointIndex = (0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .withMax */ .AW)(facet.pointsAboveIndexes, (pi) =>\n      height(fi, points[pi]),\n    )\n    yield ["highet point above facet", { hf: [fi], hp: [highestPointIndex] }]\n    const highestPoint = points[highestPointIndex]\n    const visibleTriIndexes = filterIndexes(\n      facets,\n      (f, i) => height(i, highestPoint) > 0,\n    )\n    yield [\n      "facets visible from highest point",\n      { hf: visibleTriIndexes, hp: [highestPointIndex] },\n    ]\n    const horizonRidges = []\n    for (const visibleTriIndex of visibleTriIndexes) {\n      const addOrRemoveEdge = (e) => {\n        const existingEdgeIndex = horizonRidges.findIndex((e2) =>\n          edgeEqual(e2, e),\n        )\n        if (-1 === existingEdgeIndex) {\n          horizonRidges.push(e)\n        } else {\n          (0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .bagRemoveIndex */ .J8)(horizonRidges, existingEdgeIndex)\n        }\n      }\n      addOrRemoveEdge([\n        facets[visibleTriIndex].triangle[0],\n        facets[visibleTriIndex].triangle[1],\n      ])\n      addOrRemoveEdge([\n        facets[visibleTriIndex].triangle[1],\n        facets[visibleTriIndex].triangle[2],\n      ])\n      addOrRemoveEdge([\n        facets[visibleTriIndex].triangle[2],\n        facets[visibleTriIndex].triangle[0],\n      ])\n    }\n    // create new triangles with "pointsAbove" arrays\n    for (const horRidge of horizonRidges) {\n      const newFacetIndex = facets.length\n      facets.push({\n        triangle: [highestPointIndex, horRidge[0], horRidge[1]],\n        pointsAboveIndexes: [],\n        fInfex: fInfex++,\n      })\n      facets[newFacetIndex].pointsAboveIndexes = (0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .unique */ .Tw)(\n        visibleTriIndexes.flatMap((visibleTriIndex) =>\n          facets[visibleTriIndex].pointsAboveIndexes.filter(\n            (pi) => height(newFacetIndex, points[pi]) > 0,\n          ),\n        ),\n      )\n      yield [\n        "creating new facet",\n        { triangles: facets.flatMap((f) => f.triangle), hf: [newFacetIndex] },\n      ]\n      yield [\n        \'finding points "above" new facet\',\n        {\n          hf: [newFacetIndex],\n          hp: facets[newFacetIndex].pointsAboveIndexes,\n          hpc: "yes",\n        },\n      ]\n    }\n    yield ["delete old triangles", { hf: visibleTriIndexes, hfc: GL_DELETE }]\n    // remove old triangles\n    // visibleTriIndexes.forEach((i) => {\n    //   bagRemoveIndex(facets, i)\n    // })\n    console.log("removeIndexes", facets.slice(), visibleTriIndexes)\n    ;(0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .removeIndexes */ .hO)(facets, visibleTriIndexes)\n    console.log(facets.slice())\n    fi -= visibleTriIndexes.filter((deletedFi) => deletedFi <= fi).length\n    yield [\n      "delete old triangles",\n      { triangles: facets.flatMap((f) => f.triangle) },\n    ]\n    console.log("visibleTriIndexes", visibleTriIndexes)\n    console.log("facets", facets)\n  }\n  return facets.flatMap((f) => f.triangle)\n}\n\nfunction magic(gl) {\n  // const cubeMesh = Mesh.cube()\n  const points = arrayFromFunction(100, () => V3.random())\n  // const points = arrayFromFunction(10000, () => {\n  //   let p, pLength\n  //   do {\n  //     p = V3.random().times(2).minus(V3.XYZ)\n  //     pLength = p.length()\n  //   } while (!(0.3 <= pLength && pLength <= 0.7))\n  //   return p\n  // })\n  // V3.randomUnit().times(lerp(0.3, 0.7, Math.random())))\n  const pointMesh = new Mesh().addIndexBuffer("TRIANGLES")\n  pointMesh.vertices.push(...points)\n  pointMesh.TRIANGLES.push(...index(points))\n  const pointMesh2 = pointMesh.computeWireframeFromFlatTriangles()\n  console.log(pointMesh2.LINES)\n  pointMesh2.compile()\n  const shader = Shader.create(\n    `\n    uniform mat4 ts_ModelViewProjectionMatrix;\n    attribute vec4 ts_Vertex;\n    uniform float pointSize;\n    varying vec4 foo;\n    void main() {\n      foo = vec4(1.0, 1.0, 1.0, 1.0);\n      gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;\n      gl_PointSize = pointSize;\n    }\n  `,\n    `\n    precision highp float;\n    uniform vec4 color;\n    varying vec4 bar;\n    void main() {\n      gl_FragColor = color;\n      if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n        discard;\n      }\n    }\n  `,\n  )\n\n  gl.clearColor(1, 1, 1, 0)\n  gl.cullFace(gl.BACK)\n\n  // setup camera\n  gl.matrixMode(gl.PROJECTION)\n  gl.loadIdentity()\n  gl.perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000)\n  gl.lookAt(V(0, -2, 1.5), V3.O, V3.Z)\n  gl.matrixMode(gl.MODELVIEW)\n  gl.pointSize(10)\n\n  gl.enable(gl.CULL_FACE)\n  gl.enable(gl.DEPTH_TEST)\n  gl.enable(gl.BLEND)\n  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)\n\n  return gl.animate(function (abs, _diff) {\n    const angleDeg = (abs / 1000) * 45\n    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)\n    gl.loadIdentity()\n    gl.rotate(angleDeg, 0, 0, 1)\n    gl.scale(1.5)\n    gl.translate(-0.5, -0.5, -0.5)\n\n    shader\n      .uniforms({\n        color: [1, 0, 0, 1],\n        pointSize: 5,\n      })\n      .drawBuffers(pointMesh.vertexBuffers, undefined, gl.POINTS)\n    shader.uniforms({ color: [0, 0, 0, 0.5] }).draw(pointMesh, gl.TRIANGLES)\n    shader.uniforms({ color: [1, 1, 0, 1] }).draw(pointMesh, gl.LINES)\n  })\n}\n\nconst hfcDefault = chroma_ts__WEBPACK_IMPORTED_MODULE_0__/* .color */ .$_("blue").gl()\n\nconst sleep = (ms) =>\n  new Promise((resolve, reject) => setTimeout(resolve, ms))\n\nfunction quickhull(gl) {\n  // const cubeMesh = Mesh.cube()\n  const points = (0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .arrayFromFunction */ .Nv)(1000, () =>\n    ts3dutils__WEBPACK_IMPORTED_MODULE_2__.V3.randomUnit()\n      .plus(ts3dutils__WEBPACK_IMPORTED_MODULE_2__.V3.XYZ)\n      .times(1 / 2),\n  )\n  const startMesh = new tsgl__WEBPACK_IMPORTED_MODULE_3__/* .Mesh */ .Kj()\n    .addIndexBuffer("TRIANGLES")\n    .addIndexBuffer("LINES")\n  startMesh.vertices = points\n  const state\n\n\n\n = []\n  async function doo() {\n    let mesh = new tsgl__WEBPACK_IMPORTED_MODULE_3__/* .Mesh */ .Kj().addIndexBuffer("TRIANGLES").addIndexBuffer("LINES")\n    for (const [description, cd] of quickHullAnnotated(points)) {\n      if (cd.triangles) {\n        mesh = new tsgl__WEBPACK_IMPORTED_MODULE_3__/* .Mesh */ .Kj().addIndexBuffer("TRIANGLES").addIndexBuffer("LINES")\n        mesh.vertices = points\n        mesh.TRIANGLES = cd.triangles\n        mesh.computeWireframeFromFlatTriangles()\n        mesh.compile()\n      }\n      state.push({ mesh, description, cd })\n      await sleep(100)\n    }\n    console.log("finished doo")\n  }\n  doo()\n  console.log(state)\n  let mi = 0\n  const shader = tsgl__WEBPACK_IMPORTED_MODULE_3__/* .Shader.create */ .ex.create(\n    `\n    uniform mat4 ts_ModelViewProjectionMatrix;\n    attribute vec4 ts_Vertex;\n    uniform float pointSize;\n    varying vec4 foo;\n    void main() {\n      foo = vec4(1.0, 1.0, 1.0, 1.0);\n      gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;\n      gl_PointSize = pointSize;\n    }\n  `,\n    `\n    precision highp float;\n    uniform vec4 color;\n    varying vec4 bar;\n    void main() {\n      gl_FragColor = color;\n      if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n        discard;\n      }\n    }\n  `,\n  )\n\n  gl.clearColor(1, 1, 1, 0)\n  gl.cullFace(gl.BACK)\n\n  // setup camera\n  gl.matrixMode(gl.PROJECTION)\n  gl.loadIdentity()\n  gl.perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000)\n  gl.lookAt((0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__.V)(0, -2, 1.5), ts3dutils__WEBPACK_IMPORTED_MODULE_2__.V3.O, ts3dutils__WEBPACK_IMPORTED_MODULE_2__.V3.Z)\n  gl.matrixMode(gl.MODELVIEW)\n  gl.pointSize(10)\n\n  gl.enable(gl.CULL_FACE)\n  gl.enable(gl.DEPTH_TEST)\n  gl.enable(gl.BLEND)\n  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)\n\n  console.log(gl.canvas)\n  gl.canvas.contentEditable = "true" // make canvas focusable\n  gl.canvas.focus()\n  gl.canvas.onkeydown = function (e) {\n    console.log("keydown")\n    const newMi = (0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .clamp */ .uZ)(\n      mi + ("j" === e.key ? -1 : "k" === e.key ? +1 : 0),\n      0,\n      state.length - 1,\n    )\n    if (newMi != mi) {\n      mi = newMi\n      console.log(mi, state[mi].description, state[mi].cd)\n    }\n  }\n  let lastPos = ts3dutils__WEBPACK_IMPORTED_MODULE_2__.V3.O\n  let rot = ts3dutils__WEBPACK_IMPORTED_MODULE_2__.M4.IDENTITY\n  const zRot = 0\n  const yRot = 0\n  gl.canvas.onmousemove = function (e) {\n    console.log("onmousemove")\n    const pagePos = (0,ts3dutils__WEBPACK_IMPORTED_MODULE_2__.V)(e.pageX, e.pageY)\n    const delta = lastPos.to(pagePos)\n    if (e.buttons & 1) {\n      // zRot -= delta.x * 0.25 * DEG\n      rot = rot.rotateZ(delta.x * 0.25 * ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .DEG */ .Co)\n      rot = rot.rotateX(delta.y * 0.25 * ts3dutils__WEBPACK_IMPORTED_MODULE_2__/* .DEG */ .Co)\n      // rot = rot.rotate(V3.O, rot.X, delta.y * 0.25 * DEG)\n      // yRot = clamp(yRot - delta.y * 0.25 * DEG, -85 * DEG, 85 * DEG)\n    }\n    lastPos = pagePos\n  }\n\n  return gl.animate(function (abs, _diff) {\n    if (mi + 1 < state.length) mi++\n    // const angleDeg = (abs / 1000) * 10\n    // const angleDeg = 0\n    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)\n    gl.loadIdentity()\n    // gl.rotate(yRot / DEG, 0, 1, 0)\n    // gl.rotate(-zRot / DEG, 0, 0, 1)\n    gl.multMatrix(rot)\n    gl.scale(1.5)\n    gl.translate(-0.5, -0.5, -0.5)\n\n    const pointMesh = state[mi].mesh\n    const currentDisplay = state[mi].cd\n    gl.projectionMatrix.m[11] -= 1 / (1 << 20) // prevent Z-fighting\n    for (const pi of _nullishCoalesce(currentDisplay.hp, () => ( []))) {\n      const color =\n        "yes" === currentDisplay.hpc\n          ? "lime"\n          : "no" === currentDisplay.hpc\n          ? "red"\n          : "blue"\n      shader\n        .uniforms({ color: chroma_ts__WEBPACK_IMPORTED_MODULE_0__/* .css */ .iv(color).gl(), pointSize: 12 })\n        .drawBuffers(pointMesh.vertexBuffers, undefined, gl.POINTS, pi, 1)\n    }\n    for (const ti of _nullishCoalesce(currentDisplay.hf, () => ( []))) {\n      shader\n        .uniforms({ color: _nullishCoalesce(currentDisplay.hfc, () => ( hfcDefault)) })\n        .draw(pointMesh, gl.TRIANGLES, ti * 3, 3)\n    }\n    gl.projectionMatrix.m[11] += 1 / (1 << 20) // prevent Z-fighting\n\n    shader\n      .uniforms({\n        color: chroma_ts__WEBPACK_IMPORTED_MODULE_0__/* .css */ .iv("grey").gl(),\n        pointSize: 10,\n      })\n      .drawBuffers(pointMesh.vertexBuffers, undefined, gl.POINTS)\n    shader.uniforms({ color: [1, 1, 0, 1] }).draw(pointMesh, gl.LINES)\n    shader.uniforms({ color: [0, 0, 0, 0.5] }).draw(pointMesh, gl.TRIANGLES)\n    // gl.pushMatrix()\n    //gl.translate(30, 0, 0)\n  })\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\n  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null)\n\n  ;(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n    const tsgl = tsgl__WEBPACK_IMPORTED_MODULE_3__/* .TSGLContext.create */ .ZG.create({ canvas: canvasRef.current })\n    tsgl.addResizeListener()\n    quickhull(tsgl)\n  }, [])\n\n  return (\n    react__WEBPACK_IMPORTED_MODULE_1__.createElement(\'div\', { style: { display: "flex", flexDirection: "column", height: "100%" }, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 537}}\n      , react__WEBPACK_IMPORTED_MODULE_1__.createElement(\'canvas\', { ref: canvasRef, style: { flexGrow: 1 }, tabIndex: 0, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 538}})\n    )\n  )\n});\n\n\n//# sourceURL=webpack://workshop/./src/quickhull/index.tsx?')}}]);