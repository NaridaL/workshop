import * as chroma from "chroma.ts"
import { arrayRange, clamp, DEG, eq, eq0, int, M4, TAU, V, V3 } from "ts3dutils"
import { GL_COLOR_BLACK, Mesh, Shader, TSGLContext } from "tsgl"

const X_RED = chroma.color("red").gl()
const Y_GREEN = chroma.color("green").gl()
const Z_BLUE = chroma.color("blue").gl()
const HIGHLIGHT = GL_COLOR_BLACK
const L3X = { anchor: V3.O, dir1: V3.X }
const L3Y = { anchor: V3.O, dir1: V3.Y }
const L3Z = { anchor: V3.O, dir1: V3.Z }

export type Part = number & { __BRAND__: "part" }
export const NONE = 0 as Part,
  X = 1 as Part,
  Y = 2 as Part,
  Z = 3 as Part,
  XROT = 4 as Part,
  YROT = 5 as Part,
  ZROT = 6 as Part

export class EGizmoController {
  private meshes: Record<string, Mesh & { TRIANGLES: int[] }> = {}

  private highlight: Part = NONE
  private offsetGC: V3 | undefined = undefined

  private dragging: Part = NONE

  private getCameraMatrix: () => M4

  constructor(
    private readonly gl: TSGLContext,
    public pos: M4,
    public readonly onHover?: (part: Part) => void,
    public readonly onStartDragging: () => void,
    public readonly onStopDragging: () => void,
    public readonly onChange: (m: M4) => void,
  ) {
    // this.meshes.vectorShaft = Mesh.rotation(
    //   [V3.O, V3.Y, V3.XY],
    //   L3X,
    //   TAU,
    //   8,
    //   true,
    // )
    // this.meshes.vectorShaft.computeNormalsFromFlatTriangles()
    // this.meshes.vectorShaft.compile()
    // this.meshes.vectorHead = Mesh.rotation(
    //   [V3.Y, V(0, 2, 0), V(2, 0, 0)],
    //   L3X,
    //   TAU,
    //   8,
    //   true,
    // )
    // this.meshes.vectorHead.computeNormalsFromFlatTriangles()
    // this.meshes.vectorHead.compile()
    this.meshes.vector = Mesh.rotation(
      [V(0, 0.04), V(0.8, 0.04), V(0.85, 0.06), V(1, 0)],
      L3X,
      TAU,
      8,
      true,
    )
    this.meshes.vector.computeNormalsFromFlatTriangles()
    this.meshes.vector.compile()
    const rotateBaseVerticesTM = M4.rotateX(-90 * DEG).translate(V3.X)
    this.meshes.rotater = Mesh.rotation(
      arrayRange(0, 9).map((i) =>
        rotateBaseVerticesTM.transformPoint(V3.polar(0.04, -(TAU * i) / 8)),
      ),
      { anchor: V3.O, dir1: V3.Z },
      (9 / 8) * 90 * DEG,
      8,
      false,
    )
    this.meshes.rotater.computeNormalsFromFlatTriangles()
    this.meshes.rotater.compile()
  }

  drawVector(vector: V3, anchor: V3, shader: Shader, size = 1): void {
    if (vector.likeO()) return

    this.gl.pushMatrix()

    const vT = vector.getPerpendicular().unit()
    this.gl.multMatrix(
      M4.forSys(vector.unit(), vT, vector.cross(vT).unit(), anchor),
    )
    shader.draw(this.meshes.vector)
    this.gl.popMatrix()
  }

  render(shader: Shader): void {
    const gl = this.gl
    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.BACK)
    gl.pushMatrix()
    gl.multMatrix(this.pos)
    gl.cullFace(gl.FRONT)

    shader.uniforms({ color: HIGHLIGHT, normalOffset: 0.01 })
    if (this.highlight === X || this.dragging === X)
      this.drawVector(V3.X, V3.O, shader, 0.1)
    if (this.highlight === Y || this.dragging === Y)
      this.drawVector(V3.Y, V3.O, shader, 0.1)
    if (this.highlight === Z || this.dragging === Z)
      this.drawVector(V3.Z, V3.O, shader, 0.1)
    gl.cullFace(gl.BACK)
    shader.uniforms({ normalOffset: 0 })
    this.drawVector(V3.X, V3.O, shader.uniforms({ color: X_RED }), 0.1)
    this.drawVector(V3.Y, V3.O, shader.uniforms({ color: Y_GREEN }), 0.1)
    this.drawVector(V3.Z, V3.O, shader.uniforms({ color: Z_BLUE }), 0.1)

    shader.uniforms({ color: Z_BLUE }).draw(this.meshes.rotater)
    gl.rotate(-90, 0, 1, 0)
    shader.uniforms({ color: X_RED }).draw(this.meshes.rotater)
    gl.rotate(-90, 1, 0, 0)
    shader.uniforms({ color: Y_GREEN }).draw(this.meshes.rotater)
    gl.popMatrix()
  }

  registerListeners(
    mouseMoveTarget: Pick<
      GlobalEventHandlers,
      "addEventListener" | "removeEventListener"
    >,
    getCameraMatrix: () => M4,
  ): () => void {
    this.getCameraMatrix = getCameraMatrix
    this.unregister?.()
    mouseMoveTarget.addEventListener("mousemove", this.mousemove)
    mouseMoveTarget.addEventListener("mousedown", this.mousedown)
    mouseMoveTarget.addEventListener("mouseup", this.mouseup)

    return (this.unregister = () => {
      mouseMoveTarget.removeEventListener("mousemove", this.mousemove)
      mouseMoveTarget.removeEventListener("mousedown", this.mousedown)
      mouseMoveTarget.removeEventListener("mouseup", this.mouseup)
    })
  }

  unregisterListeners(): void {
    this.unregister?.()
  }

  private mousemove = (e: MouseEvent) => {
    const pagePos = V(e.offsetX, e.offsetY)

    const boundingClientRect = (
      e.target as HTMLCanvasElement
    ).getBoundingClientRect()
    boundingClientRect.width
    const mouseLineWC = getMouseLine(
      pagePos,
      boundingClientRect,
      this.getCameraMatrix(),
    )
    if (this.dragging) {
      const dir = [V3.O, V3.X, V3.Y, V3.Z][this.dragging]
      const axis = {
        anchor: this.pos.getTranslation(),
        dir1: this.pos.transformVector(dir).unit(),
      }
      const info = infoClosestToLine(mouseLineWC, axis)
      const offsetWC = this.pos.transformVector(this.offsetGC!)
      const targetPos = info.lineClosest!.minus(offsetWC)
      this.pos = this.pos.translate(this.pos.getTranslation().to(targetPos))
      this.onChange(this.pos)
    } else {
      const gizmoInverse = this.pos.inversed()
      const lineGC = {
        anchor: gizmoInverse.transformPoint(mouseLineWC.anchor),
        dir1: gizmoInverse.transformVector(mouseLineWC.dir1).unit(),
      }
      let lp = undefined

      // eslint-disable-next-line no-inner-declarations
      function measure(l: L3) {
        const info = infoClosestToLine(lineGC, l)
        lp = at(l, clamp(info.lineT, 0, 1))
        const realDistance = lp.distanceTo(info.thClosest!)
        return realDistance
      }

      const lastHighlight = this.highlight
      if (measure(L3X) < 0.1) {
        this.highlight = X
        this.offsetGC = lp
      } else if (measure(L3Y) < 0.1) {
        this.highlight = Y
        this.offsetGC = lp
      } else if (measure(L3Z) < 0.1) {
        this.highlight = Z
        this.offsetGC = lp
      } else {
        this.highlight = NONE
        this.offsetGC = undefined
      }
      if (this.highlight !== lastHighlight) {
        this.onHover?.(this.highlight)
      }
    }
  }

  private mousedown = (e: MouseEvent) => {
    if (this.highlight) {
      this.dragging = this.highlight
      this.onStartDragging()
    }
  }

  private mouseup = (e: MouseEvent) => {
    if (this.dragging) {
      this.dragging = NONE
      this.onStopDragging()
    }
  }

  private unregister?: () => void
}

type L3 = { anchor: V3; dir1: V3 }

export function getMouseLine(
  pos: { x: number; y: number },
  canvas: { width: number; height: number },
  projectionMatrix: M4,
): L3 {
  const ndc1 = V(
    (pos.x * 2) / canvas.width - 1,
    (-pos.y * 2) / canvas.height + 1,
    -1,
  )
  const ndc2 = V(
    (pos.x * 2) / canvas.width - 1,
    (-pos.y * 2) / canvas.height + 1,
    1,
  )
  const inverseProjectionMatrix = projectionMatrix.inversed()
  const anchor = inverseProjectionMatrix.transformPoint(ndc1)
  const dir1 = inverseProjectionMatrix.transformPoint(ndc2).minus(anchor).unit()
  return { anchor, dir1 }
}

function at(l: L3, t: number) {
  return l.anchor.plus(l.dir1.times(t))
}
function infoClosestToLine(
  th: L3,
  line: L3,
): {
  thT: number
  lineT: number
  thClosest?: V3
  lineClosest?: V3
  distance: number
} {
  /*
       line = a + s*b
       this = c + t*d

       (this - line) * b = 0
       (this - line) * d = 0

       (a + s*b - c - t*d) * b = 0
       (a + s*b - c - t*d) * d = 0

       (a - c + s*b - t*d) * b = 0
       (a - c + s*b - t*d) * d = 0

       (a - c)*b + (s*b - t*d)*b = 0
       (a - c)*d + (s*b - t*d)*d = 0

       (a - c)*b + s*(b*b) - t*(d*b) = 0
       (a - c)*d + s*(b*d) - t*(d*d) = 0

       s = (t*(d*b) - (a - c)*b) / (b*b)
       =>
       (a - c)*d + (t*(d*b) - (a - c)*b) / (b*b)*(b*d) - t*(d*d) = 0 | * (b*b)
       (a - c)*d * (b*b) + (t*(d*b) - (a - c)*b)*(b*d) - t*(d*d) * (b*b) = 0
       (a - c)*d * (b*b) + t*(d*b)*(b*d) - (a - c)*b*(b*d) - t*(d*d) * (b*b) = 0
       t = ((a - c)*b*(b*d) - (a - c)*d * (b*b)) / ((d*b)*(b*d) - (d*d) * (b*b))
       */
  if (isParallelToLine(th, line)) {
    return { t: NaN, s: NaN, distance: 10 }
  }
  const a = line.anchor,
    b = line.dir1,
    c = th.anchor,
    d = th.dir1
  const bd = b.dot(d),
    bb = b.squared(),
    dd = d.squared(),
    ca = a.minus(c),
    divisor = bd * bd - dd * bb
  const thT = (ca.dot(b) * bd - ca.dot(d) * bb) / divisor
  const lineT = (ca.dot(b) * dd - ca.dot(d) * bd) / divisor
  return {
    thT,
    lineT,
    thClosest: at(th, thT),
    lineClosest: at(line, lineT),
    distance: at(th, thT).distanceTo(at(line, lineT)),
  }
}

function asSegmentDistanceToLine(
  th: L3,
  line: L3,
  sStart: number,
  sEnd: number,
) {
  const dirCross = th.dir1.cross(line.dir1)
  const div = dirCross.squared()
  if (eq0(div)) {
    return undefined
  } // lines parallel
  const anchorDiff = line.anchor.minus(th.anchor)
  // check if distance is zero (see also L3.distanceToLine)
  if (!eq0(anchorDiff.dot(dirCross.unit()))) {
    return undefined
  }
  let t = infoClosestToLine(th, line).t
  t = clamp(t, sStart, sEnd)
  return at(th, clamp(t, sStart, sEnd))
}

function isParallelToLine(th: L3, line: L3): boolean {
  // we know that 1 == this.dir1.length() == line.dir1.length(), we can check for parallelity simpler than
  // isParallelTo()
  return eq(1, Math.abs(th.dir1.dot(line.dir1)))
}
