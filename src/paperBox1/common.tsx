import * as React from "react"
import { ReactElement, ReactNode, SVGProps } from "react"
import { arrayRange, DEG, int, raddd, round10, TAU, V3 } from "ts3dutils"

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
  const { x, y } = V3.polar(radius, startAngle)
  return (
    <path
      d={dTpl`
        M${x},${y}
        ${arrayRange(0, sides).map(
          (i) => dTpl`L${V3.polar(radius!, startAngle + i * (TAU / sides))}`,
        )}Z`}
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
        <use
          key={i}
          xlinkHref={"#" + id}
          transform={`rotate(${(i + 1) * stepDeg} 0 0)`}
        />
      ))}
    </>
  )
}

export function dTpl(
  strings: TemplateStringsArray,
  ...exps: (number | V3 | string | string[])[]
): string {
  const format = (x: number | V3 | string | string[]): string =>
    "number" === typeof x
      ? "" + x
      : "string" === typeof x
      ? x
      : Array.isArray(x)
      ? x.map(format).join(" ")
      : x.x + "," + x.y
  let result = strings[0]
  for (let i = 0; i < exps.length; i++) {
    result += format(exps[i])
    result += strings[i + 1]
  }
  return result
}

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (newWindow) newWindow.opener = null
}
