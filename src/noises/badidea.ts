import { arrayFromFunction, arrayRange, emod, lerp, V3 } from "ts3dutils"

export type S<T> = { __matcher__: T }

export type void_ = S<"void">
export type bool = S<"bool">

export type int = S<"int">
export type uint = S<"uint"> | number
export type float = S<"float">
export type vec2 = S<"vec2">
export type vec3 = S<"vec3">
export type vec4 = S<"vec4">
export type bvec2 = S<"bvec2">
export type bvec3 = S<"bvec3">
export type bvec4 = S<"bvec4">
export type ivec2 = S<"ivec2">
export type ivec3 = S<"ivec3">
export type ivec4 = S<"ivec4">
export type uvec2 = S<"uvec2">
export type uvec3 = S<"uvec3">
export type uvec4 = S<"uvec4">
export type mat2 = S<"mat2">
export type mat3 = S<"mat3">
export type mat4 = S<"mat4">
export type mat2x2 = S<"mat2x2">
export type mat2x3 = S<"mat2x3">
export type mat2x4 = S<"mat2x4">
export type mat3x2 = S<"mat3x2">
export type mat3x3 = S<"mat3x3">
export type mat3x4 = S<"mat3x4">
export type mat4x2 = S<"mat4x2">
export type mat4x3 = S<"mat4x3">
export type mat4x4 = S<"mat4x4">

export type genType = float | vec2 | vec3 | vec4
export type genBType = bool | bvec2 | bvec3 | bvec4
export type genUType = uint | uvec2 | uvec3 | uvec4
export type genIType = int | ivec2 | ivec3 | ivec4
export type mat =
  | mat2
  | mat3
  | mat4
  | mat2x2
  | mat2x3
  | mat2x4
  | mat3x2
  | mat3x3
  | mat3x4
  | mat4x2
  | mat4x3
  | mat4x4

export type NumberType = genType | genBType | genIType | genUType | mat | number
// Floating Point sampler Types (opaque)
export type sampler2D = S<"sampler2D">
export type sampler3D = S<"sampler3D">
export type samplerCube = S<"samplerCube">
export type samplerCubeShadow = S<"samplerCubeShadow">
export type sampler2DShadow = S<"sampler2DShadow">

export type SamplerType =
  | sampler2D
  | sampler3D
  | samplerCube
  | samplerCubeShadow
  | sampler2DShadow

export type SType = SamplerType | NumberType | bool | void_

export const vec4 = (x: number, y: number, z: number, w: number): vec4 => {
  return {
    type: "vec4",
    what: [x, y, z, w],
    etype: "vec4",
  } as any
}
export const neg = <T extends NumberType>(x: T): T =>
  ({
    type: "neg",
    what: x,
    etype: x.etype,
  } as any)
export const floor = <T extends genType>(x: T): T =>
  ({
    type: "floor",
    what: x,
    etype: x.etype,
  } as any)
export const mix = <T extends NumberType>(a: T, b: T, f: float): T =>
  ({
    type: "mix",
    what: [a, b, f],
    etype: a.etype,
  } as any)
export const div = <T extends NumberType>(a: T, b: T): T =>
  ({
    type: "div",
    what: [a, b],
    etype: a.etype,
  } as any)
export const mul = <T extends NumberType>(a: T, b: T): T =>
  ({
    type: "mul",
    what: [a, b],
    etype: a.etype,
  } as any)
export const sub = <T extends NumberType>(a: T, b: T): T =>
  ({
    type: "sub",
    what: [a, b],
    etype: a.etype,
  } as any)
export const sum = <T extends NumberType>(first: T, ...rest: T[]): T =>
  ({
    type: "sum",
    what: [first, ...rest],
    etype: first.etype,
  } as any)
export const glFragment = (color: vec4): void =>
  ({
    type: "glFragment",
    what: color,
  } as any)

export const arg = <S extends SType["__matcher__"]>(x: string, of: S): S => {
  return { type: "arg", name: x, etype: of } as any
}

export const compile = (f: () => SType, argTypes: string[] = []): string => {
  const mi = (x) => "  ".repeat(x)
  const magic = (x, targetType, indent = 0) => {
    if (x.etype && targetType && x.etype !== targetType) {
      return targetType + "(" + magic2(x, targetType, indent) + ")"
    } else {
      return magic2(x, targetType, indent)
    }
  }
  const magic2 = (x, targetType, indent = 0) => {
    if ("number" === typeof x) {
      switch (targetType) {
        case "float":
          return Intl.NumberFormat("en-US", {
            minimumFractionDigits: 1,
          }).format(x)
        case "uint":
          return x + "u"
        case "int":
          return x
        default:
          throw new Error(targetType)
      }
    } else {
      switch (x.type) {
        case "sum":
          return (
            "(" +
            x.what
              .map((x) => magic(x, indent + 1))
              .join("\n" + mi(indent + 1) + "+ ") +
            ")"
          )
        case "neg":
          return "(-" + magic(x.what, targetType, 0) + ")"
        case "div": {
          const [a, b] = x.what
          return "(" + magic(a, targetType) + " / " + magic(b, targetType) + ")"
        }
        case "mul": {
          const [a, b] = x.what
          return "(" + magic(a, targetType) + " * " + magic(b, targetType) + ")"
        }
        case "sub": {
          const [a, b] = x.what
          return "(" + magic(a, targetType) + " - " + magic(b, targetType) + ")"
        }
        case "arg":
          return x.name
        case "mix":
          const [a, b, f] = x.what
          return (
            "mix(" +
            magic(a, targetType, indent) +
            ", " +
            magic(b, targetType, indent) +
            ", " +
            magic(f, "float", indent) +
            ")"
          )
        case "glFragment":
          return (
            mi(indent) +
            "glFragment = " +
            magic(x.what, targetType, indent) +
            ";"
          )
        case "floor":
          return "floor(" + magic(x.what, targetType) + ")"
        case "vec4":
          return "vec4(" + x.what.map((x) => magic(x, "float")).join(", ") + ")"
        default:
          throw new Error(JSON.stringify(x))
      }
    }
  }
  const args = getArgs(f).map((name, i) => arg(name, argTypes[i]))
  console.log("args", args)
  const tree = f(...args)
  return (
    tree.etype +
    " " +
    f.name +
    "(" +
    getArgs(f).map((name, i) => argTypes[i] + " " + name) +
    ") {\n" +
    "return " +
    magic(tree, undefined, 1) +
    ";\n" +
    "}\n"
  )
}
function getArgs(func) {
  if (func.length === 0) {
    return []
  }

  const string = func.toString()

  let args
  // First match everything inside the function argument parens. like `function (arg1,arg2) {}` or `async function(arg1,arg2) {}

  args =
    string.match(/(?:async|function)\s*.*?\(([^)]*)\)/)?.[1] ||
    // arrow functions with multiple arguments  like `(arg1,arg2) => {}`
    string.match(/^\s*\(([^)]*)\)\s*=>/)?.[1] ||
    // arrow functions with single argument without parens like `arg => {}`
    string.match(/^\s*([^=]*)=>/)?.[1]

  // Split the arguments string into an array comma delimited.
  return args
    .split(",")
    .map(function (arg) {
      // Ensure no inline comments are parsed and trim the whitespace.
      return arg.replace(/\/\*.*\*\//, "").trim()
    })
    .filter(function (arg) {
      // Ensure no undefined values are added.
      return arg
    })
}

function shaderMain() {
  const a = vec4(1, 0, 3, 1)
  const b = vec4(0.1, 1.0, 0, 1)
  return sum(neg(a), b)
}

console.log(compile(shaderMain))

function lerpInv(a, b, value) {
  return div(sub(value, a), sub(b, a))
}

function remap(fromA, fromB, toA, toB, value) {
  return mix(toA, toB, lerpInv(fromA, fromB, value))
}

function cc<T extends string[]>(
  ...argTypes: T
): <X>(
  func: (...x: { [K in keyof T]: S<T[K]> }) => S<X>,
) => { argTypes: T; func: (...x: { [K in keyof T]: S<T[K]> }) => S<X> } {
  return function (func) {
    return {
      argTypes,
      func,
    }
  }
}

const band = cc(
  "float",
  "float",
  "uint",
  "float",
)(function band(a, b, bandCount, value) {
  return mix(
    a,
    b,
    div(floor(mul(lerpInv(a, b, value), bandCount)), sub<uint>(bandCount, 1)),
  )
})

const highlightOOB = cc()(function highlightOOB() {})
export const bandResult = compile(band.func, band.argTypes)
console.log(bandResult)
