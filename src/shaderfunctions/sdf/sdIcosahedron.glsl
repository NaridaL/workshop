const float GOLDEN_RATIO = 1.61803398875;
// NN = 1/GOLDEN_RATIO = GOLDEN_RATIO - 1
const float K = GOLDEN_RATIO * 0.5;
// the three vertices of the icosahedron triangle which
// is fully inside the +++ octant. (edge length = 1)
const vec3 a = vec3(0.5, K, 0.0);
const vec3 b = vec3(0.0, 0.5, K);
const vec3 c = vec3(K, 0.0, 0.5);
const vec3 ab1 = b - a; // values chosen so edge length is 1
const vec3 n1 = normalize(cross(a, b));
const vec3 n2 = normalize(cross(b, c));
const vec3 n3 = normalize(cross(c, a));
const vec3 xyz1 = normalize(vec3(1.0));
// for edge-length 1
const float INSCRIBED_SPHERE_RADIUS = 0.7557613141;

// signed distance function for icosahedron
// cf. https://en.wikipedia.org/wiki/Regular_icosahedron
// s: edge length
// p: point to evaluate function for
float sdIcosahedron(float s, vec3 p) {
    // we use a rotation where the icosahedron is symmetric
    // in all three coordinate planes, and reduce the problem
    // to the +++ octant
    p = abs(p);

    // there is one complete triangle in the +++ octant
    // mirror on planes which go through origin and the
    // complete triangles sides.
    if (dot(p, n1) < 0.0) {
        p += -2.0 * dot(p, n1) * n1;
    }
    if (dot(p, n2) < 0.0) {
        p += -2.0 * dot(p, n2) * n2;
    }
    if (dot(p, n3) < 0.0) {
        p += -2.0 * dot(p, n3) * n3;
    }

    // rotate space around (1,1,1) vector so that all sides of the triangle
    // end up mapped on the ab side.
    vec3 dirs = vec3(-dot(n1, p), -dot(n2, p), -dot(n3, p));
    if (dirs.y > dirs.x && dirs.y > dirs.z) {
        p = p.yzx;
    } else if (dirs.z > dirs.x && dirs.z > dirs.y) {
        p = p.zxy;
    }

    // check if the point is directly (perpendicular) above the triangle.
    // as we have rotated the space, we only need to check if it is
    // inside one edge.
    vec3 midAB = (a + b) / 2.0;
    vec3 pn = normalize(c - midAB);
    float w = dot(midAB, pn);
    if (dot(p, pn) > w * s) {
        // if not, return the distance to the plane the triangle is in
        return dot(xyz1, p) - INSCRIBED_SPHERE_RADIUS * s;
    }

    // project the point onto segment ab, and return the distance to it
    float d3 = dot(ab1, p);
    d3 = clamp(d3, -0.5 * s, 0.5 * s);
    vec3 closestp = midAB * s + d3 * ab1;
    return distance(closestp, p);
}
#pragma glslify: export(sdIcosahedron)
