(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[729],{6525:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>E});var i=n(5282),s=n(2757),a=n(7392),r=n(2276),o=n(9526),l=n(5583),h=n(2182),c=n(9392),d=n(8657),u=n(7898),x=n(5160),f=n(1955);const v="C:\\Users\\aval\\tsdev\\workshop\\src\\hexSandpiles\\index.tsx",p=(e,t,n,i)=>{const s=c.Kj.plane({startX:-1,width:2,startY:-1,height:2});return s.coords[0]=[e,t],s.coords[1]=[n,t],s.coords[2]=[e,i],s.coords[3]=[n,i],s.compile(),s},y=async(e,t,n)=>{await n(e+1,t),await n(e-1,t),await n(e,t+1),await n(e,t-1),await n(e+1-2*(1&t),t+1),await n(e+1-2*(1&t),t-1)},m=Math.sqrt(3)/2,g=(e,t)=>{const n=e+.5*(1&t),i=t*m;return(0,h.V)(n,i,0)},w=255;(0,s.hu)(g(0,0).equals((0,h.V)(0,0))),(0,s.hu)(g(1,0).equals((0,h.V)(1,0))),(0,s.hu)(g(0,1).equals((0,h.V)(.5,m)));const _=(e,t,n,i)=>(([e,t,n],[i,s,a])=>(Math.abs(i-e)+Math.abs(s-t)+Math.abs(a-n))/2)(b(e,t),b(n,i)),b=(e,t)=>{const n=e-(t>>1);return[n,t,-n-t]};s.hu.deepEqual(b(0,0),[0,0,-0]),s.hu.deepEqual(b(1,0),[1,0,-1]),s.hu.deepEqual(b(0,1),[0,1,-1]),s.hu.deepEqual(b(0,2),[-1,2,-1]),s.hu.deepEqual(b(-1,0),[-1,0,1]),s.hu.deepEqual(b(0,-1),[1,-1,0]),s.hu.deepEqual(b(-1,-1),[0,-1,1]),s.hu.deepEqual(b(0,-2),[1,-2,1]);class z{constructor(e,t){this.w=e,this.h=t,this.data=new Uint8Array(e*t)}clone(){const e=new z(this.w,this.h);return e.plusHS(this),e}dualize(){for(let e=0;e<this.h*this.w;e++)w!==this.data[e]&&(this.data[e]=5-this.data[e]);console.log("dualized")}plus(e){for(let t=0;t<this.h*this.w;t++)w!==this.data[t]&&(this.data[t]+=e);console.log("plus "+e)}times(e){for(let t=0;t<this.h*this.w;t++)w!==this.data[t]&&(this.data[t]*=e);console.log("times "+e)}setHS(e){for(let t=0;t<this.h*this.w;t++)this.data[t]=e.data[t]}plusHS(e){for(let t=0;t<this.h*this.w;t++)w!==this.data[t]&&(this.data[t]+=e.data[t])}fill(e){for(let t=0;t<this.h*this.w;t++)w!==this.data[t]&&(this.data[t]=e)}fillf(e){for(let t=0;t<this.h*this.w;t++){const n=t%this.w,i=t/this.w|0;w!==this.data[t]&&(this.data[t]=e(n,i,t,this.data[t]))}}getOddr(e,t){return this.data[t*this.w+e]}setOddr(e,t,n){return this.data[t*this.w+e]=n}addOddr(e,t,n){return this.data[t*this.w+e]+=n}isSink(e,t){return this.getOddr(e,t)===w}drawHex(e,t,n){const i=this.w/2|0,s=this.h/2|0;for(let a=0;a<this.h*this.w;a++){const r=a%this.w,o=a/this.w|0;e<=_(i,s,r,o)&&_(i,s,r,o)<=t&&(this.data[a]=n)}}async drawText(e,t,n,i,s){var a;const o=(await(a=x,new Promise(((e,t)=>{(0,r.zD)(a,((n,i)=>n?t(n):e(i)))})))).getPath(n,0,0,i),l=o.getBoundingBox(),c=((0,h.V)(e,t),(0,h.V)(l.x1,l.y1).to((0,h.V)(l.x2,l.y2)));console.log("path",o);const d=document.createElement("canvas");d.width=2*(l.x2-l.x1),d.height=2*(l.y2-l.y1);const u=d.getContext("2d");u.scale(2,2),u.translate(-l.x1,-l.y1),u.fillStyle="black",u.imageSmoothingEnabled=!1,o.draw(u);const f=g(e,t).minus(c.div(2)),v=u.getImageData(0,0,d.width,d.height).data;for(let e=0;e<this.h*this.w;e++){const t=e%this.w,n=e/this.w|0,i=g(t,n).minus(f);0<i.x&&i.x<l.x2-l.x1&&0<i.y&&i.y<l.y2-l.y1&&v[4*((2*i.y|0)*d.width+(2*i.x|0))+3]>127&&(this.data[e]=s)}}drawTriangle(e,t,n){const i=this.w/2|0,s=this.h/2|0;for(let a=0;a<this.h*this.w;a++){const r=a%this.w,o=a/this.w|0,l=Math.max(...b(r-i,o-s));e<=l&&l<=t&&(this.data[a]=n)}}drawCircle(e,t,n){const i=this.w/2|0,s=this.h/2|0,a=g(i,s);for(let i=0;i<this.h*this.w;i++){const s=i%this.w,r=i/this.w|0,o=g(s,r).distanceTo(a);e<=o&&o<=t&&(this.data[i]=n)}}drawRect(e,t,n){for(let i=0;i<this.h*this.w;i++){const s=i%this.w-(this.w/2|0),a=(i/this.w|0)-(this.h/2|0),r=(0,h.V)(...b(s,a));Math.abs(r.x+(r.y>>1))<e/2&&Math.abs(r.y)<t/2&&Math.abs(r.x)<e/2+12&&Math.abs(r.z)<e/2+12&&(this.data[i]=n)}}async asyncStabilizeNoShader(){let e;do{e=0;for(let t=0;t<this.h*this.w;t++){const n=t%this.w,i=t/this.w|0;!this.isSink(n,i)&&this.getOddr(n,i)>=6&&(await y(n,i,(async(e,t)=>!this.isSink(e,t)&&this.addOddr(e,t,1))),this.addOddr(n,i,-6),e++)}await(0,l.Z)(10)}while(0!==e);console.log("stabilized"),await(0,l.Z)(2e3)}createTextures(e,t){return function(e){let t,n=e[0],i=1;for(;i<e.length;){const s=e[i],a=e[i+1];if(i+=2,("optionalAccess"===s||"optionalCall"===s)&&null==n)return;"access"===s||"optionalAccess"===s?(t=n,n=a(n)):"call"!==s&&"optionalCall"!==s||(n=a(((...e)=>n.call(t,...e))),t=void 0)}return n}([this,"access",e=>e.glInfo,"optionalAccess",e=>e.gl])===e&&(this.glInfo=void 0),this.glInfo||(this.glInfo={gl:e,t0:new c.xE(this.w,this.h,{filter:e.NEAREST,internalFormat:e.R8UI,format:e.RED_INTEGER}),t1:new c.xE(this.w,this.h,{filter:e.NEAREST,internalFormat:e.R8UI,format:e.RED_INTEGER}),stepPlane:p(0,0,this.w,this.h),stepShader:t}),this.glInfo.t0}async asyncStabilize(){const e=this.glInfo;for(this.upload();this.countUnstable()>0;){for(let t=0;t<1e3;t++)for(let t=0;t<1;t++)e.t1.drawTo((t=>{e.t0.bind(0),e.stepShader.uniforms({heights:0}).draw(e.stepPlane)})),e.t0.swapWith(e.t1);e.t0.downloadData(this.data)}}*stabilizeInteractive(e=1){const t=this.glInfo;for(this.upload();this.countUnstable()>0;){for(let n=0;n<1e3;n++){for(let n=0;n<e;n++)t.t1.drawTo((e=>{t.t0.bind(0),t.stepShader.uniforms({heights:0}).draw(t.stepPlane)})),t.t0.swapWith(t.t1);yield}t.t0.downloadData(this.data)}}async calcHash(){return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-1",this.data))).map((e=>e.toString(16).padStart(2,"0"))).join("")}countUnstable(){let e=0;for(let t=0;t<this.w*this.h;t++)e+=+(w!==this.data[t]&&this.data[t]>=6);return e}async calcRecurringInverse(){this.plus(10),await this.asyncStabilize(),this.dualize(),this.plus(5),await this.asyncStabilize()}async calcRecurringIdentity(){this.fill(10),await this.asyncStabilize(),this.dualize(),this.plus(5),await this.asyncStabilize()}upload(){this.glInfo.t0.setData(this.data)}getOddrBB(){const e=e=>{for(let t=0;t<this.w;t++)if(this.data[e*this.w+t]!==w)return!1;return!0};let t=0,n=this.h;for(;t<this.h&&e(t);)t++;for(;n>0&&e(n-1);)n--;const i=e=>{for(let i=t;i<n;i++)if(this.data[i*this.w+e]!==w)return!1;return!0};let s=0,a=this.w;for(;s<this.h&&i(s);)s++;for(;a>0&&i(a-1);)a--;return{x0:s,x1:a,y0:t,y1:n}}getBB(){const{x0:e,x1:t,y0:n,y1:i}=this.getOddrBB();return{min:g(e,n),max:g(t,i)}}}const S=a.bA("white","green").mode("rgb").colors(10,"gl");const E=()=>{const e=(0,o.useRef)(null),t=(0,i.Z)();(0,o.useEffect)((()=>{!async function(e,t){const n=c.ZG.create({canvas:e,throwOnError:!1});console.log("gl",n),n.addResizeListener(),console.log(n.canvas.width,n.canvas.height);const i=c.ex.create(d,u),s=c.ex.create(d,f),a=new z(256,256),r=a.createTextures(n,s),o=p(-1,-1,1,1),x=n.canvas.width/n.canvas.height;n.addResizeListener(),console.log("aspect",x),a.fill(w),a.drawHex(0,80,0);const v=a.getBB(),y=v.min.to(v.max),m=y.x/y.y;console.log("ratios",x,m,""+y,v);const g=h.M4.translate(v.min.plus(v.max).times(-.5)).scale(x<m?1/y.x:1/y.y).scale(.98).scale(2).scale(1,-1,1).scale(1/x,1,1),_=e=>new URL(""+document.location).searchParams.get(e);await a.calcRecurringIdentity(),a.fillf(((e,t,n,i)=>w===i?w:3+i%3));const b=_("t");await a.drawText(128,128,b?atob(b):"Hi!",25,5);const E=a.clone();E.createTextures(n,s),E.fillf((()=>5+6*Math.random()|0)),await E.asyncStabilize(),a.plusHS(E),await a.asyncStabilize(),await E.calcRecurringInverse(),a.plusHS(E),a.upload(),n.animate((()=>{r.bind(0),i.uniforms({iResolution:[800,600],tt:g.inversed(),colorBg:t,"colorFg[0]":S,heights:0}).draw(o)})),await(0,l.Z)(2e3),await(async e=>{for(const t of a.stabilizeInteractive(e))await(0,l.Z)(16)})(+(_("speed")||"2")),a.upload(),console.log("aspect",x)}(e.current,a.iv(t.palette.background.default).gl())}),[t.palette.background.default]);const n=32,s={boxSizing:"border-box",position:"relative",content:"",width:n,display:"block",height:n/m/4,borderWidth:`0 16px ${n/m/4}px 16px`,borderStyle:"solid"};return o.createElement("div",{style:{display:"flex",flexDirection:"column",height:"100%"},__self:void 0,__source:{fileName:v,lineNumber:648}},o.createElement("canvas",{ref:e,style:{flexGrow:1},__self:void 0,__source:{fileName:v,lineNumber:649}}),o.createElement("div",{style:{padding:4,display:"flex",backgroundColor:t.palette.background.default},__self:void 0,__source:{fileName:v,lineNumber:650}},S.map(((e,t)=>o.createElement("div",{className:"hex",style:{display:"flex",flexDirection:"column",margin:4},key:t,__self:void 0,__source:{fileName:v,lineNumber:658}},o.createElement("div",{style:{...s,borderColor:a.gl(e).css()+" transparent",borderWidth:`0 16px ${n/m/4}px 16px`},__self:void 0,__source:{fileName:v,lineNumber:667}}),o.createElement("div",{style:{textAlign:"center",backgroundColor:a.gl(e).css(),height:n/m/2,color:a.gl(e).textColor().css(),display:"flex",alignItems:"center",justifyContent:"center"},__self:void 0,__source:{fileName:v,lineNumber:676}},9===t?"9+":t),o.createElement("div",{style:{...s,borderColor:a.gl(e).css()+" transparent",borderWidth:n/m/4+"px 16px 0 16px"},__self:void 0,__source:{fileName:v,lineNumber:689}})))),o.createElement("div",{style:{textAlign:"right",padding:10,flexGrow:1},__self:void 0,__source:{fileName:v,lineNumber:704}},o.createElement("a",{href:"http://people.reed.edu/~davidp/grant/",__self:void 0,__source:{fileName:v,lineNumber:705}},"Original (square)")," ",o.createElement("a",{href:"https://www.youtube.com/watch?v=1MtEUErz7Gg",__self:void 0,__source:{fileName:v,lineNumber:706}},"Explanatory video"))))}},5160:(e,t,n)=>{"use strict";e.exports=n.p+"9f2a6e398434ad4fb383.ttf"},7898:e=>{"use strict";e.exports='#version 300 es\nprecision mediump float;\nprecision mediump usampler2D;\n#define GLSLIFY 1\n\n// this shader defines a virtual texture, which renders\n// a hex "(height-)map" saved as ODDR\n\n// texture coordinate to render\nin vec2 coord;\n\nuniform vec4 colorBg;\nuniform vec4[10] colorFg;\n\nuniform mat4 tt;\n\nconst int MAX_MARCHING_STEPS = 255;\nconst float MIN_DIST = 0.0;\nconst float MAX_DIST = 100.0;\n\nconst uint SINK = 255u;\n\nout vec4 fragColor;\n\n// the "map" being rendered. also implicitely defines the\n// size of the texture.\n// width: x is in [-0.5, heights.width], (0, 0) is the center of the first hex\n// height: sqrt(3) / 2 * heights.height\nuniform usampler2D heights;\n\nvec3 raToHex(vec2 xy) {\n    float hex_t = xy.y / 0.866;\n    float hex_s = xy.x - hex_t / 2.0;\n    return vec3(hex_s, hex_t, -(hex_s + hex_t));\n}\n\nvec2 hexToRa(vec3 hex) {\n    float y = hex.t * 0.866;\n    float x = hex.s + hex.t / 2.0;\n    return vec2(x, y);\n}\nivec2 cube_to_oddr(ivec3 cube) {\n    int col = cube.x + (cube.y - (cube.y&1)) / 2;\n    int row = cube.y;\n    return ivec2(col, row);\n}\nivec3 oddr_to_cube(ivec2 hex) {\n    int x = hex.x - (hex.y - (hex.y&1)) / 2;\n    int y = hex.y;\n    int z = -x-y;\n    return ivec3(x, y, z);\n}\n\nvec3 hexRound(vec3 hex) {\n    vec3 r = floor(hex + 0.5);\n    vec3 diff = abs(r - hex);\n\n    if (diff.x > diff.y && diff.x > diff.z) {\n        r.x = -(r.y + r.z);\n    } else if (diff.y > diff.z) {\n        r.y = -(r.x + r.z);\n    } else {\n        r.z = -(r.x + r.y);\n    }\n\n    return r;\n}\nfloat max3 (vec3 v) {\n    return max (max (v.x, v.y), v.z);\n}\nfloat min3 (vec3 v) {\n    return max (max (v.x, v.y), v.z);\n}\nfloat hex_sdf(vec3 h) {\n    return max3(abs(h.yzx + h.zxy / 2.0));\n    // return abs(h.x+(h.y/2.0) );\n    // return max3(abs(vec3(h)));\n}\n\nbool between(float min, float max, float x) {\n    return min <= x && x <= max;\n}\n\nuint heightAt(ivec2 p) {\n    ivec2 tex_size = textureSize(heights, 0);\n\n    if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {\n        // point is outside source texture, treat as sink\n        return SINK;\n    } else {\n        return texelFetch(heights, p, 0).r;\n    }\n}\n\nvoid main() {\n    // vec2 pos2 = vec4(coord, 0.0, 1.0).xy * 400.0;\n    vec2 pos2 = (tt * vec4(coord, 0.0, 1.0)).xy;\n\n    // fragColor = length(pos2 - vec2(100.0, 100.0)) < 50.0\n    // ? colorFg[0]\n    // : colorBg;\n    // return;\n    vec3 hex_pos = raToHex(pos2);\n    // vec2 hex_center = floor(hex_pos + 0.5);\n    vec3 hex_center = hexRound(hex_pos);\n    vec2 center = hexToRa(hex_center);\n    vec2 squarePos = floor(pos2 + 0.5);\n    vec3 hex_d = hex_pos - hex_center;\n    // vec2 d =hex_pos - hex_center;\n    // vec3 zz = vec3(d.xy, (d.y - d.x)/1.41);\n    vec2 local_ra_offset = pos2 - center;\n    // if (abs(zz.x +zz.y+ zz.z) < 0.1) {\n    // if (max(d.x, max(d.y, 0.0)) < 0.45) {\n    // if (length(pos2 - squarePos) < 0.5) {\n    float d = hex_sdf(hex_d);\n    if (between(0.0, 0.425, d)\n    // || length(pos2 - center) < 0.2\n    ) {\n        // if (length (pos2 - center) <0.53){\n        // if (length (hex_pos - hex_center) <0.45){\n        ivec2 center2 = cube_to_oddr(ivec3(hex_center));\n        uint value = heightAt(center2);\n        uint valueClamped = clamp(value, 0u, uint(colorFg.length()) - 1u);\n        fragColor = value == 255u ? colorBg : colorFg[valueClamped];\n    } else {\n        fragColor = colorBg;\n    }\n}'},8657:e=>{"use strict";e.exports="#version 300 es\n#define GLSLIFY 1\nin vec4 ts_Vertex;\nin vec2 ts_TexCoord;\nout vec2 coord;\nvoid main() {\n  coord = ts_TexCoord.xy;\n  gl_Position = ts_Vertex;\n}\n"},1955:e=>{"use strict";e.exports="#version 300 es\nprecision mediump float;\nprecision mediump usampler2D;\n#define GLSLIFY 1\nin vec2 coord;\n\nuniform vec2 iResolution;\nuniform vec4 colorBg;\nuniform vec4[10] colorFg;\n\nout uvec4 fragColor;\n\nconst uint SINK = 255u;\n\nuniform usampler2D heights;\n\nfloat EPSILON = 0.0001;\n\nvec3 raToHex(vec2 xy) {\n    float hex_t = xy.y / 0.866;\n    float hex_s = xy.x - hex_t / 2.0;\n    return vec3(hex_s, hex_t, -(hex_s + hex_t));\n}\n\nvec2 hexToRa(vec3 hex) {\n    float y = hex.t * 0.866;\n    float x = hex.s + hex.t / 2.0;\n    return vec2(x, y);\n}\nivec2 cube_to_oddr(ivec3 cube) {\n    int col = cube.x + (cube.y - (cube.y&1)) / 2;\n    int row = cube.y;\n    return ivec2(col, row);\n}\nivec3 oddr_to_cube(ivec2 hex) {\n    int x = hex.x - (hex.y - (hex.y&1)) / 2;\n    int y = hex.y;\n    int z = -x-y;\n    return ivec3(x, y, z);\n}\n\nvec3 hexRound(vec3 hex) {\n    vec3 r = floor(hex + 0.5);\n    vec3 diff = abs(r - hex);\n\n    if (diff.x > diff.y && diff.x > diff.z) {\n        r.x = -(r.y + r.z);\n    } else if (diff.y > diff.z) {\n        r.y = -(r.x + r.z);\n    } else {\n        r.z = -(r.x + r.y);\n    }\n\n    return r;\n}\nfloat max3 (vec3 v) {\n    return max (max (v.x, v.y), v.z);\n}\nfloat min3 (vec3 v) {\n    return max (max (v.x, v.y), v.z);\n}\nfloat hex_sdf(vec3 h) {\n    return max3(abs(h.yzx + h.zxy/2.0));\n    // return abs(h.x+(h.y/2.0) );\n    // return max3(abs(vec3(h)));\n}\n\nbool between(float min, float max, float x) {\n    return min <= x && x <= max;\n}\n\nuint heightAt(ivec2 p) {\n    ivec2 tex_size = textureSize(heights, 0);\n\n    if (p.x < 0 || p.y < 0 || tex_size.x <= p.x || tex_size.y <= p.y) {\n        // point is outside source texture, treat as sink\n        return SINK;\n    } else {\n        return texelFetch(heights, p, 0).r;\n    }\n}\n\nuint at(ivec2 p) {\n    uint value = heightAt(p);\n    if (SINK == value) {\n        return 0u;\n    } else {\n        return value / 6u;\n    }\n}\n\nuint calc(ivec2 oddr_pos) {\n    uint value = texelFetch(heights, oddr_pos, 0).r;\n\n    if (SINK == value) {\n        return SINK;\n    }\n\n    // the current pos topples as many times as it can\n    value = value % 6u;\n    // all the neighbors topple as often as they can\n    value += at(oddr_pos + ivec2(+1, 0));\n    value += at(oddr_pos + ivec2(-1, 0));\n\n    value += at(oddr_pos + ivec2(0, +1));\n    value += at(oddr_pos + ivec2(0, -1));\n\n    value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, +1));\n    value += at(oddr_pos + ivec2(0 != (oddr_pos.y & 1) ? 1 : -1, -1));\n\n    return value;\n}\n\nvoid main() {\n    fragColor = uvec4(calc(ivec2(coord)), 0u, 0u, 0u);\n    // fragColor = uvec4(2u, 0u, 0u, 0u);\n}"},6102:()=>{}}]);