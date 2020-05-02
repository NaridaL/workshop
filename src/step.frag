#version 300 es
precision mediump float;
precision mediump usampler2D;
in vec2 coord;

uniform vec2 iResolution;
uniform vec4 colorBg;
uniform vec4[10] colorFg;
uniform float aspectRatio;

out vec4 fragColor;

uniform usampler2D heights;

float EPSILON = 0.0001;

vec3 raToHex(vec2 xy) {
	float hex_t = xy.y / 0.866;
	float hex_s = xy.x - hex_t / 2.0;
	return vec3(hex_s, hex_t, -(hex_s + hex_t));
}

vec2 hexToRa(vec3 hex) {
	float y = hex.t * 0.866;
	float x = hex.s + hex.t / 2.0;
	return vec2(x, y);
}
ivec2 cube_to_oddr(ivec3 cube) {
    int col = cube.x + (cube.y - (cube.y&1)) / 2;
    int row = cube.y;
    return ivec2(col, row);
}
ivec3 oddr_to_cube(ivec2 hex) {
    int x = hex.x - (hex.y - (hex.y&1)) / 2;
    int y = hex.y;
    int z = -x-y;
    return ivec3(x, y, z);
}

vec3 hexRound(vec3 hex) {
	vec3 r = floor(hex + 0.5);
	vec3 diff = abs(r - hex);

	if (diff.x > diff.y && diff.x > diff.z) {
		r.x = -(r.y + r.z);
	} else if (diff.y > diff.z) {
		r.y = -(r.x + r.z);
	} else {
		r.z = -(r.x + r.y);
	}

	return r;
}
float max3 (vec3 v) {
  return max (max (v.x, v.y), v.z);
}
float min3 (vec3 v) {
  return max (max (v.x, v.y), v.z);
}
float hex_sdf(vec3 h) {
	return max3(abs(h.yzx + h.zxy/2.0 ) );
	// return abs(h.x+(h.y/2.0) );
	// return max3(abs(vec3(h)));
}

bool between(float min, float max, float x) {
	return min <= x && x <= max;
}

void main() {
	//mainImage(gl_FragColor, coord.xy);
	float factor = 140.0;
	vec2 pos2 = coord * factor / vec2(1.0, aspectRatio);
	vec2 hs = vec2(0.5, 0.866);
	vec3 hex_pos = raToHex(pos2);
	// vec2 hex_center = floor(hex_pos + 0.5);
	vec2 dotCoords = vec2(pos2.x, dot(pos2, hs));
	vec3 hex_center = hexRound(hex_pos);
	vec2 center = hexToRa(hex_center);
	vec2 squarePos = floor(pos2+ 0.5);
	vec3 hex_d = hex_pos - hex_center;
	// vec2 d =hex_pos - hex_center;
	// vec3 zz = vec3(d.xy, (d.y - d.x)/1.41);
	vec2 local_ra_offset = pos2 - center;
	// if (abs(zz.x +zz.y+ zz.z) < 0.1) {
	// if (max(d.x, max(d.y, 0.0)) < 0.45) {
	// if (length(pos2 - squarePos) < 0.5) {
	float d = hex_sdf(hex_d);
	if (between(0.0, 0.45, d)
		// || length(pos2 - center) < 0.2
	) {
	// if (length (pos2 - center) <0.53){
	// if (length (hex_pos - hex_center) <0.45){
		ivec2 center2 = cube_to_oddr( ivec3(hex_center) ) - ivec2(5,5);
		uint value = texelFetch(heights,  center2, 0).r;
		fragColor = value == 255u ? colorBg : colorFg[value];
	} else {
		fragColor = colorBg;
	}
}