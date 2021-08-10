vec3 opElongate(vec3 h, vec3 p) {
    return p - clamp(p, -h, h);
}
#pragma glslify: export(opElongate)
