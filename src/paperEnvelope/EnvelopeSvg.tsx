import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import { SVGPathData } from "svg-pathdata"
import { CommandA } from "svg-pathdata/lib/types"
import { DEG } from "ts3dutils"
import { INCH, PaperSize } from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"
import claspsSvgString from "./clasps.inkscape.svg?raw"
import * as path from "./svg"

const claspsSvg = new DOMParser().parseFromString(
  claspsSvgString,
  "image/svg+xml",
).documentElement
console.log(claspsSvg)
const claspGroups = Array.from(claspsSvg.children).filter(
  (c) => c.tagName === "g" && c.id !== "guides",
)
const clasps = claspGroups.map((c) => {
  const children = Array.from(c.children)
  const name = c.getAttribute("inkscape:label")
  function getPath(inkscapeLabel: string) {
    const pathEl = children.find(
      (c) =>
        c.tagName === "path" &&
        c.getAttribute("inkscape:label") === inkscapeLabel,
    )!
    if (pathEl?.getAttribute("transform")) {
      console.error(name, pathEl)
      throw new Error()
    }
    return pathEl?.getAttribute("d") ?? ""
  }

  return {
    name: name,
    bottomFold: getPath("bottomFold"),
    bottomCut: getPath("bottomCut"),
    topCut: getPath("topCut"),
  }
})
export const claspNames = claspGroups.map(
  (c) => c.getAttribute("inkscape:label")!,
)
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
  claspId = "Hex Slot",
}: {
  envelopeHeight: number
  overlap: number
  cornerRadius: number
  style?: CSSProperties
  paperSize: PaperSize
  claspId: string | undefined
}): ReactElement {
  const r = 10

  const [width, height] = paperSize

  const { a, d, r2, h, s, t } = EnvelopeDimensions(
    width,
    height,
    overlap,
    envelopeHeight,
  )
  const clasp = clasps.find((g) => g.name === claspId)!

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
    path.M(0, r),
    // top
    cArc(r, r, 0),
    path.L(a - s - h, 0),
    cArc(r2, a - s, d),
    cArc(r2, a - s + h, 0),
    path.L(a - r, 0),
    // right
    cArc(r, a, r),
    path.L(a, s - h),
    cArc(r2, a - d, s),
    cArc(r2, a, s + h),
    path.L(a, t - h),
    // bottom right cut
    cArc(r2, a - d, t),
    path.L(t, a - d),
    // bottom
    cArc(r2, t - h, a),
    path.L(s + h, a),
    cArc(r2, s, a - d),
    cArc(r2, s - h, a),
    path.L(r, a),
    // left
    cArc(r, 0, a - r),
    path.L(0, a - s + h),
    cArc(r2, d, a - s),
    cArc(r2, 0, a - s - h),
    path.Z(),
  ]).encode()

  const valley = new SVGPathData([
    path.M(a - s, d),
    path.L(a - d, s),
    path.L(s, a - d),
    path.L(d, a - s),
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
      <path
        className="valley"
        transform={`translate(${t} ${t}) rotate(135) translate(-24 -24)`}
        d={clasp.bottomFold}
      />
      <path
        transform={`translate(${t} ${t}) rotate(135) translate(-24 -24)`}
        d={clasp.bottomCut}
      />
      <path
        transform="translate(20 20) rotate(135) translate(-24 -24)"
        d={clasp.topCut}
      />
      <Measure from={[a - s, d]} to={[a - d, s]} />
      <Measure from={[d, a - s]} to={[a - s, d]} />
    </svg>
  )
}
