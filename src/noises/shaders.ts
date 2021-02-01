import { currentGL, Shader, TSGLContext, TSGLContextBase } from "tsgl"

export let shader1: Shader

export function buildShaders(): void {
  shader1 = Shader.create(require(`./vs.glsl`), require(`./rm.glsl`))
}

currentGL() && buildShaders()
