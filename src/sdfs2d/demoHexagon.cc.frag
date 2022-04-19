#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdHexagon.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 x) {
  return sdHexagon(4.0 + 2.0 * sin(iTime), x);
}

void main() {
  vec3 color = VIZZ(sdf);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
