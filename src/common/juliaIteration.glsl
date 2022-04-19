#define JULIA_ITERATION(NAME, F, R, MAXIT)                                     \
  vec3 NAME(vec2 start) {                                                      \
    const float rSqr = (R) * (R);                                              \
    vec2 p = start;                                                            \
    for (uint i = uint(0); i < (MAXIT); i++) {                                 \
      p = F(p);                                                                \
      if (dot(p, p) > rSqr) {                                                  \
        return vec3(p, float(i));                                              \
      }                                                                        \
    }                                                                          \
    return vec3(p, float(MAXIT));                                              \
  }
