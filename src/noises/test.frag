#version 300 es
precision mediump float;

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

float perlin01(vec2 pos) {
  return unmix(-0.68, 0.68, perlin2D(pos));
}

void main2() {
  float fraction = (n + 0.5) * 0.5;
  vec4 waves1 = mix(
    colorBg,
    colorPrimary,
    float(waves(colorPrimary, coord, vec2(0.2, 0.05)) >= 0.7)
  );
  vec4 waves2 = mix(
    colorSecondary,
    colorBg,
    float(waves(colorPrimary, coord, vec2(0.002, 0.1)) >= 0.7)
  );

  float perl = perlin2D(coord);
  float perl01 = unmix(-0.68, 0.68, perl);
  float band = banded(3.0, perl01);
  float isTop = float(band == 1.0);
  float isBottom = float(band == 0.0);
  fragColor = waves2 * isTop +
  waves2 * isBottom +
  (1.0 - isTop - isBottom) *
    mix(
      colorBg,
      colorPrimary,
      banded(float(bandCount), unmix(0.333, 0.666, perl01))
    );
  //        + vec4(0.0, 0.0, 0.0, 1.0) * float(between(0.0, 0.3, perl));
  // fragColor = mix(colorBg, colorPrimary, banded(float(bandCount), perl01));
  // fragColor = visualize(blue, red, perl01);

  //    fragColor = mix(colorBg, colorPrimary, unmix(-0.5, 0.5, perl));
  //fragColor = texelFetch(gradients, ivec2(coord), 0);
}

void main2() {
  vec3 hex_pos = ra2Hex(coord);
  vec3 hex_center = hexRound(hex_pos);
  vec2 center = hex2Ra(hex_center);
  float centerPerl = unmix(-0.68, 0.68, perlin2D(center / 20.0));
  float isTop = float(centerPerl > a + 0.05);
  float isBottom = float(centerPerl < a - 0.05);
  vec4 hexColor =
    isTop * colorPrimary +
    isBottom * colorSecondary +
    (1.0 - isTop - isBottom) * colorBg;

  hexColor = mix(colorBg, colorPrimary, banded(bandCount, centerPerl));

  vec3 hex_d = hex_pos - hex_center;
  float d = hexSdf(hex_d);
  float isHex = smoothstep(-0.42, -0.38, -d);
  fragColor = mix(colorBg, hexColor, isHex);
}
