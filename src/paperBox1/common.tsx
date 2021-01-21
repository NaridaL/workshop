import { arrayRange, DEG, int, raddd, round10, TAU, V3 } from "ts3dutils"
import { SVGCommand } from "svg-pathdata/src/types"
import { ReactNode, SVGProps } from "react"
import { encodeSVGPath, SVGPathData } from "svg-pathdata"
import * as React from "react"

export const INCH = 25.4
export const fmtdeg = (x: raddd) => "" + round10(x / DEG, -1) + "°"
export type R2 = [number, number]

export const radiusFromSideWidth = (sides: int, sideWidth: number) =>
  sideWidth / 2 / Math.sin(TAU / sides / 2)
export const centerToSideFromSideWidth = (sides: int, sideWidth: number) =>
  sideWidth / 2 / Math.tan(TAU / sides / 2)
export const radiusFromCenterToSide = (sides: int, centerToSide: number) =>
  centerToSide / Math.cos(TAU / sides / 2)

export function Path({
  d,
  ...props
}: { d: SVGCommand | SVGCommand[] } & Omit<SVGProps<SVGPathElement>, "d">) {
  return <path d={encodeSVGPath(d)} {...props} />
}

export function RegularPolygon({
  sides,
  radius,
  startAngle = 0,
  ...props
}: {
  sides: int
  radius: number
  startAngle?: number
} & Omit<SVGProps<SVGPathElement>, "d">) {
  const { x, y } = V3.polar(radius, startAngle)
  return (
    <Path
      d={[
        { type: SVGPathData.MOVE_TO, relative: false, x, y },
        ...arrayRange(0, sides).map(
          (i): SVGCommand => {
            const { x, y } = V3.polar(radius, startAngle + i * (TAU / sides))
            return {
              type: SVGPathData.LINE_TO,
              relative: false,
              x,
              y,
            }
          },
        ),
        { type: SVGPathData.CLOSE_PATH },
      ]}
      {...props}
    />
  )
}

export function RotStep({
  id,
  children,
  count,
  stepDeg,
}: {
  id: string
  children: ReactNode
  count: int
  stepDeg: number
}) {
  return (
    <>
      <g id={id}>{children}</g>
      {arrayRange(0, count - 1).map((i) => (
        <use
          key={i}
          href={"#" + id}
          transform={`rotate(${(i + 1) * stepDeg} 0 0)`}
        />
      ))}
    </>
  )
}
export type PaperSize = [width: number, height: number, name: string]
export const PAPER_SIZES: PaperSize[] = [
  [841, 1189, "A0"],
  [594, 841, "A1"],
  [420, 594, "A2"],
  [297, 420, "A3"],
  [210, 297, "A4"],
  [148, 210, "A5"],
  [105, 148, "A6"],
  [74, 105, "A7"],
  [52, 74, "A8"],
  [37, 52, "A9"],
  [26, 37, "A10"],
  [150, 150, "Origami 15cm"],
  [100, 100, "Origami 10cm"],
  [75, 75, "Origami 7.5cm"],
  [215.9, 279.4, "Letter"],
  [215.9, 355.6, "Legal"],
]
export const PAPER_SIZE_A4 = PAPER_SIZES.find(([, , name]) =>
  name.includes("A4"),
)!
