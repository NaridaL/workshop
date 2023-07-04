import * as React from "react"
import { CSSProperties, ReactElement, useContext } from "react"
import { encodeSVGPath, SVGPathData } from "svg-pathdata"
import { arrayRange, DEG, round10, TAU, V, V3 } from "ts3dutils"

import {
  centerToSideFromSideWidth,
  fmtdeg,
  INCH,
  radiusFromSideWidth,
} from "./common"
import { Measure, SvgPrintContext } from "./Measure"
import { MeasureAngle } from "./MeasureAngle"

export function PrismBoxSvg({
  height,
  width,
  topLip = 100,
  bottomLip,
  theta: thetaDeg,
  sideWidth,
  sides,
  style,
}: {
  height: number
  width: number
  topLip: number
  bottomLip: number
  theta: number
  sideWidth: number
  sides: number
  style?: CSSProperties
}): ReactElement {
  const shapeAngle = TAU / sides
  const creaseAngle = shapeAngle / 2
  const maxBottomLip = sideWidth / Math.tan(creaseAngle)
  //const bottomLip = maxBottomLip
  const rightTabWidth = width - sides * sideWidth

  const intersect = Math.tan(creaseAngle) * bottomLip

  const theta = thetaDeg * DEG

  const boxHeight = height - bottomLip - topLip
  const radius = radiusFromSideWidth(sides, sideWidth)
  const centerToSide = centerToSideFromSideWidth(sides, sideWidth)
  const boxWidth = centerToSide + (sides % 2 === 0 ? centerToSide : radius)

  const print = useContext(SvgPrintContext)

  const valley = encodeSVGPath([
    // bottom lip horizontal
    {
      type: SVGPathData.MOVE_TO,
      relative: false,
      x: 0,
      y: height - bottomLip,
    },
    { type: SVGPathData.HORIZ_LINE_TO, relative: false, x: width },
    ...arrayRange(0, sides + 1).flatMap((i) => [
      // verts in between top and bottom lip
      {
        type: SVGPathData.MOVE_TO,
        relative: false,
        x: i * sideWidth,
        y: topLip,
      },
      {
        type: SVGPathData.VERT_LINE_TO,
        relative: false,
        y: height - bottomLip,
      },
      // diagonal segments at the bottom
      {
        type: SVGPathData.MOVE_TO,
        relative: false,
        x: i * sideWidth,
        y: height - bottomLip,
      },
      {
        type: SVGPathData.LINE_TO,
        relative: false,
        x: i * sideWidth + Math.tan(creaseAngle + theta) * bottomLip,
        y: height,
      },
    ]),
    // top lip
    {
      type: SVGPathData.MOVE_TO,
      relative: false,
      x: 0,
      y: topLip,
    },
    { type: SVGPathData.HORIZ_LINE_TO, relative: false, x: width },
  ])
  const mountain = encodeSVGPath([
    // verts in bottom lip
    ...arrayRange(0, sides + 1).flatMap((i) => [
      {
        type: SVGPathData.MOVE_TO,
        relative: false,
        x: i * sideWidth,
        y: height - bottomLip,
      },
      {
        type: SVGPathData.LINE_TO,
        relative: true,
        x: Math.sin(theta) * bottomLip,
        y: bottomLip,
      },
    ]),
    // verts in top lip
    ...arrayRange(0, sides).flatMap((i) => [
      {
        type: SVGPathData.MOVE_TO,
        relative: false,
        x: (i + 1) * sideWidth,
        y: 0,
      },
      {
        type: SVGPathData.VERT_LINE_TO,
        relative: false,
        y: topLip,
      },
    ]),
  ])
  const boxTop = -boxHeight - 10 - radius
  const svgViewBox = print
    ? [0, 0, width, height]
    : [-10, -10, width + 20, height + 30]

  const firstIntersect = bottomLip * Math.tan(theta)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: "none",
        stroke: "#123456",
        strokeWidth: (2 * INCH) / 300,
        ...style,
      }}
      width={svgViewBox[2] + "mm"}
      height={svgViewBox[3] + "mm"}
      viewBox={svgViewBox.join(" ")}
      className="adrian"
    >
      <defs>
        <pattern id="glue" patternUnits="userSpaceOnUse" width="4" height="4">
          <path
            d="M-1,1 l2,-2
             M0,4 l4,-4
             M3,5 l2,-2"
            style={{ stroke: "#eee", strokeWidth: 1 }}
          />
        </pattern>
        <clipPath id="page">
          <rect width={width} height={height} />
        </clipPath>
      </defs>

      <g clipPath="url(#page)">
        {!print && (
          <rect
            width={rightTabWidth}
            height={height}
            fill="url(#glue)"
            stroke="none"
          />
        )}
        <rect width={width} height={height} />
        <path d={valley} style={{ strokeDasharray: "1,1" }} />
        <path d={mountain} style={{ strokeDasharray: "10,2,1,1,1,2" }} />
        {arrayRange(0, sides).map((i) => {
          const pos = V(i * sideWidth, height - bottomLip).plus(
            V3.polar(radius, 90 * DEG - creaseAngle - theta),
          )

          return <circle key={i} cx={pos.x} cy={pos.y} r={0.5} stroke="black" />
        })}
      </g>
      <Measure from={[0, 0]} to={[0, topLip]}>
        topLip
      </Measure>
      <Measure from={[0, topLip]} to={[0, height - bottomLip]}>
        {"" + round10(height - topLip - bottomLip, -1)}
      </Measure>
      <Measure from={[0, height - bottomLip]} to={[0, height]}>
        bottomLip
      </Measure>
      <Measure from={[0, 0]} to={[sideWidth, 0]}>
        sideWidth
      </Measure>
      {arrayRange(1, sides).map((i) => (
        <Measure
          key={i}
          from={[i * sideWidth, 0]}
          to={[(i + 1) * sideWidth, 0]}
          hideRight
        >
          {"" + round10(sideWidth * (i + 1), -1)}
        </Measure>
      ))}

      <Measure from={[0, height]} to={[firstIntersect, height]}>
        {"" + round10(firstIntersect, -2)}
      </Measure>
      {arrayRange(0, sides).map((i) => (
        <Measure
          key={i}
          from={[firstIntersect + i * sideWidth, height]}
          to={[firstIntersect + (i + 1) * sideWidth, height]}
          hideRight
        >
          {"" + round10(firstIntersect + sideWidth * (i + 1), -1)}
        </Measure>
      ))}

      <Measure from={[sides * sideWidth, 0]} to={[width, 0]}>
        {"" + round10(rightTabWidth, -1)}
      </Measure>
      <Measure
        from={[sideWidth, height]}
        to={[sideWidth + intersect, height]}
        offset={1}
      >
        {"" + round10(intersect, -1)}
      </Measure>
      {intersect < sideWidth && (
        <Measure
          from={[sideWidth + intersect, height]}
          to={[sideWidth + sideWidth, height]}
          offset={1}
        >
          {"" + round10(sideWidth - intersect, -1)}
        </Measure>
      )}
      <MeasureAngle
        center={[sideWidth * 2, height - bottomLip]}
        start={90 * DEG}
        toRel={-creaseAngle}
      >
        {fmtdeg(creaseAngle)}
      </MeasureAngle>
      {!print && (
        <g
          transform={`translate(200, ${boxHeight * 2})`}
          style={{ stroke: "blue" }}
        >
          <rect
            transform="translate(0, -0)"
            x={-centerToSide}
            y={-boxHeight - 10 - radius}
            width={boxWidth}
            height={boxHeight}
          />
          {/* verts */}
          <path
            d={`${arrayRange(2, sides / 2)
              .map((i) => {
                const p = V3.polar(
                  radius,
                  (TAU / sides) * i + (Math.PI - TAU / sides / 2),
                )
                return "M" + p.x + "," + boxTop + " v" + boxHeight
              })
              .join(" ")} `}
          />
          <Measure
            from={[-centerToSide, boxTop]}
            to={[-centerToSide, boxTop + boxHeight]}
          >
            {"" + round10(boxHeight, -1)}
          </Measure>
          <Measure
            from={[-centerToSide, boxTop + boxHeight]}
            to={[-centerToSide + boxWidth, boxTop + boxHeight]}
          >
            {"" + round10(boxWidth, -1)}
          </Measure>
          {/* polygon base */}
          <path
            d={`${arrayRange(0, sides)
              .map((i) => {
                const p = V3.polar(
                  radius,
                  (TAU / sides) * i + (Math.PI - TAU / sides / 2),
                )
                return (0 === i ? "M" : "L") + p.x + "," + p.y
              })
              .join(" ")} Z`}
          />
          <path
            d={encodeSVGPath([
              ...arrayRange(0, sides).flatMap((i) => {
                const p = V3.polar(
                  radius,
                  (TAU / sides) * i + (Math.PI - TAU / sides / 2),
                )
                const r = V3.polar(
                  bottomLip / Math.cos(creaseAngle + theta),
                  (TAU / sides) * i + -TAU / sides / 2 + theta,
                )
                return [
                  {
                    type: SVGPathData.MOVE_TO,
                    relative: false,
                    x: p.x,
                    y: p.y,
                  },
                  {
                    type: SVGPathData.LINE_TO,
                    relative: true,
                    x: r.x,
                    y: r.y,
                  },
                ]
              }),
            ])}
          />
        </g>
      )}
    </svg>
  )
}
