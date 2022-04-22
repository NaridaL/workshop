import Grid from "@mui/material/Grid"
import * as React from "react"
import { ReactElement, useCallback } from "react"
import { Texture } from "tsgl"
import { GenericDemo, SimpleCanvasRenderer } from "../sdfs/SimpleCanvasRenderer"
import openSansRegularPng from "./OpenSans-Regular.png"

function Demo2D({
  frag,
  sx,
  animate,
  state,
}: {
  frag: string
  sx: any
  animate: boolean
  state: {}
  replacer?: string
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Renderer = useCallback(
    class extends SimpleCanvasRenderer {
      private tex: Texture

      constructor(
        canvas: HTMLCanvasElement,

        onFps?: (fps: number) => void,
      ) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        super(() => require("./" + frag + ".frag").default, canvas, onFps)

        this.tex = Texture.fromURLSwitch(openSansRegularPng, undefined, this.gl)
      }
    },
    [frag],
  )

  return (
    <GenericDemo sx={sx} Renderer={Renderer} animate={animate} state={state} />
  )
}

export default (): ReactElement => {
  return (
    <Grid container style={{ height: "99%" }} spacing={2} padding={2}>
      {[
        "demoRectangle",
        "demoText",
        "demoNgon",
        "demoHexagon",
        "demoOctagon",
        "demoTriIso",
        "demoArrow",
        "demoHeart",
        "demoTriEqui",
        "demoSegment",
        "demoTri",
        "demoArc",
      ].map((frag) => (
        <Grid key={frag} item xs={12} md={6} lg={4}>
          <Demo2D frag={frag} sx={{ height: 300 }} animate={true} state={{}} />
        </Grid>
      ))}
    </Grid>
  )
}
