float sdRectangle(vec2 dim, vec2 p) {
  vec2 d = abs(p) - 0.5 * dim;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdRectangle(float width, float height, vec2 p) {
  return sdRectangle(vec2(width, height), p);
}

