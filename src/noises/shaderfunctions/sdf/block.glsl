#pragma glslify: max3 = require(../max3.glsl)

float block(vec3 minCorner, vec3 maxCorner, vec3 p) {
    return max(max3(p - maxCorner), max3(-p + minCorner));
}

#pragma glslify: export(block)