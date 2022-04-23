#version 300 es
precision mediump float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/hexFns.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/perlin2DTexture.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/waves.glsl

in float n;
in vec2 coord;
out vec4 fragColor;
uniform float a;
uniform int bandCount;
uniform mat4 viewModel;
uniform sampler2D texture;
uniform vec2 iResolution;
uniform vec4 colorBackground;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;

float perlin01(vec2 pos) {
  return unmix(-0.68, 0.68, perlin2D(pos));
}

void main() {
  vec2 fragCoord = transform(viewModel, coord * iResolution);
  fragCoord *= 0.01;
  vec3 hex_pos = ra2Hex(fragCoord);
  vec3 hex_center = hexRound(hex_pos);
  vec2 center = hex2Ra(hex_center);
  float centerPerl = unmix(-0.68, 0.68, perlin2D(center / 20.0));
  float isTop = float(centerPerl > a + 0.05);
  float isBottom = float(centerPerl < a - 0.05);
  vec4 hexColor =
    isTop * colorPrimary +
    isBottom * colorSecondary +
    (1.0 - isTop - isBottom) * colorBackground;

  hexColor = mix(colorBackground, colorPrimary, banded(bandCount, centerPerl));

  vec3 hex_d = hex_pos - hex_center;
  float d = hexSdf(hex_d);
  float isHex = smoothstep(-0.42, -0.38, -d);
  fragColor = mix(colorBackground, hexColor, isHex);
}
