#pragma webpack include ../max3.glsl

float sdDodecahedron(float s, vec3 p, out vec3 color) {
  const float PHI = GOLDEN_RATIO;
  color = vec3(0.2);
  if (p != abs(p)) {
    p = abs(p);
    if (color == vec3(0.2)) color = RED;
  }
  p = abs(p);
  const vec3 fv =
    vec3(1.0 / PHI, 0, PHI) + 2.0 * vec3(1, 0, 1) + 2.0 * vec3(PHI, 0, 0);
  const vec3 fv2 =
    vec3(PHI, 1.0 / PHI, 0) + 2.0 * vec3(1, 1, 0) + 2.0 * vec3(0, PHI, 0);
  const vec3 fv3 =
    vec3(0, PHI, 1.0 / PHI) + 2.0 * vec3(0, 1, 1) + 2.0 * vec3(0, 0, PHI);
  return max3(
    dot(normalize(fv), p),
    dot(normalize(fv2), p),
    dot(normalize(fv3), p)
  ) -
  s;
  //  float m = p.x + p.y + p.z - s;
  //  vec3 q;
  //  if (3.0 * p.x < m) q = p.xyz;
  //  else if (3.0 * p.y < m) q = p.yzx;
  //  else if (3.0 * p.z < m) q = p.zxy;
  //  else return m * 0.57735027;
  //
  //  float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
  //  return length(vec3(q.x, q.y - s + k, q.z - k));
}
float sdDodecahedron(float s, vec3 p) {
  vec3 c;
  return sdDodecahedron(s, p, c);
}
