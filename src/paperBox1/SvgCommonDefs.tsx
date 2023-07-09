import * as React from "react"
import * as path from "../paperEnvelope/svg"

export const SvgCommonDefs = () => (
  <>
    <defs>
      <pattern id="glue" patternUnits="userSpaceOnUse" width="4" height="4">
        <path
          d="M-1,1 l2,-2
             M0,4 l4,-4
             M3,5 l2,-2"
          style={{ stroke: "#eee", strokeWidth: 1 }}
        />
      </pattern>
    </defs>
    <style>
      {".valley {stroke-dasharray: 1,1;} "}
      {".outline "}
      {".mountain {stroke-dasharray: 10,2,1,1,1,2;} "}
    </style>
  </>
)
