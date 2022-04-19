ivec2 cube2oddr(ivec3 cube) {
  int col = cube.x + (cube.y - (cube.y & 1)) / 2;
  int row = cube.y;
  return ivec2(col, row);
}

// #pragma glslify: export(oddr2cube)

