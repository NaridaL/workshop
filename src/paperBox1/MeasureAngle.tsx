import * as React from "react"
import { ReactElement } from "react"
import { raddd, V, V3 } from "ts3dutils"
import { fmtdeg, R2 } from "./common"

export function MeasureAngle({
  center,
  start,
  toRel,
  children,
}: {
  center: R2 | V3
  start: raddd
  toRel: raddd
  children?: string
}): ReactElement {
  Array.isArray(center) && (center = V(center))
  const radius = 20
  const startV = V3.polar(radius, start).plus(V(center))
  const endV = V3.polar(radius, start + toRel).plus(V(center))
  const textPos = V3.polar(0.7 * radius, start + toRel / 2).plus(V(center))
  const largeArcFlag = Math.abs(toRel) > Math.PI ? "1" : "0"
  const sweepFlag = toRel > 0 ? "1" : "0"
  return (
    <g>
      <path
        d={`M${startV.x},${startV.y} A${radius},${radius},0,${largeArcFlag},${sweepFlag},${endV.x},${endV.y}`}
      />
      <text
        style={{
          stroke: "none",
          fill: "#aaa",
          fontSize: 4,
          dominantBaseline: "middle",
          textAnchor: "middle",
        }}
        x={textPos.x}
        y={textPos.y}
      >
        {children ?? fmtdeg(toRel)}
      </text>
    </g>
  )
}
