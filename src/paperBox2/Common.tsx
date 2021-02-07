import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import { V } from "ts3dutils"

import { dTpl, INCH, PaperSize } from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"

// https://math.stackexchange.com/a/885965/230980
export function lookUpAngle(
  r: number,
  lookUpAngle2: number,
  r2: number,
): number {
  return (
    Math.PI / 2 - lookUpAngle2 - Math.acos((r2 / r) * Math.sin(lookUpAngle2))
  )
}

export function Common({
  baseRadius,
  topRadius,
  radius,
  print = false,
  style,
  paperSize,
  children,
}: {
  baseRadius: number
  topRadius: number
  radius: number
  print?: boolean
  style?: CSSProperties
  paperSize: PaperSize | null
  children: ReactElement
}): ReactElement {
  const paperPosition = paperSize && [
    Math.min(-20, radius - paperSize[0]),
    Math.min(-20, radius - paperSize[1]),
  ]
  const svgViewBox = !print
    ? [-radius - 10, -radius - 10, radius * 2 + 20, radius * 2 + 20]
    : paperSize
    ? [paperPosition![0], paperPosition![1], paperSize[0], paperSize[1]]
    : [-radius, -radius, radius * 2, radius * 2]

  const boxHeight = topRadius - baseRadius
  const topLip = radius - topRadius
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: "none",
        stroke: "#123456",
        strokeWidth: (2 * INCH) / 300,
        ...style,
      }}
      width={print ? svgViewBox[2] * (96 / INCH) : svgViewBox[2] + "mm"}
      height={print ? svgViewBox[3] * (96 / INCH) : svgViewBox[3] + "mm"}
      viewBox={svgViewBox.join(" ")}
      className="adrian"
    >
      <style>
        {".valley {stroke-dasharray: 1,1;}"}
        {".outline {stroke-dasharray: .1,1;}"}
        {".mountain {stroke-dasharray: 10,2,1,1,1,2;}"}
      </style>
      {!print && (
        <g transform="translate(-20 -20) rotate(180)">
          <path
            d={dTpl`
          M${V(baseRadius - topLip, boxHeight * 0.99)}
          L${V(baseRadius, boxHeight)}
          L${V(baseRadius, 0)}
          L${V(-baseRadius, 0)}
          L${V(-baseRadius, boxHeight)}
          L${V(topLip - baseRadius, boxHeight * 1.01)}
          `}
          />
          <Measure from={V(baseRadius, 0)} to={V(-baseRadius, 0)} />
          <Measure from={V(baseRadius, boxHeight)} to={V(baseRadius, 0)} />
          <Measure
            from={V(topLip - baseRadius, boxHeight)}
            to={V(0, boxHeight)}
          />
        </g>
      )}

      {!print && paperSize && (
        <rect
          x={paperPosition![0]}
          y={paperPosition![1]}
          width={paperSize[0]}
          height={paperSize[1]}
        />
      )}
      {children}
    </svg>
  )
}
