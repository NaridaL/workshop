#pragma glslify: unmix = require(./unmix.glsl)

vec2 toPolar(vec2 xy) {
    return vec2(length(xy), atan(xy.y, xy.x));
}

#pragma glslify: export(toPolar)