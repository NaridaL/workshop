float linstep(float a, float b, float t) {
  return clamp((t - a) / (b - a), 0.0, 1.0);
}
vec2 linstep(vec2 a, vec2 b, float t) {
  return clamp((t - a) / (b - a), 0.0, 1.0);
}
vec3 linstep(vec3 a, vec3 b, float t) {
  return clamp((t - a) / (b - a), 0.0, 1.0);
}
vec4 linstep(vec4 a, vec4 b, float t) {
  return clamp((t - a) / (b - a), 0.0, 1.0);
}
