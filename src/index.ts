import { TSGLContext, Mesh, Shader, Texture } from "tsgl"
import * as chroma from "chroma.ts"
import sleep from "sleep-promise"
import { V } from "ts3dutils"
import { assert } from "chai"

import directVS from "./directVS.vert"
import FS from "./FS.frag"
import stepFS from "./step.frag"

const gl: TSGLContext & WebGL2RenderingContextStrict = TSGLContext.create()

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

document.body.append(gl.canvas)
const SQRT3_2 = Math.sqrt(3) / 2
const ilog = (x: any) => (console.log(x), x)

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
  [x2, y2, z2]: [int, int, int]
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

assert.deepEqual(oddr_to_cube(0, 0), [0, 0, -0])
assert.deepEqual(oddr_to_cube(1, 0), [1, 0, -1])
assert.deepEqual(oddr_to_cube(0, 1), [0, 1, -1])
assert.deepEqual(oddr_to_cube(0, 2), [-1, 2, -1])
class HexSand {
  data: Uint8Array
  public constructor(public w: int, public h: int) {
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

  fillf(f: (x: int, y: int, i: int) => int) {
    for (let i = 0; i < this.h * this.w; i++) {
      const x = i % this.w
      const y = (i / this.w) | 0
      if (SINK !== this.data[i]) this.data[i] = f(x, y, i)
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
  async asyncStabilize() {
    upload()
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
            async (x, y) => !this.isSink(x, y) && this.addOddr(x, y, 1)
          )
          this.addOddr(x, y, -6)
          changed++
        }
      }
      upload()
      await sleep(10)
    } while (changed != 0)
    console.log("stabilized")
    await sleep(2000)
  }

  async calcHash(): Promise<string> {
    return Array.from(
      new Uint8Array(await crypto.subtle.digest("SHA-1", this.data))
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
}

const colorFg = chroma.scale("yellow", "blue").mode("lab").colors(10, "gl")
const colorBg = chroma.color("F4F4ED").gl()

gl.fullscreen()
// gl.enable(gl.SAMPLE_COVERAGE);
// gl.sampleCoverage(0.5, false);
console.log(gl.canvas.width, gl.canvas.height)

const shader = Shader.create(directVS, FS)
const stepShader = Shader.create(directVS, stepFS)

const field = new HexSand(256, 256)
const texture = new Texture(field.w, field.h, {
  filter: gl.NEAREST,
  internalFormat: gl.R8UI,
  format: gl.RED_INTEGER,
})
const texture2 = new Texture(field.w, field.h, {
  filter: gl.NEAREST,
  internalFormat: gl.R8UI,
  format: gl.RED_INTEGER,
})
console.log(
  "IMPLEMENTATION_COLOR_READ_FORMAT",
  gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT).toString(16)
)
console.log(
  "IMPLEMENTATION_COLOR_READ_TYPE",
  gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_TYPE).toString(16)
)
const upload = () => texture.setData(field.data)
field.fill(SINK)
// field.data[1000] = 200
field.drawHex(20, 100, 0)
// field.drawCircle(0, 50, 0)
// field.drawTriangle(50, 65, 0)
// field.drawTriangle(30, 45, 0)
// field.drawTriangle(10, 25, 0)
field.fill(10)

upload()

// for (let i = 0; i < fieldSize.height * fieldSize.width; i++) {
//   field[i] = (Math.random() * 10) | 0
// }

type int = number

const forEachNeighbor = async (
  x: int,
  y: int,
  f: (x: int, y: int) => void
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
  f: (x: int, y: int) => void
): Promise<void> => {
  await f(x, y)
  await forEachNeighbor(x, y, f)
}
const colorHex = async (x: int, y: int, value: int) =>
  andNeighbors(x, y, async (x, y) => {
    field.setOddr(x, y, value)
    upload()
    await sleep(60)
  })

;async () => {
  await colorHex(10, 10, 3)
  await colorHex(20, 10, 3)
  await colorHex(30, 11, 3)
  await colorHex(25, 12, 3)
}
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

const plane = makePlane(
  -0.5,
  -0.5,
  field.w,
  field.w / (gl.canvas.width / gl.canvas.height)
)

const stepPlane = makePlane(0, 0, field.w, field.h)
const stabilize = async () => {
  while (field.countUnstable() > 0) {
    for (let i = 0; i < 100; i++) {
      for (let ss = 0; ss < 10; ss++) {
        texture2.drawTo((gl) => {
          texture.bind(0)
          stepShader.uniforms({ heights: 0 }).draw(stepPlane)
        })
        texture.swapWith(texture2)
      }
      await sleep(10)
    }
    texture.downloadData(field.data)
    console.log("stabilize", field.countUnstable(), await field.calcHash())
  }
}

const naive = async () => {
  field.fill(10)
  upload()
  await sleep(2000)
  await stabilize()
  field.dualize()
  upload()
  await sleep(3000)
  field.plus(5)
  upload()
  await sleep(3000)
  await stabilize()
  const zero = field.clone()
  console.log("zero hash", await zero.calcHash())
  return

  field.fillf(() => (5 + Math.random() * 3) | 0)
  await stabilize()
  const testF = field.clone()
  console.log("testF hash", await testF.calcHash())
  await sleep(2000)

  console.log("add zero")
  field.plusHS(zero)
  await sleep(2000)
  await field.asyncStabilize()

  console.log("testF + zero hash", await field.calcHash())
}
naive()
gl.animate(() => {
  texture.bind(0)
  shader
    .uniforms({
      iResolution: [800, 600],
      colorBg,
      "colorFg[0]": colorFg,
      aspectRatio: gl.canvas.width / gl.canvas.height,
      heights: 0,
    })
    .draw(plane)
})
