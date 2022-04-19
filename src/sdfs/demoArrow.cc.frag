#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdArrow.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
uniform float a;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 p) {
  return sdArrow(
    1.0 + 0.5 * sin(0.2 * iTime),
    1.0 + 0.5 * sin(iTime),
    (p + vec2(25, 0)) / 50.0
  ) *
  50.0;
}

void main() {
  vec3 color = VIZZ(sdf);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
