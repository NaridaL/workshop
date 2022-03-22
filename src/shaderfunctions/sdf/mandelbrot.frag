#version 300 es
precision highp float;

#pragma glslify: banded = require(../shaderfunctions/banded.glsl)
#pragma glslify: between = require(../shaderfunctions/between.glsl)
#pragma glslify: perlin2D = require(../shaderfunctions/perlin2DTexture.glsl)
#pragma glslify: remix = require(../shaderfunctions/remix.glsl)
#pragma glslify: unmix = require(../shaderfunctions/unmix.glsl)
#pragma glslify: waves = require(../shaderfunctions/waves.glsl)
#pragma glslify: visualize = require(../shaderfunctions/visualize.glsl)
#pragma glslify: ra2Hex = require(../shaderfunctions/ra2Hex.glsl)
#pragma glslify: hex2Ra = require(../shaderfunctions/hex2Ra.glsl)
#pragma glslify: hexRound = require(../shaderfunctions/hexRound.glsl)
#pragma glslify: hexSdf = require(../shaderfunctions/hexSdf.glsl)
#pragma glslify: max3 = require(../shaderfunctions/max3.glsl)

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

vec2 fc(vec2 z, vec2 c) {
  return complexMul(z, z) + c;
}

float mandelbrot(vec2 c) {
  vec2 z = vec2(0);
  for (int i = 0; i < bandCount * 2; i++) {
    z = fc(z, c);
  }
  return length(z);
}
vec2 mandelbrotz(vec2 c) {
  vec2 z = vec2(0);
  for (int i = 0; i < bandCount * 2; i++) {
    z = fc(z, c);
  }
  return z;
}

int mandelbrotcount(vec2 c) {
  vec2 z = vec2(0);
  int i;
  for (i = 0; i < bandCount * 2; i++) {
    z = fc(z, c);
    if (length(z) > 1024.0) {
      break;
    }
  }
  return i;
}

void main() {
  vec2 cc = coord / pow(10.0, a * 10.0) - vec2(0.5301, 0.5);
  vec2 f = mandelbrotz(cc);
  float inside = float(length(f) < 1024.0);
  int c = mandelbrotcount(cc);

  //    fragColor =
  //        visualize(blue, red, f / 1000.0);

  //    fragColor = vec4(f.xy, 0.0, 1.0);
  float val = pow(float(c) / float(bandCount), 1.0 / 2.0);
  fragColor = mix(colorBg, colorPrimary, val);
  //    fragColor = visualize(blue, red, val);
}
