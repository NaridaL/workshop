#pragma webpack include ./max3.glsl

float hexSdf(vec3 hex) {
  return max3(abs(hex.yzx + hex.zxy / 2.0));
}

// #pragma glslify: export(hexSdf)

