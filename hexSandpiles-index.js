(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[729],{3895:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>_});var a=n(8051),i=n(7392),s=n(9526),r=n(2276),o=n(5583),h=n(2182),c=n(2004);const l="#version 300 es\nin vec4 ts_Vertex;\nin vec2 ts_TexCoord;\nout vec2 coord;\nvoid main() {\n  coord = ts_TexCoord.xy;\n  gl_Position = ts_Vertex;\n}\n",d=n.p+"9f2a6e398434ad4fb383.ttf",u=(t,e,n,a)=>{const i=c.Kj.plane({startX:-1,width:2,startY:-1,height:2});return i.coords[0]=[t,e],i.coords[1]=[n,e],i.coords[2]=[t,a],i.coords[3]=[n,a],i.compile(),i},x=async(t,e,n)=>{await n(t+1,e),await n(t-1,e),await n(t,e+1),await n(t,e-1),await n(t+1-2*(1&e),e+1),await n(t+1-2*(1&e),e-1)},f=Math.sqrt(3)/2,v=(t,e)=>{const n=t+.5*(1&e),a=e*f;return(0,h.V)(n,a,0)},p=255,w=(t,e,n,a)=>(([t,e,n],[a,i,s])=>(Math.abs(a-t)+Math.abs(i-e)+Math.abs(s-n))/2)(y(t,e),y(n,a)),y=(t,e)=>{const n=t-(e>>1);return[n,e,-n-e]};class g{constructor(t,e){this.w=t,this.h=e,this.data=new Uint8Array(t*e)}clone(){const t=new g(this.w,this.h);return t.plusHS(this),t}dualize(){for(let t=0;t<this.h*this.w;t++)p!==this.data[t]&&(this.data[t]=5-this.data[t]);console.log("dualized")}plus(t){for(let e=0;e<this.h*this.w;e++)p!==this.data[e]&&(this.data[e]+=t);console.log("plus "+t)}times(t){for(let e=0;e<this.h*this.w;e++)p!==this.data[e]&&(this.data[e]*=t);console.log("times "+t)}setHS(t){for(let e=0;e<this.h*this.w;e++)this.data[e]=t.data[e]}plusHS(t){for(let e=0;e<this.h*this.w;e++)p!==this.data[e]&&(this.data[e]+=t.data[e])}fill(t){for(let e=0;e<this.h*this.w;e++)p!==this.data[e]&&(this.data[e]=t)}fillf(t){for(let e=0;e<this.h*this.w;e++){const n=e%this.w,a=e/this.w|0;p!==this.data[e]&&(this.data[e]=t(n,a,e,this.data[e]))}}getOddr(t,e){return this.data[e*this.w+t]}setOddr(t,e,n){return this.data[e*this.w+t]=n}addOddr(t,e,n){return this.data[e*this.w+t]+=n}isSink(t,e){return this.getOddr(t,e)===p}drawHex(t,e,n){const a=this.w/2|0,i=this.h/2|0;for(let s=0;s<this.h*this.w;s++){const r=s%this.w,o=s/this.w|0;t<=w(a,i,r,o)&&w(a,i,r,o)<=e&&(this.data[s]=n)}}async drawText(t,e,n,a,i){var s;const o=(await(s=d,new Promise(((t,e)=>{(0,r.zD)(s,((n,a)=>n?e(n):t(a)))})))).getPath(n,0,0,a),c=o.getBoundingBox(),l=((0,h.V)(t,e),(0,h.V)(c.x1,c.y1).to((0,h.V)(c.x2,c.y2)));console.log("path",o);const u=document.createElement("canvas");u.width=2*(c.x2-c.x1),u.height=2*(c.y2-c.y1);const x=u.getContext("2d");x.scale(2,2),x.translate(-c.x1,-c.y1),x.fillStyle="black",x.imageSmoothingEnabled=!1,o.draw(x);const f=v(t,e).minus(l.div(2)),p=x.getImageData(0,0,u.width,u.height).data;for(let t=0;t<this.h*this.w;t++){const e=t%this.w,n=t/this.w|0,a=v(e,n).minus(f);0<a.x&&a.x<c.x2-c.x1&&0<a.y&&a.y<c.y2-c.y1&&p[4*((2*a.y|0)*u.width+(2*a.x|0))+3]>127&&(this.data[t]=i)}}drawTriangle(t,e,n){const a=this.w/2|0,i=this.h/2|0;for(let s=0;s<this.h*this.w;s++){const r=s%this.w,o=s/this.w|0,h=Math.max(...y(r-a,o-i));t<=h&&h<=e&&(this.data[s]=n)}}drawCircle(t,e,n){const a=this.w/2|0,i=this.h/2|0,s=v(a,i);for(let a=0;a<this.h*this.w;a++){const i=a%this.w,r=a/this.w|0,o=v(i,r).distanceTo(s);t<=o&&o<=e&&(this.data[a]=n)}}drawRect(t,e,n){for(let a=0;a<this.h*this.w;a++){const i=a%this.w-(this.w/2|0),s=(a/this.w|0)-(this.h/2|0),r=(0,h.V)(...y(i,s));Math.abs(r.x+(r.y>>1))<t/2&&Math.abs(r.y)<e/2&&Math.abs(r.x)<t/2+12&&Math.abs(r.z)<t/2+12&&(this.data[a]=n)}}async asyncStabilizeNoShader(){let t;do{t=0;for(let e=0;e<this.h*this.w;e++){const n=e%this.w,a=e/this.w|0;!this.isSink(n,a)&&this.getOddr(n,a)>=6&&(await x(n,a,(async(t,e)=>!this.isSink(t,e)&&this.addOddr(t,e,1))),this.addOddr(n,a,-6),t++)}await(0,o.Z)(10)}while(0!==t);console.log("stabilized"),await(0,o.Z)(2e3)}createTextures(t,e){return function(t){let e,n=t[0],a=1;for(;a<t.length;){const i=t[a],s=t[a+1];if(a+=2,("optionalAccess"===i||"optionalCall"===i)&&null==n)return;"access"===i||"optionalAccess"===i?(e=n,n=s(n)):"call"!==i&&"optionalCall"!==i||(n=s(((...t)=>n.call(e,...t))),e=void 0)}return n}([this,"access",t=>t.glInfo,"optionalAccess",t=>t.gl])===t&&(this.glInfo=void 0),this.glInfo||(this.glInfo={gl:t,t0:new c.xE(this.w,this.h,{filter:t.NEAREST,internalFormat:t.R8UI,format:t.RED_INTEGER}),t1:new c.xE(this.w,this.h,{filter:t.NEAREST,internalFormat:t.R8UI,format:t.RED_INTEGER}),stepPlane:u(0,0,this.w,this.h),stepShader:e}),this.glInfo.t0}async asyncStabilize(){const t=this.glInfo;for(this.upload();this.countUnstable()>0;){for(let e=0;e<1e3;e++)for(let e=0;e<1;e++)t.t1.drawTo((e=>{t.t0.bind(0),t.stepShader.uniforms({heights:0}).draw(t.stepPlane)})),t.t0.swapWith(t.t1);t.t0.downloadData(this.data)}}*stabilizeInteractive(t=1){const e=this.glInfo;for(this.upload();this.countUnstable()>0;){for(let n=0;n<1e3;n++){for(let n=0;n<t;n++)e.t1.drawTo((t=>{e.t0.bind(0),e.stepShader.uniforms({heights:0}).draw(e.stepPlane)})),e.t0.swapWith(e.t1);yield}e.t0.downloadData(this.data)}}async calcHash(){return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-1",this.data))).map((t=>t.toString(16).padStart(2,"0"))).join("")}countUnstable(){let t=0;for(let e=0;e<this.w*this.h;e++)t+=+(p!==this.data[e]&&this.data[e]>=6);return t}async calcRecurringInverse(){this.plus(10),await this.asyncStabilize(),this.dualize(),this.plus(5),await this.asyncStabilize()}async calcRecurringIdentity(){this.fill(10),await this.asyncStabilize(),this.dualize(),this.plus(5),await this.asyncStabilize()}upload(){this.glInfo.t0.setData(this.data)}getOddrBB(){const t=t=>{for(let e=0;e<this.w;e++)if(this.data[t*this.w+e]!==p)return!1;return!0};let e=0,n=this.h;for(;e<this.h&&t(e);)e++;for(;n>0&&t(n-1);)n--;const a=t=>{for(let a=e;a<n;a++)if(this.data[a*this.w+t]!==p)return!1;return!0};let i=0,s=this.w;for(;i<this.h&&a(i);)i++;for(;s>0&&a(s-1);)s--;return{x0:i,x1:s,y0:e,y1:n}}getBB(){const{x0:t,x1:e,y0:n,y1:a}=this.getOddrBB();return{min:v(t,n),max:v(e,a)}}}const m=({colorFg:t,colorBg:e})=>{const n=(0,s.useRef)(null),a=(0,s.useMemo)((()=>i.bA("white",t).mode("rgb").colors(10,"gl")),[t]);return(0,s.useEffect)((()=>{!async function(t,e,n){const a=c.ZG.create({canvas:t,throwOnError:!1});console.log("gl",a),a.addResizeListener(),console.log(a.canvas.width,a.canvas.height);const i=c.ex.create(l,'#version 300 es\nprecision mediump float;\nprecision mediump usampler2D;\n\n// this shader defines a virtual texture, which renders\n// a hex "(height-)map" saved as ODDR\n\n// texture coordinate to render\nin vec2 coord;\n\nuniform vec4 colorBackground;\nuniform vec4[10] colorFg;\n\nuniform mat4 tt;\n\nconst int MAX_MARCHING_STEPS = 255;\nconst float MIN_DIST = 0.0;\nconst float MAX_DIST = 100.0;\n\nconst uint SINK = 255u;\n\nout vec4 fragColor;\n\n// the "map" being rendered. also implicitely defines the\n// size of the texture.\n// width: x is in [-0.5, heights.width], (0, 0) is the center of the first hex\n// height: sqrt(3) / 2 * heights.height\nuniform usampler2D heights;\n\nvec3 raToHex(vec2 xy) {\n  float hex_t = xy.y / 0.866;\n  float hex_s = xy.x - hex_t / 2.0;\n  return vec3(hex_s, hex_t, -(hex_s + hex_t));\n}\n\nvec2 hexToRa(vec3 hex) {\n  float y = hex.t * 0.866;\n  float x = hex.s + hex.t / 2.0;\n  return vec2(x, y);\n}\nivec2 cube_to_oddr(ivec3 cube) {\n  int col = cube.x + (cube.y - (cube.y & 1)) / 2;\n  int row = cube.y;\n  return ivec2(col, row);\n}\nivec3 oddr_to_cube(ivec2 hex) {\n  int x = hex.x - (hex.y - (hex.y & 1)) / 2;\n  int y = hex.y;\n  int z = -x - y;\n  return ivec3(x, y, z);\n}\n\nvec3 hexRound(vec3 hex) {\n  vec3 r = floor(hex + 0.5);\n  vec3 diff = abs(r - hex);\n\n  if (diff.x > diff.y && diff.x > diff.z) {\n    r.x = -(r.y + r.z);\n  } else if (diff.y > diff.z) {\n    r.y = -(r.x + r.z);\n  } else {\n    r.z = -(r.x + r.y);\n  }\n\n  return r;\n}\nfloat max3(vec3 v) {\n  return max(max(v.x, v.y), v.z);\n}\nfloat min3(vec3 v) {\n  return max(max(v.x, v.y), v.z);\n}\nfloat hex_sdf(vec3 h) {\n  return max3(abs(h.yzx + h.zxy / 2.0));\n  // return abs(h.x+(h.y/2.0) );\n  // return max3(abs(vec3(h)));\n}\n\nbool between(float min, float max, float x) {\n  return min <= x && x <= max;\n}\n\nuint heightAt(ivec2 p) {\n  ivec2 tex_size = textureSize(heights, 0);\n\n  if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {\n    // point is outside source texture, treat as sink\n    return SINK;\n  } else {\n    return texelFetch(heights, p, 0).r;\n  }\n}\n\nvoid main() {\n  // vec2 pos2 = vec4(coord, 0.0, 1.0).xy * 400.0;\n  vec2 pos2 = (tt * vec4(coord, 0.0, 1.0)).xy;\n\n  // fragColor = length(pos2 - vec2(100.0, 100.0)) < 50.0\n  // ? colorFg[0]\n  // : colorBackground;\n  // return;\n  vec3 hex_pos = raToHex(pos2);\n  // vec2 hex_center = floor(hex_pos + 0.5);\n  vec3 hex_center = hexRound(hex_pos);\n  vec2 center = hexToRa(hex_center);\n  vec2 squarePos = floor(pos2 + 0.5);\n  vec3 hex_d = hex_pos - hex_center;\n  // vec2 d =hex_pos - hex_center;\n  // vec3 zz = vec3(d.xy, (d.y - d.x)/1.41);\n  vec2 local_ra_offset = pos2 - center;\n  // if (abs(zz.x +zz.y+ zz.z) < 0.1) {\n  // if (max(d.x, max(d.y, 0.0)) < 0.45) {\n  // if (length(pos2 - squarePos) < 0.5) {\n  float d = hex_sdf(hex_d);\n  if (\n    between(0.0, 0.425, d) // || length(pos2 - center) < 0.2\n  ) {\n    // if (length (pos2 - center) <0.53){\n    // if (length (hex_pos - hex_center) <0.45){\n    ivec2 center2 = cube_to_oddr(ivec3(hex_center));\n    uint value = heightAt(center2);\n    uint valueClamped = clamp(value, 0u, uint(colorFg.length()) - 1u);\n    fragColor = value == 255u ? colorBackground : colorFg[valueClamped];\n  } else {\n    fragColor = colorBackground;\n  }\n}\n'),s=c.ex.create(l,"#version 300 es\nprecision mediump float;\nprecision mediump usampler2D;\nin vec2 coord;\n\nuniform vec2 iResolution;\nuniform vec4 colorBackground;\nuniform vec4[10] colorFg;\n\nout uvec4 fragColor;\n\nconst uint SINK = 255u;\n\nuniform usampler2D heights;\n\nfloat EPSILON = 0.0001;\n\nvec3 raToHex(vec2 xy) {\n  float hex_t = xy.y / 0.866;\n  float hex_s = xy.x - hex_t / 2.0;\n  return vec3(hex_s, hex_t, -(hex_s + hex_t));\n}\n\nvec2 hexToRa(vec3 hex) {\n  float y = hex.t * 0.866;\n  float x = hex.s + hex.t / 2.0;\n  return vec2(x, y);\n}\nivec2 cube_to_oddr(ivec3 cube) {\n  int col = cube.x + (cube.y - (cube.y & 1)) / 2;\n  int row = cube.y;\n  return ivec2(col, row);\n}\nivec3 oddr_to_cube(ivec2 hex) {\n  int x = hex.x - (hex.y - (hex.y & 1)) / 2;\n  int y = hex.y;\n  int z = -x - y;\n  return ivec3(x, y, z);\n}\n\nvec3 hexRound(vec3 hex) {\n  vec3 r = floor(hex + 0.5);\n  vec3 diff = abs(r - hex);\n\n  if (diff.x > diff.y && diff.x > diff.z) {\n    r.x = -(r.y + r.z);\n  } else if (diff.y > diff.z) {\n    r.y = -(r.x + r.z);\n  } else {\n    r.z = -(r.x + r.y);\n  }\n\n  return r;\n}\nfloat max3(vec3 v) {\n  return max(max(v.x, v.y), v.z);\n}\nfloat min3(vec3 v) {\n  return min(min(v.x, v.y), v.z);\n}\nfloat hex_sdf(vec3 h) {\n  return max3(abs(h.yzx + h.zxy / 2.0));\n  // return abs(h.x+(h.y/2.0) );\n  // return max3(abs(vec3(h)));\n}\n\nbool between(float min, float max, float x) {\n  return min <= x && x <= max;\n}\n\nuint heightAt(ivec2 p) {\n  ivec2 tex_size = textureSize(heights, 0);\n\n  if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {\n    // point is outside source texture, treat as sink\n    return SINK;\n  } else {\n    return texelFetch(heights, p, 0).r;\n  }\n}\n\nuint at(ivec2 p) {\n  uint value = heightAt(p);\n  if (SINK == value) {\n    return 0u;\n  } else {\n    return value / 6u;\n  }\n}\n\nuint calc(ivec2 oddr_pos) {\n  uint value = texelFetch(heights, oddr_pos, 0).r;\n\n  if (SINK == value) {\n    return SINK;\n  }\n\n  // the current pos topples as many times as it can\n  value = value % 6u;\n  // all the neighbors topple as often as they can\n  value += at(oddr_pos + ivec2(+1, 0));\n  value += at(oddr_pos + ivec2(-1, 0));\n\n  value += at(oddr_pos + ivec2(0, +1));\n  value += at(oddr_pos + ivec2(0, -1));\n\n  value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, +1));\n  value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, -1));\n\n  return value;\n}\n\nvoid main() {\n  fragColor = uvec4(calc(ivec2(coord)), 0u, 0u, 0u);\n  // fragColor = uvec4(2u, 0u, 0u, 0u);\n}\n"),r=new g(256,256),d=r.createTextures(a,s),x=u(-1,-1,1,1),f=a.canvas.width/a.canvas.height;a.addResizeListener(),console.log("aspect",f),r.fill(p),r.drawHex(0,80,0);const v=r.getBB(),w=v.min.to(v.max),y=w.x/w.y;console.log("ratios",f,y,""+w,v);const m=h.M4.translate(v.min.plus(v.max).times(-.5)).scale(f<y?1/w.x:1/w.y).scale(.98).scale(2).scale(1,-1,1).scale(1/f,1,1),_=t=>new URL(""+document.location).searchParams.get(t);await r.calcRecurringIdentity(),r.fillf(((t,e,n,a)=>p===a?p:3+a%3));const b=_("t");await r.drawText(128,128,b?atob(b):"Hi!",25,5);const z=r.clone();z.createTextures(a,s),z.fillf((()=>5+6*Math.random()|0)),await z.asyncStabilize(),r.plusHS(z),await r.asyncStabilize(),await z.calcRecurringInverse(),r.plusHS(z),r.upload(),a.animate((()=>{d.bind(0),i.uniforms({iResolution:[800,600],tt:m.inversed(),colorBackground:n,"colorFg[0]":e,heights:0}).draw(x)})),await(0,o.Z)(2e3),await(async t=>{for(const e of r.stabilizeInteractive(t))await(0,o.Z)(16)})(+(_("speed")||"2")),r.upload(),console.log("aspect",f)}(n.current,a,i.iv(e).gl())}),[a,e]),s.createElement("canvas",{ref:n,style:{flexGrow:1}})},_=()=>{const t=(0,a.Z)();return Math.sqrt(3),s.createElement("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},s.createElement(m,{colorFg:t.palette.primary.main,colorBg:t.palette.background.default}),s.createElement("div",{style:{padding:4,display:"flex",backgroundColor:t.palette.background.default}},!1,s.createElement("div",{style:{textAlign:"right",padding:10,flexGrow:1}},s.createElement("a",{href:"http://people.reed.edu/~davidp/grant/"},"Original (square)")," ",s.createElement("a",{href:"https://www.youtube.com/watch?v=1MtEUErz7Gg"},"Explanatory video"))))}},6102:()=>{}}]);
//# sourceMappingURL=hexSandpiles-index.js.map