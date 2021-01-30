vec3 raToHex(vec2 xy) {
    float hex_t = xy.y / 0.866;
    float hex_s = xy.x - hex_t / 2.0;
    return vec3(hex_s, hex_t, -(hex_s + hex_t));
}

#pragma glslify: export(raToHex)
