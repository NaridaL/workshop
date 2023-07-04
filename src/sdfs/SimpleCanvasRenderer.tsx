import MoreVertIcon from "@mui/icons-material/MoreVert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CircularProgress from "@mui/material/CircularProgress"
import Fab from "@mui/material/Fab"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu/Menu"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { Theme, useTheme } from "@mui/material/styles"
import { SxProps } from "@mui/system"
import * as chroma from "chroma.ts"
import * as React from "react"
import {
  MutableRefObject,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import sleep from "sleep-promise"
import { RawSourceMap, SourceMapConsumer } from "source-map-js"
import { Mesh, Shader, TSGL2Context, TSGLContext } from "tsgl"

import { FPSController } from "../common/FPSController"
import { memoizeLast } from "../common/memoizeLast"
import { openInNewTab } from "../paperBox1/common"

export interface Renderer {
  constructor: RendererConstructor
  render: (highResTimeStamp: number) => void
  gl: TSGL2Context
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
export interface RendererConstructorOptions {
  onFps?: (fps: number) => void
  resolutionScale?: number
}
export type RendererConstructor = new (
  canvas: HTMLCanvasElement,
  options: RendererConstructorOptions,
) => Renderer

export function GenericDemo({
  sx,
  animate,
  state,
  Renderer,
  focusable,
  rendererRef,
}: {
  sx: SxProps<Theme>
  animate: boolean
  state: {}
  focusable?: boolean
  rendererRef?: MutableRefObject<Renderer | undefined>
  Renderer: RendererConstructor
}) {
  const rendererRef2 = useRef<Renderer>()
  const [fps, setFps] = useState(0)
  const [anchorEl, setAnchorEl] = useState<Element>()

  const [renderProgress, setRenderProgress] = useState<undefined | number>()

  const render = useCallback(
    async (event: ReactMouseEvent<HTMLOrSVGElement>) => {
      const dim = event.currentTarget.dataset
        .dim!.split("x")
        .map((x) => +x) as [number, number]
      setAnchorEl(undefined)
      if (rendererRef2.current) {
        try {
          const url = URL.createObjectURL(
            await rendererRef2.current.renderImage(dim, setRenderProgress),
          )
          setRenderProgress(undefined)
          openInNewTab(url)
        } catch (e) {
          console.error(e)
        }
      }
    },
    [],
  )
  useEffect(() => {
    if (rendererRef) {
      rendererRef.current = rendererRef2.current
    }
  }, [rendererRef])

  const openMenu = useCallback(
    (event: ReactMouseEvent) => setAnchorEl(event.currentTarget),
    [],
  )
  const [resolutionScale, setResolutionScale] = useState(1)
  const resolutionScales = [
    0.5,
    1,
    window.devicePixelRatio,
    2,
    4 * window.devicePixelRatio,
  ]
  const closeMenu = useCallback(() => setAnchorEl(undefined), [])
  return (
    <Card sx={{ ...sx, position: "relative" }}>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={closeMenu}>
        <MenuItem data-dim="1920x1080" onClick={render}>
          Render HD
        </MenuItem>
        <MenuItem data-dim="3840x2160" onClick={render}>
          Render 4K
        </MenuItem>
        <ListItem>
          <ListItemText>Res Scale </ListItemText>{" "}
          <Select
            value={resolutionScale}
            onChange={(e) => {
              setAnchorEl(undefined)
              setResolutionScale(+e.target.value)
            }}
            size="small"
          >
            {resolutionScales.map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </ListItem>
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
      <Box sx={{ position: "absolute", margin: 1, left: 0 }}>{fps}</Box>

      <CardMedia
        component={ReactGlCanvas}
        Renderer={Renderer}
        animate={animate}
        state={state}
        rendererRef={rendererRef2}
        onFps={setFps}
        resolutionScale={resolutionScale}
        focusable={focusable}
        sx={{ width: "100%", height: "100%" }}
      />
    </Card>
  )
}

export const ReactGlCanvas = ({
  Renderer,
  onFps,
  animate,
  state,
  rendererRef,
  focusable = false,
  resolutionScale,
}: {
  Renderer: RendererConstructor
  onFps?: (fps: number) => void
  animate: boolean
  state: {}
  rendererRef?: MutableRefObject<Renderer | undefined>
  focusable?: boolean
  resolutionScale?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef2 = useRef<Renderer>()

  useEffect(() => {
    if (canvasRef.current) {
      const renderer1 = new Renderer(canvasRef.current, {
        onFps,
        resolutionScale,
      })
      rendererRef2.current = renderer1
      renderer1.start()
      if (rendererRef) {
        rendererRef.current = renderer1
      }
      return () => renderer1.destroy()
    }
  }, [Renderer, onFps, resolutionScale, rendererRef])
  const theme = useTheme()
  useEffect(() => {
    rendererRef2.current &&
      Object.assign(rendererRef2.current.dyn, {
        colorBackground: chroma.css(theme.palette.background.default).gl(),
        colorPrimary: chroma.css(theme.palette.primary.main).gl(),
        colorSecondary: chroma.css(theme.palette.secondary.main).gl(),
      })
  }, [rendererRef2.current, theme.palette])
  useEffect(() => {
    if (rendererRef2.current) rendererRef2.current.animate = animate
  }, [rendererRef2.current, animate])
  useEffect(() => {
    if (rendererRef2.current) Object.assign(rendererRef2.current.dyn, state)
  }, [rendererRef2.current, state])
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
}
export class SimpleCanvasRenderer {
  private readonly planeMesh!: Mesh & {
    LINES: number[]
    TRIANGLES: number[]
    normals: any[]
    coords: any[]
  }
  private shader!: Shader<{}, {}>

  private mousePos = [-1, -1] as [number, number]

  public readonly gl: TSGL2Context
  public dyn = {}
  public animate = true
  private fpsController: FPSController | undefined
  private stop: () => void = () => {}
  private resolutionScale: number

  constructor(
    protected readonly fragShader: () =>
      | string
      | { default: string; sourceMap: RawSourceMap },
    private readonly canvas: HTMLCanvasElement,
    {
      onFps,
      resolutionScale = window.devicePixelRatio,
    }: { onFps?: (fps: number) => void; resolutionScale?: number },
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
    function fixCanvasRes() {
      gl.canvas.width = gl.canvas.clientWidth * resolutionScale
      gl.canvas.height = gl.canvas.clientHeight * resolutionScale
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    }
    console.log("resolutionScale", resolutionScale)
    this.resolutionScale = resolutionScale
    if (this.canvas.clientWidth !== 0) {
      fixCanvasRes()
      gl.canvas.addEventListener("resize", fixCanvasRes)
    }
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
    this.gl.makeCurrent()
    this.updateShader()
  }

  protected updateShader() {
    this.buildShader(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../common/raymarch.vert").default,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      this.fragShader(),
    )
  }

  protected buildShader = memoizeLast(
    (vs: string, fs: string | { default: string; sourceMap: RawSourceMap }) => {
      let sourceMap: RawSourceMap | undefined
      try {
        let fsSrc
        if (typeof fs === "string") {
          fsSrc = fs
        } else {
          fsSrc = fs.default
          sourceMap = fs.sourceMap
        }
        // if (this.shader) {
        //   this.gl.deleteProgram(this.shader.program)
        // }
        console.log("building shader")

        this.shader = Shader.create(vs, fsSrc, this.gl)
      } catch (e) {
        console.clear()
        console.error(sourceMap)
        if (sourceMap) {
          const sourceMapConsumer = new SourceMapConsumer(sourceMap)
          const newMessage = (e as Error).message.replace(
            /ERROR: 0:(\d+)/,
            (match, line) => {
              const originalPosition = sourceMapConsumer.originalPositionFor({
                line: +line,
                column: 0,
              })
              console.log("originalPosition", originalPosition)
              return (
                "ERROR " +
                originalPosition.source +
                ":" +
                originalPosition.line +
                ":" +
                originalPosition.column
              )
            },
          )
          ;(e as Error).message = newMessage
        }

        if (!this.shader) throw e
      }
    },
  )

  start() {
    this.stop = this.gl.animate(this.render.bind(this))
  }

  render(abs: number) {
    console.log("render", this.resolutionScale)
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
      .uniforms(this.uniforms())
      .draw(this.planeMesh)
  }

  destroy() {
    console.log("destroy")
    this.stop()
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

    console.log(this.constructor)
    const renderer = new this.constructor(canvas, { resolutionScale: 4 })
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

  /**
   * Override this method to add additional uniforms to the simple renderer shader.
   */
  protected uniforms(): {} {
    return {}
  }
}
