"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[388],{6941:(n,e,o)=>{o.r(e),o.d(e,{band:()=>_,default:()=>C});var t=o(6800),r=o(260),a=o(1459),i=o(9975),c=o(2772),l=o(5282),s=o(5270),f=o(7392),v=o(9526),u=o(2182),d=o(9392),m=o(1641);n=o.hmd(n);const x="C:\\Users\\aval\\tsdev\\workshop\\src\\noises\\index.tsx",p=(0,u.Nv)(512,(()=>u.V3.polar(1,2*(Math.random()-.5)*Math.PI))),y={xOffset:0,yOffset:0,xScale:64,yScale:64,bandCount:2,a:.5,b:.5},h=(n,e,o)=>{const t=0|n,r=t+1,a=0|e,i=a+1,c=n=>n*n*(3-2*n),l=(n,e,o,t)=>{const r=o-n,a=t-e;return(0,u.en)(p,59*n+e).dot(new u.V3(r,a,0))},s=l(t,a,n,e),f=l(r,a,n,e),v=(0,u.t7)(s,f,o?c(n-t):n-t),d=l(t,i,n,e),m=l(r,i,n,e),x=(0,u.t7)(d,m,o?c(n-t):n-t);return(0,u.t7)(v,x,o?c(e-a):e-a)},_=(n,e,o,t)=>(0,u.t7)(n,e,Math.floor(4*(0,u.kL)(n,e,t))/3);const g=(0,c.Z)((n=>({sidebar:{display:"flex",flexDirection:"column",width:256,padding:n.spacing(1),alignItems:"stretch","& > *":{margin:n.spacing(1)}},media:{height:0,paddingTop:"100%"}})));function b({state:n,prop:e,setStatePartial:o,...t}){return v.createElement(s.Z,{variant:"outlined",size:"small",type:"number",value:n[e],onChange:n=>o({[e]:+n.target.value}),label:e,...t,__self:this,__source:{fileName:x,lineNumber:619}})}const C=()=>{const e=(0,v.useRef)(null),[c,s]=(0,m.q)(y),p=(0,v.useCallback)((n=>s((e=>({...e,...n})))),[s]),_=((0,v.useRef)(),(0,v.useRef)(Object.assign({},c))),C=g(),z=(0,l.Z)();return(0,v.useEffect)((()=>{!function(e,t,r){let a=!0;const i=512,c=new Uint8Array(512*i),l=new d.xE(i,512,{format:e.RED,type:e.UNSIGNED_BYTE,internalFormat:e.R8}),s=new d.xE(256,256,{format:e.RG,type:e.FLOAT,internalFormat:e.RG32F,data:u.V3.packXY((0,u.Nv)(65536,(()=>u.V3.polar(1,2*(Math.random()-.5)*Math.PI))))}),f=()=>{let n=1/0,e=-1/0;for(let o=0;o<512;o++)for(let t=0;t<i;t++){const l=(0,u.uZ)(.8*(h(r.xOffset+t/r.xScale,r.yOffset+o/r.yScale,a)+.5),0,1),s=Math.random();c[o*i+t]=Math.floor(4*l)/3*255,e=Math.max(e,s),n=Math.min(n,s)}c[0]=0,l.setData(c)},v=d.Kj.plane({detail:128}),m=d.Kj.sphere(0).computeWireframeFromFlatTrianglesClosedMesh().compile();!function(n){const e=[],o=Math.sqrt(3)/2,t=Math.cos(Math.PI/3),r=2*Math.asin(1/Math.sqrt(3));for(let a=-0;a<2;a++)for(let i=-0;i<2;i++)for(let c=-0;c<1;c++){const l=a+(i%2==0?0:t);e.push(n.transform(u.M4.scale(1,.01,.01).translate(l,i*o,c*o)),n.transform(u.M4.scale(1,.01,.01).rotateZ(Math.PI/3).translate(l,i*o,c*o)),n.transform(u.M4.scale(1,.01,.01).rotateZ(Math.PI/3*2).translate(l,i*o,c*o)),n.transform(u.M4.scale(1,.01,.01).rotateZ(Math.PI/2).rotateX((Math.PI-r)/2).translate(l,i*o,c*o)),n.transform(u.M4.scale(1,.01,.01).rotateY(-Math.PI/3*2).rotateX(Math.PI/2-r).translate(l,i*o,c*o)),n.transform(u.M4.scale(1,.01,.01).rotateY(-Math.PI/3).rotateX(Math.PI/2-r).translate(l,i*o,c*o)))}const[a,...i]=e;a.concat(...i)}(d.Kj.rotation([u.V3.Y,u.V3.XY],{anchor:u.V3.O,dir1:u.V3.X},2*Math.PI,3,!0)),console.log(m);const x=d.ex.create("\n      uniform mat4 ts_ModelViewProjectionMatrix;\n      attribute vec4 ts_Vertex;\n      uniform float pointSize;\n      varying vec4 foo;\n      void main() {\n        foo = vec4(1.0, 1.0, 1.0, 1.0);\n        gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;\n        gl_PointSize = pointSize;\n      }\n    ","\n      precision highp float;\n      uniform vec4 color;\n      varying vec4 bar;\n      void main() {\n        gl_FragColor = color;\n        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n          discard;\n        }\n      }\n    ");d.ex.create("#version 300 es\n      precision highp float;\n      \n      uniform mat4 ts_ModelViewProjectionMatrix;\n      in vec4 ts_Vertex;\n      uniform float pointSize;\n      uniform vec2 scale;\n      uniform vec2 offset;\n      in vec3 ts_TexCoordUVQ;\n      in vec2 ts_TexCoord;\n      out vec3 coordUVQ;\n      out float n;\n      out vec2 coord;\n      void main() {\n        vec2 texCoordAdjusted = offset + ts_TexCoord * scale;\n        n = 0.0;  \n        gl_Position = ts_ModelViewProjectionMatrix * \n          (ts_Vertex + vec4(0.0, 0.0, n, 0.0));\n        gl_PointSize = pointSize;\n        coordUVQ = ts_TexCoordUVQ;\n        coord = texCoordAdjusted;\n      }\n  ","#version 300 es\n      precision highp float;\n      \n      uniform sampler2D texture;\n      uniform vec4 colorPrimary;\n      uniform vec4 colorBg;\n      uniform int bandCount;\n      in float n;\n      in vec2 coord;\n      out vec4 fragColor;\n      void main() {\n        float fraction = (n + 0.5) * 0.5;\n        fragColor = mix(colorBg, colorPrimary, fraction);\n        \n        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n          discard;\n        }\n      }\n    ");let p=function(n){return{simplex:d.ex.create(o(5301),o(8894),n),julia:d.ex.create(o(5301),o(1467),n),texShader:d.ex.create("\n      uniform mat4 ts_ModelViewProjectionMatrix;\n      attribute vec4 ts_Vertex;\n      uniform float pointSize;\n      attribute vec3 ts_TexCoordUVQ;\n      attribute vec2 ts_TexCoord;\n      varying vec4 foo;\n      varying vec3 coordUVQ;\n      varying vec2 coord;\n      void main() {\n        foo = vec4(1.0, 1.0, 1.0, 1.0);\n        gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;\n        gl_PointSize = pointSize;\n        coordUVQ = ts_TexCoordUVQ;\n        coord = ts_TexCoord;\n      }\n    ","\n      precision highp float;\n      uniform sampler2D texture;\n      uniform vec4 colorPrimary;\n      uniform vec4 colorBg;\n      varying vec4 bar;\n      varying vec3 coordUVQ;\n      varying vec2 coord;\n      void main() {\n        float fraction = texture2D(texture, coord).r;\n        gl_FragColor = mix(colorBg, colorPrimary, fraction);\n        \n        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n          discard;\n        }\n      }\n    "),shader:d.ex.create("\n      uniform mat4 ts_ModelViewProjectionMatrix;\n      attribute vec4 ts_Vertex;\n      uniform float pointSize;\n      varying vec4 foo;\n      void main() {\n        foo = vec4(1.0, 1.0, 1.0, 1.0);\n        gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;\n        gl_PointSize = pointSize;\n      }\n    ","\n      precision highp float;\n      uniform vec4 color;\n      varying vec4 bar;\n      void main() {\n        gl_FragColor = color;\n        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n          discard;\n        }\n      }\n    "),perlinShader2:d.ex.create("#version 300 es\n      precision highp float;\n      \n      uniform mat4 ts_ModelViewProjectionMatrix;\n      in vec4 ts_Vertex;\n      uniform float pointSize;\n      uniform vec2 scale;\n      uniform vec2 offset;\n      in vec3 ts_TexCoordUVQ;\n      in vec2 ts_TexCoord;\n      out vec3 coordUVQ;\n      out float n;\n      out vec2 coord;\n      void main() {\n        vec2 texCoordAdjusted = offset + ts_TexCoord * scale;\n        n = 0.0;  \n        gl_Position = ts_ModelViewProjectionMatrix * \n          (ts_Vertex + vec4(0.0, 0.0, n, 0.0));\n        gl_PointSize = pointSize;\n        coordUVQ = ts_TexCoordUVQ;\n        coord = texCoordAdjusted;\n      }\n  ","#version 300 es\n      precision highp float;\n      \n      uniform sampler2D texture;\n      uniform vec4 colorPrimary;\n      uniform vec4 colorBg;\n      uniform int bandCount;\n      in float n;\n      in vec2 coord;\n      out vec4 fragColor;\n      void main() {\n        float fraction = (n + 0.5) * 0.5;\n        fragColor = mix(colorBg, colorPrimary, fraction);\n        \n        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n          discard;\n        }\n      }\n    ")}}();n.hot,d.ex.create("\n      uniform mat4 ts_ModelViewProjectionMatrix;\n      attribute vec4 ts_Vertex;\n      uniform float pointSize;\n      attribute vec3 ts_TexCoordUVQ;\n      attribute vec2 ts_TexCoord;\n      varying vec4 foo;\n      varying vec3 coordUVQ;\n      varying vec2 coord;\n      void main() {\n        foo = vec4(1.0, 1.0, 1.0, 1.0);\n        gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;\n        gl_PointSize = pointSize;\n        coordUVQ = ts_TexCoordUVQ;\n        coord = ts_TexCoord;\n      }\n    ","\n      precision highp float;\n      uniform sampler2D texture;\n      uniform vec4 colorPrimary;\n      uniform vec4 colorBg;\n      varying vec4 bar;\n      varying vec3 coordUVQ;\n      varying vec2 coord;\n      void main() {\n        float fraction = texture2D(texture, coord).r;\n        gl_FragColor = mix(colorBg, colorPrimary, fraction);\n        \n        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n          discard;\n        }\n      }\n    ");const y={pos:(0,u.V)(.75,0,1),lookDir:(0,u.V)(0,0,-1)};(()=>{if(null!==localStorage.getItem("viewState")){const n=JSON.parse(localStorage.getItem("viewState"));y.pos=u.V3.fromArray(n.pos),y.lookDir=u.V3.fromArray(n.lookDir)}})(),e.clearColor(...t.background),e.cullFace(e.BACK);const _=()=>{e.matrixMode(e.PROJECTION),e.loadIdentity(),e.perspective(70,e.canvas.width/e.canvas.height,.1,1e3),e.lookAt((0,u.V)(.75,0,1),(0,u.V)(.75,0,0),u.V3.Y),e.matrixMode(e.MODELVIEW)};_(),e.pointSize(10),e.disable(e.CULL_FACE),e.enable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);const g={};console.log(e.canvas),e.canvas.contentEditable="true",e.canvas.focus(),e.canvas.onkeydown=function(n){g[n.key]=!0,"o"===n.key&&(a=!a,f()),"2"===n.key&&_(),"1"===n.key&&(e.matrixMode(e.PROJECTION),e.loadIdentity(),e.perspective(70,e.canvas.width/e.canvas.height,.1,1e3),e.lookAt((0,u.V)(0,.5,2.2),u.V3.O,u.V3.Y),e.matrixMode(e.MODELVIEW))},e.canvas.onkeypress=function(n){new u.V3(0,0,0)},e.canvas.onkeyup=function(n){g[n.key]=!1};let b=u.V3.O,C=u.M4.IDENTITY;e.canvas.onmousemove2=function(n){const e=(0,u.V)(n.pageX,n.pageY),o=b.to(e);1&n.buttons&&(C=C.rotateZ(.25*o.x*u.Co),C=C.rotateX(.25*o.y*u.Co)),b=e},e.canvas.onmousemove=function(n){const e=(0,u.V)(n.pageX,n.pageY),o=b.to(e);if(1&n.buttons){const n=u.M4.rotateY(.25*-o.x*u.Co).rotateX(.25*-o.y*u.Co);y.lookDir=n.transformVector(y.lookDir).unit()}b=e};let z=!1;Object.assign(e.animate((function(n,o){const a=new u.V3(+!!g.w-+!!g.s,+!!g.a-+!!g.d,+!!g.e-+!!g.q+ +!!g[" "]).times(.05);if(!a.likeO()){const n=y.lookDir;y.pos=y.pos.plus(u.M4.forSys(n,u.V3.Y.cross(n).unit()).transformVector(a)),localStorage.setItem("viewState",JSON.stringify({pos:y.pos.toArray(),lookDir:y.lookDir.toArray()}))}e.matrixMode(e.PROJECTION),e.loadIdentity(),e.perspective(70,e.canvas.width/e.canvas.height,.1,1e3),e.lookAt(y.pos,y.pos.plus(y.lookDir),u.V3.Y),e.matrixMode(e.MODELVIEW),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.loadIdentity(),e.pushMatrix(),e.translate(.25,-.5,0),l.bind(0),s.bind(1);const i=n/1e3/40%1,c=n=>u.V3.polar((0,u.t7)(-6,6,n),Math.abs((0,u.t7)(-10,10,n))+u.PI/2,.5),f=u.M4.product(u.M4.perspective(70,1,.1,50),u.M4.lookAt(c(i),c(i+.005).unit().plus((0,u.V)(0,0,.2)),u.V3.Z)),d=f.inversed();z||(console.log(""+f),console.log(f.transformPoint(u.V3.XYZ.negated())),console.log(f.transformPoint(u.V3.XYZ)),z=!0),p.raymarch.uniforms({a:r.a,b:r.b,colorPrimary:t.primary,colorSecondary:t.secondary,colorBg:t.background,scale:[r.xScale,r.yScale],offset:[r.xOffset,r.yOffset],bandCount:r.bandCount,highResTimeStamp:n,secs:n/1e3,gradients:1,lll:f,llli:d}).draw(v),e.popMatrix(),e.pushMatrix(),e.translate(-.75,0,0),e.scale(.5),e.rotate(-90,1,0,0),p.raymarch.uniforms({colorPrimary:t.primary,colorBg:t.background,pointSize:12,texture:0}).draw(m),x.uniforms({color:t.primary,pointSize:12}).draw(m,e.LINES),e.popMatrix()})),{redoTex:f})}(d.ZG.create({canvas:e.current}),{background:f.iv(z.palette.background.default).gl(),primary:f.iv(z.palette.primary.main).gl(),secondary:f.iv(z.palette.secondary.main).gl()},_.current)}),[z.palette.background.default,z.palette.primary.main,z.palette.secondary.main]),(0,v.useEffect)((()=>{Object.assign(_.current,c)}),[c]),v.createElement(a.Z,{container:!0,style:{height:"99%"},__self:void 0,__source:{fileName:x,lineNumber:670}},v.createElement(a.Z,{item:!0,xs:12,md:9,__self:void 0,__source:{fileName:x,lineNumber:671}},v.createElement("div",{style:{height:"100%"},__self:void 0,__source:{fileName:x,lineNumber:672}},v.createElement("canvas",{ref:e,style:{width:"100%",height:"100%"},width:128,height:128,tabIndex:0,__self:void 0,__source:{fileName:x,lineNumber:673}}))),v.createElement(a.Z,{item:!0,xs:12,md:3,className:C.sidebar,__self:void 0,__source:{fileName:x,lineNumber:682}},v.createElement(t.Z,{__self:void 0,__source:{fileName:x,lineNumber:683}},v.createElement(r.Z,{__self:void 0,__source:{fileName:x,lineNumber:684}},"Test with various noise generation functions.")),v.createElement(b,{state:c,setStatePartial:p,prop:"xOffset",__self:void 0,__source:{fileName:x,lineNumber:688}}),v.createElement(b,{state:c,setStatePartial:p,prop:"yOffset",__self:void 0,__source:{fileName:x,lineNumber:689}}),v.createElement(b,{state:c,setStatePartial:p,prop:"xScale",__self:void 0,__source:{fileName:x,lineNumber:690}}),v.createElement(b,{state:c,setStatePartial:p,prop:"yScale",__self:void 0,__source:{fileName:x,lineNumber:691}}),v.createElement(b,{state:c,setStatePartial:p,prop:"bandCount",__self:void 0,__source:{fileName:x,lineNumber:692}}),v.createElement("div",{__self:void 0,__source:{fileName:x,lineNumber:693}},v.createElement(i.Z,{value:c.a,onChange:(n,e)=>p({a:e}),min:0,max:1,step:.01,__self:void 0,__source:{fileName:x,lineNumber:694}})),v.createElement("div",{__self:void 0,__source:{fileName:x,lineNumber:702}},v.createElement(i.Z,{value:c.b,onChange:(n,e)=>p({b:e}),min:0,max:1,step:.01,__self:void 0,__source:{fileName:x,lineNumber:703}})),c.a))}},1641:(n,e,o)=>{o.d(e,{q:()=>v});var t=o(6897),r=o.n(t),a=o(508),i=o.n(a),c=o(9526);const l=n=>"#"+Object.entries(n).map((([n,e])=>encodeURIComponent(n)+"="+encodeURIComponent(e))).join("&"),s=n=>i()(n,(n=>"true"===n||"false"!==n&&("NaN"===n?NaN:"undefined"===n?void 0:"null"===n?null:""===n?"":isNaN(+n)?n:+n))),f=n=>i()(n,(n=>""+n));function v(n,{deserialize:e=s,serialize:o=f,wait:t=1e3}={}){const a=(0,c.useCallback)((()=>{const t="function"==typeof n?n():n,r=e(Object.assign(o(t),(a=document.location.hash)?a.substr(1).split("&").map((n=>{const[e,o]=n.split("=");return[decodeURIComponent(e),decodeURIComponent(o)]})).reduce(((n,[e,o])=>(n[e]=o,n)),{}):{}));var a;return history.pushState(void 0,document.title,l(o(r))),r}),[e,n,o]),[i,v]=(0,c.useState)(a),u=(0,c.useRef)();return u.current||(u.current=r()((function(n){history.pushState(void 0,document.title,l(o(n)))}),t)),(0,c.useEffect)((()=>u.current(i)),[i]),(0,c.useEffect)((()=>{const n=()=>{v(a())};return window.addEventListener("hashchange",n),()=>{window.removeEventListener("hashchange",n)}}),[a]),[i,v]}},1467:n=>{n.exports="#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\nfloat banded(float bandCount, float t) {\n  return floor(t * float(bandCount)) / float(bandCount - 1.0);\n}\nfloat banded(int bandCount, float t) {\n  return banded(float(bandCount), t);\n}\n\nbool between(float min, float max, float value) {\n  return min <= value && value <= max;\n}\n\nuniform sampler2D gradients;\nuniform int bandCount_0;\n\nvec3 xy2tri(vec2 xy) {\n  float v = xy.y / 0.866;\n  float u = xy.x - v / 2.0;\n  float R = float(mod(u, 1.0) + mod(v, 1.0) > 1.0);\n  return vec3(u, v, R);\n}\nvec3 triCenter(vec3 uvR) {\n  vec3 base = floor(uvR);\n  vec2 centerOffset = mix(vec2(1.0 / 3.0), vec2(2.0 / 3.0), uvR.z);\n  return base + vec3(centerOffset, 0.0);\n}\nvec2 tri2xy(vec3 uvR) {\n  float y = uvR.t * 0.866;\n  float x = uvR.s + uvR.t / 2.0;\n  return vec2(x, y);\n}\nvec2 tri2xy(vec2 uv) {\n  float y = uv.t * 0.866;\n  float x = uv.s + uv.t / 2.0;\n  return vec2(x, y);\n}\nconst float SQRT2 = 1.4142135623730951;\nconst float GOLDEN_RATIO_2281831123 = 1.61803398875;\nconst float SQRT3 = 1.732050807568877;\n/* Create random direction vector\n */\nvec2 randomGradient(vec2 i) {\n  // Random float. No precomputed gradients mean this works for any number of grid coordinates\n  float random =\n    2920.0 *\n    sin(float(i.x) * 2.1942 + float(i.y) * 1.71324 + 8.912) *\n    cos(float(i.x) * 2.3157 * float(i.y) * 2.17832 + 9.758);\n  //    random = (i.x + 1667.) * (i.x + 2083.) * (i.y + 2659.) * (i.y * 50.77 + .3769);\n  //    random = sin(SQRT2 * i.x) + cos(GOLDEN_RATIO * i.y) + tan((i.x + i.y) * SQRT3);\n  return vec2(cos(random), sin(random));\n}\n\nfloat dotGridGradient2(vec2 cell, vec2 pos) {\n  vec2 xy_d = cell - pos;\n  if (length(xy_d) > 0.4) return 0.0;\n  float r = 1.0;\n  float part = pow(max(0.0, 0.999 - dot(xy_d, xy_d)), 4.0);\n  //    vec2 gradient = texelFetch(gradients, ivec2(cell), 0).xy;\n  vec2 gradient = randomGradient(cell);\n  return part * dot(gradient, xy_d);\n}\n\n// resulting range is [-0.68, 0.68]. Use unmix to normalize if necessary.\nfloat simplex2D(vec2 xy) {\n  vec3 uvR = xy2tri(xy);\n  ivec2 baseUV = ivec2(uvR.xy);\n\n  float a = dotGridGradient2(tri2xy(vec2(baseUV)), xy);\n  float b = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(1, 0))), xy);\n  float c = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(0, 1))), xy);\n  float d = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(1, 1))), xy);\n\n  return b + c + mix(a, d, uvR.z);\n}\n\nfloat unmix(float a, float b, float value) {\n  return (value - a) / (b - a);\n}\n\nfloat remix(float fromA, float fromB, float toA, float toB, float value) {\n  return mix(toA, toB, unmix(fromA, fromB, value));\n}\n\nvec4 remix(float fromA, float fromB, vec4 toA, vec4 toB, float value) {\n  return mix(toA, toB, unmix(fromA, fromB, value));\n}\n\nvec2 complexMul(vec2 a, vec2 b) {\n  return vec2(a.x * b.x - a.y * b.y, a.y * b.x + a.x * b.y);\n}\n\nvec2 complexDiv(vec2 a, vec2 b) {\n  vec2 bConj = vec2(b.x, -b.y);\n  float divisor = complexMul(b, bConj).x;\n  return complexMul(a, bConj) / divisor;\n}\n\nvec2 toPolar(vec2 xy) {\n  return vec2(length(xy), atan(xy.y, xy.x));\n}\n\nvec3 fromPolar(float radius, float phi, float z) {\n  return vec3(radius * cos(phi), radius * sin(phi), z);\n}\n\nvec2 fromPolar(float radius, float phi) {\n  return vec2(radius * cos(phi), radius * sin(phi));\n}\n\nvec2 fromPolar(vec2 polar) {\n  return fromPolar(polar.x, polar.y);\n}\n\n// return e^z\nvec2 complexPow(vec2 z) {\n  // e^(re + i * im)\n  // = e^re * e^(i * im)\n  return fromPolar(exp(z.x), z.y);\n}\n\n// return w^z\nvec2 complexPow(vec2 w, float z) {\n  // w = r * e ^ (i * phi)\n  // ln(w) = ln(r) + i * phi\n  // w^z = e^(z * log(w)) = e^(z * (ln(r) + i * (phi))\n  vec2 wPolar = toPolar(w);\n  vec2 eExp = z * vec2(log(wPolar.x), wPolar.y);\n  return complexPow(eExp);\n}\n\nuniform float highResTimeStamp;\n\nfloat waves(vec4 color, vec2 position, vec2 direction) {\n  return sin(\n    dot(position, direction / pow(length(direction), 2.0)) +\n      float(highResTimeStamp) / 200.0\n  );\n}\n\nconst vec4 blue_0 = vec4(0.0, 0.0, 1.0, 1.0);\nconst vec4 red_0 = vec4(1.0, 0.0, 0.0, 1.0);\n\nvec4 visualize(vec4 lowColor, vec4 highColor, float t) {\n  float isLow = float(t < 0.0);\n  float isHigh = float(t > 1.0);\n  float isMid = 1.0 - isLow - isHigh;\n  return lowColor * isLow + isMid * vec4(t, t, t, 1.0) + highColor * isHigh;\n}\n\nvec4 visualize(float t) {\n  return visualize(blue_0, red_0, t);\n}\n\nvec3 raToHex(vec2 xy) {\n  float hex_t = xy.y / 0.866;\n  float hex_s = xy.x - hex_t / 2.0;\n  return vec3(hex_s, hex_t, -(hex_s + hex_t));\n}\n\nvec2 hex2Ra(vec3 hex) {\n  float y = hex.t * 0.866;\n  float x = hex.s + hex.t / 2.0;\n  return vec2(x, y);\n}\n\nvec3 hexRound(vec3 hex) {\n  vec3 r = floor(hex + 0.5);\n  vec3 diff = abs(r - hex);\n\n  if (diff.x > diff.y && diff.x > diff.z) {\n    r.x = -(r.y + r.z);\n  } else if (diff.y > diff.z) {\n    r.y = -(r.x + r.z);\n  } else {\n    r.z = -(r.x + r.y);\n  }\n\n  return r;\n}\n\nfloat max3(float a, float b, float c) {\n  return max(a, max(b, c));\n}\nfloat max3(vec3 v) {\n  return max(v.x, max(v.y, v.z));\n}\n\nfloat hexSdf(vec3 hex) {\n  return max3(abs(hex.yzx + hex.zxy / 2.0));\n}\n\nmat3 rotY(float angle) {\n  float c = cos(angle),\n    s = sin(angle);\n  return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);\n}\n\nuniform sampler2D texture;\nuniform vec4 colorPrimary;\nuniform vec4 colorSecondary;\nuniform vec4 colorBg;\nuniform float a;\nuniform float b;\nuniform int bandCount;\nuniform float secs;\nin vec2 coord;\nout vec4 fragColor;\n\nconst vec4 black = vec4(0.0, 0.0, 0.0, 1.0);\nconst vec4 white = vec4(1.0, 1.0, 1.0, 1.0);\nconst vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);\nconst vec4 red = vec4(1.0, 0.0, 0.0, 1.0);\nconst float GOLDEN_RATIO = 1.61803398875;\n\nconst vec2 c = vec2(-0.4, 0.6);\nvec2 f(vec2 z) {\n\n//    return complexMul(z, z) + fromPolar(0.7885,(a + b/50.)*6.);\n    return complexMul(z, z) + fromPolar(0.7885,secs/2.);\n//    return complexMul(z, z)  + fromPolar(0.7885,4.);\n}\n\nvec2 complexSqr(vec2 z) {\n    return complexMul(z, z);\n}\nvec2 f2(vec2 z) {\n    const float n = 8.;\n    return complexDiv(1. + (n - 1.) * complexPow(z, n), n * complexPow(z, n - 1.));\n}\n\nvec2 f3(vec2 z) {\n    vec2 z2 = complexMul(z, z);\n    vec2 z3 = complexMul(z2, z);\n    return complexDiv(vec2(1., 0.) + 2. * z3, 3. * z2);\n}\nvec2 flf(vec2 z) {\n    vec2 z2 = complexMul(z, z);\n    vec2 z3 = complexMul(z2, z);\n    return complexDiv(vec2(1., 0.) - z3 / 6., complexSqr(z - z2 / 2.)) + vec2(-a, b);\n}\n\nconst float rSqr = 2. * 2.;\n\nvec3 juliaIteration(vec2 start) {\n  vec2 p = start;\n  for (uint i = uint(0); i < 20u; i++) {\n    p = f(p);\n    if (dot(p, p) > rSqr) {\n      return vec3(p, float(i));\n    }\n  }\n  return vec3(p, float(20u));\n}\n\nvoid main() {\n    vec3 res = juliaIteration(coord);\n    float f = res.z / 20.;\n\n//    fragColor = mix(colorBg, colorPrimary, banded(bandCount, unmix(-.35, .35, f2)));\n    fragColor = mix(colorBg, colorPrimary, min(banded(bandCount, f), 1.));\n    fragColor = vec4(res, 1.0);\n//    fragColor = visualize(f);\n//    fragColor = visualize(float(i == 1000u));\n\n}"},8894:n=>{n.exports="#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nfloat banded(float bandCount, float t) {\n  return floor(t * float(bandCount)) / float(bandCount - 1.0);\n}\nfloat banded(int bandCount, float t) {\n  return banded(float(bandCount), t);\n}\n\nbool between(float min, float max, float value) {\n  return min <= value && value <= max;\n}\n\nuniform sampler2D gradients;\nuniform int bandCount_0;\n\nvec3 xy2tri(vec2 xy) {\n  float v = xy.y / 0.866;\n  float u = xy.x - v / 2.0;\n  float R = float(mod(u, 1.0) + mod(v, 1.0) > 1.0);\n  return vec3(u, v, R);\n}\nvec3 triCenter(vec3 uvR) {\n  vec3 base = floor(uvR);\n  vec2 centerOffset = mix(vec2(1.0 / 3.0), vec2(2.0 / 3.0), uvR.z);\n  return base + vec3(centerOffset, 0.0);\n}\nvec2 tri2xy(vec3 uvR) {\n  float y = uvR.t * 0.866;\n  float x = uvR.s + uvR.t / 2.0;\n  return vec2(x, y);\n}\nvec2 tri2xy(vec2 uv) {\n  float y = uv.t * 0.866;\n  float x = uv.s + uv.t / 2.0;\n  return vec2(x, y);\n}\nconst float SQRT2 = 1.4142135623730951;\nconst float GOLDEN_RATIO_1117569599 = 1.61803398875;\nconst float SQRT3 = 1.732050807568877;\n/* Create random direction vector\n */\nvec2 randomGradient(vec2 i) {\n  // Random float. No precomputed gradients mean this works for any number of grid coordinates\n  float random =\n    2920.0 *\n    sin(float(i.x) * 2.1942 + float(i.y) * 1.71324 + 8.912) *\n    cos(float(i.x) * 2.3157 * float(i.y) * 2.17832 + 9.758);\n  //    random = (i.x + 1667.) * (i.x + 2083.) * (i.y + 2659.) * (i.y * 50.77 + .3769);\n  //    random = sin(SQRT2 * i.x) + cos(GOLDEN_RATIO * i.y) + tan((i.x + i.y) * SQRT3);\n  return vec2(cos(random), sin(random));\n}\n\nfloat dotGridGradient2(vec2 cell, vec2 pos) {\n  vec2 xy_d = cell - pos;\n  if (length(xy_d) > 0.4) return 0.0;\n  float r = 1.0;\n  float part = pow(max(0.0, 0.999 - dot(xy_d, xy_d)), 4.0);\n  //    vec2 gradient = texelFetch(gradients, ivec2(cell), 0).xy;\n  vec2 gradient = randomGradient(cell);\n  return part * dot(gradient, xy_d);\n}\n\n// resulting range is [-0.68, 0.68]. Use unmix to normalize if necessary.\nfloat simplex2D(vec2 xy) {\n  vec3 uvR = xy2tri(xy);\n  ivec2 baseUV = ivec2(uvR.xy);\n\n  float a = dotGridGradient2(tri2xy(vec2(baseUV)), xy);\n  float b = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(1, 0))), xy);\n  float c = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(0, 1))), xy);\n  float d = dotGridGradient2(tri2xy(vec2(baseUV + ivec2(1, 1))), xy);\n\n  return b + c + mix(a, d, uvR.z);\n}\n\nfloat unmix(float a, float b, float value) {\n  return (value - a) / (b - a);\n}\n\nfloat remix(float fromA, float fromB, float toA, float toB, float value) {\n  return mix(toA, toB, unmix(fromA, fromB, value));\n}\n\nvec4 remix(float fromA, float fromB, vec4 toA, vec4 toB, float value) {\n  return mix(toA, toB, unmix(fromA, fromB, value));\n}\n\nuniform float highResTimeStamp;\n\nfloat waves(vec4 color, vec2 position, vec2 direction) {\n  return sin(\n    dot(position, direction / pow(length(direction), 2.0)) +\n      float(highResTimeStamp) / 200.0\n  );\n}\n\nconst vec4 blue_0 = vec4(0.0, 0.0, 1.0, 1.0);\nconst vec4 red_0 = vec4(1.0, 0.0, 0.0, 1.0);\n\nvec4 visualize(vec4 lowColor, vec4 highColor, float t) {\n  float isLow = float(t < 0.0);\n  float isHigh = float(t > 1.0);\n  float isMid = 1.0 - isLow - isHigh;\n  return lowColor * isLow + isMid * vec4(t, t, t, 1.0) + highColor * isHigh;\n}\n\nvec4 visualize(float t) {\n  return visualize(blue_0, red_0, t);\n}\n\nvec3 raToHex(vec2 xy) {\n  float hex_t = xy.y / 0.866;\n  float hex_s = xy.x - hex_t / 2.0;\n  return vec3(hex_s, hex_t, -(hex_s + hex_t));\n}\n\nvec2 hex2Ra(vec3 hex) {\n  float y = hex.t * 0.866;\n  float x = hex.s + hex.t / 2.0;\n  return vec2(x, y);\n}\n\nvec3 hexRound(vec3 hex) {\n  vec3 r = floor(hex + 0.5);\n  vec3 diff = abs(r - hex);\n\n  if (diff.x > diff.y && diff.x > diff.z) {\n    r.x = -(r.y + r.z);\n  } else if (diff.y > diff.z) {\n    r.y = -(r.x + r.z);\n  } else {\n    r.z = -(r.x + r.y);\n  }\n\n  return r;\n}\n\nfloat max3(float a, float b, float c) {\n  return max(a, max(b, c));\n}\nfloat max3(vec3 v) {\n  return max(v.x, max(v.y, v.z));\n}\n\nfloat hexSdf(vec3 hex) {\n  return max3(abs(hex.yzx + hex.zxy / 2.0));\n}\n\nuniform sampler2D texture;\nuniform vec4 colorPrimary;\nuniform vec4 colorSecondary;\nuniform vec4 colorBg;\nuniform float a;\nuniform int bandCount;\nin float n;\nin vec2 coord;\nout vec4 fragColor;\n\nconst vec4 black = vec4(0.0, 0.0, 0.0, 1.0);\nconst vec4 white = vec4(1.0, 1.0, 1.0, 1.0);\nconst vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);\nconst vec4 red = vec4(1.0, 0.0, 0.0, 1.0);\n\nfloat simplex01(vec2 pos) {\n    return unmix(-.68, .68, simplex2D(pos));\n}\n\nvoid main() {\n    float f = mix (simplex2D(coord), simplex2D(coord * 4.), a);\n    float f2 = simplex2D(coord);\n\n    fragColor = mix(colorBg, colorPrimary, banded(bandCount, unmix(-.35, .35, f2)));\n//    fragColor = mix(fragColor, colorSecondary, float(between(0.0, 1., f)));\n}"},5301:n=>{n.exports="#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\nuniform mat4 ts_ModelViewProjectionMatrix;\nin vec4 ts_Vertex;\nuniform vec2 scale;\nuniform vec2 offset;\nin vec3 ts_TexCoordUVQ;\nin vec2 ts_TexCoord;\nout vec3 coordUVQ;\nout float n;\nout vec2 coord;\nvoid main() {\n  vec2 texCoordAdjusted = offset + ts_TexCoord * scale;\n  gl_Position = ts_Vertex;\n  coordUVQ = ts_TexCoordUVQ;\n  coord = ts_TexCoord;\n}\n"}}]);