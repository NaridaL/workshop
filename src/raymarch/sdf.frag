#version 300 es

precision highp float;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

#pragma glslify: banded = require(../shaderfunctions/banded.glsl)
#pragma glslify: between = require(../shaderfunctions/between.glsl)
#pragma glslify: fromPolar = require(../shaderfunctions/fromPolar.glsl)
#pragma glslify: hex2Ra = require(../shaderfunctions/hex2Ra.glsl)
#pragma glslify: hexRound = require(../shaderfunctions/hexRound.glsl)
#pragma glslify: hexSdf = require(../shaderfunctions/hexSdf.glsl)
#pragma glslify: max3 = require(../shaderfunctions/max3.glsl)
#pragma glslify: perlin2D = require(../shaderfunctions/perlin2DTexture.glsl)
#pragma glslify: ra2Hex = require(../shaderfunctions/ra2Hex.glsl)
#pragma glslify: remix = require(../shaderfunctions/remix.glsl)
#pragma glslify: rotX = require(../shaderfunctions/rotX.glsl)
#pragma glslify: rotY = require(../shaderfunctions/rotY.glsl)
#pragma glslify: rotZ = require(../shaderfunctions/rotZ.glsl)
#pragma glslify: toPolar = require(../shaderfunctions/toPolar.glsl)
#pragma glslify: unmix = require(../shaderfunctions/unmix.glsl)
#pragma glslify: visualize = require(../shaderfunctions/visualize.glsl)
#pragma glslify: waves = require(../shaderfunctions/waves.glsl)

#pragma glslify: add = require(../shaderfunctions/sdf/add.glsl)
#pragma glslify: addChamfer = require(../shaderfunctions/sdf/addChamfer.glsl)
#pragma glslify: addTillet = require(../shaderfunctions/sdf/addTillet.glsl)
#pragma glslify: opElongate = require(../shaderfunctions/sdf/opElongate.glsl)
#pragma glslify: opRepLim = require(../shaderfunctions/sdf/opRepLim.glsl)
#pragma glslify: sdBox = require(../shaderfunctions/sdf/sdBox.glsl)
#pragma glslify: sdCylinder = require(../shaderfunctions/sdf/sdCylinder.glsl)
#pragma glslify: sdDonut = require(../shaderfunctions/sdf/sdDonut.glsl)
#pragma glslify: sdIcosahedron = require(../shaderfunctions/sdf/sdIcosahedron.glsl)
#pragma glslify: sdOctahedron = require(../shaderfunctions/sdf/sdOctahedron.glsl)
#pragma glslify: sdPyramid = require(../shaderfunctions/sdf/sdPyramid.glsl)
#pragma glslify: sdSphere = require(../shaderfunctions/sdf/sdSphere.glsl)
#pragma glslify: sub = require(../shaderfunctions/sdf/sub.glsl)

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

const float TAU = 6.283185307179586;
const float SQRT1_2 = 0.7071067811865476;
const float SQRT2 = 1.4142135623730951;
const float PI = 3.141592653589793;

const vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 yellow = vec4(1.0, 1.0, 0.0, 1.0);
const vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 purple = vec4(0.5, 0.0, 0.5, 1.0);
const vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

struct RMHit {float distance;vec4 color;} ;
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
  return rblock(0.4 + 0.3 * sin(secs + center.x), p - center);
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

float roundedBlock(vec3 r, float cr, vec3 p) {
  return betterBox(r - vec3(cr), p) - cr;
}

float sdConeB(vec2 c, float h, vec3 p) {
  float q = length(p.xz);
  return max(dot(c.xy, vec2(q, p.y)), -h - p.y);
}

float sdCone(vec2 c, float h, vec3 p) {
  vec2 q = h * vec2(c.x / c.y, -1.0);
  vec2 w = vec2(length(p.xz), p.y);
  vec2 a = w - q * clamp(dot(w, q) / dot(q, q), 0.0, 1.0);
  vec2 b = w - q * vec2(clamp(w.x / q.x, 0.0, 1.0), 1.0);
  float k = sign(q.y);
  float d = min(dot(a, a), dot(b, b));
  float s = max(k * (w.x * q.y - w.y * q.x), k * (w.y - q.y));
  return sqrt(d) * sign(s);
}

float sdCapsule(vec3 a, vec3 b, float r, vec3 p) {
  vec3 pa = p - a;
  vec3 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
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

float sdCappedCylinder(float h, float r, vec3 p) {
  vec2 d = vec2(length(p.xy), abs(p.z)) - vec2(r, h);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}
float smoothmin(float r, float a, float b) {
  float h = smoothstep(-r, r, a - b);
  return mix(a, b, h) - r * h * (1.0 - h);
}
float queen(vec3 p) {
  float lxy = length(p.xy);
  float d;
  d = lxy - 1.1;
  d += 0.16 * p.z;
  d -= -c * (1.0 - pow(sin01(b + p.z * 2.5), 1.5));
  d += 0.1 * normalize(p.xy).x * smoothstep(2.0, 0.5, p.z);
  d += 0.02 *
  sin(15.0 * atan(p.y, p.x) - p.z * 5.0) *
  smoothstep(2.0, 0.5, p.z);
  //    float d = sdCappedCylinder(a, b, p);
  d = max(d, -p.z);
  d = max(d, p.z - 4.0);

  float head = sdSphere(0.55, p - vec3(0.0, 0.0, 4.4));
  d = smoothmin(0.15, d, head);
  float crown = sdCone(
    fromPolar(vec2(1.0, 1.15)),
    1.0,
    -(p - vec3(0.0, 0.0, 4.5)).yzx
  );
  d = min(d, crown);
  d *= 0.5;
  return d;
}
float lego(vec3 p) {
  vec2 c = vec2(4.0, 2.0);
  //    p.xy = mod(p.xy + c * 0.5, c) - c * 0.5;
  float lxy = length(p.xy);
  p -= vec3(0.0, 0.0, 0.6);
  float d;
  const float cr = 0.02;
  d = sdBox(vec3(2.0, 1.0, 0.6), cr, p);
  //    vec3 p8 = vec3(fract(p.xy + 0.5) - 0.5, p.z);
  vec3 p8 = vec3(abs(abs(p.xy) - vec2(1.0, 0.0)), p.z) - vec3(0.5, 0.5, 0.6);
  float dCyl = sdCylinder(0.35 - 0.04, 0.2, p8) - 0.04;
  d = min(d, dCyl);
  return d;
}

vec2 project(vec2 a, vec2 onto1) {
  return onto1 * (dot(a, onto1) / dot(onto1, onto1));
}

vec3 reject(vec3 a, vec3 b1) {
  return a - b1 * dot(a, b1);
}

RMHit sdf(vec3 p) {
  const vec4 red = vec4(0.2, 0.0, 0.0, 1.0);
  //    RMHit d = RMHit(block(vec3(-1., -1., -1.), vec3(1., 1., 1.), p), black);
  //    RMHit d = RMHit(sphere(2., p), black);
  //    RMHit d = RMHit(betterBox(vec3(1.), p), black);
  //    RMHit d = RMHit(roundedBlock(vec3(1.), 0.1, p), black);
  //    RMHit d = RMHit(donut(2., 0.5, p), black);
  //    RMHit d = RMHit(sdCapsule(vec3(-a,-a,0.), vec3(a,a,0.), b, p), black);
  //    RMHit d = RMHit(sdEllipsoidB(vec3(-a,-b,1.), p), black);
  //    RMHit d = RMHit(sdOctahedron(1., p)-a, red) ;
  //    RMHit d = RMHit(queen(p), black) ;
  //    RMHit d = RMHit(lego(p), black) ;
  //- vec3(0.0, 0.0, 1.0)
  vec3 h = vec3(0.5, 0.0, 0.0);
  vec3 q = abs(p) - h;
  //    vec2 pyr = sdPyramid(
  //        vec3(2.0, 2.0, -2.0),
  //        opElongate(h,
  //            rotZ(highResTimeStamp/1000.) *
  //                rotX(c) *
  //                opRepLim(p - vec3(-8., -8., 2.), vec3(8.), vec3(2., 2., 0.))));
  vec3 p2 = rotX(highResTimeStamp * 0.0) * p;
  vec2 xx = vec2(sdIcosahedron(d, p2) - c, 1.0);
  vec4 cc = red;
  cc.xyz = cc.xyz * xx.y * 0.1;
  RMHit d = RMHit(xx.x, cc);
  //    RMHit d = RMHit(sdCone(fromPolar(vec2(1., a)), b, p.yzx - vec3(0.,2., 0.)), black);
  //    d.distance = abs(d.distance) - 0.4;
  //    d.distance = abs(d.distance) - 0.1;
  //    d.distance = abs(d.distance) - 0.02;
  float s = length(p - vec3(1.0, 1.0, 0.0)) - 1.0;
  //    d.distance = s;
  //    d.distance = max(d.distance, -s);

  vec3 color = 0.1 * sin(abs(vec3(0.0, PI, 0.0) + vec3(d.distance * PI * 2.0)));
  //    color.z = .1*xx.y;
  RMHit base = RMHit(sdBox(vec3(10.0, 10.0, 0.0), p), vec4(color, 1.0));

  //    d = base;
  d = add(base, d);
  if (b > 1.0) {
    d = base;
  }
  //    d.distance *=0.5;
  return d;
}
float sdff(vec3 p) {
  return sdf(p).distance;
}
float ambientOcclusion(vec3 pWC, vec3 n1WC) {
  float k = 1.0;
  float distance = sdff(pWC + n1WC * k);
  return clamp(distance / k, 0.0, 1.0);
}

struct RMResult {float distance;vec3 pos;vec4 color;} ;
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
      vec3(sdff(p))
  );
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
}
