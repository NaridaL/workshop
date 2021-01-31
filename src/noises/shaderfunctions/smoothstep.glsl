float smoothstep(float x) {
    return x * x * (3 - 2 * x);
}

#pragma glslify: export(smoothstep)