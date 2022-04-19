/**
 * Renders a transform of a coordinate system as a line grid.
 *
 * E.g.
 *
 * `p` should be p(fragCoord)
 *
 * and
 *
 * `scale` should be dp/dx(fragCoord)
 *
 * For a linear transformation (mat2 mi), you pass
 * `lineGrid(mi * fragCoord, mi)`
 */
float lineGrid(vec2 p, mat2 scale) {
  //  p -= 0.5;
  vec2 pCenter = round(p);
  vec2 gradX = vec2(1, 0) * scale;
  vec2 gradY = vec2(0, 1) * scale;
  vec2 d = abs(p - pCenter);
  float m = min(d.x / length(gradX), d.y / length(gradY));
  //  return float(m < 3.0);
  return smoothstep(-1.5, -0.0, -m);
}

// #pragma glslify: export(lineGrid)

