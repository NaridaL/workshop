#pragma webpack include ./sdCylinder.glsl
#pragma webpack include ../constants.glsl
#pragma webpack include ./sdCone.glsl
vec3 perpendicularVector(vec3 a) {
  return cross(a, abs(a.z) > abs(a.x) ? vec3(0, 0, 1) : vec3(0, 1, 0));
}
/**
 * Signed distance function (SDF) of an arrow. The arrow goes along the X axis.
 * The shaft of the arrow has thickness TODO. The tip of the arrow has 30°
 * angle, length of TODO, with the widest point being.
 */
float sdArrow(float length, vec3 p) {
  float r = 0.01;
  return min(
    sdCylinder(
      0.02 - r,
      0.5 * (length - 0.1) - r,
      p.yzx - vec3(0, 0, 0.5 * (length - 0.1))
    ) -
      r,
    sdCone(
      vec2(sin(15.0 * DEGREE), cos(15.0 * DEGREE)),
      0.15 - r,
      p.zxy - vec3(0, length - r, 0)
    ) -
      r
  );
}
float sdArrow(vec3 a, vec3 b, vec3 p) {
  vec3 x = normalize(b - a);
  vec3 y = normalize(perpendicularVector(x));
  vec3 z = cross(x, y);
  return sdArrow(length(b - a), inverse(mat3(x, y, z)) * (p - a));
}
