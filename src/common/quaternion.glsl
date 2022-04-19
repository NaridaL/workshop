vec4 quatMult(vec4 a, vec4 b) {
  return vec4(
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  );
}

vec4 quatMult2(vec4 a, vec4 b) {
  return vec4(
    a.x * b.x - dot(a.yzw, b.yzw),
    a.x * b.yzw + b.x * a.yzw + cross(a.yzw, b.yzw)
  );
}

vec4 quatMult(vec4 a, vec4 b, vec4 c) {
  return quatMult(quatMult(a, b), c);
}

vec4 quatConjugate(vec4 a) {
  return vec4(a[0], -a[1], -a[2], -a[3]);
}
vec4 quatConjugate2(vec4 a) {
  return vec4(a.x, -a.yzw);
}

float quatNorm(vec4 a) {
  return length(a);
}

vec4 quatInverse(vec4 a) {
  return quatConjugate(a) / dot(a, a);
}

vec4 quatRotation(vec3 axis1, float angleRad) {
  return vec4(cos(0.5 * angleRad), axis1 * sin(0.5 * angleRad));
}

vec4 quatPower(vec4 q, float x) {
  float a = q.x;
  vec3 vv = q.yzw;
  vec3 n1 = normalize(vv);
  float phi = atan(length(vv), a);
  return pow(quatNorm(q), x) * vec4(cos(x * phi), n1 * sin(x * phi));
}
vec4 quatExp(vec4 q) {
  float a = q.x;
  vec3 vv = q.yzw;
  return exp(a) * vec4(cos(length(vv)), normalize(vv) * sin(length(vv)));
}

vec4 rotatePoint(vec4 quat, vec3 p) {
  return quatMult(quat, vec4(0, p), quatInverse(quat));
}
