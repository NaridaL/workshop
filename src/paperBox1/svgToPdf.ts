import blobStream from "blob-stream"
import PDFDocument from "pdfkit"
import SVGtoPDF from "svg-to-pdfkit"
import { round10 } from "ts3dutils"
import { INCH } from "./common"

export function svgToPdf({
  title,
  author,
  svg,
}: {
  title: string
  author: string
  svg: string
}): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const [, widthStr, heightStr] =
      /<svg[^>]*?width="([^"]+)mm".*?height="([^"]+)mm"/.exec(svg)!
    const [width, height] = [widthStr, heightStr].map((x) =>
      // We want it to be at 72 DPI.
      round10((+x * 72) / INCH, -2),
    )

    const doc = new PDFDocument({
      size: width < height ? [width, height] : [height, width],
      margins: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      layout: width <= height ? "portrait" : "landscape",
      info: {
        Title: title,
        Author: author,
      },
    })

    // pipe the document to a blob
    const stream = doc.pipe(blobStream())

    // add your content to the document here, as usual
    SVGtoPDF(doc, svg, 0, 0, { assumePt: false })

    // get a blob when you're done
    doc.end()
    stream.on("finish", function () {
      resolve(stream.toBlob("application/pdf"))
    })
    stream.on("error", reject)
  })
}
