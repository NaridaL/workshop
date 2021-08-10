import { clamp, int, M4, V, V3 } from "ts3dutils"

export type OrbitCameraState = [udRot: number, rot: number, dist: number]

const ACTIONS = ["zoomIn", "zoomOut", "left", "right", "up", "down"] as const

/**
 * You can't use the keyboard events directly to move the camera, as they are
 * not fired often enough. Instead, we track which keys are down and tick()
 * should be called in the render loop.
 */
export class OrbitCameraController {
  private lastPos = V3.O
  private unregister: (() => void) | undefined

  private pressedKeys = {
    zoomIn: false,
    zoomOut: false,
    left: false,
    right: false,
    up: false,
    down: false,
  }
  public pauseCam = false
  private udRot = 0.1
  private rot = 0
  private dist = 10

  constructor(
    public readonly onChange?: (newState: OrbitCameraState) => void,
    private readonly keys = {
      zoomIn: "w",
      zoomOut: "s",
      left: "a",
      right: "d",
      up: " ",
      down: "Control",
    },
  ) {}

  setState = (m: M4 | OrbitCameraState): void => {
    console.log("setStaet")
    ;[this.udRot, this.rot, this.dist] =
      OrbitCameraController.toOrbitCameraState(m)
  }

  static toOrbitCameraState(m: M4 | OrbitCameraState): OrbitCameraState {
    if (m instanceof M4) {
      const eye = m
        .transposed()
        .scale(-1)
        .transformVector(m.getTranslation(), false)
      return [Math.atan(eye.z / eye.lengthXY()), eye.angleXY(), eye.length()]
    } else {
      return m
    }
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
    mouseMoveTarget.addEventListener("wheel", this.wheel)
    keyUpDownTarget.addEventListener("keydown", this.keydown)
    keyUpDownTarget.addEventListener("keyup", this.keyup)
    keyUpDownTarget.addEventListener("blur", this.keyup)

    return (this.unregister = () => {
      mouseMoveTarget.removeEventListener("mousemove", this.mousemove)
      mouseMoveTarget.removeEventListener("wheel", this.wheel)
      keyUpDownTarget.removeEventListener("keydown", this.keydown)
      keyUpDownTarget.removeEventListener("keyup", this.keyup)
      keyUpDownTarget.removeEventListener("keyup", this.keyup)
    })
  }

  blur = (): void => {}

  unregisterListeners(): void {
    this.unregister?.()
  }

  tick(): void {
    const dDist = (+this.pressedKeys.zoomOut - +this.pressedKeys.zoomIn) * 0.1
    const dRot = (-+this.pressedKeys.left + +this.pressedKeys.right) * 0.1
    const newUDRot = clamp(
      this.udRot + (+this.pressedKeys.up - +this.pressedKeys.down) * 0.1,
      -Math.PI * 0.5,
      Math.PI * 0.5,
    )
    if (dDist !== 0 || dRot !== 0 || newUDRot !== this.udRot) {
      this.dist += dDist
      this.rot += dRot
      this.udRot = newUDRot
      this.onChange?.(this.ss)
    }
  }

  private mousemove = (e: MouseEvent) => {
    const pagePos = V(e.pageX, e.pageY)
    const delta = this.lastPos.to(pagePos)
    if (e.buttons & 1 && !this.pauseCam) {
      // zRot -= delta.x * 0.25 * DEG
      const dRot = delta.x / 100
      const newUDRot = clamp(
        this.udRot + delta.y / 100,
        -Math.PI * 0.5,
        Math.PI * 0.5,
      )
      if (newUDRot !== this.udRot || dRot !== 0) {
        this.udRot = newUDRot
        this.rot += dRot
        this.onChange?.(this.ss)
        e.stopImmediatePropagation()
        e.preventDefault()
      }
    }
    this.lastPos = pagePos
  }

  private wheel = (e: WheelEvent) => {
    const newDist = clamp(this.dist + e.deltaY, 0.1, 1000)
    if (newDist !== this.dist) {
      this.dist = newDist
      e.stopImmediatePropagation()
      e.preventDefault()
      this.onChange?.(this.ss)
    }
  }

  get ss(): OrbitCameraState {
    return [this.udRot, this.rot, this.dist]
  }

  private keydown = (e: KeyboardEvent) => {
    for (const action of ACTIONS) {
      if (this.keys[action] === e.key) {
        this.pressedKeys[action] = true
        e.stopImmediatePropagation()
        e.preventDefault()
        return
      }
    }
  }

  private keyup = (e: KeyboardEvent) => {
    for (const action of ACTIONS) {
      if (this.keys[action] === e.key) {
        this.pressedKeys[action] = false
        e.stopImmediatePropagation()
        e.preventDefault()
        return
      }
    }
  }

  getLookAt(): M4 {
    return OrbitCameraController.getLookAt(this.ss)
  }

  static getLookAt([udRot, rot, dist]: OrbitCameraState): M4 {
    return M4.rotateZ(rot)
      .rotateY(udRot)
      .transform(M4.lookAt(V(dist, 0, 0), V3.O, V3.Z))
  }

  static invertLookAt(m: M4): { eye: V3; dir: V3; up: V3 } {
    const inverse = m.transposed().scale(-1)
    return {
      eye: inverse.transformVector(m.getTranslation(), false),
      dir: inverse.transformVector(V3.Z, false),
      up: inverse.transformVector(V3.Y.negated(), false),
    }
  }

  static toShortString(m: M4 | OrbitCameraState, posFactor: int = 100): string {
    const [udRot, rot, dist] = this.toOrbitCameraState(m)
    const coordString = (v: number, f: int) => Math.floor(v * f)
    return (
      coordString(udRot, 100) +
      "~" +
      coordString(rot, 100) +
      "~" +
      coordString(dist, 100)
    )
  }

  static fromShortString(cam: string, posFactor: int = 100): OrbitCameraState {
    const coord = (s: string, f: int) => +s / f
    const [udRotStr, rotStr, distStr] = cam.split("~")
    return [coord(udRotStr, 100), coord(rotStr, 100), coord(distStr, 100)]
  }
}
