import sortBy from "lodash/sortBy"
import * as React from "react"
import { CSSProperties, ReactElement, useContext } from "react"
import { SVGPathData } from "svg-pathdata"
import { CommandA } from "svg-pathdata/lib/types"
import { DEG } from "ts3dutils"
import {
  INCH,
  PAPER_SIZE_A4,
  PAPER_SIZES,
  PaperSize,
} from "../paperBox1/common"
import { Guide, Measure, SvgPrintContext } from "../paperBox1/Measure"
import { SvgCommonDefs } from "../paperBox1/SvgCommonDefs"
import claspsSvgString from "./clasps.inkscape.svg?raw"
import * as path from "./svg"

const claspsSvg = new DOMParser().parseFromString(
  claspsSvgString,
  "image/svg+xml",
).documentElement

const clasps = sortBy(
  Array.from(claspsSvg.children)
    .filter((c) => c.tagName === "g" && c.id !== "guides")
    .map((c) => {
      const children = Array.from(c.children)
      const name = c.getAttribute("inkscape:label")!
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
    }),
  (c) => c.name,
)
export const claspNames = clasps.map((c) => c.name)
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
  const foldedCenter = a / 2 - Math.SQRT1_2 * envelopeHeight
  return { a, d, r2, h, s, t, envelopeWidth, foldedCenter }
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

  const { a, d, r2, h, s, t, foldedCenter } = EnvelopeDimensions(
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

  const cutOffBottom = false
  const claspScale = a / 210

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
    // bottom right cut
    ...(cutOffBottom
      ? [
          path.L(a, t - h),
          cArc(r2, a - d, t),
          path.L(t, a - d),
          cArc(r2, t - h, a),
        ]
      : [path.L(a, a - r), cArc(r, a - r, a)]),
    // bottom
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

  const ref = PAPER_SIZES.find(([w, _h]) => w < envelopeHeight) ?? PAPER_SIZE_A4
  const [refH, refW, refName] = ref!
  const print = useContext(SvgPrintContext)

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
      <SvgCommonDefs />
      <path d={outline} className="outline" />
      <path d={valley} className="valley" />
      <g
        transform={`translate(${a - foldedCenter} ${
          a - foldedCenter
        }) rotate(135) scale(${claspScale}) translate(-24 -24)`}
      >
        <path className="valley" d={clasp.bottomFold} />
        <path className="outline" d={clasp.bottomCut} />
      </g>
      <path
        className="outline"
        transform={`translate(${foldedCenter} ${foldedCenter}) rotate(135) scale(${claspScale}) translate(-24 -24)`}
        d={clasp.topCut}
      />
      <Guide
        transform={`translate(${a / 2} ${a / 2}) rotate(-45) translate(${
          -refW / 2
        } ${-refH / 2})`}
      >
        <text y={refH} style={{ fontSize: "xx-small" }}>
          {refName}
        </text>
        <rect width={refW} height={refH} style={{ fill: "none" }} />
      </Guide>
      <Measure from={[a - s, d]} to={[a - d, s]} />
      <Measure from={[d, a - s]} to={[a - s, d]} />
    </svg>
  )
}
