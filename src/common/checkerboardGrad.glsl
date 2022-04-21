//https://iquilezles.org/articles/checkerfiltering/
float tri(float x) {
  float h = fract(x * 0.5) - 0.5;
  return 1.0 - 2.0 * abs(h);
}
vec2 tri(vec2 x) {
  vec2 h = fract(x * 0.5) - 0.5;
  return 1.0 - 2.0 * abs(h);
}

float checkerboardGrad(vec2 uv) {
  vec2 w = max(abs(dFdx(uv)), abs(dFdy(uv))) + 0.005; // filter kernel
  vec2 i = (tri(uv + 0.5 * w) - tri(uv - 0.5 * w)) / w; // analytical integral (box filter)
  return 0.5 - 0.5 * i.x * i.y; // xor pattern
}
