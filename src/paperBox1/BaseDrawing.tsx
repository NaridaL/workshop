import { encodeSVGPath, SVGPathData } from "svg-pathdata"
import { arrayRange, DEG, int, round10, TAU, V3 } from "ts3dutils"
import * as React from "react"

import { fmtdeg, INCH } from "./common"
import { Measure } from "./Measure"
import { MeasureAngle } from "./MeasureAngle"

const radiusFromSideWidth = (sides: int, sideWidth: number) =>
  sideWidth / 2 / Math.sin(TAU / sides / 2)
const centerToSideFromSideWidth = (sides: int, sideWidth: number) =>
  sideWidth / 2 / Math.tan(TAU / sides / 2)

export function BaseDrawing({
  height,
  width,
  topLip = 100,
  bottomLip,
  measurements = true,
  sideWidth,
  sides,
}: {
  height: number
  width: number
  topLip: number
  bottomLip: number
  measurements?: boolean
  sideWidth: number
  sides: number
}) {
  const shapeAngle = TAU / sides
  const creaseAngle = shapeAngle / 2
  const maxBottomLip = sideWidth / Math.tan(creaseAngle)
  //const bottomLip = maxBottomLip
  const calc = Math.atan(sideWidth / bottomLip)
  const rightTabWidth = width - sides * sideWidth

  console.log("sides", sides)
  const intersect = Math.tan(creaseAngle) * bottomLip

  const boxHeight = height - bottomLip - topLip

  const valley = encodeSVGPath([
    // bottom lip horizontal
    {
      type: SVGPathData.MOVE_TO,
      relative: false,
      x: 0,
      y: height - bottomLip,
    },
    { type: SVGPathData.HORIZ_LINE_TO, relative: false, x: width },
    ...arrayRange(0, sides).flatMap((i) => [
      // verts in between top and bottom lip
      {
        type: SVGPathData.MOVE_TO,
        relative: false,
        x: (i + 1) * sideWidth,
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
        x: i * sideWidth + Math.tan(creaseAngle) * bottomLip,
        y: height,
      },
    ]),
    // addition diagonal segment for the last bit
    {
      type: SVGPathData.MOVE_TO,
      relative: false,
      x: sides * sideWidth,
      y: height - bottomLip,
    },
    {
      type: SVGPathData.LINE_TO,
      relative: false,

      ...(Math.tan(creaseAngle) * bottomLip > rightTabWidth
        ? {
            x: width,
            y: height - bottomLip + rightTabWidth / Math.tan(creaseAngle),
          }
        : {
            x: sides * sideWidth + Math.tan(creaseAngle) * bottomLip,
            y: height,
          }),
    },
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
    ...arrayRange(0, sides).flatMap((i) => [
      // verts in bottom lip
      {
        type: SVGPathData.MOVE_TO,
        relative: false,
        x: (i + 1) * sideWidth,
        y: height - bottomLip,
      },
      {
        type: SVGPathData.VERT_LINE_TO,
        relative: false,
        y: height,
      },
      // verts in top lip
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
  const centerToSide = centerToSideFromSideWidth(sides, sideWidth)
  const radius = radiusFromSideWidth(sides, sideWidth)
  const boxTop = -boxHeight - 10 - radius
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: "none",
        stroke: "#123456",
        strokeWidth: (2 * INCH) / 300,
        width: "100%",
        height: "100%",
      }}
    >
      <pattern id="glue" patternUnits="userSpaceOnUse" width="4" height="4">
        <path
          d="M-1,1 l2,-2
             M0,4 l4,-4
             M3,5 l2,-2"
          style={{ stroke: "#eee", strokeWidth: 1 }}
        />
      </pattern>

      <g transform="scale(4) translate(20, 20)">
        <rect
          width={rightTabWidth}
          height={height}
          fill="url(#glue)"
          stroke="none"
        />
        <rect width={width} height={height} />
        <path d={valley} style={{ strokeDasharray: "1,1" }} />
        <path d={mountain} style={{ strokeDasharray: "10,2,1,1,1,2" }} />
        {measurements && (
          <>
            <Measure from={[0, height - bottomLip]} to={[0, height]}>
              bottomLip
            </Measure>
            <Measure from={[0, 0]} to={[0, topLip]}>
              bottomLip
            </Measure>
            <Measure from={[0, height]} to={[sideWidth, height]}>
              sideWidth
            </Measure>
            {...arrayRange(1, sides).map((i) => (
              <Measure
                from={[i * sideWidth, height]}
                to={[(i + 1) * sideWidth, height]}
                hideRight
              >
                {"" + round10(sideWidth * (i + 1), -1)}
              </Measure>
            ))}
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
            <Measure from={[sides * sideWidth, height]} to={[width, height]}>
              {"" + round10(rightTabWidth, -1)}
            </Measure>
            <MeasureAngle
              center={[sideWidth * 2, height - bottomLip]}
              start={90 * DEG}
              toRel={-creaseAngle}
            >
              {fmtdeg(creaseAngle)}
            </MeasureAngle>
          </>
        )}
      </g>

      <g transform="scale(4) translate(200, 200)" style={{ stroke: "blue" }}>
        <rect
          transform="translate(0, -0)"
          x={-centerToSide}
          y={-boxHeight - 10 - radius}
          width={centerToSide + radius}
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
          {"" + boxHeight}
        </Measure>
        <Measure
          from={[-centerToSide, boxTop + boxHeight]}
          to={[radius, boxTop + boxHeight]}
        >
          {"" + round10(centerToSide + radius, -1)}
        </Measure>
        {/* polygon base */}
        <path
          d={`${arrayRange(0, sides)
            .map((i) => {
              const p = V3.polar(
                radius,
                (TAU / sides) * i + (Math.PI - TAU / sides / 2),
              )
              return (0 == i ? "M" : "L") + p.x + "," + p.y
            })
            .join(" ")} Z`}
        />
      </g>
    </svg>
  )
}
