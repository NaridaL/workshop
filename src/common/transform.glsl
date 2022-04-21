vec3 transform(mat4 pm, vec3 p) {
  vec4 pStar = pm * vec4(p, 1.0);
  return pStar.xyz / pStar.w;
}
