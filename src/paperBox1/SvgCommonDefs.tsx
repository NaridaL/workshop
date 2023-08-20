import { css } from "@emotion/react"
import { blue, green, orange, pink, red } from "@mui/material/colors"
import { useTheme } from "@mui/material/styles"
import * as React from "react"
import { useContext, useMemo } from "react"
import { SvgPrintContext } from "./Measure"
import * as path from "./svg"

export const SvgCommonDefs = () => {
  const theme = useTheme()
  const print = useContext(SvgPrintContext)
  const screenStyles = useMemo(
    () => `
.adrian * { stroke: ${theme.palette.text.primary}; }
.adrian .red-stroke { stroke: ${red[500]}; }
.adrian .orange-stroke { stroke: ${orange[500]}; }
.adrian .blue-stroke { stroke: ${blue[500]}; }
.adrian .green-stroke { stroke: ${green[500]}; }
.adrian .pink-stroke { stroke: ${pink[500]}; }
.adrian .measure, *.measure * {
  stroke: ${theme.palette.primary.main};
  fill: ${theme.palette.primary.main};
}
.adrian .guide, .adrian .guide * {
  stroke: ${theme.palette.secondary.main};
  fill: ${theme.palette.secondary.main};
}
.adrian .glue, .adrian .guide .glue {
  stroke: none;
  fill: url(#glue);
}
`,
    [theme],
  )
  return (
    <>
      <defs>
        <pattern id="glue" patternUnits="userSpaceOnUse" width="4" height="4">
          <path
            d="M-1,1 l2,-2
               M0,4 l4,-4
               M3,5 l2,-2"
            style={{ stroke: theme.palette.divider, strokeWidth: 1 }}
          />
        </pattern>
      </defs>
      <style>{`
      .adrian * {
        stroke: black;
        stroke-width: .05mm;
        fill: none;
      }
      .mountain, .mountain * { stroke-dasharray: 10,2,1,1,1,2; }
      .valley, .valley * { stroke-dasharray: 1,1; }
      .cut, .cut * { stroke: 1; }
      `}</style>
      {!print && <style>{screenStyles}</style>}
    </>
  )
}
