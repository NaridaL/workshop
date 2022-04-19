#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdHeart.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/fromPolar.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ./vizz.glsl

uniform vec2 iResolution;
uniform float iTime;
uniform float a, b, c, d;
in vec2 coord;
out vec4 fragColor;

//vec3 vizz(float val) {
//  vec3 color0 = ungamma(colorBackground);
//  vec3 color1 = ungamma(colorPrimary);
//  vec3 color2 = ungamma(colorSecondary);
//  vec3 cc = val >= 0.0 ? color1 : color2;
//  float v = fract(0.5 * abs(val));
//  v = abs(v - 0.5);
//  return mix(cc, color0, smoothstep(0.2, 0.3, v));
//}
/**
 * Renders a transform of a coordinate system as a line grid.
 *
 * E.g.
 *
 * `p` should be p(fragCoord)
 *
 * and
 *
 * `scale` should be dp/dx(fragCoord)
 *
 * For a linear transformation (mat2 mi), you pass
 * `lineGrid(mi * fragCoord, mi)`
 */
float lineGrid(vec2 p, mat2 scale) {
  //  p -= 0.5;
  vec2 pCenter = round(p);
  vec2 gradX = vec2(1, 0) * scale;
  vec2 gradY = vec2(0, 1) * scale;
  vec2 d = abs(p - pCenter);
  float m = min(d.x / length(gradX), d.y / length(gradY));
  //  return float(m < 3.0);
  return smoothstep(-1.5, -0.0, -m);
}
float bez3(float a, float b, float c, float d, float t) {
  float s = 1.0 - t;
  return s * s * s * a +
  3.0 * s * s * t * b +
  3.0 * s * t * t * c +
  t * t * t * d;
}
float heartbeat(float t) {
  t = fract(t);
  if (t < 0.0) {
    return 0.0;
  } else if (t < 0.03) {
    return bez3(0.0, 0.0, 0.5 + a, 0.5, unmix(0.0, 0.03, t));
    float x = t;
    return a * x * x * x + b * x * x + c * x + d;
  } else if (t < 0.07) {
    return bez3(0.5, 0.5 + b, c, -0.14, unmix(0.03, 0.07, t));
  } else if (t < 0.1) {
    return bez3(-0.14, d, 0.0, 0.0, unmix(0.07, 0.1, t));
  } else {
    return 0.0;
  }
  //50, 110, 150
}
float heartbeat2(float t) {
  t = fract(t);
  float mask;
  if (t < 0.0) {
    mask = 0.0;
  } else if (t < 0.05) {
    mask = t / 0.05;
  } else if (t < 0.07) {
    mask = mix(1.0, 0.2, unmix(0.05, 0.07, t));
  } else if (t < 0.1) {
    mask = mix(0.2, 0.0, unmix(0.07, 0.1, t));
  } else {
    mask = 0.0;
  }
  //  return mask;
  return mask * -sin(t * (1.5 * 6.28) / 0.1);
  return -sin(t * (1.5 * 6.28) / 0.1);
  return sin(t / (1.5 * 6.28) * 0.1);
  //50, 110, 150
}
float sdf(vec2 c) {
  float h = 12.0 + 2.0 * heartbeat(iTime / 4.0);
  return sdHeart(c / h + vec2(0, 0.55)) * h;
}

void main() {
  vec2 fragCoord = coord * iResolution;
  //  fragCoord *= 0.05;
  //  fragCoord.x *= 0.1;
  //  vec3 color = ungamma(colorBackground);
  //  color = mix(color, vec3(0.5), lineGrid(fragCoord, mat2(0.01)));
  //  color = mix(
  //    color,
  //    ungamma(colorPrimary),
  //    float(between(-0.02, 0.02, fragCoord.y - heartbeat(fragCoord.x)))
  //  );

  vec3 color;

  color = VIZZ(sdf);

  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1);
}
