struct Info {
  vec2 dim;
  vec2 bearing;
  int horiAdvance;
  vec2 pos;
};

const Info C_SPACE = Info(vec2(0, 0), vec2(0, 0), 6, vec2(0, 0)); //  " "
const Info C_BANG = Info(vec2(4, 19), vec2(1, 18), 6, vec2(2, 2)); // "!"
const Info C_DOUBLQUOTE = Info(vec2(8, 8), vec2(1, 18), 9, vec2(14, 2)); // "\""
const Info C_HASH = Info(vec2(15, 18), vec2(0, 18), 15, vec2(30, 2)); // "#"
const Info C_DOLLAR = Info(vec2(12, 21), vec2(1, 19), 13, vec2(53, 2)); // "$"
const Info C_PERCENT = Info(vec2(18, 19), vec2(1, 18), 19, vec2(73, 2)); // "%"
const Info C_AMP = Info(vec2(17, 19), vec2(1, 18), 17, vec2(99, 2)); // "&"
const Info C_QUOTE = Info(vec2(3, 8), vec2(1, 18), 5, vec2(124, 2)); // "'"
const Info C_PARENL = Info(vec2(7, 22), vec2(0, 18), 7, vec2(135, 2)); // "("
const Info C_PARENR = Info(vec2(7, 22), vec2(0, 18), 7, vec2(150, 2)); // ")"
const Info C_STAR = Info(vec2(12, 12), vec2(1, 19), 13, vec2(165, 2)); // "*"
const Info C_PLUS = Info(vec2(12, 13), vec2(1, 15), 13, vec2(185, 2)); // "+"
const Info C_COMMA = Info(vec2(5, 7), vec2(0, 3), 5, vec2(205, 2)); // ","
const Info C_DASH = Info(vec2(7, 3), vec2(0, 8), 7, vec2(218, 2)); // "-"
const Info C_DOT = Info(vec2(4, 4), vec2(1, 3), 6, vec2(233, 2)); // "."
const Info C_SLASH = Info(vec2(9, 18), vec2(0, 18), 8, vec2(245, 2)); // "/"
const Info C_0 = Info(vec2(12, 19), vec2(1, 18), 13, vec2(262, 2)); // "0"
const Info C_1 = Info(vec2(7, 18), vec2(2, 18), 13, vec2(282, 2)); // "1"
const Info C_2 = Info(vec2(12, 18), vec2(1, 18), 13, vec2(297, 2)); // "2"
const Info C_3 = Info(vec2(12, 19), vec2(1, 18), 13, vec2(317, 2)); // "3"
const Info C_4 = Info(vec2(14, 18), vec2(0, 18), 13, vec2(337, 2)); // "4"
const Info C_5 = Info(vec2(12, 19), vec2(1, 18), 13, vec2(359, 2)); // "5"
const Info C_6 = Info(vec2(12, 19), vec2(1, 18), 13, vec2(379, 2)); // "6"
const Info C_7 = Info(vec2(12, 18), vec2(1, 18), 13, vec2(399, 2)); // "7"
const Info C_8 = Info(vec2(12, 19), vec2(1, 18), 13, vec2(419, 2)); // "8"
const Info C_9 = Info(vec2(12, 19), vec2(1, 18), 13, vec2(439, 2)); // "9"
const Info C_COLON = Info(vec2(4, 15), vec2(1, 14), 6, vec2(459, 2)); // "
const Info C_SEMI = Info(vec2(5, 18), vec2(0, 14), 6, vec2(471, 2)); // ";"
const Info C_LT = Info(vec2(12, 13), vec2(1, 15), 13, vec2(484, 2)); // "<"
const Info C_EQ = Info(vec2(12, 7), vec2(1, 12), 13, vec2(218, 14)); // "="
const Info C_GT = Info(vec2(12, 13), vec2(1, 15), 13, vec2(165, 22)); // ">"
const Info C_QMARK = Info(vec2(10, 19), vec2(0, 18), 10, vec2(185, 23)); // "?"
const Info C_AT = Info(vec2(20, 21), vec2(1, 18), 21, vec2(484, 23)); // "@"
const Info C_A = Info(vec2(16, 18), vec2(0, 18), 15, vec2(238, 28)); // "A"
const Info C_B = Info(vec2(13, 18), vec2(2, 18), 15, vec2(459, 28)); // "B"
const Info C_C = Info(vec2(14, 19), vec2(1, 18), 15, vec2(14, 28)); // "C"
const Info C_D = Info(vec2(15, 18), vec2(2, 18), 17, vec2(282, 28)); // "D"
const Info C_E = Info(vec2(10, 18), vec2(2, 18), 13, vec2(399, 28)); // "E"
const Info C_F = Info(vec2(10, 18), vec2(2, 18), 12, vec2(337, 28)); // "F"
const Info C_G = Info(vec2(15, 19), vec2(1, 18), 17, vec2(203, 29)); // "G"
const Info C_H = Info(vec2(14, 18), vec2(2, 18), 17, vec2(417, 29)); // "H"
const Info C_I = Info(vec2(3, 18), vec2(2, 18), 6, vec2(124, 18)); // "I"
const Info C_J = Info(vec2(7, 23), vec2(-2, 18), 6, vec2(36, 28)); // "J"
const Info C_K = Info(vec2(13, 18), vec2(2, 18), 14, vec2(355, 29)); // "K"
const Info C_L = Info(vec2(10, 18), vec2(2, 18), 12, vec2(305, 29)); // "L"
const Info C_M = Info(vec2(18, 18), vec2(2, 18), 21, vec2(73, 29)); // "M"
const Info C_N = Info(vec2(14, 18), vec2(2, 18), 18, vec2(376, 29)); // "N"
const Info C_O = Info(vec2(17, 19), vec2(1, 18), 18, vec2(99, 29)); // "O"
const Info C_P = Info(vec2(12, 18), vec2(2, 18), 14, vec2(262, 29)); // "P"
const Info C_Q = Info(vec2(17, 23), vec2(1, 18), 18, vec2(135, 32)); // "Q"
const Info C_R = Info(vec2(13, 18), vec2(2, 18), 14, vec2(51, 31)); // "R"
const Info C_S = Info(vec2(12, 19), vec2(1, 18), 13, vec2(439, 29)); // "S"
const Info C_T = Info(vec2(14, 18), vec2(0, 18), 13, vec2(160, 43)); // "T"
const Info C_U = Info(vec2(14, 19), vec2(2, 18), 17, vec2(480, 52)); // "U"
const Info C_V = Info(vec2(15, 18), vec2(0, 18), 14, vec2(226, 54)); // "V"
const Info C_W = Info(vec2(22, 18), vec2(0, 18), 22, vec2(323, 54)); // "W"
const Info C_X = Info(vec2(14, 18), vec2(0, 18), 13, vec2(282, 54)); // "X"
const Info C_Y = Info(vec2(14, 18), vec2(0, 18), 13, vec2(72, 55)); // "Y"
const Info C_Z = Info(vec2(13, 18), vec2(0, 18), 13, vec2(182, 50)); // "Z"
const Info C_BRACKETL = Info(vec2(7, 22), vec2(1, 18), 7, vec2(398, 54)); // "["
const Info C_BACKSLASH = Info(vec2(9, 18), vec2(0, 18), 8, vec2(459, 54)); // "\\"
const Info C_BRACKETR = Info(vec2(6, 22), vec2(0, 18), 7, vec2(304, 55)); // "]"
const Info C_CARET = Info(vec2(13, 12), vec2(0, 18), 13, vec2(353, 55)); // "^"
const Info C_UNDERSCORE = Info(vec2(12, 2), vec2(-1, -2), 10, vec2(413, 55)); // "_"
const Info C_BACKTICK = Info(vec2(6, 5), vec2(4, 19), 13, vec2(2, 55)); // "`"
const Info C_a = Info(vec2(11, 15), vec2(1, 14), 13, vec2(249, 55)); // "a"
const Info C_b = Info(vec2(12, 20), vec2(2, 19), 14, vec2(16, 55)); // "b"
const Info C_c = Info(vec2(10, 15), vec2(1, 14), 11, vec2(374, 55)); // "c"
const Info C_d = Info(vec2(12, 20), vec2(1, 19), 14, vec2(94, 56)); // "d"
const Info C_e = Info(vec2(12, 15), vec2(1, 14), 13, vec2(433, 56)); // "e"
const Info C_f = Info(vec2(10, 19), vec2(0, 19), 8, vec2(114, 56)); // "f"
const Info C_g = Info(vec2(13, 20), vec2(0, 14), 13, vec2(203, 56)); // "g"
const Info C_h = Info(vec2(11, 19), vec2(2, 19), 14, vec2(51, 57)); // "h"
const Info C_i = Info(vec2(4, 18), vec2(1, 18), 6, vec2(268, 55)); // "i"
const Info C_j = Info(vec2(7, 24), vec2(-2, 18), 6, vec2(36, 59)); // "j"
const Info C_k = Info(vec2(11, 19), vec2(2, 19), 12, vec2(132, 63)); // "k"
const Info C_l = Info(vec2(3, 19), vec2(2, 19), 6, vec2(413, 65)); // "l"
const Info C_m = Info(vec2(19, 14), vec2(2, 14), 22, vec2(151, 69)); // "m"
const Info C_n = Info(vec2(11, 14), vec2(2, 14), 14, vec2(353, 75)); // "n"
const Info C_o = Info(vec2(13, 15), vec2(1, 14), 14, vec2(178, 76)); // "o"
const Info C_p = Info(vec2(12, 20), vec2(2, 14), 14, vec2(372, 78)); // "p"
const Info C_q = Info(vec2(12, 20), vec2(1, 14), 14, vec2(476, 79)); // "q"
const Info C_r = Info(vec2(8, 14), vec2(2, 14), 9, vec2(249, 78)); // "r"
const Info C_s = Info(vec2(10, 15), vec2(1, 14), 11, vec2(424, 79)); // "s"
const Info C_t = Info(vec2(8, 17), vec2(0, 16), 8, vec2(496, 79)); // "t"
const Info C_u = Info(vec2(12, 14), vec2(1, 13), 14, vec2(224, 80)); // "u"
const Info C_v = Info(vec2(13, 13), vec2(0, 13), 12, vec2(280, 80)); // "v"
const Info C_w = Info(vec2(19, 13), vec2(0, 13), 18, vec2(318, 80)); // "w"
const Info C_x = Info(vec2(13, 13), vec2(0, 13), 12, vec2(453, 80)); // "x"
const Info C_y = Info(vec2(13, 19), vec2(0, 13), 12, vec2(70, 81)); // "y"
const Info C_z = Info(vec2(11, 13), vec2(0, 13), 11, vec2(2, 83)); // "z"
const Info C_BRACEL = Info(vec2(9, 22), vec2(0, 18), 9, vec2(114, 83)); // "{"
const Info C_PIPE = Info(vec2(3, 25), vec2(5, 19), 13, vec2(442, 79)); // "|"
const Info C_BRACER = Info(vec2(9, 22), vec2(0, 18), 9, vec2(91, 84)); // "}"

#pragma webpack include ../common/sdf2d/sdRectangle.glsl

uniform sampler2D fontTexture;

void cc(inout vec2 caret, Info charInfo, vec2 p, inout float distance) {
  p -= caret;
  vec2 n = vec2(0, 0);
  float dBox = sdRectangle(
    vec2(charInfo.dim),
    p -
      0.5 * charInfo.dim -
      vec2(charInfo.bearing.x, charInfo.dim.y - charInfo.bearing.y)
  );
  if (dBox > 0.0) {
    //    distance = min(distance, dBox);
  }
  else {
    vec2 texCoordNotNormed =
      vec2(charInfo.pos) +
      vec2(charInfo.bearing.x, charInfo.dim.y) +
      p * vec2(1, -1);
    vec2 texCoord = texCoordNotNormed / vec2(512, 1024);
    distance += texture(fontTexture, texCoord).r;
  }
  caret.x += float(charInfo.horiAdvance);
}
float sdHelloWorld(vec2 p) {
  vec2 c = vec2(-10, 0);
  float d = 0.0;
  cc(c, C_H, p, d);
  cc(c, C_e, p, d);
  cc(c, C_l, p, d);
  cc(c, C_l, p, d);
  cc(c, C_o, p, d);
  cc(c, C_SPACE, p, d);
  cc(c, C_W, p, d);
  cc(c, C_o, p, d);
  cc(c, C_r, p, d);
  cc(c, C_l, p, d);
  cc(c, C_d, p, d);
  cc(c, C_BANG, p, d);
  return d;
}
