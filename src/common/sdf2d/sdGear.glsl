#pragma webpack include ../dot2.glsl
#pragma webpack include ../polar.glsl
#pragma webpack include ./addFillet.glsl
#pragma webpack include ../constants.glsl

/**
 * SDF of one side of an invlute gear tooth. It starts at (baseRadius,0)
 * perpendicular to x-axis and goes right/up.
 *
 * Oq and qp are perpendicular.`|q| = 1` Calc |qp| with pythagoras.
 *
 * ```
 * |__
 * |  \_q
 * |___|_________
 * O
 *         p
 * ```
 */
float sdInvolute(float baseRadius, vec2 p) {
  if (p.x < baseRadius) {
    return -p.y;
  } else {
    float qpLength = sqrt(dot2(p) - baseRadius * baseRadius);
    float qopAngle = acos(baseRadius / length(p));
    float pAngle = atan(p.y, p.x);
    float qAngle = qopAngle + pAngle;
    float d = qpLength - qAngle * baseRadius;
    return d;
  }
}
vec2 opRotSym(float n, vec2 p) {
  vec2 polar = toPolar(p);
  float f = TAU / n;
  polar.y = (fract(polar.y / f + 0.5) - 0.5) * f;
  p = fromPolar(polar);
  return p;
}
/**
 * 2D signed distance function (SDF) of an (external) involute gear. The gear is
 * centered at origin and has `n` teeth.
 *
 * Involute gear primer: The "pitch" circle/radius is where two gears touch each
 * other. The circular pitch is the distance, along the pitch circle, between
 * two teeth. `pitchRadius = (float(n) * circularPitch) / TAU`
 *
 * For two gears to be compatible they need to have the same pressure angle and
 * circular pitch.
 *
 * The base circle/radius is the circle from which the involute tooth profile is
 * constructed. `baseRadius = cos(pressureAngle) * pitchRadius`.
 *
 * The teeth profiles go from "dedendum circle" (see code) to "addendum circle".
 * The difference between dedendum circle and base circle is filled by a fillet.
 *
 * See also http://faculty.mercer.edu/jenkins_he/documents/Gears2R1.pdf
 */
float sdGear(int n, float pressureAngle, float circularPitch, vec2 p) {
  float pitchRadius = float(n) * circularPitch / TAU;
  float baseRadius = cos(pressureAngle) * pitchRadius;

  float addendumRadius = pitchRadius + 1.0 / PI * circularPitch;
  float d3 = length(p) - addendumRadius;
  if (d3 > 0.1) {
    return d3;
  }
  float dedendumRadius = pitchRadius - 1.25 / PI * circularPitch;
  float d2 = length(p) - dedendumRadius;
  if (d2 < -0.1) {
    return d2;
  }
  p = opRotSym(float(n), p);
  //  float d = distance(vec2(1, 0.1), p) - 0.1;
  p.y = abs(p.y);
  vec2 polar = toPolar(p);
  float f = TAU / float(n);
  polar.y = (fract(polar.y / f + 0.5) - 0.5) * f;
  polar.y -= 1.3 / float(n);
  float d = sdInvolute(baseRadius, fromPolar(polar));

  return max(addFillet(baseRadius - dedendumRadius, d, d2), d3);
}

/**
 * See sdGear. Not quite `-sdGear`, as the dedendum and addendum radii are
 * reversed to avoid intersections.
 */
float sdGearInternal(int n, float pressureAngle, float circularPitch, vec2 p) {
  float pitchRadius = float(n) * circularPitch / TAU;
  float baseRadius = cos(pressureAngle) * pitchRadius;

  float addendumRadius = pitchRadius - 1.0 / PI * circularPitch;
  float d3 = -(length(p) - addendumRadius);
  if (d3 > 0.1) {
    return d3;
  }
  float dedendumRadius = pitchRadius + 1.25 / PI * circularPitch;
  float d2 = -(length(p) - dedendumRadius);
  if (d2 < -0.1) {
    return d2;
  }
  p = opRotSym(float(n), p);
  //  float d = distance(vec2(1, 0.1), p) - 0.1;
  p.y = abs(p.y);
  vec2 polar = toPolar(p);
  float f = TAU / float(n);
  polar.y = (fract(polar.y / f + 0.5) - 0.5) * f;
  polar.y -= 1.0 / 1.3 / float(n);
  float d = -sdInvolute(baseRadius, fromPolar(polar));

  return max(min(d, d2), d3);
}
