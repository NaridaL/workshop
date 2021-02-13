import { MenuItem, OutlinedInput, Select } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import * as chroma from "chroma.ts"
import * as React from "react"
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { DEG, lerp, M4, PI, V, V3 } from "ts3dutils"
import { currentGL, GL_COLOR, Mesh, TSGLContext } from "tsgl"

import { openInNewTab } from "../paperBox1/common"
import { useHashState } from "../paperBox1/useHashState"
import { BoundNumberField } from "./boundNumberField"
import { EGizmoController, NONE, Part } from "./EGizmoController"
import { FlyCameraController } from "./FlyCameraController"
import { FPSController } from "./FPSController"
import { renderHighRes } from "./renderHighRes"
import { buildShaders } from "./shaders"

const initialState = {
  a: 0.2,
  b: 0.2,
  c: 0.2,
  d: 0.2,
  cam: "999.999.999~-56.-58.-61~-44.-44.79",
}
type State = typeof initialState

function raymarchSetup(gl: TSGLContext) {
  gl.makeCurrent()

  const planeMesh = Mesh.plane({ startX: -1, startY: -1, width: 2, height: 2 })
  // Mesh.plane generates tex coords [0,1] and we want [-1, 1] for rendering
  planeMesh.coords = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]
  planeMesh.compile()

  return {
    planeMesh,
    shaders: buildShaders(gl),
  }
}

function raymarchRender(
  gl: TSGLContext,
  { shaders, planeMesh }: ReturnType<typeof raymarchSetup>,
  modelView: M4,
  colors: { background: GL_COLOR; primary: GL_COLOR; secondary: GL_COLOR },
  dynamicState: State,
  abs: number,
  extra: V3,
) {
  gl.makeCurrent()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const f = (abs / 1000 / 40) % 1
  //        vec3 spherepos = fromPolar(mix(-6., 6., f), abs(mix(-10., 10.,
  // f)) + PI / 2., 0.);
  const campos = (f: number) =>
    V3.polar(lerp(-6, 6, f), Math.abs(lerp(-10, 10, f)) + PI / 2, 0.5)

  const llli = modelView.inversed()
  shaders.raymarch
    .uniforms({
      colorPrimary: colors.primary,
      colorSecondary: colors.secondary,
      colorBg: colors.background,
      highResTimeStamp: abs,
      secs: abs / 1000,
      gradients: 1,
      extra,
      ...dynamicState,
      //campos,
      lll: modelView,
      llli,
    })
    .draw(planeMesh)
}

function raymarch(
  gl: TSGLContext & WebGL2RenderingContextStrict,
  colors: { background: GL_COLOR; primary: GL_COLOR; secondary: GL_COLOR },
  dynamicState: State,
  onFPSChange: (fps: number) => void,
  triggerRender: () => void,
  onCamChange?: (lookAt: M4) => void,
  onHover,
  setExtra,
) {
  gl.canvas.addEventListener("keydown", (e) => e.key === "r" && triggerRender())
  const camController = new FlyCameraController(
    M4.lookAt(V(10, 10, 10), V3.O, V3.Z),
    onCamChange,
  )
  let camMatrix = M4.IDENTITY
  const eGizmoController = new EGizmoController(
    gl,
    M4.rotateZ(20 * DEG).translate(5, 5, 1),
    onHover,
    () => (camController.pauseCam = true),
    () => (camController.pauseCam = false),
    setExtra,
  )
  eGizmoController.registerListeners(gl.canvas, () => camMatrix)

  gl.clearColor(...colors.background)
  gl.cullFace(gl.BACK)

  gl.pointSize(10)

  //gl.enable(gl.CULL_FACE)
  gl.disable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  gl.canvas.contentEditable = "true" // make canvas focusable
  gl.canvas.focus()
  camController.registerListeners(gl.canvas)

  const fpsController = new FPSController(onFPSChange)

  const shared = raymarchSetup(gl)
  if (module.hot) {
    module.hot.accept("./shaders", () => {
      console.clear()
      try {
        shared.shaders = buildShaders(currentGL())
      } catch (e) {
        console.error(e)
      }
    })
  }

  return {
    teardown: gl.animate(function (abs, _diff) {
      gl.makeCurrent()
      camController.tick()
      fpsController.tick(abs)

      camMatrix = M4.product(
        M4.perspective(
          70,
          gl.canvas.offsetWidth / gl.canvas.offsetHeight,
          0.1,
          50,
        ),
        camController.getLookAt(),
      )

      raymarchRender(
        gl,
        shared,
        camMatrix,
        colors,
        dynamicState,
        abs,
        eGizmoController.pos.getTranslation(),
      )

      gl.matrixMode(gl.PROJECTION)
      gl.loadMatrix(camMatrix)
      gl.matrixMode(gl.MODELVIEW)
      gl.loadIdentity()

      eGizmoController.render(shared.shaders.singleColor)
    }),
    setCam: camController.setState,
  }
}

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: 256,
    padding: theme.spacing(1),
    alignItems: "stretch",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 0,
    paddingTop: "100%", // 1:1
  },
}))

const useMatrixDisplayStyles = makeStyles((theme) => ({
  root: {
    "&:focused": {
      border: "2px solid " + theme.palette.primary.main,
    },
  },
}))

function MatrixDisplay({
  children,
  label,
  onFocus,
  onBlur,
}: {
  children: M4
  label: string
  onFocus
  onBlur
}) {
  const classes = useMatrixDisplayStyles()
  return (
    <OutlinedInput
      onFocus={onFocus}
      onBlur={onBlur}
      label={label}
      inputComponent="textarea"
      value={children.toString()}
    />
  )
}

export default (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [renderProgress, setRenderProgress] = useState(
    undefined as number | undefined,
  )
  const [gp, setGp] = useState(M4.IDENTITY)
  const [resolution, setResolution] = useState(256)
  const [gpFocused, setGpFocused] = useState(false)
  const [state, setState] = useHashState(initialState)
  const setStatePartial = useCallback(
    (o) => setState((s) => ({ ...s, ...o })),
    [setState],
  )
  const [part, setPart] = useState(NONE)
  const [fps, setFps] = useState(0)
  const dynamic = useRef(Object.assign({}, state))
  const raymarchRef = useRef<ReturnType<typeof raymarch>>()

  const classes = useStyles()
  const theme = useTheme()
  const colors = useMemo(
    () => ({
      background: chroma.css(theme.palette.background.default).gl(),
      primary: chroma.css(theme.palette.primary.main).gl(),
      secondary: chroma.css(theme.palette.secondary.main).gl(),
    }),
    [theme.palette],
  )
  const render = useCallback(
    async ([width, height]) => {
      const url = URL.createObjectURL(
        await renderHighRes(
          [width, height],
          raymarchSetup,
          (gl, shared) => {
            const camMatrix = M4.product(
              M4.perspective(70, width / height, 0.1, 50),
              FlyCameraController.fromShortString(state.cam),
            )

            raymarchRender(
              gl,
              shared,
              camMatrix,
              colors,
              state,
              2000,
              gp.getTranslation(),
            )
          },
          setRenderProgress,
        ),
      )
      setRenderProgress(undefined)
      openInNewTab(url)
    },
    [gp, colors, state],
  )
  useEffect(() => {
    console.log("creating context")
    const tsgl = TSGLContext.create({ canvas: canvasRef.current! })
    // tsgl.fixCanvasRes()
    //tsgl.addResizeListener()
    raymarchRef.current = raymarch(
      tsgl,
      colors,
      dynamic.current,
      setFps,
      () => render([1920, 1080]),
      (cam) => {
        setStatePartial({ cam: FlyCameraController.toShortString(cam) })
      },
      setPart,
      setGp,
    )
    return () => {
      raymarchRef.current?.teardown()
    }
  }, [])
  useEffect(() => {
    state.cam &&
      raymarchRef.current?.setCam(
        FlyCameraController.fromShortString(state.cam),
      )
  }, [state.cam])

  useEffect(() => {
    Object.assign(dynamic.current, state)
  }, [state])

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
            ("" + Math.floor(renderProgress * 100)).padStart(3, "\u2007") +
            "%"}
      </Button>
    ),
    [render, renderProgress],
  )
  return (
    <Grid container style={{ height: "99%" }}>
      <Grid item xs={12} md={9}>
        <div style={{ height: "100%" }}>
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              cursor: part === NONE ? "move" : "grab",
            }}
            width={resolution}
            height={resolution}
            tabIndex={0}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={3} className={classes.sidebar}>
        <Card>
          <CardContent>Raymarching demo.</CardContent>
        </Card>
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
        />{" "}
        <BoundNumberField
          {...{ state, setStatePartial }}
          prop="b"
          inputProps={{ step: 0.05 }}
        />
        <BoundNumberField
          {...{ state, setStatePartial }}
          prop="c"
          inputProps={{ step: 0.05 }}
        />{" "}
        <BoundNumberField
          {...{ state, setStatePartial }}
          prop="d"
          inputProps={{ step: 0.05 }}
        />
        <RenderButton dim={[1920, 1080]}>render hd</RenderButton>
        <RenderButton dim={[3840, 2160]}>render 4k</RenderButton>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() =>
            setStatePartial({ cam: "999.999.999~-56.-58.-61~-44.-44.79" })
          }
        >
          Cam 0
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() =>
            setStatePartial({ cam: "57.427.96~1.-100.-8~7.-7.99" })
          }
        >
          Cam 1
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() =>
            setStatePartial({ cam: "53.80.892~-9.-8.-100~-18.-99.8" })
          }
        >
          Cam 2
        </Button>
        <div>cam: {state.cam}</div>
        <div>fps: {fps}</div>
        <MatrixDisplay
          label="gp"
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
        >
          {gp}
        </MatrixDisplay>
      </Grid>
    </Grid>
  )
}
