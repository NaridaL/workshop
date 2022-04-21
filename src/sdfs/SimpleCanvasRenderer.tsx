import MoreVertIcon from "@mui/icons-material/MoreVert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CircularProgress from "@mui/material/CircularProgress"
import Fab from "@mui/material/Fab"
import Menu from "@mui/material/Menu/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useTheme } from "@mui/material/styles"
import * as chroma from "chroma.ts"
import {
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import * as React from "react"
import sleep from "sleep-promise"
import { Mesh, Shader, TSGL2Context, TSGLContext } from "tsgl"
import { FPSController } from "../common/FPSController"
import { memoizeLast } from "../common/memoizeLast"
import { openInNewTab } from "../paperBox1/common"

export interface Renderer {
  constructor: new (canvas: HTMLCanvasElement) => Renderer
  render: (highResTimeStamp: number) => void
  gl: WebGL2RenderingContext
  dyn: {}
  animate: boolean
  start(): void
  destroy(): void
  renderImage(
    this: Renderer,
    [width, height]: [width: number, height: number],
    onProgress?: (done0to1: number) => void,
  ): Promise<Blob>
}
export function GenericDemo({
  sx,
  animate,
  state,
  Renderer,
}: {
  sx: any
  animate: boolean
  state: {}
  replacer?: string
  Renderer: RendererConstructor
}) {
  const rendererRef = useRef<Renderer>()
  const [anchorEl, setAnchorEl] = useState<Element>()

  const [renderProgress, setRenderProgress] = useState<undefined | number>()

  const render = useCallback(async (event: MouseEvent<HTMLOrSVGElement>) => {
    const dim = event.currentTarget.dataset.dim!.split("x").map((x) => +x) as [
      number,
      number,
    ]
    setAnchorEl(undefined)
    if (rendererRef.current) {
      try {
        const url = URL.createObjectURL(
          await rendererRef.current.renderImage(dim, setRenderProgress),
        )
        setRenderProgress(undefined)
        openInNewTab(url)
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const openMenu = useCallback(
    (event: MouseEvent) => setAnchorEl(event.currentTarget),
    [],
  )
  const closeMenu = useCallback(() => setAnchorEl(undefined), [])
  return (
    <Card sx={{ ...sx, position: "relative" }}>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={closeMenu}>
        <MenuItem data-dim="1920x1080" onClick={render}>
          Render HD
        </MenuItem>
        <MenuItem data-dim="3840x2160 " onClick={render}>
          Render 4K
        </MenuItem>
      </Menu>
      <Box sx={{ position: "absolute", margin: 1, right: 0 }}>
        {renderProgress !== undefined ? (
          <CircularProgress
            variant="determinate"
            value={renderProgress * 100}
          />
        ) : (
          <Fab size="small" onClick={openMenu}>
            <MoreVertIcon />
          </Fab>
        )}
      </Box>

      <CardMedia
        component={ReactGlCanvas}
        Renderer={Renderer}
        animate={animate}
        state={state}
        rendererRef={rendererRef}
        sx={{ width: "100%", height: "100%" }}
      />
    </Card>
  )
}
export type RendererConstructor = new (
  canvas: HTMLCanvasElement,
  onFps?: (fps: number) => void,
) => Renderer
export const ReactGlCanvas = ({
  Renderer,
  onFps,
  animate,
  state,
  rendererRef,
}: {
  Renderer: RendererConstructor
  onFps?: (fps: number) => void
  animate: boolean
  state: {}
  rendererRef?: MutableRefObject<Renderer | undefined>
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderer = useRef<Renderer>()

  useEffect(() => {
    if (canvasRef.current) {
      renderer.current = new Renderer(canvasRef.current, onFps)
      renderer.current.start()
      if (rendererRef) {
        rendererRef.current = renderer.current
      }
    }
    return () => {
      if (renderer.current) {
        renderer.current.destroy()
      }
    }
  }, [Renderer, onFps, rendererRef])
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
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
}
export class SimpleCanvasRenderer {
  private planeMesh!: Mesh & {
    LINES: number[]
    TRIANGLES: number[]
    normals: any[]
    coords: any[]
  }
  private shader!: Shader<{}, {}>

  private mousePos = [-1, -1] as [number, number]

  protected readonly gl: TSGL2Context
  public dyn = {}
  public animate = true
  private fpsController: FPSController | undefined

  constructor(
    protected readonly fragShader: { default: string },
    private readonly canvas: HTMLCanvasElement,
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
      // don't enable by default: bad for perf
      // throwOnError: true,
    }) as unknown as TSGL2Context
    this.gl = gl
    console.log("this.canvas.clientWidth", this.canvas.clientWidth)
    if (this.canvas.clientWidth !== 0) {
      gl.fixCanvasRes(1)
    }
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
    this.fpsController = onFps && new FPSController(onFps)
    this.updateShader()
  }

  protected updateShader() {
    this.buildShader(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../common/raymarch.vert").default,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      this.fragShader.default,
    )
  }

  protected buildShader = memoizeLast((vs: string, fs: string) => {
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
    if (!this.shader) return
    this.shader
      .uniforms({
        iResolution: [this.gl.canvas.width, this.gl.canvas.height],
        iMouse: this.mousePos,
        iTime: this.animate ? abs / 1000 : 0,
      })
      .uniforms(this.dyn)
      .draw(this.planeMesh)
  }

  destroy() {
    // this.planeMesh.destroy()
    // this.shader.destroy()
  }

  async renderImage(
    this: Renderer,
    [width, height]: [width: number, height: number],
    onProgress?: (done0to1: number) => void,
  ): Promise<Blob> {
    onProgress?.(0)
    await sleep(10)
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const renderer = new this.constructor(canvas)
    Object.assign(renderer.dyn, this.dyn)
    const step = 256
    const gl = renderer.gl
    gl.enable(gl.SCISSOR_TEST)
    let donePixels = 0
    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        const scissorWidth = Math.min(step, width - x)
        const scissorHeight = Math.min(step, height - y)
        gl.scissor(x, y, scissorWidth, scissorHeight)
        // console.time("render block")
        renderer.render(0)
        // console.timeEnd("render block")
        await sleep(0)
        donePixels += scissorWidth * scissorHeight
        onProgress?.(donePixels / (width * height))
      }
    }
    return new Promise((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject("error creating png from canvas"),
        "png",
      ),
    )
  }
}
