#version 300 es

precision highp float;

#pragma webpack include ../common/sdf2d/sdSegment.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/banded.glsl
#pragma webpack include ../common/between.glsl
#pragma webpack include ../common/hex2Ra.glsl
#pragma webpack include ../common/hexRound.glsl
#pragma webpack include ../common/hexSdf.glsl
#pragma webpack include ../common/max3.glsl
#pragma webpack include ../common/perlin2DTexture.glsl
#pragma webpack include ../common/polar.glsl
#pragma webpack include ../common/ra2Hex.glsl
#pragma webpack include ../common/remix.glsl
#pragma webpack include ../common/unmix.glsl
#pragma webpack include ../common/visualize.glsl
#pragma webpack include ../common/waves.glsl
#pragma webpack include ../common/matrices.glsl

#pragma webpack include ../common/sdf3d/sdDonut.glsl
#pragma webpack include ../common/sdf3d/sdCapsule.glsl
#pragma webpack include ../common/sdf3d/opElongate.glsl
#pragma webpack include ../common/sdf3d/sdSphere.glsl
#pragma webpack include ../common/sdf3d/sdCylinder.glsl
#pragma webpack include ../common/sdf3d/addChamfer.glsl
#pragma webpack include ../common/sdf3d/addChamfer.glsl
#pragma webpack include ../common/sdf3d/addTillet.glsl
#pragma webpack include ../common/sdf3d/sdBox.glsl
#pragma webpack include ../common/sdf3d/sdOctahedron.glsl
#pragma webpack include ../common/sdf3d/add.glsl
#pragma webpack include ../common/sdf3d/sub.glsl

#pragma webpack include ../common/complex.glsl
#pragma webpack include ../common/quaternion.glsl
#pragma webpack include ../common/constants.glsl

uniform sampler2D texture;
uniform float secs;
uniform mat4 lll;
uniform mat4 llli;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBackground;
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

struct FxDFx {
  float fx;
  vec2 dfx;
};

// f(r,a) = r - 1 + sin(3a+2r2)/2
//float f(vec2 polar) {
//  float r = length()polar.x;
//  float a = polar.y;
//  return r - 1.0 + sin(25.0 * a + 20.0 * r * r) / 2.0;
//}
//vec2 df(vec2 x) {
//  float r = length(x);
//  float a = atan(x.y, x.x);
//  vec2 da = vec2(x.y, -x.x) / (r * r);
//  return x / r + (1.5 * da + 2.0 * x) * cos(3.0 * a + 2.0 * r * r);
//}

FxDFx ff(vec2 p) {
  float r = length(p);
  float a = atan(p.x, p.y);
  float fx = r - 1.0 + 0.5 * sin(3.0 * a + 2.0 * r * r);
  vec2 da = vec2(p.y, -p.x) / (r * r);
  vec2 dfx = p / r + (1.5 * da + 2.0 * p) * cos(3.0 * a + 2.0 * r * r);
  return FxDFx(fx, dfx);
}

#define CHAIN(NAME, F, G)                                                      \
  FxDFx NAME(vec2 p) {                                                         \
    FxDFx gResult = G(x);                                                      \
    return FxDFx();                                                            \
  }

float f(vec2 x) {
  float r = length(x);
  float a = atan(x.y, x.x);
  return r - 1.0 + 0.5 * sin(5.0 * a + 2.0 * r * r);
}
vec2 grad(vec2 x) {
  vec2 h = vec2(0.01, 0.0);
  return vec2(f(x + h.xy) - f(x - h.xy), f(x + h.yx) - f(x - h.yx)) /
  (2.0 * h.x);
}
uniform vec2 iMouse;
uniform vec2 iResolution;

float pointGrid(float scale, vec2 p) {
  p -= 0.5;
  p /= scale;
  vec2 pCenter = round(p);
  return smoothstep(-0.5, -0.4, -distance(pCenter, p) * scale);
}

float lineGrid(float scale, vec2 p) {
  p -= 0.5;
  p /= scale;
  vec2 pCenter = round(p);
  vec2 d = abs(p - pCenter);
  return smoothstep(-0.5, -0.4, -min(d.x, d.y) * scale);
}
float lineGrid(float scale, vec2 p, vec2 dp) {
  p -= 0.5;
  p /= scale;
  vec2 pCenter = round(p);
  vec2 d = abs((p - pCenter) / dp);
  return smoothstep(-0.5, -0.4, -min(d.x, d.y) * scale);
}
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
float lineCross(float scale, vec2 p, mat2 dp) {
  p -= 0.5;
  p /= scale;
  dp /= scale;
  //  vec2 d = abs(p * inverse(dp));
  //  vec2 d = abs(inverse(dp) * p);
  //  vec2 d = abs(dp * p);
  vec2 d = abs(p);
  //  vec2 d = abs(p * dp);
  return smoothstep(-0.5, -0.4, -min(d.x, d.y));
}
const vec3 white = vec3(1);
const vec3 red = vec3(1, 0, 0);

vec2 fff2(vec2 x) {
  vec2 p = toPolar(x);
  return fromPolar(p.x, p.x);
}
vec2 fff(vec2 x) {
  vec2 p = toPolar(x);
  vec2 pp = vec2(p.x, p.y + 0.01 * p.x);
  return fromPolar(pp);
}

vec2 ff3(vec2 x) {
  return 1.0 + cos(x / 50.0) * 30.0 / 50.0;
  return 1.0 + cos(x / 50.0) * 30.0 * a / 50.0;
}
vec2 cPow(vec2 fragCoord, float it) {
  vec2 w = fragCoord / a / 50.0;
  float z = 1.0 / c;
  // w = r * e ^ (i * phi)
  // ln(w) = ln(r) + i * phi
  // w^z = e^(z * log(w)) = e^(z * (ln(r) + i * (phi))
  vec2 wPolar = toPolar(w);
  wPolar.y += it * TAU;
  vec2 eExp = z * vec2(log(wPolar.x), wPolar.y);
  if (!between(-PI, PI, eExp.y)) {
    return vec2(0);
  }
  return complexPow(eExp);
}

#define DERIVATIVE_2_2(NAME, F, EPS)                                           \
  mat2 NAME(vec2 x) {                                                          \
    vec2 fx = F(x);                                                            \
    vec2 fx1 = F(x + vec2(EPS, 0));                                            \
    vec2 fx2 = F(x + vec2(0, EPS));                                            \
    return mat2(fx1 - fx, fx2 - fx) / (EPS);                                   \
  }

DERIVATIVE_2_2(dfff, fff, 1e-4)
DERIVATIVE_2_2(dff3, ff3, 1e-4)
mat2 dCPow(vec2 x, float it) {
  const float EPS = 1e-3;
  vec2 fx = cPow(x, it);
  vec2 fx1 = cPow(x + vec2(EPS, 0), it);
  vec2 fx2 = cPow(x + vec2(0, EPS), it);
  return mat2(fx1 - fx, fx2 - fx) / EPS;
}

#define MIX_MAT(genMType)                                                      \
  genMType mixMat(genMType a, genMType b, float t) {                           \
    return (1.0 - t) * a + t * b;                                              \
  }

MIX_MAT(mat2)

#define MIN3(G)                                                                \
  G min3(G a, G b, G c) {                                                      \
    return min(min(a, b), c);                                                  \
  }

MIN3(vec2)

uniform float iTime;
vec3 ungamma(vec4 col) {
  return pow(col.rgb, vec3(2.2));
}

void main() {
  vec2 fragCoord = coord * iResolution;
  //  //  vec2 p = toPolar(coord * 2.0);
  vec2 crd = coord;
  crd *= 2.0;
  //  FxDFx r = ff(crd);
  //  float fx = r.fx;
  //  vec2 dfx = r.dfx;
  //  float de = abs(fx) / length(dfx);
  //  //  fx = abs(fx);
  //  //  de = smoothstep(0.01, 0.02, de);
  //  //  vec3 color = vec3(fx);
  //  fragColor = visualize(de);
  //  //  fragColor = vec4(color, 1.0);

  vec4 z = vec4(coord, 0.0, 0.0);
  const vec4 c = vec4(-0.4, 0.6, 0.0, 0.0);
  int i = 0;
  for (; i < 30; i++) {
    z = quatMult(z, z) + c;
    const vec4 c2 = vec4(-0.4, 0.6, 0.0, 0.0);
    int i = 0;
    for (; i < 30; i++) {
      z = quatMult(z, z) + c2;
      if (length(z) > 1.2) {
        break;
      }
    }

    //  vec3 color=mix(bl)

    vec2 x = crd;
    float v = f(x);
    vec2 g = grad(x);
    float de = abs(v) / length(g);
    vec3 color;
    //  fragColor = visualize(pow(de, 0.5));
    color = mix(vec3(1.0), vec3(0.0, 0.0, 1.0), float(i) / 30.0);

    {
      int i = 0;
      vec4 z = vec4(iMouse, 0, 0);
      for (; i < 30; i++) {
        vec4 prevZ = z;
        z = quatMult(z, z) + c;
        if (sdSegment(prevZ.xy, z.xy, coord) < 0.002) {
          color = mix(vec3(0, 0, 0), vec3(0.1, 1.0, 0), float(i) / 30.0);
          break;
        }
        if (length(z) > 1.2) {
          break;
        }
      }
    }
    if (distance(vec2(0), coord) < 0.05) {
      color = vec3(1, 0, 0);
    }
    if (distance(c.xy, coord) < 0.05) {
      color = vec3(0, 1, 0);
    }
    //  fragColor = visualize(sdSegment(vec2(0), iMouse, coord));
    //  color = mix(white, vec3(1, 0, 1), pointGrid(20.0, fragCoord));
    //  fragCoord += sin(fragCoord / 50.0) * 30.0;
    //    fragCoord -= 800.0;
    //  fragCoord *= 2.0;
    //  fragCoord = ff3(fragCoord);
    //  vec2 dFragCoord = 1.0 + cos(fragCoord / 50.0) * 30.0 / 50.0;
    mat2 dFragCoord = dfff(fragCoord);
    color = mix(white, vec3(1, 0, 1), lineGrid(20.0, fragCoord, vec2(1.0)));
    fragColor = vec4(color, 1.0);
    fragColor = visualize(determinant(dFragCoord));
    if (distance(c2.xy, coord) < 0.05) {
      color = vec3(0, 1, 0);
    }

    color = pow(color, vec3(1.0 / 2.2)); // gamma correction
    //  color = mix(white, vec3(1, 0, 1), pointGrid(20.0, fragCoord));
    //  fragCoord += sin(fragCoord / 50.0) * 30.0;
    vec2 p = fragCoord;
    p -= 0.5 * iResolution;
    //  p.y *= -1.0;
    //  p *= 2.0;
    //  p = ff3(p);
    //  vec2 dFragCoord = 1.0 + cos(p / 50.0) * 30.0 / 50.0;
    mat2 mi = inverse(mat2(1.0, 0.0, 0.0, 1.0) * a * 20.0);
    mat2 id = mat2(1.0, 0.0, 0.0, 1.0);
    float t = 0.0;
    color = white;
    //  color = mix(
    //    color,
    //    vec3(cPow(p) / 4.0, 0),
    //    lineGrid(cPow(p), dCPow(p))
    //  );

    //  for (int i = -100; i < 100; i++) {
    //    vec2 p = vec2(i, 2.0);
    //    p = cPow(p, 0.0);
    //    p *= 10.0;
    //    float xxx = float(distance(p, p) < 5.0);
    //    color = mix(color, vec3(float(i + 100) / 100.0, 0, 0), xxx);
    //  }
    // TODO: save this line grid/complex mult demo
    //    for (float it = -2.0; it <= 2.0; it++) {
    //      //    p += it * vec2(1.0) * d;
    //      color = mix(
    //        color,
    //        vec3(0.5),
    //        //      vec3(cPow(p, it) / 4.0, 0),
    //        lineGrid(cPow(p, it), dCPow(p, it))
    //      );
    //    }
    vec3 color0 = colorBackground.rgb;
    vec3 color1 = colorPrimary.rgb;
    vec3 color2 = colorSecondary.rgb;
    float val = 1000.0;
    //    const vec3 orange = vec3(1.0, 0.843, 0);
    //    color = mix(color, color1, float(distance(a, fragCoord) < 10.0));
    //    color = mix(color, color1, float(distance(b, fragCoord) < 10.0));
    //    color = mix(color, color1, float(distance(c, fragCoord) < 10.0));
    //    color = mix(color, color2, float(sdSegment(a, b, fragCoord) < 3.0));
    //    color = vec3(fragCoord, 0.0);
    color = pow(color, vec3(1.0 / 2.2)); // gamma correction
    fragColor = vec4(color, 1.0);
    //  fragColor = visualize(determinant(dFragCoord));
  }
}

