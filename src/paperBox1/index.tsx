import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Link from "@material-ui/core/Link"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Lock from "@material-ui/icons/Lock"
import LockOpen from "@material-ui/icons/LockOpen"
import fileDownload from "js-file-download"
import * as React from "react"
import { ReactElement, useCallback, useState } from "react"
import * as ReactDOMServer from "react-dom/server"
import { MINUS, round10, TAU } from "ts3dutils"

import { PAPER_SIZE_A4 } from "./common"
import hexPrismBoxJpg from "./hexPrismBox.jpg"
import { PaperAutocomplete } from "./PaperAutocomplete"
import { PrismBoxSvg } from "./PrismBoxSvg"
import { useHashState } from "./useHashState"

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: theme.spacing(1),
    alignItems: "stretch",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 0,
    paddingTop: "100%", // 1:1
  },
}))

export default (): ReactElement => {
  const [state, setStateUnchecked] = useHashState({
    width: PAPER_SIZE_A4[1],
    height: PAPER_SIZE_A4[0],
    sides: 6,
    sideWidth: 45,
    topLip: 30,
    bottomLip: 30,
    theta: 5,
  })
  const landscape = state.width > state.height
  const [width, height] = [state.width, state.height]
  const [min, max] = [width, height].sort(MINUS)

  // lockTopLip
  const topLipMax = Math.floor((height - state.bottomLip - 1) / 2)
  const [lockTopLip, setLockTopLip] = useState(true)

  // lockBottomLip
  const shapeAngle = TAU / state.sides
  const creaseAngle = shapeAngle / 2
  const bottomLipLockPos = round10(state.sideWidth / Math.tan(creaseAngle), -1)
  const [lockBottomLip, setLockBottomLip] = useState(false)

  const updateState = useCallback(
    (partialState: Partial<typeof state>) => {
      setStateUnchecked((s) => {
        const newState = { ...s, ...partialState }
        if (lockTopLip && topLipMax !== state.topLip) {
          newState.topLip = topLipMax
        }
        if (lockBottomLip && bottomLipLockPos !== state.bottomLip) {
          newState.bottomLip = bottomLipLockPos
        }
        return newState
      })
    },
    [
      setStateUnchecked,
      lockTopLip,
      topLipMax,
      state.topLip,
      state.bottomLip,
      lockBottomLip,
      bottomLipLockPos,
    ],
  )

  const theme = useTheme()

  const classes = useStyles()

  const getPrintSVG = () =>
    ReactDOMServer.renderToStaticMarkup(
      <PrismBoxSvg {...state} print={true} />,
    ).replace(/\s{2,}/g, " ")

  const asSVG = () => {
    const svg = getPrintSVG()
    fileDownload(
      svg,
      `${width}x${height}-${state.sides}x${state.sideWidth}` +
        `-${state.topLip}-${state.bottomLip}.svg`,
    )
  }
  const asTemplatePDF = async () => {
    const { svgToPdf } = await import(
      /* webpackChunkName: "svgToPdf" */ "./svgToPdf"
    )

    // add your content to the document here, as usual
    const blob = await svgToPdf({
      title: "Paper Box Template",
      author: "Adrian Leonhard",
      svg: getPrintSVG(),
    })

    fileDownload(
      blob,
      `${width}x${height}-${state.sides}x${state.sideWidth}` +
        `-${state.topLip}-${state.bottomLip}.pdf`,
    )
  }

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid
        item
        xs={12}
        md={10}
        style={{
          display: "flex",
          alignItems: "center",
          maxHeight: "100vh",
          padding: theme.spacing(2),
        }}
      >
        <PrismBoxSvg
          {...state}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            height: "auto",
            margin: "auto",
          }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <div className={classes.sidebar}>
          <Card>
            <CardMedia
              className={classes.media}
              image={hexPrismBoxJpg}
              title="Hexagonal Prism Box"
            />
            <CardContent>
              Helper to build{" "}
              <Link href="https://www.paperkawaii.com/video-tutorial-origami-hexagonal-gift-box/">
                this box
              </Link>
              . All measurements are in millimeters. To make a lid, you should
              increase the sideWidth by 1mm and ~halve the paper height.
            </CardContent>
          </Card>
          <PaperAutocomplete
            label="Paper Size"
            value={[min, max, "custom"]}
            onChange={(newPaperSize) => {
              const [minWidth, maxHeight] = newPaperSize!
              updateState(
                landscape
                  ? { width: maxHeight, height: minWidth }
                  : { width: minWidth, height: maxHeight },
              )
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={landscape}
                onChange={() => {
                  // noinspection JSSuspiciousNameCombination
                  updateState({
                    width: height,
                    height: width,
                  })
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
            onChange={(e) => updateState({ sides: +e.target.value })}
            label="Sides"
          />
          <TextField
            variant="outlined"
            size="small"
            type="number"
            inputProps={{ step: 1, min: 1 }}
            value={state.sideWidth}
            onChange={(e) => updateState({ sideWidth: +e.target.value })}
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
            }}
            label="sideWidth"
          />
          <TextField
            variant="outlined"
            size="small"
            type="number"
            inputProps={{ step: 1, min: 0 }}
            value={state.theta}
            onChange={(e) => updateState({ theta: +e.target.value })}
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
            }}
            label="theta"
          />
          <TextField
            variant="outlined"
            disabled={lockTopLip}
            size="small"
            type="number"
            inputProps={{
              step: 1,
              min: 0,
              max: topLipMax,
            }}
            value={state.topLip}
            onChange={(e) => updateState({ topLip: +e.target.value })}
            InputProps={{
              endAdornment: (
                <>
                  <InputAdornment position="end">mm</InputAdornment>
                  <IconButton
                    onClick={() => {
                      setLockTopLip(!lockTopLip)
                      updateState({})
                    }}
                  >
                    {lockTopLip ? <Lock color="primary" /> : <LockOpen />}
                  </IconButton>
                </>
              ),
            }}
            label="topLip"
          />
          <TextField
            variant="outlined"
            disabled={lockBottomLip}
            size="small"
            type="number"
            inputProps={{ step: 1, min: 0 }}
            value={state.bottomLip}
            onChange={(e) => updateState({ bottomLip: +e.target.value })}
            InputProps={{
              endAdornment: (
                <>
                  <InputAdornment position="end">mm</InputAdornment>
                  <IconButton
                    onClick={() => {
                      setLockBottomLip(!lockBottomLip)
                      updateState({})
                    }}
                  >
                    {lockBottomLip ? <Lock color="primary" /> : <LockOpen />}
                  </IconButton>
                </>
              ),
            }}
            label="bottomLip"
          />
          <Button variant="contained" onClick={asSVG}>
            Download As SVG
          </Button>
          <Button variant="contained" onClick={asTemplatePDF}>
            Template as PDF
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}
