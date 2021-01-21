import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import useTheme from "@material-ui/core/styles/useTheme"
import makeStyles from "@material-ui/core/styles/makeStyles"
import fileDownload from "js-file-download"
import * as React from "react"
import { MINUS, round10 } from "ts3dutils"
import * as ReactDOMServer from "react-dom/server"

import insideFoldsJpg from "./insideFolds.jpg"
import { InsideFolds } from "./InsideFolds"
import { OutsideFolds } from "./OutsideFolds"
import { useHashState } from "../paperBox1/useHashState"
import { INCH, PAPER_SIZE_A4, PAPER_SIZES } from "../paperBox1/common"

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: 256,
    padding: theme.spacing(1),
    alignItems: "stretch",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: "200px",
  },
}))

export default () => {
  const [state, setState] = useHashState({
    variant: "inside" as "inside" | "outside",
    baseRadius: 20,
    topRadius: 60,
    radius: 100,
    sides: 6,
  })

  const BaseDrawing: typeof InsideFolds = {
    inside: InsideFolds,
    outside: OutsideFolds,
  }[state.variant]

  const classes = useStyles()

  const getPrintSVG = () =>
    ReactDOMServer.renderToStaticMarkup(
      <BaseDrawing {...{ ...state, sides: state.sides, print: true }} />,
    ).replace(/\s{2,}/g, " ")
  const baseFileName = `${state.variant}-${state.baseRadius}-${state.topRadius}-${state.radius}-${state.sides}`
  const asSVG = () => {
    const svg = getPrintSVG()
    fileDownload(svg, baseFileName + ".svg")
  }
  const asTemplatePDF = async () => {
    const { svgToPdf } = await import(
      /* webpackChunkName: "svgToPdf" */ "../paperBox1/svgToPdf"
    )

    // add your content to the document here, as usual
    const blob = await svgToPdf({
      size: ([state.radius * 2, state.radius * 2] as [number, number])
        .sort(MINUS)
        .map((x) => round10(x * (72 / INCH), -2)),
      layout: "landscape",
      title: "Paper Box Template",
      author: "Adrian Leonhard",
      svg: getPrintSVG(),
    })

    fileDownload(blob, baseFileName + ".pdf")
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <BaseDrawing {...state} style={{ width: "100%", height: "100%" }} />
      <div className={classes.sidebar}>
        <Card>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={insideFoldsJpg}
              title="Contemplative Reptile"
            />
            <CardContent>
              Helper to build{" "}
              <a href="https://www.paperkawaii.com/video-tutorial-origami-hexagonal-gift-box/">
                this
              </a>{" "}
              box. All measurements are in millimeters. To make a lid, you
              should increase the sideWidth by 1mm and ~halve the paper height.
            </CardContent>
          </CardActionArea>
        </Card>
        <Autocomplete
          disableClearable
          size="small"
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Paper Size" variant="outlined" />
          )}
          value={PAPER_SIZE_A4}
          onChange={(e, newValue) => {
            let min: number, max: number
            if ("string" === typeof newValue) {
              const regex = /(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/
              const [, widthStr, heightStr] = regex.exec(newValue)!
              ;[min, max] = [+widthStr, +heightStr].sort(MINUS)
            } else {
              ;[min, max] = newValue
            }
            if (landscape) {
              setState((s) => ({
                ...s,
                width: max,
                height: min,
              }))
            } else {
              setState((s) => ({
                ...s,
                width: min,
                height: max,
              }))
            }
          }}
          getOptionLabel={(val) => {
            const [width, height, name = "custom"] = val
            return `${name} ${width}x${height}mm`
          }}
          options={PAPER_SIZES}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={false}
              onChange={() => {
                // noinspection JSSuspiciousNameCombination
                setState((s) => ({
                  ...s,
                  width: height,
                  height: width,
                }))
              }}
              color="primary"
            />
          }
          label="Landscape"
        />
        <FormControl variant="outlined" size="small">
          <InputLabel id="variant-label">Variant</InputLabel>
          <Select
            labelId="variant-label"
            label="Variant"
            value={state.variant}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                variant: e.target.value as any,
              }))
            }
          >
            <MenuItem value="inside">Inside Folds</MenuItem>
            <MenuItem value="outside">Outside Folds</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={state.baseRadius}
          onChange={(e) =>
            setState((s) => ({ ...s, baseRadius: +e.target.value }))
          }
          label="baseRadius"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={state.topRadius}
          onChange={(e) =>
            setState((s) => ({ ...s, topRadius: +e.target.value }))
          }
          label="topRadius"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={state.radius}
          onChange={(e) =>
            setState((s) => ({
              ...s,
              radius: +e.target.value,
            }))
          }
          label="Radius"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1, min: 4, max: 32 }}
          value={state.sides}
          onChange={(e) =>
            setState((s) => ({
              ...s,
              sides: +e.target.value,
            }))
          }
          label="Sides"
        />
        <Button variant="contained" onClick={asSVG}>
          Download As SVG
        </Button>
        <Button variant="contained" onClick={asTemplatePDF}>
          Template as PDF
        </Button>
      </div>
    </div>
  )
}
