(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[729],{9793:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>b,oddr_to_cube:()=>g,oddr_to_px:()=>v});var i=n(8051),a=n(7392),s=n(2276),r=n(9526),o=n(5583),h=n(2182),c=n(2004);const l="#version 300 es\nin vec4 ts_Vertex;\nin vec2 ts_TexCoord;\nout vec2 coord;\nvoid main() {\n  coord = ts_TexCoord.xy;\n  gl_Position = ts_Vertex;\n}\n",d=n.p+"9f2a6e398434ad4fb383.ttf",x=(t,e,n,i)=>{const a=c.Kj.plane({startX:-1,width:2,startY:-1,height:2});return a.coords[0]=[t,e],a.coords[1]=[n,e],a.coords[2]=[t,i],a.coords[3]=[n,i],a.compile(),a},u=async(t,e,n)=>{await n(t+1,e),await n(t-1,e),await n(t,e+1),await n(t,e-1),await n(t+1-2*(1&e),e+1),await n(t+1-2*(1&e),e-1)},f=Math.sqrt(3)/2,v=(t,e)=>{const n=t+.5*(1&e),i=e*f;return(0,h.V)(n,i,0)},p=255,y=(t,e,n,i)=>(([t,e,n],[i,a,s])=>(Math.abs(i-t)+Math.abs(a-e)+Math.abs(s-n))/2)(g(t,e),g(n,i)),g=(t,e)=>{const n=t-(e>>1);return[n,e,-n-e]};class w{constructor(t,e){this.w=t,this.h=e,this.data=new Uint8Array(t*e)}clone(){const t=new w(this.w,this.h);return t.plusHS(this),t}dualize(){for(let t=0;t<this.h*this.w;t++)p!==this.data[t]&&(this.data[t]=5-this.data[t]);console.log("dualized")}plus(t){for(let e=0;e<this.h*this.w;e++)p!==this.data[e]&&(this.data[e]+=t);console.log("plus "+t)}times(t){for(let e=0;e<this.h*this.w;e++)p!==this.data[e]&&(this.data[e]*=t);console.log("times "+t)}setHS(t){for(let e=0;e<this.h*this.w;e++)this.data[e]=t.data[e]}plusHS(t){for(let e=0;e<this.h*this.w;e++)p!==this.data[e]&&(this.data[e]+=t.data[e])}fill(t){for(let e=0;e<this.h*this.w;e++)p!==this.data[e]&&(this.data[e]=t)}fillf(t){for(let e=0;e<this.h*this.w;e++){const n=e%this.w,i=e/this.w|0;p!==this.data[e]&&(this.data[e]=t(n,i,e,this.data[e]))}}getOddr(t,e){return this.data[e*this.w+t]}setOddr(t,e,n){return this.data[e*this.w+t]=n}addOddr(t,e,n){return this.data[e*this.w+t]+=n}isSink(t,e){return this.getOddr(t,e)===p}drawHex(t,e,n){const i=this.w/2|0,a=this.h/2|0;for(let s=0;s<this.h*this.w;s++){const r=s%this.w,o=s/this.w|0;t<=y(i,a,r,o)&&y(i,a,r,o)<=e&&(this.data[s]=n)}}async drawText(t,e,n,i,a){var r;const o=(await(r=d,new Promise(((t,e)=>{(0,s.zD)(r,((n,i)=>n?e(n):t(i)))})))).getPath(n,0,0,i),c=o.getBoundingBox(),l=((0,h.V)(t,e),(0,h.V)(c.x1,c.y1).to((0,h.V)(c.x2,c.y2)));console.log("path",o);const x=document.createElement("canvas");x.width=2*(c.x2-c.x1),x.height=2*(c.y2-c.y1);const u=x.getContext("2d");u.scale(2,2),u.translate(-c.x1,-c.y1),u.fillStyle="black",u.imageSmoothingEnabled=!1,o.draw(u);const f=v(t,e).minus(l.div(2)),p=u.getImageData(0,0,x.width,x.height).data;for(let t=0;t<this.h*this.w;t++){const e=t%this.w,n=t/this.w|0,i=v(e,n).minus(f);0<i.x&&i.x<c.x2-c.x1&&0<i.y&&i.y<c.y2-c.y1&&p[4*((2*i.y|0)*x.width+(2*i.x|0))+3]>127&&(this.data[t]=a)}}drawTriangle(t,e,n){const i=this.w/2|0,a=this.h/2|0;for(let s=0;s<this.h*this.w;s++){const r=s%this.w,o=s/this.w|0,h=Math.max(...g(r-i,o-a));t<=h&&h<=e&&(this.data[s]=n)}}drawCircle(t,e,n){const i=this.w/2|0,a=this.h/2|0,s=v(i,a);for(let i=0;i<this.h*this.w;i++){const a=i%this.w,r=i/this.w|0,o=v(a,r).distanceTo(s);t<=o&&o<=e&&(this.data[i]=n)}}drawRect(t,e,n){for(let i=0;i<this.h*this.w;i++){const a=i%this.w-(this.w/2|0),s=(i/this.w|0)-(this.h/2|0),r=(0,h.V)(...g(a,s));Math.abs(r.x+(r.y>>1))<t/2&&Math.abs(r.y)<e/2&&Math.abs(r.x)<t/2+12&&Math.abs(r.z)<t/2+12&&(this.data[i]=n)}}async asyncStabilizeNoShader(){let t;do{t=0;for(let e=0;e<this.h*this.w;e++){const n=e%this.w,i=e/this.w|0;!this.isSink(n,i)&&this.getOddr(n,i)>=6&&(await u(n,i,(async(t,e)=>!this.isSink(t,e)&&this.addOddr(t,e,1))),this.addOddr(n,i,-6),t++)}await(0,o.Z)(10)}while(0!==t);console.log("stabilized"),await(0,o.Z)(2e3)}createTextures(t,e){return function(t){let e,n=t[0],i=1;for(;i<t.length;){const a=t[i],s=t[i+1];if(i+=2,("optionalAccess"===a||"optionalCall"===a)&&null==n)return;"access"===a||"optionalAccess"===a?(e=n,n=s(n)):"call"!==a&&"optionalCall"!==a||(n=s(((...t)=>n.call(e,...t))),e=void 0)}return n}([this,"access",t=>t.glInfo,"optionalAccess",t=>t.gl])===t&&(this.glInfo=void 0),this.glInfo||(this.glInfo={gl:t,t0:new c.xE(this.w,this.h,{filter:t.NEAREST,internalFormat:t.R8UI,format:t.RED_INTEGER}),t1:new c.xE(this.w,this.h,{filter:t.NEAREST,internalFormat:t.R8UI,format:t.RED_INTEGER}),stepPlane:x(0,0,this.w,this.h),stepShader:e}),this.glInfo.t0}async asyncStabilize(){const t=this.glInfo;for(this.upload();this.countUnstable()>0;){for(let e=0;e<1e3;e++)for(let e=0;e<1;e++)t.t1.drawTo((e=>{t.t0.bind(0),t.stepShader.uniforms({heights:0}).draw(t.stepPlane)})),t.t0.swapWith(t.t1);t.t0.downloadData(this.data)}}*stabilizeInteractive(t=1){const e=this.glInfo;for(this.upload();this.countUnstable()>0;){for(let n=0;n<1e3;n++){for(let n=0;n<t;n++)e.t1.drawTo((t=>{e.t0.bind(0),e.stepShader.uniforms({heights:0}).draw(e.stepPlane)})),e.t0.swapWith(e.t1);yield}e.t0.downloadData(this.data)}}async calcHash(){return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-1",this.data))).map((t=>t.toString(16).padStart(2,"0"))).join("")}countUnstable(){let t=0;for(let e=0;e<this.w*this.h;e++)t+=+(p!==this.data[e]&&this.data[e]>=6);return t}async calcRecurringInverse(){this.plus(10),await this.asyncStabilize(),this.dualize(),this.plus(5),await this.asyncStabilize()}async calcRecurringIdentity(){this.fill(10),await this.asyncStabilize(),this.dualize(),this.plus(5),await this.asyncStabilize()}upload(){this.glInfo.t0.setData(this.data)}getOddrBB(){const t=t=>{for(let e=0;e<this.w;e++)if(this.data[t*this.w+e]!==p)return!1;return!0};let e=0,n=this.h;for(;e<this.h&&t(e);)e++;for(;n>0&&t(n-1);)n--;const i=t=>{for(let i=e;i<n;i++)if(this.data[i*this.w+t]!==p)return!1;return!0};let a=0,s=this.w;for(;a<this.h&&i(a);)a++;for(;s>0&&i(s-1);)s--;return{x0:a,x1:s,y0:e,y1:n}}getBB(){const{x0:t,x1:e,y0:n,y1:i}=this.getOddrBB();return{min:v(t,n),max:v(e,i)}}}const m=a.bA("white","green").mode("rgb").colors(10,"gl");const b=()=>{const t=(0,r.useRef)(null),e=(0,i.Z)();(0,r.useEffect)((()=>{!async function(t,e){const n=c.ZG.create({canvas:t,throwOnError:!1});console.log("gl",n),n.addResizeListener(),console.log(n.canvas.width,n.canvas.height);const i=c.ex.create(l,'#version 300 es\nprecision mediump float;\nprecision mediump usampler2D;\n\n// this shader defines a virtual texture, which renders\n// a hex "(height-)map" saved as ODDR\n\n// texture coordinate to render\nin vec2 coord;\n\nuniform vec4 colorBackground;\nuniform vec4[10] colorFg;\n\nuniform mat4 tt;\n\nconst int MAX_MARCHING_STEPS = 255;\nconst float MIN_DIST = 0.0;\nconst float MAX_DIST = 100.0;\n\nconst uint SINK = 255u;\n\nout vec4 fragColor;\n\n// the "map" being rendered. also implicitely defines the\n// size of the texture.\n// width: x is in [-0.5, heights.width], (0, 0) is the center of the first hex\n// height: sqrt(3) / 2 * heights.height\nuniform usampler2D heights;\n\nvec3 raToHex(vec2 xy) {\n  float hex_t = xy.y / 0.866;\n  float hex_s = xy.x - hex_t / 2.0;\n  return vec3(hex_s, hex_t, -(hex_s + hex_t));\n}\n\nvec2 hexToRa(vec3 hex) {\n  float y = hex.t * 0.866;\n  float x = hex.s + hex.t / 2.0;\n  return vec2(x, y);\n}\nivec2 cube_to_oddr(ivec3 cube) {\n  int col = cube.x + (cube.y - (cube.y & 1)) / 2;\n  int row = cube.y;\n  return ivec2(col, row);\n}\nivec3 oddr_to_cube(ivec2 hex) {\n  int x = hex.x - (hex.y - (hex.y & 1)) / 2;\n  int y = hex.y;\n  int z = -x - y;\n  return ivec3(x, y, z);\n}\n\nvec3 hexRound(vec3 hex) {\n  vec3 r = floor(hex + 0.5);\n  vec3 diff = abs(r - hex);\n\n  if (diff.x > diff.y && diff.x > diff.z) {\n    r.x = -(r.y + r.z);\n  } else if (diff.y > diff.z) {\n    r.y = -(r.x + r.z);\n  } else {\n    r.z = -(r.x + r.y);\n  }\n\n  return r;\n}\nfloat max3(vec3 v) {\n  return max(max(v.x, v.y), v.z);\n}\nfloat min3(vec3 v) {\n  return max(max(v.x, v.y), v.z);\n}\nfloat hex_sdf(vec3 h) {\n  return max3(abs(h.yzx + h.zxy / 2.0));\n  // return abs(h.x+(h.y/2.0) );\n  // return max3(abs(vec3(h)));\n}\n\nbool between(float min, float max, float x) {\n  return min <= x && x <= max;\n}\n\nuint heightAt(ivec2 p) {\n  ivec2 tex_size = textureSize(heights, 0);\n\n  if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {\n    // point is outside source texture, treat as sink\n    return SINK;\n  } else {\n    return texelFetch(heights, p, 0).r;\n  }\n}\n\nvoid main() {\n  // vec2 pos2 = vec4(coord, 0.0, 1.0).xy * 400.0;\n  vec2 pos2 = (tt * vec4(coord, 0.0, 1.0)).xy;\n\n  // fragColor = length(pos2 - vec2(100.0, 100.0)) < 50.0\n  // ? colorFg[0]\n  // : colorBackground;\n  // return;\n  vec3 hex_pos = raToHex(pos2);\n  // vec2 hex_center = floor(hex_pos + 0.5);\n  vec3 hex_center = hexRound(hex_pos);\n  vec2 center = hexToRa(hex_center);\n  vec2 squarePos = floor(pos2 + 0.5);\n  vec3 hex_d = hex_pos - hex_center;\n  // vec2 d =hex_pos - hex_center;\n  // vec3 zz = vec3(d.xy, (d.y - d.x)/1.41);\n  vec2 local_ra_offset = pos2 - center;\n  // if (abs(zz.x +zz.y+ zz.z) < 0.1) {\n  // if (max(d.x, max(d.y, 0.0)) < 0.45) {\n  // if (length(pos2 - squarePos) < 0.5) {\n  float d = hex_sdf(hex_d);\n  if (\n    between(0.0, 0.425, d) // || length(pos2 - center) < 0.2\n  ) {\n    // if (length (pos2 - center) <0.53){\n    // if (length (hex_pos - hex_center) <0.45){\n    ivec2 center2 = cube_to_oddr(ivec3(hex_center));\n    uint value = heightAt(center2);\n    uint valueClamped = clamp(value, 0u, uint(colorFg.length()) - 1u);\n    fragColor = value == 255u ? colorBackground : colorFg[valueClamped];\n  } else {\n    fragColor = colorBackground;\n  }\n}\n'),a=c.ex.create(l,"#version 300 es\nprecision mediump float;\nprecision mediump usampler2D;\nin vec2 coord;\n\nuniform vec2 iResolution;\nuniform vec4 colorBackground;\nuniform vec4[10] colorFg;\n\nout uvec4 fragColor;\n\nconst uint SINK = 255u;\n\nuniform usampler2D heights;\n\nfloat EPSILON = 0.0001;\n\nvec3 raToHex(vec2 xy) {\n  float hex_t = xy.y / 0.866;\n  float hex_s = xy.x - hex_t / 2.0;\n  return vec3(hex_s, hex_t, -(hex_s + hex_t));\n}\n\nvec2 hexToRa(vec3 hex) {\n  float y = hex.t * 0.866;\n  float x = hex.s + hex.t / 2.0;\n  return vec2(x, y);\n}\nivec2 cube_to_oddr(ivec3 cube) {\n  int col = cube.x + (cube.y - (cube.y & 1)) / 2;\n  int row = cube.y;\n  return ivec2(col, row);\n}\nivec3 oddr_to_cube(ivec2 hex) {\n  int x = hex.x - (hex.y - (hex.y & 1)) / 2;\n  int y = hex.y;\n  int z = -x - y;\n  return ivec3(x, y, z);\n}\n\nvec3 hexRound(vec3 hex) {\n  vec3 r = floor(hex + 0.5);\n  vec3 diff = abs(r - hex);\n\n  if (diff.x > diff.y && diff.x > diff.z) {\n    r.x = -(r.y + r.z);\n  } else if (diff.y > diff.z) {\n    r.y = -(r.x + r.z);\n  } else {\n    r.z = -(r.x + r.y);\n  }\n\n  return r;\n}\nfloat max3(vec3 v) {\n  return max(max(v.x, v.y), v.z);\n}\nfloat min3(vec3 v) {\n  return min(min(v.x, v.y), v.z);\n}\nfloat hex_sdf(vec3 h) {\n  return max3(abs(h.yzx + h.zxy / 2.0));\n  // return abs(h.x+(h.y/2.0) );\n  // return max3(abs(vec3(h)));\n}\n\nbool between(float min, float max, float x) {\n  return min <= x && x <= max;\n}\n\nuint heightAt(ivec2 p) {\n  ivec2 tex_size = textureSize(heights, 0);\n\n  if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {\n    // point is outside source texture, treat as sink\n    return SINK;\n  } else {\n    return texelFetch(heights, p, 0).r;\n  }\n}\n\nuint at(ivec2 p) {\n  uint value = heightAt(p);\n  if (SINK == value) {\n    return 0u;\n  } else {\n    return value / 6u;\n  }\n}\n\nuint calc(ivec2 oddr_pos) {\n  uint value = texelFetch(heights, oddr_pos, 0).r;\n\n  if (SINK == value) {\n    return SINK;\n  }\n\n  // the current pos topples as many times as it can\n  value = value % 6u;\n  // all the neighbors topple as often as they can\n  value += at(oddr_pos + ivec2(+1, 0));\n  value += at(oddr_pos + ivec2(-1, 0));\n\n  value += at(oddr_pos + ivec2(0, +1));\n  value += at(oddr_pos + ivec2(0, -1));\n\n  value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, +1));\n  value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, -1));\n\n  return value;\n}\n\nvoid main() {\n  fragColor = uvec4(calc(ivec2(coord)), 0u, 0u, 0u);\n  // fragColor = uvec4(2u, 0u, 0u, 0u);\n}\n"),s=new w(256,256),r=s.createTextures(n,a),d=x(-1,-1,1,1),u=n.canvas.width/n.canvas.height;n.addResizeListener(),console.log("aspect",u),s.fill(p),s.drawHex(0,80,0);const f=s.getBB(),v=f.min.to(f.max),y=v.x/v.y;console.log("ratios",u,y,""+v,f);const g=h.M4.translate(f.min.plus(f.max).times(-.5)).scale(u<y?1/v.x:1/v.y).scale(.98).scale(2).scale(1,-1,1).scale(1/u,1,1),b=t=>new URL(""+document.location).searchParams.get(t);await s.calcRecurringIdentity(),s.fillf(((t,e,n,i)=>p===i?p:3+i%3));const _=b("t");await s.drawText(128,128,_?atob(_):"Hi!",25,5);const z=s.clone();z.createTextures(n,a),z.fillf((()=>5+6*Math.random()|0)),await z.asyncStabilize(),s.plusHS(z),await s.asyncStabilize(),await z.calcRecurringInverse(),s.plusHS(z),s.upload(),n.animate((()=>{r.bind(0),i.uniforms({iResolution:[800,600],tt:g.inversed(),colorBackground:e,"colorFg[0]":m,heights:0}).draw(d)})),await(0,o.Z)(2e3),await(async t=>{for(const e of s.stabilizeInteractive(t))await(0,o.Z)(16)})(+(b("speed")||"2")),s.upload(),console.log("aspect",u)}(t.current,a.iv(e.palette.background.default).gl())}),[e.palette.background.default]);const n=32,s={boxSizing:"border-box",position:"relative",content:"",width:n,display:"block",height:n/f/4,borderWidth:`0 16px ${n/f/4}px 16px`,borderStyle:"solid"};return r.createElement("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},r.createElement("canvas",{ref:t,style:{flexGrow:1}}),r.createElement("div",{style:{padding:4,display:"flex",backgroundColor:e.palette.background.default}},m.map(((t,e)=>r.createElement("div",{className:"hex",style:{display:"flex",flexDirection:"column",margin:4},key:e},r.createElement("div",{style:{...s,borderColor:a.gl(t).css()+" transparent",borderWidth:`0 16px ${n/f/4}px 16px`}}),r.createElement("div",{style:{textAlign:"center",backgroundColor:a.gl(t).css(),height:n/f/2,color:a.gl(t).textColor().css(),display:"flex",alignItems:"center",justifyContent:"center"}},9===e?"9+":e),r.createElement("div",{style:{...s,borderColor:a.gl(t).css()+" transparent",borderWidth:n/f/4+"px 16px 0 16px"}})))),r.createElement("div",{style:{textAlign:"right",padding:10,flexGrow:1}},r.createElement("a",{href:"http://people.reed.edu/~davidp/grant/"},"Original (square)")," ",r.createElement("a",{href:"https://www.youtube.com/watch?v=1MtEUErz7Gg"},"Explanatory video"))))}},6102:()=>{}}]);
//# sourceMappingURL=hexSandpiles-index.js.map