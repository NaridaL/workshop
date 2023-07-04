#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdTriangle.glsl
#pragma webpack include ../common/fromPolar.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 p) {
  vec2 a = vec2(4, 2) + fromPolar(10.0, iTime);
  vec2 b = vec2(4, 6) + fromPolar(10.0, iTime * 0.8 + 3.0);
  vec2 c = vec2(-10, 3) + fromPolar(10.0, iTime * 1.2 + 5.0);
  return sdTriangle(a, b, c, p);
}

void main() {
  vec3 color = VIZZ(sdf);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
