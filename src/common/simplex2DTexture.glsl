#pragma webpack include ./constants.glsl
#pragma webpack include ./triFns.glsl

uniform sampler2D gradients;

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
  if (length(xy_d) > 0.45) return -0.0;
  float r = 1.0;
  float part = pow(max(0.0, 1.0 - dot(xy_d, xy_d)), 4.0);
  //    vec2 gradient = texelFetch(gradients, ivec2(cell), 0).xy;
  vec2 gradient = randomGradient(cell);
  return part * dot(gradient, xy_d);
}

// resulting range is [-0.68, 0.68]. Use unmix to normalize if necessary.
float simplex2D(vec2 xy) {
  vec3 uvR = xy2tri(xy);
  vec2 baseUV = floor(uvR.xy);

  float a = dotGridGradient2(tri2xy(baseUV), xy);
  float b = dotGridGradient2(tri2xy(baseUV + vec2(1, 0)), xy);
  float c = dotGridGradient2(tri2xy(baseUV + vec2(0, 1)), xy);
  float d = dotGridGradient2(tri2xy(baseUV + vec2(1, 1)), xy);

  return b + c + mix(a, d, uvR.z);
}

// #pragma glslify: export(simplex2D)

