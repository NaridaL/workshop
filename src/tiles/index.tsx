import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import makeStyles from "@mui/styles/makeStyles"
import { StyleRules } from "@mui/styles/withStyles/withStyles"
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { arrayRange } from "ts3dutils"
import { useHashState } from "../paperBox1/useHashState"
import { CairoTiles } from "./CairoTiles"
import { HexTiles } from "./HexTiles"
import { OctaSquare } from "./OctaSquare"
import { Penrose } from "./PenroseTiles"
import { Rhombitrihexagonal } from "./RhombitrihexagonalTiles"
import { SquareTiles } from "./SquareTiles"
import { TriangleTiles } from "./TriangleTiles"

const MAX_SHAPES = 3 // .c0, .c1, ... denote the different shapes (with
// different path lengths)
const RANDOM_CLASS_COUNT = 20
type SR = StyleRules<{
  animation: string
  shapeLengths: (number | undefined)[]
}>
const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      "@keyframes dash": {
        to: {
          strokeDashoffset: 0,
        },
      },
      "@keyframes popp": {
        from: {
          fil: "none",
        },
        to: {
          // fill: "inherit",
          // fill: "#eee",
        },
      },
      ...arrayRange(0, MAX_SHAPES).reduce((prev: SR, i) => {
        prev[`.c${i}`] = ({ shapeLengths }) => ({
          strokeDasharray: shapeLengths[i],
          strokeDashoffset: shapeLengths[i],
        })
        return prev
      }, {}),
      ...arrayRange(0, RANDOM_CLASS_COUNT).reduce((prev: SR, i) => {
        const time = 1 + (i / RANDOM_CLASS_COUNT) * 3 + "s"
        prev[`.r${i}, .r${i} path`] = ({ animation, fill }) => ({
          animation: [
            `dash 3s ${animation} forwards`,
            fill && `popp ${time} step-end forwards`,
          ]
            .filter(Boolean)
            .join(","),
          animationDelay: i * 0.1 + "s",
        })
        return prev
      }, {}),
    },
    svgg: ({ strokeWidth, strokeLinejoin, strokeLinecap, fill }) => ({
      fill: "none",
      // strokeDasharray: "120 120",
      // strokeDashoffset: 120,
      "& > *": {
        fill: fill ? "orange" : undefined,
        fillOpacity: 0.5,
        stroke: "orange",
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
        strokePosition: "inside",
      },
      "& > .s0, & > .color1": {
        // fill: "red",
        stroke: "red",
      },
      "& > .s1, & > .color2": {
        // fill: "blue",
        stroke: "blue",
      },
      "& > .s2, & > .color3": {
        // fill: "green",
        stroke: "green",
      },
    }),
  }
})

const PATTERNS = [
  SquareTiles,
  TriangleTiles,
  OctaSquare,
  HexTiles,
  CairoTiles,
  Rhombitrihexagonal,
  Penrose,
]

export default function (): ReactElement {
  const [x, setX] = useState(0)
  const [shapeLengths, setShapeLengths] = useState([] as (number | undefined)[])
  const theme = useTheme()
  const svgContainerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useHashState({
    type: PATTERNS[0].name,
    animation: "linear",
    a: 1,
    fill: true,
    ordered: false,
    strokeWidth: 0.1,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  })
  const Pattern = PATTERNS.find((p) => p.name === state.type) ?? PATTERNS[0]
  const setPartial = useCallback(
    (x) => setState((s) => ({ ...s, ...x })),
    [setState],
  )

  useEffect(() => {
    setShapeLengths(
      arrayRange(0, MAX_SHAPES).map((i) => {
        const path = svgContainerRef.current!.querySelector(
          ".c" + i,
        ) as SVGPathElement
        return path?.getTotalLength()
      }),
    )
  }, [Pattern, state.a])

  const classes = useStyles({ ...state, shapeLengths })
  return (
    <Grid container style={{ minHeight: "calc(100vh - 65px)" }} spacing={1}>
      <Grid item xs={12} md={10} ref={svgContainerRef}>
        <Pattern
          viewBox="0 0 20 20"
          randomClassCount={RANDOM_CLASS_COUNT}
          className={classes.svgg}
          x={20}
          y={20}
          width="100%"
          height="100%"
          style={{}}
          key={x}
          a={state.a}
          ordered={state.ordered}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={2}
        container
        spacing={1}
        alignItems="flex-start"
        style={{ height: 200 }}
      >
        <Grid item xs={12}>
          <Select
            value={state.type}
            fullWidth
            onChange={(e) => setPartial({ type: e.target.value as string })}
          >
            {PATTERNS.map(({ name }) => {
              return (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              )
            })}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            value={state.animation}
            fullWidth
            onChange={(e) =>
              setPartial({ animation: e.target.value as string })
            }
          >
            {[
              "linear",
              "ease",
              "ease-in",
              "ease-out",
              "ease-in-out",
              "step-start",
              "step-end",
            ].map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            value={state.strokeLinejoin}
            fullWidth
            onChange={(e) =>
              setPartial({ strokeLinejoin: e.target.value as string })
            }
            label="strokeLinejoin"
          >
            {["bevel", "miter", "round"].map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            value={state.strokeLinecap}
            fullWidth
            onChange={(e) =>
              setPartial({ strokeLinecap: e.target.value as string })
            }
            label="strokeLinecap"
          >
            {["butt", "round", "square"].map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth onClick={() => setX((x) => x + 1)}>
            Replay
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            type="number"
            value={state.a}
            onChange={(e) => setPartial({ a: +e.target.value })}
            label="a"
          />
        </Grid>
        <Grid item xs={12}>
          {shapeLengths}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.fill}
                onChange={(_, checked) => setPartial({ fill: checked })}
                color="primary"
              />
            }
            label="fill"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.ordered}
                onChange={(_, checked) => setPartial({ ordered: checked })}
                color="primary"
              />
            }
            label="ordered"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            inputProps={{ step: 0.005 }}
            type="number"
            value={state.strokeWidth}
            onChange={(e) => setPartial({ strokeWidth: +e.target.value })}
            label="strokeWidth"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
