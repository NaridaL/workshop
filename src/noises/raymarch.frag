#version 300 es

precision highp float;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

#pragma glslify: banded = require(./shaderfunctions/banded.glsl)
#pragma glslify: between = require(./shaderfunctions/between.glsl)
#pragma glslify: hex2Ra = require(./shaderfunctions/hex2Ra.glsl)
#pragma glslify: hexRound = require(./shaderfunctions/hexRound.glsl)
#pragma glslify: hexSdf = require(./shaderfunctions/hexSdf.glsl)
#pragma glslify: max3 = require(./shaderfunctions/max3.glsl)
#pragma glslify: perlin2D = require(./shaderfunctions/perlin2DTexture.glsl)
#pragma glslify: fromPolar = require(./shaderfunctions/fromPolar.glsl)
#pragma glslify: ra2Hex = require(./shaderfunctions/ra2Hex.glsl)
#pragma glslify: remix = require(./shaderfunctions/remix.glsl)
#pragma glslify: unmix = require(./shaderfunctions/unmix.glsl)
#pragma glslify: visualize = require(./shaderfunctions/visualize.glsl)
#pragma glslify: waves = require(./shaderfunctions/waves.glsl)
#pragma glslify: rotX = require(./shaderfunctions/rotX.glsl)
#pragma glslify: rotY = require(./shaderfunctions/rotY.glsl)
#pragma glslify: rotZ = require(./shaderfunctions/rotZ.glsl)

#pragma glslify: donut = require(./shaderfunctions/sdf/donut.glsl)
#pragma glslify: sphere = require(./shaderfunctions/sdf/sphere.glsl)
#pragma glslify: cylinder = require(./shaderfunctions/sdf/cylinder.glsl)
#pragma glslify: addChamfer = require(./shaderfunctions/sdf/addChamfer.glsl)
#pragma glslify: addChamfer = require(./shaderfunctions/sdf/addChamfer.glsl)
#pragma glslify: addTillet = require(./shaderfunctions/sdf/addTillet.glsl)
#pragma glslify: block = require(./shaderfunctions/sdf/block.glsl)
#pragma glslify: add = require(./shaderfunctions/sdf/add.glsl)
#pragma glslify: sub = require(./shaderfunctions/sdf/sub.glsl)

uniform sampler2D texture;
uniform float secs;
uniform mat4 lll;
uniform mat4 llli;
uniform vec4 colorPrimary;
uniform vec4 colorSecondary;
uniform vec4 colorBg;
uniform float a;
uniform float highResTimeStamp;
uniform int bandCount;
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

struct RMHit {
    float distance;
    vec4 color;
};
RMHit mixa(RMHit a, RMHit b, float t) {
    return RMHit(mix(a.distance, b.distance, t), mix(a.color, b.color, t));
}
float skybox(vec3 p) {
    return 32. - max3(abs(p));
}

float perlinSphere(float radius, vec3 p) {
    vec3 cp = normalize(p);
    float alpha = atan(cp.y, cp.x);
    float beta = asin(cp.z);
    return length(p) - radius + 0.1 * perlin2D(vec2(0. / 100., 0.) + (vec2(5.)+vec2(alpha, beta))*8.0);
}


float cylCircle(vec3 p) {
    float d = 10e9;
    for (int i = 0; i < 10; i++) {
        d = min(d, cylinder(0.2, 2., p + fromPolar(3., TAU * float(i) / 10., 1.)));
    }

    return d;
}

float rblock(float r, vec3 p) {
    return block(-vec3(r), vec3(r), p);
}

RMHit add(RMHit a, RMHit b) {
//    return a.distance < b.distance
//        ? RMHit(a.distance, a.color)
//        : RMHit(b.distance, b.color);
    return mixa(a, b, float(b.distance < a.distance));
}

float wtf(vec3 p) {
    vec3 center = p - mod(p, 3.0) + vec3(1.5);
    return rblock(.4 + .3 * sin(secs+ center.x), p - center);
}

RMHit addTillet(float r, RMHit a, RMHit b) {
    if (a.distance < r && b.distance < r) {
        return RMHit(
            r - distance(vec2(a.distance, b.distance), vec2(r)),
            mix(a.color, b.color, (a.distance - b.distance) / r * 0.5 + 0.5));
    } else {
        return add(a, b);
    }
}

RMHit addTillet(float r, RMHit a, RMHit b, vec4 tilletColor) {
    if (a.distance < r && b.distance < r) {
        return RMHit(
            r - distance(vec2(a.distance, b.distance), vec2(r)),
            tilletColor);
    } else {
        return add(a, b);
    }
}

RMHit neg(RMHit a) {
    return RMHit(-a.distance, a.color);
}
RMHit sub(RMHit from, RMHit what) {
    RMHit whatNeg = neg(what);
    return mixa(from, whatNeg, float(whatNeg.distance > from.distance));
}

RMHit sdf(vec3 p) {
    RMHit d = RMHit(skybox(p), colorBg);
    d = add(d, RMHit(block(vec3(-6., -6., -1.), vec3(6., 6., 0.), p), colorSecondary));
    float dSphere = sphere(7., p);
    if (dSphere < 0.) {
        RMHit m = RMHit(100000., black);
        for (int i = 0; i < 50; i++) {
            m = (addTillet(0.4, (m),
            RMHit(
            donut(0.5 + float(i) * 0.1, 0.05, rotX(2.+sin(secs*0.01)*0.2) *rotZ(float(i)*0.2)* p),
            vec4(hsl2rgb(float(i) / 50., 0.99, 0.25), 1.0))));
        }
//        float b = block(vec3(-5.,-5.,0.),vec3(5., 5., .2), p);
//        m = neg(add(neg(m),neg(RMHit(b, black))));
        //    d = sub(d, RMHit(m.distance - 0.2, colorSecondary));
        d = addTillet(0.3, d, m);
    } else {
        d = add(d, RMHit(dSphere + 1., black));
    }
//    for (int i = 0; i < 300; i++) {
//        float f = unmix(0., 300., float(i));
//        vec3 spherepos = fromPolar(mix(-6., 6., f), abs(mix(-10., 10., f)) + PI / 2., 0.);
        d = add(d, RMHit(sphere(0.1, p - campos), black));
//    }
//    d = (addTillet(0.1, (d), RMHit(donut(1.5, 0.5, rotX(secs*6.) * p), colorSecondary)));
//    d = (addTillet(0.1, (d), RMHit(donut(3.9, 0.5, rotY(secs*3.) * p), blue)));
//    d = neg(addTillet(.2, neg(d), RMHit(block(vec3(-1., -1., -2.), vec3(1., 1., 2.), p), red)));
//    d = add(d, wtf(p));
//    d = add(d, RMHit(perlinSphere(1., p - vec3(-2.0, 0.0, 3.0)), purple));
//    d = add(d, cylCircle(p));

//    d = add(d, sphere(p - vec3(3., 3., 0.)));
//    d = sub(d, RMHit(
//        cylinder(1.3, 4.5, rotX(secs/30. * TAU) * p- vec3(2.0, 0.0, 0.0) - vec3(0., 0., -2.25)),
//        blue));
//    d = add(d, cylinder(0.8, 4., rotX(secs/30. * TAU) * p- vec3(2.0, 0.0, 0.0) - vec3(0., 0., -2.)));
//    d = sub(d, cylCircle(p));
    return d;
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
        if (hit.distance < 0.) break;
        pos = pos + dir1 * hit.distance;
    }
    return RMResult(hit.distance, pos, hit.color);
}
vec3 pt(mat4 pm, vec3 p) {
    vec4 pStar = pm * vec4(p, 1.0);
    return pStar.xyz / pStar.w;
}

const float eps = 1e-5;
vec3 sdfNormal(vec3 p, float d) {
    return (vec3(
        sdff(p + vec3(eps, 0., 0.)),
        sdff(p + vec3(0., eps, 0.)),
        sdff(p + vec3(0., 0., eps))
    ) - vec3(d)) / eps;
}

void main() {
    vec3 light = normalize(vec3(-1., -2., -2));

    vec3 a = vec3(coord, -1.);
    vec3 b = vec3(coord, 1.);
    vec3 aWC = pt(llli, a);
    vec3 bWC = pt(llli, b);
    vec3 lookDir1 = normalize(bWC - aWC);

    RMResult hitWC = raymarching2(aWC, lookDir1);
    vec3 hitn1 = normalize(sdfNormal(hitWC.pos, hitWC.distance));
    float dWC = distance(aWC, hitWC.pos);

    vec3 sunPoint = raymarching2(hitWC.pos +hitn1 *.1, -light).pos;
    float inSun = float(distance(hitWC.pos, sunPoint) > 30.);
//    float inSun=1.;


    vec3 camPos = aWC;

    vec3 reflectionDirection = reflect(light, hitn1);
    vec3 eyeDirection = -lookDir1;
    float uMaterialShininess = 256.0;
    float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);
    float lightIntensity = 0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.);
//    float lightIntensity = 0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.) + 0.3*specularLightWeighting;
//    fragColor = visualize(blue, red, mix(0.5, 1.0, inSun) * lightIntensity);
    fragColor = mix(hitWC.color, colorBg, mix(0.5, 1.0, inSun) * clamp(lightIntensity, 0., 1.));
//    fragColor = visualize(dWC);
//    fragColor = hitWC.color;
//    fragColor = visualize(blue, red, distance(hitWC, sunPoint)/20.);
//    fragColor = vec4(aWC, 1.0);
//    fragColor = vec4(coord, 0.0, 1.);
}