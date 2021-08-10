import clsx from "clsx"
import React, { ReactElement, SVGAttributes } from "react"
import seedrandom from "seedrandom"
import { arrayRange, DEG, int } from "ts3dutils"
import { RegularPolygon } from "./RegularPolygon"

export function OctaSquare({
  x: w,
  y: h,
  ordered,
  a,
  randomClassCount,
  ...props
}: {
  x: number
  y: number
  ordered: boolean
  a: number
  randomClassCount: int
} & SVGAttributes<SVGElement>): ReactElement {
  const sr = seedrandom("X")
  const r = () => "r" + Math.floor(sr() * randomClassCount)

  const tan22_5 = Math.tan(22.5 * DEG)
  const tan45 = Math.tan(45 * DEG)
  const baseSideLength = 2 * ((tan22_5 * tan45) / (tan22_5 + tan45))
  const s = (baseSideLength * a) / 10
  //viewBox="0 0 20 20"
  return (
    <svg className="adrian" {...props}>
      {arrayRange(0, w).flatMap((x) =>
        arrayRange(0, h).flatMap((y) => {
          const cellX = (x + 0.5 * (y % 2)) * 2
          const cellY = y * 0.5 * 2
          return [
            <RegularPolygon
              key={`square-${x}-${y}`}
              sides={4}
              startAngle={Math.PI / 4}
              sideLength={s}
              transform={`translate(${cellX} ${cellY}) `}
              className={clsx(r(), "c0", "s0")}
            />,
            <RegularPolygon
              key={`oct-${x}-${y}`}
              sides={8}
              startAngle={Math.PI / 8}
              sideLength={s}
              transform={`translate(${cellX + 1} ${cellY})`}
              className={clsx(r(), "c1", "s1")}
            />,
          ]
        }),
      )}
    </svg>
  )
}
