import * as React from "react"
import { CSSProperties, ReactElement, useContext } from "react"
import { newtonIterate1d, TAU, V, V3 } from "ts3dutils"

import {
  radiusFromCenterToSide,
  RegularPolygon,
  RotStep,
} from "../paperBox1/common"
import { Measure, SvgPrintContext } from "../paperBox1/Measure"
import { MeasureAngle } from "../paperBox1/MeasureAngle"
import { PaperSize } from "../paperBox1/PaperSize"
import { encode, H, L, M } from "../paperBox1/svg"
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
export function lookUpRadius(
  angle: number,
  lookUpAngle2: number,
  r2: number,
): number {
  return (
    r2 / Math.cos(angle - Math.PI / 2 + lookUpAngle2) / Math.sin(lookUpAngle2)
  )
}

export function InsideFoldsSvg(props: {
  baseRadius: number
  topRadius: number
  radius: number
  sides: number
  style?: CSSProperties
  paperSize: PaperSize | null
}): ReactElement {
  const { baseRadius, topRadius, radius, sides } = props
  const basePolyRadius = radiusFromCenterToSide(sides, baseRadius)
  const topPolyRadius = radiusFromCenterToSide(sides, topRadius)

  const creaseAngle = TAU / sides / 2
  const innerAngleToC = lookUpAngle(radius, creaseAngle, basePolyRadius)
  const print = useContext(SvgPrintContext)

  const redStartPoint = V(basePolyRadius, 0).plus(
    V3.polar(topRadius - baseRadius, creaseAngle),
  )
  const redDir = V3.X
  const redLine = (t: number) => redStartPoint.plus(redDir.times(t))
  const redEndpoint = redLine(
    newtonIterate1d((t) => redLine(t).length() - radius, 1, 4),
  )
  // The colors mainly serve to make the code more readable, i.e. you know
  // which code makes which line. When printing, no colors.
  return (
    <Common {...props}>
      <g className="fold">
        <RegularPolygon
          radius={basePolyRadius}
          sides={sides}
          className="valley"
        />
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
        <RotStep id="foo" count={sides} stepDeg={360 / sides}>
          <path
            d={encode(M(basePolyRadius, 0), H(radius))}
            className="mountain green-stroke"
          />
          <path
            d={encode(
              M(basePolyRadius, 0),
              L(V3.polar(radius, innerAngleToC)),
              M(basePolyRadius, 0),
              L(redStartPoint),
            )}
            className="valley blue-stroke"
          />
          <path
            d={encode(M(redStartPoint), L(V3.polar(radius, -innerAngleToC)))}
            className="mountain blue-stroke"
          />
          <path
            d={encode(
              M(topPolyRadius, 0),
              L(
                V3.polar(basePolyRadius, -TAU / sides).plus(
                  V3.polar(topRadius - baseRadius, -TAU / sides / 2),
                ),
              ),
            )}
            className="valley pink-stroke"
          />
          <path
            d={encode(
              M(
                V3.polar(basePolyRadius, -TAU / sides).plus(
                  V3.polar(topRadius - baseRadius, -TAU / sides / 2),
                ),
              ),
              L(V3.polar(topPolyRadius, -TAU / sides)),
            )}
            className="mountain orange-stroke"
          />
          <path
            d={encode(M(redStartPoint), L(redEndpoint))}
            className="valley red-stroke"
          />
        </RotStep>
      </g>
      <g className="cut">
        <circle r={radius} />
      </g>
    </Common>
  )
}
