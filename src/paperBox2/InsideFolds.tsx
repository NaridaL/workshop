import * as React from "react"
import { CSSProperties, ReactElement } from "react"
import { ilog, newtonIterate1d, TAU, V, V3 } from "ts3dutils"

import {
  dTpl,
  PaperSize,
  radiusFromCenterToSide,
  RegularPolygon,
  RotStep,
} from "../paperBox1/common"
import { Measure } from "../paperBox1/Measure"
import { MeasureAngle } from "../paperBox1/MeasureAngle"
import { Common } from "./Common"

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

export function InsideFolds(props: {
  baseRadius: number
  topRadius: number
  radius: number
  print?: boolean
  sides: number
  style?: CSSProperties
  paperSize: PaperSize | null
}): ReactElement {
  const { baseRadius, topRadius, radius, print = false, sides } = props
  const basePolyRadius = radiusFromCenterToSide(sides, baseRadius)
  const topPolyRadius = radiusFromCenterToSide(sides, topRadius)

  const creaseAngle = TAU / sides / 2
  const innerAngleToC = lookUpAngle(radius, creaseAngle, basePolyRadius)

  function highlight(color: string) {
    // The colors mainly serve to make the code more readable, i.e. you know
    // which code makes which line. When printing, no colors.
    return print ? {} : { stroke: color }
  }

  const redStartPoint = V(basePolyRadius, 0).plus(
    V3.polar(topRadius - baseRadius, creaseAngle),
  )
  const redDir = V3.X
  const redLine = (t: number) => redStartPoint.plus(redDir.times(t))
  const redEndpoint = redLine(
    newtonIterate1d((t) => redLine(t).length() - radius, 1, 4),
  )
  return (
    <Common {...props}>
      <g>
        <RegularPolygon
          radius={basePolyRadius}
          sides={sides}
          className="valley"
        />
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
              center={redStartPoint}
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
                L${redStartPoint}`}
            className="valley"
            style={highlight("blue")}
          />
          <path
            d={dTpl`
                M${redStartPoint}
                L${V3.polar(radius, -innerAngleToC)}`}
            className="mountain"
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
                M${redStartPoint}
                L${redEndpoint}`}
            className="valley"
            style={highlight("red")}
          />
        </RotStep>
        <circle r={radius} />
      </g>
    </Common>
  )
}
