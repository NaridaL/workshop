import * as React from "react"
import { CSSProperties, ReactElement } from "react"

export const ValleyMountainLegend = (
  props: React.SVGProps<SVGGElement>,
): ReactElement => {
  const textStyle: CSSProperties = {
    fontSize: 4,
    dominantBaseline: "middle",
  }
  return (
    <g {...props}>
      <text style={textStyle} y={-4}>
        valley
      </text>
      <line x1={20} y1={-4} x2={40} y2={-4} className="valley" />

      <text style={textStyle} y={4}>
        mountain
      </text>
      <line x1={20} y1={4} x2={40} y2={4} className="mountain" />
    </g>
  )
}
