uniform sampler2D gradients;
uniform int bandCount;

vec3 xy2tri(vec2 xy) {
  float v = xy.y / 0.866;
  float u = xy.x - v / 2.0;
  float R = float(mod(u, 1.0) + mod(v, 1.0) > 1.0);
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
const float SQRT2 = 1.4142135623730951;
const float GOLDEN_RATIO = 1.61803398875;
const float SQRT3 = 1.732050807568877;
/* Create random direction vector
 */
vec2 randomGradient(vec2 i) {
  // Random float. No precomputed gradients mean this works for any number of grid coordinates
  float random =
    2920.0 *
    sin(float(i.x) * 2.1942 + float(i.y) * 1.71324 + 8.912) *
    cos(float(i.x) * 2.3157 * float(i.y) * 2.17832 + 9.758);
  //    random = (i.x + 1667.) * (i.x + 2083.) * (i.y + 2659.) * (i.y * 50.77 + .3769);
  //    random = sin(SQRT2 * i.x) + cos(GOLDEN_RATIO * i.y) + tan((i.x + i.y) * SQRT3);
  return vec2(cos(random), sin(random));
}

float dotGridGradient2(vec2 cell, vec2 pos) {
  vec2 xy_d = cell - pos;
  if (length(xy_d) > 0.4) return 0.0;
  float r = 1.0;
  float part = pow(max(0.0, 0.999 - dot(xy_d, xy_d)), 4.0);
  //    vec2 gradient = texelFetch(gradients, ivec2(cell), 0).xy;
  vec2 gradient = randomGradient(cell);
  return part * dot(gradient, xy_d);
}

// resulting range is [-0.68, 0.68]. Use unmix to normalize if necessary.
float simplex2D(vec2 xy) {
  vec3 uvR = xy2tri(xy);
  ivec2 baseUV = ivec2(uvR.xy);

  float a = dotGridGradient2(tri2xy(vec2(baseUV)), xy);
  float b = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(1, 0))), xy);
  float c = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(0, 1))), xy);
  float d = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(1, 1))), xy);

  return b + c + mix(a, d, uvR.z);
}

// #pragma glslify: export(simplex2D)

