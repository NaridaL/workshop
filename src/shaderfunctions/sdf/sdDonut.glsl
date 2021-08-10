float sdDonut(float r0, float r1, vec3 p) {
    vec3 closestCenter = vec3(normalize(p.xy) * r0, 0.0);
    return distance(closestCenter, p) - r1;
}

#pragma glslify: export(sdDonut)