"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[585],{9874:(e,t,n)=>{n.d(t,{q:()=>p});var a=n(6897),r=n.n(a),l=n(508),i=n.n(l),o=n(9526);const s=e=>e?e.substring(1).split("&").map((e=>{const[t,n]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(n)]})).reduce(((e,[t,n])=>(e[t]=n,e)),{}):{},c=e=>"#"+Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&"),m=e=>i()(e,(e=>"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:""===e?"":isNaN(+e)?e:+e))),d=e=>i()(e,(e=>""+e));function p(e,{deserialize:t=m,serialize:n=d,wait:a=1e3}={}){const l=(0,o.useCallback)((()=>{const a="function"==typeof e?e():e,r=t(Object.assign(n(a),s(document.location.hash)));return history.pushState(void 0,document.title,c(n(r))),r}),[t,e,n]),[i,p]=(0,o.useState)(l),h=(0,o.useRef)();return h.current||(h.current=r()((function(e){history.pushState(void 0,document.title,c(n(e)))}),a)),(0,o.useEffect)((()=>h.current(i)),[i]),(0,o.useEffect)((()=>{const e=()=>{p(l())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[l]),[i,p]}},3514:(e,t,n)=>{n.d(t,{F:()=>c});var a=n(8864),r=n(1413),l=n.n(r),i=n(9526),o=n(2279),s=n(4004);function c({what:e,baseFileName:t}){const r=()=>o.renderToStaticMarkup(i.createElement(s.k.Provider,{value:!0},e)).replace(/\s{2,}/g," ");return i.createElement(i.Fragment,null,i.createElement(a.Z,{variant:"contained",onClick:()=>{const e=r();l()(e,t+".svg")}},"Download As SVG"),i.createElement(a.Z,{variant:"contained",onClick:async()=>{const{svgToPdf:e}=await Promise.all([n.e(853),n.e(898)]).then(n.bind(n,6997)),a=await e({title:t,author:"Adrian Leonhard",svg:r()});l()(a,t+".pdf")}},"Template as PDF"))}},4004:(e,t,n)=>{n.d(t,{U:()=>i,k:()=>l});var a=n(9526),r=n(2182);const l=(0,a.createContext)(!1);function i({from:e,to:t,children:n,hideRight:i=!1,offset:o=0}){Array.isArray(e)&&(e=(0,r.V)(e)),Array.isArray(t)&&(t=(0,r.V)(t));const s=e.to(t),c=s.length();if((0,a.useContext)(l))return null;if(c<.05)return null;n||=""+(0,r.At)(c,-1);const m=3*n.length;return a.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${s.angleXY()/r.Co}) translate(0, ${10*o})`,className:"measure"},!i&&a.createElement("path",{style:{fill:"none"},d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2"}),a.createElement("path",{style:{fill:"none"},d:`\n        M0,5\n        H${(c-m)/2}\n        M${(c+m)/2},5\n        H${c}\n        M${c},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`}),a.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:c/2,y:5},n))}},7727:(e,t,n)=>{n.d(t,{G:()=>o});var a=n(9526),r=n(2182),l=n(3671),i=n(4004);function o({center:e,start:t,toRel:n,children:o}){if(Array.isArray(e)&&(e=(0,r.V)(e)),(0,a.useContext)(i.k))return null;const s=r.V3.polar(20,t).plus((0,r.V)(e)),c=r.V3.polar(20,t+n).plus((0,r.V)(e)),m=r.V3.polar(14,t+n/2).plus((0,r.V)(e)),d=Math.abs(n)>Math.PI?"1":"0",p=n>0?"1":"0";return a.createElement("g",{className:"measure"},a.createElement("path",{style:{fill:"none"},d:`M${s.x},${s.y} A20,20,0,${d},${p},${c.x},${c.y}`}),a.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:m.x,y:m.y},null!=(h=o)?h:(()=>(0,l.X$)(n))()));var h}},6446:(e,t,n)=>{n.d(t,{W:()=>o});var a=n(302),r=n(3121),l=n(9526),i=n(3671);const o=(0,l.forwardRef)((({disableClearance:e=!1,onChange:t,value:n,label:o},s)=>{let c=null;if(n){const[e,t]=n,[a,r]=e<t?[e,t]:[t,e];c=null!=(m=i.li.find((([e,t])=>e===a&&t===r)))?m:(()=>[a,r,"custom"])()}var m;return l.createElement(a.Z,{ref:s,disableClearable:e,size:"small",freeSolo:!0,renderInput:e=>l.createElement(r.Z,{...e,label:o,variant:"outlined"}),value:c,onChange:(n,a)=>{if("string"==typeof a)if(""===a.trim())e||t(null);else{const e=/(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/.exec(a);if(e){const[,n,a]=e;t((0,i.PN)(+n,+a))}}else t(a)},getOptionLabel:e=>{const[t,n,a="custom"]=e;return`${a} ${t}x${n}mm`},options:i.li})}))},3671:(e,t,n)=>{n.d(t,{$Q:()=>f,PM:()=>l,PN:()=>E,Qn:()=>s,X$:()=>i,XJ:()=>o,YQ:()=>x,_x:()=>d,hv:()=>p,kC:()=>h,li:()=>u,nA:()=>g,nl:()=>v,oe:()=>m,q3:()=>c,t1:()=>y});var a=n(9526),r=n(2182);const l=25.4,i=e=>(0,r.At)(e/r.Co,-1)+"°",o=(e,t)=>t/2/Math.sin(r.gc/e/2),s=(e,t)=>2*t*Math.sin(r.gc/e/2),c=(e,t)=>t/2/Math.tan(r.gc/e/2),m=(e,t)=>t/Math.cos(r.gc/e/2),d=(e,t)=>2*t*Math.tan(r.gc/e/2);function p({sides:e,radius:t,startAngle:n=0,sideLength:l,...i}){if(void 0!==l==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=o(e,l));const{x:s,y:c}=r.V3.polar(t,n);return a.createElement("path",{d:v`
        M${s},${c}
        ${(0,r.hS)(0,e).map((a=>v`L${r.V3.polar(t,n+a*(r.gc/e))}`))}Z`,...i})}function h({id:e,children:t,count:n,stepDeg:l}){return a.createElement(a.Fragment,null,a.createElement("g",{id:e},t),(0,r.hS)(0,n-1).map((t=>a.createElement("use",{key:t,xlinkHref:"#"+e,transform:`rotate(${(t+1)*l} 0 0)`}))))}const u=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]];function g(e){const t=u.find((([,,t])=>t===e));if(t)return t;const[n,a]=e.split("x");return[+n,+a,"Custom"]}function E(e,t){return[e,t]=[e,t].sort(r.uK),null!=(n=u.find((([n,a])=>n===e&&a===t)))?n:(()=>[e,t,"Custom"])();var n}function f([e,t,n]){return"Custom"===n?e+"x"+t:n}const y=u.find((([,,e])=>"A4"===e));function v(e,...t){const n=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(n).join(" "):e.x+","+e.y;let a=e[0];for(let r=0;r<t.length;r++)a+=n(t[r]),a+=e[r+1];return a}const x=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},7499:(e,t,n)=>{n.r(t),n.d(t,{default:()=>L});var a=n(6908),r=n(8578),l=n(5069),i=n(4854),o=n(4353),s=n(6726),c=n(9717),m=n(871),d=n(2525),p=n(6756),h=n(907),u=n(8051),g=n(3121),E=n(9526),f=n(2182),y=n(9874),v=n(3671),x=n(3514);const b=n.p+"5f305f1aadc5e269e4f4.jpg";var A=n(6446),M=n(4065),O=n(4004),w=n(7727);function k({height:e,width:t,topLip:n=100,bottomLip:a,theta:r,sideWidth:l,sides:i,style:o}){const s=f.gc/i/2,c=(Math.tan(s),t-i*l),m=Math.tan(s)*a,d=r*f.Co,p=e-a-n,h=(0,v.XJ)(i,l),u=(0,v.q3)(i,l),g=u+(i%2==0?u:h),y=(0,E.useContext)(O.k),x=(0,M.QI)([{type:M.OU.MOVE_TO,relative:!1,x:0,y:e-a},{type:M.OU.HORIZ_LINE_TO,relative:!1,x:t},...(0,f.hS)(0,i+1).flatMap((t=>[{type:M.OU.MOVE_TO,relative:!1,x:t*l,y:n},{type:M.OU.VERT_LINE_TO,relative:!1,y:e-a},{type:M.OU.MOVE_TO,relative:!1,x:t*l,y:e-a},{type:M.OU.LINE_TO,relative:!1,x:t*l+Math.tan(s+d)*a,y:e}])),{type:M.OU.MOVE_TO,relative:!1,x:0,y:n},{type:M.OU.HORIZ_LINE_TO,relative:!1,x:t}]),b=(0,M.QI)([...(0,f.hS)(0,i+1).flatMap((t=>[{type:M.OU.MOVE_TO,relative:!1,x:t*l,y:e-a},{type:M.OU.LINE_TO,relative:!0,x:Math.sin(d)*a,y:a}])),...(0,f.hS)(0,i).flatMap((e=>[{type:M.OU.MOVE_TO,relative:!1,x:(e+1)*l,y:0},{type:M.OU.VERT_LINE_TO,relative:!1,y:n}]))]),A=-p-10-h,k=y?[0,0,t,e]:[-10,-10,t+20,e+30],L=a*Math.tan(d);return E.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"none",stroke:"#123456",strokeWidth:2*v.PM/300,...o},width:k[2]+"mm",height:k[3]+"mm",viewBox:k.join(" "),className:"adrian"},E.createElement("defs",null,E.createElement("pattern",{id:"glue",patternUnits:"userSpaceOnUse",width:"4",height:"4"},E.createElement("path",{d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",style:{stroke:"#eee",strokeWidth:1}})),E.createElement("clipPath",{id:"page"},E.createElement("rect",{width:t,height:e}))),E.createElement("g",{clipPath:"url(#page)"},!y&&E.createElement("rect",{width:c,height:e,fill:"url(#glue)",stroke:"none"}),E.createElement("rect",{width:t,height:e}),E.createElement("path",{d:x,style:{strokeDasharray:"1,1"}}),E.createElement("path",{d:b,style:{strokeDasharray:"10,2,1,1,1,2"}}),(0,f.hS)(0,i).map((t=>{const n=(0,f.V)(t*l,e-a).plus(f.V3.polar(h,90*f.Co-s-d));return E.createElement("circle",{key:t,cx:n.x,cy:n.y,r:.5,stroke:"black"})}))),E.createElement(O.U,{from:[0,0],to:[0,n]},"topLip"),E.createElement(O.U,{from:[0,n],to:[0,e-a]},""+(0,f.At)(e-n-a,-1)),E.createElement(O.U,{from:[0,e-a],to:[0,e]},"bottomLip"),E.createElement(O.U,{from:[0,0],to:[l,0]},"sideWidth"),(0,f.hS)(1,i).map((e=>E.createElement(O.U,{key:e,from:[e*l,0],to:[(e+1)*l,0],hideRight:!0},""+(0,f.At)(l*(e+1),-1)))),E.createElement(O.U,{from:[0,e],to:[L,e]},""+(0,f.At)(L,-2)),(0,f.hS)(0,i).map((t=>E.createElement(O.U,{key:t,from:[L+t*l,e],to:[L+(t+1)*l,e],hideRight:!0},""+(0,f.At)(L+l*(t+1),-1)))),E.createElement(O.U,{from:[i*l,0],to:[t,0]},""+(0,f.At)(c,-1)),E.createElement(O.U,{from:[l,e],to:[l+m,e],offset:1},""+(0,f.At)(m,-1)),m<l&&E.createElement(O.U,{from:[l+m,e],to:[l+l,e],offset:1},""+(0,f.At)(l-m,-1)),E.createElement(w.G,{center:[2*l,e-a],start:90*f.Co,toRel:-s},(0,v.X$)(s)),!y&&E.createElement("g",{transform:`translate(200, ${2*p})`,style:{stroke:"blue"}},E.createElement("rect",{transform:"translate(0, -0)",x:-u,y:-p-10-h,width:g,height:p}),E.createElement("path",{d:`${(0,f.hS)(2,i/2).map((e=>"M"+f.V3.polar(h,f.gc/i*e+(Math.PI-f.gc/i/2)).x+","+A+" v"+p)).join(" ")} `}),E.createElement(O.U,{from:[-u,A],to:[-u,A+p]},""+(0,f.At)(p,-1)),E.createElement(O.U,{from:[-u,A+p],to:[-u+g,A+p]},""+(0,f.At)(g,-1)),E.createElement("path",{d:`${(0,f.hS)(0,i).map((e=>{const t=f.V3.polar(h,f.gc/i*e+(Math.PI-f.gc/i/2));return(0===e?"M":"L")+t.x+","+t.y})).join(" ")} Z`}),E.createElement("path",{d:(0,M.QI)([...(0,f.hS)(0,i).flatMap((e=>{const t=f.V3.polar(h,f.gc/i*e+(Math.PI-f.gc/i/2)),n=f.V3.polar(a/Math.cos(s+d),f.gc/i*e+-f.gc/i/2+d);return[{type:M.OU.MOVE_TO,relative:!1,x:t.x,y:t.y},{type:M.OU.LINE_TO,relative:!0,x:n.x,y:n.y}]}))])})))}const L=()=>{const[e,t]=(0,y.q)({width:v.t1[1],height:v.t1[0],sides:6,sideWidth:45,topLip:30,bottomLip:30,theta:5}),n=e.width>e.height,[M,O]=[e.width,e.height],w=Math.floor((O-e.bottomLip-1)/2),[L,C]=(0,E.useState)(!0),$=f.gc/e.sides/2,U=(0,f.At)(e.sideWidth/Math.tan($),-1),[Z,P]=(0,E.useState)(!1),I=(0,E.useCallback)((n=>{t((t=>{const a={...t,...n};return L&&w!==e.topLip&&(a.topLip=w),Z&&U!==e.bottomLip&&(a.bottomLip=U),a}))}),[t,L,w,e.topLip,e.bottomLip,Z,U]),V=(0,u.Z)();return E.createElement(m.ZP,{container:!0,style:{width:"100%"}},E.createElement(m.ZP,{item:!0,xs:12,md:10,style:{display:"flex",alignItems:"center",maxHeight:"100vh",padding:V.spacing(2)}},E.createElement(k,{...e,style:{maxWidth:"100%",maxHeight:"100%",height:"auto",margin:"auto"}})),E.createElement(m.ZP,{item:!0,xs:12,md:2,sx:{display:"flex",flexDirection:"column",width:"100%",padding:2,alignItems:"stretch",gap:2}},E.createElement(l.Z,null,E.createElement(o.Z,{image:b,title:"Hexagonal Prism Box",sx:{height:0,paddingTop:"100%"}}),E.createElement(i.Z,null,"Helper to build"," ",E.createElement(h.Z,{href:"https://www.paperkawaii.com/video-tutorial-origami-hexagonal-gift-box/"},"this box"),". All measurements are in millimeters. To make a lid, you should increase the sideWidth by 1mm and ~halve the paper height.")),E.createElement(A.W,{label:"Paper Size",value:(0,v.PN)(M,O),onChange:e=>{const[t,a]=e;I(n?{width:a,height:t}:{width:t,height:a})}}),E.createElement(c.Z,{control:E.createElement(s.Z,{checked:n,onChange:()=>{I({width:O,height:M})},color:"primary"}),label:"Landscape"}),E.createElement(g.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:3,max:16},value:e.sides,onChange:e=>I({sides:+e.target.value}),label:"Sides"}),E.createElement(g.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:1},value:e.sideWidth,onChange:e=>I({sideWidth:+e.target.value}),InputProps:{endAdornment:E.createElement(p.Z,{position:"end"},"mm")},label:"sideWidth"}),E.createElement(g.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:0},value:e.theta,onChange:e=>I({theta:+e.target.value}),InputProps:{endAdornment:E.createElement(p.Z,{position:"end"},"mm")},label:"theta"}),E.createElement(g.Z,{variant:"outlined",disabled:L,size:"small",type:"number",inputProps:{step:1,min:0,max:w},value:e.topLip,onChange:e=>I({topLip:+e.target.value}),InputProps:{endAdornment:E.createElement(E.Fragment,null,E.createElement(p.Z,{position:"end"},"mm"),E.createElement(d.Z,{onClick:()=>{C(!L),I({})},size:"large"},L?E.createElement(a.Z,{color:"primary"}):E.createElement(r.Z,null)))},label:"topLip"}),E.createElement(g.Z,{variant:"outlined",disabled:Z,size:"small",type:"number",inputProps:{step:1,min:0},value:e.bottomLip,onChange:e=>I({bottomLip:+e.target.value}),InputProps:{endAdornment:E.createElement(E.Fragment,null,E.createElement(p.Z,{position:"end"},"mm"),E.createElement(d.Z,{onClick:()=>{P(!Z),I({})},size:"large"},Z?E.createElement(a.Z,{color:"primary"}):E.createElement(r.Z,null)))},label:"bottomLip"}),E.createElement(x.F,{what:E.createElement(k,{...e}),baseFileName:`${M}x${O}-${e.sides}x${e.sideWidth}-${e.topLip}-${e.bottomLip}`})))}}}]);
//# sourceMappingURL=paperBox1-index.js.map