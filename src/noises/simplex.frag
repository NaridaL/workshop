#version 300 es
precision mediump float;

#pragma glslify: banded = require(./shaderfunctions/banded.glsl)
#pragma glslify: between = require(./shaderfunctions/between.glsl)
#pragma glslify: simplex2D = require(./shaderfunctions/simplex2DTexture.glsl)
#pragma glslify: remix = require(./shaderfunctions/remix.glsl)
#pragma glslify: unmix = require(./shaderfunctions/unmix.glsl)
#pragma glslify: waves = require(./shaderfunctions/waves.glsl)
#pragma glslify: visualize = require(./shaderfunctions/visualize.glsl)
#pragma glslify: ra2Hex = require(./shaderfunctions/ra2Hex.glsl)
#pragma glslify: hex2Ra = require(./shaderfunctions/hex2Ra.glsl)
#pragma glslify: hexRound = require(./shaderfunctions/hexRound.glsl)
#pragma glslify: hexSdf = require(./shaderfunctions/hexSdf.glsl)

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
    return unmix(-.68, .68, simplex2D(pos));
}

void main() {
    float f = mix (simplex2D(coord), simplex2D(coord * 4.), a);
    float f2 = simplex2D(coord);


    fragColor = mix(colorBg, colorPrimary, banded(bandCount, unmix(-.35, .35, f2)));
//    fragColor = mix(fragColor, colorSecondary, float(between(0.0, 1., f)));
}