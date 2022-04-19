import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import * as chroma from "chroma.ts"
import * as React from "react"
import { ReactElement, useEffect, useRef, useState } from "react"
import { Mesh, Shader, Texture, TSGL2Context, TSGLContext } from "tsgl"

import { FPSController } from "../common/FPSController"
import { memoizeLast } from "../common/memoizeLast"
import openSansRegularPng from "./OpenSans-Regular.png"

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
  return (
    <Grid container style={{ height: "99%" }} spacing={2} padding={2}>
      {[
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
            animate={true}
            state={{}}
          />
        </Grid>
      ))}
    </Grid>
  )
}
