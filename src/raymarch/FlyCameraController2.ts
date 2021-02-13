import { DEG, int, M4, V, V3 } from "ts3dutils"

/**
 * You can't use the keyboard events directly to move the camera, as they are
 * not fired often enough. Instead, we track which keys are down and tick()
 * should be called in the render loop.
 */
export class FlyCameraController2 {
  private lastPos = V3.O
  private unregister: (() => void) | undefined

  private pressedKeys: Record<string, undefined | true> = {}

  private constructor(
    public pos: V3,
    public forward,
    public readonly onChange?: (newState: M4) => void,
    public readonly lockUp?: V3,
  ) {}

  static startLookAt(pos: V3, focus: V3, up: V3 = V3.Z): FlyCameraController2 {
    M4.lookAt()
  }

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
    mouseMoveTarget.addEventListener("mousemove", this.mousemove)
    keyUpDownTarget.addEventListener("keydown", this.keydown)
    keyUpDownTarget.addEventListener("keyup", this.keyup)

    return (this.unregister = () => {
      mouseMoveTarget.removeEventListener("mousemove", this.mousemove)
      keyUpDownTarget.removeEventListener("keydown", this.keydown)
      keyUpDownTarget.removeEventListener("keyup", this.keyup)
    })
  }

  unregisterListeners(): void {
    this.unregister?.()
  }

  tick(): void {
    const speed = new V3(
      +!!this.pressedKeys.a - +!!this.pressedKeys.d,
      +!!this.pressedKeys.q +
        +!!this.pressedKeys.Control -
        +!!this.pressedKeys.e -
        +!!this.pressedKeys[" "],
      +!!this.pressedKeys.w - +!!this.pressedKeys.s,
    )
    if (!speed.likeO()) {
      this.state = this.state.translate(speed.toLength(0.05))
      this.onChange?.(this.state)
    }
  }

  private mousemove = (e: MouseEvent) => {
    const pagePos = V(e.pageX, e.pageY)
    const delta = this.lastPos.to(pagePos)
    if (e.buttons & 1) {
      // zRot -= delta.x * 0.25 * DEG
      const rot = M4.rotateY(delta.x * 0.25 * DEG)
        //
        .rotateX(delta.y * 0.25 * DEG)
      this.state = rot.times(this.state)
      // rot = rot.rotate(V3.O, rot.X, delta.y * 0.25 * DEG)
      // yRot = clamp(yRot - delta.y * 0.25 * DEG, -85 * DEG, 85 * DEG)
      this.onChange?.(this.state)
    }
    this.lastPos = pagePos
  }

  private keydown = (e: KeyboardEvent) => {
    this.pressedKeys[e.key] = true
    e.preventDefault()
  }
  private keyup = (e: KeyboardEvent) => {
    this.pressedKeys[e.key] = undefined
    e.preventDefault()
  }

  getLookAt(): M4 {
    return this.state
  }

  static invertLookAt(m: M4): { eye: V3; dir: V3; up: V3 } {
    const inverse = m.transposed().scale(-1)
    return {
      eye: inverse.transformVector(m.getTranslation(), false),
      dir: inverse.transformVector(V3.Z, false),
      up: inverse.transformVector(V3.Y.negated(), false),
    }
  }

  static toShortString(lookAt: M4, posFactor: int = 100): string {
    const coordString = (v: V3, f: int) =>
      [v.x, v.y, v.z].map((e) => Math.floor(e * f)).join(".")
    const { eye, dir, up } = FlyCameraController.invertLookAt(lookAt)
    return (
      coordString(eye, posFactor) +
      "~" +
      coordString(dir.unit(), 100) +
      "~" +
      coordString(up, 100)
    )
  }

  static fromShortString(cam: string, posFactor: int = 100): M4 {
    const coord = (s: string, f: int) =>
      V(s.split(".").map((sp) => +sp / f) as [number, number, number])
    const [posStr, lookDirStr, upStr] = cam.split("~")
    const eye = coord(posStr, posFactor)
    return M4.lookAt(eye, eye.plus(coord(lookDirStr, 100)), coord(upStr, 100))
  }
}
