#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdRectangle.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
uniform float a;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 p) {
  return sdRectangle(10.0 + 5.0 * sin(0.2 * iTime), 10.0 + 6.0 * sin(iTime), p);
}

void main() {
  vec3 color = VIZZ(sdf);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
