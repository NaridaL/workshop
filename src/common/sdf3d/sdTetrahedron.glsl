#pragma webpack include ../constants.glsl
#pragma webpack include ../colors.glsl
#pragma webpack include ./sdCapsule.glsl
#pragma webpack include ./sdBox.glsl

/**
 * Signed distance function (SDF) of a tetrahedron centered at the origin.
 *
 * The corners are at `a/b = (+-1,0,sqrt(1/2))` and `c/d = (0,+-1,-sqrt(1/2))`.
 *
 * The side length is `||`
 *
 * The outscribed sphere has a radius of `sqrt(3/2)`.
 *
 * The inscribed sphere has a radius of `sqrt(1/6)`. This is calculated using
 * the fact that the triangle defined by `mid(a,b) = (0,0,sqrt(1/2))`, `c` and
 * `mid(c,d) = (0,0,-sqrt(1/2))` is similar to the triangle `mid(a,b)`, `q`, and
 * `O`.
 *
 * For rounded edges, use TODO.
 *
 * ```
 *           ^ Z
 *           |(+-1, sqrt(1/2))
 *          /\_
 *        /    \.q = closest point to center on face
 *      /    .   \__> Y
 *    /            \_
 *  /________________\_(0,-1,sqrt(1/2))
 * (0,-1,-sqrt(1/2))
 * ```
 */
float sdTetrahedron(float s, vec3 p) {
  const vec3 a = vec3(1, 0, SQRT1_2);
  const vec3 b = vec3(-1, 0, SQRT1_2);
  const vec3 c = vec3(0, 1, -SQRT1_2);
  const vec3 d = vec3(0, -1, -SQRT1_2);
  const vec3 midBC = 0.5 * (b + c);
  const vec3 mirror = normalize(cross(midBC - d, midBC - a));

  // Tetra is symmetric in X and Y axes. RED surface in image.
  p.xy = abs(p.xy);
  // The part z < 0 is symmetric if we rotate it by 90°. BLUE surface in image.
  if (p.z < 0.0) {
    p = vec3(p.y, p.x, -p.z);
  }
  // Points below the plane through a, d and mid(b,c) are mirrored through it.
  // GREEN surface in image.
  p -= 2.0 * mirror * min(dot(p, mirror), 0.0);
  // After mirror some points are negative, abs again:
  p.xy = abs(p.xy);

  // Points are now either above the white surface, or above the positive ab segment.
  // We shift the coordinate system so that a is now at the origin.
  p -= vec3(1, 0, SQRT1_2) * s;
  // Finally, we move points which are directely above the face parallel along
  // it to a/origin. We can then calculate the sdf as length(p).
  p.x = max(p.x, 0.0);
  vec3 midABToC1 = normalize(vec3(0, 1, -SQRT2));

  p -= max(dot(midABToC1, p), 0.0) * midABToC1;
  return sign(p.z) * length(p);
}

// Same function but also outputs color for explanation image:
//float sdTetrahedron(float s, vec3 p, out vec3 color) {
//  //  return distance(vec3(1), p) - 0.2;
//  const vec3 a = vec3(0, -1, -SQRT1_2);
//  const vec3 b = vec3(0, 1, -SQRT1_2);
//  const vec3 c = vec3(1, 0, SQRT1_2);
//  const vec3 d = vec3(-1, 0, SQRT1_2);
//  const vec3 x = 0.5 * (b + d);
//  const vec3 mirror = normalize(cross(x - a, x - c));
//
//  color = WHITE;
//  if (p.xy != abs(p.xy)) {
//    p.xy = abs(p.xy);
//    if (color == WHITE) color = RED;
//  }
//  if (p.z < 0.0) {
//    p = vec3(p.y, p.x, -p.z);
//    if (color == WHITE) color = BLUE;
//  }
//  if (dot(p, mirror) < 0.0) {
//    if (color == WHITE) color = GREEN;
//    p -= 2.0 * mirror * min(dot(p, mirror), 0.0);
//  }
//  p.xy = abs(p.xy);
//  p -= vec3(1, 0, SQRT1_2);
//  p.x = max(p.x, 0.0);
//  vec3 fgh = normalize(vec3(0, 1, -SQRT2));
//
//  p -= max(dot(fgh, p), 0.0) * fgh;
//  return sign(p.z) * length(p);
//}

