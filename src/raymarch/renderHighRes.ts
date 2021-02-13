import sleep from "sleep-promise"
import { TSGLContext } from "tsgl"

export async function renderHighRes<T>(
  [width, height]: [number, number],
  setup: (gl: TSGLContext) => T,
  render: (gl: TSGLContext, shared: T) => void,
  onProgress?: (done0to1: number) => void,
): Promise<Blob> {
  onProgress?.(0)
  await sleep(10)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const step = 200
  const gl = TSGLContext.create({ canvas })
  gl.enable(gl.SCISSOR_TEST)
  const shared = setup(gl)
  let donePixels = 0
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const scissorWidth = Math.min(step, width - x)
      const scissorHeight = Math.min(step, height - y)
      gl.scissor(x, y, scissorWidth, scissorHeight)
      // console.time("render block")
      render(gl, shared)
      // console.timeEnd("render block")
      await sleep(0)
      donePixels += scissorWidth * scissorHeight
      onProgress?.(donePixels / (width * height))
    }
  }
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject("error")), "png"),
  )
}
