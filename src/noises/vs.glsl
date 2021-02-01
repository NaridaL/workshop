#version 300 es
precision highp float;

uniform mat4 ts_ModelViewProjectionMatrix;
in vec4 ts_Vertex;
uniform vec2 scale;
uniform vec2 offset;
in vec3 ts_TexCoordUVQ;
in vec2 ts_TexCoord;
out vec3 coordUVQ;
out float n;
out vec2 coord;
void main() {
    vec2 texCoordAdjusted = offset + ts_TexCoord * scale;
    gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;
    coordUVQ = ts_TexCoordUVQ;
    coord = mix(vec2(-1., -1.), vec2(1., 1.), ts_TexCoord);
}