float sdCylinder(float radius, float z, vec3 p) {
  vec2 d = vec2(length(p.xy), abs(p.z)) - vec2(radius, z);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

// #pragma glslify: export(sdCylinder)

