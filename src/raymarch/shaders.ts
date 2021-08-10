/* eslint-disable @typescript-eslint/no-var-requires */
import { Shader, TSGLContext } from "tsgl"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildShaders(gl: TSGLContext) {
  return {
    // temple: Shader.create(
    //   require(`./raymarch.vert`),
    //   require(`./temple.frag`),
    //   gl,
    // ),
    sdf: Shader.create(require(`./raymarch.vert`), require(`./sdf.frag`), gl),
    // ed: Shader.create(require(`./raymarch.vert`), require(`./ed.frag`), gl),
    singleColor: Shader.create(
      require("./singleColor.vert"),
      require("./singleColor.frag"),
      gl,
    ),
  }
}
