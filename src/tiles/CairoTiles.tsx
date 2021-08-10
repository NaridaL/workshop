import clsx from "clsx"
import React, { ReactElement, SVGAttributes } from "react"
import seedrandom from "seedrandom"
import { arrayRange, DEG, int, V3 } from "ts3dutils"
import { dTpl } from "../paperBox1/common"

export function CairoTiles({
  x: w,
  y: h,
  a,
  randomClassCount,
  ordered,
  ...props
}: {
  x: number
  y: number
  a: number
  ordered: boolean
  randomClassCount: int
} & SVGAttributes<SVGElement>): ReactElement {
  const sr = seedrandom("X")
  const rx = (x: number) =>
    "r" + Math.floor((ordered ? x : sr()) * randomClassCount)
  //viewBox="0 0 20 20"
  const SQRT3_4 = Math.sqrt(3) / 2 // 0.86602540378
  const SQRT4_3 = 2 / Math.sqrt(3) // 1.15470053838
  console.log(SQRT4_3)
  return (
    <svg className="adrian" {...props}>
      <defs>
        <path
          id="tile"
          style={{ animation: "inherit" }}
          className="c0"
          d={dTpl`${[
            [270, 0.5],
            [300, SQRT4_3 / 2],
            [15, Math.SQRT2 / 2],
            [90, SQRT4_3 / 2],
            [165, Math.SQRT2 / 2],
            [240, SQRT4_3 / 2],
          ].map(
            ([angle, r], i) =>
              (i === 0 ? "M" : "L") +
              dTpl`${V3.polar((r * a) / 10, angle * DEG)}`,
          )}Z`}
        />
      </defs>
      {arrayRange(0, w).flatMap((i) =>
        arrayRange(0, h).map((j) => {
          const x = (i + (j % 2) / 2) * (2 * SQRT3_4 + 1)
          const y = (j * (2 * SQRT3_4 + 1)) / 2
          return [
            [0, 0, -60],
            [SQRT3_4, 0.5, 30],
            [2 * SQRT3_4, 0, 120],
            [SQRT3_4, -0.5, 210],
          ].map(([xo, yo, rot], iShape) => (
            <use
              key={`t-${x}-${y}-${iShape}`}
              href="#tile"
              transform={`translate(${x + xo},${y + yo})rotate(${rot - 30})`}
              className={clsx(rx((x + xo + y + yo) / (w + h)), "s" + iShape)}
            />
          ))
        }),
      )}
    </svg>
  )
}
