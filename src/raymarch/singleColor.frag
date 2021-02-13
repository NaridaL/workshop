#version 300 es

precision highp float;

#pragma glslify: visualize = require(../shaderfunctions/visualize.glsl)
#pragma glslify: banded = require(../shaderfunctions/banded.glsl)

uniform vec4 color;

out vec4 fragColor;

void main() {

    fragColor = color;
}