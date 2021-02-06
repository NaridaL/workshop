vec3 raymarching(vec3 start, vec3 dir1) {
    vec3 pos = start;
    for (int i = 0; i < 500; i++) {
        float d = sdf(pos);
        if (d < 0.) break;
        pos = pos + dir1 * d;
    }
    return pos;
}

#pragma glslify: export(raymarching)