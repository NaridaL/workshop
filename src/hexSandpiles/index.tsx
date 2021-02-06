import useTheme from "@material-ui/core/styles/useTheme"
import { assert } from "chai"
import * as chroma from "chroma.ts"
import { Font, load } from "opentype.js"
import * as React from "react"
import { ReactElement, useEffect, useRef } from "react"
import sleep from "sleep-promise"
import { M4, V } from "ts3dutils"
import { GL_COLOR, Mesh, Shader, Texture, TSGLContext } from "tsgl"

import directVS from "./directVS.vert"
import FS from "./FS.frag"
import oleo from "./OleoScript-Bold.ttf"
import stepFS from "./step.frag"

type int = number

const makePlane = (x0: int, y0: int, x1: int, y1: int) => {
  const plane = Mesh.plane({
    startX: -1,
    width: 2,
    startY: -1,
    height: 2,
  })
  plane.coords[0] = [x0, y0]
  plane.coords[1] = [x1, y0]
  plane.coords[2] = [x0, y1]
  plane.coords[3] = [x1, y1]
  plane.compile()
  return plane
}
const forEachNeighbor = async (
  x: int,
  y: int,
  f: (x: int, y: int) => void,
): Promise<void> => {
  await f(x + 1, y)
  await f(x - 1, y)
  await f(x, y + 1)
  await f(x, y - 1)
  // +- 1, depending on even/odd row
  await f(x + 1 - (y & 1) * 2, y + 1)
  await f(x + 1 - (y & 1) * 2, y - 1)
}
const andNeighbors = async (
  x: int,
  y: int,
  f: (x: int, y: int) => void,
): Promise<void> => {
  await f(x, y)
  await forEachNeighbor(x, y, f)
}

// https://www.redblobgames.com/grids/hexagons/#coordinates

//       ODDR (odd-right) Coords
// Y
// ^ 0:2   1:2   2:2
// |    0:1   1:1   2:0
// | 0:0   1:0   2:0
// +------------------> X

//      Cube Coords
//
//
//  -1:2:-1   0:2:-2   1:2:-3
//        0:1:-1   1:1:-2   2:1:-3
//   0:0:0    1:0:-1   2:0:-2
//  --------------------> X

const SQRT3_2 = Math.sqrt(3) / 2

const oddr_to_px = (col: int, row: int) => {
  const x = col + 0.5 * (row & 1)
  const y = row * SQRT3_2
  return V(x, y, 0)
}
const SINK = 255

assert(oddr_to_px(0, 0).equals(V(0, 0)))
assert(oddr_to_px(1, 0).equals(V(1, 0)))
assert(oddr_to_px(0, 1).equals(V(0.5, SQRT3_2)))

const cube_distance = (
  [x1, y1, z1]: [int, int, int],
  [x2, y2, z2]: [int, int, int],
) => (Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1)) / 2

const oddr_distance = (x1: int, y1: int, x2: int, y2: int) =>
  cube_distance(oddr_to_cube(x1, y1), oddr_to_cube(x2, y2))

const cube_to_oddr = ([x, y, z]: [int, int, int]): [int, int] => {
  const col = x + (y - (y & 1)) / 2
  const row = y
  return [col, row]
}
const oddr_to_cube = (col: int, row: int): [int, int, int] => {
  const x = col - (row >> 1)
  const y = row
  const z = -x - y
  return [x, y, z]
}

const loadFont = (url: string): Promise<Font> =>
  new Promise((resolve, reject) => {
    load(url, (error, font) => (error ? reject(error) : resolve(font!)))
  })

assert.deepEqual(oddr_to_cube(0, 0), [0, 0, -0])
assert.deepEqual(oddr_to_cube(1, 0), [1, 0, -1])
assert.deepEqual(oddr_to_cube(0, 1), [0, 1, -1])
assert.deepEqual(oddr_to_cube(0, 2), [-1, 2, -1])
assert.deepEqual(oddr_to_cube(-1, 0), [-1, 0, 1])
assert.deepEqual(oddr_to_cube(0, -1), [1, -1, 0])
assert.deepEqual(oddr_to_cube(-1, -1), [0, -1, 1])
assert.deepEqual(oddr_to_cube(0, -2), [1, -2, 1])
class HexSand {
  readonly data: Uint8Array
  public constructor(public readonly w: int, public readonly h: int) {
    this.data = new Uint8Array(w * h)
  }

  clone() {
    const hs = new HexSand(this.w, this.h)
    hs.plusHS(this)
    return hs
  }
  dualize() {
    for (let i = 0; i < this.h * this.w; i++) {
      if (SINK !== this.data[i]) this.data[i] = 5 - this.data[i]
    }
    console.log("dualized")
  }
  plus(x: int) {
    for (let i = 0; i < this.h * this.w; i++) {
      if (SINK !== this.data[i]) this.data[i] += x
    }
    console.log("plus " + x)
  }
  times(x: int) {
    for (let i = 0; i < this.h * this.w; i++) {
      if (SINK !== this.data[i]) this.data[i] *= x
    }
    console.log("times " + x)
  }
  setHS(o: HexSand) {
    for (let i = 0; i < this.h * this.w; i++) {
      this.data[i] = o.data[i]
    }
  }
  plusHS(o: HexSand) {
    for (let i = 0; i < this.h * this.w; i++) {
      if (SINK !== this.data[i]) this.data[i] += o.data[i]
    }
  }
  fill(n: int) {
    for (let i = 0; i < this.h * this.w; i++) {
      if (SINK !== this.data[i]) this.data[i] = n
    }
  }

  fillf(f: (x: int, y: int, i: int, value: int) => int) {
    for (let i = 0; i < this.h * this.w; i++) {
      const x = i % this.w
      const y = (i / this.w) | 0
      if (SINK !== this.data[i]) this.data[i] = f(x, y, i, this.data[i])
    }
  }

  getOddr(x: int, y: int): int {
    return this.data[y * this.w + x]
  }
  setOddr(x: int, y: int, value: int) {
    return (this.data[y * this.w + x] = value)
  }
  addOddr(x: int, y: int, value: int): int {
    return (this.data[y * this.w + x] += value)
  }
  isSink(x: int, y: int): boolean {
    return this.getOddr(x, y) === SINK
  }

  drawHex(inner: int, outer: int, value: int) {
    const cx = (this.w / 2) | 0
    const cy = (this.h / 2) | 0
    for (let i = 0; i < this.h * this.w; i++) {
      const x = i % this.w
      const y = (i / this.w) | 0
      if (
        inner <= oddr_distance(cx, cy, x, y) &&
        oddr_distance(cx, cy, x, y) <= outer
      ) {
        this.data[i] = value
      }
    }
  }
  async drawText(
    oddr_cx: int,
    oddr_cy: int,
    text: string,
    fontSize: int,
    value: int,
  ) {
    const font = await loadFont(oleo)
    const path = font.getPath(text, 0, 0, fontSize)
    const pathBB = path.getBoundingBox()
    const c = V(oddr_cx, oddr_cy)
    const pathBBSize = V(pathBB.x1, pathBB.y1).to(V(pathBB.x2, pathBB.y2))

    console.log("path", path)

    const canvas = document.createElement("canvas")
    canvas.width = (pathBB.x2 - pathBB.x1) * 2
    canvas.height = (pathBB.y2 - pathBB.y1) * 2
    const context = canvas.getContext("2d")!
    context.scale(2, 2)
    context.translate(-pathBB.x1, -pathBB.y1)
    context.fillStyle = "black"
    context.imageSmoothingEnabled = false
    // document.body.appendChild(canvas)
    path.draw(context)
    // canvas.setAttribute("d", path)

    // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    // svg.setAttribute("fill", "black")
    // svg.setAttribute("width", "400")
    // svg.setAttribute("height", "100")
    // svg.appendChild(canvas)
    // document.body.appendChild(svg)
    const offset = oddr_to_px(oddr_cx, oddr_cy).minus(pathBBSize.div(2))
    const p = context.getImageData(0, 0, canvas.width, canvas.height).data
    for (let i = 0; i < this.h * this.w; i++) {
      const x = i % this.w
      const y = (i / this.w) | 0
      const px = oddr_to_px(x, y).minus(offset)
      if (
        0 < px.x &&
        px.x < pathBB.x2 - pathBB.x1 &&
        0 < px.y &&
        px.y < pathBB.y2 - pathBB.y1
      ) {
        if (
          p[(((px.y * 2) | 0) * canvas.width + ((px.x * 2) | 0)) * 4 + 3] > 127
        ) {
          this.data[i] = value
        }
      }
    }
  }
  drawTriangle(inner: int, outer: int, value: int) {
    const cx = (this.w / 2) | 0
    const cy = (this.h / 2) | 0

    for (let i = 0; i < this.h * this.w; i++) {
      const x = i % this.w
      const y = (i / this.w) | 0
      const d = Math.max(...oddr_to_cube(x - cx, y - cy))
      if (inner <= d && d <= outer) {
        this.data[i] = value
      }
    }
  }
  drawCircle(inner: int, outer: int, value: int) {
    const cx = (this.w / 2) | 0
    const cy = (this.h / 2) | 0
    const c = oddr_to_px(cx, cy)

    for (let i = 0; i < this.h * this.w; i++) {
      const x = i % this.w
      const y = (i / this.w) | 0
      const d = oddr_to_px(x, y).distanceTo(c)
      if (inner <= d && d <= outer) {
        this.data[i] = value
      }
    }
  }
  drawRect(w: int, h: int, value: int) {
    for (let i = 0; i < this.h * this.w; i++) {
      const x = (i % this.w) - ((this.w / 2) | 0)
      const y = ((i / this.w) | 0) - ((this.h / 2) | 0)
      const cc = V(...oddr_to_cube(x, y))
      if (
        Math.abs(cc.x + (cc.y >> 1)) < w / 2 &&
        Math.abs(cc.y) < h / 2 &&
        Math.abs(cc.x) < w / 2 + 12 &&
        Math.abs(cc.z) < w / 2 + 12
      ) {
        this.data[i] = value
      }
    }
  }
  async asyncStabilizeNoShader() {
    let changed
    do {
      changed = 0
      for (let i = 0; i < this.h * this.w; i++) {
        const x = i % this.w
        const y = (i / this.w) | 0

        if (!this.isSink(x, y) && this.getOddr(x, y) >= 6) {
          await forEachNeighbor(
            x,
            y,
            async (x, y) => !this.isSink(x, y) && this.addOddr(x, y, 1),
          )
          this.addOddr(x, y, -6)
          changed++
        }
      }
      await sleep(10)
    } while (changed != 0)
    console.log("stabilized")
    await sleep(2000)
  }

  private glInfo:
    | undefined
    | {
        t0: Texture
        t1: Texture
        gl: TSGLContext & WebGL2RenderingContextStrict
        stepPlane: Mesh
        stepShader: Shader
      }

  public createTextures(
    gl: TSGLContext & WebGL2RenderingContextStrict,
    stepShader: Shader,
  ) {
    this.glInfo?.gl === gl && (this.glInfo = undefined)
    if (!this.glInfo) {
      this.glInfo = {
        gl,
        t0: new Texture(this.w, this.h, {
          filter: gl.NEAREST,
          internalFormat: gl.R8UI,
          format: gl.RED_INTEGER,
        }),
        t1: new Texture(this.w, this.h, {
          filter: gl.NEAREST,
          internalFormat: gl.R8UI,
          format: gl.RED_INTEGER,
        }),
        stepPlane: makePlane(0, 0, this.w, this.h),
        stepShader,
      }
    }
    return this.glInfo.t0
  }

  async asyncStabilize() {
    const glInfo = this.glInfo!

    this.upload()

    while (this.countUnstable() > 0) {
      for (let i = 0; i < 1000; i++) {
        for (let ss = 0; ss < 1; ss++) {
          glInfo.t1.drawTo((_gl) => {
            glInfo.t0.bind(0)
            glInfo.stepShader.uniforms({ heights: 0 }).draw(glInfo.stepPlane)
          })
          glInfo.t0.swapWith(glInfo.t1)
        }
      }
      glInfo.t0.downloadData(this.data)
    }
  }

  *stabilizeInteractive(frameSteps = 1) {
    const glInfo = this.glInfo!

    this.upload()

    while (this.countUnstable() > 0) {
      for (let i = 0; i < 1000; i++) {
        for (let ss = 0; ss < frameSteps; ss++) {
          glInfo.t1.drawTo((_gl) => {
            glInfo.t0.bind(0)
            glInfo.stepShader.uniforms({ heights: 0 }).draw(glInfo.stepPlane)
          })
          glInfo.t0.swapWith(glInfo.t1)
        }
        yield
      }
      glInfo.t0.downloadData(this.data)
    }
  }

  async calcHash(): Promise<string> {
    return Array.from(
      new Uint8Array(await crypto.subtle.digest("SHA-1", this.data)),
    )
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  }

  countUnstable(): int {
    let unstable = 0
    for (let i = 0; i < this.w * this.h; i++)
      unstable += +(SINK !== this.data[i] && this.data[i] >= 6)
    return unstable
  }

  async calcRecurringInverse() {
    this.plus(10)
    await this.asyncStabilize()
    this.dualize()
    this.plus(5)
    await this.asyncStabilize()
  }

  async calcRecurringIdentity() {
    this.fill(10)
    await this.asyncStabilize()
    this.dualize()
    this.plus(5)
    await this.asyncStabilize()
  }

  upload() {
    this.glInfo!.t0.setData(this.data)
  }

  getOddrBB() {
    const rowEmpty = (y: int) => {
      for (let x = 0; x < this.w; x++)
        if (this.data[y * this.w + x] !== SINK) return false
      return true
    }
    let y0 = 0
    let y1 = this.h
    while (y0 < this.h && rowEmpty(y0)) y0++
    while (y1 > 0 && rowEmpty(y1 - 1)) y1--
    const colEmpty = (x: int) => {
      for (let y = y0; y < y1; y++)
        if (this.data[y * this.w + x] !== SINK) return false
      return true
    }
    let x0 = 0
    let x1 = this.w
    while (x0 < this.h && colEmpty(x0)) x0++
    while (x1 > 0 && colEmpty(x1 - 1)) x1--
    return {
      x0,
      x1,
      y0,
      y1,
    }
  }

  getBB() {
    const { x0, x1, y0, y1 } = this.getOddrBB()
    return {
      min: oddr_to_px(x0, y0),
      max: oddr_to_px(x1, y1),
    }
  }
}

const colorFg = chroma.scale("white", "green").mode("rgb").colors(10, "gl")
async function setup(canvas: HTMLCanvasElement, colorBg: GL_COLOR) {
  const gl: TSGLContext & WebGL2RenderingContextStrict = TSGLContext.create({
    canvas,
    throwOnError: true,
  }) as unknown

  console.log("gl", gl)

  gl.addResizeListener()

  // gl.enable(gl.SAMPLE_COVERAGE);
  // gl.sampleCoverage(0.5, false);
  console.log(gl.canvas.width, gl.canvas.height)

  const shader = Shader.create(directVS, FS)
  const stepShader = Shader.create(directVS, stepFS)

  const field = new HexSand(256, 256)
  const fieldTexture = field.createTextures(gl, stepShader)
  const plane = makePlane(-1, -1, 1, 1)
  const si = async (x: int) => {
    for (const _ of field.stabilizeInteractive(x)) {
      await sleep(16)
    }
  }

  const aspect = gl.canvas.width / gl.canvas.height
  gl.addResizeListener()
  console.log("aspect", aspect)

  field.fill(SINK)
  // field.data[1000] = 200
  field.drawHex(0, 80, 0)
  const fBB = field.getBB()
  const fBBd = fBB.min.to(fBB.max)
  const bbRatio = fBBd.x / fBBd.y
  console.log("ratios", aspect, bbRatio, "" + fBBd, fBB)
  //   forSys(fBBd.schur(V3.X), fBBd.schur(V3.Y), V3.Z, fBB.min)
  //     .inversed()
  const mm = M4
    // center AABB
    .translate(fBB.min.plus(fBB.max).times(-1 / 2))
    .scale(aspect < bbRatio ? 1 / fBBd.x : 1 / fBBd.y)
    // add border
    .scale(0.98)
    .scale(2)
    .scale(1, -1, 1)
    .scale(1 / aspect, 1, 1)
  //   field.drawRect(200, 100, 4)
  // field.drawCircle(0, 50, 0)
  // field.drawTriangle(50, 65, 0)
  // field.drawTriangle(30, 45, 0)
  // field.drawTriangle(10, 25, 0)
  //   field.fill(10)

  //   const base = field.clone()
  const queryParam = (p: string) =>
    new URL("" + document.location).searchParams.get(p)

  await field.calcRecurringIdentity()
  //   field.upload()
  //   return
  field.fillf((_x, _y, _i, v) => (SINK === v ? SINK : 3 + (v % 3)))
  //   field.drawRect(100, 50, 4)
  const queryTextBase64 = queryParam("t")
  await field.drawText(
    128,
    128,
    queryTextBase64 ? atob(queryTextBase64) : "Hi!",
    25,
    5,
  )
  //   field.upload()
  //   return

  //   field.fillf(() => (5 + Math.random() * 6) | 0)
  //   await field.calcRecurringInverse()
  //   await sleep(1000)
  //   field.plusHS(base)
  //   field.asyncStabilize()
  //   console.log("random + (-random)", await field.calcHash())
  //   await sleep(1000)

  //   create random field
  const rf = field.clone()
  rf.createTextures(gl, stepShader)
  rf.fillf(() => (5 + Math.random() * 6) | 0)
  await rf.asyncStabilize()
  //   rf.upload()

  // add it to field
  field.plusHS(rf)
  await field.asyncStabilize()

  await rf.calcRecurringInverse()

  field.plusHS(rf)
  field.upload()

  gl.animate(() => {
    fieldTexture.bind(0)
    shader
      .uniforms({
        iResolution: [800, 600],
        tt: mm.inversed(),
        colorBg,
        "colorFg[0]": colorFg,
        heights: 0,
      })
      .draw(plane)
  })

  await sleep(2000)
  await si(+(queryParam("speed") || "2"))
  field.upload()

  const colorHex = async (x: int, y: int, value: int) =>
    andNeighbors(x, y, async (x, y) => {
      field.setOddr(x, y, value)
      field.upload()
      await sleep(60)
    })

  // await colorHex(10, 10, 3)
  // await colorHex(20, 10, 3)
  // await colorHex(30, 11, 3)
  // await colorHex(25, 12, 3)

  console.log("aspect", aspect)

  const naive = async () => {
    field.fill(10)
    field.upload()
    await sleep(2000)
    await field.asyncStabilize()
    field.dualize()
    field.upload()
    await sleep(3000)
    field.plus(5)
    field.upload()
    await sleep(3000)
    await field.asyncStabilize()
    const zero = field.clone()
    console.log("zero hash", await zero.calcHash())
    return
  }
}
export default (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const theme = useTheme()

  useEffect(() => {
    setup(canvasRef.current!, chroma.css(theme.palette.background.default).gl())
  }, [theme.palette.background.default])

  const width = 32

  const c: React.CSSProperties = {
    boxSizing: "border-box",
    position: "relative",
    content: "",
    width,
    display: "block",
    height: width / SQRT3_2 / 4,
    borderWidth: `0 ${width / 2}px ${width / SQRT3_2 / 4}px ${width / 2}px`,
    borderStyle: "solid",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <canvas ref={canvasRef} style={{ flexGrow: 1 }} />
      <div
        style={{
          padding: 4,
          display: "flex",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {colorFg.map((value, index) => (
          <div
            className="hex"
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 4,
            }}
            key={index}
          >
            <div
              style={{
                ...c,
                borderColor: chroma.gl(value).css() + " transparent",
                borderWidth: `0 ${width / 2}px ${width / SQRT3_2 / 4}px ${
                  width / 2
                }px`,
              }}
            />
            <div
              style={{
                textAlign: "center",
                backgroundColor: chroma.gl(value).css(),
                height: width / SQRT3_2 / 2,
                color: chroma.gl(value).textColor().css(),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index === 9 ? "9+" : index}
            </div>
            <div
              style={{
                ...c,
                borderColor: chroma.gl(value).css() + " transparent",
                borderWidth: `${width / SQRT3_2 / 4}px ${width / 2}px 0 ${
                  width / 2
                }px`,
              }}
            />
          </div>
        ))}
        {/* <Tooltip title="Calculate Recuring Inverse">
          <Button>Calc Rec. Inv.</Button>
		</Tooltip>
		 */}
        <div style={{ textAlign: "right", padding: 10, flexGrow: 1 }}>
          <a href="http://people.reed.edu/~davidp/grant/">Original (square)</a>{" "}
          <a href="https://www.youtube.com/watch?v=1MtEUErz7Gg">
            Explanatory video
          </a>
        </div>
      </div>
    </div>
  )
}
