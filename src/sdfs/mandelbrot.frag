#version 300 es
precision highp float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/perlin2DTexture.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/waves.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/hexFns.glsl
#pragma webpack include ../common/triFns.glsl
#pragma webpack include ../common/max3.glsl

uniform sampler2D texture;
uniform vec4 colorPrimary;
uniform float highResTimeStamp;
uniform vec4 colorSecondary;
uniform vec4 colorBackground;
uniform float a;
uniform int bandCount;
in float n;
in vec2 coord;
out vec4 fragColor;

mat2 rot2(float angle) {
  float c = cos(angle),
    s = sin(angle);
  return mat2(c, -s, s, c);
}

float perlin01(vec2 pos) {
  return unmix(-0.68, 0.68, perlin2D(pos));
}

vec2 fc(vec2 z, vec2 c) {
  return complexMul(z, z) + c;
}

float mandelbrot(vec2 c) {
  vec2 z = vec2(0);
  for (int i = 0; i < bandCount * 2; i++) {
    z = fc(z, c);
  }
  return length(z);
}
vec2 mandelbrotz(vec2 c) {
  vec2 z = vec2(0);
  for (int i = 0; i < bandCount * 2; i++) {
    z = fc(z, c);
  }
  return z;
}

int mandelbrotcount(vec2 c) {
  vec2 z = vec2(0);
  int i;
  for (i = 0; i < bandCount * 2; i++) {
    z = fc(z, c);
    if (length(z) > 1024.0) {
      break;
    }
  }
  return i;
}

void main() {
  vec2 cc = coord / pow(10.0, a * 10.0) - vec2(0.5301, 0.5);
  vec2 f = mandelbrotz(cc);
  float inside = float(length(f) < 1024.0);
  int c = mandelbrotcount(cc);

  //    fragColor =
  //        visualize(blue, red, f / 1000.0);

  //    fragColor = vec4(f.xy, 0.0, 1.0);
  float val = pow(float(c) / float(bandCount), 1.0 / 2.0);
  fragColor = mix(colorBackground, colorPrimary, val);
  //    fragColor = visualize(blue, red, val);
}
