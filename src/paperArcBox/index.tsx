import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { ReactElement, useCallback } from "react"

import { useHashState } from "../common/useHashState"
import { ExportButtons } from "../paperBox1/ExportButtons"
import { PaperAutocomplete } from "../paperBox1/PaperAutocomplete"
import {
  PAPER_SIZE_A4,
  PaperSizeFromString,
  PaperSizeToString,
} from "../paperBox1/PaperSize"
import { ArcBoxSvg } from "./ArcBoxSvg"

export default (): ReactElement => {
  const [state, setState] = useHashState({
    width: 99,
    radius: 80,
    height: 114,
    tabWidth: 12,
    paperSize: PaperSizeToString(PAPER_SIZE_A4),
  })
  const setPartialState = useCallback(
    (update: Partial<typeof state>) => setState((s) => ({ ...s, ...update })),
    [setState],
  )
  const paperSize = PaperSizeFromString(state.paperSize)

  const theme = useTheme()

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid item xs={12} md={10}>
        <ArcBoxSvg
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
          value={paperSize}
          disableClearance={true}
          onChange={(v) => setPartialState({ paperSize: PaperSizeToString(v) })}
        />
        <TextField
          label="Radius"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 25, step: 1 }}
          value={state.radius}
          onChange={(e) => setPartialState({ radius: +e.target.value })}
        />
        <TextField
          label="Width"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          value={state.width}
          onChange={(e) => setPartialState({ width: +e.target.value })}
        />
        <TextField
          label="Height"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          value={state.height}
          onChange={(e) => setPartialState({ height: +e.target.value })}
        />
        <TextField
          label="Tab Width"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          value={state.tabWidth}
          onChange={(e) => setPartialState({ tabWidth: +e.target.value })}
        />
        <Divider />
        <ExportButtons
          baseFileName={`arcBox-${state.width}-${state.height}-${state.radius}-${state.tabWidth}`}
          what={<ArcBoxSvg {...state} paperSize={paperSize} />}
        />
      </Grid>
    </Grid>
  )
}
