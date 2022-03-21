mat3 rotX(float angle) {
  float c = cos(angle),
    s = sin(angle);
  return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
}

#pragma glslify: export(rotX)
