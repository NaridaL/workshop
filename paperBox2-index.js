"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[367],{4341:(e,t,a)=>{a.d(t,{q:()=>p});var n=a(6897),r=a.n(n),l=a(508),s=a.n(l),o=a(9526),i=a(6333);const c=e=>e?e.substring(1).split("&").map((e=>{const[t,a]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(a)]})).reduce(((e,[t,a])=>(e[t]=a,e)),{}):{},m=e=>"#"+Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&"),u=e=>s()(e,((e,t)=>{if("paperSize"!==t)return"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:""===e?"":isNaN(+e)?e:+e);try{return(0,i.nA)(e)}catch(e){return console.error(e),i.t1}})),d=e=>s()(e,((e,t)=>"paperSize"===t?(0,i.$Q)(e):""+e));function p(e,{deserialize:t=u,serialize:a=d,wait:n=1e3}={}){const l=(0,o.useCallback)((()=>{const n="function"==typeof e?e():e,r=t(Object.assign(a(n),c(document.location.hash)));return console.log("replaceState"),history.replaceState(void 0,document.title,m(a(r))),r}),[t,e,a]),[s,i]=(0,o.useState)(l),p=(0,o.useRef)();return(0,o.useEffect)((()=>function(e){let t,a=e[0],n=1;for(;n<e.length;){const r=e[n],l=e[n+1];if(n+=2,("optionalAccess"===r||"optionalCall"===r)&&null==a)return;"access"===r||"optionalAccess"===r?(t=a,a=l(a)):"call"!==r&&"optionalCall"!==r||(a=l(((...e)=>a.call(t,...e))),t=void 0)}return a}([p,"access",e=>e.current,"optionalCall",e=>e(s)])),[s]),p.current||(console.log("pushState"),p.current=r()((function(e){history.pushState(void 0,document.title,m(a(e)))}),n)),(0,o.useEffect)((()=>{const e=()=>{i(l())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[l]),[s,i]}},6623:(e,t,a)=>{a.d(t,{F:()=>c});var n=a(8864),r=a(1413),l=a.n(r),s=a(9526),o=a(2279),i=a(9536);function c({what:e,baseFileName:t}){const r=()=>o.renderToStaticMarkup(s.createElement(i.kM.Provider,{value:!0},e)).replace(/\s{2,}/g," ");return s.createElement(s.Fragment,null,s.createElement(n.Z,{variant:"contained",onClick:()=>{const e=r();l()(e,t+".svg")}},"Download As SVG"),s.createElement(n.Z,{variant:"contained",onClick:async()=>{const{svgToPdf:e}=await Promise.all([a.e(853),a.e(898)]).then(a.bind(a,2566)),n=await e({title:t,author:"Adrian Leonhard",svg:r()});l()(n,t+".pdf")}},"Template as PDF"))}},9536:(e,t,a)=>{a.d(t,{UH:()=>o,fD:()=>s,kM:()=>l});var n=a(9526),r=a(2182);const l=(0,n.createContext)(!1);function s({children:e,...t}){return(0,n.useContext)(l)?null:n.createElement("g",{className:"guide",...t},e)}function o({from:e,to:t,children:a,hideRight:s=!1,offset:o=0}){Array.isArray(e)&&(e=(0,r.V)(e)),Array.isArray(t)&&(t=(0,r.V)(t));const i=e.to(t),c=i.length();if((0,n.useContext)(l))return null;if(c<.05)return null;a||=""+(0,r.At)(c,-1);const m=3*a.length;return n.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${i.angleXY()/r.Co}) translate(0, ${10*o})`,className:"measure"},!s&&n.createElement("path",{style:{fill:"none"},d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2"}),n.createElement("path",{style:{fill:"none"},d:`\n        M0,5\n        H${(c-m)/2}\n        M${(c+m)/2},5\n        H${c}\n        M${c},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`}),n.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:c/2,y:5},a))}},5768:(e,t,a)=>{a.d(t,{G:()=>o});var n=a(9526),r=a(2182),l=a(6415),s=a(9536);function o({center:e,start:t,toRel:a,children:o}){if(Array.isArray(e)&&(e=(0,r.V)(e)),(0,n.useContext)(s.kM))return null;const i=r.V3.polar(20,t).plus((0,r.V)(e)),c=r.V3.polar(20,t+a).plus((0,r.V)(e)),m=r.V3.polar(14,t+a/2).plus((0,r.V)(e)),u=Math.abs(a)>Math.PI?"1":"0",d=a>0?"1":"0";return n.createElement("g",{className:"measure"},n.createElement("path",{style:{fill:"none"},d:`M${i.x},${i.y} A20,20,0,${u},${d},${c.x},${c.y}`}),n.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:m.x,y:m.y},null!=(p=o)?p:(()=>(0,l.X$)(a))()));var p}},3758:(e,t,a)=>{a.d(t,{W:()=>o});var n=a(302),r=a(3121),l=a(9526),s=a(6333);const o=(0,l.forwardRef)((({disableClearance:e=!1,onChange:t,value:a,label:o},i)=>{let c=null;if(a){const[e,t]=a;c=(0,s.PN)(e,t)}return l.createElement(n.Z,{ref:i,disableClearable:e,size:"small",freeSolo:!0,renderInput:e=>l.createElement(r.Z,{...e,label:o,variant:"outlined"}),value:c,onChange:(a,n)=>{if("string"==typeof n)if(""===n.trim())e||t(null);else{const e=/(\d+(?:\.\d+)?)\D*?(\d+(?:\.\d+)?)?\D*$/.exec(n);if(e){const[,a,n]=e;t((0,s.PN)(+a,+(n||a)))}}else t(n)},getOptionLabel:e=>{const[t,a,n="custom"]=e;return`${n} ${t}x${a}mm`},options:s.li})}))},6333:(e,t,a)=>{a.d(t,{$Q:()=>c,PN:()=>i,TL:()=>l,li:()=>s,nA:()=>o,t1:()=>m});var n=a(2182);const r=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"]],l=[[917,1297,"C0"],[648,917,"C1"],[458,648,"C2"],[324,458,"C3"],[229,324,"C4"],[162,229,"C5"],[114,162,"C6"],[81,114,"C7"],[57,81,"C8"],[40,57,"C9"],[28,40,"C10"]],s=[...r,[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]];function o(e){const t=s.find((([,,t])=>t===e));if(t)return t;const[a,n]=e.split("x");return[+a,+n,"Custom"]}function i(e,t){return[e,t]=[e,t].sort(n.uK),null!=(a=s.find((([a,n])=>a===e&&n===t)))?a:(()=>[e,t,"Custom"])();var a}function c([e,t,a]){return"Custom"===a?e+"x"+t:a}const m=r[4]},5730:(e,t,a)=>{a.d(t,{r:()=>u});var n=a(4466),r=a(9817),l=a(1456),s=a(3569),o=a(4068),i=a(8051),c=a(9526),m=a(9536);const u=()=>{const e=(0,i.Z)(),t=(0,c.useContext)(m.kM),a=(0,c.useMemo)((()=>`\n.adrian * { stroke: ${e.palette.text.primary}; }\n.adrian .red-stroke { stroke: ${n.Z[500]}; }\n.adrian .orange-stroke { stroke: ${r.Z[500]}; }\n.adrian .blue-stroke { stroke: ${l.Z[500]}; }\n.adrian .green-stroke { stroke: ${s.Z[500]}; }\n.adrian .pink-stroke { stroke: ${o.Z[500]}; }\n.adrian .measure, *.measure * {\n  stroke: ${e.palette.primary.main};\n  fill: ${e.palette.primary.main};\n}\n.adrian .guide, .adrian .guide * {\n  stroke: ${e.palette.secondary.main};\n  fill: ${e.palette.secondary.main};\n}\n.adrian .glue, .adrian .guide .glue {\n  stroke: none;\n  fill: url(#glue);\n}\n`),[e]);return c.createElement(c.Fragment,null,c.createElement("defs",null,c.createElement("pattern",{id:"glue",patternUnits:"userSpaceOnUse",width:"4",height:"4"},c.createElement("path",{d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",style:{stroke:e.palette.divider,strokeWidth:1}}))),c.createElement("style",null,"\n      .mountain, .mountain * { stroke-dasharray: 10,2,1,1,1,2; }\n      .valley, .valley * { stroke-dasharray: 1,1; }\n      .cut, .cut * { stroke: 1; }\n      "),!t&&c.createElement("style",null,a))}},6415:(e,t,a)=>{a.d(t,{PM:()=>l,Qn:()=>i,X$:()=>s,XJ:()=>o,YQ:()=>g,_x:()=>u,hv:()=>d,kC:()=>p,nl:()=>h,oe:()=>m,q3:()=>c});var n=a(9526),r=a(2182);const l=25.4,s=e=>(0,r.At)(e/r.Co,-1)+"°",o=(e,t)=>t/2/Math.sin(r.gc/e/2),i=(e,t)=>2*t*Math.sin(r.gc/e/2),c=(e,t)=>t/2/Math.tan(r.gc/e/2),m=(e,t)=>t/Math.cos(r.gc/e/2),u=(e,t)=>2*t*Math.tan(r.gc/e/2);function d({sides:e,radius:t,startAngle:a=0,sideLength:l,...s}){if(void 0!==l==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=o(e,l));const{x:i,y:c}=r.V3.polar(t,a);return n.createElement("path",{d:h`
        M${i},${c}
        ${(0,r.hS)(0,e).map((n=>h`L${r.V3.polar(t,a+n*(r.gc/e))}`))}Z`,...s})}function p({id:e,children:t,count:a,stepDeg:l}){return n.createElement(n.Fragment,null,n.createElement("g",{id:e},t),(0,r.hS)(0,a-1).map((a=>n.createElement("g",{id:`${e}-${a}`,key:`${e}-${a}`,transform:`rotate(${(a+1)*l} 0 0)`},t))))}function h(e,...t){const a=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(a).join(" "):e.x+","+e.y;let n=e[0];for(let r=0;r<t.length;r++)n+=a(t[r]),n+=e[r+1];return n}const g=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},1492:(e,t,a)=>{a.r(t),a.d(t,{default:()=>S});var n=a(4931),r=a(5069),l=a(4854),s=a(4353),o=a(3394),i=a(2489),c=a(871),m=a(870),u=a(907),d=a(897),p=a(882),h=a(8051),g=a(3121),f=a(9526),E=a(4341),v=a(6623),$=a(3758);const y=a.p+"fd53586445a23d11d831.jpg";var V=a(2182),k=a(6415),b=a(9536),C=a(5768),M=a(5730);function x({baseRadius:e,topRadius:t,radius:a,style:n,paperSize:r,children:l}){const s=r&&[Math.min(-20,a-r[0]),Math.min(-20,a-r[1])],o=(0,f.useContext)(b.kM),i=r?[s[0],s[1],r[0],r[1]]:[-a,-a,2*a,2*a],c=t-e,m=a-t;return f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",style:{fill:"none",stroke:"#123456",strokeWidth:2*k.PM/300,...n},width:i[2]+"mm",height:i[3]+"mm",viewBox:i.join(" "),className:"adrian"},f.createElement(M.r,null),f.createElement(b.fD,{transform:"translate(-20 -20) rotate(180)"},f.createElement("path",{style:{fill:"none"},d:k.nl`
          M${(0,V.V)(e-m,.99*c)}
          L${(0,V.V)(e,c)}
          L${(0,V.V)(e,0)}
          L${(0,V.V)(-e,0)}
          L${(0,V.V)(-e,c)}
          L${(0,V.V)(m-e,1.01*c)}
          `}),f.createElement(b.UH,{from:(0,V.V)(e,0),to:(0,V.V)(-e,0)}),f.createElement(b.UH,{from:(0,V.V)(e,c),to:(0,V.V)(e,0)}),f.createElement(b.UH,{from:(0,V.V)(m-e,c),to:(0,V.V)(0,c)})),!o&&r&&f.createElement("rect",{x:s[0],y:s[1],width:r[0],height:r[1]}),l)}function R(e,t,a){return Math.PI/2-t-Math.acos(a/e*Math.sin(t))}function w(e){const{baseRadius:t,topRadius:a,radius:n,sides:r}=e,l=(0,k.oe)(r,t),s=(0,k.oe)(r,a),o=V.gc/r/2,i=R(n,o,l),c=((0,f.useContext)(b.kM),(0,V.V)(l,0).plus(V.V3.polar(a-t,o))),m=V.V3.X,u=e=>c.plus(m.times(e)),d=u((0,V.zj)((e=>u(e).length()-n),1,4));return f.createElement(x,{...e},f.createElement("g",{className:"fold"},f.createElement(k.hv,{radius:l,sides:r,className:"valley"}),f.createElement(b.UH,{offset:-.5,from:[0,0],to:V.V3.polar(t,o)},"baseRadius"),f.createElement(b.UH,{offset:-.5,from:V.V3.polar(t,o),to:V.V3.polar(a,o),hideRight:!0},"topRadius"),f.createElement(b.UH,{offset:-.5,from:V.V3.polar(a,o),to:V.V3.polar(n,o),hideRight:!0},"radius"),f.createElement(C.G,{center:c,start:Math.PI,toRel:o}),f.createElement(b.UH,{from:V.V3.polar(l,-V.gc/r),to:V.V3.polar(l,0)}),f.createElement(k.kC,{id:"foo",count:r,stepDeg:360/r},f.createElement("path",{d:k.nl`
                M${l},0
                H${n}`,className:"mountain green-stroke"}),f.createElement("path",{d:k.nl`
                M${l},0
                L${V.V3.polar(n,i)}
                M${l},0
                L${c}`,className:"valley blue-stroke"}),f.createElement("path",{d:k.nl`
                M${c}
                L${V.V3.polar(n,-i)}`,className:"mountain blue-stroke"}),f.createElement("path",{d:k.nl`
                M${s},0
                L${V.V3.polar(l,-V.gc/r).plus(V.V3.polar(a-t,-V.gc/r/2))}`,className:"valley pink-stroke"}),f.createElement("path",{d:k.nl`
                M${V.V3.polar(l,-V.gc/r).plus(V.V3.polar(a-t,-V.gc/r/2))}
                L${V.V3.polar(s,-V.gc/r)}`,className:"mountain orange-stroke"}),f.createElement("path",{d:k.nl`
                M${c}
                L${d}`,className:"valley red-stroke"}))),f.createElement("g",{className:"cut"},f.createElement("circle",{r:n})))}const N=a.p+"5bb414b3e68931cf1be5.jpg",A=e=>{const t={fontSize:4,dominantBaseline:"middle"};return(0,f.useContext)(b.kM)?null:f.createElement("g",{...e},f.createElement("text",{style:t,y:-4},"valley"),f.createElement("line",{x1:20,y1:-4,x2:40,y2:-4,className:"valley"}),f.createElement("text",{style:t,y:4},"mountain"),f.createElement("line",{x1:20,y1:4,x2:40,y2:4,className:"mountain"}))},Z=e=>{const{baseRadius:t,topRadius:a,radius:n,sides:r,paperSize:l}=e,s=V.gc/r/2,o=(0,k.oe)(r,t),i=(0,k.oe)(r,a),c=(a-t)/2/Math.cos(s),m=(R(n,2*s,o+c),(0,V.V)(o,0).plus(V.V3.polar(a-t,-s))),u=V.V3.polar(1,-(s+s)),d=e=>m.plus(u.times(e)),p=d((0,V.zj)((e=>d(e).length()-n),1,4)),h=n;return f.createElement(x,{...e},f.createElement("g",null,f.createElement(k.hv,{radius:o,sides:r,className:"valley"}),f.createElement("circle",{r:n,className:"cut"}),f.createElement(b.UH,{offset:-.5,from:[0,0],to:V.V3.polar(t,s)},"baseRadius"),f.createElement(b.UH,{offset:-.5,from:V.V3.polar(t,s),to:V.V3.polar(a,s),hideRight:!0},"topRadius"),f.createElement(b.UH,{offset:-.5,from:V.V3.polar(a,s),to:V.V3.polar(n,s),hideRight:!0},"radius"),f.createElement(k.kC,{id:"rotsym",count:r,stepDeg:360/r},f.createElement("path",{d:k.nl`
                M${o},0 
                L${(0,V.V)(o,0).plus(V.V3.polar(a-t,-s))}`,className:"mountain red-stroke"}),f.createElement("path",{d:k.nl`
                M${i},0
                L${(0,V.V)(o,0).plus(V.V3.polar(a-t,-s))}`,className:"mountain orange-stroke"}),f.createElement("path",{d:k.nl`
                M${(0,V.V)(o,0).plus(V.V3.polar(a-t,-s))}
                L${V.V3.polar(i,-V.gc/r)}`,className:"valley orange-stroke"}),f.createElement("path",{d:k.nl`
                M${(0,V.V)(o,0).plus(V.V3.polar(a-t,-s))}
                L${p}`,className:"mountain blue-stroke"}),f.createElement("path",{d:k.nl`
                M${p}
                A${h},${h},0,0,1,${V.V3.polar(n,-V.gc/r)}`,className:"cut"}),f.createElement("path",{d:k.nl`
                M${(0,V.V)(o,0)}
                H${n}`,className:"valley green-stroke"}),l&&f.createElement("path",{d:k.nl`
                M0,0
                H${t/2}`,className:"valley pink"})),f.createElement(C.G,{center:[o,0],start:-s,toRel:s}),f.createElement(C.G,{center:(0,V.V)(o,0).plus(V.V3.polar(a-t,-s)),start:2*-s,toRel:s}),f.createElement(b.UH,{from:[n,0],to:p}),f.createElement(b.UH,{from:p,to:V.V3.polar(n,-V.gc/r)}),f.createElement(A,{transform:`translate(${-n}, ${-n})`,x:100,y:100})))},S=()=>{const[e,t]=(0,E.q)({variant:"inside",baseRadius:30,topRadius:65,radius:100,sides:8}),a=(0,f.useCallback)((e=>t((t=>({...t,...e})))),[t]),[V,k]=(0,f.useState)(null),b={inside:w,outside:Z}[e.variant],C=(0,h.Z)(),M=e.radius-e.topRadius-e.baseRadius;return f.createElement(c.ZP,{container:!0,style:{width:"100%"}},f.createElement(c.ZP,{item:!0,xs:12,md:10},f.createElement(b,{...e,paperSize:V,style:{width:"100%",height:"100%",margin:C.spacing(1)}})),f.createElement(c.ZP,{item:!0,xs:12,md:2,sx:{display:"flex",flexDirection:"column",width:"100%",padding:2,alignItems:"stretch",gap:2}},f.createElement(r.Z,null,f.createElement(s.Z,{image:y,title:"Contemplative Reptile",sx:{height:0,paddingTop:"100%"}}),f.createElement(l.Z,null,"Helper to build a box from a circular piece of paper. The Inside Folds variant has more complicated folds but has a cleaner overall look.")),f.createElement(i.Z,{variant:"outlined",size:"small"},f.createElement(m.Z,{id:"variant-label"},"Variant"),f.createElement(p.Z,{labelId:"variant-label",label:"Variant",value:e.variant,onChange:e=>a({variant:e.target.value})},f.createElement(d.Z,{value:"inside"},"Inside Folds"),f.createElement(d.Z,{value:"outside"},"Outside Folds"))),f.createElement(g.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1},value:e.baseRadius,onChange:e=>a({baseRadius:+e.target.value}),label:"baseRadius"}),f.createElement(g.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1},value:e.topRadius,onChange:e=>a({topRadius:+e.target.value}),label:"topRadius"}),f.createElement(g.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1},value:e.radius,onChange:e=>a({radius:+e.target.value}),label:"Radius"}),f.createElement(g.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:4,max:32},value:e.sides,onChange:e=>a({sides:+e.target.value}),label:"Sides"}),"inside"===e.variant&&M>0&&f.createElement(n.Z,{severity:"warning"},"For the inside folds variant, you want no (or even negative) overlap at the top."),f.createElement(o.Z,null),f.createElement(r.Z,null,f.createElement(l.Z,null,"Set the Print Paper Size on large boxes to get a partial template which can be rotated. See"," ",f.createElement(u.Z,{href:N},"this image")," for an example.")),f.createElement($.W,{label:"Print Paper Size",value:V,onChange:k}),f.createElement(v.F,{baseFileName:`${e.variant}-${e.baseRadius}-${e.topRadius}-${e.radius}-${e.sides}`,what:f.createElement(b,{...e,paperSize:V})})))}}}]);
//# sourceMappingURL=paperBox2-index.js.map