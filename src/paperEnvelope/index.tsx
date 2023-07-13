import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { ReactElement, useCallback, useMemo } from "react"
import { round10 } from "ts3dutils"
import { useHashState } from "../common/useHashState"
import { ExportButtons } from "../paperBox1/ExportButtons"
import { PaperAutocomplete } from "../paperBox1/PaperAutocomplete"
import { PAPER_SIZE_A4 } from "../paperBox1/PaperSize"
import {
  claspNames,
  EnvelopeDimensions,
  EnvelopeSvg,
  presetsForOverlap,
} from "./EnvelopeSvg"

export default (): ReactElement => {
  const [state, setState] = useHashState({
    overlap: 10,
    envelopeHeight: 118,
    cornerRadius: 10,
    paperSize: PAPER_SIZE_A4,
    claspId: "Hexagon",
  })
  const setPartialState = useCallback(
    (update: Partial<typeof state>) => setState((s) => ({ ...s, ...update })),
    [setState],
  )

  const { envelopeWidth } = EnvelopeDimensions(
    state.paperSize[0],
    state.paperSize[1],
    state.overlap,
    state.envelopeHeight,
  )

  const presets = useMemo(
    () => presetsForOverlap(state.overlap),
    [state.overlap],
  )

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid item xs={12} md={10} padding={1}>
        <EnvelopeSvg
          {...state}
          claspIds={[state.claspId]}
          paperSize={state.paperSize}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
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
            image={""}
            title="Contemplative Reptile"
            sx={{
              height: 0,
              paddingTop: "100%", // 1:1
            }}
          />
        </Card>
        <PaperAutocomplete
          label="Paper Size"
          value={state.paperSize}
          disableClearance={true}
          onChange={(v) => setPartialState({ paperSize: v })}
        />
        <TextField
          label="Envelope Height"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 25, step: 1 }}
          value={state.envelopeHeight}
          onChange={(e) => setPartialState({ envelopeHeight: +e.target.value })}
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          disabled={true}
          value={round10(envelopeWidth / state.envelopeHeight, -2)}
          label="Aspect Ratio"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          value={state.cornerRadius}
          onChange={(e) => setPartialState({ cornerRadius: +e.target.value })}
          label="Corner Radius"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          value={state.overlap}
          onChange={(e) => setPartialState({ overlap: +e.target.value })}
          label="Overlap"
        />
        <FormControl variant="outlined" size="small">
          <InputLabel id="clasp-label">Clasp</InputLabel>
          <Select
            value={state.claspId}
            onChange={(e) => setPartialState({ claspId: e.target.value })}
            labelId="clasp-label"
            label="Clasp"
          >
            {claspNames.map((n) => (
              <MenuItem value={n} key={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
        <FormControl variant="outlined" size="small">
          <InputLabel id="clasp-label">Preset</InputLabel>
          <Select
            value={
              presets.find(
                (x) =>
                  x.envelopeHeight === state.envelopeHeight &&
                  x.paperSize[0] === state.paperSize[0],
              )?.name ?? ""
            }
            onChange={(e) => {
              const matchingPreset = presets.find(
                (p) => p.name === e.target.value,
              )
              matchingPreset &&
                setPartialState({
                  envelopeHeight: matchingPreset.envelopeHeight,
                  overlap: matchingPreset.overlap,
                  paperSize: matchingPreset.paperSize,
                })
            }}
            labelId="clasp-label"
            label="Preset"
          >
            {presets.map((p) => (
              <MenuItem value={p.name} key={p.name}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider />
        <ExportButtons
          baseFileName={`envelope-${state.paperSize[0]}-${state.envelopeHeight}-${state.overlap}-${state.claspId}`}
          what={
            <EnvelopeSvg
              {...state}
              paperSize={state.paperSize}
              claspIds={[state.claspId]}
            />
          }
        />
      </Grid>
    </Grid>
  )
}
