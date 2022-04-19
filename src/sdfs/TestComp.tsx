import React from "react"
import { useEffect, useState } from "react"

export function TestComp({ shader }: { shader: string }) {
  const [c, setC] = useState("loading...")
  useEffect(() => {
    import(/* webpackInclude: /\.glsl/ */ "./" + shader).then((s) =>
      setC(s.default),
    )
  }, [shader])

  return <div>{c}</div>
}

if (module.hot) {
  module.hot.accept(
    "./src/fractals lazy recursive ^\\.\\/.*$ include: \\.glsl",
    function () {
      console.log("aadsadsadasd", this)
    },
  )
}
