#version 300 es
precision highp float;

#pragma glslify: banded = require(./shaderfunctions/banded.glsl)
#pragma glslify: between = require(./shaderfunctions/between.glsl)
#pragma glslify: hex2Ra = require(./shaderfunctions/hex2Ra.glsl)
#pragma glslify: hexRound = require(./shaderfunctions/hexRound.glsl)
#pragma glslify: hexSdf = require(./shaderfunctions/hexSdf.glsl)
#pragma glslify: max3 = require(./shaderfunctions/max3.glsl)
#pragma glslify: perlin2D = require(./shaderfunctions/perlin2DTexture.glsl)
#pragma glslify: polar = require(./shaderfunctions/polar.glsl)
#pragma glslify: ra2Hex = require(./shaderfunctions/ra2Hex.glsl)
#pragma glslify: remix = require(./shaderfunctions/remix.glsl)
#pragma glslify: unmix = require(./shaderfunctions/unmix.glsl)
#pragma glslify: visualize = require(./shaderfunctions/visualize.glsl)
#pragma glslify: waves = require(./shaderfunctions/waves.glsl)
#pragma glslify: rotX = require(./shaderfunctions/rotX.glsl)

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
in float n;
in vec2 coord;
out vec4 fragColor;

const float TAU = 6.283185307179586;

const vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 yellow = vec4(1.0, 1.0, 0.0, 1.0);
const vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

#pragma glslify: donut = require(./shaderfunctions/sdf/donut.glsl)
#pragma glslify: sphere = require(./shaderfunctions/sdf/sphere.glsl)
#pragma glslify: cylinder = require(./shaderfunctions/sdf/cylinder.glsl)

float skybox(vec3 p) {
    return 64. - max3(abs(p));
}

float perlinSphere(float radius, vec3 p) {
    vec3 cp = normalize(p);
    float alpha = atan(cp.y, cp.x);
    float beta = asin(cp.z);
    return length(p) - radius + 0.1 * perlin2D(vec2(0. / 100., 0.) + (vec2(5.)+vec2(alpha, beta))*8.0);
}

float block(vec3 min, vec3 maxx, vec3 p) {
    return max(max3(p - maxx), max3(-p + min));
}
float sub(float from, float what) {
    return max(from, -what);
}
float add(float a, float b) {
    return min(a, b);
}
float cylCircle(vec3 p) {
    float d = 10e9;
    for (int i = 0; i < 10; i++) {
        d = min(d, cylinder(0.2, 2., p + polar(3., TAU * float(i) / 10., 1.)));
    }

    return d;
}

float addWithRadius(float r, float a, float b) {
    if (a < r && b < r) {
        return r - distance(vec2(a, b), vec2(r));
    } else {
        return min(a ,b);
    }
}

float sdf(vec3 p) {
    float d = skybox(p);
    d = add(d, block(vec3(-5., -5., -1.), vec3(5., 5., 0.), p));
    d = -addWithRadius(0.1, -d, donut(2., 0.5, p));
    d = -addWithRadius(0.1, -d, donut(4., 0.5, p));
    d = add(d, sphere(0.5, p));
    d = add(d, perlinSphere(1., p - vec3(-2.0, 0.0, 3.0)));
//    d = add(d, cylCircle(p));

//    d = add(d, sphere(p - vec3(3., 3., 0.)));
    d = sub(d, cylinder(1.3, 4.5, rotX(0./30. * TAU) * p- vec3(2.0, 0.0, 0.0) - vec3(0., 0., -2.25)));
    d = add(d, cylinder(0.8, 4., rotX(0./30. * TAU) * p- vec3(2.0, 0.0, 0.0) - vec3(0., 0., -2.)));
    d = sub(d, cylCircle(p));
    d -= 0.2;
    return d;
}

#pragma glslify: raymarch = require(./shaderfunctions/raymarching.glsl, sdf = sdf)

vec3 pt(mat4 pm, vec3 p) {
    vec4 pStar = pm * vec4(p, 1.0);
    return pStar.xyz / pStar.w;
}

const float eps = 1e-5;
vec3 sdfNormal(vec3 p) {
    float d = sdf(p);
    return (vec3(
        sdf(p + vec3(eps, 0., 0.)),
        sdf(p + vec3(0., eps, 0.)),
        sdf(p + vec3(0., 0., eps))
    ) - vec3(d)) / eps;
}

void main() {
    vec3 light = normalize(vec3(-1., -1., -1));

    vec3 a = vec3(coord, -1.);
    vec3 b = vec3(coord, 1.);
    vec3 aWC = pt(llli, a);
    vec3 bWC = pt(llli, b);
    vec3 lookDir1 = normalize(bWC - aWC);

    vec3 hitWC = raymarch(aWC, lookDir1);
    vec3 hitn1 = normalize(sdfNormal(hitWC));
    float dWC = distance(aWC, hitWC);

    vec3 sunPoint = raymarch(hitWC -light *.1, -light);
    float inSun = float(distance(hitWC, sunPoint) > 50.);


    vec3 camPos = aWC;

    vec3 reflectionDirection = reflect(light, hitn1);
    vec3 eyeDirection = -lookDir1;
    float uMaterialShininess = 256.0;
    float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);
    float lightIntensity = 0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.) + 0.3*specularLightWeighting;
    fragColor = visualize(blue, red, mix(0.5, 1.0, inSun) * lightIntensity);
    fragColor = mix(colorPrimary, colorBg, mix(0.5, 1.0, inSun) * clamp(lightIntensity, 0., 1.));
//    fragColor = visualize(blue, red, dWC/20.);
//    fragColor = visualize(blue, red, distance(hitWC, sunPoint)/20.);
//    fragColor = vec4(aWC, 1.0);
//    fragColor = vec4(coord, 0.0, 1.);
}