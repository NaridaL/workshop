import { SVGPathData } from "svg-pathdata"

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
export const l = (x: number, y: number) => ({
  type: SVGPathData.LINE_TO,
  x,
  y,
  relative: true,
})

export const Z = () => ({ type: SVGPathData.CLOSE_PATH })
