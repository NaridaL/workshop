#pragma webpack include ./polar.glsl

vec2 complexConj(vec2 z) {
  return vec2(z.x, -z.y);
}

vec2 complexMul(vec2 a, vec2 b) {
  return vec2(a.x * b.x - a.y * b.y, a.y * b.x + a.x * b.y);
}

vec2 complexDiv(vec2 a, vec2 b) {
  vec2 bConj = vec2(b.x, -b.y);
  float divisor = complexMul(b, bConj).x;
  return complexMul(a, bConj) / divisor;
}

// return e^z
vec2 complexPow(vec2 z) {
  // e^(re + i * im)
  // = e^re * e^(i * im)
  return fromPolar(exp(z.x), z.y);
}

// return w^z
vec2 complexPow(vec2 w, float z) {
  // w = r * e ^ (i * phi)
  // ln(w) = ln(r) + i * phi
  // w^z = e^(z * log(w)) = e^(z * (ln(r) + i * (phi))
  vec2 wPolar = toPolar(w);
  vec2 eExp = z * vec2(log(wPolar.x), wPolar.y);
  return complexPow(eExp);
}
