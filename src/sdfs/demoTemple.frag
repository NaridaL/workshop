#version 300 es

precision highp float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/hex2Ra.glsl
#pragma webpack include ../common/hexRound.glsl
#pragma webpack include ../common/hexSdf.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/perlin2DTexture.glsl
#pragma webpack include ../common/hsl2rgb.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/ra2Hex.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/waves.glsl
#pragma webpack include ../common/matrices.glsl

#pragma webpack include ../common/sdf3d/sdDonut.glsl
#pragma webpack include ../common/sdf3d/sdSphere.glsl
#pragma webpack include ../common/sdf3d/sdCylinder.glsl
#pragma webpack include ../common/sdf3d/addChamfer.glsl
#pragma webpack include ../common/sdf3d/addTillet.glsl
#pragma webpack include ../common/sdf3d/sdBox.glsl
#pragma webpack include ../common/sdf3d/add.glsl
#pragma webpack include ../common/sdf3d/sub.glsl

uniform sampler2D texture;
uniform float iTime;
uniform vec2 iMouse;
uniform vec2 iResolution;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBg;
uniform float a;
uniform float b;
uniform float c;
uniform float d;
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

float rblock(float r, vec3 p) {
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
  return rblock(0.4 + 0.3 * sin(iTime + center.x), p - center);
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

RMHit sdf(vec3 p) {
  RMHit r = RMHit(skybox(p), colorBg);
  r = add(r, RMHit(sdBox(vec3(6.0, 6.0, 1.0), p), colorSecondary));
  return r;
  vec3 rotp = rotZ(0.1) * p;
  vec3 floorTiles = vec3(mod(rotp.xy, 0.1), rotp.z);
  float ftd = sdBox(
    vec3(0.045),
    rotY(d) * floorTiles - vec3(0.05, 0.05, -0.04)
  );
  float ftdl = max(ftd, sdBox(vec3(6), p));
  //    r = addTillet2(.01, r, RMHit(ftdl, colorSecondary));
  float dSphere = sdSphere(7.0, p);
  if (dSphere < 0.0) {
    RMHit m = RMHit(100000.0, black);
    for (int i = 0; i < 50; i++) {
      //            m = (addTillet(a, (m),
      m = addTillet2(
        a,
        m,
        //            m = (add((m),
        RMHit(
          sdDonut(
            0.5 + float(i) * 0.1,
            0.05,
            rotX(2.0 + sin(iTime * 0.01) * 0.2) * rotZ(float(i) * 0.2) * p
          ),
          vec4(hsl2rgb(float(i) / 50.0, 0.99, 0.25), 1.0)
        )
      );
    }
    //        float b = sdBox(vec3(-5.,-5.,0.),vec3(5., 5., .2), p);
    //        m = neg(add(neg(m),neg(RMHit(b, black))));
    //    r = sub(r, RMHit(m.distance - 0.2, colorSecondary));
    r = addTillet(0.3, r, m);
  } else {
    r = add(r, RMHit(dSphere + 1.0, black));
  }
  r = neg(addTillet(0.3, neg(r), RMHit(sdSphere(c, p - extra), black)));
  //    vec3 rotSyma = modRotZ(p, 7.);
  //    vec3 rotSym = rotZ(b) *rotY(c) * (vec3(1., sin(rotSyma.x)*d, 1.) + rotSyma);
  //    vec3 tiled = vec3(mod(rotSym.x, 10. *a), rotSym.yz);
  //    float q = sdSphere(1., tiled - vec3(5.*a, 0., 0.));
  //    r = add(r, RMHit(q, blue));
  //    for (int i = 0; i < 300; i++) {
  //        float f = unmix(0., 300., float(i));
  //        vec3 spherepos = fromPolar(mix(-6., 6., f), abs(mix(-10., 10., f)) + PI / 2., 0.);
  r = add(r, RMHit(sdSphere(0.1, p - campos), black));
  //    }
  //    r = (addTillet(0.1, (r), RMHit(sdDonut(1.5, 0.5, rotX(iTime*6.) * p), colorSecondary)));
  //    r = (addTillet(0.1, (r), RMHit(sdDonut(3.9, 0.5, rotY(iTime*3.) * p), blue)));
  //    r = neg(addTillet(.2, neg(r), RMHit(sdBox(vec3(-1., -1., -2.), vec3(1., 1., 2.), p), red)));
  //    r = add(r, wtf(p));
  //    r = add(r, RMHit(perlinSphere(1., p - vec3(-2.0, 0.0, 3.0)), purple));
  //    r = add(r, cylCircle(p));

  //    r = add(r, sdSphere(p - vec3(3., 3., 0.)));
  //    r = sub(r, RMHit(
  //        cylinder(1.3, 4.5, rotX(iTime/30. * TAU) * p- vec3(2.0, 0.0, 0.0) - vec3(0., 0., -2.25)),
  //        blue));
  //    r = add(r, cylinder(0.8, 4., rotX(iTime/30. * TAU) * p- vec3(2.0, 0.0, 0.0) - vec3(0., 0., -2.)));
  //    r = sub(r, cylCircle(p));
  return r;
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
    if (hit.distance < 0.0) break;
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

const float eps = 1e-5;
vec3 sdfNormal1(vec3 p, float d) {
  return normalize(
    vec3(
      sdff(p + vec3(eps, 0.0, 0.0)),
      sdff(p + vec3(0.0, eps, 0.0)),
      sdff(p + vec3(0.0, 0.0, eps))
    ) -
      vec3(d)
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
    perspective(40.0, iResolution.x / iResolution.y, 0.1, 20.0) *
    lookAt(camPos, vec3(0, 0, 1), vec3(0, 0, 1));
  mat4 modelViewInverse = inverse(modelView);

  vec3 light = normalize(vec3(-1.0, -2.0, -2));

  vec3 a = vec3(coord * 2.0 - 1.0, -1.0);
  vec3 b = vec3(coord * 2.0 - 1.0, 1.0);
  vec3 aWC = transform(modelViewInverse, a);
  vec3 bWC = transform(modelViewInverse, b);
  vec3 lookDir1 = normalize(bWC - aWC);
  //  vec3 light = normalize(vec3(-1.0, -2.0, -2));
  //
  //  vec3 a = vec3(coord, -1.0);
  //  vec3 b = vec3(coord, 1.0);
  //  vec3 aWC = transform(llli, a);
  //  vec3 bWC = transform(llli, b);
  //  vec3 lookDir1 = normalize(bWC - aWC);

  RMResult hitWC = raymarching2(aWC, lookDir1);
  vec3 hitn1 = sdfNormal1(hitWC.pos, hitWC.distance);
  float dWC = distance(aWC, hitWC.pos);
  //  vec3 hitNDC = transform(lll, hitWC.pos);

  //    vec3 sunPoint = raymarching2(hitWC.pos +hitn1 *.1, -light).pos;
  //    float inSun = float(distance(hitWC.pos, sunPoint) > 30.);
  float inSun = softshadow(hitWC.pos + hitn1 * 0.1, -light, 0.1, 30.0, 64.0);
  //    float inSun=1.;

  vec3 reflectionDirection = reflect(light, hitn1);
  vec3 eyeDirection = -lookDir1;
  float uMaterialShininess = 256.0;
  float specularLightWeighting = pow(
    max(dot(reflectionDirection, eyeDirection), 0.0),
    uMaterialShininess
  );
  //    float lightIntensity = 0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.);
  float lightIntensity =
    0.2 +
    0.5 * clamp(-dot(light, hitn1), 0.0, 1.0) +
    0.3 * specularLightWeighting;
  //    fragColor = visualize(blue, red, mix(0.5, 1.0, inSun) * lightIntensity);
  fragColor = mix(
    hitWC.color,
    colorBg,
    mix(0.5, 1.0, inSun) * clamp(lightIntensity, 0.0, 1.0)
  );
  fragColor /= 4.0;
  fragColor.a = 1.0;
  //    fragColor = visualize(hitWC.pos.x/10.);
  //    fragColor = hitWC.color;
  //    fragColor = visualize(blue, red, distance(hitWC, sunPoint)/20.);
  //    fragColor = vec4(coord,0.,1.);
  //    fragColor = vec4(aWC, 1.0);
  // remap [-1, 1] to [0, 1]
  // gl_FragDepth = hitNDC.z * 0.5 + 0.5;
  //    gl_FragDepth = .9999999;
}
