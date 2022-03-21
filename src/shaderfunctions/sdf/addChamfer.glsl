const float SQRT1_2 = 0.7071067811865476;

float addChamfer(float d, float a, float b) {
  float tillet = (a + b - d) * SQRT1_2;
  return min(tillet, min(a, b));
}

#pragma glslify: export(addChamfer)
