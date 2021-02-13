#version 300 es
precision highp float;

uniform mat4 ts_ModelViewProjectionMatrix;
uniform float normalOffset;
in vec3 ts_Normal;
in vec4 ts_Vertex;

void main() {
    gl_Position = ts_ModelViewProjectionMatrix * (ts_Vertex + normalOffset * vec4(ts_Normal, 0.));
}