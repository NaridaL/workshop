#pragma glslify: max3 = require(../max3.glsl)

float sdBox(vec3 r, vec3 p) {
    vec3 q = abs(p) - r;
    return length(max(q, 0.0)) + min(max3(q), 0.0);
}

float sdBox(vec3 r, float r2, vec3 p) {
    return sdBox(r - r2, p) - r2;
}

#pragma glslify: export(sdBox)