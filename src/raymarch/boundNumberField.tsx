import TextField, { TextFieldProps } from "@mui/material/TextField"
import * as React from "react"
import { ReactElement } from "react"

export function BoundNumberField<T extends string>({
  state,
  prop,
  setStatePartial,
  ...props
}: {
  state: Record<T, number>
  prop: T
  setStatePartial: (newPartialState: Record<T, number>) => void
} & TextFieldProps): ReactElement {
  return (
    <TextField
      variant="outlined"
      size="small"
      type="number"
      value={state[prop]}
      onChange={(e) =>
        setStatePartial({ [prop]: +e.target.value } as Record<T, number>)
      }
      label={prop}
      {...props}
    />
  )
}
