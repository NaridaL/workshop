float sdSegment(vec2 a, vec2 b, vec2 p) {
  vec2 ab = b - a;
  float t = dot(ab, p - a) / dot(ab, ab);
  t = clamp(t, 0.0, 1.0);
  vec2 closest = a + ab * t;

  return distance(closest, p);
}

// #pragma glslify: export(sdSegment)

