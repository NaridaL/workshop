#pragma webpack include ../constants.glsl

/**
 * Signed distance function (SDF) of a regular octagon centered at the origin
 * with circumradius of `r`.
 *
 * The inscribed radius is r\*sqrt(3)/2. The side length is r.
 *
 * ```
 *    ___q (cos(67.5°), sin(67.5°))
 *  /    \_
 * |  o  |
 * \____/
 * ```
 */
float sdOctagon(float r, vec2 p) {
  // X and Y symmetry.
  p = abs(p);
  // Mirror points below y = x line above it.
  if (p.x > p.y) p = p.yx;
  // Mirror points below line at 45+22.5=67.5 degrees above it.
  const vec2 v67_5 = vec2(0.38268343236, 0.92387953251);
  const vec2 v337_5 = vec2(v67_5.y, -v67_5.x);
  p -= 2.0 * v337_5 * max(dot(v337_5, p), 0.0);
  // Closest point to p on top segment of the octahedron
  vec2 closest = vec2(clamp(p.x, -v67_5.x * r, v67_5.x * r), r);
  p -= closest;
  return length(p) * sign(p.y);
}
float sdOctagon2(float r, vec2 p) {
  const vec3 k = vec3(-0.9238795325, 0.3826834323, 0.4142135623);
  p = abs(p);
  p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);
  p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);
  p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
  return length(p) * sign(p.y);
}
