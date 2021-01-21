import * as React from "react"
import { int, mod, V, V3 } from "ts3dutils"

interface Head {
  pos: V3
  dir: number
}
const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3]
const FILLED: "FILLED" = "FILLED"
const OPEN: "OPEN" = "OPEN"
type GridStatus = "FILLED" | "OPEN"
class QuadTreeFill {
  private readonly grid: boolean[]
  private readonly heads: Head[] = []
  constructor(public readonly width: number, public readonly height: number) {
    this.grid = new Array(width * height)
  }

  addHead(head: Head) {
    this.heads.push(head)
  }

  check(p: V3): GridStatus {
    const { x, y } = p
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return FILLED
    }
    return this.grid[y * this.width + x] ? FILLED : OPEN
  }
  step(): boolean {
    return this.heads.length != 0
  }
  turn(dir: int, d: int): int {
    return mod(dir + d, 4)
  }
  mov(pos: V3, dir: int) {
    return pos.plus([V3.Y, V3.X, V3.Y.negated(), V3.X.negated()][dir])
  }

  toSVG() {}
}

function build() {
  const q = new QuadTreeFill(400, 300)
  q.addHead({ pos: V(200, 0), dir: DOWN })
  for (let i = 0; i < 1000 && q.step(); i++) {}
  return q
}

export default function () {
  return <div>hi</div>
}
