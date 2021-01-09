import { DEG, raddd, round10 } from "ts3dutils"

export const INCH = 25.4
export const fmtdeg = (x: raddd) => "" + round10(x / DEG, -1) + "°"
export type R2 = [number, number]
