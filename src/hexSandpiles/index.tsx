import { useTheme } from "@mui/material/styles"
import * as chroma from "chroma.ts"
import { Font, load } from "opentype.js"
import * as React from "react"
import { ReactElement, useMemo } from "react"
import { V } from "ts3dutils"
import { Mesh } from "tsgl"
import { HexSandpiles } from "./HexSandpiles"
export default (): ReactElement => {
  const theme = useTheme()

  const width = 32
  const SQRT3_2 = Math.sqrt(3) / 2

  const c: React.CSSProperties = {
    boxSizing: "border-box",
    position: "relative",
    content: "",
    width,
    display: "block",
    height: width / SQRT3_2 / 4,
    borderWidth: `0 ${width / 2}px ${width / SQRT3_2 / 4}px ${width / 2}px`,
    borderStyle: "solid",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <HexSandpiles
        colorFg={theme.palette.primary.main}
        colorBg={theme.palette.background.default}
      />
      <div
        style={{
          padding: 4,
          display: "flex",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {false &&
          colorFg.map((value, index) => (
            <div
              className="hex"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: 4,
              }}
              key={index}
            >
              <div
                style={{
                  ...c,
                  borderColor: chroma.gl(value).css() + " transparent",
                  borderWidth: `0 ${width / 2}px ${width / SQRT3_2 / 4}px ${
                    width / 2
                  }px`,
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: chroma.gl(value).css(),
                  height: width / SQRT3_2 / 2,
                  color: chroma.gl(value).textColor().css(),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {index === 9 ? "9+" : index}
              </div>
              <div
                style={{
                  ...c,
                  borderColor: chroma.gl(value).css() + " transparent",
                  borderWidth: `${width / SQRT3_2 / 4}px ${width / 2}px 0 ${
                    width / 2
                  }px`,
                }}
              />
            </div>
          ))}
        {/* <Tooltip title="Calculate Recuring Inverse">
          <Button>Calc Rec. Inv.</Button>
		</Tooltip>
		 */}
        <div style={{ textAlign: "right", padding: 10, flexGrow: 1 }}>
          <a href="http://people.reed.edu/~davidp/grant/">Original (square)</a>{" "}
          <a href="https://www.youtube.com/watch?v=1MtEUErz7Gg">
            Explanatory video
          </a>
        </div>
      </div>
    </div>
  )
}
