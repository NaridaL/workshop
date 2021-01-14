import SVGtoPDF from "svg-to-pdfkit"
import PDFDocument from "pdfkit"
import blobStream from "blob-stream"

export function svgToPdf({
  size,
  layout,
  title,
  author,
  svg,
}: {
  size: [widthInPt: number, heightInPt: number]
  layout: "landscape" | "portrait"
  title: string
  author: string
  svg: string
}): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const doc = new PDFDocument({
      size,
      margins: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      layout,
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
