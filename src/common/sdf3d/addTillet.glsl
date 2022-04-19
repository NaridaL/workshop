float addTillet(float r, float a, float b) {
  if (a < r && b < r) {
    return r - distance(vec2(a, b), vec2(r));
  } else {
    return min(a, b);
  }
}

// #pragma glslify: export(addTillet)

