import * as React from "react"
import { CSSProperties, ReactElement, useContext } from "react"
import { V } from "ts3dutils"
import { Guide, Measure, SvgPrintContext } from "../paperBox1/Measure"
import { PaperSize } from "../paperBox1/PaperSize"
import { encode, L, M } from "../paperBox1/svg"
import { SvgCommonDefs } from "../paperBox1/SvgCommonDefs"

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
  style,
  paperSize,
  children,
}: {
  baseRadius: number
  topRadius: number
  radius: number
  style?: CSSProperties
  paperSize: PaperSize | null
  children: ReactElement | ReactElement[]
}): ReactElement {
  const paperPosition = paperSize && [
    Math.min(-20, radius - paperSize[0]),
    Math.min(-20, radius - paperSize[1]),
  ]
  const print = useContext(SvgPrintContext)
  const svgViewBox = paperSize
    ? [paperPosition![0], paperPosition![1], paperSize[0], paperSize[1]]
    : [-radius, -radius, radius * 2, radius * 2]

  const boxHeight = topRadius - baseRadius
  const topLip = radius - topRadius
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={style}
      width={svgViewBox[2] + "mm"}
      height={svgViewBox[3] + "mm"}
      viewBox={svgViewBox.join(" ")}
      className="adrian"
    >
      <SvgCommonDefs />
      <Guide transform="translate(-20 -20) rotate(180)">
        <path
          style={{ fill: "none" }}
          d={encode(
            M(V(baseRadius - topLip, boxHeight * 0.99)),
            L(V(baseRadius, boxHeight)),
            L(V(baseRadius, 0)),
            L(V(-baseRadius, 0)),
            L(V(-baseRadius, boxHeight)),
            L(V(topLip - baseRadius, boxHeight * 1.01)),
          )}
        />
        <Measure from={V(baseRadius, 0)} to={V(-baseRadius, 0)} />
        <Measure from={V(baseRadius, boxHeight)} to={V(baseRadius, 0)} />
        <Measure
          from={V(topLip - baseRadius, boxHeight)}
          to={V(0, boxHeight)}
        />
      </Guide>

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
