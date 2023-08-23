import last from "lodash/last"
import { SVGPathData } from "svg-pathdata"
import {
  CommandA,
  CommandC,
  CommandH,
  CommandL,
  CommandM,
  CommandS,
  CommandV,
  SVGCommand,
} from "svg-pathdata/lib/types"
import { V3, V as VV } from "ts3dutils"

export function H(x: number): CommandH {
  return { type: SVGPathData.HORIZ_LINE_TO, relative: false, x: x }
}

export function A(
  rx: number,
  ry: number,
  xAxisRotation: number,
  largeArcFlag: 0 | 1,
  sweepFlag: 0 | 1,
  p: V3,
): CommandA {
  return {
    lArcFlag: largeArcFlag,
    rX: rx,
    rY: ry,
    relative: false,
    sweepFlag: sweepFlag,
    type: SVGPathData.ARC,
    x: p.x,
    xRot: 0,
    y: p.y,
  }
}

export const C = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number,
): CommandC => ({
  type: SVGPathData.CURVE_TO,
  x1,
  y1,
  x2,
  y2,
  x,
  y,
  relative: false,
})

export const V = (y: number): CommandV => ({
  type: SVGPathData.VERT_LINE_TO,
  y,
  relative: false,
})

export const S = (x2: number, y2: number, x: number, y: number): CommandS => ({
  type: SVGPathData.SMOOTH_CURVE_TO,
  x2,
  y2,
  x,
  y,
  relative: false,
})

export function M(p: V3): CommandM
export function M(x: number, y: number): CommandM
export function M(a1: number | V3, a2?: number) {
  const [x, y] = a2 === undefined ? [(a1 as V3).x, (a1 as V3).y] : [a1, a2]
  return { type: SVGPathData.MOVE_TO, x, y, relative: false }
}

export const m = (x: number, y: number) => ({
  type: SVGPathData.MOVE_TO,
  x,
  y,
  relative: true,
})

export function L(p: V3): CommandL
export function L(x: number, y: number): CommandL
export function L(a1: number | V3, a2?: number) {
  const [x, y] = a2 === undefined ? [(a1 as V3).x, (a1 as V3).y] : [a1, a2]
  return { type: SVGPathData.LINE_TO, x, y, relative: false }
}

export const l = (x: number, y: number): CommandL => ({
  type: SVGPathData.LINE_TO,
  x,
  y,
  relative: true,
})

export const Z = () => ({ type: SVGPathData.CLOSE_PATH })

export const encode = (...path: (SVGCommand | DynamicCommands)[]): string => {
  const modPath: SVGCommand[] = []
  let lastX = 0,
    lastY = 0
  for (const c of path) {
    if ("function" === typeof c) {
      for (const c2 of c(lastX, lastY)) {
        modPath.push(c2)
      }
    } else {
      modPath.push(c)
    }
    const lastC = last(modPath)!
    if ("x" in lastC) lastX = lastC.x
    if ("y" in lastC) lastY = lastC.y
  }
  return new SVGPathData(modPath).round(3).encode()
}
export type DynamicCommands = (x: number, y: number) => SVGCommand[]

export function Corner(rad: number, x: number, y: number): DynamicCommands {
  return (prevX, prevY) => {
    const prev = VV(prevX, prevY)
    const p1 = VV(x, y)
    const dir1 = prev.to(p1).toLength(rad)
    const p2 = VV(p1.x + dir1.y, p1.y - dir1.x)
    return [L(p1.minus(dir1)), A(rad, rad, 0, 0, 0, p2)]
  }
}
