import TextField from "@material-ui/core/TextField"
import Input from "@material-ui/core/Input"
import Autocomplete from "@material-ui/lab/Autocomplete"
import InputAdornment from "@material-ui/core/InputAdornment"
import * as React from "react"
import { useRef, useEffect, useState } from "react"
import { encodeSVGPath, SVGPathData } from "svg-pathdata"
import {
  arrayFromFunction,
  arrayRange,
  DEG,
  PI,
  raddd,
  round10,
  TAU,
  V,
  V3,
} from "ts3dutils"
import useTheme from "@material-ui/core/styles/useTheme"
import { makeStyles } from "@material-ui/core"
type PaperSize = [number, number, string]
const PAPER_SIZES: PaperSize[] = [
  [841, 1189, "A0"],
  [594, 841, "A1"],
  [420, 594, "A2"],
  [297, 420, "A3"],
  [210, 297, "A4"],
  [148, 210, "A5"],
  [105, 148, "A6"],
  [74, 105, "A7"],
  [52, 74, "A8"],
  [37, 52, "A9"],
  [26, 37, "A10"],
  [150, 150, "Origami 15cm"],
  [100, 100, "Origami 10cm"],
  [75, 75, "Origami 7.5cm"],
  [215.9, 279.4, "Letter"],
  [215.9, 355.6, "Legal"],
]

const INCH = 25.4
const fmtdeg = (x: raddd) => "" + round10(x / DEG, -1) + "°"
type R2 = [number, number]

function Measure({
  from,
  to,
  children,
  hideRight = false,
  offset = 0,
}: {
  from: R2
  to: R2
  children: string
  hideRight?: boolean
  offset?: number
}) {
  const d = V(from).to(V(to))
  const length = d.length()
  const textBlank = 3 * children.length
  return (
    <g
      transform={` translate(${from[0]}, ${from[1]}) rotate(${
        d.angleXY() / DEG
      }) translate(0, ${offset * 10})`}
      style={{ stroke: "#aaa" }}
    >
      {!hideRight && (
        <path
          d={`M0,0
	  l0,10
	  M4,3
	  l-4,2
	  l4,2`}
        />
      )}
      <path
        d={`
	  M0,5
	  H${(length - textBlank) / 2}
	  M${(length + textBlank) / 2},5
	  H${length}
	  M${length},0
	  l0,10
	  m-4,-7
	  l4,2
	  l-4,2`}
      />
      <text
        style={{
          stroke: "none",
          fill: "#aaa",
          fontSize: 4,
          dominantBaseline: "middle",
          textAnchor: "middle",
        }}
        x={length / 2}
        y={5}
      >
        {children}
      </text>
    </g>
  )
}

function MeasureAngle({
  center,
  start,
  toRel,
  children,
}: {
  center: R2
  start: raddd
  toRel: raddd
  children: string
}) {
  const radius = 20
  const startV = V3.polar(radius, start).plus(V(center))
  const endV = V3.polar(radius, start + toRel).plus(V(center))
  const textPos = V3.polar(0.7 * radius, start + toRel / 2).plus(V(center))

  return (
    <g>
      <path
        d={`M${startV.x},${startV.y} A${radius},${radius},0,0,0,${endV.x},${endV.y}`}
      />
      <text
        style={{
          stroke: "none",
          fill: "#aaa",
          fontSize: 4,
          dominantBaseline: "middle",
          textAnchor: "middle",
        }}
        x={textPos.x}
        y={textPos.y}
      >
        {children}
      </text>
    </g>
  )
}

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: 256,
    padding: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
      alignItems: "stretch",
    },
  },
}))

export default () => {
  const [dimensions, setDimensions] = useState<PaperSize>([250, 200, "custom"])
  const transpose = false
  const [width, height] = transpose
    ? [dimensions[1], dimensions[0]]
    : dimensions
  const [sides, setSides] = useState(5)
  const [sideWidth, setSideWidth] = useState(45)
  const [bottomLip, setBottomLip] = useState(30)

  const shapeAngle = TAU / sides
  const creaseAngle = shapeAngle / 2
  const maxBottomLip = sideWidth / Math.tan(creaseAngle)
  //const bottomLip = maxBottomLip
  const calc = Math.atan(sideWidth / bottomLip)
  const rightTabWidth = width - sides * sideWidth

  const intersect = Math.tan(creaseAngle) * bottomLip

  const theme = useTheme()

  const classes = useStyles()

  const valley = encodeSVGPath([
    {
      type: SVGPathData.MOVE_TO,
      relative: false,
      x: 0,
      y: height - bottomLip,
    },
    { type: SVGPathData.HORIZ_LINE_TO, relative: false, x: width },
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
  ])
  const mountain = encodeSVGPath([
    ...arrayRange(0, sides).flatMap((i) => [
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
    ]),
  ])

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <svg
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
          <Measure from={[0, 0]} to={[0, height]}>
            height
          </Measure>

          <Measure from={[0, height - bottomLip]} to={[0, height]} offset={1}>
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
        </g>
      </svg>
      <div className={classes.sidebar}>
        <Autocomplete
          disableClearable
          size="small"
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Paper Size" variant="outlined" />
          )}
          value={dimensions}
          onChange={(e, newValue) => {
            if ("string" === typeof newValue) {
              const regex = /(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/
              const [, widthStr, heightStr] = regex.exec(newValue)!
              const [width, height] = [+widthStr, +heightStr]
              setDimensions(
                PAPER_SIZES.find(
                  ([psWidth, psHeight]) =>
                    psWidth === width && psHeight === height,
                ) ?? [width, height, "custom"],
              )
            } else {
              setDimensions(newValue)
            }
          }}
          getOptionLabel={(val) => {
            const [width, height, name = "custom"] = val
            return `${name} ${width}x${height}mm`
          }}
          options={PAPER_SIZES}
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1, min: 3, max: 8 }}
          value={sides}
          onChange={(e) => setSides(parseFloat(e.currentTarget.value))}
          label="Sides"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={sideWidth}
          onChange={(e) => setSideWidth(parseFloat(e.currentTarget.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
          label="sideWidth"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={bottomLip}
          onChange={(e) => setBottomLip(parseFloat(e.currentTarget.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
          label="bottomLip"
        />
        <div>innerShapeAngle {fmtdeg(shapeAngle)}</div>
        <div>calc {fmtdeg(calc)}</div>
      </div>
    </div>
  )
}
