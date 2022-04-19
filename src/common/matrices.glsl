#pragma webpack include ./constants.glsl

mat3 rotX(float angle) {
  float c = cos(angle),
    s = sin(angle);
  return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
}
mat3 rotY(float angle) {
  float c = cos(angle),
    s = sin(angle);
  return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
}
mat3 rotZ(float angle) {
  float c = cos(angle),
    s = sin(angle);
  return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
}
/**
 * Returns a matrix that puts the camera at the eye point `ex, ey, ez` looking
 * toward the center point `cx, cy, cz` with an up direction of `ux, uy, uz`.
 * This emulates the OpenGL function `gluLookAt()`.
 */
mat4 lookAt(vec3 eye, vec3 focus, vec3 up) {
  vec3 f = normalize(eye - focus);
  vec3 s = normalize(cross(up, f));
  vec3 t = normalize(cross(f, s));

  return mat4(
    vec4(s.x, t.x, f.x, 0.0),
    vec4(s.y, t.y, f.y, 0.0),
    vec4(s.z, t.z, f.z, 0.0),
    vec4(-dot(s, eye), -dot(t, eye), -dot(f, eye), 1)
  );
}

// the OpenGL function `glFrustum()`.
mat4 frustum(
  float left,
  float right,
  float bottom,
  float top,
  float near,
  float far
) {
  return mat4(
    vec4(2.0 * near / (right - left), 0.0, 0.0, 0.0),
    vec4(0, 2.0 * near / (top - bottom), 0.0, 0.0),
    vec4(
      (right + left) / (right - left),
      (top + bottom) / (top - bottom),
      -(far + near) / (far - near),
      -1
    ),
    vec4(0.0, 0.0, -2.0 * far * near / (far - near), 0.0)
  );
}

mat4 perspective(float fovDegrees, float aspect, float near, float far) {
  float y = tan(fovDegrees * DEGREE / 2.0) * near;
  float x = y * aspect;
  return frustum(-x, x, -y, y, near, far);
}
