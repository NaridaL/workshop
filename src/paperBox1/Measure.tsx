import * as React from "react"
import { DEG, round10, V, V3 } from "ts3dutils"
import { R2 } from "./common"

export function Measure({
  from,
  to,
  children,
  hideRight = false,
  offset = 0,
}: {
  from: R2 | V3
  to: R2 | V3
  children?: string
  hideRight?: boolean
  offset?: number
}) {
  Array.isArray(from) && (from = V(from))
  Array.isArray(to) && (to = V(to))
  const d = from.to(to)
  const length = d.length()
  if (length < 0.05) return null
  children ||= "" + round10(length, -1)
  const textBlank = 3 * children.length
  return (
    <g
      transform={` translate(${from[0]}, ${from[1]}) rotate(${
        d.angleXY() / DEG
      }) translate(0, ${offset * 10})`}
      style={{ stroke: "#aaa" }}
    >
      {!hideRight && (
        <path
          d={`M0,0
	  l0,10
	  M4,3
	  l-4,2
	  l4,2`}
        />
      )}
      <path
        d={`
	  M0,5
	  H${(length - textBlank) / 2}
	  M${(length + textBlank) / 2},5
	  H${length}
	  M${length},0
	  l0,10
	  m-4,-7
	  l4,2
	  l-4,2`}
      />
      <text
        style={{
          stroke: "none",
          fill: "#aaa",
          fontSize: 4,
          dominantBaseline: "middle",
          textAnchor: "middle",
        }}
        x={length / 2}
        y={5}
      >
        {children}
      </text>
    </g>
  )
}
