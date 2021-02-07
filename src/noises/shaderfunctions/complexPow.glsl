#pragma glslify: toPolar = require(./toPolar.glsl)
#pragma glslify: fromPolar = require(./fromPolar.glsl)

// return e^z
vec2 complexPow(vec2 z) {
    // e^(re + i * im)
    // = e^re * e^(i * im)
    return fromPolar(exp(z.x), z.y);
}

// return w^z
vec2 complexPow(vec2 w, float z) {
    // w = r * e ^ (i * phi)
    // ln(w) = ln(r) + i * phi
    // w^z = e^(z * log(w)) = e^(z * (ln(r) + i * (phi))
    vec2 wPolar = toPolar(w);
    vec2 eExp = z * vec2(log(wPolar.x), wPolar.y);
    return complexPow(eExp);
}

#pragma glslify: export(complexPow)