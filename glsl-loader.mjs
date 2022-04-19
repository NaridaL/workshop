/* eslint-disable */
import fs from "fs"
import path from "path"

function loadContent(content, filename, dependencies) {
  return content.replaceAll(
    /^\s*#pragma\s+webpack\s+include\s+(.*)$/gm,
    (substr, what) => {
      const what2 = path.resolve(path.dirname(filename), what)
      if (dependencies.includes(what2)) {
        return ""
      } else {
        dependencies.push(what2)

        return (
          `// START ${what}\n` +
          loadContent(
            fs.readFileSync(what2, { encoding: "utf8" }),
            what2,
            dependencies,
          )
        )
      }
    },
  )
}

export default function (options, loaderContext, content) {
  const dependencies = []
  const mod = loadContent(content, loaderContext.resourcePath, dependencies)
  let code = `
export default ${JSON.stringify(mod)}
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
