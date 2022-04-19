#version 300 es

precision highp float;

#pragma webpack include ./sdHelloWorld.glsl
#pragma webpack include ../common/sdf2d/sdTriangle.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
uniform float a;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 p) {
  return sdHelloWorld(p * 5.0) / 5.0;
}

void main() {
  vec2 p = (coord - 0.5) * iResolution * 0.1;
  float dist = sdf(p);
  float u_buffer = a;
  float u_gamma = 0.05;
  float alpha = smoothstep(u_buffer - u_gamma, u_buffer + u_gamma, dist);
  vec3 color = VIZZ(sdf);
  color = mix(ungamma(colorBackground), ungamma(colorPrimary), alpha);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
