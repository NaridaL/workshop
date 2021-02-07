import Grid from "@material-ui/core/Grid"
import { useTheme } from "@material-ui/core/styles"
import * as React from "react"
import { ReactElement, useEffect, useRef } from "react"
import { DEG, PI, V3 } from "ts3dutils"
import { lookUpAngle } from "../paperBox2/InsideFolds"

class Circle {
  constructor(public readonly radius: number) {}

  angleForDistance(distance: number) {
    return distance / this.radius
  }

  radiusForAngle(angle: number) {
    return this.radius
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
}

// const shape = new Circle(1 / 3.14)
const shape = new Squarcle(0.5, 0.4)

function line(s: number) {
  const outerRadius = 1.5
  const shapeAngle = shape.angleForDistance(s * outerRadius)
  const shapeRadius = shape.radiusForAngle(s * outerRadius)
  const shapeCenter = V3.polar(outerRadius - shapeRadius, s)
  return [
    //
    // V3.polar(outerRadius, Math.min(s, TAU)),
    // shapeCenter,
    shapeCenter.plus(V3.polar(0.2, shapeAngle)),
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
      const s = lastTime / 100.0
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
