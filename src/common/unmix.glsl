float unmix(float a, float b, float value) {
  return (value - a) / (b - a);
}

// #pragma glslify: export(unmix)

