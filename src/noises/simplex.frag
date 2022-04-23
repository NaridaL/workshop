#version 300 es
precision mediump float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/hexFns.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/simplex2DTexture.glsl
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

float simplex01(vec2 pos) {
  return unmix(-0.68, 0.68, simplex2D(pos));
}

void main() {
  vec2 fragCoord = transform(viewModel, coord * iResolution);
  fragCoord *= 0.01;
  //  fragCoord = coord;
  float f = mix(simplex2D(fragCoord), simplex2D(fragCoord * 4.0), a);
  float f2 = simplex2D(fragCoord);

  fragColor = mix(
    colorBackground,
    colorPrimary,
    banded(bandCount, unmix(-0.35, 0.35, f2))
  );
  //    fragColor = mix(fragColor, colorSecondary, float(between(0.0, 1., f)));
}
