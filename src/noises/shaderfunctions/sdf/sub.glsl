float sub(float from, float what) {
    return max(from, -what);
}

#pragma glslify: export(sub)