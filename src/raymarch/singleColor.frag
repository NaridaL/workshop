#version 300 es

precision highp float;

#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/banded.glsl

uniform vec4 color;

out vec4 fragColor;

void main() {
  fragColor = color;
}
