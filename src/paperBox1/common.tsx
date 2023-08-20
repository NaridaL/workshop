import * as React from "react"
import { ReactElement, ReactNode, SVGProps } from "react"
import { arrayRange, DEG, int, raddd, round10, TAU, V3 } from "ts3dutils"
import { encode, L, M, Z } from "./svg"

export const INCH = 25.4
export const fmtdeg = (x: raddd): string => "" + round10(x / DEG, -1) + "°"
export type R2 = [number, number]

export const radiusFromSideWidth = (sides: int, sideWidth: number): number =>
  sideWidth / 2 / Math.sin(TAU / sides / 2)
export const sideWithFromRadius = (sides: int, radius: number): number =>
  radius * 2 * Math.sin(TAU / sides / 2)
export const centerToSideFromSideWidth = (
  sides: int,
  sideWidth: number,
): number => sideWidth / 2 / Math.tan(TAU / sides / 2)
export const radiusFromCenterToSide = (
  sides: int,
  centerToSide: number,
): number => centerToSide / Math.cos(TAU / sides / 2)
export const sideWidthFromCenterToSide = (
  sides: int,
  centerToSide: number,
): number => centerToSide * 2 * Math.tan(TAU / sides / 2)

export function RegularPolygon({
  sides,
  radius,
  startAngle = 0,
  sideLength = undefined,
  ...props
}: {
  sides: int
  radius?: number
  sideLength?: number
  startAngle?: number
} & Omit<SVGProps<SVGPathElement>, "d">): ReactElement {
  if ((undefined !== sideLength) === (undefined !== radius)) {
    throw new Error("must set either sideLength or radius")
  }
  if (undefined === radius) {
    radius = radiusFromSideWidth(sides, sideLength!)
  }
  return (
    <path
      d={encode(
        M(V3.polar(radius, startAngle)),
        ...arrayRange(0, sides).map((i) =>
          L(V3.polar(radius!, startAngle + i * (TAU / sides))),
        ),
        Z(),
      )}
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
}): ReactElement {
  return (
    <>
      <g id={id}>{children}</g>
      {arrayRange(0, count - 1).map((i) => (
        <g
          id={`${id}-${i}`}
          key={`${id}-${i}`}
          transform={`rotate(${(i + 1) * stepDeg} 0 0)`}
        >
          {children}
        </g>
      ))}
    </>
  )
}

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (newWindow) newWindow.opener = null
}
