import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import * as React from "react"
import { ReactElement, useCallback, useEffect, useRef, useState } from "react"
import { DEG, M4, mod, PI, V, V3 } from "ts3dutils"
import { BoundNumberField } from "../common/BoundNumberField"
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

/**
 * @param t 0 .. 2PI
 */
type ShapeFunc = (t: number) => [x: V3, dx: V3]

function _circle(radius: number): ShapeFunc {
  return function (x: number) {
    const angle = x / radius
    return [V3.polar(radius, angle), V3.polar(1, angle + PI / 2)]
  }
}

function _squarcle(radius: number, d: number): ShapeFunc {
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

function wavyCircle(
  radius: number,
  waveCount: number,
  waveHeight: number,
): ShapeFunc {
  return function (t: number) {
    const angle = t / radius
    const angle_dt = 1 / radius
    const wave = Math.sin(angle * waveCount) * waveHeight
    const wave_dt =
      Math.cos(angle * waveCount) * waveHeight * angle_dt * waveCount
    return [
      V3.polar(radius + wave, angle),
      V3.polar(wave_dt, angle).plus(V3.polar(radius + wave, angle + PI / 2)),
    ]

    ///new V3(radius * Math.cos(phi), radius * Math.sin(phi), z)
    // x = r(t) cos(t)
    // y = r(t) sin(t)
    // dx/dt = r' cos(t) - r sin(t)
    // dy/dt = r' sin(t) + r cos(t)
  }
}

function _polygon(
  sides: number,
  radius: number,
  cornerRadius: number,
): ShapeFunc {
  const anglePerSide = (2 * PI) / sides
  const sideLength = 2 * Math.sin(anglePerSide / 2) * (1 - cornerRadius)
  const h2 = Math.tan(anglePerSide / 2) * (radius - cornerRadius)
  const tCornerStart = Math.atan(h2 / radius)
  const tCornerEnd = anglePerSide - tCornerStart
  const cornerCenter = V(radius - cornerRadius, h2, 0)
  const cornerXFactor = (anglePerSide / 2 - tCornerStart) / (PI / anglePerSide)
  return function (xOriginal: number) {
    let t = xOriginal
    // Mirror about t axis
    // if (t > PI) {
    //   t = 2 * PI - t
    // }
    // Which side are we on
    // if (t > anglePerSide)
    //   t -= anglePerSide
    t = mod(t, anglePerSide)
    if (t > tCornerEnd) t -= anglePerSide
    const rot = M4.rotateZ(xOriginal - t)
    let pos: V3, dir: V3
    if (t < tCornerStart) {
      pos = V(radius, radius * Math.tan(t), 0)
      dir = V(0, radius, 0)
    } else {
      const tCorner01 = (t - tCornerStart) / (tCornerEnd - tCornerStart)
      pos = cornerCenter.plus(V3.polar(cornerRadius, tCorner01 * anglePerSide))
      dir = V3.polar(1, tCorner01 * anglePerSide + PI / 2)
    }
    return [rot.transformPoint(pos), rot.transformVector(dir)]
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

const line2 = (s: number) => {
  const outerRadius = 1.5
  const shapeAngle = shape.angleForDistance(s * outerRadius)
  const shapeRadius = shape.radiusForAngle(s / outerRadius)
  const shapeCenter = V3.polar(outerRadius - shapeRadius, s)
  return [
    //
    // V3.polar(outerRadius, Math.min(s, TAU)),
    // shapeCenter,
    shape(s)[0],
    // V3.polar(shapeRadius, shapeAngle),
    // shapeCenter.plus(V3.polar(0.2, shapeAngle)),
    shapeCenter.plus(V3.polar(-0.2, shapeAngle)),
    // shapeCenter.plus(V3.polar(0.2, innerCircleAngle)),
    // shapeCenter.plus(V3.polar(0.4, innerCircleAngle + TAU / 3)),
    // shapeCenter.plus(V3.polar(0.4, innerCircleAngle + (2 * TAU) / 3)),
  ]
}

function getShapePoints(shape: (t: number) => [V3, V3], d: number): [V3, V3][] {
  const points: [V3, V3][] = []
  for (let i = 0; i < d; i++) {
    const t = (i * 2 * PI) / d
    points.push(shape(t))
  }
  return points
}

// const shape = _circle(1 / 3.14)
// const shape = new Squarcle(0.5, 0.4)
// const _shape = _circle(2)
// const shape = _squarcle(2, 1.8)
function paintAxes(context: CanvasRenderingContext2D) {
  context.beginPath()
  context.strokeStyle = "black"
  context.lineWidth = 0.01
  context.moveTo(-1, 0)
  context.lineTo(1, 0)
  context.moveTo(0, -1)
  context.lineTo(0, 1)
  context.stroke()
}

let d = 10

function startAnim(
  context: CanvasRenderingContext2D,
  colors: string[],
  shape: ShapeFunc,
) {
  console.log("startAnum", colors, context)
  // context.rect(100, 100, 100, 100)
  context.lineWidth = 0.005
  context.fillStyle = "white"
  context.rect(0, 0, context.canvas.width, context.canvas.height)
  context.fill()
  const scale = Math.min(context.canvas.width, context.canvas.height)
  context.scale(scale, scale)
  context.translate(0.5, 0.5)
  context.scale(0.25, 0.25)
  let lastTime = 0
  let stop = false
  const ps = getShapePoints(shape, 500)

  function paint(highResTimeStamp: number) {
    context.fillStyle = "white"
    context.rect(-10, -10, 20, 20)
    context.fill()
    lastTime ||= highResTimeStamp
    paintAxes(context)
    context.beginPath()
    context.moveTo(ps[0][0].x, ps[0][0].y)
    context.strokeStyle = "red"
    for (let i = 0; i < (ps.length * d) / 100; i++) {
      const [x] = ps[i]
      context.lineTo(x.x, x.y)
    }
    context.stroke()
    context.beginPath()
    context.lineWidth = 0.004
    context.strokeStyle = "pink"
    for (let i = 0; i < (ps.length * d) / 100; i += 4) {
      const [x, dx] = ps[i]
      context.moveTo(x.x, x.y)
      context.lineTo(x.x + 0.1 * dx.y, x.y - 0.1 * dx.x)
    }
    context.stroke()
    // for (; lastTime < highResTimeStamp; lastTime += 1) {
    //   const s = lastTime / 1000.0
    //   const newPoints = _shape(s)
    //
    //   for (let i = 0; i < lastPoints.length; i++) {
    //     const newPoint = newPoints[i]
    //     const lastPoint = lastPoints[i]
    //     if (lastPoint.distanceTo(newPoint) > 0.0001) {
    //       context.beginPath()
    //       context.strokeStyle = colors[i]
    //       // context.moveTo(lastPoint.x, lastPoint.y)
    //       context.lineTo(newPoint.x, newPoint.y)
    //       context.stroke()
    //       lastPoints[i] = newPoint
    //     }
    //   }
    // }
    !stop && requestAnimationFrame(paint)
  }

  requestAnimationFrame(paint)
  return () => {
    stop = true
    console.log("stop")
  }
}

export default function (): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState({ d: 100, polygonSides: 4, reset: false })
  const setStatePartial = useCallback(
    (o) => setState((s) => ({ ...s, ...o })),
    [setState],
  )

  const reset = useCallback(() => {
    setState((s) => ({ ...s, reset: !s.reset }))
  }, [])

  useEffect(() => {
    d = state.d
  }, [state.d])

  const theme = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current!
    canvas.height = devicePixelRatio * canvas.offsetHeight
    canvas.width = devicePixelRatio * canvas.offsetWidth
    const context = canvas.getContext("2d")!
    return startAnim(
      context,
      [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        "red",
        "blue",
        "black",
      ],
      // _polygon(state.polygonSides, 1, 0.5),
      wavyCircle(1, 5, 0.2),
    )
  }, [theme.palette, state.reset, state.polygonSides])
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid size={{ xs: 12, md: 10 }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </Grid>
      <Grid></Grid>
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 2,
          alignItems: "stretch",
          // "& > *": { margin: 1 },
          gap: 2,
        }}
      >
        <Card>
          <CardMedia
            image={""}
            title="Contemplative Reptile"
            sx={{
              height: 0,
              paddingTop: "100%", // 1:1
            }}
          />
        </Card>
        <BoundNumberField
          state={state}
          prop="d"
          setStatePartial={setStatePartial}
          inputProps={{ min: 0, step: 1, type: "number", max: 100 }}
        />
        <BoundNumberField
          state={state}
          prop="polygonSides"
          setStatePartial={setStatePartial}
          inputProps={{ min: 3, step: 1, type: "number" }}
        />
        <Button onClick={reset}>Reset</Button>
      </Grid>
    </Grid>
  )
}
