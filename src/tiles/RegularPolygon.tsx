import * as React from "react"
import { ReactElement, SVGProps } from "react"
import { arrayRange, int, TAU, V3 } from "ts3dutils"
import {
  centerToSideFromSideWidth,
  dTpl,
  radiusFromSideWidth,
  sideWithFromRadius,
} from "../paperBox1/common"

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
  const c = centerToSideFromSideWidth(sides, sideWithFromRadius(sides, radius))
  const { x, y } = V3.polar(c, startAngle - TAU / sides / 2)
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
