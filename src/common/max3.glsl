float max3(float a, float b, float c) {
  return max(a, max(b, c));
}
float max3(vec3 v) {
  return max(v.x, max(v.y, v.z));
}

// #pragma glslify: export(max3)

