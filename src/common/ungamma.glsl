vec3 ungamma(vec4 col) {
  return pow(col.rgb, vec3(2.2));
}
vec3 ungamma(vec3 col) {
  return pow(col, vec3(2.2));
}
