uniform sampler2D gradients;


float dotGridGradient(vec2 cell, vec2 pos) {
    vec2 d = cell - pos;

    vec2 gradient = texelFetch(gradients, ivec2(cell), 0).xy;
    return dot(gradient, d);
}

float mixx(float a, float b, float t) {
     return mix(a, b, smoothstep(0.0, 1.0, t));
//    return mix(a, b, t);
}

// resulting range is [-0.68, 0.68]. Use unmix to normalize if necessary.
float perlin2D(vec2 xy) {
    float x0 = floor(xy.x);
    float x1 = x0 + 1.0;
    float y0 = floor(xy.y);
    float y1 = y0 + 1.0;

    // Interpolate between grid point gradients
    float n00 = dotGridGradient(vec2(x0, y0), xy);
    float n10 = dotGridGradient(vec2(x1, y0), xy);
    float ny0 = mixx(n00, n10, xy.x - x0);

    float n01 = dotGridGradient(vec2(x0, y1), xy);
    float n11 = dotGridGradient(vec2(x1, y1), xy);
    float ny1 = mixx(n01, n11, xy.x - x0);

    return mixx(ny0, ny1, xy.y - y0);
}

#pragma glslify: export(perlin2D)