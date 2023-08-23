import { range } from "lodash"
import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import { SVGPathData } from "svg-pathdata"
import { DEG, TAU, V3 } from "ts3dutils"
import { INCH } from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"
import { PaperSize } from "../paperBox1/PaperSize"
import * as path from "../paperBox1/svg"
import { SvgCommonDefs } from "../paperBox1/SvgCommonDefs"

const foo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_"

export function SquigleSvg({
  paperSize,
  envelopeHeight,
  overlap,
  cornerRadius,
  style,
  claspIds,
}: {
  envelopeHeight: number
  overlap: number
  cornerRadius: number
  style?: CSSProperties
  paperSize: PaperSize
  claspIds: string[]
}): ReactElement {
  const r = 10

  const [width, height] = paperSize

  const r1 = 28
  const r2 = 26
  const a = 27
  const dd = 2

  const outline = new SVGPathData([
    path.M(r1, 0),
    ...range(0, a).flatMap((i) => {
      const p1 = V3.polar(r1, (i / a) * TAU)
      const dp1 = V3.polar(dd, (i / a + 0.25) * TAU)
      const p2 = V3.polar(r2, ((i + 0.5) / a) * TAU)
      const dp2 = V3.polar(dd, ((i + 0.5) / a + 0.25) * TAU)
      const p3 = V3.polar(r1, ((i + 1) / a) * TAU)
      const dp3 = V3.polar(dd, ((i + 1) / a + 0.25) * TAU)
      function C(p1: V3, p2: V3, p: V3) {
        return path.C(p1.x, p1.y, p2.x, p2.y, p.x, p.y)
      }
      return [
        C(p1.plus(dp1), p2.minus(dp2), p2),
        C(p2.plus(dp2), p3.minus(dp3), p3),
      ]
    }),
    path.Z(),
  ])
    .round()
    .encode()
  console.log(outline)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      width={width + "mm"}
      height={height + "mm"}
      viewBox={`-100 -100 200 200`}
      className="adrian"
    >
      <SvgCommonDefs />
      <g>
        <rect x={-50} y={-50} width={100} height={100} />
        <path d={outline} className="cut" />
        <g>
          {foo.split("").map((l, i) => (
            <text
              id={"key-" + l}
              fontSize={2}
              stroke="none"
              fill="black"
              textAnchor="middle"
              transform={` rotate(${(i / 27) * 360})  translate(${
                r1 + 1
              } 0) rotate(90)`}
            >
              {l}
            </text>
          ))}
        </g>
      </g>
      <Measure from={[0, 0]} to={[r1, 0]} />
      <Measure from={[0, 0]} to={V3.polar(r2, (2.5 / a) * TAU)} />
    </svg>
  )
}
