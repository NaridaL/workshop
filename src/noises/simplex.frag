#version 300 es
precision mediump float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/simplex2DTexture.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/waves.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/ra2Hex.glsl
#pragma webpack include ../common/hex2Ra.glsl
#pragma webpack include ../common/hexRound.glsl
#pragma webpack include ../common/hexSdf.glsl

uniform sampler2D texture;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBg;
uniform float a;
uniform int bandCount;
in float n;
in vec2 coord;
out vec4 fragColor;

const vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

float simplex01(vec2 pos) {
  return unmix(-0.68, 0.68, simplex2D(pos));
}

void main() {
  float f = mix(simplex2D(coord), simplex2D(coord * 4.0), a);
  float f2 = simplex2D(coord);

  fragColor = mix(
    colorBg,
    colorPrimary,
    banded(bandCount, unmix(-0.35, 0.35, f2))
  );
  //    fragColor = mix(fragColor, colorSecondary, float(between(0.0, 1., f)));
}
