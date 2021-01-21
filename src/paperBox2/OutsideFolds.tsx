import { SVGPathData } from "svg-pathdata"
import { TAU, V, V3 } from "ts3dutils"
import * as React from "react"
import { CSSProperties } from "react"
import { pick } from "lodash"

import {
  INCH,
  Path,
  radiusFromCenterToSide,
  RegularPolygon,
  RotStep,
} from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"
import { MeasureAngle } from "../paperBox1/MeasureAngle"
import { lookUpAngle } from "./InsideFolds"

function ppp(strings: TemplateStringsArray, ...exps: (number | V3)[]): string {
  const format = (x: number | V3) =>
    "number" === typeof x ? "" + x : x.x + "," + x.y
  let result = strings[0]
  for (let i = 0; i < exps.length; i++) {
    result += format(exps[i])
    result += strings[i + 1]
  }
  return result
}

export function OutsideFolds({
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
}) {
  const creaseAngle = TAU / sides / 2
  const basePolyRadius = radiusFromCenterToSide(sides, baseRadius)
  const topPolyRadius = radiusFromCenterToSide(sides, topRadius)
  const lastPolyAngle = lookUpAngle(
    radius,
    2 * creaseAngle,
    (baseRadius + topRadius) / 2,
  )
  const svgViewBox = print
    ? [-radius, -radius, radius * 2, radius * 2]
    : [-radius - 10, -radius - 10, radius * 2 + 20, radius * 2 + 20]

  function stroke(color: string) {
    // The colors mainly serve to make the code more readable, i.e. you know
    // which code makes which line. When printing, no colors.
    return print ? {} : { stroke: color }
  }

  const xy = (o: { x: number; y: number }): { x: number; y: number } =>
    pick(o, ["x", "y"])

  const blueEndPoint = V3.polar(radius, lastPolyAngle)
  const cutoutRadius = radius / 2

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
    >
      <style>
        {".valley {stroke-dasharray: 1,1;}"}
        {".outline {stroke-dasharray: .1,1;}"}
        {".mountain {stroke-dasharray: 10,2,1,1,1,2;}"}
      </style>
      <g>
        <RegularPolygon
          radius={basePolyRadius}
          sides={sides}
          className="valley"
        />
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
        <RotStep id="foo" count={sides} stepDeg={360 / sides}>
          <path
            d={ppp`
                M${basePolyRadius},0 
                L${V(basePolyRadius, 0).plus(
                  V3.polar(topRadius - baseRadius, -creaseAngle),
                )}`}
            className="valley"
            style={stroke("red")}
          />
          <path
            d={ppp`
                M${topPolyRadius},0
                L${V(basePolyRadius, 0).plus(
                  V3.polar(topRadius - baseRadius, -creaseAngle),
                )}`}
            className="mountain"
            style={stroke("orange")}
          />
          <path
            d={ppp`
                M${V(basePolyRadius, 0).plus(
                  V3.polar(topRadius - baseRadius, -creaseAngle),
                )}
                L${V3.polar(topPolyRadius, -TAU / sides)}`}
            className="valley"
            style={stroke("orange")}
          />
          <path
            d={ppp`
                M${V(basePolyRadius, 0).plus(
                  V3.polar(topRadius - baseRadius, -creaseAngle),
                )}
                L${blueEndPoint}`}
            className="valley"
            style={stroke("blue")}
          />
          <path
            d={ppp`
                M${V(radius, 0)}
                A${cutoutRadius},${cutoutRadius},0,0,1,${blueEndPoint}
                A${radius},${radius},0,0,0,${V3.polar(radius, -TAU / sides)}`}
          />

          <Path
            d={[
              {
                type: SVGPathData.MOVE_TO,
                relative: false,
                x: basePolyRadius,
                y: 0,
              },
              {
                type: SVGPathData.HORIZ_LINE_TO,
                relative: false,
                x: radius,
              },
            ]}
            className="mountain"
            style={stroke("green")}
          />
        </RotStep>
        {!print && (
          <>
            <MeasureAngle
              center={[basePolyRadius, 0]}
              start={-creaseAngle}
              toRel={creaseAngle}
            />
            <Measure from={[radius, 0]} to={blueEndPoint} />
            <Measure from={blueEndPoint} to={V3.polar(radius, -TAU / sides)} />
          </>
        )}
      </g>
    </svg>
  )
}
