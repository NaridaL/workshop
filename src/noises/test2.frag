#version 300 es
precision mediump float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/perlin2DTexture.glsl
#pragma webpack include ../common/simplex2DTexture.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/waves.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/ra2Hex.glsl
#pragma webpack include ../common/hex2Ra.glsl
#pragma webpack include ../common/hexRound.glsl
#pragma webpack include ../common/hexSdf.glsl
#pragma webpack include ../common/max3.glsl

uniform sampler2D texture;
uniform vec4 colorPrimary;
uniform float highResTimeStamp;
uniform vec4 colorSecondary;
uniform vec4 colorBg;
uniform float a;
uniform int bandCount;
in float n;
in vec2 coord;
out vec4 fragColor;

const float SQRT1_2 = 0.7071067811865476;
const float SQRT2 = 1.4142135623730951;
const float PI = 3.141592653589793;

const vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

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

mat2 rot2(float angle) {
  float c = cos(angle),
    s = sin(angle);
  return mat2(c, -s, s, c);
}

float perlin01(vec2 pos) {
  return unmix(-0.68, 0.68, perlin2D(pos));
}

float triSdf(vec2 uv) {
  vec3 hex = vec3(uv.x, uv.y, -uv.x - uv.y);
  return max3(hex);
}

void main2() {
  vec3 uvR = xy2tri(coord);
  vec3 triCenter = triCenter(uvR);
  vec2 centerXY = tri2xy(triCenter);

  vec2 d2 = coord - centerXY;

  float d = triSdf(
    xy2tri(rot2(highResTimeStamp / 1000.0 * mix(-1.0, 1.0, uvR.z)) * d2).xy *
      mix(-1.0, 1.0, uvR.z)
  );
  float isHex = float(between(0.15, 0.2, d));
  fragColor = mix(
    colorBg,
    red,
    isHex * banded(bandCount, perlin01(centerXY / 20.0))
  );

  //fragColor = visualize(blue, red, mod(floor(sheared.x) + floor(sheared.y), 2.0));

}

