(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[596],{4341:(e,t,a)=>{"use strict";a.d(t,{q:()=>d});var r=a(6897),n=a.n(r),s=a(508),o=a.n(s),l=a(9526),i=a(6333);const c=e=>e?e.substring(1).split("&").map((e=>{const[t,a]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(a)]})).reduce(((e,[t,a])=>(e[t]=a,e)),{}):{},m=e=>"#"+Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&"),u=e=>o()(e,((e,t)=>{if("paperSize"!==t)return"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:""===e?"":isNaN(+e)?e:+e);try{return(0,i.nA)(e)}catch(e){return console.error(e),i.t1}})),h=e=>o()(e,((e,t)=>"paperSize"===t?(0,i.$Q)(e):""+e));function d(e,{deserialize:t=u,serialize:a=h,wait:r=1e3}={}){const s=(0,l.useCallback)((()=>{const r="function"==typeof e?e():e,n=t(Object.assign(a(r),c(document.location.hash)));return console.log("replaceState"),history.replaceState(void 0,document.title,m(a(n))),n}),[t,e,a]),[o,i]=(0,l.useState)(s),d=(0,l.useRef)();return(0,l.useEffect)((()=>function(e){let t,a=e[0],r=1;for(;r<e.length;){const n=e[r],s=e[r+1];if(r+=2,("optionalAccess"===n||"optionalCall"===n)&&null==a)return;"access"===n||"optionalAccess"===n?(t=a,a=s(a)):"call"!==n&&"optionalCall"!==n||(a=s(((...e)=>a.call(t,...e))),t=void 0)}return a}([d,"access",e=>e.current,"optionalCall",e=>e(o)])),[o]),d.current||(console.log("pushState"),d.current=n()((function(e){history.pushState(void 0,document.title,m(a(e)))}),r)),(0,l.useEffect)((()=>{const e=()=>{i(s())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[s]),[o,i]}},6333:(e,t,a)=>{"use strict";a.d(t,{$Q:()=>c,PN:()=>i,TL:()=>s,li:()=>o,nA:()=>l,t1:()=>m});var r=a(2182);const n=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"]],s=[[917,1297,"C0"],[648,917,"C1"],[458,648,"C2"],[324,458,"C3"],[229,324,"C4"],[162,229,"C5"],[114,162,"C6"],[81,114,"C7"],[57,81,"C8"],[40,57,"C9"],[28,40,"C10"]],o=[...n,[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]];function l(e){const t=o.find((([,,t])=>t===e));if(t)return t;const[a,r]=e.split("x");return[+a,+r,"Custom"]}function i(e,t){return[e,t]=[e,t].sort(r.uK),null!=(a=o.find((([a,r])=>a===e&&r===t)))?a:(()=>[e,t,"Custom"])();var a}function c([e,t,a]){return"Custom"===a?e+"x"+t:a}const m=n[4]},6415:(e,t,a)=>{"use strict";a.d(t,{PM:()=>o,Qn:()=>c,X$:()=>l,XJ:()=>i,YQ:()=>f,_x:()=>h,hv:()=>d,kC:()=>p,oe:()=>u,q3:()=>m});var r=a(9526),n=a(2182),s=a(5609);const o=25.4,l=e=>(0,n.At)(e/n.Co,-1)+"°",i=(e,t)=>t/2/Math.sin(n.gc/e/2),c=(e,t)=>2*t*Math.sin(n.gc/e/2),m=(e,t)=>t/2/Math.tan(n.gc/e/2),u=(e,t)=>t/Math.cos(n.gc/e/2),h=(e,t)=>2*t*Math.tan(n.gc/e/2);function d({sides:e,radius:t,startAngle:a=0,sideLength:o,...l}){if(void 0!==o==(void 0!==t))throw new Error("must set either sideLength or radius");return void 0===t&&(t=i(e,o)),r.createElement("path",{d:(0,s.c)((0,s.M)(n.V3.polar(t,a)),...(0,n.hS)(0,e).map((r=>(0,s.L)(n.V3.polar(t,a+r*(n.gc/e))))),(0,s.Z)()),...l})}function p({id:e,children:t,count:a,stepDeg:s}){return r.createElement(r.Fragment,null,r.createElement("g",{id:e},t),(0,n.hS)(0,a-1).map((a=>r.createElement("g",{id:`${e}-${a}`,key:`${e}-${a}`,transform:`rotate(${(a+1)*s} 0 0)`},t))))}const f=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},5609:(e,t,a)=>{"use strict";a.d(t,{A:()=>s,H:()=>n,L:()=>i,M:()=>l,V:()=>o,Z:()=>m,c:()=>u,l:()=>c});var r=a(4065);function n(e){return{type:r.OU.HORIZ_LINE_TO,relative:!1,x:e}}function s(e,t,a,n,s,o){return{lArcFlag:n,rX:e,rY:t,relative:!1,sweepFlag:s,type:r.OU.ARC,x:o.x,xRot:0,y:o.y}}const o=e=>({type:r.OU.VERT_LINE_TO,y:e,relative:!1});function l(e,t){const[a,n]=void 0===t?[e.x,e.y]:[e,t];return{type:r.OU.MOVE_TO,x:a,y:n,relative:!1}}function i(e,t){const[a,n]=void 0===t?[e.x,e.y]:[e,t];return{type:r.OU.LINE_TO,x:a,y:n,relative:!1}}const c=(e,t)=>({type:r.OU.LINE_TO,x:e,y:t,relative:!0}),m=()=>({type:r.OU.CLOSE_PATH}),u=(...e)=>new r.OU(e).round(3).encode()},2729:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>V});var r=a(3635),n=a(8864),s=a(6726),o=a(8686),l=a(871),i=a(897),c=a(882),m=a(3121),u=a(9526),h=a(2182),d=a(4341),p=a(512),f=a(2474),g=a.n(f),y=a(5609),M=a(6415);function E({sides:e,radius:t,startAngle:a=0,sideLength:r,...n}){if(void 0!==r==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=(0,M.XJ)(e,r));const s=(0,M.q3)(e,(0,M.Qn)(e,t)),{x:o,y:l}=h.V3.polar(s,a-h.gc/e/2);return u.createElement("path",{d:(0,y.c)((0,y.M)(o,l),...(0,h.hS)(0,e).map((r=>(0,y.L)(h.V3.polar(t,a+r*(h.gc/e))))),(0,y.Z)()),...n})}var C=a(275),$=a.n(C);const k=Math.cos(18*h.Co),v=Math.sin(18*h.Co),Z=Math.cos(36*h.Co),x=Math.sin(36*h.Co);function L({cornersDeg:e,...t}){const[a,r]=e[0],[n,s]=$()(e),o=h.V3.polar(a,r*h.Co).lerp(h.V3.polar(n,s*h.Co),.5);return u.createElement("path",{...t,style:{animation:"inherit"},className:"c1 s2",d:(0,y.c)((0,y.M)(o),...e.map((([e,t],a)=>(0,y.L)(h.V3.polar(e,t*h.Co)))),(0,y.Z)())})}const N=3,S=20,A=({animation:e,strokeWidth:t,strokeLinejoin:a,strokeLinecap:n,fill:s,shapeLengths:o})=>u.createElement(r.Z,{styles:{"@keyframes dash":{to:{strokeDashoffset:0}},"@keyframes popp":{from:{fil:"none"},to:{}},...(0,h.hS)(0,N).reduce(((e,t)=>(e[`.c${t}`]={strokeDasharray:o[t],strokeDashoffset:o[t]},e)),{}),...(0,h.hS)(0,S).reduce(((t,a)=>{const r=1+a/S*3+"s";return t[`.r${a}, .r${a} path`]={animation:[`dash 3s ${e} forwards`,s&&`popp ${r} step-end forwards`].filter(Boolean).join(","),animationDelay:.1*a+"s"},t}),{}),".svgg":{"& > *":{fill:s?"orange":void 0,fillOpacity:.5,stroke:"orange",strokeWidth:t,strokeLinecap:n,strokeLinejoin:a,strokePosition:"inside"},"& > .s0, & > .color1":{stroke:"red"},"& > .s1, & > .color2":{stroke:"blue"},"& > .s2, & > .color3":{stroke:"green"}}}}),b=[function({x:e,y:t,a,ordered:r,randomClassCount:n,...s}){const o=g()("X");return u.createElement("svg",{className:"adrian",...s},(0,h.hS)(0,e).flatMap((e=>(0,h.hS)(0,t).flatMap((t=>u.createElement(E,{key:`sqr-${e}-${t}`,sides:4,radius:Math.SQRT1_2*a/10,transform:`translate(${e} ${t}) rotate(45)`,className:(0,p.Z)("r"+Math.floor(o()*n),"c0")}))))))},function({x:e,y:t,a,randomClassCount:r,...n}){const s=g()("X"),o=()=>"r"+Math.floor(s()*r),l=a/10;return u.createElement("svg",{className:"adrian",...n},(0,h.hS)(0,e).flatMap((e=>(0,h.hS)(0,t).flatMap((t=>{const a=(e,t)=>e+t/2+" "+.86666*t;return[u.createElement(E,{key:`${e}-${t}-l`,sides:3,sideLength:l,transform:`translate(${a(e+2/3-Math.floor(t/2),t+1/3)}) rotate(30)`,className:(0,p.Z)(o(),"c0","s0")}),u.createElement(E,{key:`${e}-${t}-r`,sides:3,sideLength:l,transform:`translate(${a(e+1/3-Math.floor(t/2),t+1)}) rotate(-30)`,className:(0,p.Z)(o(),"c0","s1")})]})))))},function({x:e,y:t,ordered:a,a:r,randomClassCount:n,...s}){const o=g()("X"),l=()=>"r"+Math.floor(o()*n),i=Math.tan(22.5*h.Co),c=Math.tan(45*h.Co),m=i*c/(i+c)*2*r/10;return u.createElement("svg",{className:"adrian",...s},(0,h.hS)(0,e).flatMap((e=>(0,h.hS)(0,t).flatMap((t=>{const a=2*(e+t%2*.5),r=.5*t*2;return[u.createElement(E,{key:`square-${e}-${t}`,sides:4,startAngle:Math.PI/4,sideLength:m,transform:`translate(${a} ${r}) `,className:(0,p.Z)(l(),"c0","s0")}),u.createElement(E,{key:`oct-${e}-${t}`,sides:8,startAngle:Math.PI/8,sideLength:m,transform:`translate(${a+1} ${r})`,className:(0,p.Z)(l(),"c1","s1")})]})))))},function({x:e,y:t,randomClassCount:a,ordered:r,a:n,...s}){const o=g()("X"),l=(e=0)=>"r"+Math.floor((0,h.uZ)(r?e:o(),0,.9999)*a),i=(0,M._x)(6,n/20);return u.createElement("svg",{className:"adrian",...s},(0,h.hS)(0,e).flatMap((e=>(0,h.hS)(0,t).map((t=>{const a=e-Math.floor(t/2),r=t;return u.createElement(E,{key:`hex-${e}-${t}-l`,sides:6,sideLength:i,transform:`translate(${((e,t)=>e+t/2+" "+.86666*t)(e-Math.floor(t/2),t)}) rotate(30)`,className:(0,p.Z)(l(Math.max(Math.abs(a-5),Math.abs(r-10),Math.abs(0-(a-5)-(r-10)))/15),"c0")})})))))},function({x:e,y:t,a,randomClassCount:r,ordered:n,...s}){const o=g()("X"),l=e=>"r"+Math.floor((n?e:o())*r),i=Math.sqrt(3)/2,c=2/Math.sqrt(3);return console.log(c),u.createElement("svg",{className:"adrian",...s},u.createElement("defs",null,u.createElement("path",{id:"tile",style:{animation:"inherit"},className:"c0",d:(0,y.c)(...[[270,.5],[300,c/2],[15,Math.SQRT2/2],[90,c/2],[165,Math.SQRT2/2],[240,c/2]].map((([e,t],r)=>(0===r?y.M:y.L)(h.V3.polar(t*a/10,e*h.Co)))),(0,y.Z)())})),(0,h.hS)(0,e).flatMap((a=>(0,h.hS)(0,t).map((r=>{const n=(a+r%2/2)*(2*i+1),s=r*(2*i+1)/2;return[[0,0,-60],[i,.5,30],[2*i,0,120],[i,-.5,210]].map((([a,r,o],i)=>u.createElement("use",{key:`t-${n}-${s}-${i}`,href:"#tile",transform:`translate(${n+a},${s+r})rotate(${o-30})`,className:(0,p.Z)(l((n+a+s+r)/(e+t)),"s"+i)})))})))))},function({x:e,y:t,randomClassCount:a,ordered:r,a:n,...s}){const o=g()("X"),l=(e=0)=>"r"+Math.floor((0,h.uZ)(r?e:o(),0,.9999)*a),i=Math.tan(45*h.Co),c=Math.tan(30*h.Co),m=c*i/(c+i)*2*n/10,d=(0,M.oe)(6,1);return u.createElement("svg",{className:"adrian",...s},(0,h.hS)(0,e).flatMap((e=>(0,h.hS)(0,t).flatMap((t=>{const a=e-Math.floor(t/2),r=t,[n,s]=((e,t)=>[e+t/2,.86666*t])(2*a,2*r);return[u.createElement(E,{key:`hex-${n}-${s}-l`,sides:6,sideLength:m,transform:`translate(${n} ${s}) rotate(30)`,className:(0,p.Z)(l(Math.max(Math.abs(a-5),Math.abs(r-10),Math.abs(0-(a-5)-(r-10)))/15),"c0")}),u.createElement(E,{key:`sqr0-${n}-${s}-l`,sides:4,sideLength:m,transform:`translate(${n+1} ${s}) rotate(45)`,className:(0,p.Z)(l(),"c1","s0")}),u.createElement(E,{key:`sqr1-${n}-${s}-l`,sides:4,sideLength:m,transform:`translate(${n} ${s}) rotate(60) translate(1 0) rotate(45)`,className:(0,p.Z)(l(),"c1","s0")}),u.createElement(E,{key:`sqr2-${n}-${s}-l`,sides:4,sideLength:m,transform:`translate(${n} ${s}) rotate(120) translate(1 0) rotate(45)`,className:(0,p.Z)(l(),"c1","s0")}),u.createElement(E,{key:`tri0-${n}-${s}-l`,sides:3,sideLength:m,transform:`translate(${n} ${s}) rotate(30) translate(${d} 0) rotate(60)`,className:(0,p.Z)(l(),"c2","s1")}),u.createElement(E,{key:`tri1-${n}-${s}-l`,sides:3,sideLength:m,transform:`translate(${n} ${s}) rotate(90) translate(${d} 0) rotate(60)`,className:(0,p.Z)(l(),"c2","s1")})]})))))},function({x:e,y:t,randomClassCount:a,ordered:r,a:n,...s}){const o=g()("X"),l=(e=0)=>"r"+Math.floor((0,h.uZ)(r?e:o(),0,.9999)*a),i=((0,M._x)(6,n/20),(0,h.V)(0,-v).plus(h.V3.polar(.2,162*h.Co))),c=(0,h.V)(0,-v).plus(h.V3.polar(.2,18*h.Co)),m=(0,h.V)(0,v).plus(h.V3.polar(.2,198*h.Co)),d=(0,h.V)(0,v).plus(h.V3.polar(.2,-18*h.Co)),f=(0,h.V)(0,-x).plus(h.V3.polar(.2,36*h.Co)),E=(0,h.V)(0,x).plus(h.V3.polar(.2,-36*h.Co)),C=(0,h.V)(0,x).plus(h.V3.polar(.8,216*h.Co)),$=(0,h.V)(0,-x).plus(h.V3.polar(.8,144*h.Co)),N=h.M4.translate(Z).scale(1/h.I4).translate(-Z).rotateZ(Math.PI),S=h.M4.rotateZ(-36*h.Co).scale(1/h.I4).translate(Z/2,x/2).rotateZ(Math.PI),A=h.M4.translate(0,-v).scale(1/h.I4).rotateZ(-54*h.Co).translate(0,x).rotateZ(Math.PI),b=h.M4.rotateZ(Math.PI).translate(k,0).scale(1/h.I4).rotateZ(-72*h.Co).translate(0,v),V=h.M4.rotateZ(Math.PI).translate(Z,0).scale(1/h.I4).rotateZ(-18*h.Co).translate(0,v),I=[];let P=0;const w=new Map,O=new Map;function T(e,t){const{x:a,y:r}=t.getTranslation();if(a<0||a>20||r<0||a>20)return!0;const n=(Math.round(100*a)<<16)+Math.round(100*r),s=e.get(n)||0;return e.set(n,s+1),0!==s}const q=({m:e})=>`matrix(${e[0]} ${e[4]} ${e[1]} ${e[5]} ${e[3]} ${e[7]} )`;function R(e,t,a,r){const{x:n,y:s}=t.getTranslation(),o=(Math.round(100*n)<<16)+Math.round(100*s);I.push({id:"id"+P,key:P++,href:e,transform:q(t),className:(0,p.Z)(l(),a),style:{animationDelay:P/100+"s"},visited:r,hash:o})}const X=(0,h.hS)(0,6).map((e=>h.M4.IDENTITY.copy()));function _(e,t=0){if(0===t){if(T(w,e))return;R("#thick",e,"",w)}else _(h.M4.multiply(e,N,X[t]),t-1),_(h.M4.multiply(e,S,X[t]),t-1),_(h.M4.multiply(e,S.mirrorY(),X[t]),t-1),U(h.M4.multiply(e,A.mirrorY(),X[t]),t-1),U(h.M4.multiply(e,A,X[t]),t-1)}function U(e,t=0){if(0===t){if(T(O,e))return;R("#thin",e,"color1",O)}else U(h.M4.multiply(e,b,X[t]),t-1),U(h.M4.multiply(e,b.mirroredX(),X[t]),t-1),_(h.M4.multiply(e,V.mirroredX(),X[t]),t-1),_(h.M4.multiply(e,V,X[t]),t-1)}console.time("x");for(let e=0;e<5;e++)_(h.M4.translate(Z,0).rotateZ(e/5*h.gc).scale(10).translate(10,10),7);return console.timeEnd("x"),console.log("total tiles",I.length),u.createElement("svg",{className:"adrian",...s},u.createElement("defs",null,u.createElement("g",{id:"thin",style:{animation:"inherit"},transform:`scale(${1-(1-n/10)*h.I4})`},!r&&u.createElement(L,{style:{animation:"inherit"},className:"c0 s1",cornersDeg:[[k,0],[v,90],[k,180],[v,270]]}),r&&u.createElement(u.Fragment,null,u.createElement("path",{style:{animation:"inherit",stroke:"red"},className:"",d:(0,y.c)((0,y.M)(i),(0,y.A)(.2,.2,0,0,0,c))}),u.createElement("path",{style:{animation:"inherit",stroke:"blue"},className:"",d:(0,y.c)((0,y.M)(m),(0,y.A)(.2,.2,0,0,1,d))}))),u.createElement("g",{id:"thick",style:{animation:"inherit"},transform:`scale(${n/10})`},!r&&u.createElement(L,{cornersDeg:[[Z,0],[x,90],[Z,180],[x,270]]}),r&&u.createElement(u.Fragment,null,u.createElement("path",{style:{animation:"inherit",stroke:"red"},className:"",d:(0,y.c)((0,y.M)(f),(0,y.A)(.8,.8,0,0,0,E))}),u.createElement("path",{style:{animation:"inherit",stroke:"blue"},className:"",d:(0,y.c)((0,y.M)(C),(0,y.A)(.2,.2,0,0,0,$))})))),I.map((({visited:e,hash:t,style:a,...r})=>u.createElement("use",{style:{...a,fillOpacity:Math.sqrt(.03*e.get(t))},...r}))))}];function V(){const[e,t]=(0,u.useState)(0),[a,r]=(0,u.useState)([]),p=(0,u.useRef)(null),[f,g]=(0,d.q)({type:b[0].name,animation:"linear",a:1,fill:!0,ordered:!1,strokeWidth:.1,strokeLinejoin:"round",strokeLinecap:"round"}),y=null!=(M=b.find((e=>e.name===f.type)))?M:(()=>b[0])();var M;const E=(0,u.useCallback)((e=>g((t=>({...t,...e})))),[g]);return(0,u.useEffect)((()=>{r((0,h.hS)(0,N).map((e=>function(e){let t,a=e[0],r=1;for(;r<e.length;){const n=e[r],s=e[r+1];if(r+=2,("optionalAccess"===n||"optionalCall"===n)&&null==a)return;"access"===n||"optionalAccess"===n?(t=a,a=s(a)):"call"!==n&&"optionalCall"!==n||(a=s(((...e)=>a.call(t,...e))),t=void 0)}return a}([p.current.querySelector(".c"+e),"optionalAccess",e=>e.getTotalLength,"call",e=>e()]))))}),[y,f.a]),u.createElement(l.ZP,{container:!0,style:{minHeight:"calc(100vh - 65px)"},spacing:1},A({...f,shapeLengths:a}),u.createElement(l.ZP,{item:!0,xs:12,md:10,ref:p},u.createElement(y,{viewBox:"0 0 20 20",randomClassCount:S,className:"svgg",x:20,y:20,width:"100%",height:"100%",style:{},key:e,a:f.a,ordered:f.ordered})),u.createElement(l.ZP,{item:!0,xs:12,md:2,container:!0,spacing:1,alignItems:"flex-start",style:{height:200}},u.createElement(l.ZP,{item:!0,xs:12},u.createElement(c.Z,{value:f.type,fullWidth:!0,onChange:e=>E({type:e.target.value})},b.map((({name:e})=>u.createElement(i.Z,{key:e,value:e},e))))),u.createElement(l.ZP,{item:!0,xs:12},u.createElement(c.Z,{value:f.animation,fullWidth:!0,onChange:e=>E({animation:e.target.value})},["linear","ease","ease-in","ease-out","ease-in-out","step-start","step-end"].map((e=>u.createElement(i.Z,{key:e,value:e},e))))),u.createElement(l.ZP,{item:!0,xs:12},u.createElement(c.Z,{value:f.strokeLinejoin,fullWidth:!0,onChange:e=>E({strokeLinejoin:e.target.value}),label:"strokeLinejoin"},["bevel","miter","round"].map((e=>u.createElement(i.Z,{key:e,value:e},e))))),u.createElement(l.ZP,{item:!0,xs:12},u.createElement(c.Z,{value:f.strokeLinecap,fullWidth:!0,onChange:e=>E({strokeLinecap:e.target.value}),label:"strokeLinecap"},["butt","round","square"].map((e=>u.createElement(i.Z,{key:e,value:e},e))))),u.createElement(l.ZP,{item:!0,xs:12},u.createElement(n.Z,{fullWidth:!0,onClick:()=>t((e=>e+1))},"Replay")),u.createElement(l.ZP,{item:!0,xs:12},u.createElement(m.Z,{variant:"outlined",size:"small",type:"number",value:f.a,onChange:e=>E({a:+e.target.value}),label:"a"})),u.createElement(l.ZP,{item:!0,xs:12},a),u.createElement(l.ZP,{item:!0,xs:12},u.createElement(o.Z,{control:u.createElement(s.Z,{checked:f.fill,onChange:(e,t)=>E({fill:t}),color:"primary"}),label:"fill"})),u.createElement(l.ZP,{item:!0,xs:12},u.createElement(o.Z,{control:u.createElement(s.Z,{checked:f.ordered,onChange:(e,t)=>E({ordered:t}),color:"primary"}),label:"ordered"})),u.createElement(l.ZP,{item:!0,xs:12},u.createElement(m.Z,{variant:"outlined",size:"small",inputProps:{step:.005},type:"number",value:f.strokeWidth,onChange:e=>E({strokeWidth:+e.target.value}),label:"strokeWidth"}))))}},5042:()=>{}}]);
//# sourceMappingURL=tiles-index.js.map