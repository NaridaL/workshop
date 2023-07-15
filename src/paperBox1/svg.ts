import { SVGPathData } from "svg-pathdata"
import { CommandL, CommandS, CommandV } from "svg-pathdata/lib/types"

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

export const M = (x: number, y: number) => ({
  type: SVGPathData.MOVE_TO,
  x,
  y,
  relative: false,
})
export const m = (x: number, y: number) => ({
  type: SVGPathData.MOVE_TO,
  x,
  y,
  relative: true,
})
export const L = (x: number, y: number) => ({
  type: SVGPathData.LINE_TO,
  x,
  y,
  relative: false,
})
export const l = (x: number, y: number): CommandL => ({
  type: SVGPathData.LINE_TO,
  x,
  y,
  relative: true,
})

export const Z = () => ({ type: SVGPathData.CLOSE_PATH })
