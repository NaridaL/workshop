#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdGear.glsl
#pragma webpack include ../common/sdf2d/sdTriangleEquilateral.glsl
#pragma webpack include ../common/dot2.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/constants.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform mat4 viewModel;
uniform float iTime;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 p) {
  float s = 10.0;
  p /= s;
  float pressureAngle = 20.0 * DEGREE;
  float circularPitch = 0.39;
  float pitchRadius1 = float(31) * circularPitch / TAU;
  float pitchRadius2 = float(29) * circularPitch / TAU;
  float baseRadius1 = cos(pressureAngle) * pitchRadius1;
  float baseRadius2 = cos(pressureAngle) * pitchRadius2;
  float d1 = sdGearInternal(31, 20.0 * DEGREE, circularPitch, p);
  float d2 = sdGear(
    29,
    20.0 * DEGREE,
    circularPitch,
    p - vec2(pitchRadius1 + pitchRadius2, 0)
  );
  return d1 * s;
}

void main() {
  vec2 fragCoord = transform(viewModel, coord * iResolution);
  vec2 tp = (fragCoord - 0.5 * iResolution) * 0.1;
  vec3 color = VIZZ(sdf);
  //  color = vizz2(sdf(tp));
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
