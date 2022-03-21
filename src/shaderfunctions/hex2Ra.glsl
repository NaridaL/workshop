vec2 hex2Ra(vec3 hex) {
  float y = hex.t * 0.866;
  float x = hex.s + hex.t / 2.0;
  return vec2(x, y);
}

#pragma glslify: export(hex2Ra)
