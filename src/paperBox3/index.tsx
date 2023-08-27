import { Alert } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import Link from "@mui/material/Link"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { ReactElement, useCallback, useState } from "react"

import { useHashState } from "../common/useHashState"
import { ExportButtons } from "../paperBox1/ExportButtons"
import { PaperAutocomplete } from "../paperBox1/PaperAutocomplete"
import { PaperSize } from "../paperBox1/PaperSize"
import { PaperBox3Svg } from "./PaperBox3Svg"

export default (): ReactElement => {
  const [state, setState] = useHashState({
    variant: "inside" as "inside" | "outside",
    width: 60,
    height: 50,
    length: 100,
    tabWidth: 8,
  })
  const setPartialState = useCallback(
    (update: Partial<typeof state>) => setState((s) => ({ ...s, ...update })),
    [setState],
  )
  const [paperSize, setPaperSize] = useState(null as PaperSize | null)

  const theme = useTheme()

  const topLip = state.radius - state.topRadius
  const topOverlap = topLip - state.baseRadius

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid item xs={12} md={10}>
        <PaperBox3Svg
          {...state}
          paperSize={paperSize}
          style={{ width: "100%", height: "100%", margin: theme.spacing(1) }}
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
            image={"insideFoldsImg"}
            title="Contemplative Reptile"
            sx={{
              height: 0,
              paddingTop: "100%", // 1:1
            }}
          />
          <CardContent></CardContent>
        </Card>
        <FormControl variant="outlined" size="small">
          <InputLabel id="variant-label">Variant</InputLabel>
          <Select
            labelId="variant-label"
            label="Variant"
            value={state.variant}
            onChange={(e) =>
              setPartialState({
                variant: e.target.value as "inside" | "outside",
              })
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
          value={state.width}
          onChange={(e) => setPartialState({ width: +e.target.value })}
          label="width"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={state.height}
          onChange={(e) => setPartialState({ height: +e.target.value })}
          label="height"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={state.length}
          onChange={(e) => setPartialState({ length: +e.target.value })}
          label="length"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1, min: 4, max: 32 }}
          value={state.tabWidth}
          onChange={(e) => setPartialState({ tabWidth: +e.target.value })}
          label="tabWidth"
        />
        {state.variant === "inside" && topOverlap > 0 && (
          <Alert severity="error">
            For the inside folds variant, you want no (or even negative) overlap
            at the top.
          </Alert>
        )}
        <Divider />
        <Card>
          <CardContent>
            Set the Print Paper Size on large boxes to get a partial template
            which can be rotated. See{" "}
            <Link href={"outsideFoldsLargeTemplateImg"}>this image</Link> for an
            example.
          </CardContent>
        </Card>
        <PaperAutocomplete
          label="Print Paper Size"
          value={paperSize}
          onChange={setPaperSize}
        />
        <ExportButtons
          baseFileName={`${state.variant}-${state.baseRadius}-${state.topRadius}-${state.radius}-${state.sides}`}
          what={<PaperBox3Svg {...state} paperSize={paperSize} />}
        />
      </Grid>
    </Grid>
  )
}
