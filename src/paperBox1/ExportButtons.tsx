import Button from "@mui/material/Button"
import fileDownload from "js-file-download"
import { ReactElement } from "react"
import * as React from "react"
import ReactDOMServer from "react-dom/server"
import { SvgPrintContext } from "./Measure"

export function ExportButtons({
  what,
  baseFileName,
}: {
  what: ReactElement
  baseFileName: string
}) {
  const getPrintSVG = () =>
    ReactDOMServer.renderToStaticMarkup(
      <SvgPrintContext.Provider value={true}>{what}</SvgPrintContext.Provider>,
    ).replace(/\s{2,}/g, " ")
  const asSVG = () => {
    const svg = getPrintSVG()
    fileDownload(svg, baseFileName + ".svg")
  }
  const asTemplatePDF = async () => {
    const { svgToPdf } = await import(
      /* webpackChunkName: "svgToPdf" */ "../paperBox1/svgToPdf"
    )

    // add your content to the document here, as usual
    const blob = await svgToPdf({
      title: baseFileName,
      author: "Adrian Leonhard",
      svg: getPrintSVG(),
    })

    fileDownload(blob, baseFileName + ".pdf")
  }
  return (
    <>
      <Button variant="contained" onClick={asSVG}>
        Download As SVG
      </Button>
      <Button variant="contained" onClick={asTemplatePDF}>
        Template as PDF
      </Button>
    </>
  )
}
