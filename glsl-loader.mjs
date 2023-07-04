/* eslint-disable */
import fs from "fs"
import path from "path"
import { SourceMapGenerator } from "source-map"
function loadContent(
  content,
  filename,
  dependencies,
  resultLines,
  sourceMapGenerator,
) {
  const contentLines = content.split("\n")
  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i]
    const match = /^\s*#pragma\s+webpack\s+include\s+(.*)$/g.exec(line)
    if (match !== null) {
      const [substr, what] = match
      const what2 = path.resolve(path.dirname(filename), what)
      if (!dependencies.includes(what2)) {
        dependencies.push(what2)

        resultLines.push(`// START ${what}`)
        loadContent(
          fs.readFileSync(what2, { encoding: "utf8" }),
          what2,
          dependencies,
          resultLines,
          sourceMapGenerator,
        )
        resultLines.push(`// END ${what}`)
      }
    } else {
      resultLines.push(line)
      try {
        sourceMapGenerator.addMapping({
          generated: { line: resultLines.length, column: 0 },
          original: { line: i + 1, column: 0 },
          source: filename,
        })
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }
}

/**
 *
 * @param content {string}
 * @param filename {string}
 * @returns {[string,import("source-map").RawSourceMap]}
 */
function load(content, filename) {
  const resultLines = []
  const sourceMapGenerator = new SourceMapGenerator()
  loadContent(content, filename, [], resultLines, sourceMapGenerator)
  return [resultLines.join("\n"), sourceMapGenerator.toJSON()]
}

export default function (options, loaderContext, content) {
  const dependencies = []
  const [mod, sourceMap] = load(
    content,
    loaderContext.resourcePath,
    dependencies,
  )
  let code = `
export default ${JSON.stringify(mod)}
const sourceMap = ${JSON.stringify(sourceMap)}
export { sourceMap };
`
  if (loaderContext.hot) {
    code += `
if (import.meta) {
  import.meta.webpackHot.accept()
}
`
  }
  return {
    cacheable: true,
    dependencies,
    code,
  }
}
