#version 300 es
precision mediump float;

#pragma glslify: banded = require(./shaderfunctions/banded.glsl)
#pragma glslify: between = require(./shaderfunctions/between.glsl)
#pragma glslify: simplex2D = require(./shaderfunctions/simplex2DTexture.glsl)
#pragma glslify: remix = require(./shaderfunctions/remix.glsl)
#pragma glslify: complexMul = require(./shaderfunctions/complexMul.glsl)
#pragma glslify: unmix = require(./shaderfunctions/unmix.glsl)
#pragma glslify: waves = require(./shaderfunctions/waves.glsl)
#pragma glslify: visualize = require(./shaderfunctions/visualize.glsl)
#pragma glslify: ra2Hex = require(./shaderfunctions/ra2Hex.glsl)
#pragma glslify: hex2Ra = require(./shaderfunctions/hex2Ra.glsl)
#pragma glslify: hexRound = require(./shaderfunctions/hexRound.glsl)
#pragma glslify: polar = require(./shaderfunctions/polar.glsl)
#pragma glslify: hexSdf = require(./shaderfunctions/hexSdf.glsl)

uniform sampler2D texture;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBg;
uniform float a;
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

    return complexMul(z, z) + polar(1.,secs/10.);
}

#pragma glslify: julia = require(./shaderfunctions/juliaIteration.glsl, r=2., f=f, maxit=500u)

void main() {
    uint i = julia(coord);
    float f = float(i) / 100.;

//    fragColor = mix(colorBg, colorPrimary, banded(bandCount, unmix(-.35, .35, f2)));
    fragColor = mix(colorBg, colorPrimary, f);
//    fragColor = visualize(1.-f);
//    fragColor = visualize(float(i > 0u));

}