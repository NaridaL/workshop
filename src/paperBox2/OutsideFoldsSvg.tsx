import * as React from "react"
import { CSSProperties, ReactElement, useContext } from "react"
import { newtonIterate1d, TAU, V, V3 } from "ts3dutils"

import {
  dTpl,
  PaperSize,
  radiusFromCenterToSide,
  RegularPolygon,
  RotStep,
} from "../paperBox1/common"
import { Measure, SvgPrintContext } from "../paperBox1/Measure"
import { MeasureAngle } from "../paperBox1/MeasureAngle"
import { ValleyMountainLegend } from "../paperBox1/ValleyMountainLegend"
import { Common } from "./Common"
import { lookUpAngle } from "./InsideFoldsSvg"

export const OutsideFoldsSvg = (props: {
  baseRadius: number
  topRadius: number
  radius: number
  sides: number
  style?: CSSProperties
  paperSize: PaperSize | null
}): ReactElement => {
  const { baseRadius, topRadius, radius, sides, paperSize } = props
  const creaseAngle = TAU / sides / 2
  const basePolyRadius = radiusFromCenterToSide(sides, baseRadius)
  const topPolyRadius = radiusFromCenterToSide(sides, topRadius)
  // to calculate the intersection of the blue segment with
  // the green, imagine an isosceles triangle with red as the base
  const d = (topRadius - baseRadius) / 2 / Math.cos(creaseAngle)
  const lastPolyAngle = lookUpAngle(radius, 2 * creaseAngle, basePolyRadius + d)
  const print = useContext(SvgPrintContext)

  function stroke(color: string) {
    // The colors mainly serve to make the code more readable, i.e. you
    // know which code makes which line. When printing, no colors.
    return print ? {} : { stroke: color }
  }

  const blueStart = V(basePolyRadius, 0).plus(
    V3.polar(topRadius - baseRadius, -creaseAngle),
  )
  const blueDir = V3.polar(1, -(creaseAngle + creaseAngle))
  const blueLine = (t: number) => blueStart.plus(blueDir.times(t))
  const blueEndPoint = blueLine(
    newtonIterate1d((t) => blueLine(t).length() - radius, 1, 4),
  )
  const cutoutRadius = radius
  return (
    <Common {...props}>
      <g>
        <RegularPolygon
          radius={basePolyRadius}
          sides={sides}
          className="valley"
        />
        <circle r={radius} className="outline" />
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
        <MeasureAngle
          center={[basePolyRadius, 0]}
          start={-creaseAngle}
          toRel={creaseAngle}
        />
        <MeasureAngle
          center={V(basePolyRadius, 0).plus(
            V3.polar(topRadius - baseRadius, -creaseAngle),
          )}
          start={-creaseAngle * 2}
          toRel={creaseAngle}
        />
        <Measure from={[radius, 0]} to={blueEndPoint} />
        <Measure from={blueEndPoint} to={V3.polar(radius, -TAU / sides)} />
        <ValleyMountainLegend
          transform={`translate(${-radius}, ${-radius})`}
          x={100}
          y={100}
        />
      </g>
    </Common>
  )
}
