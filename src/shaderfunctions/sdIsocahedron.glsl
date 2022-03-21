#pragma glslify: sdSphere = require(./sdSphere.glsl)

const float GOLDEN_RATIO = 1.61803398875;
// NN = 1/GOLDEN_RATIO = GOLDEN_RATIO - 1
const float PHI = GOLDEN_RATIO;
// the three vertices of the icosahedron triangle which
// is fully inside the +++ octant. (edge length = 1)
const vec3 a = vec3(1.0, NN, 0.0);
const vec3 b = vec3(0.0, 1.0, NN);
const vec3 c = vec3(NN, 0.0, 1.0);
const vec3 n1 = normalize(cross(a, b));
const vec3 n2 = normalize(cross(b, c));
const vec3 n3 = normalize(cross(c, a));

// isocahedral symmetry
// cf. https://en.wikipedia.org/wiki/Regular_icosahedron
float isocahedralSymmetry(float s, vec3 p) {
  // we use a rotation where the icosahedron is symmetric
  // in all three coordinate planes, and reduce the problem
  // to the +++ octant
  p = abs(p);

  if (dot(p, n1) < 0.0) {
    p += -2.0 * dot(p, n1) * n1;
  }
  if (dot(p, n2) < 0.0) {
    p += -2.0 * dot(p, n2) * n2;
  }
  if (dot(p, n3) < 0.0) {
    p += -2.0 * dot(p, n3) * n3;
  }
  vec3 vxyz = normalize(vec3(1.0));
  return dot(vxyz, p) - s;
  //    return sdSphere(0.96, p-vec3(s));
}
#pragma glslify: export(isocahedralSymmetry)
