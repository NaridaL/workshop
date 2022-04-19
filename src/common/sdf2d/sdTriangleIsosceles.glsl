/**
 * Signed distance function (SDF) of an isosceles triangle (two sides same
 * length). One corner is at the origin. Another corner is the passed point
 * `q`.The triangle is symmetric along the Y axis.
 *
 * `q.x` must be positive.
 *
 * ```
 * ______q
 * \    /
 *  \  /
 *   \/
 *    0
 * ```
 */
float sdTriangleIsosceles(vec2 q, vec2 p) {
  // Mirror vertically; p is then always on right.
  p.x = abs(p.x);

  // Same as sdTriangle but simplified.
  vec2 a = p - q * clamp(dot(p, q) / dot(q, q), 0.0, 1.0);
  vec2 b = p - q * vec2(clamp(p.x / q.x, 0.0, 1.0), 1.0);
  float s = -sign(q.y);
  vec2 d = min(
    vec2(dot(a, a), s * (p.x * q.y - p.y * q.x)),
    vec2(dot(b, b), s * (p.y - q.y))
  );
  return -sqrt(d.x) * sign(d.y);
}
