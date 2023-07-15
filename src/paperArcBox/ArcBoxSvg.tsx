import * as React from "react"
import { CSSProperties, ReactElement, useContext } from "react"
import { SVGPathData } from "svg-pathdata"
import { CommandA } from "svg-pathdata/lib/types"
import { INCH } from "../paperBox1/common"
import { Measure, SvgPrintContext } from "../paperBox1/Measure"
import { PaperSize } from "../paperBox1/PaperSize"
import * as path from "../paperBox1/svg"
import { SvgCommonDefs } from "../paperBox1/SvgCommonDefs"

export function ArcBoxSvg({
  paperSize,
  radius,
  width: w,
  height: h,
  tabWidth,
  style,
}: {
  radius: number
  width: number
  height: number
  tabWidth: number
  style?: CSSProperties
  paperSize: PaperSize
}): ReactElement {
  const slotRadius = w * 0.1
  const slotWidth = 1.96 * slotRadius
  const rise = radius - Math.sqrt(radius ** 2 - (w / 2) ** 2)
  const slotRise = radius - Math.sqrt(radius ** 2 - (slotWidth / 2) ** 2)

  const [width, height] = paperSize
  const print = useContext(SvgPrintContext)

  // (w/2-tabWidth)^2 + tabDescent^2 = radius^2
  const tabDescent =
    Math.sqrt(radius ** 2 - (w / 2 - tabWidth) ** 2) -
    Math.sqrt(radius ** 2 - (w / 2) ** 2)

  const cArc = (
    r: number,
    x: number,
    y: number,
    sweepFlag: 0 | 1 = 1,
  ): CommandA => ({
    type: SVGPathData.ARC,
    rX: r,
    rY: r,
    xRot: 0,
    lArcFlag: 0,
    sweepFlag: sweepFlag,
    x: x,
    y: y,
    relative: false,
  })

  const outline = new SVGPathData([
    { type: SVGPathData.MOVE_TO, x: 0, y: rise, relative: false },
    // top
    cArc(radius, w / 2 - slotWidth / 2, slotRise),
    cArc(slotRadius, w / 2 + slotWidth / 2, slotRise, 0),
    cArc(radius, w, rise),
    cArc(radius, 2 * w, rise),
    // tab
    cArc(radius, 2 * w + tabWidth, rise + tabDescent, 0),
    {
      type: SVGPathData.LINE_TO,
      x: 2 * w + tabWidth,
      y: rise + h - tabDescent,
      relative: false,
    },
    cArc(radius, 2 * w, h + rise, 0),
    // bottom
    cArc(radius, w, h + rise),
    cArc(radius, 0, h + rise),
    { type: SVGPathData.CLOSE_PATH },
  ]).encode()

  const glue = new SVGPathData([
    // tab
    path.M(2 * w, rise),
    cArc(radius, 2 * w + tabWidth, rise + tabDescent, 0),
    {
      type: SVGPathData.LINE_TO,
      x: 2 * w + tabWidth,
      y: rise + h - tabDescent,
      relative: false,
    },
    cArc(radius, 2 * w, h + rise, 0),
    path.Z(),
  ]).encode()

  const fold = new SVGPathData([
    { type: SVGPathData.MOVE_TO, x: 0, y: rise, relative: false },
    cArc(radius, w, rise, 0),
    cArc(radius, 2 * w, rise, 0),
    {
      type: SVGPathData.LINE_TO,
      x: 2 * w,
      y: h + rise,
      relative: false,
    },
    cArc(radius, w, h + rise, 0),
    cArc(radius, 0, h + rise, 0),
    path.M(w, rise),
    { type: SVGPathData.LINE_TO, x: w, y: h + rise, relative: false },
  ]).encode()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: "none",
        stroke: "#123456",
        strokeWidth: (2 * INCH) / 300,
        ...style,
      }}
      width={width + "mm"}
      height={height + "mm"}
      viewBox={`0 0 ${width} ${height}`}
      className="adrian"
    >
      <defs>
        <clipPath id="page">
          <rect width={width} height={height} />
        </clipPath>
      </defs>
      <SvgCommonDefs />
      {!print && <path d={glue} className="glue" />}
      <path d={outline} />
      <path d={fold} className="valley" />
      <g>
        <Measure from={[w / 2, 0]} to={[w / 2, h + 2 * rise]} offset={-0.5} />
        <Measure from={[w, rise]} to={[w, h + rise]} />
        <Measure from={[0, h - 10]} to={[2 * w + tabWidth, h - 10]} />
        <Measure
          from={[1.5 * w, radius]}
          to={[2 * w, rise]}
          offset={-0.5}
          hideRight={true}
        />
      </g>
    </svg>
  )
}
