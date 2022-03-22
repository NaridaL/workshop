import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { forwardRef, ReactElement } from "react"
import { MINUS } from "ts3dutils"
import { PAPER_SIZES, PaperSize } from "./common"

export const PaperAutocomplete = forwardRef(
  (
    {
      disableClearance = false,
      onChange,
      value,
      label,
    }: {
      disableClearance?: boolean
      onChange: (dimensions: PaperSize | null) => void
      value: PaperSize | null
      label: string
    },
    ref,
  ): ReactElement => {
    let paperSize: PaperSize | null = null
    if (value) {
      const [a, b] = value
      const [min, max] = a < b ? [a, b] : [b, a]
      paperSize = PAPER_SIZES.find(
        ([psWidth, psHeight]) => psWidth === min && psHeight === max,
      ) ?? [min, max, "custom"]
    }
    return (
      <Autocomplete
        ref={ref}
        disableClearable={disableClearance}
        size="small"
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        value={paperSize}
        onChange={(e, newValue) => {
          let result: PaperSize | null
          if ("string" === typeof newValue) {
            const regex = /(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/
            const [, widthStr, heightStr] = regex.exec(newValue)!
            const [min, max] = [+widthStr, +heightStr].sort(MINUS)
            result = [min, max, "custom"]
          } else {
            result = newValue
          }
          onChange(result)
        }}
        getOptionLabel={(val) => {
          const [width, height, name = "custom"] = val
          return `${name} ${width}x${height}mm`
        }}
        options={PAPER_SIZES}
      />
    )
  },
)
