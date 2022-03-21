bool between(float min, float max, float value) {
  return min <= value && value <= max;
}

#pragma glslify: export(between)
