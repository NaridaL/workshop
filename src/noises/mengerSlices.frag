#version 300 es

precision highp float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/checkerboardGrad.glsl
#pragma webpack include ../common/colors.glsl
#pragma webpack include ../common/complex.glsl
#pragma webpack include ../common/constants.glsl
#pragma webpack include ../common/linstep.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/min3.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/sdf2d/sdArcRect.glsl
#pragma webpack include ../common/sdf2d/sdRectangle.glsl
#pragma webpack include ../common/sdf2d/sdGear.glsl
#pragma webpack include ../common/sdf3d/opRepLim.glsl
#pragma webpack include ../common/sdf3d/sdArrow.glsl
#pragma webpack include ../common/sdf3d/sdBox.glsl
#pragma webpack include ../common/sdf3d/sdTorus.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/ungamma.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../sdfs2d/vizz.glsl

in float n;
in vec2 coord;
out vec4 fragColor;
uniform float a;
uniform float b;
uniform float c;
uniform float d;
uniform float iTime;
uniform int bandCount;
uniform mat4 viewModel;
uniform sampler2D texture;
uniform vec2 iResolution;

float sdf(vec2 p) {
  p *= 0.1;
  p = complexMul(p, fromPolar(1.0, 20.0 * DEGREE * length(p) * a));

  // center rectangle
  float d = sdRectangle(vec2(1.0), p);
  float scale = 1.0;
  for (int i = 0; i < 4; i++) {
    p = abs(p);
    p = opRepLim(p, vec2(1.0), vec2(1));
    p *= 3.0;
    scale *= 1.0 / 3.0;
    float id = length(p) - 0.5;
    //    float id = sdRectangle(vec2(1.0), p);
    d = min(d, id * scale);
  }
  return d * 10.0;
}

void main() {
  vec2 fragCoord = transform(viewModel, coord * iResolution);
  vec2 tp = (fragCoord - 0.5 * iResolution) * 0.1;
  vec3 color = vizz(
    sdf(transform(viewModel, (coord - 0.5) * iResolution)),
    sdf(transform(viewModel, (iMouse - 0.5) * iResolution)),
    transform(viewModel, coord * iResolution),
    transform(viewModel, iMouse),
    iMouse
  );
  color = vizz2(sdf(tp));
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
