"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[585],{4341:(e,t,n)=>{n.d(t,{q:()=>u});var a=n(6897),r=n.n(a),o=n(508),l=n.n(o),i=n(9526),s=n(6333);const c=e=>e?e.substring(1).split("&").map((e=>{const[t,n]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(n)]})).reduce(((e,[t,n])=>(e[t]=n,e)),{}):{},d=e=>"#"+Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&"),m=e=>l()(e,((e,t)=>{if("paperSize"!==t)return"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:""===e?"":isNaN(+e)?e:+e);try{return(0,s.nA)(e)}catch(e){return console.error(e),s.t1}})),p=e=>l()(e,((e,t)=>"paperSize"===t?(0,s.$Q)(e):""+e));function u(e,{deserialize:t=m,serialize:n=p,wait:a=1e3}={}){const o=(0,i.useCallback)((()=>{const a="function"==typeof e?e():e,r=t(Object.assign(n(a),c(document.location.hash)));return console.log("replaceState"),history.replaceState(void 0,document.title,d(n(r))),r}),[t,e,n]),[l,s]=(0,i.useState)(o),u=(0,i.useRef)();return(0,i.useEffect)((()=>function(e){let t,n=e[0],a=1;for(;a<e.length;){const r=e[a],o=e[a+1];if(a+=2,("optionalAccess"===r||"optionalCall"===r)&&null==n)return;"access"===r||"optionalAccess"===r?(t=n,n=o(n)):"call"!==r&&"optionalCall"!==r||(n=o(((...e)=>n.call(t,...e))),t=void 0)}return n}([u,"access",e=>e.current,"optionalCall",e=>e(l)])),[l]),u.current||(console.log("pushState"),u.current=r()((function(e){history.pushState(void 0,document.title,d(n(e)))}),a)),(0,i.useEffect)((()=>{const e=()=>{s(o())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[o]),[l,s]}},6623:(e,t,n)=>{n.d(t,{F:()=>c});var a=n(8864),r=n(1413),o=n.n(r),l=n(9526),i=n(2279),s=n(9536);function c({what:e,baseFileName:t}){const r=()=>i.renderToStaticMarkup(l.createElement(s.kM.Provider,{value:!0},e)).replace(/\s{2,}/g," ");return l.createElement(l.Fragment,null,l.createElement(a.Z,{variant:"contained",onClick:()=>{const e=r();o()(e,t+".svg")}},"Download As SVG"),l.createElement(a.Z,{variant:"contained",onClick:async()=>{const{svgToPdf:e}=await Promise.all([n.e(853),n.e(898)]).then(n.bind(n,2566)),a=await e({title:t,author:"Adrian Leonhard",svg:r()});o()(a,t+".pdf")}},"Template as PDF"))}},9536:(e,t,n)=>{n.d(t,{UH:()=>i,fD:()=>l,kM:()=>o});var a=n(9526),r=n(2182);const o=(0,a.createContext)(!1);function l({children:e,...t}){return(0,a.useContext)(o)?null:a.createElement("g",{className:"guide",...t},e)}function i({from:e,to:t,children:n,R:l,hideRight:i=!1,offset:s=0}){Array.isArray(e)&&(e=(0,r.V)(e)),Array.isArray(t)&&(t=(0,r.V)(t));const c=e.to(t),d=c.length();if((0,a.useContext)(o))return null;if(d<.05)return null;n||=(l?"R":"")+(0,r.At)(d,-1);const m=3*n.length;return a.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${c.angleXY()/r.Co}) translate(0, ${10*s})`,className:"measure"},!i&&a.createElement("path",{style:{fill:"none"},d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2"}),a.createElement("path",{style:{fill:"none"},d:`\n        M0,5\n        H${(d-m)/2}\n        M${(d+m)/2},5\n        H${d}\n        M${d},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`}),a.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:d/2,y:5},n))}},5768:(e,t,n)=>{n.d(t,{G:()=>i});var a=n(9526),r=n(2182),o=n(6415),l=n(9536);function i({center:e,start:t,toRel:n,children:i}){if(Array.isArray(e)&&(e=(0,r.V)(e)),(0,a.useContext)(l.kM))return null;const s=r.V3.polar(20,t).plus((0,r.V)(e)),c=r.V3.polar(20,t+n).plus((0,r.V)(e)),d=r.V3.polar(14,t+n/2).plus((0,r.V)(e)),m=Math.abs(n)>Math.PI?"1":"0",p=n>0?"1":"0";return a.createElement("g",{className:"measure"},a.createElement("path",{style:{fill:"none"},d:`M${s.x},${s.y} A20,20,0,${m},${p},${c.x},${c.y}`}),a.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:d.x,y:d.y},null!=(u=i)?u:(()=>(0,o.X$)(n))()));var u}},3758:(e,t,n)=>{n.d(t,{W:()=>i});var a=n(302),r=n(3121),o=n(9526),l=n(6333);const i=(0,o.forwardRef)((({disableClearance:e=!1,onChange:t,value:n,label:i},s)=>{let c=null;if(n){const[e,t]=n;c=(0,l.PN)(e,t)}return o.createElement(a.Z,{ref:s,disableClearable:e,size:"small",freeSolo:!0,renderInput:e=>o.createElement(r.Z,{...e,label:i,variant:"outlined"}),value:c,onChange:(n,a)=>{if("string"==typeof a)if(""===a.trim())e||t(null);else{const e=/(\d+(?:\.\d+)?)\D*?(\d+(?:\.\d+)?)?\D*$/.exec(a);if(e){const[,n,a]=e;t((0,l.PN)(+n,+(a||n)))}}else t(a)},getOptionLabel:e=>{const[t,n,a="custom"]=e;return`${a} ${t}x${n}mm`},options:l.li})}))},6333:(e,t,n)=>{n.d(t,{$Q:()=>c,PN:()=>s,TL:()=>o,li:()=>l,nA:()=>i,t1:()=>d});var a=n(2182);const r=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"]],o=[[917,1297,"C0"],[648,917,"C1"],[458,648,"C2"],[324,458,"C3"],[229,324,"C4"],[162,229,"C5"],[114,162,"C6"],[81,114,"C7"],[57,81,"C8"],[40,57,"C9"],[28,40,"C10"]],l=[...r,[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]];function i(e){const t=l.find((([,,t])=>t===e));if(t)return t;const[n,a]=e.split("x");return[+n,+a,"Custom"]}function s(e,t){return[e,t]=[e,t].sort(a.uK),null!=(n=l.find((([n,a])=>n===e&&a===t)))?n:(()=>[e,t,"Custom"])();var n}function c([e,t,n]){return"Custom"===n?e+"x"+t:n}const d=r[4]},5730:(e,t,n)=>{n.d(t,{r:()=>m});var a=n(4466),r=n(9817),o=n(1456),l=n(3569),i=n(4068),s=n(8051),c=n(9526),d=n(9536);const m=()=>{const e=(0,s.Z)(),t=(0,c.useContext)(d.kM),n=(0,c.useMemo)((()=>`\n.adrian * { stroke: ${e.palette.text.primary}; }\n.adrian .red-stroke { stroke: ${a.Z[500]}; }\n.adrian .orange-stroke { stroke: ${r.Z[500]}; }\n.adrian .blue-stroke { stroke: ${o.Z[500]}; }\n.adrian .green-stroke { stroke: ${l.Z[500]}; }\n.adrian .pink-stroke { stroke: ${i.Z[500]}; }\n.adrian .measure, *.measure * {\n  stroke: ${e.palette.primary.main};\n  fill: ${e.palette.primary.main};\n}\n.adrian .guide, .adrian .guide * {\n  stroke: ${e.palette.secondary.main};\n  fill: ${e.palette.secondary.main};\n}\n.adrian .glue, .adrian .guide .glue {\n  stroke: none;\n  fill: url(#glue);\n}\n`),[e]);return c.createElement(c.Fragment,null,c.createElement("defs",null,c.createElement("pattern",{id:"glue",patternUnits:"userSpaceOnUse",width:"4",height:"4"},c.createElement("path",{d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",style:{stroke:e.palette.divider,strokeWidth:1}}))),c.createElement("style",null,"\n      .adrian * {\n        stroke: black;\n        stroke-width: .05mm;\n        fill: none;\n      }\n      .mountain, .mountain * { stroke-dasharray: 10,2,1,1,1,2; }\n      .valley, .valley * { stroke-dasharray: 1,1; }\n      .cut, .cut * { stroke: 1; }\n      "),!t&&c.createElement("style",null,n))}},6415:(e,t,n)=>{n.d(t,{PM:()=>l,Qn:()=>c,X$:()=>i,XJ:()=>s,YQ:()=>g,_x:()=>p,hv:()=>u,kC:()=>h,oe:()=>m,q3:()=>d});var a=n(9526),r=n(2182),o=n(5609);const l=25.4,i=e=>(0,r.At)(e/r.Co,-1)+"°",s=(e,t)=>t/2/Math.sin(r.gc/e/2),c=(e,t)=>2*t*Math.sin(r.gc/e/2),d=(e,t)=>t/2/Math.tan(r.gc/e/2),m=(e,t)=>t/Math.cos(r.gc/e/2),p=(e,t)=>2*t*Math.tan(r.gc/e/2);function u({sides:e,radius:t,startAngle:n=0,sideLength:l,...i}){if(void 0!==l==(void 0!==t))throw new Error("must set either sideLength or radius");return void 0===t&&(t=s(e,l)),a.createElement("path",{d:(0,o.c)((0,o.M)(r.V3.polar(t,n)),...(0,r.hS)(0,e).map((a=>(0,o.L)(r.V3.polar(t,n+a*(r.gc/e))))),(0,o.Z)()),...i})}function h({id:e,children:t,count:n,stepDeg:o}){return a.createElement(a.Fragment,null,a.createElement("g",{id:e},t),(0,r.hS)(0,n-1).map((n=>a.createElement("g",{id:`${e}-${n}`,key:`${e}-${n}`,transform:`rotate(${(n+1)*o} 0 0)`},t))))}const g=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},8983:(e,t,n)=>{n.r(t),n.d(t,{default:()=>B});var a=n(6908),r=n(8578),o=n(5069),l=n(4854),i=n(4353),s=n(6726),c=n(8686),d=n(871),m=n(2525),p=n(1972),u=n(7692),h=n(9526),g=n(512),v=n(3957),f=n(8623),E=n(9855),y=n(8246),x=n(1704),b=n(2500),Z=n(7402),C=n(5111);function M(e){return(0,C.Z)("MuiInputAdornment",e)}const k=(0,Z.Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var w,A=n(9857),L=n(7557);const $=["children","className","component","disablePointerEvents","disableTypography","position","variant"],O=(0,b.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`position${(0,f.Z)(n.position)}`],!0===n.disablePointerEvents&&t.disablePointerEvents,t[n.variant]]}})((({theme:e,ownerState:t})=>(0,u.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(e.vars||e).palette.action.active},"filled"===t.variant&&{[`&.${k.positionStart}&:not(.${k.hiddenLabel})`]:{marginTop:16}},"start"===t.position&&{marginRight:8},"end"===t.position&&{marginLeft:8},!0===t.disablePointerEvents&&{pointerEvents:"none"}))),P=h.forwardRef((function(e,t){const n=(0,A.Z)({props:e,name:"MuiInputAdornment"}),{children:a,className:r,component:o="div",disablePointerEvents:l=!1,disableTypography:i=!1,position:s,variant:c}=n,d=(0,p.Z)(n,$),m=(0,x.Z)()||{};let b=c;c&&m.variant,m&&!b&&(b=m.variant);const Z=(0,u.Z)({},n,{hiddenLabel:m.hiddenLabel,size:m.size,disablePointerEvents:l,position:s,variant:b}),C=(e=>{const{classes:t,disablePointerEvents:n,hiddenLabel:a,position:r,size:o,variant:l}=e,i={root:["root",n&&"disablePointerEvents",r&&`position${(0,f.Z)(r)}`,l,a&&"hiddenLabel",o&&`size${(0,f.Z)(o)}`]};return(0,v.Z)(i,M,t)})(Z);return(0,L.jsx)(y.Z.Provider,{value:null,children:(0,L.jsx)(O,(0,u.Z)({as:o,ownerState:Z,className:(0,g.Z)(C.root,r),ref:t},d,{children:"string"!=typeof a||i?(0,L.jsxs)(h.Fragment,{children:["start"===s?w||(w=(0,L.jsx)("span",{className:"notranslate",children:"​"})):null,a]}):(0,L.jsx)(E.Z,{color:"text.secondary",children:a})}))})}));var S=n(907),U=n(8051),I=n(3121),V=n(2182),N=n(4341),H=n(6623);const R=n.p+"5f305f1aadc5e269e4f4.jpg";var z=n(3758),T=n(6333),_=n(4065),j=n(6415),F=n(9536),W=n(5768),D=n(5609),Q=n(5730);function X({height:e,width:t,topLip:n=100,bottomLip:a,theta:r,sideWidth:o,sides:l,style:i}){const s=V.gc/l/2,c=(Math.tan(s),t-l*o),d=Math.tan(s)*a,m=r*V.Co,p=e-a-n,u=(0,j.XJ)(l,o),g=(0,j.q3)(l,o),v=g+(l%2==0?g:u),f=(0,h.useContext)(F.kM),E=(0,_.QI)([{type:_.OU.MOVE_TO,relative:!1,x:0,y:e-a},{type:_.OU.HORIZ_LINE_TO,relative:!1,x:t},...(0,V.hS)(0,l+1).flatMap((t=>[{type:_.OU.MOVE_TO,relative:!1,x:t*o,y:n},{type:_.OU.VERT_LINE_TO,relative:!1,y:e-a},{type:_.OU.MOVE_TO,relative:!1,x:t*o,y:e-a},{type:_.OU.LINE_TO,relative:!1,x:t*o+Math.tan(s+m)*a,y:e}])),{type:_.OU.MOVE_TO,relative:!1,x:0,y:n},{type:_.OU.HORIZ_LINE_TO,relative:!1,x:t}]),y=(0,_.QI)([...(0,V.hS)(0,l+1).flatMap((t=>[D.M(t*o,e-a),D.l(Math.sin(m)*a,a)])),...(0,V.hS)(0,l).flatMap((e=>[D.M((e+1)*o,0),D.V(n)]))]),x=-p-10-u,b=f?[0,0,t,e]:[-10,-10,t+20,e+30],Z=a*Math.tan(m);return h.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{...i},width:b[2]+"mm",height:b[3]+"mm",viewBox:b.join(" "),className:"adrian"},h.createElement(Q.r,null),h.createElement("defs",null,h.createElement("clipPath",{id:"page"},h.createElement("rect",{width:t,height:e}))),h.createElement("g",{clipPath:"url(#page)"},!f&&h.createElement("rect",{width:c,height:e,className:"glue"}),h.createElement("rect",{width:t,height:e}),h.createElement("path",{d:E,style:{strokeDasharray:"1,1"}}),h.createElement("path",{d:y,style:{strokeDasharray:"10,2,1,1,1,2"}}),(0,V.hS)(0,l).map((t=>{const n=(0,V.V)(t*o,e-a).plus(V.V3.polar(u,90*V.Co-s-m));return h.createElement("circle",{key:t,cx:n.x,cy:n.y,r:.5,stroke:"black"})}))),h.createElement(F.UH,{from:[0,0],to:[0,n]},"topLip"),h.createElement(F.UH,{from:[0,n],to:[0,e-a]},""+(0,V.At)(e-n-a,-1)),h.createElement(F.UH,{from:[0,e-a],to:[0,e]},"bottomLip"),h.createElement(F.UH,{from:[0,0],to:[o,0]},"sideWidth"),(0,V.hS)(1,l).map((e=>h.createElement(F.UH,{key:e,from:[e*o,0],to:[(e+1)*o,0],hideRight:!0},""+(0,V.At)(o*(e+1),-1)))),h.createElement(F.UH,{from:[0,e],to:[Z,e]},""+(0,V.At)(Z,-2)),(0,V.hS)(0,l).map((t=>h.createElement(F.UH,{key:t,from:[Z+t*o,e],to:[Z+(t+1)*o,e],hideRight:!0},""+(0,V.At)(Z+o*(t+1),-1)))),h.createElement(F.UH,{from:[l*o,0],to:[t,0]},""+(0,V.At)(c,-1)),h.createElement(F.UH,{from:[o,e],to:[o+d,e],offset:1},""+(0,V.At)(d,-1)),d<o&&h.createElement(F.UH,{from:[o+d,e],to:[o+o,e],offset:1},""+(0,V.At)(o-d,-1)),h.createElement(W.G,{center:[2*o,e-a],start:90*V.Co,toRel:-s},(0,j.X$)(s)),h.createElement(F.fD,{transform:`translate(200, ${2*p})`},h.createElement("rect",{transform:"translate(0, -0)",x:-g,y:-p-10-u,width:v,height:p,style:{fill:"none"}}),h.createElement("path",{d:`${(0,V.hS)(2,l/2).map((e=>"M"+V.V3.polar(u,V.gc/l*e+(Math.PI-V.gc/l/2)).x+","+x+" v"+p)).join(" ")} `}),h.createElement(F.UH,{from:[-g,x],to:[-g,x+p]},""+(0,V.At)(p,-1)),h.createElement(F.UH,{from:[-g,x+p],to:[-g+v,x+p]},""+(0,V.At)(v,-1)),h.createElement("path",{d:`${(0,V.hS)(0,l).map((e=>{const t=V.V3.polar(u,V.gc/l*e+(Math.PI-V.gc/l/2));return(0===e?"M":"L")+t.x+","+t.y})).join(" ")} Z`,style:{fill:"none"}}),h.createElement("path",{d:(0,_.QI)([...(0,V.hS)(0,l).flatMap((e=>{const t=V.V3.polar(u,V.gc/l*e+(Math.PI-V.gc/l/2)),n=V.V3.polar(a/Math.cos(s+m),V.gc/l*e+-V.gc/l/2+m);return[D.M(t.x,t.y),D.l(n.x,n.y)]}))])})))}const B=()=>{const[e,t]=(0,N.q)({width:T.t1[1],height:T.t1[0],sides:6,sideWidth:45,topLip:30,bottomLip:30,theta:5}),n=e.width>e.height,[p,u]=[e.width,e.height],g=Math.floor((u-e.bottomLip-1)/2),[v,f]=(0,h.useState)(!0),E=V.gc/e.sides/2,y=(0,V.At)(e.sideWidth/Math.tan(E),-1),[x,b]=(0,h.useState)(!1),Z=(0,h.useCallback)((n=>{t((t=>{const a={...t,...n};return v&&g!==e.topLip&&(a.topLip=g),x&&y!==e.bottomLip&&(a.bottomLip=y),a}))}),[t,v,g,e.topLip,e.bottomLip,x,y]),C=(0,U.Z)();return h.createElement(d.ZP,{container:!0,style:{width:"100%"}},h.createElement(d.ZP,{item:!0,xs:12,md:10,style:{display:"flex",alignItems:"center",maxHeight:"100vh",padding:C.spacing(2)}},h.createElement(X,{...e,style:{maxWidth:"100%",maxHeight:"100%",height:"auto",margin:"auto"}})),h.createElement(d.ZP,{item:!0,xs:12,md:2,sx:{display:"flex",flexDirection:"column",width:"100%",padding:2,alignItems:"stretch",gap:2}},h.createElement(o.Z,null,h.createElement(i.Z,{image:R,title:"Hexagonal Prism Box",sx:{height:0,paddingTop:"100%"}}),h.createElement(l.Z,null,"Helper to build"," ",h.createElement(S.Z,{href:"https://www.paperkawaii.com/video-tutorial-origami-hexagonal-gift-box/"},"this box"),". All measurements are in millimeters. To make a lid, you should increase the sideWidth by 1mm and ~halve the paper height.")),h.createElement(z.W,{label:"Paper Size",value:(0,T.PN)(p,u),onChange:e=>{const[t,a]=e;Z(n?{width:a,height:t}:{width:t,height:a})}}),h.createElement(c.Z,{control:h.createElement(s.Z,{checked:n,onChange:()=>{Z({width:u,height:p})},color:"primary"}),label:"Landscape"}),h.createElement(I.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:3,max:16},value:e.sides,onChange:e=>Z({sides:+e.target.value}),label:"Sides"}),h.createElement(I.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:1},value:e.sideWidth,onChange:e=>Z({sideWidth:+e.target.value}),InputProps:{endAdornment:h.createElement(P,{position:"end"},"mm")},label:"sideWidth"}),h.createElement(I.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:0},value:e.theta,onChange:e=>Z({theta:+e.target.value}),InputProps:{endAdornment:h.createElement(P,{position:"end"},"mm")},label:"theta"}),h.createElement(I.Z,{variant:"outlined",disabled:v,size:"small",type:"number",inputProps:{step:1,min:0,max:g},value:e.topLip,onChange:e=>Z({topLip:+e.target.value}),InputProps:{endAdornment:h.createElement(h.Fragment,null,h.createElement(P,{position:"end"},"mm"),h.createElement(m.Z,{onClick:()=>{f(!v),Z({})},size:"large"},v?h.createElement(a.Z,{color:"primary"}):h.createElement(r.Z,null)))},label:"topLip"}),h.createElement(I.Z,{variant:"outlined",disabled:x,size:"small",type:"number",inputProps:{step:1,min:0},value:e.bottomLip,onChange:e=>Z({bottomLip:+e.target.value}),InputProps:{endAdornment:h.createElement(h.Fragment,null,h.createElement(P,{position:"end"},"mm"),h.createElement(m.Z,{onClick:()=>{b(!x),Z({})},size:"large"},x?h.createElement(a.Z,{color:"primary"}):h.createElement(r.Z,null)))},label:"bottomLip"}),h.createElement(H.F,{what:h.createElement(X,{...e}),baseFileName:`${p}x${u}-${e.sides}x${e.sideWidth}-${e.topLip}-${e.bottomLip}`})))}},5609:(e,t,n)=>{n.d(t,{A:()=>o,H:()=>r,L:()=>s,M:()=>i,V:()=>l,Z:()=>d,c:()=>m,l:()=>c});var a=n(4065);function r(e){return{type:a.OU.HORIZ_LINE_TO,relative:!1,x:e}}function o(e,t,n,r,o,l){return{lArcFlag:r,rX:e,rY:t,relative:!1,sweepFlag:o,type:a.OU.ARC,x:l.x,xRot:0,y:l.y}}const l=e=>({type:a.OU.VERT_LINE_TO,y:e,relative:!1});function i(e,t){const[n,r]=void 0===t?[e.x,e.y]:[e,t];return{type:a.OU.MOVE_TO,x:n,y:r,relative:!1}}function s(e,t){const[n,r]=void 0===t?[e.x,e.y]:[e,t];return{type:a.OU.LINE_TO,x:n,y:r,relative:!1}}const c=(e,t)=>({type:a.OU.LINE_TO,x:e,y:t,relative:!0}),d=()=>({type:a.OU.CLOSE_PATH}),m=(...e)=>new a.OU(e).round(3).encode()},6908:(e,t,n)=>{var a=n(5656);t.Z=void 0;var r=a(n(6128)),o=n(7557),l=(0,r.default)((0,o.jsx)("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");t.Z=l},8578:(e,t,n)=>{var a=n(5656);t.Z=void 0;var r=a(n(6128)),o=n(7557),l=(0,r.default)((0,o.jsx)("path",{d:"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"}),"LockOpen");t.Z=l},4854:(e,t,n)=>{n.d(t,{Z:()=>v});var a=n(7692),r=n(1972),o=n(9526),l=n(512),i=n(3957),s=n(2500),c=n(9857),d=n(7402),m=n(5111);function p(e){return(0,m.Z)("MuiCardContent",e)}(0,d.Z)("MuiCardContent",["root"]);var u=n(7557);const h=["className","component"],g=(0,s.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),v=o.forwardRef((function(e,t){const n=(0,c.Z)({props:e,name:"MuiCardContent"}),{className:o,component:s="div"}=n,d=(0,r.Z)(n,h),m=(0,a.Z)({},n,{component:s}),v=(e=>{const{classes:t}=e;return(0,i.Z)({root:["root"]},p,t)})(m);return(0,u.jsx)(g,(0,a.Z)({as:s,className:(0,l.Z)(v.root,o),ownerState:m,ref:t},d))}))}}]);
//# sourceMappingURL=paperBox1-index.js.map