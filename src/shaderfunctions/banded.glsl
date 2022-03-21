float banded(float bandCount, float t) {
  return floor(t * float(bandCount)) / float(bandCount - 1.0);
}
float banded(int bandCount, float t) {
  return banded(float(bandCount), t);
}

#pragma glslify: export(banded)
