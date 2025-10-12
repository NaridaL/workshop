import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { ReactElement, useCallback } from "react"
import { round10 } from "ts3dutils"
import { useHashState } from "../common/useHashState"
import { ExportButtons } from "../paperBox1/ExportButtons"
import { PaperAutocomplete } from "../paperBox1/PaperAutocomplete"
import {
  PAPER_SIZE_A4,
  PaperSizeFromString,
  PaperSizeToString,
} from "../paperBox1/PaperSize"
import { EnvelopeDimensions, EnvelopeSvg } from "./EnvelopeSvg"

export default (): ReactElement => {
  const [state, setState] = useHashState({
    overlap: 10,
    envelopeHeight: 108,
    cornerRadius: 10,
    paperSize: PaperSizeToString(PAPER_SIZE_A4),
  })
  const setPartialState = useCallback(
    (update: Partial<typeof state>) => setState((s) => ({ ...s, ...update })),
    [setState],
  )
  const paperSize = PaperSizeFromString(state.paperSize)

  const { envelopeWidth } = EnvelopeDimensions(
    paperSize[0],
    paperSize[1],
    state.overlap,
    state.envelopeHeight,
  )

  const theme = useTheme()

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid size={{ xs: 12, md: 10 }}>
        <EnvelopeSvg
          {...state}
          paperSize={paperSize}
          style={{
            width: "100%",
            height: "100%",
            margin: theme.spacing(1),
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
          value={paperSize}
          disableClearance={true}
          onChange={(v) => setPartialState({ paperSize: PaperSizeToString(v) })}
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
        <Divider />
        <ExportButtons
          baseFileName={`envelope-${paperSize[0]}-${state.envelopeHeight}-${state.overlap}`}
          what={<EnvelopeSvg {...state} paperSize={paperSize} />}
        />
      </Grid>
    </Grid>
  )
}
