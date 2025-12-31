import Grid from "@mui/material/Grid"
import { Theme } from "@mui/material/styles"
import { SxProps } from "@mui/system"
import * as React from "react"
import { ReactElement, useCallback } from "react"
import { Texture } from "tsgl"
import { PanningCanvasRenderer } from "../noises"
import {
  GenericDemo,
  RendererConstructor,
  RendererConstructorOptions,
  SimpleCanvasRenderer,
} from "../sdfs/SimpleCanvasRenderer"
import openSansRegularPng from "./OpenSans-Regular.png"

function Demo2D({
  frag,
  sx,
  animate,
  state,
}: {
  frag: string
  sx?: SxProps<Theme> | undefined
  animate: boolean
  state: {}
  replacer?: string
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Renderer = useCallback(
    class extends PanningCanvasRenderer {
      private tex: Texture;
      ["constructor"]: RendererConstructor
      constructor(
        canvas: HTMLCanvasElement,
        options: RendererConstructorOptions,
      ) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        super(() => require("./" + frag + ".frag"), canvas, options)

        this.tex = Texture.fromURLSwitch(openSansRegularPng, undefined, this.gl)
      }
    },
    [frag],
  )

  return (
    <GenericDemo
      focusable={true}
      sx={sx}
      Renderer={Renderer}
      animate={true}
      state={state}
    />
  )
}

export default (): ReactElement => {
  return (
    <Grid container spacing={2} padding={2}>
      {[
        "demoGear",
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
        <Grid key={frag} item size={{ xs: 12, md: 6, lg: 4 }}>
          <Demo2D frag={frag} sx={{ height: 300 }} animate={true} state={{}} />
        </Grid>
      ))}
    </Grid>
  )
}
