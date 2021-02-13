import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Divider from "@material-ui/core/Divider"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import InputLabel from "@material-ui/core/InputLabel"
import Link from "@material-ui/core/Link"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Tooltip from "@material-ui/core/Tooltip"
import { Alert } from "@material-ui/lab"
import fileDownload from "js-file-download"
import * as React from "react"
import { ReactElement, useCallback, useState } from "react"
import * as ReactDOMServer from "react-dom/server"

import { PaperSize } from "../paperBox1/common"
import { PaperAutocomplete } from "../paperBox1/PaperAutocomplete"
import { useHashState } from "../paperBox1/useHashState"
import { InsideFolds } from "./InsideFolds"
import insideFoldsImg from "./insideFolds.jpg"
import { OutsideFolds } from "./OutsideFolds"
import outsideFoldsLargeTemplateImg from "./outsideFoldsLargeTemplate.jpg"

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: 256,
    padding: theme.spacing(1),
    alignItems: "stretch",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 0,
    paddingTop: "100%", // 1:1
  },
}))

export default (): ReactElement => {
  const [state, setState] = useHashState({
    variant: "inside" as "inside" | "outside",
    baseRadius: 30,
    topRadius: 65,
    radius: 100,
    sides: 8,
  })
  const setPartialState = useCallback(
    (update: Partial<typeof state>) => setState((s) => ({ ...s, ...update })),
    [setState],
  )
  const [paperSize, setPaperSize] = useState(null as PaperSize | null)

  const BaseDrawing: typeof OutsideFolds = {
    inside: InsideFolds,
    outside: OutsideFolds,
  }[state.variant]

  const classes = useStyles()

  const getPrintSVG = () =>
    ReactDOMServer.renderToStaticMarkup(
      <BaseDrawing
        {...{ ...state, sides: state.sides, print: true }}
        paperSize={paperSize}
      />,
    ).replace(/\s{2,}/g, " ")
  const baseFileName = `${state.variant}-${state.baseRadius}-${state.topRadius}-${state.radius}-${state.sides}`
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
      title: "Paper Box Template",
      author: "Adrian Leonhard",
      svg: getPrintSVG(),
    })

    fileDownload(blob, baseFileName + ".pdf")
  }

  const topLip = state.radius - state.topRadius
  const topOverlap = topLip - state.baseRadius

  return (
    <Grid container style={{ width: "100%" }}>
      <Grid item xs={12} md={10}>
        <BaseDrawing
          {...state}
          paperSize={paperSize}
          style={{ width: "100%", height: "100%" }}
        />
      </Grid>
      <Grid item xs={12} md={2} className={classes.sidebar}>
        <Card>
          <CardMedia
            className={classes.media}
            image={insideFoldsImg}
            title="Contemplative Reptile"
          />
          <CardContent>
            Helper to build a box from a circular piece of paper. The Inside
            Folds variant has more complicated folds but has a cleaner overall
            look.
          </CardContent>
        </Card>
        <FormControl variant="outlined" size="small">
          <InputLabel id="variant-label">Variant</InputLabel>
          <Select
            labelId="variant-label"
            label="Variant"
            value={state.variant}
            onChange={(e) =>
              setPartialState({
                variant: e.target.value as "inside" | "outside",
              })
            }
          >
            <MenuItem value="inside">Inside Folds</MenuItem>
            <MenuItem value="outside">Outside Folds</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={state.baseRadius}
          onChange={(e) => setPartialState({ baseRadius: +e.target.value })}
          label="baseRadius"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={state.topRadius}
          onChange={(e) => setPartialState({ topRadius: +e.target.value })}
          label="topRadius"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1 }}
          value={state.radius}
          onChange={(e) => setPartialState({ radius: +e.target.value })}
          label="Radius"
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ step: 1, min: 4, max: 32 }}
          value={state.sides}
          onChange={(e) => setPartialState({ sides: +e.target.value })}
          label="Sides"
        />
        {state.variant === "inside" && topOverlap > 0 && (
          <Alert severity="warning">
            For the inside folds variant, you want no (or even negative) overlap
            at the top.
          </Alert>
        )}
        <Divider />
        <Card>
          <CardContent>
            Set the Print Paper Size on large boxes to get a partial template
            which can be rotated. See{" "}
            <Link href={outsideFoldsLargeTemplateImg}>this image</Link> for an
            example.
          </CardContent>
        </Card>
        <PaperAutocomplete
          label="Print Paper Size"
          value={paperSize}
          onChange={setPaperSize}
        />
        <Button variant="contained" onClick={asSVG}>
          Download As SVG
        </Button>
        <Tooltip title="" placement="left">
          <Button variant="contained" onClick={asTemplatePDF}>
            Template as PDF
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  )
}
