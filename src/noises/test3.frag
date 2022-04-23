#version 300 es
precision mediump float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/perlin2DTexture.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/waves.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/hexFns.glsl

in vec2 coord;
out vec4 fragColor;
uniform float a;
uniform float highResTimeStamp;
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
  vec4 waves1 = mix(
    colorBackground,
    colorPrimary,
    float(
      waves(colorPrimary, fragCoord, vec2(0.2, 0.05), iTime * 1000.0) >= 0.7
    )
  );
  vec4 waves2 = mix(
    colorSecondary,
    colorBackground,
    float(
      waves(colorPrimary, fragCoord, vec2(0.002, 0.1), iTime * 1000.0) >= 0.7
    )
  );

  float perl = perlin2D(fragCoord);
  float perl01 = unmix(-0.68, 0.68, perl);
  float band = banded(3.0, perl01);
  float isTop = float(band == 1.0);
  float isBottom = float(band == 0.0);
  fragColor =
    waves2 * isTop +
    waves1 * isBottom +
    (1.0 - isTop - isBottom) *
      mix(
        colorBackground,
        colorPrimary,
        banded(float(bandCount), unmix(0.333, 0.666, perl01))
      );
  //        + vec4(0.0, 0.0, 0.0, 1.0) * float(between(0.0, 0.3, perl));
  // fragColor = mix(colorBackground, colorPrimary, banded(float(bandCount), perl01));
  // fragColor = visualize(blue, red, perl01);

  //    fragColor = mix(colorBackground, colorPrimary, unmix(-0.5, 0.5, perl));
  //fragColor = texelFetch(gradients, ivec2(coord), 0);
}
