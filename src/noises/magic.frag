#version 300 es

precision highp float;

#pragma webpack include ../common/constants.glsl
#pragma webpack include ../common/fromPolar.glsl
#pragma webpack include ../common/linstep.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/sdf2d/addChamfer.glsl
#pragma webpack include ../common/sdf2d/addFillet.glsl
#pragma webpack include ../common/sdf2d/sdArc.glsl
#pragma webpack include ../common/sdf2d/sdArcRect.glsl
#pragma webpack include ../sdfs2d/vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
uniform float a, b, c;
in vec2 coord;
out vec4 fragColor;

float sdf(vec2 p) {
  float d = 10000.0;
  float t = iTime * 5.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    // same thing as 0 but offset in time by i:
    float ti = t + fi;
    float tt = floor(ti / 9.0) + linstep(8.0, 9.0, fract(ti / 9.0) * 9.0);
    // same thing as 0 but offset by i:
    tt += fi;
    vec2 p2 = rot2(tt * 40.0 * DEGREE) * p;
    float d2 = sdArcRect(20.0 * DEGREE, 10.0, vec2(6.0, 0.0), p2);
    d = min(d, d2);
  }
  return d;
  //  return sdArc(b * PI, 10.0, 5.0, p);
}

void main() {
  vec3 color = VIZZ(sdf);
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
