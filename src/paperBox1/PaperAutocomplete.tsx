import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { forwardRef, ReactElement } from "react"
import { PAPER_SIZES, PaperSizeFromDimensions } from "./PaperSize"
import { PaperSize } from "./PaperSize"

export interface PaperAutocompleteProps<
  DisableClearance extends boolean | undefined,
> {
  disableClearance?: DisableClearance
  onChange: (
    dimensions: DisableClearance extends true ? PaperSize : PaperSize | null,
  ) => void
  value: PaperSize | null
  label: string
}

export type PaperAutocomplete = <DisableClearance extends boolean | undefined>(
  props: PaperAutocompleteProps<DisableClearance>,
) => ReactElement | null
export const PaperAutocomplete: PaperAutocomplete = forwardRef(
  (
    {
      disableClearance = false,
      onChange,
      value,
      label,
    }: PaperAutocompleteProps<boolean | undefined>,
    ref,
  ): ReactElement => {
    let paperSize: PaperSize | null = null
    if (value) {
      const [a, b] = value
      paperSize = PaperSizeFromDimensions(a, b)
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
          if ("string" === typeof newValue) {
            if (newValue.trim() === "") {
              if (!disableClearance) {
                onChange(null!)
              }
            } else {
              const match = /(\d+(?:\.\d+)?)\D*?(\d+(?:\.\d+)?)?\D*$/.exec(
                newValue,
              )
              if (match) {
                const [, widthStr, heightStr] = match
                onChange(
                  PaperSizeFromDimensions(+widthStr, +(heightStr || widthStr)),
                )
              }
            }
          } else {
            onChange(newValue!)
          }
        }}
        getOptionLabel={(val) => {
          const [width, height, name = "custom"] = val
          return `${name} ${width}x${height}mm`
        }}
        options={PAPER_SIZES}
      />
    )
  },
) as PaperAutocomplete
