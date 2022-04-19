#pragma webpack include ./unmix.glsl

float remix(float fromA, float fromB, float toA, float toB, float value) {
  return mix(toA, toB, unmix(fromA, fromB, value));
}

vec4 remix(float fromA, float fromB, vec4 toA, vec4 toB, float value) {
  return mix(toA, toB, unmix(fromA, fromB, value));
}

// #pragma glslify: export(remix)

