#pragma glslify: unmix = require(./unmix.glsl)

vec3 polar(float radius, float phi, float z) {
  return vec3(radius * cos(phi), radius * sin(phi), z);
}

vec2 polar(float radius, float phi) {
  return vec2(radius * cos(phi), radius * sin(phi));
}

#pragma glslify: export(polar)