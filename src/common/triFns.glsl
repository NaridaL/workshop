// (x, y) -> (u, v, R)
// where u is horizontal, v is south-west to north-east
// and R is wether the it is in the right triangle
vec3 xy2tri(vec2 xy) {
  float v = xy.y / 0.866;
  float u = xy.x - v / 2.0;
  float R = float(
    mod(u + v, 2.0) > 1.0 != (mod(floor(u) + floor(v), 2.0) == 1.0)
  );
  return vec3(u, v, R);
}
vec3 triCenter(vec3 uvR) {
  vec3 base = floor(uvR);
  vec2 centerOffset = mix(vec2(1.0 / 3.0), vec2(2.0 / 3.0), uvR.z);
  return base + vec3(centerOffset, 0.0);
}
vec2 tri2xy(vec3 uvR) {
  float y = uvR.t * 0.866;
  float x = uvR.s + uvR.t / 2.0;
  return vec2(x, y);
}
vec2 tri2xy(vec2 uv) {
  float y = uv.t * 0.866;
  float x = uv.s + uv.t / 2.0;
  return vec2(x, y);
}
float triSdf(vec2 uv) {
  vec3 hex = vec3(uv.x, uv.y, -uv.x - uv.y);
  return max3(hex);
}
