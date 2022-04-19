(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[803],{9248:(n,e,t)=>{"use strict";t.d(e,{q:()=>o});class o{__init(){this.count=0}__init2(){this.lastTime=performance.now()}constructor(n,e=10){this.notify=n,this.window=e,o.prototype.__init.call(this),o.prototype.__init2.call(this)}tick(n=performance.now()){const e=this.window;if(this.count=(this.count+1)%e,0===this.count){const t=Math.floor(1e3*e/(n-this.lastTime));this.notify(t),this.lastTime=n}}}},6509:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>m});var o=t(5069),c=t(4854),a=t(4353),r=t(871),s=t(8051),i=t(7392),l=t(9526),v=t(2004),d=t(9248);const p=t.p+"551166c03df33a2dcfd3.png";class f{__init(){this.mousePos=[-1,-1]}__init2(){this.dyn={}}__init3(){this.animate=!0}constructor(n,e,t,o){this.canvas=n,this.fragShader=e,this.replacer=t,f.prototype.__init.call(this),f.prototype.__init2.call(this),f.prototype.__init3.call(this),f.prototype.__init4.call(this),f.prototype.__init5.call(this);const c=v.ZG.create({canvas:n,alpha:!0,premultipliedAlpha:!0,throwOnError:!0});this.gl=c,c.fixCanvasRes(),c.canvas.addEventListener("mouseleave",(n=>{this.mousePos=[-1,-1]})),c.canvas.addEventListener("mousemove",(n=>{const e=n.currentTarget,{width:t,height:o}=e.getBoundingClientRect();this.mousePos=[e.width*(n.offsetX/t),e.height*(1-n.offsetY/o)]})),this.planeMesh=v.Kj.plane({startX:-1,startY:-1,width:2,height:2}),this.planeMesh.compile(c),this.tex=v.xE.fromURLSwitch(p,void 0,c),this.fpsController=o&&new d.q(o),this.updateShader()}updateShader(){let n=t(8515)("./"+this.fragShader+".frag").default;this.replacer&&(n=n.replace("#define SDF(r, p) demoIcosahedron(r, p)",`#define SDF(r, p) ${this.replacer}(r, p)`)),this.buildShader(t(8009).Z,n)}__init4(){this.buildShader=function(n){let e,t=[];return function(...o){return(t.length!==o.length||t.some(((n,e)=>n!==o[e])))&&(t=o,e=n(...o)),e}}(((n,e)=>{try{console.clear(),console.log("vs or fs changed! recompiling!",this.fragShader),this.shader&&this.gl.deleteProgram(this.shader.program),this.shader=v.ex.create(n,e)}catch(n){if(console.error(n),!this.shader)throw n}}))}start(){this.gl.animate(this.render)}__init5(){this.render=n=>{this.gl.makeCurrent(),this.updateShader(),function(n){let e,t=n[0],o=1;for(;o<n.length;){const c=n[o],a=n[o+1];if(o+=2,("optionalAccess"===c||"optionalCall"===c)&&null==t)return;"access"===c||"optionalAccess"===c?(e=t,t=a(t)):"call"!==c&&"optionalCall"!==c||(t=a(((...n)=>t.call(e,...n))),e=void 0)}}([this,"access",n=>n.fpsController,"optionalAccess",n=>n.tick,"call",e=>e(n)]),this.shader&&this.shader.uniforms({gradients:1,iResolution:[this.gl.canvas.width,this.gl.canvas.height],iMouse:this.mousePos,iTime:this.animate?n/1e3:0}).uniforms(this.dyn).draw(this.planeMesh)}}destroy(){}}function h({frag:n,sx:e,animate:t,state:r,replacer:v}){const d=(0,l.useRef)(null),p=(0,l.useRef)(void 0),[h,m]=(0,l.useState)(0);(0,l.useEffect)((()=>{d.current&&(p.current=new f(d.current,n,v,m),p.current.start())}),[n,v]);const u=(0,s.Z)();return(0,l.useEffect)((()=>{p.current&&Object.assign(p.current.dyn,{colorBackground:i.iv(u.palette.background.default).gl(),colorPrimary:i.iv(u.palette.primary.main).gl(),colorSecondary:i.iv(u.palette.secondary.main).gl()})}),[u.palette]),(0,l.useEffect)((()=>{p.current&&(p.current.animate=t)}),[t]),(0,l.useEffect)((()=>{p.current&&Object.assign(p.current.dyn,r)}),[r]),l.createElement(o.Z,{sx:e},l.createElement(a.Z,{component:"canvas",ref:d,sx:{width:"100%",height:"100%"}}),l.createElement(c.Z,null,"FPS: ",h))}const m=()=>l.createElement(r.ZP,{container:!0,style:{height:"99%"},spacing:2,padding:2},["demoIcosahedron","demoCube","demoOctahedron","demoVector","demoTetrahedron"].map((n=>l.createElement(r.ZP,{key:n,item:!0,xs:12,md:6,lg:4},l.createElement(h,{frag:"demo3d",replacer:n,sx:{height:300},animate:!1,state:{}})))))},8560:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>o});const o="#version 300 es\n\nprecision highp float;\n// START ../common/matrices.glsl\n// START ./constants.glsl\nconst float SQRT1_2 = 0.7071067811865476;\nconst float SQRT1_3 = 0.57735026919;\nconst float SQRT2 = 1.4142135623730951;\nconst float SQRT3 = 1.732050807568877;\n// sqrt(3)/2 = sin(60*)\nconst float SQRT3_2 = 0.86602540378;\nconst float GOLDEN_RATIO = 1.61803398875;\nconst float PI = 3.141592653589793;\nconst float TAU = 6.28318530718;\n/**\n * One degree in radians. Use like `sin(30 * DEG)`.\n */\nconst float DEGREE = 0.017453292519943295;\n\n\nmat3 rotX(float angle) {\n  float c = cos(angle),\n    s = sin(angle);\n  return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);\n}\nmat3 rotY(float angle) {\n  float c = cos(angle),\n    s = sin(angle);\n  return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);\n}\nmat3 rotZ(float angle) {\n  float c = cos(angle),\n    s = sin(angle);\n  return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);\n}\n/**\n * Returns a matrix that puts the camera at the eye point `ex, ey, ez` looking\n * toward the center point `cx, cy, cz` with an up direction of `ux, uy, uz`.\n * This emulates the OpenGL function `gluLookAt()`.\n */\nmat4 lookAt(vec3 eye, vec3 focus, vec3 up) {\n  vec3 f = normalize(eye - focus);\n  vec3 s = normalize(cross(up, f));\n  vec3 t = normalize(cross(f, s));\n\n  return mat4(\n    vec4(s.x, t.x, f.x, 0.0),\n    vec4(s.y, t.y, f.y, 0.0),\n    vec4(s.z, t.z, f.z, 0.0),\n    vec4(-dot(s, eye), -dot(t, eye), -dot(f, eye), 1)\n  );\n}\n\n// the OpenGL function `glFrustum()`.\nmat4 frustum(\n  float left,\n  float right,\n  float bottom,\n  float top,\n  float near,\n  float far\n) {\n  return mat4(\n    vec4(2.0 * near / (right - left), 0.0, 0.0, 0.0),\n    vec4(0, 2.0 * near / (top - bottom), 0.0, 0.0),\n    vec4(\n      (right + left) / (right - left),\n      (top + bottom) / (top - bottom),\n      -(far + near) / (far - near),\n      -1\n    ),\n    vec4(0.0, 0.0, -2.0 * far * near / (far - near), 0.0)\n  );\n}\n\nmat4 perspective(float fovDegrees, float aspect, float near, float far) {\n  float y = tan(fovDegrees * DEGREE / 2.0) * near;\n  float x = y * aspect;\n  return frustum(-x, x, -y, y, near, far);\n}\n\n// START ../common/max3.glsl\nfloat max3(float a, float b, float c) {\n  return max(a, max(b, c));\n}\nfloat max3(vec3 v) {\n  return max(v.x, max(v.y, v.z));\n}\n\n// #pragma glslify: export(max3)\n\n\n// START ../common/polar.glsl\n// START ../common/fromPolar.glsl\n// START ./unmix.glsl\nfloat unmix(float a, float b, float value) {\n  return (value - a) / (b - a);\n}\n\n// #pragma glslify: export(unmix)\n\n\n\nvec3 fromPolar(float radius, float phi, float z) {\n  return vec3(radius * cos(phi), radius * sin(phi), z);\n}\n\nvec2 fromPolar(float radius, float phi) {\n  return vec2(radius * cos(phi), radius * sin(phi));\n}\n\nvec2 fromPolar(vec2 polar) {\n  return fromPolar(polar.x, polar.y);\n}\n\n// #pragma glslify: export(fromPolar)\n\n\n// START ../common/toPolar.glsl\n\n\nvec2 toPolar(vec2 xy) {\n  return vec2(length(xy), atan(xy.y, xy.x));\n}\n\nmat2 toPolarDerivate(vec2 xy) {\n  return mat2(xy.x * xy.x, xy.y * xy.y, -xy.y, xy.x) / dot(xy, xy);\n}\n\n// #pragma glslify: export(toPolar)\n\n\n\n// START ../common/ungamma.glsl\nvec3 ungamma(vec4 col) {\n  return pow(col.rgb, vec3(2.2));\n}\nvec3 ungamma(vec3 col) {\n  return pow(col, vec3(2.2));\n}\n\n// START ../common/colors.glsl\nconst vec3 INDIAN_RED = vec3(0.804, 0.361, 0.361);\nconst vec3 LIGHT_CORAL = vec3(0.941, 0.502, 0.502);\nconst vec3 SALMON = vec3(0.98, 0.502, 0.447);\nconst vec3 DARK_SALMON = vec3(0.914, 0.588, 0.478);\nconst vec3 LIGHT_SALMON = vec3(1.0, 0.627, 0.478);\nconst vec3 CRIMSON = vec3(0.863, 0.078, 0.235);\nconst vec3 RED = vec3(1.0, 0.0, 0.0);\nconst vec3 FIRE_BRICK = vec3(0.698, 0.133, 0.133);\nconst vec3 DARK_RED = vec3(0.545, 0.0, 0.0);\nconst vec3 PINK = vec3(1.0, 0.753, 0.796);\nconst vec3 LIGHT_PINK = vec3(1.0, 0.714, 0.757);\nconst vec3 HOT_PINK = vec3(1.0, 0.412, 0.706);\nconst vec3 DEEP_PINK = vec3(1.0, 0.078, 0.576);\nconst vec3 MEDIUM_VIOLET_RED = vec3(0.78, 0.082, 0.522);\nconst vec3 PALE_VIOLET_RED = vec3(0.859, 0.439, 0.576);\nconst vec3 CORAL = vec3(1.0, 0.498, 0.314);\nconst vec3 TOMATO = vec3(1.0, 0.388, 0.278);\nconst vec3 ORANGE_RED = vec3(1.0, 0.271, 0.0);\nconst vec3 DARK_ORANGE = vec3(1.0, 0.549, 0.0);\nconst vec3 ORANGE = vec3(1.0, 0.647, 0.0);\nconst vec3 GOLD = vec3(1.0, 0.843, 0.0);\nconst vec3 YELLOW = vec3(1.0, 1.0, 0.0);\nconst vec3 LIGHT_YELLOW = vec3(1.0, 1.0, 0.878);\nconst vec3 LEMON_CHION = vec3(1.0, 0.98, 0.804);\nconst vec3 LIGHT_GOLDENROD_YELLOW = vec3(0.98, 0.98, 0.824);\nconst vec3 PAPAYA_WHIP = vec3(1.0, 0.937, 0.835);\nconst vec3 MOCCASIN = vec3(1.0, 0.894, 0.71);\nconst vec3 PEACH_PU = vec3(1.0, 0.855, 0.725);\nconst vec3 PALE_GOLDENROD = vec3(0.933, 0.91, 0.667);\nconst vec3 KHAKI = vec3(0.941, 0.902, 0.549);\nconst vec3 DARK_KHAKI = vec3(0.741, 0.718, 0.42);\nconst vec3 LAVENDER = vec3(0.902, 0.902, 0.98);\nconst vec3 THISTLE = vec3(0.847, 0.749, 0.847);\nconst vec3 PLUM = vec3(0.867, 0.627, 0.867);\nconst vec3 VIOLET = vec3(0.933, 0.51, 0.933);\nconst vec3 ORCHID = vec3(0.855, 0.439, 0.839);\nconst vec3 FUCHSIA = vec3(1.0, 0.0, 1.0);\nconst vec3 MAGENTA = vec3(1.0, 0.0, 1.0);\nconst vec3 MEDIUM_ORCHID = vec3(0.729, 0.333, 0.827);\nconst vec3 MEDIUM_PURPLE = vec3(0.576, 0.439, 0.859);\nconst vec3 BLUE_VIOLET = vec3(0.541, 0.169, 0.886);\nconst vec3 DARK_VIOLET = vec3(0.58, 0.0, 0.827);\nconst vec3 DARK_ORCHID = vec3(0.6, 0.196, 0.8);\nconst vec3 DARK_MAGENTA = vec3(0.545, 0.0, 0.545);\nconst vec3 PURPLE = vec3(0.502, 0.0, 0.502);\nconst vec3 INDIGO = vec3(0.294, 0.0, 0.51);\nconst vec3 SLATE_BLUE = vec3(0.416, 0.353, 0.804);\nconst vec3 DARK_SLATE_BLUE = vec3(0.282, 0.239, 0.545);\nconst vec3 GREEN_YELLOW = vec3(0.678, 1.0, 0.184);\nconst vec3 CHARTREUSE = vec3(0.498, 1.0, 0.0);\nconst vec3 LAWN_GREEN = vec3(0.486, 0.988, 0.0);\nconst vec3 LIME = vec3(0.0, 1.0, 0.0);\nconst vec3 LIME_GREEN = vec3(0.196, 0.804, 0.196);\nconst vec3 PALE_GREEN = vec3(0.596, 0.984, 0.596);\nconst vec3 LIGHT_GREEN = vec3(0.565, 0.933, 0.565);\nconst vec3 MEDIUM_SPRING_GREEN = vec3(0.0, 0.98, 0.604);\nconst vec3 SPRING_GREEN = vec3(0.0, 1.0, 0.498);\nconst vec3 MEDIUM_SEA_GREEN = vec3(0.235, 0.702, 0.443);\nconst vec3 SEA_GREEN = vec3(0.18, 0.545, 0.341);\nconst vec3 FOREST_GREEN = vec3(0.133, 0.545, 0.133);\nconst vec3 GREEN = vec3(0.0, 0.502, 0.0);\nconst vec3 DARK_GREEN = vec3(0.0, 0.392, 0.0);\nconst vec3 YELLOW_GREEN = vec3(0.604, 0.804, 0.196);\nconst vec3 OLIVE_DRAB = vec3(0.42, 0.557, 0.137);\nconst vec3 OLIVE = vec3(0.502, 0.502, 0.0);\nconst vec3 DARK_OLIVE_GREEN = vec3(0.333, 0.42, 0.184);\nconst vec3 MEDIUM_AQUAMARINE = vec3(0.4, 0.804, 0.667);\nconst vec3 DARK_SEA_GREEN = vec3(0.561, 0.737, 0.561);\nconst vec3 LIGHT_SEA_GREEN = vec3(0.125, 0.698, 0.667);\nconst vec3 DARK_CYAN = vec3(0.0, 0.545, 0.545);\nconst vec3 TEAL = vec3(0.0, 0.502, 0.502);\nconst vec3 AQUA = vec3(0.0, 1.0, 1.0);\nconst vec3 CYAN = vec3(0.0, 1.0, 1.0);\nconst vec3 LIGHT_CYAN = vec3(0.878, 1.0, 1.0);\nconst vec3 PALE_TURQUOISE = vec3(0.686, 0.933, 0.933);\nconst vec3 AQUAMARINE = vec3(0.498, 1.0, 0.831);\nconst vec3 TURQUOISE = vec3(0.251, 0.878, 0.816);\nconst vec3 MEDIUM_TURQUOISE = vec3(0.282, 0.82, 0.8);\nconst vec3 DARK_TURQUOISE = vec3(0.0, 0.808, 0.82);\nconst vec3 CADET_BLUE = vec3(0.373, 0.62, 0.627);\nconst vec3 STEEL_BLUE = vec3(0.275, 0.51, 0.706);\nconst vec3 LIGHT_STEEL_BLUE = vec3(0.69, 0.769, 0.871);\nconst vec3 POWDER_BLUE = vec3(0.69, 0.878, 0.902);\nconst vec3 LIGHT_BLUE = vec3(0.678, 0.847, 0.902);\nconst vec3 SKY_BLUE = vec3(0.529, 0.808, 0.922);\nconst vec3 LIGHT_SKY_BLUE = vec3(0.529, 0.808, 0.98);\nconst vec3 DEEP_SKY_BLUE = vec3(0.0, 0.749, 1.0);\nconst vec3 DODGER_BLUE = vec3(0.118, 0.565, 1.0);\nconst vec3 CORNLOWER_BLUE = vec3(0.392, 0.584, 0.929);\nconst vec3 MEDIUM_SLATE_BLUE = vec3(0.482, 0.408, 0.933);\nconst vec3 ROYAL_BLUE = vec3(0.255, 0.412, 0.882);\nconst vec3 BLUE = vec3(0.0, 0.0, 1.0);\nconst vec3 MEDIUM_BLUE = vec3(0.0, 0.0, 0.804);\nconst vec3 DARK_BLUE = vec3(0.0, 0.0, 0.545);\nconst vec3 NAVY = vec3(0.0, 0.0, 0.502);\nconst vec3 MIDNIGHT_BLUE = vec3(0.098, 0.098, 0.439);\nconst vec3 CORNSILK = vec3(1.0, 0.973, 0.863);\nconst vec3 BLANCHED_ALMOND = vec3(1.0, 0.922, 0.804);\nconst vec3 BISQUE = vec3(1.0, 0.894, 0.769);\nconst vec3 NAVAJO_WHITE = vec3(1.0, 0.871, 0.678);\nconst vec3 WHEAT = vec3(0.961, 0.871, 0.702);\nconst vec3 BURLY_WOOD = vec3(0.871, 0.722, 0.529);\nconst vec3 TAN = vec3(0.824, 0.706, 0.549);\nconst vec3 ROSY_BROWN = vec3(0.737, 0.561, 0.561);\nconst vec3 SANDY_BROWN = vec3(0.957, 0.643, 0.376);\nconst vec3 GOLDENROD = vec3(0.855, 0.647, 0.125);\nconst vec3 DARK_GOLDENROD = vec3(0.722, 0.525, 0.043);\nconst vec3 PERU = vec3(0.804, 0.522, 0.247);\nconst vec3 CHOCOLATE = vec3(0.824, 0.412, 0.118);\nconst vec3 SADDLE_BROWN = vec3(0.545, 0.271, 0.075);\nconst vec3 SIENNA = vec3(0.627, 0.322, 0.176);\nconst vec3 BROWN = vec3(0.647, 0.165, 0.165);\nconst vec3 MAROON = vec3(0.502, 0.0, 0.0);\nconst vec3 WHITE = vec3(1.0, 1.0, 1.0);\nconst vec3 SNOW = vec3(1.0, 0.98, 0.98);\nconst vec3 HONEYDEW = vec3(0.941, 1.0, 0.941);\nconst vec3 MINT_CREAM = vec3(0.961, 1.0, 0.98);\nconst vec3 AZURE = vec3(0.941, 1.0, 1.0);\nconst vec3 ALICE_BLUE = vec3(0.941, 0.973, 1.0);\nconst vec3 GHOST_WHITE = vec3(0.973, 0.973, 1.0);\nconst vec3 WHITE_SMOKE = vec3(0.961, 0.961, 0.961);\nconst vec3 SEASHELL = vec3(1.0, 0.961, 0.933);\nconst vec3 BEIGE = vec3(0.961, 0.961, 0.863);\nconst vec3 OLD_LACE = vec3(0.992, 0.961, 0.902);\nconst vec3 FLORAL_WHITE = vec3(1.0, 0.98, 0.941);\nconst vec3 IVORY = vec3(1.0, 1.0, 0.941);\nconst vec3 ANTIQUE_WHITE = vec3(0.98, 0.922, 0.843);\nconst vec3 LINEN = vec3(0.98, 0.941, 0.902);\nconst vec3 LAVENDER_BLUSH = vec3(1.0, 0.941, 0.961);\nconst vec3 MISTY_ROSE = vec3(1.0, 0.894, 0.882);\nconst vec3 GAINSBORO = vec3(0.863, 0.863, 0.863);\nconst vec3 LIGHT_GREY = vec3(0.827, 0.827, 0.827);\nconst vec3 SILVER = vec3(0.753, 0.753, 0.753);\nconst vec3 DARK_GRAY = vec3(0.663, 0.663, 0.663);\nconst vec3 GRAY = vec3(0.502, 0.502, 0.502);\nconst vec3 DIM_GRAY = vec3(0.412, 0.412, 0.412);\nconst vec3 LIGHT_SLATE_GRAY = vec3(0.467, 0.533, 0.6);\nconst vec3 SLATE_GRAY = vec3(0.439, 0.502, 0.565);\nconst vec3 DARK_SLATE_GRAY = vec3(0.184, 0.31, 0.31);\nconst vec3 BLACK = vec3(0.0, 0.0, 0.0);\n\n// START ../common/sdf3d/sdIcosahedron.glsl\n\n\n// signed distance function for icosahedron\n// cf. https://en.wikipedia.org/wiki/Regular_icosahedron\n// s: edge length\n// p: point to evaluate function for\nfloat sdIcosahedron(float s, vec3 p) {\n  // NN = 1/GOLDEN_RATIO = GOLDEN_RATIO - 1\n  const float K = GOLDEN_RATIO * 0.5;\n  // the three vertices of the icosahedron triangle which\n  // is fully inside the +++ octant. (edge length = 1)\n  const vec3 a = vec3(0.5, K, 0.0);\n  const vec3 b = vec3(0.0, 0.5, K);\n  const vec3 c = vec3(K, 0.0, 0.5);\n  const vec3 ab1 = b - a; // values chosen so edge length is 1\n  const vec3 n1 = normalize(cross(a, b));\n  const vec3 n2 = normalize(cross(b, c));\n  const vec3 n3 = normalize(cross(c, a));\n  const vec3 xyz1 = normalize(vec3(1.0));\n  // for edge-length 1\n  const float INSCRIBED_SPHERE_RADIUS = 0.7557613141;\n\n  // we use a rotation where the icosahedron is symmetric\n  // in all three coordinate planes, and reduce the problem\n  // to the +++ octant\n  p = abs(p);\n\n  // there is one complete triangle in the +++ octant\n  // mirror on planes which go through origin and the\n  // complete triangles sides.\n  if (dot(p, n1) < 0.0) {\n    p += -2.0 * dot(p, n1) * n1;\n  }\n  if (dot(p, n2) < 0.0) {\n    p += -2.0 * dot(p, n2) * n2;\n  }\n  if (dot(p, n3) < 0.0) {\n    p += -2.0 * dot(p, n3) * n3;\n  }\n\n  // rotate space around (1,1,1) vector so that all sides of the triangle\n  // end up mapped on the ab side.\n  vec3 dirs = vec3(-dot(n1, p), -dot(n2, p), -dot(n3, p));\n  if (dirs.y > dirs.x && dirs.y > dirs.z) {\n    p = p.yzx;\n  } else if (dirs.z > dirs.x && dirs.z > dirs.y) {\n    p = p.zxy;\n  }\n\n  // check if the point is directly (perpendicular) above the triangle.\n  // as we have rotated the space, we only need to check if it is\n  // inside one edge.\n  vec3 midAB = (a + b) / 2.0;\n  vec3 pn = normalize(c - midAB);\n  float w = dot(midAB, pn);\n  if (dot(p, pn) > w * s) {\n    // if not, return the distance to the plane the triangle is in\n    return dot(xyz1, p) - INSCRIBED_SPHERE_RADIUS * s;\n  }\n\n  // project the point onto segment ab, and return the distance to it\n  float d3 = dot(ab1, p);\n  d3 = clamp(d3, -0.5 * s, 0.5 * s);\n  vec3 closestp = midAB * s + d3 * ab1;\n  return distance(closestp, p);\n}\n// #pragma glslify: export(sdIcosahedron)\n\n// START ../common/sdf3d/sdOctahedron.glsl\nfloat sdOctahedron(float s, vec3 p) {\n  p = abs(p);\n  float m = p.x + p.y + p.z - s;\n  vec3 q;\n  if (3.0 * p.x < m) q = p.xyz;\n  else if (3.0 * p.y < m) q = p.yzx;\n  else if (3.0 * p.z < m) q = p.zxy;\n  else return m * 0.57735027;\n\n  float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);\n  return length(vec3(q.x, q.y - s + k, q.z - k));\n}\n// #pragma glslify: export(sdOctahedron)\n\nfloat sdOctahedron(vec3 p, float s) {\n  p = abs(p);\n\n  float m = p.x + p.y + p.z - s;\n  //find point on octohedron surf nearest to p\n  vec3 projPoint = p - vec3(0.333333 * m); //project onto surface plane\n  //now push projected point, if outside triangle edge, perpendicular to edge, to edge\n  vec3 toMove = min(projPoint, 0.0); //if projpoint.x<0 move along (1.0,-0.5,-0.5) , etc\n  float toMoveSum = dot(toMove, vec3(1.0)); //which is basically along (1.5,0,0) then vec3(-0.5)\n\n  vec3 movedPoint = projPoint + toMove * vec3(-1.5) + toMoveSum * vec3(0.5); //better to multiply toMove by a matrix (1s diagonal, 0.5 other)?\n\n  movedPoint = max(movedPoint, 0.0); //cap x,y,z to 0 then\n  movedPoint *= s / dot(movedPoint, vec3(1.0)); //scale about 0,0,0\n\n  return length(p - movedPoint);\n}\n\n// START ../common/sdf3d/sdArrow.glsl\n// START ./sdCylinder.glsl\nfloat sdCylinder(float radius, float z, vec3 p) {\n  vec2 d = vec2(length(p.xy), abs(p.z)) - vec2(radius, z);\n  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));\n}\n\n// #pragma glslify: export(sdCylinder)\n\n\n\n// START ./sdCone.glsl\n\n\n/**\n * Signed distance function (SDF) of a cone. The tip of the cone is at the\n * origin and points towards +Z. q is a point on the rim of the cone.\n */\nfloat sdCone(vec2 c, float h, vec3 p) {\n  vec2 q = h * vec2(c.x / c.y, -1.0);\n  vec2 w = vec2(length(p.xz), p.y);\n  vec2 a = w - q * clamp(dot(w, q) / dot(q, q), 0.0, 1.0);\n  vec2 b = w - q * vec2(clamp(w.x / q.x, 0.0, 1.0), 1.0);\n  float k = sign(q.y);\n  float d = min(dot(a, a), dot(b, b));\n  float s = max(k * (w.x * q.y - w.y * q.x), k * (w.y - q.y));\n  return sqrt(d) * sign(s);\n}\n// #pragma glslify: export(sdBox)\n\nfloat sdConeB(vec2 c, float h, vec3 p) {\n  float q = length(p.xz);\n  return max(dot(c.xy, vec2(q, p.y)), -h - p.y);\n}\n\nvec3 perpendicularVector(vec3 a) {\n  return cross(a, abs(a.z) > abs(a.x) ? vec3(0, 0, 1) : vec3(0, 1, 0));\n}\n/**\n * Signed distance function (SDF) of an arrow. The arrow goes along the X axis.\n * The shaft of the arrow has thickness TODO. The tip of the arrow has 30°\n * angle, length of TODO, with the widest point being.\n */\nfloat sdArrow(float length, vec3 p) {\n  float r = 0.01;\n  return min(\n    sdCylinder(\n      0.02 - r,\n      0.5 * (length - 0.1) - r,\n      p.yzx - vec3(0, 0, 0.5 * (length - 0.1))\n    ) -\n      r,\n    sdCone(\n      vec2(sin(15.0 * DEGREE), cos(15.0 * DEGREE)),\n      0.15 - r,\n      p.zxy - vec3(0, length - r, 0)\n    ) -\n      r\n  );\n}\nfloat sdArrow(vec3 a, vec3 b, vec3 p) {\n  vec3 x = normalize(b - a);\n  vec3 y = normalize(perpendicularVector(x));\n  vec3 z = cross(x, y);\n  return sdArrow(length(b - a), inverse(mat3(x, y, z)) * (p - a));\n}\n\n// START ../common/sdf3d/sdTetrahedron.glsl\n\n\n// START ./sdCapsule.glsl\nfloat sdCapsule(vec3 a, vec3 b, float r, vec3 p) {\n  vec3 pa = p - a;\n  vec3 ba = b - a;\n  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);\n  return length(pa - ba * h) - r;\n}\n// #pragma glslify: export(sdCapsule)\n\n// START ./sdBox.glsl\n\n\nfloat sdBox(vec3 r, vec3 p) {\n  vec3 q = abs(p) - r;\n  return length(max(q, 0.0)) + min(max3(q), 0.0);\n}\n\nfloat sdBox(vec3 r, float r2, vec3 p) {\n  return sdBox(r - r2, p) - r2;\n}\n\n// #pragma glslify: export(sdBox)\n\n\n\n/**\n * Signed distance function (SDF) of a tetrahedron centered at the origin.\n *\n * The corners are at `a/b = (+-1,0,sqrt(1/2))` and `c/d = (0,+-1,-sqrt(1/2))`.\n *\n * The side length is `||`\n *\n * The outscribed sphere has a radius of `sqrt(3/2)`.\n *\n * The inscribed sphere has a radius of `sqrt(1/6)`. This is calculated using\n * the fact that the triangle defined by `mid(a,b) = (0,0,sqrt(1/2))`, `c` and\n * `mid(c,d) = (0,0,-sqrt(1/2))` is similar to the triangle `mid(a,b)`, `q`, and\n * `O`.\n *\n * For rounded edges, use TODO.\n *\n * ```\n *           ^ Z\n *           |(+-1, sqrt(1/2))\n *          /\\_\n *        /    \\.q = closest point to center on face\n *      /    .   \\__> Y\n *    /            \\_\n *  /________________\\_(0,-1,sqrt(1/2))\n * (0,-1,-sqrt(1/2))\n * ```\n */\nfloat sdTetrahedron(float s, vec3 p) {\n  const vec3 a = vec3(1, 0, SQRT1_2);\n  const vec3 b = vec3(-1, 0, SQRT1_2);\n  const vec3 c = vec3(0, 1, -SQRT1_2);\n  const vec3 d = vec3(0, -1, -SQRT1_2);\n  const vec3 midBC = 0.5 * (b + c);\n  const vec3 mirror = normalize(cross(midBC - d, midBC - a));\n\n  // Tetra is symmetric in X and Y axes. RED surface in image.\n  p.xy = abs(p.xy);\n  // The part z < 0 is symmetric if we rotate it by 90°. BLUE surface in image.\n  if (p.z < 0.0) {\n    p = vec3(p.y, p.x, -p.z);\n  }\n  // Points below the plane through a, d and mid(b,c) are mirrored through it.\n  // GREEN surface in image.\n  p -= 2.0 * mirror * min(dot(p, mirror), 0.0);\n  // After mirror some points are negative, abs again:\n  p.xy = abs(p.xy);\n\n  // Points are now either above the white surface, or above the positive ab segment.\n  // We shift the coordinate system so that a is now at the origin.\n  p -= vec3(1, 0, SQRT1_2) * s;\n  // Finally, we move points which are directely above the face parallel along\n  // it to a/origin. We can then calculate the sdf as length(p).\n  p.x = max(p.x, 0.0);\n  vec3 midABToC1 = normalize(vec3(0, 1, -SQRT2));\n\n  p -= max(dot(midABToC1, p), 0.0) * midABToC1;\n  return sign(p.z) * length(p);\n}\n\n// Same function but also outputs color for explanation image:\n//float sdTetrahedron(float s, vec3 p, out vec3 color) {\n//  //  return distance(vec3(1), p) - 0.2;\n//  const vec3 a = vec3(0, -1, -SQRT1_2);\n//  const vec3 b = vec3(0, 1, -SQRT1_2);\n//  const vec3 c = vec3(1, 0, SQRT1_2);\n//  const vec3 d = vec3(-1, 0, SQRT1_2);\n//  const vec3 x = 0.5 * (b + d);\n//  const vec3 mirror = normalize(cross(x - a, x - c));\n//\n//  color = WHITE;\n//  if (p.xy != abs(p.xy)) {\n//    p.xy = abs(p.xy);\n//    if (color == WHITE) color = RED;\n//  }\n//  if (p.z < 0.0) {\n//    p = vec3(p.y, p.x, -p.z);\n//    if (color == WHITE) color = BLUE;\n//  }\n//  if (dot(p, mirror) < 0.0) {\n//    if (color == WHITE) color = GREEN;\n//    p -= 2.0 * mirror * min(dot(p, mirror), 0.0);\n//  }\n//  p.xy = abs(p.xy);\n//  p -= vec3(1, 0, SQRT1_2);\n//  p.x = max(p.x, 0.0);\n//  vec3 fgh = normalize(vec3(0, 1, -SQRT2));\n//\n//  p -= max(dot(fgh, p), 0.0) * fgh;\n//  return sign(p.z) * length(p);\n//}\n\n\n\n\nuniform sampler2D texture;\nuniform float iTime;\nuniform vec4 colorPrimary;\nuniform vec4 colorSecondary;\nuniform vec4 colorBackground;\nuniform float a;\nuniform float b;\nuniform float c;\nuniform float d;\nuniform int bandCount;\nuniform vec3 extra;\nuniform vec2 iResolution;\nuniform vec2 iMouse;\nin float n;\nin vec2 coord;\nout vec4 fragColor;\n\n\nstruct RMHit {\n  float distance;\n  vec4 color;\n};\nRMHit mixa(RMHit a, RMHit b, float t) {\n  return RMHit(mix(a.distance, b.distance, t), mix(a.color, b.color, t));\n}\nfloat skybox(vec3 p) {\n  return 32.0 - max3(abs(p));\n}\n\nRMHit add(RMHit a, RMHit b) {\n  //    return a.distance < b.distance\n  //        ? RMHit(a.distance, a.color)\n  //        : RMHit(b.distance, b.color);\n  return mixa(a, b, float(b.distance < a.distance));\n}\n\nRMHit addTillet(float r, RMHit a, RMHit b) {\n  if (a.distance < r && b.distance < r) {\n    return RMHit(\n      r - distance(vec2(a.distance, b.distance), vec2(r)),\n      mix(a.color, b.color, (a.distance - b.distance) / r * 0.5 + 0.5)\n    );\n  } else {\n    return add(a, b);\n  }\n}\n\nRMHit addTillet(float r, RMHit a, RMHit b, vec4 tilletColor) {\n  if (a.distance < r && b.distance < r) {\n    return RMHit(\n      r - distance(vec2(a.distance, b.distance), vec2(r)),\n      tilletColor\n    );\n  } else {\n    return add(a, b);\n  }\n}\nRMHit addTillet2(float r, RMHit a, RMHit b) {\n  float h = smoothstep(-r, r, a.distance - b.distance);\n  return RMHit(\n    mix(a.distance, b.distance, h) - r * h * (1.0 - h),\n    mix(a.color, b.color, h)\n  );\n}\n\nRMHit neg(RMHit a) {\n  return RMHit(-a.distance, a.color);\n}\nRMHit sub(RMHit from, RMHit what) {\n  RMHit whatNeg = neg(what);\n  return mixa(from, whatNeg, float(whatNeg.distance > from.distance));\n}\n\nvec3 modv(vec3 v, vec3 dir1, float y) {\n  float t = dot(v, dir1);\n  return v - floor(t / y) * y * dir1;\n}\nvec3 modRotZ(vec3 p, float count) {\n  vec2 polarXY = toPolar(p.xy);\n  return fromPolar(polarXY.x, mod(polarXY.y, TAU / count), p.z);\n}\n\nfloat sin01(float x) {\n  return 0.5 + 0.5 * sin(x);\n}\nfloat cos01(float x) {\n  return 0.5 + 0.5 * cos(x);\n}\n\nfloat smoothmin(float r, float a, float b) {\n  float h = smoothstep(-r, r, a - b);\n  return mix(a, b, h) - r * h * (1.0 - h);\n}\n\nvec2 project(vec2 a, vec2 onto1) {\n  return onto1 * (dot(a, onto1) / dot(onto1, onto1));\n}\n\nvec3 reject(vec3 a, vec3 b1) {\n  return a - b1 * dot(a, b1);\n}\nfloat demoIcosahedron(float r, vec3 p) {\n  float d1 = sdIcosahedron(1.0 - r, p - vec3(0, 0, 1)) - r;\n  float d2 = p.z;\n  return min(d1, d2);\n}\nfloat demoVector(float r, vec3 p) {\n  //  float d1 = sdArrow(vec3(0), vec3(3), p);\n  float d1 = sdArrow(1.0, ((p - vec3(0, -1, 0.2)) * 0.5).yzx);\n  float d2 = p.z;\n  return min(d1, d2);\n}\nfloat demoOctahedron(float r, vec3 p) {\n  float d1 = sdOctahedron(1.0 - r, p - vec3(0, 0, 1)) - r;\n  float d2 = p.z;\n  return min(d1, d2);\n}\nfloat demoCube(float r, vec3 p) {\n  float d1 = sdBox(vec3(1.0 - r), p - vec3(0, 0, 1)) - r;\n  float d2 = p.z;\n  return min(d1, d2);\n}\nfloat demoTetrahedron(float r, vec3 p) {\n  float d1 = sdTetrahedron(1.0 - r * sqrt(6.0), p - vec3(0, 0, 1)) - r;\n  float d2 = p.z;\n  return min(d1, d2);\n}\n#define SDF(r, p) demoIcosahedron(r, p)\n\nfloat sdf(vec3 p) {\n  return SDF(d * 0.1, p);\n}\nfloat ambientOcclusion(vec3 pWC, vec3 n1WC) {\n  float k = 1.0;\n  float distance = sdf(pWC + n1WC * k);\n  return clamp(distance / k, 0.0, 1.0);\n}\n\nstruct RMResult {\n  float distance;\n  vec3 pos;\n  vec4 color;\n};\nRMResult raymarching2(vec3 start, vec3 dir1) {\n  vec3 pos = start;\n  float hit;\n  for (int i = 0; i < 200; i++) {\n    hit = sdf(pos);\n    if (hit < 0.0001 * hit) break;\n    pos = pos + dir1 * hit;\n  }\n  vec3 color;\n  if (pos.z > 0.001) {\n    color = ungamma(colorPrimary);\n  } else {\n    vec2 ff = round(fract(pos.xy * 0.5));\n\n    color = mix(\n      ungamma(colorBackground),\n      ungamma(colorSecondary),\n      mod(ff.x + ff.y, 2.0)\n    );\n  }\n  return RMResult(hit, pos, vec4(color, 1.0));\n}\nvec3 pt(mat4 pm, vec3 p) {\n  vec4 pStar = pm * vec4(p, 1.0);\n  return pStar.xyz / pStar.w;\n}\n\nfloat softshadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {\n  float res = 1.0;\n  float t = 0.1;\n  for (int i = 0; i < 1000 && t < maxt; i++) {\n    float h = sdf(ro + rd * t);\n    if (h < 0.001) return 0.0;\n    res = min(res, k * h / t);\n    t += h;\n  }\n  return res;\n}\n\nconst float eps = 1e-4;\nvec3 sdfNormal1(vec3 p, float d) {\n  return normalize(\n    vec3(\n      sdf(p + vec3(eps, 0.0, 0.0)),\n      sdf(p + vec3(0.0, eps, 0.0)),\n      sdf(p + vec3(0.0, 0.0, eps))\n    ) -\n      vec3(sdf(p))\n  );\n}\n\n//layout (depth_greater) out float gl_FragDepth;\nvoid main() {\n  vec3 camPos =\n    vec3(20, 0, 10) +\n    (-1.0 == iMouse.x\n      ? vec3(0)\n      : vec3(0, (iMouse / iResolution * 2.0 - 1.0) * 10.0));\n  mat4 modelView =\n    perspective(10.0, iResolution.x / iResolution.y, 0.1, 20.0) *\n    lookAt(camPos, vec3(0, 0, 1), vec3(0, 0, 1));\n  mat4 modelViewInverse = inverse(modelView);\n\n  vec3 light = normalize(vec3(-1.0, -2.0, -2));\n\n  vec3 a = vec3(coord * 2.0 - 1.0, -1.0);\n  vec3 b = vec3(coord * 2.0 - 1.0, 1.0);\n  vec3 aWC = pt(modelViewInverse, a);\n  vec3 bWC = pt(modelViewInverse, b);\n  vec3 lookDir1 = normalize(bWC - aWC);\n\n  RMResult hitWC = raymarching2(aWC, lookDir1);\n  vec3 hitn1 = sdfNormal1(hitWC.pos, hitWC.distance);\n  float dWC = distance(aWC, hitWC.pos);\n  vec3 hitNDC = pt(modelView, hitWC.pos);\n  vec3 p = hitWC.pos;\n  float inSun = softshadow(\n    hitWC.pos + hitn1 * 0.05,\n    -light,\n    0.0001,\n    300.0,\n    8.0\n  );\n  //    float inSun=1.;\n\n  vec3 material = hitWC.color.xyz;\n  if (dWC > 100.0) {\n    material = vec3(0.0, 0.0, 0.0);\n    //    } else if (p.z >= 0.001) {\n    //        material = vec3(0.2, 0.0, 0.0);\n    //    } else {\n    //        vec2 c = vec2(4.0, 2.0);\n    //        vec2 id = floor(((p.xy - c * 0.5) / c) );\n    //        material += .15 * cos(vec3(id.x, id.y + 2., id.x + id.y + 4.));\n  }\n\n  const vec3 sunlightColor = vec3(3.0);\n\n  float aOcc = ambientOcclusion(hitWC.pos, hitn1);\n\n  vec3 reflectionDirection = reflect(light, hitn1);\n\n  vec3 color = vec3(0.0);\n  color += material * aOcc;\n  color += inSun * sunlightColor * material * max(0.0, dot(-light, hitn1));\n  //    color = (hitn1);\n\n  vec3 eyeDirection = -lookDir1;\n  float uMaterialShininess = 256.0;\n  float specularLightWeighting = pow(\n    max(dot(reflectionDirection, eyeDirection), 0.0),\n    uMaterialShininess\n  );\n  color += specularLightWeighting;\n  //    float lightIntensity = 0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.);\n  //    float lightIntensity =\n  //        0.2 + 0.5*clamp( -dot(light, hitn1),0., 1.) + 0.3*specularLightWeighting;\n  //    fragColor = visualize(blue, red, mix(0.5, 1.0, inSun) * lightIntensity);\n  //    fragColor = mix(hitWC.color, colorBackground, mix(0.5, 1.0, inSun) * clamp(lightIntensity, 0., 1.));\n  color = pow(color, vec3(1.0 / 2.2)); // gamma correction\n  fragColor = vec4(color, 1.0);\n}\n"},8009:(n,e,t)=>{"use strict";t.d(e,{Z:()=>o});const o="#version 300 es\nprecision highp float;\n\nin vec4 ts_Vertex;\nin vec2 ts_TexCoord;\nout vec2 coord;\nvoid main() {\n  gl_Position = ts_Vertex;\n  coord = ts_TexCoord;\n}\n"},8515:(n,e,t)=>{var o={"./demo3d.frag":8560};function c(n){var e=a(n);return t(e)}function a(n){if(!t.o(o,n)){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}return o[n]}c.keys=function(){return Object.keys(o)},c.resolve=a,n.exports=c,c.id=8515}}]);