vec3 transform(mat4 pm, vec3 p) {
  vec4 pStar = pm * vec4(p, 1);
  return pStar.xyz / pStar.w;
}

vec2 transform(mat4 pm, vec2 p) {
  vec4 pStar = pm * vec4(p, 0, 1);
  return pStar.xy / pStar.w;
}
