#version 300 es

precision highp float;

#pragma webpack include ../common/colors.glsl
#pragma webpack include ../common/matrices.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/sdf3d/sdArrow.glsl
#pragma webpack include ../common/sdf3d/sdBox.glsl
#pragma webpack include ../common/sdf3d/sdIcosahedron.glsl
#pragma webpack include ../common/sdf3d/sdOctahedron.glsl
#pragma webpack include ../common/sdf3d/sdTetrahedron.glsl
#pragma webpack include ../common/ungamma.glsl

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

Hit addTillet(float r, Hit a, Hit b) {
  if (a.distance < r && b.distance < r) {
    return Hit(
      r - distance(vec2(a.distance, b.distance), vec2(r)),
      mix(a.color, b.color, (a.distance - b.distance) / r * 0.5 + 0.5)
    );
  } else {
    return add(a, b);
  }
}

Hit addTillet(float r, Hit a, Hit b, vec4 tilletColor) {
  if (a.distance < r && b.distance < r) {
    return Hit(
      r - distance(vec2(a.distance, b.distance), vec2(r)),
      tilletColor
    );
  } else {
    return add(a, b);
  }
}
Hit addTillet2(float r, Hit a, Hit b) {
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

const float r = 0.0;
vec3 reject(vec3 a, vec3 b1) {
  return a - b1 * dot(a, b1);
}
float demoIcosahedron(vec3 p) {
  float d1 = sdIcosahedron(1.0 - r, p - vec3(0, 0, 1)) - r;
  float d2 = p.z;
  return min(d1, d2);
}
float demoOctahedron(vec3 p) {
  float d1 = sdOctahedron(1.0 - r, p - vec3(0, 0, 1)) - r;
  float d2 = p.z;
  return min(d1, d2);
}
float demoCube(vec3 p) {
  float d1 = sdBox(vec3(1.0 - r), p - vec3(0, 0, 1)) - r;
  float d2 = p.z;
  return min(d1, d2);
}
Hit gizmo(vec3 p) {
  vec3 absp = abs(p);

  Hit res = Hit(sdArrow(1.0, p), vec4(RED, 1));
  res = add(res, Hit(sdArrow(1.0, p.yzx), vec4(GREEN, 1)));
  res = add(res, Hit(sdArrow(1.0, p.zxy), vec4(BLUE, 1)));
  res = add(res, Hit(length(p) - 0.05, vec4(BLACK, 1)));
  return res;
}
#pragma webpack include ../common/squareWave.glsl

float sdtetra(vec3 p) {
  float r = d * 0.1;
  return sdTetrahedron(b - r / sqrt(1.0 / 6.0), p) - r;
}
float demoTetrahedron(vec3 p, out vec3 color) {
  const vec3 ta = vec3(0, -1, -SQRT1_2);
  const vec3 tb = vec3(0, 1, -SQRT1_2);
  const vec3 tc = vec3(1, 0, SQRT1_2);
  const vec3 td = vec3(-1, 0, SQRT1_2);
  const vec3 x = 0.5 * (ta + td);
  const vec3 x2 = 0.5 * (tb + td);
  const vec3 mirror = normalize(-cross(x - tb, x - tc));
  const vec3 mirror2 = normalize(cross(x2 - ta, x2 - tc));
  float dbox = sdBox(vec3(3.0), p);
  if (dbox > 0.0) {
    color = SALMON;
    return dbox + 1.0;
  }
  Hit d1 = gizmo(p - vec3(0, 0, 1));
  vec3 fgh = normalize(vec3(0, 1, -SQRT2));
  vec3 cc;
  float d2 = p.z;
  p = p - vec3(0, 0, 1);
  d1 = add(d1, Hit(sdtetra(p), vec4(ungamma(colorPrimary), 1)));
  d1 = add(d1, Hit(distance(ta, p) - 0.1, vec4(OLIVE_DRAB, 1)));
  d1 = add(d1, Hit(distance(tb, p) - 0.1, vec4(OLIVE_DRAB, 1)));
  d1 = add(d1, Hit(distance(tc, p) - 0.1, vec4(OLIVE_DRAB, 1)));
  d1 = add(d1, Hit(distance(td, p) - 0.1, vec4(OLIVE_DRAB, 1)));
  d1 = add(d1, Hit(sdArrow(vec3(0), mirror2, p), vec4(OLIVE_DRAB, 1)));
  d1 = add(d1, Hit(length(p) - sqrt(1.0 / 6.0) - 0.002, vec4(CHARTREUSE, 1)));
  d1 = add(
    d1,
    Hit(sdArrow(0.5 * (tc + td), 0.5 * (tc + td) + fgh, p), vec4(OLIVE_DRAB, 1))
  );
  float cd = sdBox(vec3(2.0, 2.0, 0.005), p - vec3(0, 0, a));
  d1 = add(
    d1,
    Hit(cd, vec4(mix(BLUE, CYAN, squareWave(sdtetra(p) * 10.0)), 1))
  );
  d1 = sub(d1, Hit(sdBox(vec3(10), p - vec3(0, 0, c)), vec4(HOT_PINK, 1)));
  //  float d1 = sdTetrahedron(1.0 - r, p - vec3(0, 0, 1), color) - r;
  if (d2 < d1.distance) {
    color = WHITE;
    return d2;
  } else {
    color = d1.color.xyz;
    return d1.distance;
  }
}

float sdf(vec3 p, out vec3 color) {
  return demoTetrahedron(p, color);
}
float sdf(vec3 p) {
  vec3 v;
  return sdf(p, v);
}
float ambientOcclusion(vec3 pWC, vec3 n1WC) {
  float k = 1.0;
  float distance = sdf(pWC + n1WC * k);
  return clamp(distance / k, 0.0, 1.0);
}

struct RMResult {
  float distance;
  vec3 pos;
  vec4 color;
};
RMResult raymarching2(vec3 start, vec3 dir1) {
  vec3 pos = start;
  float hit;
  vec3 color;
  for (int i = 0; i < 200; i++) {
    vec3 newColor;
    hit = sdf(pos, newColor);
    if (hit < 0.0001 * hit) break;
    pos = pos + dir1 * hit;
    color = newColor;
  }
  if (color == WHITE) {
    vec2 ff = round(fract(pos.xy * 0.5));

    color = mix(
      ungamma(colorBackground),
      ungamma(colorSecondary),
      mod(ff.x + ff.y, 2.0)
    );
  }
  return RMResult(hit, pos, vec4(color, 1.0));
}
vec3 pt(mat4 pm, vec3 p) {
  vec4 pStar = pm * vec4(p, 1.0);
  return pStar.xyz / pStar.w;
}

float softshadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
  float res = 1.0;
  float t = 0.1;
  for (int i = 0; i < 1000 && t < maxt; i++) {
    float h = sdf(ro + rd * t);
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
      sdf(p + vec3(eps, 0.0, 0.0)),
      sdf(p + vec3(0.0, eps, 0.0)),
      sdf(p + vec3(0.0, 0.0, eps))
    ) -
      vec3(sdf(p))
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
    perspective(8.0, iResolution.x / iResolution.y, 0.1, 20.0) *
    lookAt(camPos, vec3(0, 0, 1), vec3(0, 0, 1));
  mat4 modelViewInverse = inverse(modelView);

  vec3 light = normalize(vec3(-1.0, -2.0, -2));

  vec3 a = vec3(coord * 2.0 - 1.0, -1.0);
  vec3 b = vec3(coord * 2.0 - 1.0, 1.0);
  vec3 aWC = pt(modelViewInverse, a);
  vec3 bWC = pt(modelViewInverse, b);
  vec3 lookDir1 = normalize(bWC - aWC);

  RMResult hitWC = raymarching2(aWC, lookDir1);
  vec3 hitn1 = sdfNormal1(hitWC.pos, hitWC.distance);
  float dWC = distance(aWC, hitWC.pos);
  vec3 hitNDC = pt(modelView, hitWC.pos);
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
