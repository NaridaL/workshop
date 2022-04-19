ivec3 oddr2cube(ivec2 hex) {
  int x = hex.x - (hex.y - (hex.y & 1)) / 2;
  int y = hex.y;
  int z = -x - y;
  return ivec3(x, y, z);
}

// #pragma glslify: export(oddr2cube)

