#pragma webpack include ../constants.glsl

float addChamfer(float d, float a, float b) {
  float tillet = (a + b - d) * SQRT1_2;
  return min(tillet, min(a, b));
}

// #pragma glslify: export(addChamfer)

