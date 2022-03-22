#version 300 es
precision highp float;

#pragma glslify: banded = require(../shaderfunctions/banded.glsl)
#pragma glslify: between = require(../shaderfunctions/between.glsl)
#pragma glslify: simplex2D = require(../shaderfunctions/simplex2DTexture.glsl)
#pragma glslify: remix = require(../shaderfunctions/remix.glsl)
#pragma glslify: complexMul = require(../shaderfunctions/complexMul.glsl)
#pragma glslify: complexDiv = require(../shaderfunctions/complexDiv.glsl)
#pragma glslify: complexPow = require(../shaderfunctions/complexPow.glsl)
#pragma glslify: unmix = require(../shaderfunctions/unmix.glsl)
#pragma glslify: waves = require(../shaderfunctions/waves.glsl)
#pragma glslify: visualize = require(../shaderfunctions/visualize.glsl)
#pragma glslify: ra2Hex = require(../shaderfunctions/ra2Hex.glsl)
#pragma glslify: hex2Ra = require(../shaderfunctions/hex2Ra.glsl)
#pragma glslify: hexRound = require(../shaderfunctions/hexRound.glsl)
#pragma glslify: fromPolar = require(../shaderfunctions/fromPolar.glsl)
#pragma glslify: toPolar = require(../shaderfunctions/toPolar.glsl)
#pragma glslify: hexSdf = require(../shaderfunctions/hexSdf.glsl)
#pragma glslify: rotY = require(../shaderfunctions/rotY.glsl)

uniform sampler2D texture;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBg;
uniform float a;
uniform float b;
uniform int bandCount;
uniform float secs;
in vec2 coord;
out vec4 fragColor;

const vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
const float GOLDEN_RATIO = 1.61803398875;

const vec2 c = vec2(-0.4, 0.6);
vec2 f(vec2 z) {
  //    return complexMul(z, z) + fromPolar(0.7885,(a + b/50.)*6.);
  return complexMul(z, z) + fromPolar(0.7885, secs / 2.0);
  //    return complexMul(z, z)  + fromPolar(0.7885,4.);
}

vec2 complexSqr(vec2 z) {
  return complexMul(z, z);
}
vec2 f2(vec2 z) {
  const float n = 8.0;
  return complexDiv(
    1.0 + (n - 1.0) * complexPow(z, n),
    n * complexPow(z, n - 1.0)
  );
}

vec2 f3(vec2 z) {
  vec2 z2 = complexMul(z, z);
  vec2 z3 = complexMul(z2, z);
  return complexDiv(vec2(1.0, 0.0) + 2.0 * z3, 3.0 * z2);
}
vec2 flf(vec2 z) {
  vec2 z2 = complexMul(z, z);
  vec2 z3 = complexMul(z2, z);
  return complexDiv(vec2(1.0, 0.0) - z3 / 6.0, complexSqr(z - z2 / 2.0)) +
  vec2(-a, b);
}

#pragma glslify: julia = require(../shaderfunctions/juliaIteration.glsl, r=2., f=f, maxit=20u)

void main() {
  vec3 res = julia(coord);
  float f = res.z / 20.0;

  //    fragColor = mix(colorBg, colorPrimary, banded(bandCount, unmix(-.35, .35, f2)));
  fragColor = mix(colorBg, colorPrimary, min(banded(bandCount, f), 1.0));
  fragColor = vec4(res, 1.0);
  //    fragColor = visualize(f);
  //    fragColor = visualize(float(i == 1000u));
}
