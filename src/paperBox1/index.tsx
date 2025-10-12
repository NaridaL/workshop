import Lock from "@mui/icons-material/Lock"
import LockOpen from "@mui/icons-material/LockOpen"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Link from "@mui/material/Link"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { ReactElement, useCallback, useState } from "react"
import { round10, TAU } from "ts3dutils"

import { useHashState } from "../common/useHashState"
import { ExportButtons } from "./ExportButtons"
import hexPrismBoxJpg from "./hexPrismBox.jpg"
import { PaperAutocomplete } from "./PaperAutocomplete"
import { PAPER_SIZE_A4, PaperSizeFromDimensions } from "./PaperSize"
import { PrismBoxSvg } from "./PrismBoxSvg"

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

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid
        size={{ xs: 12, md: 10 }}
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
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 2,
          alignItems: "stretch",
          // "& > *": { margin: 1 },
          gap: 2,
        }}
      >
        <Card>
          <CardMedia
            image={hexPrismBoxJpg}
            title="Hexagonal Prism Box"
            sx={{
              height: 0,
              paddingTop: "100%", // 1:1
            }}
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
          value={PaperSizeFromDimensions(width, height)}
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
                  size="large"
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
                  size="large"
                >
                  {lockBottomLip ? <Lock color="primary" /> : <LockOpen />}
                </IconButton>
              </>
            ),
          }}
          label="bottomLip"
        />
        <ExportButtons
          what={<PrismBoxSvg {...state} />}
          baseFileName={
            `${width}x${height}-${state.sides}x${state.sideWidth}` +
            `-${state.topLip}-${state.bottomLip}`
          }
        />
      </Grid>
    </Grid>
  )
}
