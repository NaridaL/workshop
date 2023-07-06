import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import * as React from "react"
import { ReactElement, useEffect, useRef } from "react"
import { DEG, M4, mod, PI, V, V3 } from "ts3dutils"
import { lookUpAngle, lookUpRadius } from "../paperBox2/InsideFoldsSvg"

class Circle {
  constructor(public readonly radius: number) {}

  angleForDistance(distance: number) {
    return distance / this.radius
  }

  radiusForAngle(angle: number) {
    return this.radius
  }
}
function _circle(radius: number) {
  return function (x: number) {
    const angle = x / radius
    return [V3.polar(radius, angle), V3.polar(1, angle + PI / 2)]
  }
}
function _squarcle(radius: number, d: number) {
  const alpha = lookUpAngle(radius, 45 * DEG, d)
  const sideLength = alpha * 2 * radius
  console.log(sideLength, alpha / DEG)
  return function (x: number) {
    const quarterCount = Math.floor(x / sideLength)
    let quarterRest = x % sideLength
    if (quarterRest > sideLength / 2) quarterRest -= sideLength
    return [
      // M4.rotateZ(quarterCount * (Math.PI / 2)).transformVector(
      V(d - radius, 0).plus(V3.polar(radius, quarterRest / radius)),
      // ),
    ]
  }
}

class Squarcle {
  constructor(
    /**
     * side of the side curvature
     */
    public readonly radius: number,
    /**
     * Distance center to closest point on side
     */
    public readonly d: number,
  ) {}

  sideLength() {
    const alpha = lookUpAngle(this.radius, 45 * DEG, this.d)
    return alpha * 2 * this.radius
  }

  angleForDistance(distance: number) {
    const sideLength = this.sideLength()
    const quarterCount = Math.floor(distance / sideLength)
    let quarterRest = distance % sideLength
    if (quarterRest > sideLength / 2) quarterRest -= sideLength
    const alpha = quarterRest / this.radius

    return (quarterCount * PI) / 2 + alpha
  }

  radiusForAngle(angle: number) {
    angle = angle % (PI / 2)
    if (angle > PI / 4) angle = angle - PI / 2
    return lookUpRadius(angle, 45 * DEG, this.d)
  }
}

// const shape = new Circle(1 / 3.14)
const shape = new Squarcle(0.5, 0.4)
// const _shape = _circle(2)
const _shape = _squarcle(2, 1.8)

function line(s: number) {
  const outerRadius = 1.5
  const shapeAngle = shape.angleForDistance(s * outerRadius)
  const shapeRadius = shape.radiusForAngle(s / outerRadius)
  const shapeCenter = V3.polar(outerRadius - shapeRadius, s)
  return [
    //
    // V3.polar(outerRadius, Math.min(s, TAU)),
    // shapeCenter,
    _shape(s)[0],
    // V3.polar(shapeRadius, shapeAngle),
    // shapeCenter.plus(V3.polar(0.2, shapeAngle)),
    shapeCenter.plus(V3.polar(-0.2, shapeAngle)),
    // shapeCenter.plus(V3.polar(0.2, innerCircleAngle)),
    // shapeCenter.plus(V3.polar(0.4, innerCircleAngle + TAU / 3)),
    // shapeCenter.plus(V3.polar(0.4, innerCircleAngle + (2 * TAU) / 3)),
  ]
}

function startAnim(context: CanvasRenderingContext2D, colors: string[]) {
  // context.rect(100, 100, 100, 100)
  context.lineWidth = 0.005
  const scale = Math.min(context.canvas.width, context.canvas.height)
  context.scale(scale, scale)
  context.translate(0.5, 0.5)
  context.scale(0.25, 0.25)
  let lastTime = 0
  let stop = false
  const lastPoints = line(0)

  function paint(highResTimeStamp: number) {
    for (; lastTime < highResTimeStamp; lastTime += 1) {
      const s = lastTime / 1000.0
      const newPoints = line(s)

      for (let i = 0; i < lastPoints.length; i++) {
        const newPoint = newPoints[i]
        const lastPoint = lastPoints[i]
        if (lastPoint.distanceTo(newPoint) > 0.0001) {
          context.beginPath()
          context.strokeStyle = colors[i]
          context.moveTo(lastPoint.x, lastPoint.y)
          context.lineTo(newPoint.x, newPoint.y)
          context.stroke()
          lastPoints[i] = newPoint
        }
      }
    }
    !stop && requestAnimationFrame(paint)
  }

  requestAnimationFrame(paint)
  return () => {
    stop = true
  }
}

export default function (): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const theme = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current!
    canvas.height = devicePixelRatio * canvas.offsetHeight
    canvas.width = devicePixelRatio * canvas.offsetWidth
    const context = canvas.getContext("2d")!
    return startAnim(context, [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      "red",
      "blue",
      "black",
    ])
  }, [theme.palette])
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid item xs={12}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </Grid>
    </Grid>
  )
}
