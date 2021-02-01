float cylinder(float r, float height, vec3 p) {
    float a = length(p.xy) - r;
    float b = p.z - height;
    float c = -p.z;
    return max(a, max(b, c));
}

#pragma glslify: export(cylinder)