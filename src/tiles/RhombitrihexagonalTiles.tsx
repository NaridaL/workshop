import clsx from "clsx"
import React, { ReactElement, SVGAttributes } from "react"
import seedrandom from "seedrandom"
import { arrayRange, clamp, DEG, ilog, int } from "ts3dutils"
import { radiusFromCenterToSide } from "../paperBox1/common"
import { RegularPolygon } from "./RegularPolygon"

export function Rhombitrihexagonal({
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
  //viewBox="0 0 20 20"
  const r = a / 10
  const tan45 = Math.tan(45 * DEG)
  const tan30 = Math.tan(30 * DEG)
  const baseSideLength = 2 * ((tan30 * tan45) / (tan30 + tan45))
  const s = (baseSideLength * a) / 10
  const triTranslate = radiusFromCenterToSide(6, 1)
  return (
    <svg className="adrian" {...props}>
      {arrayRange(0, w).flatMap((i) =>
        arrayRange(0, h).flatMap((j) => {
          const xx = (x: number, y: number) => {
            const v1 = y * 0.86666
            const u1 = x + y / 2
            //return x + " " + y
            return [u1, v1]
          }
          const u = i - Math.floor(j / 2)
          const v = j
          const w = 0 - u - v
          const [x, y] = xx(u * 2, v * 2)
          return [
            <RegularPolygon
              key={`hex-${x}-${y}-l`}
              sides={6}
              sideLength={s}
              transform={`translate(${x} ${y}) rotate(30)`}
              className={clsx(
                rx(
                  Math.max(
                    Math.abs(u - 5),
                    Math.abs(v - 10),
                    Math.abs(0 - (u - 5) - (v - 10)),
                  ) / 15,
                ),
                "c0",
              )}
            />,
            <RegularPolygon
              key={`sqr0-${x}-${y}-l`}
              sides={4}
              sideLength={s}
              transform={`translate(${x + 1} ${y}) rotate(45)`}
              className={clsx(rx(), "c1", "s0")}
            />,
            <RegularPolygon
              key={`sqr1-${x}-${y}-l`}
              sides={4}
              sideLength={s}
              transform={`translate(${x} ${y}) rotate(60) translate(1 0) rotate(45)`}
              className={clsx(rx(), "c1", "s0")}
            />,
            <RegularPolygon
              key={`sqr2-${x}-${y}-l`}
              sides={4}
              sideLength={s}
              transform={`translate(${x} ${y}) rotate(120) translate(1 0) rotate(45)`}
              className={clsx(rx(), "c1", "s0")}
            />,
            <RegularPolygon
              key={`tri0-${x}-${y}-l`}
              sides={3}
              sideLength={s}
              transform={`translate(${x} ${y}) rotate(30) translate(${triTranslate} 0) rotate(60)`}
              className={clsx(rx(), "c2", "s1")}
            />,
            <RegularPolygon
              key={`tri1-${x}-${y}-l`}
              sides={3}
              sideLength={s}
              transform={`translate(${x} ${y}) rotate(90) translate(${triTranslate} 0) rotate(60)`}
              className={clsx(rx(), "c2", "s1")}
            />,
          ]
        }),
      )}
    </svg>
  )
}
