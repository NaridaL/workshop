#pragma webpack include ./max3.glsl
#pragma webpack include ./constants.glsl

vec3 hexRound(vec3 hex) {
  vec3 r = floor(hex + 0.5);
  vec3 diff = abs(r - hex);

  if (diff.x > diff.y && diff.x > diff.z) {
    r.x = -(r.y + r.z);
  } else if (diff.y > diff.z) {
    r.y = -(r.x + r.z);
  } else {
    r.z = -(r.x + r.y);
  }

  return r;
}
vec2 hex2Ra(vec3 hex) {
  float y = hex.t * SQRT3_2;
  float x = hex.s + hex.t / 2.0;
  return vec2(x, y);
}

float hexSdf(vec3 hex) {
  return max3(abs(hex.yzx + hex.zxy / 2.0));
}
vec3 ra2Hex(vec2 xy) {
  float hex_t = xy.y / SQRT3_2;
  float hex_s = xy.x - hex_t / 2.0;
  return vec3(hex_s, hex_t, -(hex_s + hex_t));
}
