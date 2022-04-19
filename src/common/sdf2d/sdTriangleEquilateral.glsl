#pragma webpack include ../constants.glsl

/**
 * Signed distance function (SDF) of an equilateral triangle centered at the
 * origin with circumradius of 1.
 *
 * The inradius |(a + b)/2| is 0.5.
 *
 * The side length (|ab|) is sqrt(3).
 *
 * ```
 *        a (0, 1)
 *       /\_
 *     /    \_
 *   /    .   \_
 * /____________\ b (sqrt(3)/2, -1/2)
 * c              at -30° from 0
 * ```
 */
float sdTriangleEquilateral(vec2 p) {
  // Mirror vertically; p is then always on right.
  p.x = abs(p.x);

  // If p is above the line origin-b, mirror it across that line.
  // Use dot product with vector at 60° to check.
  if (0.5 * p.x + p.y * SQRT3_2 > 0.0) {
    p = vec2(0.5 * p.x - SQRT3_2 * p.y, -SQRT3_2 * p.x - 0.5 * p.y);
  }
  p.x = abs(p.x);

  // We now just need to calculate the distance from the segment bc to p.
  // We move the segment/p so that the distance is just the length of p.
  p.y += 0.5;
  p.x -= clamp(p.x, 0.0, SQRT3_2);

  // After `p.y += 0.5;`, all points inside the triangle are above the x axis,
  // so we can use that as the sign.
  return length(p) * -sign(p.y);
}
float sdTriangleEquilateral(float a, vec2 p) {
  return sdTriangleEquilateral(p / a) * a;
}

// #pragma glslify: export(sdTriangleEquilateral)

