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

import { FPSController } from "../common/FPSController"
import { useHashState } from "../paperBox1/useHashState"
import { BoundNumberField } from "../raymarch/boundNumberField"
import { FlyCameraController } from "../raymarch/FlyCameraController"
import { OrbitCameraController } from "../raymarch/OrbitCameraController"
import { memoizeLast } from "./helpers"
import openSansRegularPng from "./OpenSans-Regular.png"

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

// class Renderer {
//   private planeMesh!: Mesh & {
//     LINES: number[]
//     TRIANGLES: number[]
//     normals: any[]
//     coords: any[]
//   }
//   private shader!: Shader<{}, {}>
//   private mousePos = [-1, -1] as [number, number]
//   private cam: OrbitCameraController
//   public dyn = {
//     a: 1,
//     b: 1,
//     c: 1,
//     d: 1,
//   }
//   private fpsCounter = new FPSController(
//     (fps) => console.log("FPS: " + fps),
//     60,
//   )
//   private fontTexture: WebGLTexture
//
//   constructor(private readonly gl: TSGL2Context, private readonly state = {}) {
//     this.cam = new OrbitCameraController()
//     const mousemove = (e: MouseEvent) => {
//       const canvas = e.currentTarget as HTMLCanvasElement
//       const { width, height } = canvas.getBoundingClientRect()
//       this.mousePos = [
//         canvas.width * (e.offsetX / width),
//         canvas.height * (1 - e.offsetY / height),
//       ]
//       console.log("move")
//     }
//     const mouseleave = (e: MouseEvent) => {
//       console.log("leave")
//       this.mousePos = [-1, -1]
//     }
//     gl.canvas.addEventListener("mouseleave", mouseleave)
//     gl.canvas.addEventListener("mousemove", mousemove)
//     this.planeMesh = Mesh.plane({ startX: -1, startY: -1, width: 2, height: 2 })
//     // Mesh.plane generates tex coords [0,1] and we want [-1, 1] for rendering.
//     // this.planeMesh.coords = [
//     //   [-1, -1],
//     //   [1, -1],
//     //   [-1, 1],
//     //   [1, 1],
//     // ]
//     this.planeMesh.compile(gl)
//     // Create a texture.
//     this.fontTexture = gl.createTexture()!
//     this.gl.activeTexture(this.gl.TEXTURE0)
//     gl.bindTexture(gl.TEXTURE_2D, this.fontTexture)
//
//     // Fill the texture with a 1x1 blue pixel.
//     gl.texImage2D(
//       gl.TEXTURE_2D,
//       0,
//       gl.RGBA,
//       1,
//       1,
//       0,
//       gl.RGBA,
//       gl.UNSIGNED_BYTE,
//       new Uint8Array([0, 0, 255, 255]),
//     )
//
//     // Asynchronously load an image
//     const image = new Image()
//     image.src = openSansRegularPng
//     // image.addEventListener("load", () => {
//     //   // Now that the image has loaded make copy it to the texture.
//     //   console.log("lode")
//     //   gl.bindTexture(gl.TEXTURE_2D, this.fontTexture)
//     //   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
//     //   // gl.generateMipmap(gl.TEXTURE_2D)
//     // })
//
//     // this.fontTexture = Texture.fromURLSwitch(
//     //   ilog(openSansRegularPng),
//     //   {
//     //     format: gl.RED,
//     //     internalFormat: gl.R8,
//     //     type: gl.UNSIGNED_BYTE,
//     //   },
//     //   gl,
//     // )
//
//     console.log("setup")
//     this.updateShader(true)
//   }
//
//   private lastVs = ""
//   private lastFS = ""
//
//   updateShader(firstRun: boolean) {
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const vs = require("./raymarch.cc.vert")
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const fs = require("./fractals.frag")
//     if (this.lastVs !== vs || this.lastFS !== fs) {
//       // console.clear()
//       console.log("vs or fs changed! recompiling!")
//       if (this.shader) {
//         this.gl.deleteProgram(this.shader.program)
//       }
//       try {
//         this.shader = Shader.create(vs, fs)
//       } catch (e) {
//         console.error(e)
//         if (firstRun) throw e
//       }
//       this.lastVs = vs
//       this.lastFS = fs
//     }
//   }
//
//   start() {
//     this.gl.animate(this.render)
//   }
//
//   render = (abs: number) => {
//     this.gl.makeCurrent()
//     this.updateShader(false)
//     // this.cam.tick(abs)
//     this.fpsCounter.tick(abs)
//     // const llli = modelView.inversed()
//     if (!this.shader) return
//     this.gl.activeTexture(this.gl.TEXTURE0)
//     this.gl.bindTexture(this.gl.TEXTURE_2D, this.fontTexture)
//     // this.fontTexture.bind(0)
//     this.shader
//       .uniforms({
//         // colorPrimary: colors.primary,
//         // colorSecondary: colors.secondary,
//         // colorBg: colors.background,
//         highResTimeStamp: abs,
//         secs: abs / 1000,
//         gradients: 1,
//         iResolution: [this.gl.canvas.width, this.gl.canvas.height],
//         iMouse: this.mousePos,
//         iTime: abs / 1000,
//         fontTexture: 0,
//         // extra,
//         // ...dynamicState,
//         //campos,
//       })
//       .uniforms(this.dyn)
//       .draw(this.planeMesh)
//   }
//
//   destroy() {
//     // this.planeMesh.destroy()
//     // this.shader.destroy()
//   }
// }

class GenericRenderer {
  private planeMesh!: Mesh & {
    LINES: number[]
    TRIANGLES: number[]
    normals: any[]
    coords: any[]
  }
  private shader!: Shader<{}, {}>
  private tex: Texture

  private mousePos = [-1, -1] as [number, number]

  private readonly gl: TSGL2Context
  public dyn = {}
  public animate = true
  private fpsController: FPSController | undefined

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly fragShader: string,
    private readonly replacer?: string,
    onFps?: (fps: number) => void,
  ) {
    const mousemove = (e: MouseEvent) => {
      const canvas = e.currentTarget as HTMLCanvasElement
      const { width, height } = canvas.getBoundingClientRect()
      this.mousePos = [
        canvas.width * (e.offsetX / width),
        canvas.height * (1 - e.offsetY / height),
      ]
    }
    const mouseleave = (e: MouseEvent) => {
      this.mousePos = [-1, -1]
    }
    const gl = TSGLContext.create({
      canvas: canvas,
      alpha: true,
      premultipliedAlpha: true,
      // antialias: true,
      throwOnError: true,
    }) as unknown as TSGL2Context
    this.gl = gl
    gl.fixCanvasRes()
    // gl.addResizeListener()
    gl.canvas.addEventListener("mouseleave", mouseleave)
    gl.canvas.addEventListener("mousemove", mousemove)
    this.planeMesh = Mesh.plane({ startX: -1, startY: -1, width: 2, height: 2 })
    // Mesh.plane generates tex coords [0,1] and we want [-1, 1] for rendering.
    // this.planeMesh.coords = [
    //   [-1, -1],
    //   [1, -1],
    //   [-1, 1],
    //   [1, 1],
    // ]
    this.planeMesh.compile(gl)
    this.tex = Texture.fromURLSwitch(openSansRegularPng, undefined, gl)
    this.fpsController = onFps && new FPSController(onFps)
    this.updateShader()
  }

  updateShader() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let fs: string = require("./" + this.fragShader + ".frag").default
    if (this.replacer) {
      fs = fs.replace(
        "#define SDF(r, p) demoIcosahedron(r, p)",
        `#define SDF(r, p) ${this.replacer}(r, p)`,
      )
    }
    this.buildShader(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("./raymarch.cc.vert").default,
      fs,
    )
  }

  buildShader = memoizeLast((vs: string, fs: string) => {
    try {
      console.clear()

      console.log("vs or fs changed! recompiling!", this.fragShader)
      if (this.shader) {
        this.gl.deleteProgram(this.shader.program)
      }

      this.shader = Shader.create(vs, fs)
    } catch (e) {
      console.error(e)
      if (!this.shader) throw e
    }
  })

  start() {
    this.gl.animate(this.render)
  }

  render = (abs: number) => {
    this.gl.makeCurrent()
    this.updateShader()
    this.fpsController?.tick(abs)
    // this.cam.tick(abs)
    // const llli = modelView.inversed()
    if (!this.shader) return
    this.shader
      .uniforms({
        // colorPrimary: colors.primary,
        // colorSecondary: colors.secondary,
        // colorBg: colors.background,
        gradients: 1,
        iResolution: [this.gl.canvas.width, this.gl.canvas.height],
        iMouse: this.mousePos,
        iTime: this.animate ? abs / 1000 : 0,
        // extra,
        // ...dynamicState,
        //campos,
      })
      .uniforms(this.dyn)
      .draw(this.planeMesh)
  }

  destroy() {
    // this.planeMesh.destroy()
    // this.shader.destroy()
  }
}

function GenericDemo({
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderer = useRef(undefined! as GenericRenderer)
  const [fps, setFps] = useState(0)

  useEffect(() => {
    if (canvasRef.current) {
      renderer.current = new GenericRenderer(
        canvasRef.current,
        frag,
        replacer,
        setFps,
      )
      renderer.current.start()
    }
  }, [frag, replacer])
  const theme = useTheme()
  useEffect(() => {
    renderer.current &&
      Object.assign(renderer.current.dyn, {
        colorBackground: chroma.css(theme.palette.background.default).gl(),
        colorPrimary: chroma.css(theme.palette.primary.main).gl(),
        colorSecondary: chroma.css(theme.palette.secondary.main).gl(),
      })
  }, [theme.palette])
  useEffect(() => {
    if (renderer.current) renderer.current.animate = animate
  }, [animate])
  useEffect(() => {
    if (renderer.current) Object.assign(renderer.current.dyn, state)
  }, [state])

  return (
    <Card sx={sx}>
      <CardMedia
        component="canvas"
        ref={canvasRef}
        sx={{ width: "100%", height: "100%" }}
      />
      <CardContent>FPS: {fps}</CardContent>
    </Card>
  )
}

export default (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [renderProgress, setRenderProgress] = useState(
    undefined as number | undefined,
  )
  const [resolution, setResolution] = useState(512)
  const [state, setState] = useHashState(initialState)
  const setStatePartial = useCallback(
    (o) => setState((s) => ({ ...s, ...o })),
    [setState],
  )

  const tsgl = useRef(undefined! as TSGLContext)
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
    renderer.current &&
      Object.assign(renderer.current.dyn, {
        colorBackground: chroma.css(theme.palette.background.default).gl(),
        colorPrimary: chroma.css(theme.palette.primary.main).gl(),
        colorSecondary: chroma.css(theme.palette.secondary.main).gl(),
      })
  }, [theme.palette])

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
          frag="demotetra"
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
      {true &&
        [
          "demoIcosahedron",
          "demoCube",
          "demoOctahedron",
          "demoVector",
          "demoTetrahedron",
        ].map((frag) => (
          <Grid key={frag} item xs={12} md={6} lg={4}>
            <GenericDemo
              frag="demo3d"
              replacer={frag}
              sx={{ height: 300 }}
              animate={state.animate}
              state={state}
            />
          </Grid>
        ))}
      {false &&
        [
          "demotetra",
          "fractals",
          "demoRectangle.cc",
          "demoText.cc",
          "demoNgon.cc",
          "demoHexagon.cc",
          "demoOctagon.cc",
          "demoTriIso.cc",
          "demoArrow.cc",
          "demoHeart.cc",
          "demoTriEqui.cc",
          "demoSegment.cc",
          "demoTri.cc",
          "demoArc.cc",
        ].map((frag) => (
          <Grid key={frag} item xs={12} md={6} lg={4}>
            <GenericDemo
              frag={frag}
              sx={{ height: 300 }}
              animate={state.animate}
              state={state}
            />
          </Grid>
        ))}
      <div style={{ height: 500 }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
          }}
          width={resolution}
          height={resolution}
          tabIndex={0}
        />
      </div>
    </Grid>
  )
}
if (module.hot) {
  module.hot.accept("./fractals.frag", () => {
    console.log("updating")
  })
}
