vec3 opRepLim(vec3 p, vec3 cellSize, vec3 limit) {
    return p - cellSize * clamp(round(p / cellSize), vec3(0.0), limit);
}
vec2 opRepLim(vec2 p, vec2 cellSize, vec2 limit) {
    return p - cellSize * clamp(round(p / cellSize), vec2(0.0), limit);
}
float opRepLim(float p, float cellSize, float limit) {
    return p - cellSize * clamp(round(p / cellSize), 0.0, limit);
}

#pragma glslify: export(opRepLim)