/* eslint-disable @typescript-eslint/no-var-requires */
import { ilog } from "ts3dutils"
import { currentGL, Shader, TSGLContext, TSGLContextBase } from "tsgl"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildShaders(gl: TSGLContext) {
  return {
    simplex: Shader.create(
      require("./vs.vert").default,
      require(`./simplex.frag`).default,
      gl,
    ),
    julia: Shader.create(
      require("./vs.vert").default,
      require("./julia.cc.frag").default,
      gl,
    ),
    texShader: Shader.create<
      {
        colorPrimary: "FLOAT_VEC4"
        colorBg: "FLOAT_VEC4"
        pointSize: "FLOAT"
        texture: "SAMPLER_2D"
      },
      {}
    >(
      `
      uniform mat4 ts_ModelViewProjectionMatrix;
      attribute vec4 ts_Vertex;
      uniform float pointSize;
      attribute vec3 ts_TexCoordUVQ;
      attribute vec2 ts_TexCoord;
      varying vec4 foo;
      varying vec3 coordUVQ;
      varying vec2 coord;
      void main() {
        foo = vec4(1.0, 1.0, 1.0, 1.0);
        gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;
        gl_PointSize = pointSize;
        coordUVQ = ts_TexCoordUVQ;
        coord = ts_TexCoord;
      }
    `,
      `
      precision highp float;
      uniform sampler2D texture;
      uniform vec4 colorPrimary;
      uniform vec4 colorBg;
      varying vec4 bar;
      varying vec3 coordUVQ;
      varying vec2 coord;
      void main() {
        float fraction = texture2D(texture, coord).r;
        gl_FragColor = mix(colorBg, colorPrimary, fraction);
        
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
          discard;
        }
      }
    `,
    ),
    shader: Shader.create<{ color: "FLOAT_VEC4"; pointSize: "FLOAT" }, {}>(
      `
      uniform mat4 ts_ModelViewProjectionMatrix;
      attribute vec4 ts_Vertex;
      uniform float pointSize;
      varying vec4 foo;
      void main() {
        foo = vec4(1.0, 1.0, 1.0, 1.0);
        gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;
        gl_PointSize = pointSize;
      }
    `,
      `
      precision highp float;
      uniform vec4 color;
      varying vec4 bar;
      void main() {
        gl_FragColor = color;
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
          discard;
        }
      }
    `,
    ),

    perlinShader2: Shader.create<
      {
        colorPrimary: "FLOAT_VEC4"
        colorBg: "FLOAT_VEC4"
        scale: "FLOAT_VEC2"
        bandCount: "UNSIGNED_INT"
      },
      {}
    >(
      `#version 300 es
      precision highp float;
      
      uniform mat4 ts_ModelViewProjectionMatrix;
      in vec4 ts_Vertex;
      uniform float pointSize;
      uniform vec2 scale;
      uniform vec2 offset;
      in vec3 ts_TexCoordUVQ;
      in vec2 ts_TexCoord;
      out vec3 coordUVQ;
      out float n;
      out vec2 coord;
      void main() {
        vec2 texCoordAdjusted = offset + ts_TexCoord * scale;
        n = 0.0;  
        gl_Position = ts_ModelViewProjectionMatrix * 
          (ts_Vertex + vec4(0.0, 0.0, n, 0.0));
        gl_PointSize = pointSize;
        coordUVQ = ts_TexCoordUVQ;
        coord = texCoordAdjusted;
      }
  `,
      `#version 300 es
      precision highp float;
      
      uniform sampler2D texture;
      uniform vec4 colorPrimary;
      uniform vec4 colorBg;
      uniform int bandCount;
      in float n;
      in vec2 coord;
      out vec4 fragColor;
      void main() {
        float fraction = (n + 0.5) * 0.5;
        fragColor = mix(colorBg, colorPrimary, fraction);
        
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
          discard;
        }
      }
    `,
    ),
  }
}
