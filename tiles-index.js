(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[596],{3671:(e,t,s)=>{"use strict";s.d(t,{PM:()=>n,Qn:()=>m,X$:()=>o,XJ:()=>i,YQ:()=>g,_x:()=>h,hv:()=>_,kC:()=>f,li:()=>d,nl:()=>p,oe:()=>u,q3:()=>c,t1:()=>N});var r=s(9526),a=s(2182);const l="/home/runner/work/workshop/workshop/src/paperBox1/common.tsx",n=25.4,o=e=>(0,a.At)(e/a.Co,-1)+"°",i=(e,t)=>t/2/Math.sin(a.gc/e/2),m=(e,t)=>2*t*Math.sin(a.gc/e/2),c=(e,t)=>t/2/Math.tan(a.gc/e/2),u=(e,t)=>t/Math.cos(a.gc/e/2),h=(e,t)=>2*t*Math.tan(a.gc/e/2);function _({sides:e,radius:t,startAngle:s=0,sideLength:n,...o}){if(void 0!==n==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=i(e,n));const{x:m,y:c}=a.V3.polar(t,s);return r.createElement("path",{d:p`
        M${m},${c}
        ${(0,a.hS)(0,e).map((r=>p`L${a.V3.polar(t,s+r*(a.gc/e))}`))}Z`,...o,__self:this,__source:{fileName:l,lineNumber:48}})}function f({id:e,children:t,count:s,stepDeg:n}){return r.createElement(r.Fragment,null,r.createElement("g",{id:e,__self:this,__source:{fileName:l,lineNumber:72}},t),(0,a.hS)(0,s-1).map((t=>r.createElement("use",{key:t,href:"#"+e,transform:`rotate(${(t+1)*n} 0 0)`,__self:this,__source:{fileName:l,lineNumber:74}}))))}const d=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]],N=d.find((([,,e])=>e.includes("A4")));function p(e,...t){const s=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(s).join(" "):e.x+","+e.y;let r=e[0];for(let a=0;a<t.length;a++)r+=s(t[a]),r+=e[a+1];return r}const g=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},1641:(e,t,s)=>{"use strict";s.d(t,{q:()=>u});var r=s(6897),a=s.n(r),l=s(508),n=s.n(l),o=s(9526);const i=e=>"#"+Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&"),m=e=>n()(e,(e=>"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:""===e?"":isNaN(+e)?e:+e))),c=e=>n()(e,(e=>""+e));function u(e,{deserialize:t=m,serialize:s=c,wait:r=1e3}={}){const l=(0,o.useCallback)((()=>{const r="function"==typeof e?e():e,a=t(Object.assign(s(r),(l=document.location.hash)?l.substr(1).split("&").map((e=>{const[t,s]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(s)]})).reduce(((e,[t,s])=>(e[t]=s,e)),{}):{}));var l;return history.pushState(void 0,document.title,i(s(a))),a}),[t,e,s]),[n,u]=(0,o.useState)(l),h=(0,o.useRef)();return h.current||(h.current=a()((function(e){history.pushState(void 0,document.title,i(s(e)))}),r)),(0,o.useEffect)((()=>h.current(n)),[n]),(0,o.useEffect)((()=>{const e=()=>{u(l())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[l]),[n,u]}},293:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>q});var r=s(8864),a=s(6726),l=s(9717),n=s(871),o=s(897),i=s(6498),m=s(8051),c=s(3121),u=s(4484),h=s(9526),_=s(2182),f=s(1641),d=s(3060),N=s(2474),p=s.n(N),g=s(3671);const k="/home/runner/work/workshop/workshop/src/tiles/CairoTiles.tsx";function b({sides:e,radius:t,startAngle:s=0,sideLength:r,...a}){if(void 0!==r==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=(0,g.XJ)(e,r));const l=(0,g.q3)(e,(0,g.Qn)(e,t)),{x:n,y:o}=_.V3.polar(l,s-_.gc/e/2);return h.createElement("path",{d:g.nl`
        M${n},${o}
        ${(0,_.hS)(0,e).map((r=>g.nl`L${_.V3.polar(t,s+r*(_.gc/e))}`))}Z`,...a,__self:this,__source:{fileName:"/home/runner/work/workshop/workshop/src/tiles/RegularPolygon.tsx",lineNumber:32}})}const $="/home/runner/work/workshop/workshop/src/tiles/HexTiles.tsx",M="/home/runner/work/workshop/workshop/src/tiles/OctaSquare.tsx";var y=s(3059);const E="/home/runner/work/workshop/workshop/src/tiles/PenroseTiles.tsx",C=Math.cos(18*_.Co),Z=Math.sin(18*_.Co),v=Math.cos(36*_.Co),x=Math.sin(36*_.Co);function w({cornersDeg:e,...t}){const[s,r]=e[0],[a,l]=(0,y.last)(e),n=_.V3.polar(s,r*_.Co).lerp(_.V3.polar(a,l*_.Co),.5);return h.createElement("path",{...t,style:{animation:"inherit"},className:"c1 s2",d:g.nl`M${n}${e.map((([e,t],s)=>"L"+g.nl`${_.V3.polar(e,t*_.Co)}`))}Z`,__self:this,__source:{fileName:E,lineNumber:37}})}const L="/home/runner/work/workshop/workshop/src/tiles/RhombitrihexagonalTiles.tsx",S="/home/runner/work/workshop/workshop/src/tiles/SquareTiles.tsx",A="/home/runner/work/workshop/workshop/src/tiles/TriangleTiles.tsx",P="/home/runner/work/workshop/workshop/src/tiles/index.tsx",V=(0,u.Z)((e=>({"@global":{"@keyframes dash":{to:{strokeDashoffset:0}},"@keyframes popp":{from:{fil:"none"},to:{}},...(0,_.hS)(0,3).reduce(((e,t)=>(e[`.c${t}`]=({shapeLengths:e})=>({strokeDasharray:e[t],strokeDashoffset:e[t]}),e)),{}),...(0,_.hS)(0,20).reduce(((e,t)=>{const s=1+t/20*3+"s";return e[`.r${t}, .r${t} path`]=({animation:e,fill:r})=>({animation:[`dash 3s ${e} forwards`,r&&`popp ${s} step-end forwards`].filter(Boolean).join(","),animationDelay:.1*t+"s"}),e}),{})},svgg:({strokeWidth:e,strokeLinejoin:t,strokeLinecap:s,fill:r})=>({fill:"none","& > *":{fill:r?"orange":void 0,fillOpacity:.5,stroke:"orange",strokeWidth:e,strokeLinecap:s,strokeLinejoin:t,strokePosition:"inside"},"& > .s0, & > .color1":{stroke:"red"},"& > .s1, & > .color2":{stroke:"blue"},"& > .s2, & > .color3":{stroke:"green"}})}))),I=[function({x:e,y:t,a:s,randomClassCount:r,...a}){const l=p()("X");return h.createElement("svg",{className:"adrian",...a,__self:this,__source:{fileName:S,lineNumber:23}},(0,_.hS)(0,e).flatMap((e=>(0,_.hS)(0,t).flatMap((t=>h.createElement(b,{key:`sqr-${e}-${t}`,sides:4,radius:Math.SQRT1_2*s/10,transform:`translate(${e} ${t}) rotate(45)`,className:(0,d.Z)("r"+Math.floor(l()*r),"c0"),__self:this,__source:{fileName:S,lineNumber:26}}))))))},function({x:e,y:t,a:s,randomClassCount:r,...a}){const l=p()("X"),n=()=>"r"+Math.floor(l()*r),o=s/10;return h.createElement("svg",{className:"adrian",...a,__self:this,__source:{fileName:A,lineNumber:25}},(0,_.hS)(0,e).flatMap((e=>(0,_.hS)(0,t).flatMap((t=>{const s=(e,t)=>e+t/2+" "+.86666*t;return[h.createElement(b,{key:`${e}-${t}-l`,sides:3,sideLength:o,transform:`translate(${s(e+2/3-Math.floor(t/2),t+1/3)}) rotate(30)`,className:(0,d.Z)(n(),"c0","s0"),__self:this,__source:{fileName:A,lineNumber:35}}),h.createElement(b,{key:`${e}-${t}-r`,sides:3,sideLength:o,transform:`translate(${s(e+1/3-Math.floor(t/2),t+1)}) rotate(-30)`,className:(0,d.Z)(n(),"c0","s1"),__self:this,__source:{fileName:A,lineNumber:45}})]})))))},function({x:e,y:t,ordered:s,a:r,randomClassCount:a,...l}){const n=p()("X"),o=()=>"r"+Math.floor(n()*a),i=Math.tan(22.5*_.Co),m=Math.tan(45*_.Co),c=i*m/(i+m)*2*r/10;return h.createElement("svg",{className:"adrian",...l,__self:this,__source:{fileName:M,lineNumber:30}},(0,_.hS)(0,e).flatMap((e=>(0,_.hS)(0,t).flatMap((t=>{const s=2*(e+t%2*.5),r=.5*t*2;return[h.createElement(b,{key:`square-${e}-${t}`,sides:4,startAngle:Math.PI/4,sideLength:c,transform:`translate(${s} ${r}) `,className:(0,d.Z)(o(),"c0","s0"),__self:this,__source:{fileName:M,lineNumber:36}}),h.createElement(b,{key:`oct-${e}-${t}`,sides:8,startAngle:Math.PI/8,sideLength:c,transform:`translate(${s+1} ${r})`,className:(0,d.Z)(o(),"c1","s1"),__self:this,__source:{fileName:M,lineNumber:44}})]})))))},function({x:e,y:t,randomClassCount:s,ordered:r,a,...l}){const n=p()("X"),o=(e=0)=>"r"+Math.floor((0,_.uZ)(r?e:n(),0,.9999)*s),i=(0,g._x)(6,a/20);return h.createElement("svg",{className:"adrian",...l,__self:this,__source:{fileName:$,lineNumber:28}},(0,_.hS)(0,e).flatMap((e=>(0,_.hS)(0,t).map((t=>{const s=e-Math.floor(t/2),r=t;return h.createElement(b,{key:`hex-${e}-${t}-l`,sides:6,sideLength:i,transform:`translate(${((e,t)=>e+t/2+" "+.86666*t)(e-Math.floor(t/2),t)}) rotate(30)`,className:(0,d.Z)(o(Math.max(Math.abs(s-5),Math.abs(r-10),Math.abs(0-(s-5)-(r-10)))/15),"c0"),__self:this,__source:{fileName:$,lineNumber:41}})})))))},function({x:e,y:t,a:s,randomClassCount:r,ordered:a,...l}){const n=p()("X"),o=e=>"r"+Math.floor((a?e:n())*r),i=Math.sqrt(3)/2,m=2/Math.sqrt(3);return console.log(m),h.createElement("svg",{className:"adrian",...l,__self:this,__source:{fileName:k,lineNumber:29}},h.createElement("defs",{__self:this,__source:{fileName:k,lineNumber:30}},h.createElement("path",{id:"tile",style:{animation:"inherit"},className:"c0",d:g.nl`${[[270,.5],[300,m/2],[15,Math.SQRT2/2],[90,m/2],[165,Math.SQRT2/2],[240,m/2]].map((([e,t],r)=>(0===r?"M":"L")+g.nl`${_.V3.polar(t*s/10,e*_.Co)}`))}Z`,__self:this,__source:{fileName:k,lineNumber:31}})),(0,_.hS)(0,e).flatMap((s=>(0,_.hS)(0,t).map((r=>{const a=(s+r%2/2)*(2*i+1),l=r*(2*i+1)/2;return[[0,0,-60],[i,.5,30],[2*i,0,120],[i,-.5,210]].map((([s,r,n],i)=>h.createElement("use",{key:`t-${a}-${l}-${i}`,href:"#tile",transform:`translate(${a+s},${l+r})rotate(${n-30})`,className:(0,d.Z)(o((a+s+l+r)/(e+t)),"s"+i),__self:this,__source:{fileName:k,lineNumber:59}})))})))))},function({x:e,y:t,randomClassCount:s,ordered:r,a,...l}){const n=p()("X"),o=(e=0)=>"r"+Math.floor((0,_.uZ)(r?e:n(),0,.9999)*s),i=Math.tan(45*_.Co),m=Math.tan(30*_.Co),c=m*i/(m+i)*2*a/10,u=(0,g.oe)(6,1);return h.createElement("svg",{className:"adrian",...l,__self:this,__source:{fileName:L,lineNumber:33}},(0,_.hS)(0,e).flatMap((e=>(0,_.hS)(0,t).flatMap((t=>{const s=e-Math.floor(t/2),r=t,[a,l]=((e,t)=>[e+t/2,.86666*t])(2*s,2*r);return[h.createElement(b,{key:`hex-${a}-${l}-l`,sides:6,sideLength:c,transform:`translate(${a} ${l}) rotate(30)`,className:(0,d.Z)(o(Math.max(Math.abs(s-5),Math.abs(r-10),Math.abs(0-(s-5)-(r-10)))/15),"c0"),__self:this,__source:{fileName:L,lineNumber:47}}),h.createElement(b,{key:`sqr0-${a}-${l}-l`,sides:4,sideLength:c,transform:`translate(${a+1} ${l}) rotate(45)`,className:(0,d.Z)(o(),"c1","s0"),__self:this,__source:{fileName:L,lineNumber:63}}),h.createElement(b,{key:`sqr1-${a}-${l}-l`,sides:4,sideLength:c,transform:`translate(${a} ${l}) rotate(60) translate(1 0) rotate(45)`,className:(0,d.Z)(o(),"c1","s0"),__self:this,__source:{fileName:L,lineNumber:70}}),h.createElement(b,{key:`sqr2-${a}-${l}-l`,sides:4,sideLength:c,transform:`translate(${a} ${l}) rotate(120) translate(1 0) rotate(45)`,className:(0,d.Z)(o(),"c1","s0"),__self:this,__source:{fileName:L,lineNumber:77}}),h.createElement(b,{key:`tri0-${a}-${l}-l`,sides:3,sideLength:c,transform:`translate(${a} ${l}) rotate(30) translate(${u} 0) rotate(60)`,className:(0,d.Z)(o(),"c2","s1"),__self:this,__source:{fileName:L,lineNumber:84}}),h.createElement(b,{key:`tri1-${a}-${l}-l`,sides:3,sideLength:c,transform:`translate(${a} ${l}) rotate(90) translate(${u} 0) rotate(60)`,className:(0,d.Z)(o(),"c2","s1"),__self:this,__source:{fileName:L,lineNumber:91}})]})))))},function({x:e,y:t,randomClassCount:s,ordered:r,a,...l}){const n=p()("X"),o=(e=0)=>"r"+Math.floor((0,_.uZ)(r?e:n(),0,.9999)*s),i=((0,g._x)(6,a/20),(0,_.V)(0,-Z).plus(_.V3.polar(.2,162*_.Co))),m=(0,_.V)(0,-Z).plus(_.V3.polar(.2,18*_.Co)),c=(0,_.V)(0,Z).plus(_.V3.polar(.2,198*_.Co)),u=(0,_.V)(0,Z).plus(_.V3.polar(.2,-18*_.Co)),f=(0,_.V)(0,-x).plus(_.V3.polar(.2,36*_.Co)),N=(0,_.V)(0,x).plus(_.V3.polar(.2,-36*_.Co)),k=(0,_.V)(0,x).plus(_.V3.polar(.8,216*_.Co)),b=(0,_.V)(0,-x).plus(_.V3.polar(.8,144*_.Co)),$=_.M4.translate(v).scale(1/_.I4).translate(-v).rotateZ(Math.PI),M=_.M4.rotateZ(-36*_.Co).scale(1/_.I4).translate(v/2,x/2).rotateZ(Math.PI),y=_.M4.translate(0,-Z).scale(1/_.I4).rotateZ(-54*_.Co).translate(0,x).rotateZ(Math.PI),L=_.M4.rotateZ(Math.PI).translate(C,0).scale(1/_.I4).rotateZ(-72*_.Co).translate(0,Z),S=_.M4.rotateZ(Math.PI).translate(v,0).scale(1/_.I4).rotateZ(-18*_.Co).translate(0,Z),A=[];let P=0;const V=new Map,I=new Map;function q(e,t){const{x:s,y:r}=t.getTranslation();if(s<0||s>20||r<0||s>20)return!0;const a=(Math.round(100*s)<<16)+Math.round(100*r),l=e.get(a)||0;return e.set(a,l+1),0!==l}const T=({m:e})=>`matrix(${e[0]} ${e[4]} ${e[1]} ${e[5]} ${e[3]} ${e[7]} )`;function R(e,t,s,r){const{x:a,y:l}=t.getTranslation(),n=(Math.round(100*a)<<16)+Math.round(100*l);A.push({id:"id"+P,key:P++,href:e,transform:T(t),className:(0,d.Z)(o(),s),style:{animationDelay:P/100+"s"},visited:r,hash:n})}const X=(0,_.hS)(0,6).map((e=>_.M4.IDENTITY.copy()));function j(e,t=0){if(0===t){if(q(V,e))return;R("#thick",e,"",V)}else j(_.M4.multiply(e,$,X[t]),t-1),j(_.M4.multiply(e,M,X[t]),t-1),j(_.M4.multiply(e,M.mirrorY(),X[t]),t-1),W(_.M4.multiply(e,y.mirrorY(),X[t]),t-1),W(_.M4.multiply(e,y,X[t]),t-1)}function W(e,t=0){if(0===t){if(q(I,e))return;R("#thin",e,"color1",I)}else W(_.M4.multiply(e,L,X[t]),t-1),W(_.M4.multiply(e,L.mirroredX(),X[t]),t-1),j(_.M4.multiply(e,S.mirroredX(),X[t]),t-1),j(_.M4.multiply(e,S,X[t]),t-1)}console.time("x");for(let e=0;e<5;e++)j(_.M4.translate(v,0).rotateZ(e/5*_.gc).scale(10).translate(10,10),7);return console.timeEnd("x"),console.log("total tiles",A.length),h.createElement("svg",{className:"adrian",...l,__self:this,__source:{fileName:E,lineNumber:184}},h.createElement("defs",{__self:this,__source:{fileName:E,lineNumber:185}},h.createElement("g",{id:"thin",style:{animation:"inherit"},transform:`scale(${1-(1-a/10)*_.I4})`,__self:this,__source:{fileName:E,lineNumber:186}},!r&&h.createElement(w,{style:{animation:"inherit"},className:"c0 s1",cornersDeg:[[C,0],[Z,90],[C,180],[Z,270]],__self:this,__source:{fileName:E,lineNumber:192}}),r&&h.createElement(h.Fragment,null,h.createElement("path",{style:{animation:"inherit",stroke:"red"},className:"",d:g.nl`M${i}A0.2 0.2  0 0 0 ${m}`,__self:this,__source:{fileName:E,lineNumber:205}}),h.createElement("path",{style:{animation:"inherit",stroke:"blue"},className:"",d:g.nl`M${c}A0.2 0.2 0 0 1 ${u}`,__self:this,__source:{fileName:E,lineNumber:210}}))),h.createElement("g",{id:"thick",style:{animation:"inherit"},transform:`scale(${a/10})`,__self:this,__source:{fileName:E,lineNumber:218}},!r&&h.createElement(w,{cornersDeg:[[v,0],[x,90],[v,180],[x,270]],__self:this,__source:{fileName:E,lineNumber:224}}),r&&h.createElement(h.Fragment,null,h.createElement("path",{style:{animation:"inherit",stroke:"red"},className:"",d:g.nl`M${f}A0.8 0.8  0 0 0 ${N}`,__self:this,__source:{fileName:E,lineNumber:235}}),h.createElement("path",{style:{animation:"inherit",stroke:"blue"},className:"",d:g.nl`M${k}A0.2 0.2 0 0 0 ${b}`,__self:this,__source:{fileName:E,lineNumber:240}})))),A.map((({visited:e,hash:t,style:s,...r})=>h.createElement("use",{style:{...s,fillOpacity:Math.sqrt(.03*e.get(t))},...r,__self:this,__source:{fileName:E,lineNumber:250}}))))}];function q(){const[e,t]=(0,h.useState)(0),[s,u]=(0,h.useState)([]),d=((0,m.Z)(),(0,h.useRef)(null)),[N,p]=(0,f.q)({type:I[0].name,animation:"linear",a:1,fill:!0,ordered:!1,strokeWidth:.1,strokeLinejoin:"round",strokeLinecap:"round"}),g=null!=(k=I.find((e=>e.name===N.type)))?k:(()=>I[0])();var k;const b=(0,h.useCallback)((e=>p((t=>({...t,...e})))),[p]);(0,h.useEffect)((()=>{u((0,_.hS)(0,3).map((e=>function(e){let t,s=e[0],r=1;for(;r<e.length;){const a=e[r],l=e[r+1];if(r+=2,("optionalAccess"===a||"optionalCall"===a)&&null==s)return;"access"===a||"optionalAccess"===a?(t=s,s=l(s)):"call"!==a&&"optionalCall"!==a||(s=l(((...e)=>s.call(t,...e))),t=void 0)}return s}([d.current.querySelector(".c"+e),"optionalAccess",e=>e.getTotalLength,"call",e=>e()]))))}),[g,N.a]);const $=V({...N,shapeLengths:s});return h.createElement(n.ZP,{container:!0,style:{minHeight:"calc(100vh - 65px)"},spacing:1,__self:this,__source:{fileName:P,lineNumber:146}},h.createElement(n.ZP,{item:!0,xs:12,md:10,ref:d,__self:this,__source:{fileName:P,lineNumber:147}},h.createElement(g,{viewBox:"0 0 20 20",randomClassCount:20,className:$.svgg,x:20,y:20,width:"100%",height:"100%",style:{},key:e,a:N.a,ordered:N.ordered,__self:this,__source:{fileName:P,lineNumber:148}})),h.createElement(n.ZP,{item:!0,xs:12,md:2,container:!0,spacing:1,alignItems:"flex-start",style:{height:200},__self:this,__source:{fileName:P,lineNumber:163}},h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:172}},h.createElement(i.Z,{value:N.type,fullWidth:!0,onChange:e=>b({type:e.target.value}),__self:this,__source:{fileName:P,lineNumber:173}},I.map((({name:e})=>h.createElement(o.Z,{key:e,value:e,__self:this,__source:{fileName:P,lineNumber:180}},e))))),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:187}},h.createElement(i.Z,{value:N.animation,fullWidth:!0,onChange:e=>b({animation:e.target.value}),__self:this,__source:{fileName:P,lineNumber:188}},["linear","ease","ease-in","ease-out","ease-in-out","step-start","step-end"].map((e=>h.createElement(o.Z,{key:e,value:e,__self:this,__source:{fileName:P,lineNumber:204}},e))))),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:210}},h.createElement(i.Z,{value:N.strokeLinejoin,fullWidth:!0,onChange:e=>b({strokeLinejoin:e.target.value}),label:"strokeLinejoin",__self:this,__source:{fileName:P,lineNumber:211}},["bevel","miter","round"].map((e=>h.createElement(o.Z,{key:e,value:e,__self:this,__source:{fileName:P,lineNumber:220}},e))))),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:226}},h.createElement(i.Z,{value:N.strokeLinecap,fullWidth:!0,onChange:e=>b({strokeLinecap:e.target.value}),label:"strokeLinecap",__self:this,__source:{fileName:P,lineNumber:227}},["butt","round","square"].map((e=>h.createElement(o.Z,{key:e,value:e,__self:this,__source:{fileName:P,lineNumber:236}},e))))),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:242}},h.createElement(r.Z,{fullWidth:!0,onClick:()=>t((e=>e+1)),__self:this,__source:{fileName:P,lineNumber:243}},"Replay")),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:247}},h.createElement(c.Z,{variant:"outlined",size:"small",type:"number",value:N.a,onChange:e=>b({a:+e.target.value}),label:"a",__self:this,__source:{fileName:P,lineNumber:248}})),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:257}},s),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:260}},h.createElement(l.Z,{control:h.createElement(a.Z,{checked:N.fill,onChange:(e,t)=>b({fill:t}),color:"primary",__self:this,__source:{fileName:P,lineNumber:263}}),label:"fill",__self:this,__source:{fileName:P,lineNumber:261}})),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:272}},h.createElement(l.Z,{control:h.createElement(a.Z,{checked:N.ordered,onChange:(e,t)=>b({ordered:t}),color:"primary",__self:this,__source:{fileName:P,lineNumber:275}}),label:"ordered",__self:this,__source:{fileName:P,lineNumber:273}})),h.createElement(n.ZP,{item:!0,xs:12,__self:this,__source:{fileName:P,lineNumber:284}},h.createElement(c.Z,{variant:"outlined",size:"small",inputProps:{step:.005},type:"number",value:N.strokeWidth,onChange:e=>b({strokeWidth:+e.target.value}),label:"strokeWidth",__self:this,__source:{fileName:P,lineNumber:285}}))))}},5042:()=>{}}]);