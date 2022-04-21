#pragma webpack include ./sdCylinder.glsl
#pragma webpack include ./sdTube.glsl
#pragma webpack include ./sdBox.glsl

float sdLego(vec3 p) {
  const float IWALLT = 0.04;
  p.xy = abs(p.xy);
  vec2 c = vec2(4.0, 2.0);
  //    p.xy = mod(p.xy + c * 0.5, c) - c * 0.5;
  p -= vec3(0.0, 0.0, 0.6);
  float d;
  const float cr = 0.02;
  d = sdBox(vec3(2.0, 1.0, 0.6), cr, p);
  if (d > 0.5) {
    return d;
  }
  //    top studs
  vec3 p8 = vec3(abs(p.xy - vec2(1.0, 0.0)), p.z) - vec3(0.5, 0.5, 0.6);
  float dStuds = sdCylinder(0.35 - 0.04, 0.2, p8) - 0.04;
  d = min(d, dStuds);
  // little holes in bottom of studs
  float dStudHoles = sdCylinder(0.2 - 0.04, 0.3, p8 - vec3(0, 0, -0.4)) - 0.04;
  d = max(d, -dStudHoles);
  // TODO use sdf texture to add LEGO or custom logo to studs

  // hole in the bottom
  const float WALLT = 4.0 * IWALLT;
  float dBottom = sdBox(
    vec3(2.0 - WALLT, 1.0 - WALLT, 0.6),
    p - vec3(0, 0, -WALLT)
  );
  d = max(d, -dBottom);

  // 12 indentations on inside.
  vec3 pa = p;
  // 3. move by 1 in X dir
  pa.x -= 1.0;
  // 2. mirror across XY axis
  if (pa.x > pa.y) pa.xy = pa.yx;
  // 1. mirror across Y axis
  pa.x = abs(pa.x);
  float k = sdBox(vec3(0.5 * IWALLT, 0.05, 0.6), pa - vec3(0.5, 0.8, 0));
  d = min(d, k);

  // center bar
  p = vec3(abs(p.xy), p.z);
  d = min(d, sdBox(vec3(0.5 * IWALLT, 0.3, 0.5), p - vec3(0, 0.65, 0.1)));

  // 3 tubes
  vec3 pTube = p;
  if (pTube.x > 0.5) pTube.x -= 1.0;
  pTube.x = abs(pTube.x);
  d = min(d, sdTube(0.35 + 0.5 * IWALLT, 0.5 * IWALLT, 0.6, pTube));
  return d;
}
