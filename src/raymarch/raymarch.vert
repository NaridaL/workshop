#version 300 es
precision highp float;

in vec4 ts_Vertex;
in vec2 ts_TexCoord;
out vec2 coord;
void main() {
    gl_Position = ts_Vertex;
    coord = ts_TexCoord;
}