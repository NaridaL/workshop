#pragma glslify: unmix = require(./unmix.glsl)

vec3 polar(float radius, float phi, float z) {
  return vec3(radius * cos(phi), radius * sin(phi), z);
}

#pragma glslify: export(polar)