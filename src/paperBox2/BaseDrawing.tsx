import { encodeSVGPath, SVGPathData } from "svg-pathdata"
import {
  arrayFromFunction,
  arrayRange,
  DEG,
  int,
  round10,
  TAU,
  V,
  V3,
} from "ts3dutils"
import * as React from "react"

import { fmtdeg, INCH } from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"
import { MeasureAngle } from "../paperBox1/MeasureAngle"

const radiusFromSideWidth = (sides: int, sideWidth: number) =>
  sideWidth / 2 / Math.sin(TAU / sides / 2)
const centerToSideFromSideWidth = (sides: int, sideWidth: number) =>
  sideWidth / 2 / Math.tan(TAU / sides / 2)

export function BaseDrawing({
  radius,
  print = false,
  sides,
}: {
  radius: number
  print?: boolean
  sides: number
}) {
  const baseRadius = radius / 3
  const topRadius = (radius / 3) * 2
  const valley = encodeSVGPath([
    ...arrayRange(0, sides).flatMap((i) => {
      const m = V3.polar(baseRadius, (TAU / sides) * i)
      const d = V3.polar(radius, (TAU / sides) * i)
      return [
        { type: SVGPathData.MOVE_TO, relative: false, x: m.x, y: m.y },
        { type: SVGPathData.LINE_TO, relative: false, x: d.x, y: d.y },
      ]
    }),
  ])
  const mountain = encodeSVGPath([
    ...arrayRange(0, sides).flatMap((i) => {
      const m = V3.polar(baseRadius, (TAU / sides) * i)
      const d = V3.polar(baseRadius, (TAU / sides) * (i - 0.5)).to(
        V3.polar(topRadius, (TAU / sides) * (i - 0.5)),
      )
      const f = V3.polar(baseRadius, (TAU / sides) * (i - 1)).to(
        V3.polar(topRadius, (TAU / sides) * (i - 1)),
      )
      return [
        { type: SVGPathData.MOVE_TO, relative: false, x: m.x, y: m.y },
        { type: SVGPathData.LINE_TO, relative: true, x: d.x, y: d.y },
        { type: SVGPathData.LINE_TO, relative: true, x: f.x, y: f.y },
      ]
    }),
  ])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: "none",
        stroke: "#123456",
        strokeWidth: (2 * INCH) / 300,
        width: "100%",
        height: "100%",
      }}
    >
      <g transform={` scale(4) translate(${radius + 10}, ${radius + 10})`}>
        <circle r={radius} />
        <circle r={baseRadius} style={{ strokeDasharray: "1,1" }} />
        <circle r={topRadius} style={{ strokeDasharray: "1,1" }} />
        <path d={valley} style={{ strokeDasharray: "1,1" }} />
        <path d={mountain} style={{ strokeDasharray: "10,2,1,1,1,2" }} />
      </g>
    </svg>
  )
}
