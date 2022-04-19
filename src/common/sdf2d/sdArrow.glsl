#pragma webpack include ./sdTriangleIsosceles.glsl
#pragma webpack include ./sdRectangle.glsl

/**
 * Signed distance function (SDF) of an arrow from the origin along the positive
 * x axis.
 *
 * The arrow goes from O to (length, 0). The base width is 0.1 (of the shaft)
 * and it can be scaled with the width parameter.
 */
float sdArrow(float length, float width, vec2 p) {
  float r = 0.001;
  return min(
    sdRectangle(length - 0.1, 0.1 * width, p - vec2(0.5 * (length - 0.1), 0.0)),
    sdTriangleIsosceles(vec2(0.1 * width, -0.2), p.yx - vec2(0, length))
  );
}
float sdArrow(vec2 p) {
  return sdArrow(1.0, 1.0, p);
}
