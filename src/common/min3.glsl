float min3(float a, float b, float c) {
  return min(a, min(b, c));
}
float min3(vec3 v) {
  return min(v.x, min(v.y, v.z));
}

// #pragma glslify: export(min3)

