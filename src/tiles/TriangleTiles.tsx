import clsx from "clsx"
import React, { ReactElement, SVGAttributes } from "react"
import seedrandom from "seedrandom"
import { arrayRange, int } from "ts3dutils"
import { RegularPolygon } from "./RegularPolygon"

export function TriangleTiles({
  x: w,
  y: h,
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
  const rx = () => "r" + Math.floor(sr() * randomClassCount)
  //viewBox="0 0 20 20"
  const s = a / 10
  return (
    <svg className="adrian" {...props}>
      {arrayRange(0, w).flatMap((x) =>
        arrayRange(0, h).flatMap((y) => {
          const xx = (x: number, y: number) => {
            const v1 = y * 0.86666
            const u1 = x + y / 2
            //return x + " " + y
            return u1 + " " + v1
          }
          return [
            <RegularPolygon
              key={`${x}-${y}-l`}
              sides={3}
              sideLength={s}
              transform={`translate(${xx(
                x + 2 / 3 - Math.floor(y / 2),
                y + 1 / 3,
              )}) rotate(30)`}
              className={clsx(rx(), "c0", "s0")}
            />,
            <RegularPolygon
              key={`${x}-${y}-r`}
              sides={3}
              sideLength={s}
              transform={`translate(${xx(
                x + 1 / 3 - Math.floor(y / 2),
                y + 3 / 3,
              )}) rotate(-30)`}
              className={clsx(rx(), "c0", "s1")}
            />,
          ]
        }),
      )}
    </svg>
  )
}
