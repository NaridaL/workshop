#version 300 es
in vec4 ts_Vertex;
in vec2 ts_TexCoord;
out vec2 coord;
void main() {
  coord = ts_TexCoord.xy;
  gl_Position = ts_Vertex;
}
