const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

vec4 visualize(vec4 lowColor, vec4 highColor, float t) {
  float isLow = float(t < 0.0);
  float isHigh = float(t > 1.0);
  float isMid = 1.0 - isLow - isHigh;
  return lowColor * isLow + isMid * vec4(t, t, t, 1.0) + highColor * isHigh;
}

vec4 visualize(float t) {
  return visualize(blue, red, t);
}

#pragma glslify: export(visualize)