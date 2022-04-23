import { int, M4, V, V3 } from "ts3dutils"

export class PanController {
  private lastPos = V3.O
  private unregister: (() => void) | undefined

  private pressedKeys: Record<string, undefined | true> = {}
  public pauseCam = false
  public reset() {
    M4.identity(this.state)
    this.onChange?.(this.state)
  }

  constructor(
    public state: M4,
    public readonly onChange?: (newState: M4) => void,
    public readonly lockUp?: V3,
  ) {}

  setState = (m: M4): void => {
    m !== this.state && M4.copy(m, this.state)
  }

  registerListeners(
    mouseMoveTarget: Pick<
      GlobalEventHandlers,
      "addEventListener" | "removeEventListener"
    >,
    keyUpDownTarget = mouseMoveTarget,
  ): () => void {
    this.unregister?.()
    mouseMoveTarget.addEventListener("wheel", this.wheel)
    mouseMoveTarget.addEventListener("mousemove", this.mousemove)
    keyUpDownTarget.addEventListener("keydown", this.keydown)
    keyUpDownTarget.addEventListener("keyup", this.keyup)

    return (this.unregister = () => {
      mouseMoveTarget.removeEventListener("wheel", this.wheel)
      mouseMoveTarget.removeEventListener("mousemove", this.mousemove)
      keyUpDownTarget.removeEventListener("keydown", this.keydown)
      keyUpDownTarget.removeEventListener("keyup", this.keyup)
    })
  }

  unregisterListeners(): void {
    this.unregister?.()
  }
  static readonly TRACKED_KEYS: ReadonlyArray<string> = ["a", "d", "s", "w"]

  tick(): void {
    const speed = new V3(
      +!!this.pressedKeys.a - +!!this.pressedKeys.d,
      +!!this.pressedKeys.s - +!!this.pressedKeys.w,
      0,
    )
    if (!speed.likeO()) {
      this.state = this.state.translate(speed.times(10))
      this.onChange?.(this.state)
    }
  }
  private wheel = (e: WheelEvent) => {
    const canvas = e.currentTarget as HTMLCanvasElement
    const { width, height } = canvas.getBoundingClientRect()
    const factor = Math.pow(1.1, -Math.sign(e.deltaY))
    const p = new V3(
      canvas.width * (e.offsetX / width),
      canvas.height * (1 - e.offsetY / height),
      0,
    )
    this.state = this.state
      .translate(p.negated())
      .scale(V3.XYZ.times(factor))
      .translate(p)
    this.onChange?.(this.state)
    e.preventDefault()
    e.stopPropagation()
  }

  private mousemove = (e: MouseEvent) => {
    const canvas = e.currentTarget as HTMLCanvasElement
    const { width, height } = canvas.getBoundingClientRect()
    const pagePos = V(e.pageX, e.pageY)
    const delta = this.lastPos.to(pagePos)
    if (e.buttons & 1 && !this.pauseCam) {
      // zRot -= delta.x * 0.25 * DEG
      this.state = this.state.translate(
        canvas.width * (delta.x / width),
        canvas.height * (-delta.y / height),
        0,
      )
      this.onChange?.(this.state)
    }
    this.lastPos = pagePos
  }

  private keydown = (e: KeyboardEvent) => {
    if (e.key === "r") {
      this.reset()
      e.preventDefault()
    } else if (PanController.TRACKED_KEYS.includes(e.key)) {
      this.pressedKeys[e.key] = true
      e.preventDefault()
    }
  }
  private keyup = (e: KeyboardEvent) => {
    this.pressedKeys[e.key] = undefined
    e.preventDefault()
  }

  getTransform(): M4 {
    return this.state
  }

  static toShortString(state: M4, posFactor: int = 1): string {
    const trans = state.getTranslation()
    const scale = state.m[0]
    return (
      Math.round(trans.x * posFactor) +
      "~" +
      Math.round(trans.y * posFactor) +
      "~" +
      Math.round(Math.log(scale) / Math.log(1.1))
    )
  }

  static fromShortString(cam: string, posFactor: int = 1): M4 {
    const coord = (s: string, f: int) =>
      V(s.split(".").map((sp) => +sp / f) as [number, number, number])
    const [transXStr, transYStr, scaleStr] = cam.split("~")
    return M4.translate(
      new V3(+transXStr / posFactor, +transYStr / posFactor, 0),
    ).scale(Math.pow(1.1, +scaleStr))
  }
}
