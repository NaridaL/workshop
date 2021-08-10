import clsx from "clsx"
import React, { ReactElement, SVGAttributes } from "react"
import seedrandom from "seedrandom"
import { arrayRange, int } from "ts3dutils"
import { RegularPolygon } from "./RegularPolygon"

export function SquareTiles({
  x: w,
  y: h,
  a,
  randomClassCount,
  ...props
}: {
  x: number
  y: number
  a: number
  randomClassCount: int
} & SVGAttributes<SVGElement>): ReactElement {
  const sr = seedrandom("X")
  const rx = () => "r" + Math.floor(sr() * randomClassCount)
  //viewBox="0 0 20 20"
  return (
    <svg className="adrian" {...props}>
      {arrayRange(0, w).flatMap((x) =>
        arrayRange(0, h).flatMap((y) => (
          <RegularPolygon
            key={`sqr-${x}-${y}`}
            sides={4}
            radius={(Math.SQRT1_2 * a) / 10}
            transform={`translate(${x} ${y}) rotate(45)`}
            className={clsx(rx(), "c0")}
          />
        )),
      )}
    </svg>
  )
}
