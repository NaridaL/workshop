import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { ReactElement, useCallback, useEffect, useRef } from "react"
import { SVGPathData } from "svg-pathdata"
import { SVGCommand } from "svg-pathdata/lib/types"
import { DEG, M4, V3 } from "ts3dutils"
import { useHashState } from "../common/useHashState"
import { INCH } from "../paperBox1/common"
import { ExportButtons } from "../paperBox1/ExportButtons"
import * as path from "../paperBox1/svg"
import { SvgCommonDefs } from "../paperBox1/SvgCommonDefs"
import { OrbitCameraController } from "../raymarch/OrbitCameraController"

function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b)
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

export default (): ReactElement => {
  const [state, setState] = useHashState({
    R: 100,
    r: 10,
    d: 20,
    cam: OrbitCameraController.toShortString([0.1, 0.1, 400]),
  })
  const setPartialState = useCallback(
    (update: Partial<typeof state>) => setState((s) => ({ ...s, ...update })),
    [setState],
  )

  const lookAt = OrbitCameraController.getLookAt(
    OrbitCameraController.fromShortString(state.cam),
  )
  const svgRef = useRef<SVGSVGElement>()
  useEffect(() => {
    const camController = new OrbitCameraController((v) =>
      setPartialState({ cam: OrbitCameraController.toShortString(v) }),
    )
    camController.setState(OrbitCameraController.fromShortString(state.cam))
    camController.registerListeners(svgRef.current!)
    let cancel = false
    function tick() {
      camController!.tick()
      if (!cancel) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    return () => {
      cancel = true
      camController?.unregisterListeners()
    }
  }, [setPartialState, state.cam])

  const torusSpiral = (R: number, r: number, n: number) => (a: number) => {
    const a1 = a / n
    const a2 = a
    const xyP = V3.polar(r, a2)
    return [
      M4.translate(R).rotateY(a1).transformPoint(xyP),
      M4.rotateY(a1).transformVector(V3.polar(1, a2)),
    ]
  }

  // gl.perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000)
  // gl.lookAt(, V3.O, V3.Y)
  // const perspective = M4.lookAt(V(0, 0.5, 2.2), V3.O, V3.Y)

  function AxesGizmoSvg({ mat }: { mat: M4 }) {
    const O = mat.transformPoint(V3.O)
    const X = mat.transformPoint(V3.X)
    const Y = mat.transformPoint(V3.Y)
    const Z = mat.transformPoint(V3.Z)
    return (
      <>
        <line x1={O.x} y1={O.y} x2={X.x} y2={X.y} style={{ stroke: "red" }} />
        <line x1={O.x} y1={O.y} x2={Y.x} y2={Y.y} style={{ stroke: "green" }} />
        <line x1={O.x} y1={O.y} x2={Z.x} y2={Z.y} style={{ stroke: "blue" }} />
      </>
    )
  }

  const theme = useTheme()
  const R = state.R
  const r = state.r
  const d = state.d
  const perspective = lookAt
    .transform(M4.perspective(90, 1, 10, 1000))
    .scale(200, -200, 1)
  const normalMatrix = perspective.inversed().transposed().normalized2()
  console.log("normalMatrix", normalMatrix.toString())
  // const foos: SVGCommand[] = [path.M(R + r - d, 0)]
  // const N = lcm(R, r) / R
  // for (let i = 0; i < t % (N * 360); i++) {
  //   const angle = i * DEG
  //   const p = V3.polar(R + r, angle).minus(V3.polar(d, (angle * (R + r)) / r))
  //   foos.push(path.L(p.x, p.y))
  // }
  // const aaa = t * DEG
  // const oc = V3.polar(R + r, aaa)
  // const p = V3.polar(R + r, aaa).minus(V3.polar(d, (aaa * (R + r)) / r))

  const ts = torusSpiral(R, r, 60)
  const foos: SVGCommand[] = [path.M(R + r - d, 0)]
  const norms: SVGCommand[] = [path.M(R + r - d, 0)]
  for (let i = 0; i < 360 * 60 * DEG; i += 10 * DEG) {
    const angle = i
    const [tsp, tsn] = ts(angle)
    const p = perspective.transformPoint(tsp)
    const eps = 1e-4
    const dp = perspective
      .transformPoint(ts(angle + eps)[0])
      .minus(p)
      .div(eps)
      .times(d / 100)
    const pMinusDp = p.minus(dp)
    const transformedNormal = normalMatrix.transformVector(tsn, false)
    const transformedNormal2 = transformedNormal.xy().toLength(10)
    // norms.push(
    //   path.M(p.x, p.y),
    //   path.l(transformedNormal2.x, transformedNormal2.y),
    // )
    // norms.push(path.M(p.x, p.y), path.L(pMinusDp.x, pMinusDp.y))
    if (transformedNormal.z <= 0) {
      // foos.push(path.S(pMinusDp.x, pMinusDp.y, p.x, p.y))
      foos.push(path.L(p.x, p.y))
    } else {
      foos.push(path.M(p.x, p.y))
    }
  }

  const what = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      className="adrian"
      width={"512"}
      height={"512"}
      style={{
        fill: "none",
        stroke: "#123456",
        strokeWidth: (2 * INCH) / 300,
        width: "100%",
        height: "100%",
      }}
      viewBox="-256 -256 512 512"
    >
      <SvgCommonDefs />
      <AxesGizmoSvg mat={perspective.scale(25)} />
      {/*<rect width={100} height={100} />*/}
      <path
        d={new SVGPathData(foos).encode()}
        className="cut"
        style={{ fill: "none" }}
      />
      <path
        d={new SVGPathData(norms).encode()}
        className="cut"
        style={{ fill: "green", stroke: "green" }}
      />
      {/*<circle r={R} style={{ fill: "none", stroke: "red" }} />*/}
      {/*<circle*/}
      {/*  cx={oc.x}*/}
      {/*  cy={oc.y}*/}
      {/*  r={r}*/}
      {/*  style={{ fill: "none", stroke: "orange" }}*/}
      {/*/>*/}
      {/*<Measure from={[0, 0]} to={[R, 0]} />*/}
      {/*<Measure from={oc} to={p} />*/}
    </svg>
  )

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid size={{ xs: 12, md: 10 }}>{what}</Grid>
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
        <TextField
          label="R"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 25, step: 1 }}
          value={state.R}
          onChange={(e) => setPartialState({ R: +e.target.value })}
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: -100, step: 1 }}
          value={state.r}
          onChange={(e) => setPartialState({ r: +e.target.value })}
          label="r"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          value={state.d}
          onChange={(e) => setPartialState({ d: +e.target.value })}
          label="d"
        />
        <Divider />
        <ExportButtons what={what} baseFileName="donut" />
        {/*{N} {N * 360}*/}
      </Grid>
    </Grid>
  )
}
