/* eslint-disable @typescript-eslint/no-var-requires */
import { Shader, TSGLContext } from "tsgl"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildShaders(gl: TSGLContext) {
  return {
    raymarch: Shader.create(
      require(`./raymarch.vert`),
      require(`./raymarch.frag`),
      gl,
    ),
    singleColor: Shader.create(
      require("./singleColor.vert"),
      require("./singleColor.frag"),
      gl,
    ),
  }
}
