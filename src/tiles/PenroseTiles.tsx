import clsx from "clsx"
import last from "lodash/last"
import React, { ReactElement, SVGAttributes } from "react"
import seedrandom from "seedrandom"
import {
  arrayRange,
  clamp,
  DEG,
  GOLDEN_RATIO,
  ilog,
  int,
  M4,
  TAU,
  V,
  V3,
} from "ts3dutils"
import { dTpl, sideWidthFromCenterToSide } from "../paperBox1/common"

const COS18 = Math.cos(18 * DEG)
const SIN18 = Math.sin(18 * DEG)
const COS36 = Math.cos(36 * DEG)
const SIN36 = Math.sin(36 * DEG)

function IrregularPolygon({
  cornersDeg,
  ...props
}: {
  cornersDeg: [radius: number, angleDeg: number][]
}) {
  const [c0r, c0d] = cornersDeg[0]
  const [clr, cld] = last(cornersDeg)!
  const extraPoint = V3.polar(c0r, c0d * DEG).lerp(
    V3.polar(clr, cld * DEG),
    0.5,
  )
  return (
    <path
      {...props}
      style={{ animation: "inherit" }}
      className="c1 s2"
      d={dTpl`M${extraPoint}${cornersDeg.map(
        ([r, angle], i) =>
          (i === 0 ? "L" : "L") + dTpl`${V3.polar(r, angle * DEG)}`,
      )}Z`}
    />
  )
}

export function Penrose({
  x: w,
  y: h,
  randomClassCount,
  ordered,
  a,
  ...props
}: {
  x: number
  y: number
  ordered: boolean
  a: number
  randomClassCount: int
} & SVGAttributes<SVGElement>): ReactElement {
  const sr = seedrandom("X")
  const rx = (x = 0) =>
    "r" + Math.floor(clamp(ordered ? x : sr(), 0, 0.9999) * randomClassCount)
  const s = sideWidthFromCenterToSide(6, a / 20)
  //viewBox="0 0 20 20"
  const r0 = V(0, -SIN18).plus(V3.polar(0.2, (180 - 18) * DEG))
  const r1 = V(0, -SIN18).plus(V3.polar(0.2, 18 * DEG))
  const b0 = V(0, SIN18).plus(V3.polar(0.2, (180 + 18) * DEG))
  const b1 = V(0, SIN18).plus(V3.polar(0.2, -18 * DEG))
  const R0 = V(0, -SIN36).plus(V3.polar(0.2, 36 * DEG))
  const R1 = V(0, SIN36).plus(V3.polar(0.2, -36 * DEG))
  const B0 = V(0, SIN36).plus(V3.polar(0.8, (180 + 36) * DEG))
  const B1 = V(0, -SIN36).plus(V3.polar(0.8, (180 - 36) * DEG))

  const bb = M4.translate(COS36)
    .scale(1 / GOLDEN_RATIO)
    .translate(-COS36)
    .rotateZ(Math.PI)
  const bb2 = M4.rotateZ(-36 * DEG)
    .scale(1 / GOLDEN_RATIO)
    .translate(COS36 / 2, SIN36 / 2)
    .rotateZ(Math.PI)
  const bb3 = M4.translate(0, -SIN18)
    .scale(1 / GOLDEN_RATIO)
    .rotateZ((-90 + 36) * DEG)
    .translate(0, SIN36)
    .rotateZ(Math.PI)

  const bb4 = M4.rotateZ(Math.PI)
    .translate(COS18, 0)
    .scale(1 / GOLDEN_RATIO)
    .rotateZ(-72 * DEG)
    .translate(0, SIN18)
  const bb5 = M4.rotateZ(Math.PI)
    .translate(COS36, 0)
    .scale(1 / GOLDEN_RATIO)
    .rotateZ(-18 * DEG)
    .translate(0, SIN18)

  const tiles = []
  let key = 0

  const visitedThick = new Map()
  const visitedThin = new Map()

  function check(visited: Map<unknown, int>, m: M4) {
    const { x, y } = m.getTranslation()
    if (x < 0 || x > 20 || y < 0 || x > 20) {
      return true
    }
    const hash = (Math.round(x * 100) << 16) + Math.round(y * 100)
    const b = visited.get(hash) || 0

    visited.set(hash, b + 1)
    return b !== 0
  }

  const mToTransform = ({ m }: M4) =>
    `matrix(${m[0]} ${m[4]} ${m[1]} ${m[5]} ${m[3]} ${m[7]} )`

  function addTile(href, m, sclass, visited) {
    const { x, y } = m.getTranslation()
    const hash = (Math.round(x * 100) << 16) + Math.round(y * 100)
    tiles.push({
      id: "id" + key,
      key: key++,
      href: href,
      transform: mToTransform(m),
      className: clsx(rx(), sclass),
      style: { animationDelay: key / 100 + "s" },
      visited,
      hash,
    })
  }

  const targetMatrices = arrayRange(0, 6).map((i) => M4.IDENTITY.copy())

  function subdivideThickHR(m: M4, i = 0) {
    if (0 === i) {
      if (check(visitedThick, m)) return
      addTile("#thick", m, "", visitedThick)
    } else {
      subdivideThickHR(M4.multiply(m, bb, targetMatrices[i]), i - 1)
      subdivideThickHR(M4.multiply(m, bb2, targetMatrices[i]), i - 1)
      subdivideThickHR(M4.multiply(m, bb2.mirrorY(), targetMatrices[i]), i - 1)
      subdivideThinHR(M4.multiply(m, bb3.mirrorY(), targetMatrices[i]), i - 1)
      subdivideThinHR(M4.multiply(m, bb3, targetMatrices[i]), i - 1)
    }
  }

  function subdivideThinHR(m: M4, i = 0) {
    if (0 === i) {
      if (check(visitedThin, m)) return
      addTile("#thin", m, "color1", visitedThin)
    } else {
      subdivideThinHR(M4.multiply(m, bb4, targetMatrices[i]), i - 1)
      subdivideThinHR(M4.multiply(m, bb4.mirroredX(), targetMatrices[i]), i - 1)
      subdivideThickHR(
        M4.multiply(m, bb5.mirroredX(), targetMatrices[i]),
        i - 1,
      )
      subdivideThickHR(M4.multiply(m, bb5, targetMatrices[i]), i - 1)
    }
  }

  // subdivideThinHR(M4.forSys(V(10, 0), V(0, 10), V3.Z, V(10, 10)), 1)
  // subdivideThickHR(M4.forSys(V(10, 0), V(0, 10), V3.Z, V(10, 10)), 5)
  console.time("x")
  for (let i = 0; i < 5; i++) {
    subdivideThickHR(
      M4.translate(COS36, 0)
        .rotateZ((i / 5) * TAU)
        .scale(10)
        .translate(10, 10),
      7,
    )
  }
  console.timeEnd("x")
  console.log("total tiles", tiles.length)

  return (
    <svg className="adrian" {...props}>
      <defs>
        <g
          id="thin"
          style={{ animation: "inherit" }}
          transform={`scale(${1 - (1 - a / 10) * GOLDEN_RATIO})`}
        >
          {!ordered && (
            <IrregularPolygon
              style={{ animation: "inherit" }}
              className="c0 s1"
              cornersDeg={[
                [COS18, 0],
                [SIN18, 90],
                [COS18, 180],
                [SIN18, 270],
              ]}
            />
          )}
          {ordered && (
            <>
              <path
                style={{ animation: "inherit", stroke: "red" }}
                className=""
                d={dTpl`M${r0}A0.2 0.2  0 0 0 ${r1}`}
              />
              <path
                style={{ animation: "inherit", stroke: "blue" }}
                className=""
                d={dTpl`M${b0}A0.2 0.2 0 0 1 ${b1}`}
              />
            </>
          )}
        </g>
        <g
          id="thick"
          style={{ animation: "inherit" }}
          transform={`scale(${a / 10})`}
        >
          {!ordered && (
            <IrregularPolygon
              cornersDeg={[
                [COS36, 0],
                [SIN36, 90],
                [COS36, 180],
                [SIN36, 270],
              ]}
            />
          )}
          {ordered && (
            <>
              <path
                style={{ animation: "inherit", stroke: "red" }}
                className=""
                d={dTpl`M${R0}A0.8 0.8  0 0 0 ${R1}`}
              />
              <path
                style={{ animation: "inherit", stroke: "blue" }}
                className=""
                d={dTpl`M${B0}A0.2 0.2 0 0 0 ${B1}`}
              />
            </>
          )}
        </g>
      </defs>
      {tiles.map(({ visited, hash, style, ...props }) => (
        <use
          style={{
            ...style,
            fillOpacity: Math.sqrt(0.03 * visited.get(hash)),
          }}
          {...props}
        />
      ))}
    </svg>
  )
}
