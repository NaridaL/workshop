float sphere(float radius, vec3 p) {
    return length(p) - radius;
}

#pragma glslify: export(sphere)