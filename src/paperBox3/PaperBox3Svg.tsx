import * as React from "react"
import { CSSProperties, ReactElement, useContext } from "react"
import { SVGPathData, SVGPathDataTransformer } from "svg-pathdata"
import { SVGCommand } from "svg-pathdata/lib/types"
import { M4, V, V3 } from "ts3dutils"
import { SvgPrintContext } from "../paperBox1/Measure"
import { PaperSize } from "../paperBox1/PaperSize"
import { A, Corner, DynamicCommands, encode, L, M } from "../paperBox1/svg"
import { SvgCommonDefs } from "../paperBox1/SvgCommonDefs"

// https://math.stackexchange.com/a/885965/230980
export function lookUpAngle(
  r: number,
  lookUpAngle2: number,
  r2: number,
): number {
  return (
    Math.PI / 2 - lookUpAngle2 - Math.acos((r2 / r) * Math.sin(lookUpAngle2))
  )
}

export function PaperBox3Svg({
  baseRadius,
  topRadius,
  radius,
  style,
  paperSize,
  children,
}: {
  baseRadius: number
  topRadius: number
  radius: number
  style?: CSSProperties
  paperSize: PaperSize | null
  children: ReactElement | ReactElement[]
}): ReactElement {
  const paperPosition = paperSize && [
    Math.min(-20, radius - paperSize[0]),
    Math.min(-20, radius - paperSize[1]),
  ]

  const boxHeight = topRadius - baseRadius
  const length = 60
  const width = 40
  const height = 20
  const rad = 4
  const topLip = radius - topRadius

  const tabWidth = 10
  const print = useContext(SvgPrintContext)
  const svgViewBox = [
    -tabWidth - 1,
    -height - tabWidth - 1,
    2 * width + 2 * height + tabWidth + 2,
    length + 2 * height + 2 * tabWidth + 2,
  ]

  function MatrixWhichMovesSegment(a1: V3, b1: V3, a2: V3, b2: V3): M4 {
    const ab1 = a1.to(b1)
    const ab2 = a2.to(b2)
    const sys1 = M4.forSys(ab1, ab1.getPerpendicular(), undefined, a1)
    const sys2 = M4.forSys(ab2, ab2.getPerpendicular(), undefined, a2)
    return sys1.inversed().transform(sys2)
  }

  function SideTab(x: number, y: number, flipped = false): DynamicCommands {
    function flipp(commands: SVGCommand[], doFlip: boolean = true) {
      if (!doFlip) return commands
      let lastX = 0,
        lastY = 0
      commands = commands.map((c): SVGCommand => {
        x = lastX
        y = lastY
        lastX = c.x
        lastY = c.y
        switch (c.type) {
          case SVGPathData.MOVE_TO:
            c.x = x
            c.y = y
            return c
          case SVGPathData.LINE_TO:
            return {
              type: SVGPathData.LINE_TO,
              x: x,
              y: y,
              relative: false,
            }
          case SVGPathData.ARC:
            return {
              type: SVGPathData.ARC,
              x: x,
              y: y,
              relative: false,
              rX: c.rX,
              rY: c.rY,
              lArcFlag: c.lArcFlag,
              sweepFlag: +!c.sweepFlag as 0 | 1,
              xRot: c.xRot,
            }
          default:
            throw new Error("" + c.type)
        }
      })
      commands.push(M(lastX, lastY))
      commands.reverse()
      commands.pop()
      return commands
    }

    return (prevX, prevY) => {
      const [a, b] = !flipped ? [V3.O, V(height, 0)] : [V(-height, 0), V3.O]
      let mat = MatrixWhichMovesSegment(a, b, V(prevX, prevY), V(x, y))
      if (flipped) {
        mat = M4.mirror({ normal1: V3.X, w: 0 }).transform(mat)
      }
      const svgPathData = new SVGPathData(
        flipp(
          [
            M(0, 0),
            A(2, 2, 0, 0, 1, V(2, 2)),
            L(2, tabWidth),
            L(height - 2, tabWidth),
            L(height, 5),
            L(height, 0),
          ],
          flipped,
        ),
      ).transform(
        SVGPathDataTransformer.MATRIX(
          mat.m[0],
          mat.m[4],
          mat.m[1],
          mat.m[5],
          mat.m[3],
          mat.m[7],
        ),
      )
      svgPathData.commands.unshift()
      flipped && console.log(svgPathData.encode())
      return svgPathData.commands
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={style}
      width={svgViewBox[2] + "mm"}
      height={svgViewBox[3] + "mm"}
      viewBox={svgViewBox.join(" ")}
      className="adrian"
    >
      <SvgCommonDefs />
      <path
        d={encode(
          // left tab
          M(0, 0),
          L(-10, 0),
          L(-10, length),
          L(0, length),
          // bottom tab
          L(0, length + height),
          L(0, length + height + tabWidth),
          L(width, length + height + tabWidth),
          L(width, length + height),
          L(width, length),
          // middle
          SideTab(width + height, length),
          L(2 * width + height, length),
          // right tab
          SideTab(2 * width + 2 * height, length, true),
          L(2 * width + 2 * height, 0),
          SideTab(2 * width + height, 0, true),
          // top tab
          L(2 * width + height, -height),
          Corner(rad, 2 * width + height, -(height + tabWidth)),
          Corner(rad, width + height, -(height + tabWidth)),
          L(width + height, 0),
          SideTab(width, 0),
          L(0, 0),
          // notches
          M(width + height, -height),
          L(width + height + 4, -height),
          M(2 * width + height - 4, -height),
          L(2 * width + height, -height),
        )}
        className="cut"
      />
      <path
        d={encode(
          M(0, 0),
          L(0, length),
          L(width, length),
          L(width, 0),
          M(width + height, length),
          L(width + height, 0),
          L(2 * width + height, 0),
          L(2 * width + height, length),
        )}
        className="valley"
      />
    </svg>
  )
}
