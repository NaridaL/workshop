#pragma webpack include ../../common/toPolar.glsl
#pragma webpack include ../../common/fromPolar.glsl

float sdArc(float angle, vec2 p) {
  vec2 polar = toPolar(p);
  vec2 closestPolar = vec2(polar.x = 1.0, clamp(polar.y, -angle, angle));
  vec2 closest = fromPolar(closestPolar);
  return distance(closest, p);
}

float sdArc(float angle, float radius, float thickness, vec2 p) {
  return sdArc(angle, p / radius) * radius - 0.5 * thickness;
}

// #pragma glslify: export(sdArc)

