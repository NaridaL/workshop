#pragma webpack include ./unmix.glsl

vec2 toPolar(vec2 xy) {
  return vec2(length(xy), atan(xy.y, xy.x));
}

mat2 toPolarDerivate(vec2 xy) {
  return mat2(xy.x * xy.x, xy.y * xy.y, -xy.y, xy.x) / dot(xy, xy);
}

// #pragma glslify: export(toPolar)

