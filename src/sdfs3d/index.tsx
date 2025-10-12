import Grid from "@mui/material/Grid"
import React, { ReactElement, useCallback } from "react"
import {
  GenericDemo,
  Renderer,
  RendererConstructor,
  SimpleCanvasRenderer,
} from "../sdfs/SimpleCanvasRenderer"

function Demo3D({
  frag,
  sx,
  animate,
  state,
  replacer,
}: {
  frag: string
  sx: any
  animate: boolean
  state: {}
  replacer?: string
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Renderer: RendererConstructor = useCallback(
    class Renderer2 extends SimpleCanvasRenderer implements Renderer {
      constructor(canvas: HTMLCanvasElement, onFps?: (fps: number) => void) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        super(() => require("./" + frag + ".frag"), canvas, onFps)
      }

      updateShader() {
        let fs: string = this.fragShader().default
        if (replacer) {
          fs = fs.replace(
            "#define SDF(r, p) demoIcosahedron(r, p)",
            `#define SDF(r, p) ${replacer}(r, p)`,
          )
        }
        this.buildShader(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require("../common/raymarch.vert").default,
          fs,
        )
      }
    },
    [frag, replacer],
  )
  return (
    <GenericDemo sx={sx} Renderer={Renderer} animate={animate} state={state} />
  )
}

export default (): ReactElement => {
  return (
    <Grid container style={{ height: "99%" }} spacing={2} padding={2}>
      {[
        "demoTetrahedron",
        "demoCube",
        "demoOctahedron",
        "demoDodecahedron",
        "demoIcosahedron",
        "demoVector",
        "demoPlatonic",
        "demoLego",
      ].map((frag) => (
        <Grid key={frag} item size={{ xs: 12, md: 6, lg: 4 }}>
          <Demo3D
            frag="demo3d"
            replacer={frag}
            sx={{ height: 300 }}
            animate={true}
            state={{}}
          />
        </Grid>
      ))}
    </Grid>
  )
}
