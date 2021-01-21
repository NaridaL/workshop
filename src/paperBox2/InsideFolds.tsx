import { SVGPathData } from "svg-pathdata"
import { TAU, V, V3 } from "ts3dutils"
import * as React from "react"
import { pick } from "lodash"
import { CSSProperties } from "react"

import {
  INCH,
  Path,
  radiusFromCenterToSide,
  RegularPolygon,
  RotStep,
} from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"
import { MeasureAngle } from "../paperBox1/MeasureAngle"

// https://math.stackexchange.com/a/885965/230980
export function lookUpAngle(r: number, lookUpAngle2: number, r2: number) {
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
}) {
  const basePolyRadius = radiusFromCenterToSide(sides, baseRadius)
  const topPolyRadius = radiusFromCenterToSide(sides, topRadius)
  const svgViewBox = print
    ? [-radius, -radius, radius * 2, radius * 2]
    : [-radius - 10, -radius - 10, radius * 2 + 20, radius * 2 + 20]

  const xy = (o: { x: number; y: number }): { x: number; y: number } =>
    pick(o, ["x", "y"])

  const creaseAngle = TAU / sides / 2
  const innerAngleToC = lookUpAngle(radius, creaseAngle, basePolyRadius)

  function stroke(color: string) {
    // The colors mainly serve to make the code more readable, i.e. you know
    // which code makes which line. When printing, no colors.
    return print ? {} : { stroke: color }
  }

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
        {".mountain {stroke-dasharray: 10,2,1,1,1,2;}"}
      </style>
      <g>
        <RegularPolygon
          radius={basePolyRadius}
          sides={sides}
          className="valley"
        />
        {!print && (
          <>
            <Measure from={[0, 0]} to={V3.polar(baseRadius, creaseAngle)}>
              baseRadius
            </Measure>
            <Measure
              from={V3.polar(baseRadius, creaseAngle)}
              to={V3.polar(topRadius, creaseAngle)}
              hideRight={true}
            >
              topRadius
            </Measure>
            <Measure
              from={V3.polar(topRadius, creaseAngle)}
              to={V3.polar(radius, creaseAngle)}
              hideRight={true}
            >
              radius
            </Measure>
          </>
        )}
        <RotStep id="foo" count={sides} stepDeg={360 / sides}>
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
          <Path
            d={[
              {
                type: SVGPathData.MOVE_TO,
                relative: false,
                x: basePolyRadius,
                y: 0,
              },
              {
                type: SVGPathData.LINE_TO,
                relative: false,
                ...xy(V3.polar(radius, innerAngleToC)),
              },
              {
                type: SVGPathData.MOVE_TO,
                relative: false,
                x: basePolyRadius,
                y: 0,
              },
              {
                type: SVGPathData.LINE_TO,
                relative: true,
                ...xy(V3.polar(topRadius - baseRadius, creaseAngle)),
              },
            ]}
            className="valley"
            style={stroke("blue")}
          />
          <Path
            d={[
              {
                type: SVGPathData.MOVE_TO,
                relative: false,
                x: topPolyRadius,
                y: 0,
              },
              {
                type: SVGPathData.LINE_TO,
                relative: false,
                ...xy(
                  V3.polar(basePolyRadius, -TAU / sides).plus(
                    V3.polar(topRadius - baseRadius, -TAU / sides / 2),
                  ),
                ),
              },
            ]}
            className="valley"
            style={stroke("hotpink")}
          />
          <Path
            d={[
              {
                type: SVGPathData.MOVE_TO,
                relative: false,
                ...xy(
                  V3.polar(basePolyRadius, -TAU / sides).plus(
                    V3.polar(topRadius - baseRadius, -TAU / sides / 2),
                  ),
                ),
              },
              {
                type: SVGPathData.LINE_TO,
                relative: false,
                ...xy(V3.polar(topPolyRadius, -TAU / sides)),
              },
            ]}
            className="mountain"
            style={stroke("orange")}
          />
          <Path
            d={[
              {
                type: SVGPathData.MOVE_TO,
                relative: false,
                ...xy(
                  V(basePolyRadius, 0).plus(
                    V3.polar(topRadius - baseRadius, creaseAngle),
                  ),
                ),
              },
              {
                type: SVGPathData.LINE_TO,
                relative: false,
                ...xy(V(radius, 0)),
              },
            ]}
            className="valley"
            style={stroke("red")}
          />
          <Path
            d={[
              {
                type: SVGPathData.MOVE_TO,
                relative: false,
                ...xy(
                  V(basePolyRadius, 0).plus(
                    V3.polar(topRadius - baseRadius, creaseAngle),
                  ),
                ),
              },
              {
                type: SVGPathData.LINE_TO,
                relative: true,
                ...xy(
                  V3.polar(
                    radius,
                    V(basePolyRadius, 0)
                      .plus(V3.polar(topRadius - baseRadius, creaseAngle))
                      .to(V(radius, 0))
                      .angleXY() + creaseAngle,
                  ),
                ),
              },
            ]}
            className="valley"
            style={stroke("grey")}
          />
        </RotStep>
        <circle r={radius} />
      </g>
    </svg>
  )
}
