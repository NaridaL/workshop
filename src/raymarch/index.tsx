import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select, { SelectProps } from "@mui/material/Select"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import makeStyles from "@mui/styles/makeStyles"
import aesthetically from "aesthetically"
import * as chroma from "chroma.ts"
import { debounce } from "lodash"
import * as React from "react"
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { DEG, lerp, M4, PI, V3 } from "ts3dutils"
import { currentGL, GL_COLOR, Mesh, Shader, TSGLContext } from "tsgl"

import { openInNewTab } from "../paperBox1/common"
import { useHashState } from "../paperBox1/useHashState"
import { BoundNumberField } from "./boundNumberField"
import edFragShader from "./ed.frag"
import { EGizmoController, NONE } from "./EGizmoController"
import { FlyCameraController } from "./FlyCameraController"
import { FPSController } from "./FPSController"
import {
  OrbitCameraController,
  OrbitCameraState,
} from "./OrbitCameraController"
import { renderHighRes } from "./renderHighRes"
import { buildShaders } from "./shaders"

/**
 * THE ART LIST
 *
 * - something isometric (chess?)
 * - something with dunes
 * - something with 3d fractals
 * - something with refraction (prism etc)
 */

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

  const f = (abs / 1000 / 40) % 1
  //        vec3 spherepos = fromPolar(mix(-6., 6., f), abs(mix(-10., 10.,
  // f)) + PI / 2., 0.);
  const campos = (f: number) =>
    V3.polar(lerp(-6, 6, f), Math.abs(lerp(-10, 10, f)) + PI / 2, 0.5)

  const llli = modelView.inversed()
  shaders.sdf
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
  onCamChange?: (p: OrbitCameraState) => void,
  onHover,
  setExtra,
  startShader,
) {
  gl.canvas.addEventListener("keydown", (e) => e.key === "r" && triggerRender())
  const camController = new OrbitCameraController(onCamChange)
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
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.cullFace(gl.BACK)

  gl.pointSize(10)

  //gl.enable(gl.CULL_FACE)
  gl.disable(gl.CULL_FACE)
  gl.disable(gl.DEPTH_TEST)

  gl.disable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE)
  gl.blendEquation(gl.FUNC_ADD)

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

  let it = 0

  return {
    updateShader(newShader) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      shared.shaders.ed = Shader.create(require("./raymarch.vert"), newShader)
    },
    teardown: gl.animate(function (abs, _diff) {
      gl.clear(gl.COLOR_BUFFER_BIT)
      it++
      // if (it % 30 !== 0) return
      // gl.clear(gl.DEPTH_BUFFER_BIT)
      // gl.clear(gl.COLOR_BUFFER_BIT)
      if (it % 300 === 0) {
        // gl.clear(gl.COLOR_BUFFER_BIT)
      }
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

function makeShader(desc): string {
  let di = 0

  function float(n: number) {
    const s = "" + n
    return s.includes(".") ? s : s + ".0"
  }

  function vec3([x, y, z]) {
    return "vec3(" + float(x) + ", " + float(y) + ", " + float(z) + ")"
  }

  function makePart(desc: Model[]) {
    let input
    let output
    let f

    function gen(g: (input: string) => string): void {
      input = "p" + di++
      output = "d" + di++
      f = `float ${output} = ${g(input)};\n`
    }

    for (const d of desc) {
      if (d.type === "sphere") {
        gen((input) => `sdSphere(${float(d.radius)}, ${input})`)
      } else if (d.type === "box") {
        gen((input) => `betterBox(${vec3(d.radius)}, ${input})`)
      } else if (d.type === "octahedron") {
        gen((input) => `sdOctahedron(${float(d.radius)}, ${input})`)
      } else if (d.type === "donut") {
        gen((input) => `sdDonut(${float(d.r0)}, ${float(d.r1)}, ${input})`)
      } else if (d.type === "translate") {
        const prevInput = input
        input = "p" + di++
        f = `vec3 ${prevInput} = ${input} + ${vec3(d.by)};\n` + f
      } else if (d.type === "expand") {
        const prevOutput = output
        output = "d" + di++
        f = f + `float ${output} = ${prevOutput} - ${float(d.by)};\n`
      } else if (d.type === "add" || d.type === "sub") {
        const [subf, subinput, suboutput] = makePart(d.what)
        f =
          f +
          `vec3 ${subinput} = ${input};\n` +
          subf +
          `${output} = ` +
          (d.type === "add"
            ? `min(${output}, ${suboutput})`
            : `max(${output}, -${suboutput})`) +
          `;\n`
      }
    }
    return [f, input, output]
  }

  const [f, input, output] = makePart(desc)
  let result = `RMHit sdf(vec3 ${input}) {\n`
  result += f
  result += `return RMHit(${output}, black);\n`
  result += "}\n"
  return result
}

function normfig(s: string) {
  return aesthetically.format(s, "monospace")
}

interface _XSphere {
  type: "sphere"
  radius: number
}

interface _XOctahedron {
  type: "octahedron"
  radius: number
}

interface _XDonut {
  type: "donut"
  r0: number
  r1: number
}

interface _XBox {
  type: "box"
  radius: _XV3
}

interface _XExpand {
  type: "expand"
  by: number
}

type _XV3 = [x: number, y: number, z: number]

interface _XTranslate {
  type: "translate"
  by: _XV3
}

interface _XAdd {
  type: "add"
  what: Model[]
}

type Model = _XSphere | _XTranslate | _XOctahedron | _XBox | _XDonut | _XAdd

function SphereEditor({
  value,
  onChange,
}: {
  value: _XSphere
  onChange: (newValue: _XSphere, oldValue: _XSphere) => void
}) {
  const onRadiusChange = useCallback(
    (ev) => onChange({ ...value, radius: +ev.target.value }, value),
    [onChange],
  )
  return (
    <div>
      Sphere{" "}
      <TextField
        value={value.radius}
        onChange={onRadiusChange}
        inputProps={{ type: "number" }}
      />
    </div>
  )
}

function BoxEditor({
  value,
  onChange,
}: {
  value: _XBox
  onChange: (newValue: _XBox, oldValue: _XBox) => void
}) {
  const onRadiusChange = useCallback(
    (newRadius: _XV3) => onChange({ ...value, radius: newRadius }, value),
    [value, onChange],
  )
  return (
    <div style={{ display: "flex" }}>
      Box <Vec3Editor value={value.radius} onChange={onRadiusChange} />
    </div>
  )
}

function ExpandEditor({
  value,
  onChange,
}: {
  value: _XExpand
  onChange: (newValue: _XExpand, oldValue: _XExpand) => void
}) {
  const onByChange = useCallback(
    (e) => onChange({ ...value, by: +e.target.value }, value),
    [value, onChange],
  )
  return (
    <div style={{ display: "flex" }}>
      Expand{" "}
      <TextField
        value={value.by}
        onChange={onByChange}
        type="number"
        inputProps={{}}
      />
    </div>
  )
}

class GizmoControl {
  take(startPos: _XV3, onChange: (newValue: _XV3, oldValue: _XV3) => void) {
    // TODO
  }
}

function Vec3Editor({
  value,
  onChange,
  gizmoControl,
}: {
  value: _XV3
  onChange: (newValue: _XV3, oldValue: _XV3) => void
  gizmoControl: GizmoControl
}) {
  const onElChange = useCallback(
    (e) => {
      const newValue = value.slice() as _XV3
      newValue[e.target.name] = +e.target.value
      onChange(newValue, value)
    },
    [value, onChange],
  )
  const gizmoClick = useCallback(
    () => gizmoControl.take(value, onChange),
    [gizmoControl, onChange, value],
  )
  return (
    <>
      <Button onClick={gizmoClick}>X</Button>
      {[0, 1, 2].map((i) => (
        <TextField
          key={i}
          name={"" + i}
          value={value[i]}
          onChange={onElChange}
          inputProps={{ type: "number" }}
        />
      ))}
    </>
  )
}

function TranslateEditor({
  value,
  onChange,
  gizmoControl,
}: {
  value: _XTranslate
  onChange: (newValue: _XTranslate, oldValue: _XTranslate) => void
  gizmoControl: GizmoControl
}) {
  const onByChange = useCallback(
    (newBy: _XV3) => onChange({ ...value, by: newBy }, value),
    [value, onChange],
  )
  return (
    <div style={{ display: "flex" }}>
      Translate{" "}
      <Vec3Editor
        value={value.by}
        onChange={onByChange}
        gizmoControl={gizmoControl}
      />
    </div>
  )
}

function DonutEditor({
  value,
  onChange,
  gizmoControl,
}: {
  value: _XDonut
  onChange: (newValue: _XDonut, oldValue: _XDonut) => void
  gizmoControl: GizmoControl
}) {
  const onElChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(
        {
          ...value,
          [e.target.name]: +e.target.value,
        },
        value,
      ),
    [value, onChange],
  )
  return (
    <div style={{ display: "flex" }}>
      Donut{" "}
      {(["r0", "r1"] as const).map((i) => (
        <TextField
          key={i}
          name={i}
          value={value[i]}
          onChange={onElChange}
          inputProps={{ type: "number" }}
        />
      ))}
    </div>
  )
}
function OctahedronEditor({
  value,
  onChange,
  gizmoControl,
}: {
  value: _XOctahedron
  onChange: (newValue: _XOctahedron, oldValue: _XOctahedron) => void
  gizmoControl: GizmoControl
}) {
  const onElChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(
        {
          ...value,
          [e.target.name]: +e.target.value,
        },
        value,
      ),
    [value, onChange],
  )
  return (
    <div style={{ display: "flex" }}>
      Octahedron{" "}
      {["radius"].map((i) => (
        <TextField
          key={i}
          name={i}
          value={value[i]}
          onChange={onElChange}
          inputProps={{ type: "number" }}
        />
      ))}
    </div>
  )
}

function AddEditor({
  value,
  onChange,
  gizmoControl,
}: {
  value: _XAdd
  onChange: (newValue: _XAdd, oldValue: _XAdd) => void
  gizmoControl: GizmoControl
}) {
  const onTypeChange: SelectProps["onChange"] = useCallback(
    (e) => onChange({ ...value, type: e.target.value }, value),
    [value, onChange],
  )
  const onWhatChange = useCallback(
    (newWhat: Model[]) => onChange({ ...value, what: newWhat }, value),
    [value, onChange],
  )
  return (
    <div style={{ display: "flex" }}>
      <Select value={value.type} name="type" onChange={onTypeChange}>
        <MenuItem value="add">Add</MenuItem>
        <MenuItem value="sub">Sub</MenuItem>
      </Select>{" "}
      <Ed
        value={value.what}
        onChange={onWhatChange}
        gizmoControl={gizmoControl}
      />
    </div>
  )
}

function Ed({
  value,
  onChange,
  gizmoControl,
}: {
  value: Model[]
  onChange: (newValue: Model[]) => void
  gizmoControl: GizmoControl
}) {
  const onItemChange = useCallback(
    (newValue, oldValue) =>
      onChange(value.map((v) => (v === oldValue ? newValue : v))),
    [onChange, value],
  )
  return (
    <div>
      {value.map((x, i) => {
        const PEd = {
          sphere: SphereEditor,
          expand: ExpandEditor,
          add: AddEditor,
          sub: AddEditor,
          box: BoxEditor,
          donut: DonutEditor,
          translate: TranslateEditor,
          octahedron: OctahedronEditor,
        }[x.type]
        return (
          PEd && (
            <PEd
              key={i}
              value={x}
              onChange={onItemChange}
              gizmoControl={gizmoControl}
            />
          )
        )
      })}
    </div>
  )
}

export default (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [renderProgress, setRenderProgress] = useState(
    undefined as number | undefined,
  )
  const [gp, setGp] = useState(M4.IDENTITY)
  const [resolution, setResolution] = useState(512)
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

  const [model, setModel] = useState([
    { type: "sphere", radius: 1 },
    { type: "translate", by: [1, 2, 3] },
    {
      type: "add",
      what: [
        { type: "box", radius: [1, 2, 3] },
        { type: "translate", by: [0.1, 0.1, 0.1] },
        { type: "expand", by: 0.3 },
      ],
    },
    {
      type: "add",
      what: [
        { type: "octahedron", radius: 2 },
        { type: "translate", by: [0.1, 0.1, 0.1] },
      ],
    },
    {
      type: "add",
      what: [
        { type: "donut", r0: 2, r1: 0.2 },
        { type: "translate", by: [0.1, 0.1, 0.1] },
      ],
    },
  ])

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
              OrbitCameraController.getLookAt(
                OrbitCameraController.fromShortString(state.cam),
              ),
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
    const tsgl = TSGLContext.create({
      canvas: canvasRef.current!,
      alpha: true,
      premultipliedAlpha: true,
      // antialias: true,
      throwOnError: true,
    })
    console.log(tsgl.getParameter(tsgl.MAX_SAMPLES))
    // tsgl.fixCanvasRes()
    //tsgl.addResizeListener()
    raymarchRef.current = raymarch(
      tsgl,
      colors,
      dynamic.current,
      setFps,
      () => render([1920, 1080]),
      debounce((cam) => {
        setStatePartial({ cam: OrbitCameraController.toShortString(cam) })
      }),
      setPart,
      setGp,
    )

    return () => {
      raymarchRef.current?.teardown()
    }
  }, [])
  useEffect(() => {
    // state.cam &&
    //   raymarchRef.current?.setCam(
    //     OrbitCameraController.fromShortString(state.cam),
    //   )
  }, [state.cam])
  useEffect(() => {
    raymarchRef.current?.updateShader(
      edFragShader.replace(/RMHit sdf\(vec3 p\) {[\s\S]*?}/, makeShader(model)),
    )
  }, [model])

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
          onClick={() => setCam({ cam: "999.999.999~-56.-58.-61~-44.-44.79" })}
        >
          Cam 0
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => setCam({ cam: "57.427.96~1.-100.-8~7.-7.99" })}
        >
          Cam 1
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => setCam({ cam: "53.80.892~-9.-8.-100~-18.-99.8" })}
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
        <div>
          <Ed value={model} onChange={setModel} />
        </div>
        <div>
          <pre>
            <code>{makeShader(model)}</code>
          </pre>
        </div>
      </Grid>
    </Grid>
  )
}
