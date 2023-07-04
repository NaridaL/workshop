#pragma webpack include ../constants.glsl

float addChamfer(float d, float a, float b) {
  // exact variant, but abs is larger when a and b aren't perpendicular
  // which is worse than underestimating, which is what the simple version does.
  //  vec2 p = vec2(a, b);
  //  if (p.x < d && p.y < d) {
  //    p = rot2(0.25 * PI) * p;
  //    p.y = abs(p.y);
  //    p.y -= min(p.y, d * SQRT1_2);
  //    p.x -= d * SQRT1_2;
  //    //    p -= vec2(SQRT1_2) * clamp(dot(p, vec2(SQRT1_2)), 0.0, d);
  //    float fillet = -length(p);
  //    return -sign(p.x) * fillet;
  //  } else {
  //  }
  float tillet = (a + b - d) * SQRT1_2;
  return min(tillet, min(a, b));
}

// #pragma glslify: export(addChamfer)

