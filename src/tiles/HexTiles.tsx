import clsx from "clsx"
import React, { ReactElement, SVGAttributes } from "react"
import seedrandom from "seedrandom"
import { arrayRange, clamp, DEG, ilog, int } from "ts3dutils"
import { sideWidthFromCenterToSide } from "../paperBox1/common"
import { RegularPolygon } from "./RegularPolygon"

export function HexTiles({
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
  return (
    <svg className="adrian" {...props}>
      {arrayRange(0, w).flatMap((x) =>
        arrayRange(0, h).map((y) => {
          const xx = (x: number, y: number) => {
            const v1 = y * 0.86666
            const u1 = x + y / 2
            //return x + " " + y
            return u1 + " " + v1
          }
          const u = x - Math.floor(y / 2)
          const v = y
          const w = 0 - u - v
          return (
            <RegularPolygon
              key={`hex-${x}-${y}-l`}
              sides={6}
              sideLength={s}
              transform={`translate(${xx(
                x - Math.floor(y / 2),
                y,
              )}) rotate(30)`}
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
            />
          )
        }),
      )}
    </svg>
  )
}
