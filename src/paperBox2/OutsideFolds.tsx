import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import { DEG, newtonIterate1d, TAU, V, V3 } from "ts3dutils"

import {
  dTpl,
  INCH,
  PaperSize,
  radiusFromCenterToSide,
  RegularPolygon,
  RotStep,
} from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"
import { MeasureAngle } from "../paperBox1/MeasureAngle"
import { ValleyMountainLegend } from "../paperBox1/ValleyMountainLegend"
import { lookUpAngle } from "./InsideFolds"

export const OutsideFolds = ({
  baseRadius,
  topRadius,
  radius,
  print = false,
  sides,
  style,
  paperSize,
}: {
  baseRadius: number
  topRadius: number
  radius: number
  print?: boolean
  sides: number
  style?: CSSProperties
  paperSize: PaperSize | null
}): ReactElement => {
  const creaseAngle = TAU / sides / 2
  const basePolyRadius = radiusFromCenterToSide(sides, baseRadius)
  const topPolyRadius = radiusFromCenterToSide(sides, topRadius)
  // to calculate the intersection of the blue segment with
  // the green, imagine an isosceles triangle with red as the base
  const d = (topRadius - baseRadius) / 2 / Math.cos(creaseAngle)
  const lastPolyAngle = lookUpAngle(radius, 2 * creaseAngle, basePolyRadius + d)

  const paperPosition = paperSize && [
    Math.min(-20, radius - paperSize[0]),
    Math.min(-20, radius - paperSize[1]),
  ]
  const svgViewBox = !print
    ? [-radius - 10, -radius - 10, radius * 2 + 20, radius * 2 + 20]
    : paperSize
    ? [paperPosition![0], paperPosition![1], paperSize[0], paperSize[1]]
    : [-radius, -radius, radius * 2, radius * 2]

  function stroke(color: string) {
    // The colors mainly serve to make the code more readable, i.e. you
    // know which code makes which line. When printing, no colors.
    return print ? {} : { stroke: color }
  }

  const blueStart = V(basePolyRadius, 0).plus(
    V3.polar(topRadius - baseRadius, -creaseAngle),
  )
  const blueDir = V3.polar(1, -(creaseAngle + creaseAngle - DEG))
  const blueLine = (t: number) => blueStart.plus(blueDir.times(t))
  const blueEndPoint = blueLine(
    newtonIterate1d((t) => blueLine(t).length() - radius, 1, 4),
  )
  const boxHeight = topRadius - baseRadius
  const topLip = radius - topRadius
  const cutoutRadius = radius
  return (
    <svg
      className="adrian"
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
    >
      <style>
        {".valley {stroke-dasharray: 1,1;}"}
        {".outline {stroke-dasharray: .1,1;}"}
        {".mountain {stroke-dasharray: 10,2,1,1,1,2;}"}
      </style>
      <g>
        {!print && paperSize && (
          <rect
            x={paperPosition![0]}
            y={paperPosition![1]}
            width={paperSize[0]}
            height={paperSize[1]}
          />
        )}
        <RegularPolygon
          radius={basePolyRadius}
          sides={sides}
          className="valley"
        />
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
        <circle r={radius} className="outline" />
        {!print && (
          <>
            <Measure
              offset={-0.5}
              from={[0, 0]}
              to={V3.polar(baseRadius, creaseAngle)}
            >
              baseRadius
            </Measure>
            <Measure
              offset={-0.5}
              from={V3.polar(baseRadius, creaseAngle)}
              to={V3.polar(topRadius, creaseAngle)}
              hideRight={true}
            >
              topRadius
            </Measure>
            <Measure
              offset={-0.5}
              from={V3.polar(topRadius, creaseAngle)}
              to={V3.polar(radius, creaseAngle)}
              hideRight={true}
            >
              radius
            </Measure>
          </>
        )}
        <RotStep id="rotsym" count={sides} stepDeg={360 / sides}>
          <path
            d={dTpl`
                M${basePolyRadius},0 
                L${V(basePolyRadius, 0).plus(
                  V3.polar(topRadius - baseRadius, -creaseAngle),
                )}`}
            className="mountain"
            style={stroke("red")}
          />
          <path
            d={dTpl`
                M${topPolyRadius},0
                L${V(basePolyRadius, 0).plus(
                  V3.polar(topRadius - baseRadius, -creaseAngle),
                )}`}
            className="mountain"
            style={stroke("orange")}
          />
          <path
            d={dTpl`
                M${V(basePolyRadius, 0).plus(
                  V3.polar(topRadius - baseRadius, -creaseAngle),
                )}
                L${V3.polar(topPolyRadius, -TAU / sides)}`}
            className="valley"
            style={stroke("orange")}
          />
          <path
            d={dTpl`
                M${V(basePolyRadius, 0).plus(
                  V3.polar(topRadius - baseRadius, -creaseAngle),
                )}
                L${blueEndPoint}`}
            className="mountain"
            style={stroke("blue")}
          />
          <path
            d={dTpl`
                M${blueEndPoint}
                A${cutoutRadius},${cutoutRadius},0,0,1,${V3.polar(
              radius,
              -TAU / sides,
            )}`}
            className="outline"
          />

          <path
            d={dTpl`
                M${V(basePolyRadius, 0)}
                H${radius}`}
            className="valley"
            style={stroke("green")}
          />
          {paperSize && (
            <path
              d={dTpl`
                M0,0
                H${baseRadius / 2}`}
              className="valley"
              style={stroke("purple")}
            />
          )}
        </RotStep>
        {!print && (
          <>
            <MeasureAngle
              center={[basePolyRadius, 0]}
              start={-creaseAngle}
              toRel={creaseAngle}
            />
            <MeasureAngle
              center={V(basePolyRadius, 0).plus(
                V3.polar(topRadius - baseRadius, -creaseAngle),
              )}
              start={-creaseAngle * 2 + DEG}
              toRel={creaseAngle - DEG}
            />
            <Measure from={[radius, 0]} to={blueEndPoint} />
            <Measure from={blueEndPoint} to={V3.polar(radius, -TAU / sides)} />
          </>
        )}
        {!print && (
          <ValleyMountainLegend
            transform={`translate(${-radius}, ${-radius})`}
            x={100}
            y={100}
          />
        )}
      </g>
    </svg>
  )
}
