#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/ungamma.glsl
#pragma webpack include ../common/colors.glsl

uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBackground;
uniform vec2 iMouse;

// show with square wave
vec3 vizz(float val) {
  vec3 color0 = ungamma(colorBackground);
  vec3 color1 = ungamma(colorPrimary);
  vec3 color2 = ungamma(colorSecondary);
  vec3 cc = val >= 0.0 ? color1 : color2;
  float v = abs(mod(abs(val) - 0.5, 2.0) - 1.0);
  const float k = 0.5 * 0.1;
  if (between(-0.5, 0.5, val)) {
    return mix(color2, color1, smoothstep(-k, +k, val));
  }
  return mix(cc, color0, smoothstep(-0.5 - k, -0.5 + k, -v));
}
// #pragma glslify: export(vizz)
vec3 vizz(float val, float mouseVal, vec2 fragCoord, vec2 mouse, vec2 iMouse) {
  vec3 color = vizz(val);

  if (-1.0 != iMouse.x) {
    color = mix(
      color,
      ungamma(BLUE),
      smoothstep(-0.2, -0.0, -abs(distance(mouse, fragCoord) - abs(mouseVal)))
    );
  }

  return color;
}

#define VIZZ(SDF)                                                              \
  (vizz(                                                                       \
    SDF((coord - 0.5) * iResolution * 0.1),                                    \
    SDF((iMouse - 0.5 * iResolution) * 0.1),                                   \
    coord * iResolution * 0.1,                                                 \
    iMouse * 0.1,                                                              \
    iMouse                                                                     \
  ))

// show with one line at 0
vec3 vizz2(float val) {
  vec3 color0 = ungamma(colorBackground);
  vec3 color1 = ungamma(colorPrimary);
  vec3 color2 = ungamma(colorSecondary);
  vec3 cc = val >= 0.0 ? color1 : color2;
  const float k = 0.1;
  vec2 dVal = vec2(dFdx(val), dFdy(val));
  return mix(
    color0,
    color1,
    smoothstep(-k, +k, -abs(val / length(dVal)) + 0.8)
  );
}
