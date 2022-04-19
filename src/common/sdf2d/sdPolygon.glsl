float sdPolygon(vec2[SD_POLYGON_MAX_VERTS] vs, vec2 p) {
  float distSqr = dot(p - vs[0], p - vs[0]);
  float s = 1.0;
  for (int i = 0, j = vs.length - 1; i < vs.length; j = i, i++) {
    vec2 vij = vs[j] - vs[i];
    vec2 w = p - vs[i];
    vec2 b = w - vij * clamp(dot(w, vij) / dot(vij, vij), 0.0, 1.0);
    distSqr = min(distSqr, dot(b, b));
    bvec3 c = bvec3(p.y >= vs[i].y, p.y < vs[j].y, vij.x * w.y > vij.y * w.x);
    if (all(c) || !any(c)) s *= -1.0;
  }
  return s * sqrt(distSqr);
}
void mainImage(out vec4 fragColor, vec2 fragCoord) {
  vec2 p = (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;
  //p *= 2.;
  p += 0.25;
  vec2[N] poly;
  float t = iTime * 0.04;
  for (int i = 0; i < corners; i++) {
    float f = float(i);
    vec2 a = vec2(
      cos(t * f * (sqrt(3.0) * 0.5 + 0.5)),
      sin(t * f * (sqrt(5.0) * 0.5 + 0.5))
    );
    //    vec2 a = vec2(
    //      cos(t * f * (sqrt(3.0) * 0.5 + 0.5)),
    //      sin((t + f) * (sqrt(5.0) * 0.5 + 0.5))
    //    );
    poly[i] = cos(a * 2.0);
  }
  float d = sdPoly(poly, p, corners);
  //...

  vec3 col = vec3(1.0) - sign(d) * vec3(0.1, 0.4, 0.7);
  col *= 1.0 - exp(-2.0 * abs(d));
  col *= 0.8 + 0.2 * cos(120.0 * d);
  col = mix(col, vec3(1.0), 1.0 - smoothstep(0.0, 0.02, abs(d)));

  fragColor = vec4(col, 1.0);
}
