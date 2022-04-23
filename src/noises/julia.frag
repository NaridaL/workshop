#version 300 es
precision highp float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/constants.glsl
#pragma webpack include ../common/complex.glsl
#pragma webpack include ../common/colors.glsl
#pragma webpack include ../common/hexFns.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/simplex2DTexture.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/waves.glsl

uniform sampler2D texture;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBackground;
uniform float a;
uniform float b;
uniform int bandCount;
uniform float iTime;
uniform vec2 iMouse;
uniform vec2 iResolution;
in vec2 coord;
out vec4 fragColor;

vec2 f(vec2 z) {
  //  const vec2 c = vec2(-0.4, 0.6);
  //  vec2 c = fromPolar(0.7885, (a + b / 50.0) * 6.0);
  //  vec2 c = fromPolar(0.7885, iTime / 2.0);
  //  vec2 c = fromPolar(0.7885, 4.0);
  vec2 c = 0.01 * (iMouse - 0.5 * iResolution);
  return complexMul(z, z) + c;
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

#pragma webpack include ../common/juliaIteration.glsl

JULIA_ITERATION(julia, f, 2.0, 20u)

void main() {
  vec2 fragCoord = (coord - 0.5) * iResolution * 0.005;
  vec3 res = julia(fragCoord);
  float f = res.z / 20.0;

  //    fragColor = mix(colorBackground, colorPrimary, banded(bandCount, unmix(-.35, .35, f2)));
  fragColor = mix(
    colorBackground,
    colorPrimary,
    min(banded(bandCount, f), 1.0)
  );
  fragColor = vec4(res, 1.0);
  //    fragColor = visualize(f);
  //    fragColor = visualize(float(i == 1000u));
}
