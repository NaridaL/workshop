#pragma glslify: complexMul = require(./complexMul.glsl)

vec2 complexDiv(vec2 a, vec2 b) {
    vec2 bConj = vec2(b.x, -b.y);
    float divisor = complexMul(b, bConj).x;
    return complexMul(a, bConj) / divisor;
}

#pragma glslify: export(complexDiv)