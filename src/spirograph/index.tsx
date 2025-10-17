import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Slider from "@mui/material/Slider"
import { useTheme } from "@mui/material/styles"
import { AxisItemIdentifier } from "@mui/x-charts"
import { LineChart, LineSeries } from "@mui/x-charts/LineChart"
import * as React from "react"
import { ReactElement, useCallback, useEffect, useRef, useState } from "react"
import { DEG, int, M4, mod, PI, round10, V, V3 } from "ts3dutils"
import { gcd } from "../common"
import { BoundNumberField } from "../common/BoundNumberField"
import { lookUpAngle, lookUpRadius } from "../paperBox2/InsideFoldsSvg"

abstract class SpirographShape {
  public points: [V3, V3][] = []

  public get teeth(): number {
    return Math.round(this.tMax / this.tStep)
  }

  protected constructor(
    private readonly f: ShapeFunc,
    public readonly tMax: number,
    public readonly tStep: number,
    public pen: V3 | undefined,
  ) {
    this.cachePoints(this.tStep)
  }

  public paint(context: CanvasRenderingContext2D) {
    // context.ellipse(0, 0, this.radius, this.radius, 0, 0, 2 * Math.PI)
    context.moveTo(this.points[0][0].x, this.points[0][0].y)
    for (let i = 0; i < this.points.length; i++) {
      const [p, dp] = this.points[i]
      const p2 = p.plus(dp.times(0.1))
      context.moveTo(p.x, p.y)
      context.lineTo(p2.x, p2.y)
    }
    if (this.pen) {
      context.moveTo(this.pen.x + 0.02, this.pen.y)
      context.ellipse(this.pen.x, this.pen.y, 0.02, 0.02, 0, 0, 2 * Math.PI)
    }
  }

  at(t: number): [V3, V3] {
    return this.f(t)
  }

  protected cachePoints(tStep: number) {
    this.points = getShapePoints2(this.f, this.tMax, tStep)
    console.log(
      "Cached points error",
      this.points[this.points.length - 1][0].distanceTo(this.points[0][0]) -
        tStep,
      this.points.length,
      this.tMax / tStep,
    )
  }

  transformAt(step: int, base: CircleShape): M4 {
    const [pBase, dpBase] = base.points[step % base.points.length]
    const [p, dp] = this.points[step % this.points.length]
    // Transform this so that (1,0) is aligned with dp
    const t = M4.translate(p.negated()).rotateZ(-dp.angleXY())
    return t.rotateZ(dpBase.angleXY()).translate(pBase)
  }

  penAt(step: int, base: CircleShape): V3 {
    if (!this.pen) throw new Error("No pen")
    return this.transformAt(step, base).transformPoint(this.pen)
  }
}
class CircleShape extends SpirographShape {
  constructor(
    public readonly radius: number,
    public readonly tStep: number,
    public pen: V3 | undefined,
  ) {
    super(circle(radius), 2 * PI * radius, tStep, pen)
  }
}
class PolygonShape extends SpirographShape {
  constructor(
    public readonly sides: number,
    public readonly radius: number,
    public readonly cornerRadius: number,
    public readonly tStep: number,
    public pen: V3 | undefined,
  ) {
    const anglePerSide = (2 * PI) / sides
    const sideLength = 2 * Math.sin(anglePerSide / 2) * (1 - cornerRadius)
    const h2 = Math.tan(anglePerSide / 2) * (radius - cornerRadius)
    super(polygon(sides, radius, cornerRadius), 2 * PI, tStep, pen)
    this.cachePoints(tStep)
  }

  circumference(): number {
    const anglePerSide = (2 * PI) / this.sides
    const sideLength = 2 * Math.sin(anglePerSide / 2) * (1 - this.cornerRadius)
    const h2 = Math.tan(anglePerSide / 2) * (this.radius - this.cornerRadius)
    return this.sides * (sideLength + this.cornerRadius * anglePerSide)
  }
}

/**
 * @param t 0 .. 2PI
 */
type ShapeFunc = (t: number) => [x: V3, dx: V3]

function circle(radius: number): ShapeFunc {
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
    const angle = t / radius // + Math.cos((t / radius) * waveCount) * 0.05
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

function polygon(
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

function getShapePoints2(
  shape: (t: number) => [V3, V3],
  tMax: number,
  tStep: number,
): [V3, V3][] {
  const points: [V3, V3][] = []
  points.push(shape(0))
  let t = 0,
    i = 0
  const tMaxAdjusted = tMax - 1.5 * tStep
  while (t < tMaxAdjusted) {
    const dp = points[i][1]
    const dt = tStep / dp.length()
    t += dt
    points.push(shape(t))
    i++
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

function startAnim(
  context: CanvasRenderingContext2D,
  colors: { primary: string; secondary: string; background: string },
  shape: ShapeFunc,
  initState: {
    penRadius: number
    penPhi: number
    baseTeeth: number
    gearTeeth: number
  },
  state: { dataIndex: number; d01: number },
) {
  const { penRadius, penPhi, baseTeeth, gearTeeth } = initState
  // context.rect(100, 100, 100, 100)
  context.lineWidth = 0.005
  context.fillStyle = colors.background
  context.rect(0, 0, context.canvas.width, context.canvas.height)
  context.fill()
  const scale = Math.min(context.canvas.width, context.canvas.height)
  context.scale(scale, scale)
  context.translate(0.5, 0.5)
  context.scale(0.5, 0.5)
  let lastTime = 0
  let stop = false
  const tStep = 0.05
  const ps = getShapePoints(shape, 500)
  // const base = new CircleShape((baseTeeth * tStep) / PI / 2, tStep, undefined)
  const base = new PolygonShape(3, 0.6, 0.2, tStep, undefined)
  const gear = new CircleShape(
    (gearTeeth * tStep) / PI / 2,
    tStep,
    V3.polar(penRadius, penPhi),
  )
  const totalTeeth = (gear.teeth * base.teeth) / gcd(gear.teeth, base.teeth)

  function paint(highResTimeStamp: number) {
    const { dataIndex, d01 } = state
    const step = (d01 * totalTeeth) | 0
    const tt = gear.transformAt(step, base)
    context.fillStyle = colors.background
    context.rect(-10, -10, 20, 20)
    context.fill()
    lastTime ||= highResTimeStamp
    paintAxes(context)
    context.beginPath()
    base.paint(context)
    context.strokeStyle = colors.secondary
    context.lineWidth = 0.005
    context.stroke()
    context.save()
    contextTransform(context, tt)
    gear.paint(context)
    context.strokeStyle = colors.secondary
    context.stroke()
    context.restore()
    context.beginPath()
    context.moveTo(ps[0][0].x, ps[0][0].y)
    context.strokeStyle = colors.primary
    for (let i = 0; i < step; i++) {
      const x = gear.penAt(i, base)
      context.lineTo(x.x, x.y)
    }
    context.stroke()
    // context.beginPath()
    // context.lineWidth = 0.004
    // context.strokeStyle = "pink"
    // for (let i = 0; i < (ps.length * d) / 100; i += 4) {
    //   const [x, dx] = ps[i]
    //   context.moveTo(x.x, x.y)
    //   context.lineTo(x.x + 0.1 * dx.y, x.y - 0.1 * dx.x)
    // }
    // context.stroke()
    const dataPoint = ps[((ps.length * dataIndex) / 100) | 0][0]
    context.beginPath()
    context.ellipse(dataPoint.x, dataPoint.y, 0.02, 0.02, 0, 0, 2 * Math.PI)
    context.fillStyle = "blue"
    context.fill()
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
  }
}

export default function (): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState({
    d01: 0.2,
    polygonSides: 4,
    reset: false,
    shapeIndex: 1,
    dataIndex: 0,
    penPhi: 0,
    penRadius: 0.3,
    baseTeeth: 126,
    gearTeeth: 50,
  })
  const setStatePartial = useCallback(
    (o: Partial<typeof state>) => setState((s) => ({ ...s, ...o })),
    [setState],
  )
  const animState = useRef<typeof state>(state)
  const [series, setSeries] = useState([{ data: [] }] as LineSeries[])

  const reset = useCallback(() => {
    setState((s) => ({ ...s, reset: !s.reset }))
  }, [])

  const onHighlightChange = useCallback(
    (axisItems: AxisItemIdentifier[]) => {
      setStatePartial({ dataIndex: axisItems[0]?.dataIndex ?? 0 })
    },
    [setStatePartial],
  )

  const sliderOnChange = useCallback(
    (_: Event, newValue: number) => {
      setStatePartial({ d01: newValue })
      animState.current.d01 = newValue
    },
    [setStatePartial],
  )

  const theme = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current!
    // console.log(
    //   canvas.offsetWidth,
    //   canvas.offsetHeight,
    //   canvas.height,
    //   canvas.width,
    //   devicePixelRatio,
    // )
    canvas.height = devicePixelRatio * canvas.offsetHeight
    canvas.width = devicePixelRatio * canvas.offsetWidth
    const context = canvas.getContext("2d")!

    const shape = [
      polygon(state.polygonSides, 0.6, 0.2),
      wavyCircle(1, state.polygonSides, 0.2),
    ][state.shapeIndex]
    // const shape =
    const pCount = 100
    const shapePoints = getShapePoints(shape, pCount)
    const dt = (Math.PI * 2) / pCount
    const totalLengths: number[] = []
    const totalLength = 0
    for (let i = 0; i < shapePoints.length; i++) {
      if (i === 0) {
        totalLengths.push(0)
      } else {
        totalLengths.push(
          round10(
            totalLengths[i - 1] +
              shapePoints[i][0].minus(shapePoints[i - 1][0]).length(),
            -2,
          ),
        )
      }
    }
    setSeries([
      {
        label: "dx.length",
        data: shapePoints.map((p) => round10(p[1].length(), -2)),
        showMark: false,
      },
      {
        label: "dx_empirical.length",
        data: shapePoints.map((p, i) =>
          round10(
            shapePoints[(i + 1) % shapePoints.length][0].minus(p[0]).length() /
              dt,
            -2,
          ),
        ),
        showMark: false,
      },
      {
        label: "dx_total",
        data: totalLengths,
        showMark: false,
      },
    ])
    return startAnim(
      context,
      {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        background: theme.palette.background.default,
      },
      shape,
      {
        penRadius: state.penRadius,
        penPhi: state.penPhi,
        baseTeeth: state.baseTeeth,
        gearTeeth: state.gearTeeth,
      },
      animState.current,
    )
  }, [
    theme.palette,
    state.reset,
    state.polygonSides,
    animState,
    state.shapeIndex,
    state.penRadius,
    state.penPhi,
    state.baseTeeth,
    state.gearTeeth,
  ])
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid size={{ xs: 12, md: 10 }} height="80%">
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </Grid>
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
          {/*<CardMedia*/}
          {/*  image={""}*/}
          {/*  title="Contemplative Reptile"*/}
          {/*  sx={{*/}
          {/*    height: 0,*/}
          {/*    paddingTop: "100%", // 1:1*/}
          {/*  }}*/}
          {/*/>*/}
        </Card>
        <BoundNumberField
          state={state}
          prop="d01"
          setStatePartial={setStatePartial}
          slotProps={{
            htmlInput: { min: 0, step: 1, type: "number", max: 100 },
          }}
        />
        <BoundNumberField
          state={state}
          prop="polygonSides"
          setStatePartial={setStatePartial}
          slotProps={{ htmlInput: { min: 2, step: 1, type: "number" } }}
        />
        <BoundNumberField
          state={state}
          prop="shapeIndex"
          setStatePartial={setStatePartial}
          slotProps={{ htmlInput: { min: 0, step: 1, type: "number", max: 2 } }}
        />
        <BoundNumberField
          state={state}
          prop="penPhi"
          setStatePartial={setStatePartial}
          slotProps={{
            htmlInput: { min: 0, step: 0.1, type: "number", max: 6.28 },
          }}
        />
        <BoundNumberField
          state={state}
          prop="penRadius"
          setStatePartial={setStatePartial}
          slotProps={{
            htmlInput: { min: 0, step: 0.05, type: "number", max: 1 },
          }}
        />
        <BoundNumberField
          state={state}
          prop="baseTeeth"
          setStatePartial={setStatePartial}
          slotProps={{
            htmlInput: { min: 0, ype: "number", max: 200 },
          }}
        />
        <BoundNumberField
          state={state}
          prop="gearTeeth"
          setStatePartial={setStatePartial}
          slotProps={{
            htmlInput: { min: 0, type: "number", max: 200 },
          }}
        />
        <Button onClick={reset}>Reset</Button>
      </Grid>
      <Grid size={{ xs: 12, md: 10 }} sx={{ height: 200 }}>
        <Slider
          min={0}
          max={1}
          step={0.0001}
          value={state.d01}
          onChange={sliderOnChange}
        ></Slider>
        <LineChart
          series={series}
          onHighlightedAxisChange={onHighlightChange}
          height={400}
          yAxis={[
            {
              domainLimit: (min, max) => ({ min: 0, max }),
            },
          ]}
        />
      </Grid>
    </Grid>
  )
}

function contextTransform(context: CanvasRenderingContext2D, mat: M4) {
  // context.transform(m.m[0], m.m[1], m.m[3], m.m[4], m.m[5], m.m[7])
  context.transform(mat.m[0], mat.m[4], mat.m[1], mat.m[5], mat.m[3], mat.m[7])
}
