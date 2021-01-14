import TextField from "@material-ui/core/TextField"
import SVGtoPDF from "svg-to-pdfkit"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import useTheme from "@material-ui/core/styles/useTheme"
import makeStyles from "@material-ui/core/styles/makeStyles"
import fileDownload from "js-file-download"
import * as React from "react"

import * as ReactDOMServer from "react-dom/server"
import { BaseDrawing } from "./BaseDrawing"
import Paper from "@material-ui/core/Paper"
import { int, MINUS, round10, TAU } from "ts3dutils"
import { useHashState } from "../paperBox1/useHashState"

import IconButton from "@material-ui/core/IconButton"

type PaperSize = [width: number, height: number, name: string]
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
const PAPER_SIZE_A4 = PAPER_SIZES.find(([, , name]) => name.includes("A4"))!
const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (newWindow) newWindow.opener = null
}
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
}))

export default () => {
  const [state, setState] = useHashState({
    radius: 100,
    sides: 6,
  })

  const theme = useTheme()
  const classes = useStyles()

  const getPrintSVG = () =>
    ReactDOMServer.renderToStaticMarkup(
      <BaseDrawing {...{ ...state, sides: state.sides, print: true }} />,
    ).replace(/\s{2,}/g, " ")

  const asSVG = () => {
    const svg = getPrintSVG()
    fileDownload(svg, "base.svg")
  }
  const asTemplatePDF = async () => {}

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <BaseDrawing {...state} />
      <div className={classes.sidebar}>
        <Paper style={{ padding: theme.spacing(1) }}>
          Helper to build{" "}
          <a href="https://www.paperkawaii.com/video-tutorial-origami-hexagonal-gift-box/">
            this
          </a>{" "}
          box. All measurements are in millimeters. To make a lid, you should
          increase the sideWidth by 1mm and ~halve the paper height.
        </Paper>
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
                setState((s) => ({ ...s, width: height, height: width }))
              }}
              color="primary"
            />
          }
          label="Landscape"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1, min: 3, max: 16 }}
          value={state.sides}
          onChange={(e) => setState((s) => ({ ...s, sides: +e.target.value }))}
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
