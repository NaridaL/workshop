mat3 rotZ(float angle) {
  float c = cos(angle),
    s = sin(angle);
  return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
}

#pragma glslify: export(rotZ)
