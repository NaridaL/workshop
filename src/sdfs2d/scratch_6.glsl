//essentially a copy of https://www.shadertoy.com/view/7dyGDh

#define R (iResolution)
#define mmin(da, db) ((da).x < (db).x ? da : db)
#define plotBelt(func)                                                         \
  {                                                                            \
    vec3 fn = func;                                                            \
    ldist += fn.x <= 0.0 ? fn.y * fn.z : fn.z;                                 \
    if (tdist == 0.0 && fn.x < 0.0) tdist = ldist;                             \
    distB = mmin(                                                              \
      distB,                                                                   \
      vec3(fn.x, 0.5, step(0.15, mod(iTime - tdist, 0.31)))                    \
    );                                                                         \
  }
#define plotGear(sw, pos, func)                                                \
  {                                                                            \
    float fn = func;                                                           \
    distG = mmin(                                                              \
      distG,                                                                   \
      vec3(                                                                    \
        fn,                                                                    \
        (sw)                                                                   \
          ? 0.1                                                                \
          : 0.9,                                                               \
        ((sw)                                                                  \
          ? angle(pos, vec2(sin(-iTime / r), cos(-iTime / r)))                 \
          : angle(pos, vec2(sin(iTime / r), cos(iTime / r)))) /                \
          2.0 /                                                                \
          PI                                                                   \
      )                                                                        \
    );                                                                         \
  }

#define PI (3.1415)
const int N = 8; //number of nodes
//#define RANDOM //randomize nodes

//------------------------------------

// line/line intersection (Iapafoto)
vec2 intersect(vec2 p0, vec2 n0, vec2 p1, vec2 n1) {
  float d = n0.x * n1.y - n0.y * n1.x;
  if (d == 0.0) return vec2(0);
  vec2 p = (p0 - p1) / d;
  return vec2(p.y * n1.x - p.x * n1.y, p.y * n0.x - p.x * n0.y);
}

// line/circle intersection
vec2 intersect(vec2 p0, vec2 n, vec2 center, float r) {
  vec2 c = p0 - center;
  float b = dot(n, c),
    d = sqrt(b * b + r * r - dot(c, c));
  return vec2(-b + d, -b - d);
}
//angle between normals
float angle(vec2 p, vec2 n) {
  vec2 c = p * mat2(n.x, n.y, -n.y, n.x);
  float a = atan(c.y, c.x);
  if (a < 0.0) a = 2.0 * PI + a;
  return a;
}

//based on Iq SDF function
float sdArc(vec2 p, vec2 sca, vec2 scb, float ra, float rb) {
  p *= mat2(sca.x, sca.y, -sca.y, sca.x);
  p.x = abs(p.x);
  if (scb.y * p.x > scb.x * p.y) {
    vec2 b = scb * (ra + rb),
      a = scb * (ra - rb),
      pa = p - a,
      ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }
  return abs(length(p) - ra) - rb;
}

// arc with normals as parameters
//type=0: ordered arc, =1: always shorter, -1= always longer
vec3 sdArcExt(vec2 p, vec2 na, vec2 nb, float ra, float rb, bool swap) {
  if (swap) {
    vec2 temp = na;
    na = nb;
    nb = temp;
  }
  float an = angle(p, na),
    at = angle(nb, na);
  vec2 ta =
      normalize(na + nb) *
      mat2(
        0  , 1  ,
         -1, 0
      ) *
      sign(na.x * nb.y - na.y * nb.x),
    tb = na * mat2(ta.x, ta.y, -ta.y, ta.x);
  if (tb.x < 0.0) tb.x = -tb.x;
  return vec3(
    sdArc(p, ta, tb, ra, rb),
    swap
      ? 1.0 - an / at
      : an / at,
    at * ra
  );
}

vec3 sdSegmentExt(vec2 p, vec2 a, vec2 b, float tk) {
  vec2 n = normalize(b - a),
    l = vec2(length(b - a) * 0.5, tk);
  p = (p - a) * mat2(n.x, n.y, -n.y, n.x) - vec2(l.x, 0);
  vec2 d = abs(p) - l;
  return vec3(
    length(max(d, 0.0)) + min(max(d.x, d.y), 0.0),
    p.x / l.x / 2.0 + 0.5,
    l.x * 2.0
  );
}

//segment-arc-segment
vec4 roundCorner(vec2 a, vec2 b, vec2 c, float r) {
  //segment ab
  vec2 nab = normalize(b - a),
    tab = vec2(nab.y, -nab.x),
    pab = r * tab * sign(dot(c - a, tab));
  //parallel ab on c side
  vec2 a1 = a + pab;

  //segment bc
  vec2 nbc = normalize(c - b),
    tbc = vec2(nbc.y, -nbc.x),
    pbc = r * tbc * sign(dot(a - c, tbc));
  //parallel bc on a side
  vec2 b1 = b + pbc;

  //intersection
  vec2 d = a1 + intersect(a1, nab, b1, nbc).x * nab; //center of inscribed circle

  //arc-segment intersection
  vec2 e = d - pab; //intersection arc, segment ab
  vec2 f = d - pbc; //intersection arc, segment cb

  float de = distance(e, b),
    df = distance(f, b);
  return vec4(de, df, d);
}

//segment-arc-arc-segment
vec4 roundCorner2(vec2 a, vec2 b, vec2 c, float r) {
  vec2 nab = normalize(b - a),
    tab = vec2(nab.y, -nab.x),
    pab = r * tab * sign(dot(c - a, tab));
  vec2 d = b + pab;
  vec2 nbc = normalize(b - c),
    tbc = vec2(nbc.y, -nbc.x),
    pbc = r * tbc * sign(dot(a - c, tbc));
  vec2 b1 = b - pbc,
    e = b1 + nbc * intersect(b1, nbc, d, 2.0 * r).y;
  return vec4(d, e);
}

//segment-arc-arc-arc-segment
vec4 roundCorner3(vec2 a, vec2 b, vec2 c, float r) {
  vec2 nab = normalize(b - a),
    tab = vec2(nab.y, -nab.x),
    pab = r * tab * sign(dot(c - a, tab));
  vec2 a1 = b - pab,
    e = a1 + nab * intersect(a1, nab, b, 2.0 * r).y;
  vec2 nbc = normalize(b - c),
    tbc = vec2(nbc.y, -nbc.x),
    pbc = r * tbc * sign(dot(a - b, tbc));
  vec2 c1 = b - pbc,
    f = c1 + nbc * intersect(c1, nbc, b, 2.0 * r).y;
  return vec4(e, f);
}

vec2 hash21(float p) {
  vec3 p3 = fract(vec3(p) * vec3(0.1031, 0.103, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);

}
vec2 getK(int i) {
  float s = float(i * i) / float(N * N) + 0.05;
  #ifdef RANDOM
  vec2 k = hash21(float(i)) * 0.8 - 0.4;
  #else
  const vec2[8] KK = vec2[8](
    vec2(0.4, 0.4),
    vec2(0, 0),
    vec2(-0.3, 0.4),
    vec2(-0.4, 0),
    vec2(-0.3, -0.3),
    vec2(0, -0.4),
    vec2(0.2, 0.0),
    vec2(0.3, -0.4)
  );
  vec2 k = KK[i];
  #endif
  k.x *= R.x / R.y;
  //k +=vec2(sin(iTime*(s-.3) +s  +5.),cos(iTime*(s-.3)+s +5.))*.07 ;
  return k;
}
//----------------------------------------------------------------
void mainImage(out vec4 O, vec2 U) {
  // Normalized pixel coordinates (from 0 to 1)
  vec2 p = (-R.xy * 0.5 + U) / R.xy * 1.7;

  float r = iMouse.z > 0.0 ? iMouse.y / R.y * 0.07 + 0.04 : 0.08,
    tk = iMouse.z > 0.0 ? iMouse.x / R.x * 0.02 : 0.01;

  vec3 distB = vec3(1e5, 0, 0),
    distG = vec3(1e5, 0, 0);
  float tdist = 0.0,
    ldist = 0.0; //SDF distance, cumulated path distance, local path distance

  for (int i = min(iFrame, 0); i < N; i++) {
    //b = node, a and c = polyline mid points
    vec2 b = getK((i + 1) % N),
      a = (getK(i) + b) / 2.0,
      c = (getK((i + 2) % N) + b) / 2.0;

    //control point:
    //col = mix(vec3(0),col,smoothstep(0.,.002,-tk+ length(p-b)));

    // try to use 1 arc
    vec4 v = roundCorner(a, b, c, r);
    if (i == 4 && v.x < distance(a, b) && v.y < distance(c, b)) {
      //ok is compatible, draw it
      vec2 nab = normalize(b - a),
        ncb = normalize(c - b),
        e = b - v.x * nab,
        f = b + v.y * ncb,
        d = v.zw;

      bool swap = nab.x * ncb.y > nab.y * ncb.x;
      plotGear(swap, p - d, tk - r + length(p - d));
      plotBelt(sdSegmentExt(p, a, e, tk));
      plotBelt(
        sdArcExt(p - d, normalize(e - d), normalize(f - d), r, tk, !swap)
      );
      plotBelt(sdSegmentExt(p, f, c, tk));
    } else {
      // try to use 2 arcs
      //vec2 b=kj, a=(ki+b)/2., c=(km+b)/2.;
      //if(  distance(c,b)<distance(a,b)) {a=(ki+b)/2.; c=(km+b)/2.;}

      vec4 v2 = roundCorner2(a, b, c, r);
      vec2 nab = normalize(b - a),
        nbc = normalize(b - c),
        a1 = v2.xy,
        c1 = v2.zw,
        f = (a1 + c1) / 2.0,
        a2 = b,
        c2 = b + intersect(b, nbc, c1, vec2(nbc.y, -nbc.x)).x * nbc;

      if (distance(b, c) > distance(b, c2)) {
        bool swap = nab.x * nbc.y > nab.y * nbc.x;
        plotGear(!swap, p - a1, tk - r + length(p - a1));
        plotGear(swap, p - c1, tk - r + length(p - c1));
        plotBelt(sdSegmentExt(p, a, a2, tk));
        plotBelt(
          sdArcExt(p - a1, normalize(a2 - a1), normalize(f - a1), r, tk, swap)
        );
        plotBelt(
          sdArcExt(p - c1, normalize(f - c1), normalize(c2 - c1), r, tk, !swap)
        );
        plotBelt(sdSegmentExt(p, c2, c, tk));

      } else {
        // try to use 3 arcs
        //vec2 b=kj, a=(ki+b)/2., c=(km+b)/2.;
        vec4 v2 = roundCorner3(a, b, c, r);
        vec2 nab = normalize(b - a),
          nbc = normalize(b - c),
          e = v2.xy,
          f = v2.zw,
          a1 = (e + b) / 2.0,
          c1 = (f + b) / 2.0,
          a2 = b + intersect(b, nab, e, vec2(nab.y, -nab.x)).x * nab,
          c2 = b + intersect(b, nbc, f, vec2(nbc.y, -nbc.x)).x * nbc;

        if (
          distance(a, b) > distance(b, a2) &&
          distance(b, c) > distance(b, c2)
        ) {
          //ok is compatible, draw it
          bool swap = nab.x * nbc.y > nab.y * nbc.x;

          plotGear(swap, p - e, tk - r + length(p - e));
          plotGear(swap, p - f, tk - r + length(p - f));
          plotGear(!swap, p - b, tk - r + length(p - b));
          plotBelt(sdSegmentExt(p, a, a2, tk));
          plotBelt(
            sdArcExt(p - e, normalize(a2 - e), normalize(a1 - e), r, tk, !swap)
          );
          plotBelt(
            sdArcExt(p - b, normalize(a1 - b), normalize(c1 - b), r, tk, swap)
          );
          plotBelt(
            sdArcExt(p - f, normalize(c1 - f), normalize(c2 - f), r, tk, !swap)
          );
          plotBelt(sdSegmentExt(p, c2, c, tk));
        } else {
          //segments too short - skip rounding
          plotBelt(sdSegmentExt(p, a, b, tk));
          plotBelt(sdSegmentExt(p, b, c, tk));
        }
      }
    }
  }

  // Output to screen
  O = vec4(distB.x, distG.x, mmin(distB, distG).zy);
}

