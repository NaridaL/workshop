#pragma glslify: max3 = require(../max3.glsl)

float block(vec3 min, vec3 maxx, vec3 p) {
    return max(max3(p - maxx), max3(-p + min));
}

#pragma glslify: export(block)