float sdSphere(float radius, vec3 p) {
  return length(p) - radius;
}

// #pragma glslify: export(sdSphere)

