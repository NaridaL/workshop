const float SQRT2 = sqrt(2.0);
const float SQRT1_2 = sqrt(1.0 / 2.0);

/**
 * Signed distance function (SDF) of a simple heart constructed from two
 * semi-circles and 2 segments.
 *
 * The tip of the heart is at the origin. The "lobes" have centers at (+-0.25,
 * 0.75) and radius SQRT(2)/4.
 */
float sdHeart(vec2 p) {
  // Mirror vertically; p is then always on right.
  p.x = abs(p.x);

  if (p.y + p.x > 1.0) return distance(p, vec2(0.25, 0.75)) - SQRT2 / 4.0;
  return min(
    distance(p, vec2(0.0, 1.0)),
    length(p - 0.5 * max(p.x + p.y, 0.0))
  ) *
  sign(p.x - p.y);
}
float sdHeart(float a, vec2 p) {
  return sdHeart(p / a) * a;
}

// #pragma glslify: export(sdHeart)

