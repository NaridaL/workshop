float sdTube(float radius, float r2, float z, vec3 p) {
  vec2 d = vec2(length(p.xy), abs(p.z)) - vec2(radius, z);
  d.x = abs(d.x) - r2;
  vec2 closest = vec2(abs(d.x - radius) - r2, clamp(d.y, 0.0, z));
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}
