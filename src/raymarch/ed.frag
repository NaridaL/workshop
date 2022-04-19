#version 300 es

precision highp float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/hex2Ra.glsl
#pragma webpack include ../common/hexRound.glsl
#pragma webpack include ../common/hexSdf.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/perlin2DTexture.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/ra2Hex.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/waves.glsl

#pragma webpack include ../common/sdf3d/sdDonut.glsl
#pragma webpack include ../common/sdf3d/sdCapsule.glsl
#pragma webpack include ../common/sdf3d/opElongate.glsl
#pragma webpack include ../common/sdf3d/sdSphere.glsl
#pragma webpack include ../common/sdf3d/sdCylinder.glsl
#pragma webpack include ../common/sdf3d/sdCone.glsl
#pragma webpack include ../common/sdf3d/addChamfer.glsl
#pragma webpack include ../common/sdf3d/addChamfer.glsl
#pragma webpack include ../common/sdf3d/addTillet.glsl
#pragma webpack include ../common/sdf3d/sdBox.glsl
#pragma webpack include ../common/sdf3d/sdOctahedron.glsl
#pragma webpack include ../common/sdf3d/add.glsl
#pragma webpack include ../common/sdf3d/sub.glsl

uniform sampler2D texture;
uniform float secs;
uniform mat4 lll;
uniform mat4 llli;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBg;
uniform float a;
uniform float b;
uniform float c;
uniform float d;
uniform float highResTimeStamp;
uniform int bandCount;
uniform vec3 extra;
uniform vec3 campos;
in float n;
in vec2 coord;
out vec4 fragColor;

#pragma webpack include ../common/constants.glsl

const vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 yellow = vec4(1.0, 1.0, 0.0, 1.0);
const vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 purple = vec4(0.5, 0.0, 0.5, 1.0);
const vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

struct RMHit {
  float distance;
  vec4 color;
};
RMHit mixa(RMHit a, RMHit b, float t) {
  return RMHit(mix(a.distance, b.distance, t), mix(a.color, b.color, t));
}
float skybox(vec3 p) {
  return 32.0 - max3(abs(p));
}

float perlinSphere(float radius, vec3 p) {
  vec3 cp = normalize(p);
  float alpha = atan(cp.y, cp.x);
  float beta = asin(cp.z);
  return length(p) -
  radius +
  0.1 *
    perlin2D(vec2(0.0 / 100.0, 0.0) + (vec2(5.0) + vec2(alpha, beta)) * 8.0);
}

float cylCircle(vec3 p) {
  float d = 10e9;
  for (int i = 0; i < 10; i++) {
    d = min(
      d,
      sdCylinder(0.2, 2.0, p + fromPolar(3.0, TAU * float(i) / 10.0, 1.0))
    );
  }

  return d;
}

float rblock(float r, out vec3 p) {
  return sdBox(vec3(r), p);
}

RMHit add(RMHit a, RMHit b) {
  //    return a.distance < b.distance
  //        ? RMHit(a.distance, a.color)
  //        : RMHit(b.distance, b.color);
  return mixa(a, b, float(b.distance < a.distance));
}

float wtf(vec3 p) {
  vec3 center = p - mod(p, 3.0) + vec3(1.5);
  return rblock(0.4 + 0.3 * sin(secs + center.x), center);
}

RMHit addTillet(float r, RMHit a, RMHit b) {
  if (a.distance < r && b.distance < r) {
    return RMHit(
      r - distance(vec2(a.distance, b.distance), vec2(r)),
      mix(a.color, b.color, (a.distance - b.distance) / r * 0.5 + 0.5)
    );
  } else {
    return add(a, b);
  }
}

RMHit addTillet(float r, RMHit a, RMHit b, vec4 tilletColor) {
  if (a.distance < r && b.distance < r) {
    return RMHit(
      r - distance(vec2(a.distance, b.distance), vec2(r)),
      tilletColor
    );
  } else {
    return add(a, b);
  }
}
RMHit addTillet2(float r, RMHit a, RMHit b) {
  float h = smoothstep(-r, r, a.distance - b.distance);
  return RMHit(
    mix(a.distance, b.distance, h) - r * h * (1.0 - h),
    mix(a.color, b.color, h)
  );
}

RMHit neg(RMHit a) {
  return RMHit(-a.distance, a.color);
}
RMHit sub(RMHit from, RMHit what) {
  RMHit whatNeg = neg(what);
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

float betterBox(vec3 r, vec3 p) {
  vec3 q = abs(p) - r;
  return length(max(q, 0.0)) + min(max3(q), 0.0);
  p = abs(p);
  return max3(p - r);
}

float sdEllipsoidB(vec3 r, vec3 p) {
  float k0 = length(p / r);
  float k1 = length(p / (r * r));
  return k0 * (k0 - 1.0) / k1;
}
float sdOctahedronB(float s, vec3 p) {
  p = abs(p);
  return (p.x + p.y + p.z - s) * 0.57735027;
}
float donutc(float r0, float r1, vec3 p) {
  vec3 closestCenter = vec3(normalize(p.xy) * r0, 0.0);
  return distance(closestCenter, p) - r1;
}

float smoothmin(float r, float a, float b) {
  float h = smoothstep(-r, r, a - b);
  return mix(a, b, h) - r * h * (1.0 - h);
}

RMHit sdf(vec3 p) {
  return RMHit(0.0, black);
}

float sdff(vec3 p) {
  return sdf(p).distance;
}

struct RMResult {
  float distance;
  vec3 pos;
  vec4 color;
};
RMResult raymarching2(vec3 start, vec3 dir1) {
  vec3 pos = start;
  RMHit hit;
  for (int i = 0; i < 200; i++) {
    hit = sdf(pos);
    if (hit.distance < 0.0001) break;
    pos = pos + dir1 * hit.distance;
  }
  return RMResult(hit.distance, pos, hit.color);
}
vec3 pt(mat4 pm, vec3 p) {
  vec4 pStar = pm * vec4(p, 1.0);
  return pStar.xyz / pStar.w;
}

float softshadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
  float res = 1.0;
  float t = 0.1;
  for (int i = 0; i < 1000 && t < maxt; i++) {
    float h = sdff(ro + rd * t);
    if (h < 0.001) return 0.0;
    res = min(res, k * h / t);
    t += h;
  }
  return res;
}

const float eps = 1e-4;
vec3 sdfNormal1(vec3 p, float d) {
  return normalize(
    vec3(
      sdff(p + vec3(eps, 0.0, 0.0)),
      sdff(p + vec3(0.0, eps, 0.0)),
      sdff(p + vec3(0.0, 0.0, eps))
    ) -
      sdff(p)
  );
}

float ambientOcclusion(vec3 pWC, vec3 n1WC) {
  float k = 1.0;
  float distance = sdff(pWC + n1WC * k);
  return clamp(distance / k, 0.0, 1.0);
}

//layout (depth_greater) out float gl_FragDepth;
void main() {
  vec3 light = normalize(vec3(-1.0, -2.0, -2));

  vec3 a = vec3(coord, -1.0);
  vec3 b = vec3(coord, 1.0);
  vec3 aWC = pt(llli, a);
  vec3 bWC = pt(llli, b);
  vec3 lookDir1 = normalize(bWC - aWC);

  RMResult hitWC = raymarching2(aWC, lookDir1);
  vec3 hitn1 = sdfNormal1(hitWC.pos, hitWC.distance);
  float dWC = distance(aWC, hitWC.pos);
  vec3 hitNDC = pt(lll, hitWC.pos);

  vec3 sunPoint = raymarching2(hitWC.pos + hitn1 * 0.1, -light).pos;
  //    float inSun = float(distance(hitWC.pos, sunPoint) > 30.);
  float inSun = softshadow(
    hitWC.pos + hitn1 * 0.05,
    -light,
    0.0001,
    300.0,
    8.0
  );
  //    float inSun=1.;

  vec3 material = vec3(0.0, 0.2, 0.0);
  if (dWC > 100.0) {
    material = vec3(0.0, 0.0, 0.0);
  }

  const vec3 sunlightColor = vec3(8.0, 6.0, 1.0);

  float aOcc = ambientOcclusion(hitWC.pos, hitn1);

  vec3 reflectionDirection = reflect(light, hitn1);

  vec3 color = vec3(0.0);
  color += material * aOcc;
  color += inSun * sunlightColor * material * max(0.0, dot(-light, hitn1));
  //    color = (hitn1);

  vec3 camPos = aWC;

  vec3 eyeDirection = -lookDir1;
  float uMaterialShininess = 256.0;
  float specularLightWeighting = pow(
    max(dot(reflectionDirection, eyeDirection), 0.0),
    uMaterialShininess
  );
  color += specularLightWeighting;
  //    float lightIntensity = 0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.);
  //    float lightIntensity =
  //        0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.) + 0.3*specularLightWeighting;
  //    fragColor = visualize(blue, red, mix(0.5, 1.0, inSun) * lightIntensity);
  //    fragColor = mix(hitWC.color, colorBg, mix(0.5, 1.0, inSun) * clamp(lightIntensity, 0., 1.));
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1.0);
  //    fragColor = visualize(hitWC.pos.x/10.);
  //    fragColor = hitWC.color;
  //    fragColor = visualize(blue, red, distance(hitWC, sunPoint)/20.);
  //    fragColor = vec4(coord,0.,1.);
  //    fragColor = vec4(aWC, 1.0);
  // remap [-1, 1] to [0, 1]
  // gl_FragDepth = hitNDC.z * 0.5 + 0.5;
  //    gl_FragDepth = .9999999;
}
