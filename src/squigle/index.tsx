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
import { SquigleSvg } from "./SquigleSvg"

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

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid size={{ xs: 12, md: 10 }} padding={1}>
        <SquigleSvg
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
        <Divider />
        <ExportButtons
          baseFileName={`envelope-${state.paperSize[0]}-${state.envelopeHeight}-${state.overlap}-${state.claspId}`}
          what={
            <SquigleSvg
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
