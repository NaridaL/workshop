#version 300 es
precision mediump float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/colors.glsl
#pragma webpack include ../common/hexFns.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/perlin2DTexture.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/triFns.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/waves.glsl

in float n;
in vec2 coord;
out vec4 fragColor;
uniform float a;
uniform float iTime;
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
  vec3 uvR = xy2tri(fragCoord);
  vec3 triCenter = triCenter(uvR);
  vec2 centerXY = tri2xy(triCenter);

  vec2 d2 = fragCoord - centerXY;

  float d = triSdf(
    xy2tri(rot2(iTime * mix(-1.0, 1.0, uvR.z)) * d2).xy * mix(-1.0, 1.0, uvR.z)
  );
  float isHex = float(between(0.15, 0.2, d));
  fragColor = mix(
    colorBackground,
    colorPrimary,
    isHex * banded(bandCount, perlin01(centerXY / 20.0))
  );

  //fragColor = visualize(blue, red, mod(floor(sheared.x) + floor(sheared.y), 2.0));

}

