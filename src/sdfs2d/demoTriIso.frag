#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdTriangleIsosceles.glsl
#pragma webpack include ../common/fromPolar.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 c) {
  return sdTriangleIsosceles(vec2(2, -7), c);
}

void main() {
  vec3 color = VIZZ(sdf);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
