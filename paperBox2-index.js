"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[367],{4341:(e,t,a)=>{a.d(t,{q:()=>d});var n=a(6897),l=a.n(n),r=a(508),s=a.n(r),o=a(9526);const i=e=>e?e.substring(1).split("&").map((e=>{const[t,a]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(a)]})).reduce(((e,[t,a])=>(e[t]=a,e)),{}):{},c=e=>"#"+Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&"),m=e=>s()(e,(e=>"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:""===e?"":isNaN(+e)?e:+e))),u=e=>s()(e,(e=>""+e));function d(e,{deserialize:t=m,serialize:a=u,wait:n=1e3}={}){const r=(0,o.useCallback)((()=>{const n="function"==typeof e?e():e,l=t(Object.assign(a(n),i(document.location.hash)));return history.pushState(void 0,document.title,c(a(l))),l}),[t,e,a]),[s,d]=(0,o.useState)(r),p=(0,o.useRef)();return p.current||(p.current=l()((function(e){history.pushState(void 0,document.title,c(a(e)))}),n)),(0,o.useEffect)((()=>p.current(s)),[s]),(0,o.useEffect)((()=>{const e=()=>{d(r())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[r]),[s,d]}},6623:(e,t,a)=>{a.d(t,{F:()=>c});var n=a(8864),l=a(1413),r=a.n(l),s=a(9526),o=a(2279),i=a(9536);function c({what:e,baseFileName:t}){const l=()=>o.renderToStaticMarkup(s.createElement(i.kM.Provider,{value:!0},e)).replace(/\s{2,}/g," ");return s.createElement(s.Fragment,null,s.createElement(n.Z,{variant:"contained",onClick:()=>{const e=l();r()(e,t+".svg")}},"Download As SVG"),s.createElement(n.Z,{variant:"contained",onClick:async()=>{const{svgToPdf:e}=await Promise.all([a.e(853),a.e(898)]).then(a.bind(a,2566)),n=await e({title:t,author:"Adrian Leonhard",svg:l()});r()(n,t+".pdf")}},"Template as PDF"))}},9536:(e,t,a)=>{a.d(t,{UH:()=>o,fD:()=>s,kM:()=>r});var n=a(9526),l=a(2182);const r=(0,n.createContext)(!1);function s({children:e,...t}){return(0,n.useContext)(r)?null:n.createElement("g",{className:"guide",...t},e)}function o({from:e,to:t,children:a,hideRight:s=!1,offset:o=0}){Array.isArray(e)&&(e=(0,l.V)(e)),Array.isArray(t)&&(t=(0,l.V)(t));const i=e.to(t),c=i.length();if((0,n.useContext)(r))return null;if(c<.05)return null;a||=""+(0,l.At)(c,-1);const m=3*a.length;return n.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${i.angleXY()/l.Co}) translate(0, ${10*o})`,className:"measure"},!s&&n.createElement("path",{style:{fill:"none"},d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2"}),n.createElement("path",{style:{fill:"none"},d:`\n        M0,5\n        H${(c-m)/2}\n        M${(c+m)/2},5\n        H${c}\n        M${c},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`}),n.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:c/2,y:5},a))}},5768:(e,t,a)=>{a.d(t,{G:()=>o});var n=a(9526),l=a(2182),r=a(6415),s=a(9536);function o({center:e,start:t,toRel:a,children:o}){if(Array.isArray(e)&&(e=(0,l.V)(e)),(0,n.useContext)(s.kM))return null;const i=l.V3.polar(20,t).plus((0,l.V)(e)),c=l.V3.polar(20,t+a).plus((0,l.V)(e)),m=l.V3.polar(14,t+a/2).plus((0,l.V)(e)),u=Math.abs(a)>Math.PI?"1":"0",d=a>0?"1":"0";return n.createElement("g",{className:"measure"},n.createElement("path",{style:{fill:"none"},d:`M${i.x},${i.y} A20,20,0,${u},${d},${c.x},${c.y}`}),n.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:m.x,y:m.y},null!=(p=o)?p:(()=>(0,r.X$)(a))()));var p}},3758:(e,t,a)=>{a.d(t,{W:()=>o});var n=a(302),l=a(3121),r=a(9526),s=a(6415);const o=(0,r.forwardRef)((({disableClearance:e=!1,onChange:t,value:a,label:o},i)=>{let c=null;if(a){const[e,t]=a;c=(0,s.PN)(e,t)}return r.createElement(n.Z,{ref:i,disableClearable:e,size:"small",freeSolo:!0,renderInput:e=>r.createElement(l.Z,{...e,label:o,variant:"outlined"}),value:c,onChange:(a,n)=>{if("string"==typeof n)if(""===n.trim())e||t(null);else{const e=/(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/.exec(n);if(e){const[,a,n]=e;t((0,s.PN)(+a,+n))}}else t(n)},getOptionLabel:e=>{const[t,a,n="custom"]=e;return`${n} ${t}x${a}mm`},options:s.li})}))},5730:(e,t,a)=>{a.d(t,{r:()=>l});var n=a(9526);const l=()=>n.createElement(n.Fragment,null,n.createElement("defs",null,n.createElement("pattern",{id:"glue",patternUnits:"userSpaceOnUse",width:"4",height:"4"},n.createElement("path",{d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",style:{stroke:"#eee",strokeWidth:1}}))),n.createElement("style",null,".valley {stroke-dasharray: 1,1;} ",".outline ",".mountain {stroke-dasharray: 10,2,1,1,1,2;} "))},6415:(e,t,a)=>{a.d(t,{$Q:()=>E,PM:()=>r,PN:()=>g,Qn:()=>i,X$:()=>s,XJ:()=>o,YQ:()=>$,_x:()=>u,hv:()=>d,kC:()=>p,li:()=>h,nA:()=>f,nl:()=>y,oe:()=>m,q3:()=>c,t1:()=>v});var n=a(9526),l=a(2182);const r=25.4,s=e=>(0,l.At)(e/l.Co,-1)+"°",o=(e,t)=>t/2/Math.sin(l.gc/e/2),i=(e,t)=>2*t*Math.sin(l.gc/e/2),c=(e,t)=>t/2/Math.tan(l.gc/e/2),m=(e,t)=>t/Math.cos(l.gc/e/2),u=(e,t)=>2*t*Math.tan(l.gc/e/2);function d({sides:e,radius:t,startAngle:a=0,sideLength:r,...s}){if(void 0!==r==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=o(e,r));const{x:i,y:c}=l.V3.polar(t,a);return n.createElement("path",{d:y`
        M${i},${c}
        ${(0,l.hS)(0,e).map((n=>y`L${l.V3.polar(t,a+n*(l.gc/e))}`))}Z`,...s})}function p({id:e,children:t,count:a,stepDeg:r}){return n.createElement(n.Fragment,null,n.createElement("g",{id:e},t),(0,l.hS)(0,a-1).map((t=>n.createElement("use",{key:t,xlinkHref:"#"+e,transform:`rotate(${(t+1)*r} 0 0)`}))))}const h=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]];function f(e){const t=h.find((([,,t])=>t===e));if(t)return t;const[a,n]=e.split("x");return[+a,+n,"Custom"]}function g(e,t){return[e,t]=[e,t].sort(l.uK),null!=(a=h.find((([a,n])=>a===e&&n===t)))?a:(()=>[e,t,"Custom"])();var a}function E([e,t,a]){return"Custom"===a?e+"x"+t:a}const v=h.find((([,,e])=>"A4"===e));function y(e,...t){const a=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(a).join(" "):e.x+","+e.y;let n=e[0];for(let l=0;l<t.length;l++)n+=a(t[l]),n+=e[l+1];return n}const $=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},9430:(e,t,a)=>{a.d(t,{G:()=>i});var n=a(9526),l=a(2182),r=a(6415),s=a(9536),o=a(5730);function i({baseRadius:e,topRadius:t,radius:a,style:i,paperSize:c,children:m}){const u=c&&[Math.min(-20,a-c[0]),Math.min(-20,a-c[1])],d=(0,n.useContext)(s.kM),p=c?[u[0],u[1],c[0],c[1]]:[-a,-a,2*a,2*a],h=t-e,f=a-t;return n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",style:{fill:"none",stroke:"#123456",strokeWidth:2*r.PM/300,...i},width:p[2]+"mm",height:p[3]+"mm",viewBox:p.join(" "),className:"adrian"},n.createElement(o.r,null),n.createElement(s.fD,{transform:"translate(-20 -20) rotate(180)"},n.createElement("path",{style:{fill:"none"},d:r.nl`
          M${(0,l.V)(e-f,.99*h)}
          L${(0,l.V)(e,h)}
          L${(0,l.V)(e,0)}
          L${(0,l.V)(-e,0)}
          L${(0,l.V)(-e,h)}
          L${(0,l.V)(f-e,1.01*h)}
          `}),n.createElement(s.UH,{from:(0,l.V)(e,0),to:(0,l.V)(-e,0)}),n.createElement(s.UH,{from:(0,l.V)(e,h),to:(0,l.V)(e,0)}),n.createElement(s.UH,{from:(0,l.V)(f-e,h),to:(0,l.V)(0,h)})),!d&&c&&n.createElement("rect",{x:u[0],y:u[1],width:c[0],height:c[1]}),m)}},4515:(e,t,a)=>{a.d(t,{ST:()=>m,pC:()=>c,uC:()=>u});var n=a(9526),l=a(2182),r=a(6415),s=a(9536),o=a(5768),i=a(9430);function c(e,t,a){return Math.PI/2-t-Math.acos(a/e*Math.sin(t))}function m(e,t,a){return a/Math.cos(e-Math.PI/2+t)/Math.sin(t)}function u(e){const{baseRadius:t,topRadius:a,radius:m,sides:u}=e,d=(0,r.oe)(u,t),p=(0,r.oe)(u,a),h=l.gc/u/2,f=c(m,h,d),g=(0,n.useContext)(s.kM);function E(e){return g?{}:{stroke:e}}const v=(0,l.V)(d,0).plus(l.V3.polar(a-t,h)),y=l.V3.X,$=e=>v.plus(y.times(e)),V=$((0,l.zj)((e=>$(e).length()-m),1,4));return n.createElement(i.G,{...e},n.createElement("g",{className:"fold"},n.createElement(r.hv,{radius:d,sides:u,className:"valley"}),n.createElement(s.UH,{offset:-.5,from:[0,0],to:l.V3.polar(t,h)},"baseRadius"),n.createElement(s.UH,{offset:-.5,from:l.V3.polar(t,h),to:l.V3.polar(a,h),hideRight:!0},"topRadius"),n.createElement(s.UH,{offset:-.5,from:l.V3.polar(a,h),to:l.V3.polar(m,h),hideRight:!0},"radius"),n.createElement(o.G,{center:v,start:Math.PI,toRel:h}),n.createElement(s.UH,{from:l.V3.polar(d,-l.gc/u),to:l.V3.polar(d,0)}),n.createElement(r.kC,{id:"foo",count:u,stepDeg:360/u},n.createElement("path",{d:r.nl`
                M${d},0
                H${m}`,className:"mountain",style:E("green")}),n.createElement("path",{d:r.nl`
                M${d},0
                L${l.V3.polar(m,f)}
                M${d},0
                L${v}`,className:"valley",style:E("blue")}),n.createElement("path",{d:r.nl`
                M${v}
                L${l.V3.polar(m,-f)}`,className:"mountain",style:E("blue")}),n.createElement("path",{d:r.nl`
                M${p},0
                L${l.V3.polar(d,-l.gc/u).plus(l.V3.polar(a-t,-l.gc/u/2))}`,className:"valley",style:E("hotpink")}),n.createElement("path",{d:r.nl`
                M${l.V3.polar(d,-l.gc/u).plus(l.V3.polar(a-t,-l.gc/u/2))}
                L${l.V3.polar(p,-l.gc/u)}`,className:"mountain",style:E("orange")}),n.createElement("path",{d:r.nl`
                M${v}
                L${V}`,className:"valley",style:E("red")}))),n.createElement("g",{className:"cut"},n.createElement("circle",{r:m})))}},3040:(e,t,a)=>{a.r(t),a.d(t,{default:()=>A});var n=a(4931),l=a(5069),r=a(4854),s=a(4353),o=a(3394),i=a(2489),c=a(871),m=a(870),u=a(907),d=a(897),p=a(882),h=a(8051),f=a(3121),g=a(9526),E=a(4341),v=a(6623),y=a(3758);const $=a.p+"fd53586445a23d11d831.jpg";var V=a(4515);const b=a.p+"5bb414b3e68931cf1be5.jpg";var M=a(2182),x=a(6415),C=a(9536),R=a(5768);const k=e=>{const t={fontSize:4,dominantBaseline:"middle"};return(0,g.useContext)(C.kM)?null:g.createElement("g",{...e},g.createElement("text",{style:t,y:-4},"valley"),g.createElement("line",{x1:20,y1:-4,x2:40,y2:-4,className:"valley"}),g.createElement("text",{style:t,y:4},"mountain"),g.createElement("line",{x1:20,y1:4,x2:40,y2:4,className:"mountain"}))};var w=a(9430);const N=e=>{const{baseRadius:t,topRadius:a,radius:n,sides:l,paperSize:r}=e,s=M.gc/l/2,o=(0,x.oe)(l,t),i=(0,x.oe)(l,a),c=(a-t)/2/Math.cos(s),m=((0,V.pC)(n,2*s,o+c),(0,g.useContext)(C.kM));function u(e){return m?{}:{stroke:e}}const d=(0,M.V)(o,0).plus(M.V3.polar(a-t,-s)),p=M.V3.polar(1,-(s+s)),h=e=>d.plus(p.times(e)),f=h((0,M.zj)((e=>h(e).length()-n),1,4)),E=n;return g.createElement(w.G,{...e},g.createElement("g",null,g.createElement(x.hv,{radius:o,sides:l,className:"valley"}),g.createElement("circle",{r:n,className:"outline"}),g.createElement(C.UH,{offset:-.5,from:[0,0],to:M.V3.polar(t,s)},"baseRadius"),g.createElement(C.UH,{offset:-.5,from:M.V3.polar(t,s),to:M.V3.polar(a,s),hideRight:!0},"topRadius"),g.createElement(C.UH,{offset:-.5,from:M.V3.polar(a,s),to:M.V3.polar(n,s),hideRight:!0},"radius"),g.createElement(x.kC,{id:"rotsym",count:l,stepDeg:360/l},g.createElement("path",{d:x.nl`
                M${o},0 
                L${(0,M.V)(o,0).plus(M.V3.polar(a-t,-s))}`,className:"mountain",style:u("red")}),g.createElement("path",{d:x.nl`
                M${i},0
                L${(0,M.V)(o,0).plus(M.V3.polar(a-t,-s))}`,className:"mountain",style:u("orange")}),g.createElement("path",{d:x.nl`
                M${(0,M.V)(o,0).plus(M.V3.polar(a-t,-s))}
                L${M.V3.polar(i,-M.gc/l)}`,className:"valley",style:u("orange")}),g.createElement("path",{d:x.nl`
                M${(0,M.V)(o,0).plus(M.V3.polar(a-t,-s))}
                L${f}`,className:"mountain",style:u("blue")}),g.createElement("path",{d:x.nl`
                M${f}
                A${E},${E},0,0,1,${M.V3.polar(n,-M.gc/l)}`,className:"outline"}),g.createElement("path",{d:x.nl`
                M${(0,M.V)(o,0)}
                H${n}`,className:"valley",style:u("green")}),r&&g.createElement("path",{d:x.nl`
                M0,0
                H${t/2}`,className:"valley",style:u("purple")})),g.createElement(R.G,{center:[o,0],start:-s,toRel:s}),g.createElement(R.G,{center:(0,M.V)(o,0).plus(M.V3.polar(a-t,-s)),start:2*-s,toRel:s}),g.createElement(C.UH,{from:[n,0],to:f}),g.createElement(C.UH,{from:f,to:M.V3.polar(n,-M.gc/l)}),g.createElement(k,{transform:`translate(${-n}, ${-n})`,x:100,y:100})))},A=()=>{const[e,t]=(0,E.q)({variant:"inside",baseRadius:30,topRadius:65,radius:100,sides:8}),a=(0,g.useCallback)((e=>t((t=>({...t,...e})))),[t]),[M,x]=(0,g.useState)(null),C={inside:V.uC,outside:N}[e.variant],R=(0,h.Z)(),k=e.radius-e.topRadius-e.baseRadius;return g.createElement(c.ZP,{container:!0,style:{width:"100%"}},g.createElement(c.ZP,{item:!0,xs:12,md:10},g.createElement(C,{...e,paperSize:M,style:{width:"100%",height:"100%",margin:R.spacing(1)}})),g.createElement(c.ZP,{item:!0,xs:12,md:2,sx:{display:"flex",flexDirection:"column",width:"100%",padding:2,alignItems:"stretch",gap:2}},g.createElement(l.Z,null,g.createElement(s.Z,{image:$,title:"Contemplative Reptile",sx:{height:0,paddingTop:"100%"}}),g.createElement(r.Z,null,"Helper to build a box from a circular piece of paper. The Inside Folds variant has more complicated folds but has a cleaner overall look.")),g.createElement(i.Z,{variant:"outlined",size:"small"},g.createElement(m.Z,{id:"variant-label"},"Variant"),g.createElement(p.Z,{labelId:"variant-label",label:"Variant",value:e.variant,onChange:e=>a({variant:e.target.value})},g.createElement(d.Z,{value:"inside"},"Inside Folds"),g.createElement(d.Z,{value:"outside"},"Outside Folds"))),g.createElement(f.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1},value:e.baseRadius,onChange:e=>a({baseRadius:+e.target.value}),label:"baseRadius"}),g.createElement(f.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1},value:e.topRadius,onChange:e=>a({topRadius:+e.target.value}),label:"topRadius"}),g.createElement(f.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1},value:e.radius,onChange:e=>a({radius:+e.target.value}),label:"Radius"}),g.createElement(f.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:4,max:32},value:e.sides,onChange:e=>a({sides:+e.target.value}),label:"Sides"}),"inside"===e.variant&&k>0&&g.createElement(n.Z,{severity:"warning"},"For the inside folds variant, you want no (or even negative) overlap at the top."),g.createElement(o.Z,null),g.createElement(l.Z,null,g.createElement(r.Z,null,"Set the Print Paper Size on large boxes to get a partial template which can be rotated. See"," ",g.createElement(u.Z,{href:b},"this image")," for an example.")),g.createElement(y.W,{label:"Print Paper Size",value:M,onChange:x}),g.createElement(v.F,{baseFileName:`${e.variant}-${e.baseRadius}-${e.topRadius}-${e.radius}-${e.sides}`,what:g.createElement(C,{...e,paperSize:M})})))}}}]);
//# sourceMappingURL=paperBox2-index.js.map