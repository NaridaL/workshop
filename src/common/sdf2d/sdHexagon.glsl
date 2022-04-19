#pragma webpack include ../constants.glsl

/**
 * Signed distance function (SDF) of a regular hexagon centered at the origin
 * with circumradius of `r`.
 *
 * The inscribed radius is r\*sqrt(3)/2. The side length is r.
 *
 * ```
 *    ____q=r*(1/2, sqrt(3)/2)
 *  /     \_
 * /   .O  \_
 * \      /
 *  \____/
 * ```
 */
float sdHexagon(float r, vec2 p) {
  const vec2 v330 = vec2(-SQRT3_2, 0.5);
  float k = 0.577350269;
  // Mirror vertically and horizontally. All points are now in quadrant 1.
  p = abs(p);

  // Mirror points below the O-q line across that line.
  // All points are now between 60 and 120 degrees.
  p -= 2.0 * v330 * min(dot(v330, p), 0.0);

  // Closest point to p on the -q - q segment:
  vec2 closest = vec2(clamp(p.x, -0.5 * r, 0.5 * r), SQRT3_2 * r);

  p -= closest;
  return length(p) * sign(p.y);
}
