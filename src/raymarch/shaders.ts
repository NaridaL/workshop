/* eslint-disable @typescript-eslint/no-var-requires */
import { Shader, TSGLContext } from "tsgl"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildShaders(gl: TSGLContext) {
  return {
    // temple: Shader.create(
    //   require(`./raymarch.cc.vert`),
    //   require(`./temple.frag`),
    //   gl,
    // ),
    sdf: Shader.create(
      require("./raymarch.vert").default,
      require("./sdf.cc.frag").default,
      gl,
    ),
    // ed: Shader.create(require(`./raymarch.cc.vert`), require(`./ed.frag`), gl),
    singleColor: Shader.create(
      require("./singleColor.vert").default,
      require("./singleColor.frag").default,
      gl,
    ),
  }
}
