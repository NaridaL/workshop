#pragma glslify: unmix = require(./unmix.glsl)

vec3 fromPolar(float radius, float phi, float z) {
  return vec3(radius * cos(phi), radius * sin(phi), z);
}

vec2 fromPolar(float radius, float phi) {
  return vec2(radius * cos(phi), radius * sin(phi));
}

vec2 fromPolar(vec2 polar) {
  return fromPolar(polar.x, polar.y);
}

#pragma glslify: export(fromPolar)
