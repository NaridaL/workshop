const float rSqr = r * r;

vec3 juliaIteration(vec2 start) {
  vec2 p = start;
  for (uint i = uint(0); i < maxit; i++) {
    p = f(p);
    if (dot(p, p) > rSqr) {
      return vec3(p, float(i));
    }
  }
  return vec3(p, float(maxit));
}

#pragma glslify: export(juliaIteration)
