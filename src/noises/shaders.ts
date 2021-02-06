/* eslint-disable @typescript-eslint/no-var-requires */
import { ilog } from "ts3dutils"
import { currentGL, Shader, TSGLContext, TSGLContextBase } from "tsgl"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildShaders() {
  return {
    shader1: Shader.create(require(`./vs.vert`), require(`./raymarch.frag`)),
    simplex: Shader.create(require(`./vs.vert`), require(`./simplex.frag`)),
    julia: Shader.create(require(`./vs.vert`), ilog(require(`./julia.frag`))),
  }
}
