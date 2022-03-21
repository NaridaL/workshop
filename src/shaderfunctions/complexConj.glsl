vec2 complexConj(vec2 z) {
  return vec2(z.x, -z.y);
}

#pragma glslify: export(complexConj)
