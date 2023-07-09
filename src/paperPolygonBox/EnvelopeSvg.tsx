import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import { SVGPathData } from "svg-pathdata"
import { CommandA } from "svg-pathdata/lib/types"
import { DEG } from "ts3dutils"
import { INCH, PaperSize } from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"

export function EnvelopeDimensions(
  width: number,
  height: number,
  overlap: number,
  envelopeHeight: number,
) {
  const a = Math.min(width, height)
  const d = overlap / 2
  const r2 = d / (1 - Math.cos(45 * DEG))
  const h = r2 * Math.sin(45 * DEG)
  // s is the short perpendicular distance from the side to the indent.
  const s = Math.sin(45 * DEG) * envelopeHeight + d
  // t is the y-distance from the top to where the diagonal cut at the bottom right starts.
  const t = Math.sin(45 * DEG) * 2 * envelopeHeight + d
  const envelopeWidth = Math.sin(45 * DEG) * (a - d - s) * 2
  return { a, d, r2, h, s, t, envelopeWidth }
}
export function EnvelopeSvg({
  paperSize,
  envelopeHeight,
  overlap,
  cornerRadius,
  style,
}: {
  envelopeHeight: number
  overlap: number
  cornerRadius: number
  style?: CSSProperties
  paperSize: PaperSize
}): ReactElement {
  const r = 10

  const [width, height] = paperSize

  const { a, d, r2, h, s, t } = EnvelopeDimensions(
    width,
    height,
    overlap,
    envelopeHeight,
  )
  const cArc = (r: number, x: number, y: number): CommandA => ({
    type: SVGPathData.ARC,
    rX: r,
    rY: r,
    xRot: 0,
    lArcFlag: 0,
    sweepFlag: 1,
    x: x,
    y: y,
    relative: false,
  })

  const outline = new SVGPathData([
    { type: SVGPathData.MOVE_TO, x: 0, y: r, relative: false },
    // top
    cArc(r, r, 0),
    { type: SVGPathData.LINE_TO, x: a - s - h, y: 0, relative: false },
    cArc(r2, a - s, d),
    cArc(r2, a - s + h, 0),
    { type: SVGPathData.LINE_TO, x: a - r, y: 0, relative: false },
    // right
    cArc(r, a, r),
    { type: SVGPathData.LINE_TO, x: a, y: s - h, relative: false },
    cArc(r2, a - d, s),
    cArc(r2, a, s + h),
    { type: SVGPathData.LINE_TO, x: a, y: t - h, relative: false },
    // bottom right cut
    cArc(r2, a - d, t),
    { type: SVGPathData.LINE_TO, x: t, y: a - d, relative: false },
    // bottom
    cArc(r2, t - h, a),
    { type: SVGPathData.LINE_TO, x: s + h, y: a, relative: false },
    cArc(r2, s, a - d),
    cArc(r2, s - h, a),
    { type: SVGPathData.LINE_TO, x: r, y: a, relative: false },
    // left
    cArc(r, 0, a - r),
    { type: SVGPathData.LINE_TO, x: 0, y: a - s + h, relative: false },
    cArc(r2, d, a - s),
    cArc(r2, 0, a - s - h),
    { type: SVGPathData.CLOSE_PATH },
  ]).encode()

  const valley = new SVGPathData([
    { type: SVGPathData.MOVE_TO, x: a - s, y: d, relative: false },
    { type: SVGPathData.LINE_TO, x: a - d, y: s, relative: false },
    { type: SVGPathData.LINE_TO, x: s, y: a - d, relative: false },
    { type: SVGPathData.LINE_TO, x: d, y: a - s, relative: false },
    { type: SVGPathData.CLOSE_PATH },
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
        <pattern id="glue" patternUnits="userSpaceOnUse" width="4" height="4">
          <path
            d="M-1,1 l2,-2
             M0,4 l4,-4
             M3,5 l2,-2"
            style={{ stroke: "#eee", strokeWidth: 1 }}
          />
        </pattern>
        <clipPath id="page">
          <rect width={width} height={height} />
        </clipPath>
      </defs>
      <style>
        {".valley {stroke-dasharray: 1,1;} "}
        {".outline {stroke-dasharray: .1,1;} "}
        {".mountain {stroke-dasharray: 10,2,1,1,1,2;} "}
      </style>

      <g clipPath="url(#page)">
        {/*{!print && (*/}
        {/* <rect width={100} height={height} fill="url(#glue)" stroke="none" />*/}
        {/*)}*/}
      </g>
      <path d={outline} />
      <path d={valley} className="valley" />
      <Measure from={[a - s, d]} to={[a - d, s]} />
      <Measure from={[d, a - s]} to={[a - s, d]} />
    </svg>
  )
}
