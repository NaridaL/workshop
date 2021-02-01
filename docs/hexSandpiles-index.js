(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[729],{6525:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _material_ui_core_styles_useTheme__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4881);\n/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1213);\n/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chai__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var chroma_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7392);\n/* harmony import */ var opentype_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2276);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9526);\n/* harmony import */ var sleep_promise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9291);\n/* harmony import */ var ts3dutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2182);\n/* harmony import */ var tsgl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9392);\n/* harmony import */ var _directVS_vert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1237);\n/* harmony import */ var _FS_frag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3646);\n/* harmony import */ var _OleoScript_Bold_ttf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1216);\n/* harmony import */ var _step_frag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5068);\nconst _jsxFileName = "C:\\\\Users\\\\aval\\\\tsdev\\\\workshop\\\\src\\\\hexSandpiles\\\\index.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === \'optionalAccess\' || op === \'optionalCall\') && value == null) { return undefined; } if (op === \'access\' || op === \'optionalAccess\') { lastAccessLHS = value; value = fn(value); } else if (op === \'call\' || op === \'optionalCall\') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst makePlane = (x0, y0, x1, y1) => {\n  const plane = tsgl__WEBPACK_IMPORTED_MODULE_6__/* .Mesh.plane */ .Kj.plane({\n    startX: -1,\n    width: 2,\n    startY: -1,\n    height: 2,\n  })\n  plane.coords[0] = [x0, y0]\n  plane.coords[1] = [x1, y0]\n  plane.coords[2] = [x0, y1]\n  plane.coords[3] = [x1, y1]\n  plane.compile()\n  return plane\n}\nconst forEachNeighbor = async (\n  x,\n  y,\n  f,\n) => {\n  await f(x + 1, y)\n  await f(x - 1, y)\n  await f(x, y + 1)\n  await f(x, y - 1)\n  // +- 1, depending on even/odd row\n  await f(x + 1 - (y & 1) * 2, y + 1)\n  await f(x + 1 - (y & 1) * 2, y - 1)\n}\nconst andNeighbors = async (\n  x,\n  y,\n  f,\n) => {\n  await f(x, y)\n  await forEachNeighbor(x, y, f)\n}\n\n// https://www.redblobgames.com/grids/hexagons/#coordinates\n\n//       ODDR (odd-right) Coords\n// Y\n// ^ 0:2   1:2   2:2\n// |    0:1   1:1   2:0\n// | 0:0   1:0   2:0\n// +------------------\x3e X\n\n//      Cube Coords\n//\n//\n//  -1:2:-1   0:2:-2   1:2:-3\n//        0:1:-1   1:1:-2   2:1:-3\n//   0:0:0    1:0:-1   2:0:-2\n//  --------------------\x3e X\n\nconst SQRT3_2 = Math.sqrt(3) / 2\n\nconst oddr_to_px = (col, row) => {\n  const x = col + 0.5 * (row & 1)\n  const y = row * SQRT3_2\n  return (0,ts3dutils__WEBPACK_IMPORTED_MODULE_5__.V)(x, y, 0)\n}\nconst SINK = 255\n\n;(0,chai__WEBPACK_IMPORTED_MODULE_0__.assert)(oddr_to_px(0, 0).equals((0,ts3dutils__WEBPACK_IMPORTED_MODULE_5__.V)(0, 0)))\n;(0,chai__WEBPACK_IMPORTED_MODULE_0__.assert)(oddr_to_px(1, 0).equals((0,ts3dutils__WEBPACK_IMPORTED_MODULE_5__.V)(1, 0)))\n;(0,chai__WEBPACK_IMPORTED_MODULE_0__.assert)(oddr_to_px(0, 1).equals((0,ts3dutils__WEBPACK_IMPORTED_MODULE_5__.V)(0.5, SQRT3_2)))\n\nconst cube_distance = (\n  [x1, y1, z1],\n  [x2, y2, z2],\n) => (Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1)) / 2\n\nconst oddr_distance = (x1, y1, x2, y2) =>\n  cube_distance(oddr_to_cube(x1, y1), oddr_to_cube(x2, y2))\n\nconst cube_to_oddr = ([x, y, z]) => {\n  const col = x + (y - (y & 1)) / 2\n  const row = y\n  return [col, row]\n}\nconst oddr_to_cube = (col, row) => {\n  const x = col - (row >> 1)\n  const y = row\n  const z = -x - y\n  return [x, y, z]\n}\n\nconst loadFont = (url) =>\n  new Promise((resolve, reject) => {\n    ;(0,opentype_js__WEBPACK_IMPORTED_MODULE_2__/* .load */ .zD)(url, (error, font) => (error ? reject(error) : resolve(font)))\n  })\n\nchai__WEBPACK_IMPORTED_MODULE_0__.assert.deepEqual(oddr_to_cube(0, 0), [0, 0, -0])\nchai__WEBPACK_IMPORTED_MODULE_0__.assert.deepEqual(oddr_to_cube(1, 0), [1, 0, -1])\nchai__WEBPACK_IMPORTED_MODULE_0__.assert.deepEqual(oddr_to_cube(0, 1), [0, 1, -1])\nchai__WEBPACK_IMPORTED_MODULE_0__.assert.deepEqual(oddr_to_cube(0, 2), [-1, 2, -1])\nchai__WEBPACK_IMPORTED_MODULE_0__.assert.deepEqual(oddr_to_cube(-1, 0), [-1, 0, 1])\nchai__WEBPACK_IMPORTED_MODULE_0__.assert.deepEqual(oddr_to_cube(0, -1), [1, -1, 0])\nchai__WEBPACK_IMPORTED_MODULE_0__.assert.deepEqual(oddr_to_cube(-1, -1), [0, -1, 1])\nchai__WEBPACK_IMPORTED_MODULE_0__.assert.deepEqual(oddr_to_cube(0, -2), [1, -2, 1])\nclass HexSand {\n  \n   constructor(  w,   h) {;this.w = w;this.h = h;\n    this.data = new Uint8Array(w * h)\n  }\n\n  clone() {\n    const hs = new HexSand(this.w, this.h)\n    hs.plusHS(this)\n    return hs\n  }\n  dualize() {\n    for (let i = 0; i < this.h * this.w; i++) {\n      if (SINK !== this.data[i]) this.data[i] = 5 - this.data[i]\n    }\n    console.log("dualized")\n  }\n  plus(x) {\n    for (let i = 0; i < this.h * this.w; i++) {\n      if (SINK !== this.data[i]) this.data[i] += x\n    }\n    console.log("plus " + x)\n  }\n  times(x) {\n    for (let i = 0; i < this.h * this.w; i++) {\n      if (SINK !== this.data[i]) this.data[i] *= x\n    }\n    console.log("times " + x)\n  }\n  setHS(o) {\n    for (let i = 0; i < this.h * this.w; i++) {\n      this.data[i] = o.data[i]\n    }\n  }\n  plusHS(o) {\n    for (let i = 0; i < this.h * this.w; i++) {\n      if (SINK !== this.data[i]) this.data[i] += o.data[i]\n    }\n  }\n  fill(n) {\n    for (let i = 0; i < this.h * this.w; i++) {\n      if (SINK !== this.data[i]) this.data[i] = n\n    }\n  }\n\n  fillf(f) {\n    for (let i = 0; i < this.h * this.w; i++) {\n      const x = i % this.w\n      const y = (i / this.w) | 0\n      if (SINK !== this.data[i]) this.data[i] = f(x, y, i, this.data[i])\n    }\n  }\n\n  getOddr(x, y) {\n    return this.data[y * this.w + x]\n  }\n  setOddr(x, y, value) {\n    return (this.data[y * this.w + x] = value)\n  }\n  addOddr(x, y, value) {\n    return (this.data[y * this.w + x] += value)\n  }\n  isSink(x, y) {\n    return this.getOddr(x, y) === SINK\n  }\n\n  drawHex(inner, outer, value) {\n    const cx = (this.w / 2) | 0\n    const cy = (this.h / 2) | 0\n    for (let i = 0; i < this.h * this.w; i++) {\n      const x = i % this.w\n      const y = (i / this.w) | 0\n      if (\n        inner <= oddr_distance(cx, cy, x, y) &&\n        oddr_distance(cx, cy, x, y) <= outer\n      ) {\n        this.data[i] = value\n      }\n    }\n  }\n  async drawText(\n    oddr_cx,\n    oddr_cy,\n    text,\n    fontSize,\n    value,\n  ) {\n    const font = await loadFont(_OleoScript_Bold_ttf__WEBPACK_IMPORTED_MODULE_9__)\n    const path = font.getPath(text, 0, 0, fontSize)\n    const pathBB = path.getBoundingBox()\n    const c = (0,ts3dutils__WEBPACK_IMPORTED_MODULE_5__.V)(oddr_cx, oddr_cy)\n    const pathBBSize = (0,ts3dutils__WEBPACK_IMPORTED_MODULE_5__.V)(pathBB.x1, pathBB.y1).to((0,ts3dutils__WEBPACK_IMPORTED_MODULE_5__.V)(pathBB.x2, pathBB.y2))\n\n    console.log("path", path)\n\n    const canvas = document.createElement("canvas")\n    canvas.width = (pathBB.x2 - pathBB.x1) * 2\n    canvas.height = (pathBB.y2 - pathBB.y1) * 2\n    const context = canvas.getContext("2d")\n    context.scale(2, 2)\n    context.translate(-pathBB.x1, -pathBB.y1)\n    context.fillStyle = "black"\n    context.imageSmoothingEnabled = false\n    // document.body.appendChild(canvas)\n    path.draw(context)\n    // canvas.setAttribute("d", path)\n\n    // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")\n    // svg.setAttribute("fill", "black")\n    // svg.setAttribute("width", "400")\n    // svg.setAttribute("height", "100")\n    // svg.appendChild(canvas)\n    // document.body.appendChild(svg)\n    const offset = oddr_to_px(oddr_cx, oddr_cy).minus(pathBBSize.div(2))\n    const p = context.getImageData(0, 0, canvas.width, canvas.height).data\n    for (let i = 0; i < this.h * this.w; i++) {\n      const x = i % this.w\n      const y = (i / this.w) | 0\n      const px = oddr_to_px(x, y).minus(offset)\n      if (\n        0 < px.x &&\n        px.x < pathBB.x2 - pathBB.x1 &&\n        0 < px.y &&\n        px.y < pathBB.y2 - pathBB.y1\n      ) {\n        if (\n          p[(((px.y * 2) | 0) * canvas.width + ((px.x * 2) | 0)) * 4 + 3] > 127\n        ) {\n          this.data[i] = value\n        }\n      }\n    }\n  }\n  drawTriangle(inner, outer, value) {\n    const cx = (this.w / 2) | 0\n    const cy = (this.h / 2) | 0\n\n    for (let i = 0; i < this.h * this.w; i++) {\n      const x = i % this.w\n      const y = (i / this.w) | 0\n      const d = Math.max(...oddr_to_cube(x - cx, y - cy))\n      if (inner <= d && d <= outer) {\n        this.data[i] = value\n      }\n    }\n  }\n  drawCircle(inner, outer, value) {\n    const cx = (this.w / 2) | 0\n    const cy = (this.h / 2) | 0\n    const c = oddr_to_px(cx, cy)\n\n    for (let i = 0; i < this.h * this.w; i++) {\n      const x = i % this.w\n      const y = (i / this.w) | 0\n      const d = oddr_to_px(x, y).distanceTo(c)\n      if (inner <= d && d <= outer) {\n        this.data[i] = value\n      }\n    }\n  }\n  drawRect(w, h, value) {\n    for (let i = 0; i < this.h * this.w; i++) {\n      const x = (i % this.w) - ((this.w / 2) | 0)\n      const y = ((i / this.w) | 0) - ((this.h / 2) | 0)\n      const cc = (0,ts3dutils__WEBPACK_IMPORTED_MODULE_5__.V)(...oddr_to_cube(x, y))\n      if (\n        Math.abs(cc.x + (cc.y >> 1)) < w / 2 &&\n        Math.abs(cc.y) < h / 2 &&\n        Math.abs(cc.x) < w / 2 + 12 &&\n        Math.abs(cc.z) < w / 2 + 12\n      ) {\n        this.data[i] = value\n      }\n    }\n  }\n  async asyncStabilizeNoShader() {\n    let changed\n    do {\n      changed = 0\n      for (let i = 0; i < this.h * this.w; i++) {\n        const x = i % this.w\n        const y = (i / this.w) | 0\n\n        if (!this.isSink(x, y) && this.getOddr(x, y) >= 6) {\n          await forEachNeighbor(\n            x,\n            y,\n            async (x, y) => !this.isSink(x, y) && this.addOddr(x, y, 1),\n          )\n          this.addOddr(x, y, -6)\n          changed++\n        }\n      }\n      await (0,sleep_promise__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(10)\n    } while (changed != 0)\n    console.log("stabilized")\n    await (0,sleep_promise__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(2000)\n  }\n\n  \n\n\n\n\n\n\n\n\n\n   createTextures(\n    gl,\n    stepShader,\n  ) {\n    _optionalChain([this, \'access\', _2 => _2.glInfo, \'optionalAccess\', _3 => _3.gl]) === gl && (this.glInfo = undefined)\n    if (!this.glInfo) {\n      this.glInfo = {\n        gl,\n        t0: new tsgl__WEBPACK_IMPORTED_MODULE_6__/* .Texture */ .xE(this.w, this.h, {\n          filter: gl.NEAREST,\n          internalFormat: gl.R8UI,\n          format: gl.RED_INTEGER,\n        }),\n        t1: new tsgl__WEBPACK_IMPORTED_MODULE_6__/* .Texture */ .xE(this.w, this.h, {\n          filter: gl.NEAREST,\n          internalFormat: gl.R8UI,\n          format: gl.RED_INTEGER,\n        }),\n        stepPlane: makePlane(0, 0, this.w, this.h),\n        stepShader,\n      }\n    }\n    return this.glInfo.t0\n  }\n\n  async asyncStabilize() {\n    const glInfo = this.glInfo\n\n    this.upload()\n\n    while (this.countUnstable() > 0) {\n      for (let i = 0; i < 1000; i++) {\n        for (let ss = 0; ss < 1; ss++) {\n          glInfo.t1.drawTo((_gl) => {\n            glInfo.t0.bind(0)\n            glInfo.stepShader.uniforms({ heights: 0 }).draw(glInfo.stepPlane)\n          })\n          glInfo.t0.swapWith(glInfo.t1)\n        }\n      }\n      glInfo.t0.downloadData(this.data)\n    }\n  }\n\n  *stabilizeInteractive(frameSteps = 1) {\n    const glInfo = this.glInfo\n\n    this.upload()\n\n    while (this.countUnstable() > 0) {\n      for (let i = 0; i < 1000; i++) {\n        for (let ss = 0; ss < frameSteps; ss++) {\n          glInfo.t1.drawTo((_gl) => {\n            glInfo.t0.bind(0)\n            glInfo.stepShader.uniforms({ heights: 0 }).draw(glInfo.stepPlane)\n          })\n          glInfo.t0.swapWith(glInfo.t1)\n        }\n        yield\n      }\n      glInfo.t0.downloadData(this.data)\n    }\n  }\n\n  async calcHash() {\n    return Array.from(\n      new Uint8Array(await crypto.subtle.digest("SHA-1", this.data)),\n    )\n      .map((b) => b.toString(16).padStart(2, "0"))\n      .join("")\n  }\n\n  countUnstable() {\n    let unstable = 0\n    for (let i = 0; i < this.w * this.h; i++)\n      unstable += +(SINK !== this.data[i] && this.data[i] >= 6)\n    return unstable\n  }\n\n  async calcRecurringInverse() {\n    this.plus(10)\n    await this.asyncStabilize()\n    this.dualize()\n    this.plus(5)\n    await this.asyncStabilize()\n  }\n\n  async calcRecurringIdentity() {\n    this.fill(10)\n    await this.asyncStabilize()\n    this.dualize()\n    this.plus(5)\n    await this.asyncStabilize()\n  }\n\n  upload() {\n    this.glInfo.t0.setData(this.data)\n  }\n\n  getOddrBB() {\n    const rowEmpty = (y) => {\n      for (let x = 0; x < this.w; x++)\n        if (this.data[y * this.w + x] !== SINK) return false\n      return true\n    }\n    let y0 = 0\n    let y1 = this.h\n    while (y0 < this.h && rowEmpty(y0)) y0++\n    while (y1 > 0 && rowEmpty(y1 - 1)) y1--\n    const colEmpty = (x) => {\n      for (let y = y0; y < y1; y++)\n        if (this.data[y * this.w + x] !== SINK) return false\n      return true\n    }\n    let x0 = 0\n    let x1 = this.w\n    while (x0 < this.h && colEmpty(x0)) x0++\n    while (x1 > 0 && colEmpty(x1 - 1)) x1--\n    return {\n      x0,\n      x1,\n      y0,\n      y1,\n    }\n  }\n\n  getBB() {\n    const { x0, x1, y0, y1 } = this.getOddrBB()\n    return {\n      min: oddr_to_px(x0, y0),\n      max: oddr_to_px(x1, y1),\n    }\n  }\n}\n\nconst colorFg = chroma_ts__WEBPACK_IMPORTED_MODULE_1__/* .scale */ .bA("white", "green").mode("rgb").colors(10, "gl")\nasync function setup(canvas, colorBg) {\n  const gl = tsgl__WEBPACK_IMPORTED_MODULE_6__/* .TSGLContext.create */ .ZG.create({\n    canvas,\n    throwOnError: true,\n  }) \n\n  console.log("gl", gl)\n\n  gl.addResizeListener()\n\n  // gl.enable(gl.SAMPLE_COVERAGE);\n  // gl.sampleCoverage(0.5, false);\n  console.log(gl.canvas.width, gl.canvas.height)\n\n  const shader = tsgl__WEBPACK_IMPORTED_MODULE_6__/* .Shader.create */ .ex.create(_directVS_vert__WEBPACK_IMPORTED_MODULE_7__, _FS_frag__WEBPACK_IMPORTED_MODULE_8__)\n  const stepShader = tsgl__WEBPACK_IMPORTED_MODULE_6__/* .Shader.create */ .ex.create(_directVS_vert__WEBPACK_IMPORTED_MODULE_7__, _step_frag__WEBPACK_IMPORTED_MODULE_10__)\n\n  const field = new HexSand(256, 256)\n  const fieldTexture = field.createTextures(gl, stepShader)\n  const plane = makePlane(-1, -1, 1, 1)\n  const si = async (x) => {\n    for (const _ of field.stabilizeInteractive(x)) {\n      await (0,sleep_promise__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(16)\n    }\n  }\n\n  const aspect = gl.canvas.width / gl.canvas.height\n  gl.addResizeListener()\n  console.log("aspect", aspect)\n\n  field.fill(SINK)\n  // field.data[1000] = 200\n  field.drawHex(0, 80, 0)\n  const fBB = field.getBB()\n  const fBBd = fBB.min.to(fBB.max)\n  const bbRatio = fBBd.x / fBBd.y\n  console.log("ratios", aspect, bbRatio, "" + fBBd, fBB)\n  //   forSys(fBBd.schur(V3.X), fBBd.schur(V3.Y), V3.Z, fBB.min)\n  //     .inversed()\n  const mm = ts3dutils__WEBPACK_IMPORTED_MODULE_5__.M4.translate(fBB.min.plus(fBB.max).times(-1 / 2))\n    .scale(aspect < bbRatio ? 1 / fBBd.x : 1 / fBBd.y)\n    // add border\n    .scale(0.98)\n    .scale(2)\n    .scale(1, -1, 1)\n    .scale(1 / aspect, 1, 1)\n  //   field.drawRect(200, 100, 4)\n  // field.drawCircle(0, 50, 0)\n  // field.drawTriangle(50, 65, 0)\n  // field.drawTriangle(30, 45, 0)\n  // field.drawTriangle(10, 25, 0)\n  //   field.fill(10)\n\n  //   const base = field.clone()\n  const queryParam = (p) =>\n    new URL("" + document.location).searchParams.get(p)\n\n  await field.calcRecurringIdentity()\n  //   field.upload()\n  //   return\n  field.fillf((_x, _y, _i, v) => (SINK === v ? SINK : 3 + (v % 3)))\n  //   field.drawRect(100, 50, 4)\n  const queryTextBase64 = queryParam("t")\n  await field.drawText(\n    128,\n    128,\n    queryTextBase64 ? atob(queryTextBase64) : "Hi!",\n    25,\n    5,\n  )\n  //   field.upload()\n  //   return\n\n  //   field.fillf(() => (5 + Math.random() * 6) | 0)\n  //   await field.calcRecurringInverse()\n  //   await sleep(1000)\n  //   field.plusHS(base)\n  //   field.asyncStabilize()\n  //   console.log("random + (-random)", await field.calcHash())\n  //   await sleep(1000)\n\n  //   create random field\n  const rf = field.clone()\n  rf.createTextures(gl, stepShader)\n  rf.fillf(() => (5 + Math.random() * 6) | 0)\n  await rf.asyncStabilize()\n  //   rf.upload()\n\n  // add it to field\n  field.plusHS(rf)\n  await field.asyncStabilize()\n\n  await rf.calcRecurringInverse()\n\n  field.plusHS(rf)\n  field.upload()\n\n  gl.animate(() => {\n    fieldTexture.bind(0)\n    shader\n      .uniforms({\n        iResolution: [800, 600],\n        tt: mm.inversed(),\n        colorBg,\n        "colorFg[0]": colorFg,\n        heights: 0,\n      })\n      .draw(plane)\n  })\n\n  await (0,sleep_promise__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(2000)\n  await si(+(queryParam("speed") || "2"))\n  field.upload()\n\n  const colorHex = async (x, y, value) =>\n    andNeighbors(x, y, async (x, y) => {\n      field.setOddr(x, y, value)\n      field.upload()\n      await (0,sleep_promise__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(60)\n    })\n\n  // await colorHex(10, 10, 3)\n  // await colorHex(20, 10, 3)\n  // await colorHex(30, 11, 3)\n  // await colorHex(25, 12, 3)\n\n  console.log("aspect", aspect)\n\n  const naive = async () => {\n    field.fill(10)\n    field.upload()\n    await (0,sleep_promise__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(2000)\n    await field.asyncStabilize()\n    field.dualize()\n    field.upload()\n    await (0,sleep_promise__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(3000)\n    field.plus(5)\n    field.upload()\n    await (0,sleep_promise__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(3000)\n    await field.asyncStabilize()\n    const zero = field.clone()\n    console.log("zero hash", await zero.calcHash())\n    return\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\n  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null)\n\n  const theme = (0,_material_ui_core_styles_useTheme__WEBPACK_IMPORTED_MODULE_11__/* .default */ .Z)()\n\n  ;(0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {\n    setup(canvasRef.current, chroma_ts__WEBPACK_IMPORTED_MODULE_1__/* .css */ .iv(theme.palette.background.default).gl())\n  }, [theme.palette.background.default])\n\n  const width = 32\n\n  const c = {\n    boxSizing: "border-box",\n    position: "relative",\n    content: "",\n    width,\n    display: "block",\n    height: width / SQRT3_2 / 4,\n    borderWidth: `0 ${width / 2}px ${width / SQRT3_2 / 4}px ${width / 2}px`,\n    borderStyle: "solid",\n  }\n\n  return (\n    react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'div\', { style: { display: "flex", flexDirection: "column", height: "100%" }, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 632}}\n      , react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'canvas\', { ref: canvasRef, style: { flexGrow: 1 }, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 633}} )\n      , react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'div\', {\n        style: {\n          padding: 4,\n          display: "flex",\n          backgroundColor: theme.palette.background.default,\n        }, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 634}}\n      \n        , colorFg.map((value, index) => (\n          react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'div\', {\n            className: "hex",\n            style: {\n              display: "flex",\n              flexDirection: "column",\n              margin: 4,\n            },\n            key: index, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 642}}\n          \n            , react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'div\', {\n              style: {\n                ...c,\n                borderColor: chroma_ts__WEBPACK_IMPORTED_MODULE_1__.gl(value).css() + " transparent",\n                borderWidth: `0 ${width / 2}px ${width / SQRT3_2 / 4}px ${\n                  width / 2\n                }px`,\n              }, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 651}}\n            )\n            , react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'div\', {\n              style: {\n                textAlign: "center",\n                backgroundColor: chroma_ts__WEBPACK_IMPORTED_MODULE_1__.gl(value).css(),\n                height: width / SQRT3_2 / 2,\n                color: chroma_ts__WEBPACK_IMPORTED_MODULE_1__.gl(value).textColor().css(),\n                display: "flex",\n                alignItems: "center",\n                justifyContent: "center",\n              }, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 660}}\n            \n              , index === 9 ? "9+" : index\n            )\n            , react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'div\', {\n              style: {\n                ...c,\n                borderColor: chroma_ts__WEBPACK_IMPORTED_MODULE_1__.gl(value).css() + " transparent",\n                borderWidth: `${width / SQRT3_2 / 4}px ${width / 2}px 0 ${\n                  width / 2\n                }px`,\n              }, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 673}}\n            )\n          )\n        ))\n        /* <Tooltip title="Calculate Recuring Inverse">\n          <Button>Calc Rec. Inv.</Button>\n\t\t</Tooltip>\n\t\t */\n        , react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'div\', { style: { textAlign: "right", padding: 10, flexGrow: 1 }, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 688}}\n          , react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'a\', { href: "http://people.reed.edu/~davidp/grant/", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 689}}, "Original (square)" ), " "\n          , react__WEBPACK_IMPORTED_MODULE_3__.createElement(\'a\', { href: "https://www.youtube.com/watch?v=1MtEUErz7Gg", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 690}}, "Explanatory video"\n\n          )\n        )\n      )\n    )\n  )\n});\n\n\n//# sourceURL=webpack://workshop/./src/hexSandpiles/index.tsx?')},3646:module=>{"use strict";eval('module.exports = "#version 300 es\\nprecision mediump float;\\nprecision mediump usampler2D;\\n#define GLSLIFY 1\\n\\n// this shader defines a virtual texture, which renders\\n// a hex \\"(height-)map\\" saved as ODDR\\n\\n// texture coordinate to render\\nin vec2 coord;\\n\\nuniform vec4 colorBg;\\nuniform vec4[10] colorFg;\\n\\nuniform mat4 tt;\\n\\nconst int MAX_MARCHING_STEPS = 255;\\nconst float MIN_DIST = 0.0;\\nconst float MAX_DIST = 100.0;\\n\\nconst uint SINK = 255u;\\n\\nout vec4 fragColor;\\n\\n// the \\"map\\" being rendered. also implicitely defines the\\n// size of the texture.\\n// width: x is in [-0.5, heights.width], (0, 0) is the center of the first hex\\n// height: sqrt(3) / 2 * heights.height\\nuniform usampler2D heights;\\n\\nvec3 raToHex(vec2 xy) {\\n    float hex_t = xy.y / 0.866;\\n    float hex_s = xy.x - hex_t / 2.0;\\n    return vec3(hex_s, hex_t, -(hex_s + hex_t));\\n}\\n\\nvec2 hexToRa(vec3 hex) {\\n    float y = hex.t * 0.866;\\n    float x = hex.s + hex.t / 2.0;\\n    return vec2(x, y);\\n}\\nivec2 cube_to_oddr(ivec3 cube) {\\n    int col = cube.x + (cube.y - (cube.y&1)) / 2;\\n    int row = cube.y;\\n    return ivec2(col, row);\\n}\\nivec3 oddr_to_cube(ivec2 hex) {\\n    int x = hex.x - (hex.y - (hex.y&1)) / 2;\\n    int y = hex.y;\\n    int z = -x-y;\\n    return ivec3(x, y, z);\\n}\\n\\nvec3 hexRound(vec3 hex) {\\n    vec3 r = floor(hex + 0.5);\\n    vec3 diff = abs(r - hex);\\n\\n    if (diff.x > diff.y && diff.x > diff.z) {\\n        r.x = -(r.y + r.z);\\n    } else if (diff.y > diff.z) {\\n        r.y = -(r.x + r.z);\\n    } else {\\n        r.z = -(r.x + r.y);\\n    }\\n\\n    return r;\\n}\\nfloat max3 (vec3 v) {\\n    return max (max (v.x, v.y), v.z);\\n}\\nfloat min3 (vec3 v) {\\n    return max (max (v.x, v.y), v.z);\\n}\\nfloat hex_sdf(vec3 h) {\\n    return max3(abs(h.yzx + h.zxy / 2.0));\\n    // return abs(h.x+(h.y/2.0) );\\n    // return max3(abs(vec3(h)));\\n}\\n\\nbool between(float min, float max, float x) {\\n    return min <= x && x <= max;\\n}\\n\\nuint heightAt(ivec2 p) {\\n    ivec2 tex_size = textureSize(heights, 0);\\n\\n    if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {\\n        // point is outside source texture, treat as sink\\n        return SINK;\\n    } else {\\n        return texelFetch(heights, p, 0).r;\\n    }\\n}\\n\\nvoid main() {\\n    // vec2 pos2 = vec4(coord, 0.0, 1.0).xy * 400.0;\\n    vec2 pos2 = (tt * vec4(coord, 0.0, 1.0)).xy;\\n\\n    // fragColor = length(pos2 - vec2(100.0, 100.0)) < 50.0\\n    // ? colorFg[0]\\n    // : colorBg;\\n    // return;\\n    vec3 hex_pos = raToHex(pos2);\\n    // vec2 hex_center = floor(hex_pos + 0.5);\\n    vec3 hex_center = hexRound(hex_pos);\\n    vec2 center = hexToRa(hex_center);\\n    vec2 squarePos = floor(pos2 + 0.5);\\n    vec3 hex_d = hex_pos - hex_center;\\n    // vec2 d =hex_pos - hex_center;\\n    // vec3 zz = vec3(d.xy, (d.y - d.x)/1.41);\\n    vec2 local_ra_offset = pos2 - center;\\n    // if (abs(zz.x +zz.y+ zz.z) < 0.1) {\\n    // if (max(d.x, max(d.y, 0.0)) < 0.45) {\\n    // if (length(pos2 - squarePos) < 0.5) {\\n    float d = hex_sdf(hex_d);\\n    if (between(0.0, 0.425, d)\\n    // || length(pos2 - center) < 0.2\\n    ) {\\n        // if (length (pos2 - center) <0.53){\\n        // if (length (hex_pos - hex_center) <0.45){\\n        ivec2 center2 = cube_to_oddr(ivec3(hex_center));\\n        uint value = heightAt(center2);\\n        uint valueClamped = clamp(value, 0u, uint(colorFg.length()) - 1u);\\n        fragColor = value == 255u ? colorBg : colorFg[valueClamped];\\n    } else {\\n        fragColor = colorBg;\\n    }\\n}";\n\n//# sourceURL=webpack://workshop/./src/hexSandpiles/FS.frag?')},1237:module=>{"use strict";eval('module.exports = "#version 300 es\\n#define GLSLIFY 1\\nin vec4 ts_Vertex;\\nin vec2 ts_TexCoord;\\nout vec2 coord;\\nvoid main() {\\n    coord = ts_TexCoord.xy;\\n    gl_Position = ts_Vertex;\\n}";\n\n//# sourceURL=webpack://workshop/./src/hexSandpiles/directVS.vert?')},5068:module=>{"use strict";eval('module.exports = "#version 300 es\\nprecision mediump float;\\nprecision mediump usampler2D;\\n#define GLSLIFY 1\\nin vec2 coord;\\n\\nuniform vec2 iResolution;\\nuniform vec4 colorBg;\\nuniform vec4[10] colorFg;\\n\\nout uvec4 fragColor;\\n\\nconst uint SINK = 255u;\\n\\nuniform usampler2D heights;\\n\\nfloat EPSILON = 0.0001;\\n\\nvec3 raToHex(vec2 xy) {\\n    float hex_t = xy.y / 0.866;\\n    float hex_s = xy.x - hex_t / 2.0;\\n    return vec3(hex_s, hex_t, -(hex_s + hex_t));\\n}\\n\\nvec2 hexToRa(vec3 hex) {\\n    float y = hex.t * 0.866;\\n    float x = hex.s + hex.t / 2.0;\\n    return vec2(x, y);\\n}\\nivec2 cube_to_oddr(ivec3 cube) {\\n    int col = cube.x + (cube.y - (cube.y&1)) / 2;\\n    int row = cube.y;\\n    return ivec2(col, row);\\n}\\nivec3 oddr_to_cube(ivec2 hex) {\\n    int x = hex.x - (hex.y - (hex.y&1)) / 2;\\n    int y = hex.y;\\n    int z = -x-y;\\n    return ivec3(x, y, z);\\n}\\n\\nvec3 hexRound(vec3 hex) {\\n    vec3 r = floor(hex + 0.5);\\n    vec3 diff = abs(r - hex);\\n\\n    if (diff.x > diff.y && diff.x > diff.z) {\\n        r.x = -(r.y + r.z);\\n    } else if (diff.y > diff.z) {\\n        r.y = -(r.x + r.z);\\n    } else {\\n        r.z = -(r.x + r.y);\\n    }\\n\\n    return r;\\n}\\nfloat max3 (vec3 v) {\\n    return max (max (v.x, v.y), v.z);\\n}\\nfloat min3 (vec3 v) {\\n    return max (max (v.x, v.y), v.z);\\n}\\nfloat hex_sdf(vec3 h) {\\n    return max3(abs(h.yzx + h.zxy/2.0));\\n    // return abs(h.x+(h.y/2.0) );\\n    // return max3(abs(vec3(h)));\\n}\\n\\nbool between(float min, float max, float x) {\\n    return min <= x && x <= max;\\n}\\n\\nuint heightAt(ivec2 p) {\\n    ivec2 tex_size = textureSize(heights, 0);\\n\\n    if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {\\n        // point is outside source texture, treat as sink\\n        return SINK;\\n    } else {\\n        return texelFetch(heights, p, 0).r;\\n    }\\n}\\n\\nuint at(ivec2 p) {\\n    uint value = heightAt(p);\\n    if (SINK == value) {\\n        return 0u;\\n    } else {\\n        return value / 6u;\\n    }\\n}\\n\\nuint calc(ivec2 oddr_pos) {\\n    uint value = texelFetch(heights, oddr_pos, 0).r;\\n\\n    if (SINK == value) {\\n        return SINK;\\n    }\\n\\n    // the current pos topples as many times as it can\\n    value = value % 6u;\\n    // all the neighbors topple as often as they can\\n    value += at(oddr_pos + ivec2(+1, 0));\\n    value += at(oddr_pos + ivec2(-1, 0));\\n\\n    value += at(oddr_pos + ivec2(0, +1));\\n    value += at(oddr_pos + ivec2(0, -1));\\n\\n    value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, +1));\\n    value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, -1));\\n\\n    return value;\\n}\\n\\nvoid main() {\\n    fragColor = uvec4(calc(ivec2(coord)), 0u, 0u, 0u);\\n    // fragColor = uvec4(2u, 0u, 0u, 0u);\\n}";\n\n//# sourceURL=webpack://workshop/./src/hexSandpiles/step.frag?')},1216:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";eval('module.exports = __webpack_require__.p + "9f2a6e398434ad4fb383.ttf";\n\n//# sourceURL=webpack://workshop/./src/hexSandpiles/OleoScript-Bold.ttf?')},2993:()=>{eval("/* (ignored) */\n\n//# sourceURL=webpack://workshop/fs_(ignored)?")}}]);