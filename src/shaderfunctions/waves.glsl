uniform float highResTimeStamp;

float waves(vec4 color, vec2 position, vec2 direction) {
  return sin(
    dot(position, direction / pow(length(direction), 2.0)) +
      float(highResTimeStamp) / 200.0
  );
}

#pragma glslify: export(waves)
