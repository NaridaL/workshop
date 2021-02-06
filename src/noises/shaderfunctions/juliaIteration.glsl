const float rSqr = r * r;

uint juliaIteration(vec2 start) {
    vec2 p = start;
    for (uint i = uint(0); i < maxit; i++) {
        p = f(p);
        if (dot(p, p) > rSqr) {
            return i;
        }
    }
    return uint(0);
}

#pragma glslify: export(juliaIteration)
