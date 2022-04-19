#pragma webpack include ../constants.glsl
#pragma webpack include ../polar.glsl

/**

 */
float sdNgon(float sides, vec2 p) {
  vec2 polar = toPolar(p);
  float f = TAU / sides;
  polar.y = (fract(polar.y / f) - 0.5) * f;
  p = fromPolar(polar);
  //  return distance(p, vec2(2, 0));
  float xx = sin(PI / sides);
  vec2 closest = vec2(cos(PI / sides), clamp(p.y, -xx, xx));
  p -= closest;
  return length(p) * sign(p.x);
}
