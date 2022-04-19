// Pyramid with tip at (0,0,0), up = z
// c is the bottom corner. c.xy should be positive, c.z negative.
vec2 sdPyramid(vec3 c, vec3 p) {
  // pyramid is symmetric in XZ and YZ planes
  p.xy = abs(p.xy);
  bool flip = p.y * c.x > p.x * c.y; // p.y/p.x > c.y/c.x
  c.xy = flip ? c.yx : c.xy;
  p.xy = flip ? p.yx : p.xy;
  vec3 cc = c / dot(c, c);
  vec3 qx1 = normalize(vec3(-c.z, 0.0, c.x));
  vec3 pOnQx = p - qx1 * dot(p, qx1);
  float dx = dot(p, qx1);
  float maxY = c.y * (pOnQx.x / c.x);
  if (p.z <= c.z || pOnQx.z <= c.z) {
    if (p.x <= c.x) {
      // vertically underneath pyramid
      return vec2(-p.z + c.z, 2.0);
    } else {
      float aa = distance(p, vec3(c.x, min(c.y, p.y), c.z));
      return vec2(aa, 3.0);
    }
  } else if (pOnQx.y > maxY || pOnQx.z > 0.0) {
    float xx = dot(cc, p);
    float aa = length(p - clamp(xx, 0.0, 1.0) * c);

    return vec2(aa, 1.0);
  } else {
    // need max for negativ values above base
    return vec2(max(dx, -p.z + c.z), 0.0);
  }
}

// #pragma glslify: export(sdPyramid)

