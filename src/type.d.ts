declare module "*.frag" {
  const content: string
  export default content
}
declare module "*.vert" {
  const content: string
  export default content
}

declare module "*.ttf" {
  const path: string
  export default path
}

declare module "*.jpg" {
  const path: string
  export default path
}

declare module "*.glsl" {
  const content: string
  export default content
}

declare module "svg-to-pdfkit" {
  import type PDFDocument from "pdfkit"
  /**
   * Insert SVG into a PDF document created with PDFKit.
   *
   * @param doc the PDF document created with PDFKit
   * @param svg the SVG object or XML code
   * @param x the x position where the SVG will be added
   * @param y the y position where the SVG will be added
   * @param options See {@link SVGtoPDF.Options}
   */
  function SVGtoPDF(
    doc: typeof PDFDocument,
    svg: SVGElement | string,
    x: number,
    y: number,
    options: SVGtoPDF.Options,
  ): void
  namespace SVGtoPDF {
    export type Color = [[number, number, number], number]
    export interface Options {
      // initial viewport width, by default it's the page width
      width?: number

      // initial viewport width, by default it's the page width
      height?: number

      // override alignment of the SVG content inside its viewport
      preserveAspectRatio?: string

      // use the CSS styles computed by the browser (for SVGElement only)
      useCSS?: boolean

      // function called to get the fonts, see source code
      fontCallback?: (
        family: string,
        bold: boolean,
        italic: boolean,
        fontOptions: { fauxItalic: boolean; fauxBold: boolean },
      ) => string

      // same as above for the images (for Node.js)
      imageCallback?: (link: string) => string

      // same as above for the external SVG documents
      documentCallback?: (
        file: string,
      ) => SVGElement | string | (SVGElement | string)[]

      // function called to get color, making mapping to CMYK possible
      colorCallback?: (color: Color) => Color

      // function called when there is a warning
      warningCallback?: (warning: string) => void

      // assume that units are PDF points instead of SVG pixels
      assumePt?: boolean

      // precision factor for approximate calculations (default = 3)
      precision?: number
    }
  }
  export = SVGtoPDF
}
