import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import InputAdornment from "@material-ui/core/InputAdornment"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import useTheme from "@material-ui/core/styles/useTheme"
import makeStyles from "@material-ui/core/styles/makeStyles"
import fileDownload from "js-file-download"
import * as React from "react"
import { useState, useCallback } from "react"
import * as ReactDOMServer from "react-dom/server"

import { BaseDrawing } from "./BaseDrawing"

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
const PAPER_SIZE_A4 = PAPER_SIZES.find(([, , name]) => name.includes("A4"))!

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
  const [dimensions, setDimensions] = useState<PaperSize>(PAPER_SIZE_A4)
  const [transpose, setTranspose] = useState(true)
  const [width, height] = transpose
    ? [dimensions[1], dimensions[0]]
    : dimensions
  const [sides, setSides] = useState(5)
  const [sideWidth, setSideWidth] = useState(45)
  const [bottomLip, setBottomLip] = useState(30)
  const [topLip, setTopLip] = useState(30)

  const theme = useTheme()

  const classes = useStyles()
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer")
    if (newWindow) newWindow.opener = null
  }

  const asSVG = useCallback(() => {
    const svg = ReactDOMServer.renderToStaticMarkup(
      <BaseDrawing
        {...{
          height,
          width,
          topLip,
          bottomLip,
          sideWidth,
          sides,
          measurements: false,
        }}
      />,
    ).replace(/\s{2,}/g, " ")
    fileDownload(svg, "base.svg")
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <BaseDrawing
        {...{ height, width, topLip, bottomLip, sideWidth, sides }}
      />
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
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={transpose}
                onChange={() => setTranspose(!transpose)}
              />
            }
            label="Landscape"
          />
        </div>
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1, min: 3, max: 16 }}
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
          inputProps={{
            step: 1,
            min: 0,
            max: Math.floor((height - bottomLip - 1) / 2),
          }}
          value={topLip}
          onChange={(e) => setTopLip(parseFloat(e.currentTarget.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
          label="topLip"
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
        <Button onClick={asSVG}>As SVG</Button>
      </div>
    </div>
  )
}
