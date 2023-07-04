#pragma webpack include ../matrices.glsl

/**
 * 2D signed distance function to an arc with square ends. The opening of the
 * arc is on the left (negative X direction). The total spanned angle is
 * `2 * halfAngle`.
 *
 * `radius` is the center radius of the arc.
 *
 * `width.x` is the thickness of the arc.
 *
 * `width.y` is how much the flat end of the arc is extructed. This is a
 * parameter as is it trivial to add with the current implementation. Set to 0
 * to just have a flat-ended arc.
 */
float sdArcRect(float halfAngle, float radius, vec2 width, vec2 p) {
  // Symmetric across x axis; all points on top.
  p.y = abs(p.y);
  // Rotate so that the end of the arc is at the x axis.
  p = rot2(-halfAngle) * p;
  if (p.y > 0.0) {
    // p is "above the end of the arc"; calculate as for sdRectangle.
    p.x = abs(p.x - radius);
    p -= 0.5 * width;
    return length(max(p, 0.0)) + min(0.0, max(p.x, p.y));
  } else {
    // Otherwise, the distance is basically just the radial distance to the arc.
    // For the inside of the sdf, we have to take the end into account.
    return max(abs(length(p) - radius) - 0.5 * width.x, p.y - 0.5 * width.y);
  }
}
