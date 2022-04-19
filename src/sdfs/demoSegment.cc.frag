#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdSegment.glsl
#pragma webpack include ../common/fromPolar.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 x) {
  vec2 a = fromPolar(10.0, 3.0 * iTime + sin(2.0 * iTime));
  vec2 b = -a;
  return sdSegment(a, b, x) - 2.5;
}

void main() {
  vec3 color = VIZZ(sdf);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
