import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import { ilog, newtonIterate1d, TAU, V, V3 } from "ts3dutils"

import {
  dTpl,
  INCH,
  radiusFromCenterToSide,
  RegularPolygon,
  RotStep,
  sideWidthFromCenterToSide,
} from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"
import { MeasureAngle } from "../paperBox1/MeasureAngle"

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

export function InsideFolds({
  baseRadius,
  topRadius,
  radius,
  print = false,
  sides,
  style,
}: {
  baseRadius: number
  topRadius: number
  radius: number
  print?: boolean
  sides: number
  style?: CSSProperties
}): ReactElement {
  const basePolyRadius = radiusFromCenterToSide(sides, baseRadius)
  const topPolyRadius = radiusFromCenterToSide(sides, topRadius)
  const svgViewBox = print
    ? [-radius, -radius, radius * 2, radius * 2]
    : [-radius - 10, -radius - 10, radius * 2 + 20, radius * 2 + 20]

  const basePolySideWidth = sideWidthFromCenterToSide(sides, baseRadius)

  const creaseAngle = TAU / sides / 2
  const innerAngleToC = lookUpAngle(radius, creaseAngle, basePolyRadius)

  function highlight(color: string) {
    // The colors mainly serve to make the code more readable, i.e. you know
    // which code makes which line. When printing, no colors.
    return print ? {} : { stroke: color }
  }
  const xx = lookUpAngle(
    radius,
    creaseAngle,
    topRadius - basePolySideWidth / 2 / Math.tan(creaseAngle / 2),
  )

  const greyStartPoint = V(basePolyRadius, 0).plus(
    V3.polar(topRadius - baseRadius, creaseAngle),
  )
  const greyDir = V3.polar(
    1,
    greyStartPoint.to(V(radius, 0)).angleXY() + creaseAngle,
  )
  const greyLine = (t: number) => greyStartPoint.plus(greyDir.times(t))
  const greyEndpoint = greyLine(
    ilog(newtonIterate1d((t) => greyLine(t).length() - radius, 1, 4)),
  )
  console.log(greyEndpoint)
  const greyEndpoint2 = V3.polar(
    radius,
    V(basePolyRadius, 0)
      .plus(V3.polar(topRadius - baseRadius, creaseAngle))
      .to(V(radius, 0))
      .angleXY() + creaseAngle,
  )
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
        {".mountain {stroke-dasharray: 10,2,1,1,1,2;}"}
      </style>
      <g>
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
            <MeasureAngle
              center={greyStartPoint}
              start={Math.PI}
              toRel={creaseAngle}
            />
            <Measure
              from={V3.polar(basePolyRadius, -TAU / sides)}
              to={V3.polar(basePolyRadius, 0)}
            />
          </>
        )}
        <RotStep id="foo" count={sides} stepDeg={360 / sides}>
          <path
            d={dTpl`
                M${basePolyRadius},0
                H${radius}`}
            className="mountain"
            style={highlight("green")}
          />
          <path
            d={dTpl`
                M${basePolyRadius},0
                L${V3.polar(radius, innerAngleToC)}
                M${basePolyRadius},0
                l${V3.polar(topRadius - baseRadius, creaseAngle)}`}
            className="valley"
            style={highlight("blue")}
          />
          <path
            d={dTpl`
                M${topPolyRadius},0
                L${V3.polar(basePolyRadius, -TAU / sides).plus(
                  V3.polar(topRadius - baseRadius, -TAU / sides / 2),
                )}`}
            className="valley"
            style={highlight("hotpink")}
          />
          <path
            d={dTpl`
                M${V3.polar(basePolyRadius, -TAU / sides).plus(
                  V3.polar(topRadius - baseRadius, -TAU / sides / 2),
                )}
                L${V3.polar(topPolyRadius, -TAU / sides)}`}
            className="mountain"
            style={highlight("orange")}
          />
          <path
            d={dTpl`
                M${greyStartPoint}
                L${V(radius, 0)}`}
            className="valley"
            style={highlight("red")}
          />
          <path
            d={dTpl`
                M${greyStartPoint}
                L${greyEndpoint}`}
            className="valley"
            style={highlight("grey")}
          />
        </RotStep>
        <circle r={radius} />
      </g>
    </svg>
  )
}
