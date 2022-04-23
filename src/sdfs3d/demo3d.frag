#version 300 es

precision highp float;

#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/ungamma.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/checkerboardGrad.glsl
#pragma webpack include ../common/colors.glsl
#pragma webpack include ../common/sdf3d/sdIcosahedron.glsl
#pragma webpack include ../common/sdf3d/sdDodecahedron.glsl
#pragma webpack include ../common/sdf3d/sdLego.glsl
#pragma webpack include ../common/sdf3d/sdOctahedron.glsl
#pragma webpack include ../common/sdf3d/sdArrow.glsl
#pragma webpack include ../common/sdf3d/sdTetrahedron.glsl
#pragma webpack include ../common/sdf3d/sdBox.glsl

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
uniform vec3 extra;
uniform vec2 iResolution;
uniform vec2 iMouse;
in float n;
in vec2 coord;
out vec4 fragColor;

#pragma webpack include ../common/constants.glsl

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

RMHit add(RMHit a, RMHit b) {
  //    return a.distance < b.distance
  //        ? RMHit(a.distance, a.color)
  //        : RMHit(b.distance, b.color);
  return mixa(a, b, float(b.distance < a.distance));
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
float demoIcosahedron(float r, vec3 p) {
  float d1 = sdIcosahedron(1.0 - r, p - vec3(0, 0, 1)) - r;
  return d1;
}
float demoVector(float r, vec3 p) {
  //  float d1 = sdArrow(vec3(0), vec3(3), p);
  float d1 = sdArrow(1.0, ((p - vec3(0, -1, 0.2)) * 0.5).yzx);
  return d1;
}
float demoOctahedron(float r, vec3 p) {
  float d1 = sdOctahedron(1.0 - r, p - vec3(0, 0, 1)) - r;
  return d1;
}
float demoCube(float r, vec3 p) {
  float d1 = sdBox(vec3(1.0 - r), p - vec3(0, 0, 1)) - r;
  return d1;
}
float demoTetrahedron(float r, vec3 p) {
  float d1 = sdTetrahedron(1.0 - r * sqrt(6.0), p - vec3(0, 0, 1)) - r;
  return d1;
}
float demoDodecahedron(float r, vec3 p) {
  float d1 = sdDodecahedron(1.0, p - vec3(0, 0, 1)) - r;
  return d1;
}
float demoPlatonic(float r, vec3 p) {
  float d1 = sdDodecahedron(0.8, p - vec3(0, 0, 1)) - r;
  float d2 = sdIcosahedron(1.0 - r, p - vec3(0, 0, 1)) - r;
  return mix(d1, d2, sin(iTime) * 0.5 + 0.5);
}
float demoLego(float r, vec3 p) {
  float scale = 2.0;
  float d1 = sdLego(p * scale - vec3(0, 2, 0)) / scale;
  float d2 =
    sdLego(rotX(200.0 * DEGREE) * (p * scale - vec3(0, -2, 2))) / scale;
  return min(d1, d2);
}
#define SDF(r, p) demoIcosahedron(r, p)

RMHit sdf(vec3 p) {
  float scale = 2.0;
  float ds = SDF(d * 0.1, p);
  float dg = p.z;
  if (ds < dg) {
    vec3 color = ungamma(colorPrimary);
    return RMHit(ds, vec4(color, 1));
  } else {
    float f = checkerboardGrad(p.xy);

    vec3 color = mix(ungamma(colorBackground), ungamma(colorSecondary), f);
    return RMHit(dg, vec4(color, 1));
  }
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
  RMHit hit;
  for (int i = 0; i < 200; i++) {
    hit = sdf(pos);
    if (hit.distance < 0.0001 * hit.distance) break;
    pos = pos + dir1 * hit.distance;
  }
  return RMResult(hit.distance, pos, hit.color);
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
      vec3(sdff(p))
  );
}

//layout (depth_greater) out float gl_FragDepth;
void main() {
  vec3 camPos =
    vec3(20, 0, 10) +
    (-1.0 == iMouse.x
      ? vec3(0)
      : vec3(0, (iMouse / iResolution * 2.0 - 1.0) * 10.0));
  mat4 modelView =
    perspective(10.0, iResolution.x / iResolution.y, 0.1, 20.0) *
    lookAt(camPos, vec3(0, 0, 1), vec3(0, 0, 1));
  mat4 modelViewInverse = inverse(modelView);

  vec3 light = normalize(vec3(-1.0, -2.0, -2));

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
  float inSun = softshadow(
    hitWC.pos + hitn1 * 0.05,
    -light,
    0.0001,
    300.0,
    8.0
  );
  //    float inSun=1.;

  vec3 material = hitWC.color.xyz;
  if (dWC > 100.0) {
    material = vec3(0.0, 0.0, 0.0);
    //    } else if (p.z >= 0.001) {
    //        material = vec3(0.2, 0.0, 0.0);
    //    } else {
    //        vec2 c = vec2(4.0, 2.0);
    //        vec2 id = floor(((p.xy - c * 0.5) / c) );
    //        material += .15 * cos(vec3(id.x, id.y + 2., id.x + id.y + 4.));
  }

  const vec3 sunlightColor = vec3(3.0);

  float aOcc = ambientOcclusion(hitWC.pos, hitn1);

  vec3 reflectionDirection = reflect(light, hitn1);

  vec3 color = vec3(0.0);
  color += material * aOcc;
  color += inSun * sunlightColor * material * max(0.0, dot(-light, hitn1));
  //    color = (hitn1);

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
  //    fragColor = mix(hitWC.color, colorBackground, mix(0.5, 1.0, inSun) * clamp(lightIntensity, 0., 1.));
  color = pow(color, vec3(1.0 / 2.2)); // gamma correction
  fragColor = vec4(color, 1.0);
}
