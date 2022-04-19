vec4 visualize(vec4 lowColor, vec4 highColor, float t) {
  float isLow = float(t < 0.0);
  float isHigh = float(t > 1.0);
  float isMid = 1.0 - isLow - isHigh;
  return lowColor * isLow + isMid * vec4(t, t, t, 1.0) + highColor * isHigh;
}

vec4 visualize(float t) {
  const vec4 BLUE = vec4(0.0, 0.0, 1.0, 1.0);
  const vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);
  return visualize(BLUE, RED, t);
}

// #pragma glslify: export(visualize)

