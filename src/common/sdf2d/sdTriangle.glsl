/**
 * Signed distance function (SDF) of an arbitrary triangle defined by the points
 * a, b and c.
 *
 * ```
 *     a
 *    /\_            p
 *   /   \_
 *  /      \_
 * /_________\ c
 * b
 * ```
 */
float sdTriangle(vec2 a, vec2 b, vec2 c, vec2 p) {
  vec2 ab = b - a;
  vec2 bc = c - b;
  vec2 ca = a - c;

  vec2 ap = p - a;
  vec2 bp = p - b;
  vec2 cp = p - c;

  // We calculate the distance of each of the three segements ab, bc, ca to p.
  // To calculate the distance of p to a segment ab, we first calculate t such
  // that a + t * ab is the closest point on the line to p.
  // t is then clamped to [0; 1] so that we have the closest point on the segment,
  // not on the line.
  float abt = clamp(dot(ab, ap) / dot(ab, ab), 0.0, 1.0);
  float bct = clamp(dot(bc, bp) / dot(bc, bc), 0.0, 1.0);
  float cat = clamp(dot(ca, cp) / dot(ca, ca), 0.0, 1.0);
  // Vectors "closest point on segment" -> p
  vec2 ab2p = ab * abt - ap;
  vec2 bc2p = bc * bct - bp;
  vec2 ca2p = ca * cat - cp;

  float minDistanceSquared = min(
    min(dot(ab2p, ab2p), dot(bc2p, bc2p)),
    dot(ca2p, ca2p)
  );
  // The function should return negative values for points inside the triangle.
  // If the points are arranged CCW, he point is outside if the dot product of
  // ap and "ac rotated CCW by 90°" is greater than 0.
  // Same for the other two segments.
  // ccw is 1 if CCW, -1 if CW. This flips the results of the dot products so
  // that the result is correct if the triangle is CW.
  float ccw = sign(ab.x * ca.y - ab.y * ca.x);
  bool isOutside =
    ccw * (ap.x * ab.y - ap.y * ab.x) < 0.0 ||
    ccw * (bp.x * bc.y - bp.y * bc.x) < 0.0 ||
    ccw * (cp.x * ca.y - cp.y * ca.x) < 0.0;
  return sqrt(minDistanceSquared) * mix(-1.0, 1.0, isOutside);
}

// #pragma glslify: export(sdTriangle)

