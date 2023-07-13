import { MINUS } from "ts3dutils"

export type PaperSize = [widthMM: number, heightMM: number, name: string]
// Always portrait orientation,

// Always portrait orientation,
export const PAPER_SIZES_A: PaperSize[] = [
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
]

export function PaperSizeEquals([aw, ah]: PaperSize, [bw, bh]: PaperSize) {
  return aw === bw && bh === bw
}

export const PAPER_SIZES_B: PaperSize[] = [
  [1000, 1414, "C0"],
  [707, 1000, "C1"],
  [500, 707, "C2"],
  [353, 500, "C3"],
  [250, 353, "C4"],
  [176, 250, "C5"],
  [125, 176, "C6"],
  [88, 125, "C7"],
  [62, 88, "C8"],
  [44, 62, "C9"],
  [31, 44, "C10"],
]

// C size envelopes fit A size paper.
export const PAPER_SIZES_C: PaperSize[] = [
  [917, 1297, "C0"],
  [648, 917, "C1"],
  [458, 648, "C2"],
  [324, 458, "C3"],
  [229, 324, "C4"],
  [162, 229, "C5"],
  [114, 162, "C6"],
  [81, 114, "C7"],
  [57, 81, "C8"],
  [40, 57, "C9"],
  [28, 40, "C10"],
]
export const PAPER_SIZES: PaperSize[] = [
  ...PAPER_SIZES_A,
  [150, 150, "Origami 15cm"],
  [100, 100, "Origami 10cm"],
  [75, 75, "Origami 7.5cm"],
  [215.9, 279.4, "Letter"],
  [215.9, 355.6, "Legal"],
]

export const ALL_PAPER_SIZES: PaperSize[] = [
  ...PAPER_SIZES,
  ...PAPER_SIZES_C,
  ...PAPER_SIZES_B,
]

export function PaperSizeFromString(str: string): PaperSize {
  const byName = PAPER_SIZES.find(([, , name]) => name === str)
  if (byName) return byName
  const [a, b] = str.split("x")
  return [+a, +b, "Custom"]
}
export function PaperSizeFromDimensions(a: number, b: number) {
  ;[a, b] = [a, b].sort(MINUS)
  return PAPER_SIZES.find(([x, y]) => x === a && y === b) ?? [a, b, "Custom"]
}
export function PaperSizeToString([a, b, name]: PaperSize): string {
  return name === "Custom" ? "" + a + "x" + b : name
}

export const PAPER_SIZE_A4 = PAPER_SIZES_A[4]!
