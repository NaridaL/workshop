#version 300 es

precision highp float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/checkerboardGrad.glsl
#pragma webpack include ../common/colors.glsl
#pragma webpack include ../common/linstep.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/min3.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/sdf2d/sdArcRect.glsl
#pragma webpack include ../common/sdf2d/sdGear.glsl
#pragma webpack include ../common/sdf3d/opRepLim.glsl
#pragma webpack include ../common/sdf3d/sdArrow.glsl
#pragma webpack include ../common/sdf3d/sdBox.glsl
#pragma webpack include ../common/sdf3d/sdTorus.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/ungamma.glsl
#pragma webpack include ../common/visualize.glsl

uniform sampler2D texture;
uniform float iTime;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBackground;
uniform float a;
uniform float b;
uniform float c;
uniform float d;
uniform int bandCount;
uniform vec2 iResolution;
uniform vec2 iMouse;
in float n;
in vec2 coord;
out vec4 fragColor;

#pragma webpack include ../common/constants.glsl

struct Hit {
  float distance;
  vec4 color;
};
Hit mixa(Hit a, Hit b, float t) {
  return Hit(mix(a.distance, b.distance, t), mix(a.color, b.color, t));
}
float skybox(vec3 p) {
  return 32.0 - max3(abs(p));
}

Hit add(Hit a, Hit b) {
  //    return a.distance < b.distance
  //        ? Hit(a.distance, a.color)
  //        : Hit(b.distance, b.color);
  return mixa(a, b, float(b.distance < a.distance));
}

Hit addFillet(float r, Hit a, Hit b) {
  if (a.distance < r && b.distance < r) {
    return Hit(
      r - distance(vec2(a.distance, b.distance), vec2(r)),
      mix(a.color, b.color, (a.distance - b.distance) / r * 0.5 + 0.5)
    );
  } else {
    return add(a, b);
  }
}

Hit addFillet(float r, Hit a, Hit b, vec4 tilletColor) {
  if (a.distance < r && b.distance < r) {
    return Hit(
      r - distance(vec2(a.distance, b.distance), vec2(r)),
      tilletColor
    );
  } else {
    return add(a, b);
  }
}
Hit addFillet2(float r, Hit a, Hit b) {
  float h = smoothstep(-r, r, a.distance - b.distance);
  return Hit(
    mix(a.distance, b.distance, h) - r * h * (1.0 - h),
    mix(a.color, b.color, h)
  );
}

Hit neg(Hit a) {
  return Hit(-a.distance, a.color);
}
Hit sub(Hit from, Hit what) {
  Hit whatNeg = neg(what);
  return mixa(from, whatNeg, float(whatNeg.distance > from.distance));
}

vec3 modv(vec3 v, vec3 dir1, float y) {
  float t = dot(v, dir1);
  return v - floor(t / y) * y * dir1;
}
vec3 modRotZ(vec3 p, float count) {
  vec2 polarXY = toPolar(p.xy);
  return fromPolar(polarXY.x, mod(polarXY.y, TAU / count), p.z);
}

float sin01(float x) {
  return 0.5 + 0.5 * sin(x);
}
float cos01(float x) {
  return 0.5 + 0.5 * cos(x);
}

float smoothmin(float r, float a, float b) {
  float h = smoothstep(-r, r, a - b);
  return mix(a, b, h) - r * h * (1.0 - h);
}

vec2 project(vec2 a, vec2 onto1) {
  return onto1 * (dot(a, onto1) / dot(onto1, onto1));
}

vec3 reject(vec3 a, vec3 b1) {
  return a - b1 * dot(a, b1);
}
Hit gizmo(vec3 p) {
  vec3 absp = abs(p);

  Hit res = Hit(sdArrow(1.0, p), vec4(RED, 1));
  res = add(res, Hit(sdArrow(1.0, p.yzx), vec4(GREEN, 1)));
  res = add(res, Hit(sdArrow(1.0, p.zxy), vec4(BLUE, 1)));
  res = add(res, Hit(length(p) - 0.05, vec4(BLACK, 1)));
  return res;
}
/**
 * Simple rubiks cube. Not actually 3x3x3 cubes but one static 3x3x2 block and
 * one rotating 3x3x1. Axes are switched at the beginning so it looks like
 * different moves are being made.
 */
float rubiks(vec3 p) {
  const float turnTimeInv = 1.0 / 0.5;
  int turnNo = int(iTime * turnTimeInv) % 4;
  if (turnNo == 0) {
    p.x = -p.x;
  } else if (turnNo == 1) {
    p = vec3(p.y, p.z, -p.x);
  } else if (turnNo == 2) {
    p = p;
  } else {
    p = p.yzx;
  }
  p += 1.0;
  vec3 p1 = opRepLim(p, vec3(1), vec3(2, 1, 2));
  float d1 = sdBox(vec3(0.45), 0.05, p1);

  vec3 p2 = p;
  p2 -= vec3(1, 0, 1);
  p2 = rotY(smoothstep(0.0, 1.0, fract(iTime * turnTimeInv)) * 0.5 * PI) * p2;
  p2 = opRepLim(p2 - vec3(-1, 2, -1), vec3(1), vec3(2, 0, 2));
  float d2 = sdBox(vec3(0.45), 0.05, p2);

  return min(d1, d2);
}
float rots(vec3 p) {
  p.y -= -6.0;
  float turnTimeInv = 2.0 * pow(1.1, floor(p.y - 0.5));
  int turnNo = int(iTime * turnTimeInv) % 4;
  p.y = opRepLim(p.y - 2.0, 1.0, 7.0);
  float d2 = sdBox(
    vec3(0.4, 0.45, 0.8),
    0.05,
    rotY(iTime * turnTimeInv * 0.5 * PI) * p
  );

  return d2;
}

float sdOpExtrude(float thickness, float cornerRadius, float xyDist, float z) {
  xyDist += cornerRadius;
  z += cornerRadius;
  float zDist = abs(z) - 0.5 * thickness;
  return length(max(vec2(xyDist, zDist), 0.0)) +
  min(max(xyDist, zDist), 0.0) -
  cornerRadius;
}
float sdOpExtrude(float thickness, float xyDist, float z) {
  return sdOpExtrude(thickness, 0.0, xyDist, z);
}
#define MIN3(A, B, C) (min(min(A, B), C))
/**
 * - S = sun gear teeth
 * - P = planet gear teeth
 * - R = ring gear teeth
 *
 * R+S must divide evenly by number of planets for teeth to mesh properly.
 * (Specifically because the gears are evenly spaced.)
 *
 * cf https://woodgears.ca/gear/planetary.html
 */
float gears(int S, vec2 p) {
  int P = 11,
    R = S + 2 * P;
  float t = 0.9 * iTime;
  p.xy = rot2(-t * -float(S) / float(R)) * p;
  float circularPitch = a;
  float gearDist = float(S + P) * circularPitch / TAU;
  float dRingBorder = length(p) - 5.0;
  if (dRingBorder > 0.0) {
    return dRingBorder;
  }

  // sun gear
  vec2 p1 = p;
  p1 = rot2(t) * p1;
  float d1 = max(
    sdGear(S, 20.0 * DEGREE, circularPitch, p1),
    -(length(p1) - 0.2)
  );

  // planet gear
  vec2 p2 = p;
  //  p2 = rot2(t * float(S) / float(S + R)) * p2;
  float angleSegment = floor(toPolar(p2).y / (TAU / 3.0) + 0.5);
  p2 = opRotSym(3.0, p2);
  p2 -= vec2(gearDist, 0);
  //  p2 = rot2(t * -float(S) / float(S + R)) * p2;
  p2 = rot2((-t + angleSegment * TAU / 3.0) * (float(S) / float(P))) * p2;
  float d2 = max(
    sdGear(P, 20.0 * DEGREE, circularPitch, p2),
    -(length(p2) - 0.2)
  );

  // ring gear
  vec2 p3 = p;
  p3 = rot2(t * -float(S) / float(R)) * p3;
  float d3 = max(
    sdGearInternal(R, 20.0 * DEGREE, circularPitch, p3),
    dRingBorder
  );
  return min3(d1, d2, d3);
}
float gears(vec3 p) {
  p -= vec3(0, 0, 1);
  p = p.yzx;
  float d = sdOpExtrude(4.0, 0.02, gears(22, p.xy), p.z);
  return d;
}
float boxes(vec3 p) {
  float d1 = p.y - 2.0;
  float d2 = p.z - 1.2;
  float d3 = sdBox(vec3(4), p);
  return max(d1, d2);
}
const float RR = 0.2;
float loader(vec2 p) {
  float d = 10000.0;
  float t = iTime * 6.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    // same thing as 0 but offset in time by i:
    float ti = t + fi;
    float tt = floor(ti / 9.0) + linstep(8.0, 9.0, fract(ti / 9.0) * 9.0);
    // same thing as 0 but offset by i:
    tt += fi;
    vec2 p2 = rot2(tt * 40.0 * DEGREE) * p - vec2(RR / sin(20.0 * DEGREE), 0);
    float d2 = sdArcRect(20.0 * DEGREE, 10.0, vec2(6.0, 0.0), p2);
    d = min(d, d2);
  }
  return d - RR;
  //  return sdArc(b * PI, 10.0, 5.0, p);
}
float loader(vec3 p) {
  p -= vec3(0, 0, 1);
  p = p.yzx;
  float d = sdOpExtrude(4.0, RR, loader(p.xy), p.z);
  return d;
}
float spinring(vec3 p) {
  float l = abs(length(p) - 15.0);
  if (l > 2.0) {
    return l;
  }
  p.xy = rot2(p.z * a) * p.xy;
  return sdTorus(15.0, 0.3, p.zyx) * 0.1;
}
Hit sdf(vec3 p) {
  vec3 p2 = p;

  float ds;
  {
    float scale = 0.1;
    vec3 p2 = p - vec3(0.5, -0.5, 0.0);
    ds = rubiks(p2 / scale) * scale;
  }
  {
    vec3 p3 = p2;
    p3 -= vec3(-0.5, 0.5, 0);
    p3 = p3.zxy;
    ds = min(ds, gears(p3 * 15.0) / 15.0);
  }
  {
    vec3 p3 = p2;
    p3 -= vec3(0.5, 0.5, 0);
    ds = min(ds, loader(p3 * 100.0) * 00.01);
  }
  float dg = p.z;
  Hit hit;
  hit = Hit(ds, vec4(ungamma(colorPrimary), 1));
  return hit;

  if (ds < dg) {
    hit = Hit(ds, vec4(ungamma(colorPrimary), 1));
  } else {
    float f = checkerboardGrad(p.xy);

    vec3 color = mix(ungamma(colorBackground), ungamma(colorSecondary), f);
    hit = Hit(dg, vec4(color, 1));
  }
  hit = add(hit, gizmo(p2));
  return hit;
}
float sdff(vec3 p) {
  return sdf(p).distance;
}
float ambientOcclusion(vec3 pWC, vec3 n1WC) {
  float k = 1.0;
  float distance = sdff(pWC + n1WC * k);
  return clamp(distance / k, 0.0, 1.0);
}

struct RMResult {
  float distance;
  vec3 pos;
  vec4 color;
};
RMResult raymarching2(vec3 start, vec3 dir1) {
  vec3 pos = start;
  Hit hit;
  for (int i = 0; i < 500; i++) {
    hit = sdf(pos);
    if (hit.distance < 0.001 || hit.distance > 100.0) break;
    pos = pos + dir1 * hit.distance;
  }
  return RMResult(hit.distance, pos, hit.color);
}

float softshadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
  float res = 1.0;
  float t = 0.1;
  for (int i = 0; i < 100 && t < maxt; i++) {
    float h = sdff(ro + rd * t);
    if (h < 0.001) return 0.0;
    res = min(res, k * h / t);
    t += h;
  }
  return res;
}

vec3 sdfNormal1(vec3 p, float d) {
  const float EPS = 1e-4;
  return normalize(
    vec3(
      sdff(p + vec3(EPS, 0.0, 0.0)),
      sdff(p + vec3(0.0, EPS, 0.0)),
      sdff(p + vec3(0.0, 0.0, EPS))
    ) -
      vec3(sdff(p))
  );
}

//layout (depth_greater) out float gl_FragDepth;
void main() {
  vec3 camPos =
    vec3(5, 5, 5) +
    (-1.0 == iMouse.x
      ? vec3(0)
      : vec3(0, (iMouse / iResolution * 2.0 - 1.0) * 10.0));
  float aspectRatio = iResolution.x / iResolution.y;
  float width = 3.0;
  float height = width / aspectRatio;
  mat4 modelView =
    //    perspective(1.0, iResolution.x / iResolution.y, 0.1, 20.0) *
    ortho(-0.5 * width, 0.5 * width, -0.5 * height, 0.5 * height, 0.1, 20.0) *
    lookAt(camPos, vec3(0, 0, 0.0), vec3(0, 0, 1));
  mat4 modelViewInverse = inverse(modelView);

  vec3 light = normalize(vec3(-0.1, -1, -5));

  vec3 a = vec3(coord * 2.0 - 1.0, -1.0);
  vec3 b = vec3(coord * 2.0 - 1.0, 1.0);
  vec3 aWC = transform(modelViewInverse, a);
  vec3 bWC = transform(modelViewInverse, b);
  vec3 lookDir1 = normalize(bWC - aWC);

  RMResult hitWC = raymarching2(aWC, lookDir1);
  vec3 hitn1 = sdfNormal1(hitWC.pos, hitWC.distance);
  float dWC = distance(aWC, hitWC.pos);
  vec3 hitNDC = transform(modelView, hitWC.pos);
  vec3 p = hitWC.pos;
  //  float inSun = softshadow(
  //    hitWC.pos + hitn1 * 0.05,
  //    -light,
  //    0.0001,
  //    300.0,
  //    8.0
  //  );
  float inSun = 1.0;
  //    float inSun=1.;

  vec3 color;
  vec3 material = hitWC.color.xyz;
  if (hitWC.distance > 20.0) {
    color = ungamma(colorBackground);
  } else {
    color = vec3(0.0);
    const vec3 sunlightColor = vec3(3.0);

    //  float aOcc = ambientOcclusion(hitWC.pos, hitn1);
    float aOcc = 1.0;

    vec3 reflectionDirection = reflect(light, hitn1);

    //  color += material * aOcc;
    color += inSun * sunlightColor * material * max(0.0, dot(-light, hitn1));
    //    color = (hitn1);
    vec3 eyeDirection = -lookDir1;
    float uMaterialShininess = 256.0;
    float specularLightWeighting = pow(
      max(dot(reflectionDirection, eyeDirection), 0.0),
      uMaterialShininess
    );
    //  color += specularLightWeighting;
    //    float lightIntensity = 0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.);
    //    float lightIntensity =
    //        0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.) + 0.3*specularLightWeighting;
    //    fragColor = visualize(blue, red, mix(0.5, 1.0, inSun) * lightIntensity);
    //    fragColor = mix(hitWC.color, colorBackground, mix(0.5, 1.0, inSun) * clamp(lightIntensity, 0., 1.));
    color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  }

  fragColor = vec4(color, 1.0);
}

void mainImage(out vec4 c, vec2 w) {
  vec4 p = vec4(w, 0.0, 1.0);

  float v = 0.0,
    f,
    r[17];
  vec4 s = vec4(2, 2, 1, 0);

  for (int i = 0; i < 17; i++) r[i] = 0.0;

  r[0] = p.x + p.y;
  r[1] = p.y;

  for (int i = 0; i < 17; i++) {
    f = -2.0 * floor(r[i] / 2.0) / s[0];
    for (int j = 0; j < 3; j++) {
      r[i + j] += f * s[j];
    }

  }

  for (int i = 0; i < 17; i++) {
    v += mod(r[i], 2.0) * exp2(float(i));
  }
  v /= exp2(17.0);

  c = vec4(v);
}
