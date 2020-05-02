#version 300 es
precision mediump float;
precision mediump usampler2D;
in vec2 coord;

uniform vec2 iResolution;
uniform vec4 colorBg;
uniform vec4[10] colorFg;
uniform float aspectRatio;

out uvec4 fragColor;

const uint SINK = 255u;

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

uint at(ivec2 p) {
	ivec2 tex_size = textureSize(heights, 0);

	if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {
		// point is outside source texture
		return 0u;
	} else {
		uint value = texelFetch(heights, p, 0).r;
		if (SINK == value) {
			return 0u;
		} else {
			return value / 6u;
		}
	}
}

uint calc(ivec2 oddr_pos) {
	uint value = texelFetch(heights, oddr_pos, 0).r;

	if (SINK == value) {
		return SINK;
	}

	// the current pos topples as many times as it can
	value = value % 6u;
	// all the neighbors topple as often as they can
	value += at(oddr_pos + ivec2(+1, 0));
	value += at(oddr_pos + ivec2(-1, 0));

	value += at(oddr_pos + ivec2(0, +1));
	value += at(oddr_pos + ivec2(0, -1));

	value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, +1));
	value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, -1));

	return value;
}

void main() {
	fragColor = uvec4(calc(ivec2(coord)), 0u, 0u, 0u);
	// fragColor = uvec4(2u, 0u, 0u, 0u);
}