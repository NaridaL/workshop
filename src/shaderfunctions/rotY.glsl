mat3 rotY(float angle) {
  float c = cos(angle),
    s = sin(angle);
  return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
}

#pragma glslify: export(rotY)
