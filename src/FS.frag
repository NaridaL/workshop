#version 300 es
precision mediump float;
precision mediump usampler2D;

// this shader defines a virtual texture, which renders
// a hex "(height-)map" saved as ODDR

// texture coordinate to render
in vec2 coord;

uniform vec4 colorBg;
uniform vec4[10] colorFg;

uniform mat4 tt;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;

const uint SINK = 255u;

out vec4 fragColor;

// the "map" being rendered. also implicitely defines the
// size of the texture.
// width: x is in [-0.5, heights.width], (0, 0) is the center of the first hex
// height: sqrt(3) / 2 * heights.height
uniform usampler2D heights;

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

uint heightAt(ivec2 p) {
	ivec2 tex_size = textureSize(heights, 0);

	if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {
		// point is outside source texture, treat as sink
		return SINK;
	} else {
		return texelFetch(heights, p, 0).r;
	}
}

void main() {
	// vec2 pos2 = vec4(coord, 0.0, 1.0).xy * 400.0;
	vec2 pos2 = (tt * vec4(coord, 0.0, 1.0)).xy;

	// fragColor = length(pos2 - vec2(100.0, 100.0)) < 50.0
	// 	? colorFg[0]
	// 	: colorBg;
	// return;
	vec3 hex_pos = raToHex(pos2);
	// vec2 hex_center = floor(hex_pos + 0.5);
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
	if (between(0.0, 0.425, d)
		// || length(pos2 - center) < 0.2
	) {
	// if (length (pos2 - center) <0.53){
	// if (length (hex_pos - hex_center) <0.45){
		ivec2 center2 = cube_to_oddr( ivec3(hex_center) );
		uint value = heightAt(center2);
		fragColor = value == 255u ? colorBg : colorFg[value];
	} else {
		fragColor = colorBg;
	}
}