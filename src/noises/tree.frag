#version 300 es

precision highp float;

#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/ungamma.glsl
#pragma webpack include ../common/transform.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/squareWave.glsl
#pragma webpack include ../common/OpenSimplex2.glsl
#pragma webpack include ../common/checkerboardGrad.glsl
#pragma webpack include ../common/colors.glsl
#pragma webpack include ../common/sdf3d/sdIcosahedron.glsl
#pragma webpack include ../common/sdf3d/sdDodecahedron.glsl
#pragma webpack include ../common/sdf3d/sdCylinder.glsl
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
float wavy(float x) {
  return fract(x);
}
float wood(vec3 p) {
  return distance(p.xy, vec3(0).xy) +
  // narrower near top:
  0.01 * p.z +
  0.05 * openSimplex2_Conventional(p).w +
  0.01 * openSimplex2_Conventional(2.0 * p).w;
}
Hit sdf(vec3 p) {
  float scale = 2.0;
  float ds = sdCylinder(1.0, 1.0, p - vec3(0, -1.2, 1));
  ds = min(ds, sdBox(vec3(1.0), p - vec3(0, 1.2, 1)));
  if (ds > 1.0) {
    //    ds *= 0.1;
  }
  float dg = p.z;
  if (ds < dg) {
    float k = wood(p - vec3(0, -1.2, 0));

    vec3 color = mix(ungamma(SANDY_BROWN), ungamma(BROWN), wavy(k * 10.0));
    //    color = ungamma(colorPrimary);
    //        vec3 color = vec3(f);

    return Hit(ds, vec4(color, 1));
  } else {
    float f = checkerboardGrad(p.xy);

    vec3 color = mix(ungamma(colorBackground), ungamma(colorSecondary), f);
    return Hit(dg, vec4(color, 1));
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
  Hit hit;
  for (int i = 0; i < 100; i++) {
    hit = sdf(pos);
    if (hit.distance < 0.0001) break;
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
