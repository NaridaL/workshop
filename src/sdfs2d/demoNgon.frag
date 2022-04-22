#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdTriangleEquilateral.glsl
#pragma webpack include ../common/sdf2d/sdNgon.glsl
#pragma webpack include ../common/sdf2d/sdRectangle.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
in vec2 coord;
out vec4 fragColor;
uniform float a;

float sdf(vec2 p) {
  return sdNgon(5.0 + 2.0 * sin(iTime), p / 10.0) * 10.0;
}

void main() {
  vec3 color = VIZZ(sdf);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
