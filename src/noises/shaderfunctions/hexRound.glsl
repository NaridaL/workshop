vec3 hexRound(vec3 hex) {
    vec3 r = floor(hex + 0.5);
    vec3 diff = abs(r - hex);

    if (diff.x > diff.y && diff.x > diff.z) {
        r.x = -(r.y + r.z);
    } else if (diff.y > diff.z) {
        r.y = -(r.x + r.z);
    } else {
        r.z = -(r.x + r.y);
    }

    return r;
}

#pragma glslify: export(hexRound)