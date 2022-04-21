import { Checkbox } from "@mui/material"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { useTheme } from "@mui/material/styles"
import aesthetically from "aesthetically"
import * as chroma from "chroma.ts"
import * as React from "react"
import { ReactElement, useCallback, useEffect, useRef, useState } from "react"
import { Mesh, Shader, Texture, TSGL2Context, TSGLContext } from "tsgl"

import { BoundNumberField } from "../common/BoundNumberField"
import { FPSController } from "../common/FPSController"
import { memoizeLast } from "../common/memoizeLast"
import { useHashState } from "../paperBox1/useHashState"
import { FlyCameraController } from "../raymarch/FlyCameraController"
import { OrbitCameraController } from "../raymarch/OrbitCameraController"
import openSansRegularPng from "./OpenSans-Regular.png"
import { ReactGlCanvas, SimpleCanvasRenderer } from "./SimpleCanvasRenderer"

function normfig(s: string) {
  return aesthetically.format(s, "monospace")
}

const initialState = {
  a: 0.2,
  b: 0.2,
  c: 0.2,
  d: 0.2,
  animate: true,
}
type State = typeof initialState

function GenericDemo({
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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    SimpleCanvasRenderer.bind(undefined, require("./" + frag + ".frag")),
    [frag],
  )

  return (
    <Card sx={sx}>
      <CardMedia
        component={ReactGlCanvas}
        Renderer={Renderer}
        animate={animate}
        state={state}
        sx={{ width: "100%", height: "100%" }}
      />
    </Card>
  )
}

export default (): ReactElement => {
  const [renderProgress, setRenderProgress] = useState(
    undefined as number | undefined,
  )
  const [resolution, setResolution] = useState(512)
  const [state, setState] = useHashState(initialState)
  const setStatePartial = useCallback(
    (o) => setState((s) => ({ ...s, ...o })),
    [setState],
  )

  const renderer = useRef(undefined! as GenericRenderer)

  // useEffect(() => {
  //   tsgl.current = TSGLContext.create({
  //     canvas: canvasRef.current!,
  //     alpha: true,
  //     premultipliedAlpha: true,
  //     // antialias: true,
  //     throwOnError: true,
  //   })
  //   tsgl.current.fixCanvasRes()
  //   tsgl.current.addResizeListener()
  //
  //   renderer.current = new Renderer(tsgl.current)
  //   renderer.current.start()
  // }, [])
  useEffect(() => {
    // state.cam &&
    //   raymarchRef.current?.setCam(
    //     OrbitCameraController.fromShortString(state.cam),
    //   )
  }, [state.cam])
  const theme = useTheme()

  useEffect(() => {
    renderer.current && Object.assign(renderer.current.dyn, state)
  }, [state])
  const render = () => {}

  const RenderButton = useCallback(
    ({ dim, children }: { dim: [number, number]; children: string }) => (
      <Button
        variant="contained"
        onClick={() => render(dim)}
        disabled={"undefined" !== typeof renderProgress}
      >
        {"undefined" === typeof renderProgress
          ? children
          : "Rendering... " +
            normfig("" + Math.floor(renderProgress * 100)).padStart(
              3,
              "\u2007",
            ) +
            "%"}
      </Button>
    ),
    [render, renderProgress],
  )

  function setCam({ cam }: { cam: string }) {
    const m = FlyCameraController.fromShortString(cam)
    setStatePartial({ cam: OrbitCameraController.toShortString(m) })
  }

  return (
    <Grid container style={{ height: "99%" }} spacing={2} padding={2}>
      <Grid item xs={12}>
        <GenericDemo
          frag="demoTemple"
          sx={{ height: 500 }}
          animate={state.animate}
          state={state}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Checkbox
          checked={state.animate}
          onChange={(_, animate) => setStatePartial({ animate })}
        />
        <Select
          onChange={(e) => setResolution(+(e.target.value as string))}
          value={resolution}
        >
          <MenuItem value={256}>256x256</MenuItem>
          <MenuItem value={512}>512x512</MenuItem>
        </Select>
        <BoundNumberField
          {...{ state, setStatePartial }}
          prop="a"
          inputProps={{ step: 0.05 }}
        />
        <BoundNumberField
          {...{ state, setStatePartial }}
          prop="b"
          inputProps={{ step: 0.05 }}
        />
        <BoundNumberField
          {...{ state, setStatePartial }}
          prop="c"
          inputProps={{ step: 0.05 }}
        />
        <BoundNumberField
          {...{ state, setStatePartial }}
          prop="d"
          inputProps={{ step: 0.05 }}
        />
      </Grid>
      {/*<Grid item xs={12} md={6} lg={4}>*/}
      {/*  <GenericDemo*/}
      {/*    frag="fractals"*/}
      {/*    sx={{ height: 300 }}*/}
      {/*    animate={state.animate}*/}
      {/*    state={state}*/}
      {/*  />*/}
      {/*</Grid>*/}
    </Grid>
  )
}
if (module.hot) {
  module.hot.accept("./fractals.frag", () => {
    console.log("updating")
  })
}
