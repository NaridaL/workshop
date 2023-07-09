/*! For license information please see paperPolygonBox-index.js.LICENSE.txt */
"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[269],{4341:(e,t,r)=>{r.d(t,{q:()=>p});var n=r(6897),i=r.n(n),a=r(508),o=r.n(a),s=r(9526);const l=e=>e?e.substring(1).split("&").map((e=>{const[t,r]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(r)]})).reduce(((e,[t,r])=>(e[t]=r,e)),{}):{},c=e=>"#"+Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&"),u=e=>o()(e,(e=>"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:""===e?"":isNaN(+e)?e:+e))),h=e=>o()(e,(e=>""+e));function p(e,{deserialize:t=u,serialize:r=h,wait:n=1e3}={}){const a=(0,s.useCallback)((()=>{const n="function"==typeof e?e():e,i=t(Object.assign(r(n),l(document.location.hash)));return history.pushState(void 0,document.title,c(r(i))),i}),[t,e,r]),[o,p]=(0,s.useState)(a),m=(0,s.useRef)();return m.current||(m.current=i()((function(e){history.pushState(void 0,document.title,c(r(e)))}),n)),(0,s.useEffect)((()=>m.current(o)),[o]),(0,s.useEffect)((()=>{const e=()=>{p(a())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[a]),[o,p]}},6623:(e,t,r)=>{r.d(t,{F:()=>c});var n=r(8864),i=r(1413),a=r.n(i),o=r(9526),s=r(2279),l=r(9536);function c({what:e,baseFileName:t}){const i=()=>s.renderToStaticMarkup(o.createElement(l.k.Provider,{value:!0},e)).replace(/\s{2,}/g," ");return o.createElement(o.Fragment,null,o.createElement(n.Z,{variant:"contained",onClick:()=>{const e=i();a()(e,t+".svg")}},"Download As SVG"),o.createElement(n.Z,{variant:"contained",onClick:async()=>{const{svgToPdf:e}=await Promise.all([r.e(853),r.e(898)]).then(r.bind(r,2566)),n=await e({title:t,author:"Adrian Leonhard",svg:i()});a()(n,t+".pdf")}},"Template as PDF"))}},9536:(e,t,r)=>{r.d(t,{U:()=>o,k:()=>a});var n=r(9526),i=r(2182);const a=(0,n.createContext)(!1);function o({from:e,to:t,children:r,hideRight:o=!1,offset:s=0}){Array.isArray(e)&&(e=(0,i.V)(e)),Array.isArray(t)&&(t=(0,i.V)(t));const l=e.to(t),c=l.length();if((0,n.useContext)(a))return null;if(c<.05)return null;r||=""+(0,i.At)(c,-1);const u=3*r.length;return n.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${l.angleXY()/i.Co}) translate(0, ${10*s})`,className:"measure"},!o&&n.createElement("path",{style:{fill:"none"},d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2"}),n.createElement("path",{style:{fill:"none"},d:`\n        M0,5\n        H${(c-u)/2}\n        M${(c+u)/2},5\n        H${c}\n        M${c},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`}),n.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:c/2,y:5},r))}},3758:(e,t,r)=>{r.d(t,{W:()=>s});var n=r(302),i=r(3121),a=r(9526),o=r(6415);const s=(0,a.forwardRef)((({disableClearance:e=!1,onChange:t,value:r,label:s},l)=>{let c=null;if(r){const[e,t]=r;c=(0,o.PN)(e,t)}return a.createElement(n.Z,{ref:l,disableClearable:e,size:"small",freeSolo:!0,renderInput:e=>a.createElement(i.Z,{...e,label:s,variant:"outlined"}),value:c,onChange:(r,n)=>{if("string"==typeof n)if(""===n.trim())e||t(null);else{const e=/(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/.exec(n);if(e){const[,r,n]=e;t((0,o.PN)(+r,+n))}}else t(n)},getOptionLabel:e=>{const[t,r,n="custom"]=e;return`${n} ${t}x${r}mm`},options:o.li})}))},6415:(e,t,r)=>{r.d(t,{$Q:()=>f,PM:()=>a,PN:()=>y,Qn:()=>l,X$:()=>o,XJ:()=>s,YQ:()=>x,_x:()=>h,hv:()=>p,kC:()=>m,li:()=>d,nA:()=>v,nl:()=>T,oe:()=>u,q3:()=>c,t1:()=>O});var n=r(9526),i=r(2182);const a=25.4,o=e=>(0,i.At)(e/i.Co,-1)+"°",s=(e,t)=>t/2/Math.sin(i.gc/e/2),l=(e,t)=>2*t*Math.sin(i.gc/e/2),c=(e,t)=>t/2/Math.tan(i.gc/e/2),u=(e,t)=>t/Math.cos(i.gc/e/2),h=(e,t)=>2*t*Math.tan(i.gc/e/2);function p({sides:e,radius:t,startAngle:r=0,sideLength:a,...o}){if(void 0!==a==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=s(e,a));const{x:l,y:c}=i.V3.polar(t,r);return n.createElement("path",{d:T`
        M${l},${c}
        ${(0,i.hS)(0,e).map((n=>T`L${i.V3.polar(t,r+n*(i.gc/e))}`))}Z`,...o})}function m({id:e,children:t,count:r,stepDeg:a}){return n.createElement(n.Fragment,null,n.createElement("g",{id:e},t),(0,i.hS)(0,r-1).map((t=>n.createElement("use",{key:t,xlinkHref:"#"+e,transform:`rotate(${(t+1)*a} 0 0)`}))))}const d=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]];function v(e){const t=d.find((([,,t])=>t===e));if(t)return t;const[r,n]=e.split("x");return[+r,+n,"Custom"]}function y(e,t){return[e,t]=[e,t].sort(i.uK),null!=(r=d.find((([r,n])=>r===e&&n===t)))?r:(()=>[e,t,"Custom"])();var r}function f([e,t,r]){return"Custom"===r?e+"x"+t:r}const O=d.find((([,,e])=>"A4"===e));function T(e,...t){const r=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(r).join(" "):e.x+","+e.y;let n=e[0];for(let i=0;i<t.length;i++)n+=r(t[i]),n+=e[i+1];return n}const x=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},9968:(e,t,r)=>{r.r(t),r.d(t,{default:()=>T});var n=r(5069),i=r(4353),a=r(3394),o=r(871),s=r(8051),l=r(3121),c=r(9526),u=r(2182),h=r(4341),p=r(6415),m=r(6623),d=r(3758),v=r(4065),y=r(9536);function f(e,t,r,n){const i=Math.min(e,t),a=r/2,o=a/(1-Math.cos(45*u.Co)),s=o*Math.sin(45*u.Co),l=Math.sin(45*u.Co)*n+a;return{a:i,d:a,r2:o,h:s,s:l,t:2*Math.sin(45*u.Co)*n+a,envelopeWidth:Math.sin(45*u.Co)*(i-a-l)*2}}function O({paperSize:e,envelopeHeight:t,overlap:r,cornerRadius:n,style:i}){const a=10,[o,s]=e,{a:l,d:u,r2:h,h:m,s:d,t:O}=f(o,s,r,t),T=(e,t,r)=>({type:v.OU.ARC,rX:e,rY:e,xRot:0,lArcFlag:0,sweepFlag:1,x:t,y:r,relative:!1}),x=new v.OU([{type:v.OU.MOVE_TO,x:0,y:a,relative:!1},T(a,a,0),{type:v.OU.LINE_TO,x:l-d-m,y:0,relative:!1},T(h,l-d,u),T(h,l-d+m,0),{type:v.OU.LINE_TO,x:l-a,y:0,relative:!1},T(a,l,a),{type:v.OU.LINE_TO,x:l,y:d-m,relative:!1},T(h,l-u,d),T(h,l,d+m),{type:v.OU.LINE_TO,x:l,y:O-m,relative:!1},T(h,l-u,O),{type:v.OU.LINE_TO,x:O,y:l-u,relative:!1},T(h,O-m,l),{type:v.OU.LINE_TO,x:d+m,y:l,relative:!1},T(h,d,l-u),T(h,d-m,l),{type:v.OU.LINE_TO,x:a,y:l,relative:!1},T(a,0,l-a),{type:v.OU.LINE_TO,x:0,y:l-d+m,relative:!1},T(h,u,l-d),T(h,0,l-d-m),{type:v.OU.CLOSE_PATH}]).encode(),g=new v.OU([{type:v.OU.MOVE_TO,x:l-d,y:u,relative:!1},{type:v.OU.LINE_TO,x:l-u,y:d,relative:!1},{type:v.OU.LINE_TO,x:d,y:l-u,relative:!1},{type:v.OU.LINE_TO,x:u,y:l-d,relative:!1},{type:v.OU.CLOSE_PATH}]).encode();return c.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"none",stroke:"#123456",strokeWidth:2*p.PM/300,...i},width:o+"mm",height:s+"mm",viewBox:`0 0 ${o} ${s}`,className:"adrian"},c.createElement("defs",null,c.createElement("pattern",{id:"glue",patternUnits:"userSpaceOnUse",width:"4",height:"4"},c.createElement("path",{d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",style:{stroke:"#eee",strokeWidth:1}})),c.createElement("clipPath",{id:"page"},c.createElement("rect",{width:o,height:s}))),c.createElement("style",null,".valley {stroke-dasharray: 1,1;} ",".outline {stroke-dasharray: .1,1;} ",".mountain {stroke-dasharray: 10,2,1,1,1,2;} "),c.createElement("g",{clipPath:"url(#page)"}),c.createElement("path",{d:x}),c.createElement("path",{d:g,className:"valley"}),c.createElement(y.U,{from:[l-d,u],to:[l-u,d]}),c.createElement(y.U,{from:[u,l-d],to:[l-d,u]}))}const T=()=>{const[e,t]=(0,h.q)({overlap:10,envelopeHeight:108,cornerRadius:10,paperSize:(0,p.$Q)(p.t1)}),r=(0,c.useCallback)((e=>t((t=>({...t,...e})))),[t]),v=(0,p.nA)(e.paperSize),{envelopeWidth:y}=f(v[0],v[1],e.overlap,e.envelopeHeight),T=(0,s.Z)();return c.createElement(o.ZP,{container:!0,style:{width:"100%"}},c.createElement(o.ZP,{item:!0,xs:12,md:10},c.createElement(O,{...e,paperSize:v,style:{width:"100%",height:"100%",margin:T.spacing(1)}})),c.createElement(o.ZP,{item:!0,xs:12,md:2,sx:{display:"flex",flexDirection:"column",width:"100%",padding:2,alignItems:"stretch",gap:2}},c.createElement(n.Z,null,c.createElement(i.Z,{image:"",title:"Contemplative Reptile",sx:{height:0,paddingTop:"100%"}})),c.createElement(d.W,{label:"Paper Size",value:v,disableClearance:!0,onChange:e=>r({paperSize:(0,p.$Q)(e)})}),c.createElement(l.Z,{label:"Envelope Height",variant:"outlined",size:"small",type:"number",inputProps:{min:25,step:1},value:e.envelopeHeight,onChange:e=>r({envelopeHeight:+e.target.value})}),c.createElement(l.Z,{variant:"outlined",size:"small",type:"number",disabled:!0,value:(0,u.At)(y/e.envelopeHeight,-2),label:"Aspect Ratio"}),c.createElement(l.Z,{variant:"outlined",size:"small",type:"number",inputProps:{min:0,step:1},value:e.cornerRadius,onChange:e=>r({cornerRadius:+e.target.value}),label:"Corner Radius"}),c.createElement(l.Z,{variant:"outlined",size:"small",type:"number",inputProps:{min:0,step:1},value:e.overlap,onChange:e=>r({overlap:+e.target.value}),label:"Overlap"}),c.createElement(a.Z,null),c.createElement(m.F,{baseFileName:`envelope-${v[0]}-${e.envelopeHeight}-${e.overlap}`,what:c.createElement(O,{...e,paperSize:v})})))}},3394:(e,t,r)=>{r.d(t,{Z:()=>y});var n=r(1972),i=r(7692),a=r(9526),o=r(3060),s=r(3957),l=r(2945),c=r(949),u=r(7260),h=r(3272),p=r(7557);const m=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],d=(0,c.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,"vertical"===r.orientation&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&"vertical"===r.orientation&&t.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignLeft]}})((({theme:e,ownerState:t})=>(0,i.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin"},t.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},t.light&&{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:(0,l.Fq)(e.palette.divider,.08)},"inset"===t.variant&&{marginLeft:72},"middle"===t.variant&&"horizontal"===t.orientation&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},"middle"===t.variant&&"vertical"===t.orientation&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"vertical"===t.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},t.flexItem&&{alignSelf:"stretch",height:"auto"})),(({ownerState:e})=>(0,i.Z)({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}})),(({theme:e,ownerState:t})=>(0,i.Z)({},t.children&&"vertical"!==t.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`}})),(({theme:e,ownerState:t})=>(0,i.Z)({},t.children&&"vertical"===t.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`}})),(({ownerState:e})=>(0,i.Z)({},"right"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}}))),v=(0,c.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.wrapper,"vertical"===r.orientation&&t.wrapperVertical]}})((({theme:e,ownerState:t})=>(0,i.Z)({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`},"vertical"===t.orientation&&{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`}))),y=a.forwardRef((function(e,t){const r=(0,u.Z)({props:e,name:"MuiDivider"}),{absolute:a=!1,children:l,className:c,component:y=(l?"div":"hr"),flexItem:f=!1,light:O=!1,orientation:T="horizontal",role:x=("hr"!==y?"separator":void 0),textAlign:g="center",variant:_="fullWidth"}=r,E=(0,n.Z)(r,m),N=(0,i.Z)({},r,{absolute:a,component:y,flexItem:f,light:O,orientation:T,role:x,textAlign:g,variant:_}),A=(e=>{const{absolute:t,children:r,classes:n,flexItem:i,light:a,orientation:o,textAlign:l,variant:c}=e,u={root:["root",t&&"absolute",c,a&&"light","vertical"===o&&"vertical",i&&"flexItem",r&&"withChildren",r&&"vertical"===o&&"withChildrenVertical","right"===l&&"vertical"!==o&&"textAlignRight","left"===l&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]};return(0,s.Z)(u,h.V,n)})(N);return(0,p.jsx)(d,(0,i.Z)({as:y,className:(0,o.Z)(A.root,c),role:x,ref:t,ownerState:N},E,{children:l?(0,p.jsx)(v,{className:A.wrapper,ownerState:N,children:l}):null}))}))},3272:(e,t,r)=>{r.d(t,{V:()=>a,Z:()=>o});var n=r(7402),i=r(5111);function a(e){return(0,i.Z)("MuiDivider",e)}const o=(0,n.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"])},4065:(e,t,r)=>{r.d(t,{OU:()=>_,QI:()=>a});var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}function a(e){var t="";Array.isArray(e)||(e=[e]);for(var r=0;r<e.length;r++){var n=e[r];if(n.type===_.CLOSE_PATH)t+="z";else if(n.type===_.HORIZ_LINE_TO)t+=(n.relative?"h":"H")+n.x;else if(n.type===_.VERT_LINE_TO)t+=(n.relative?"v":"V")+n.y;else if(n.type===_.MOVE_TO)t+=(n.relative?"m":"M")+n.x+" "+n.y;else if(n.type===_.LINE_TO)t+=(n.relative?"l":"L")+n.x+" "+n.y;else if(n.type===_.CURVE_TO)t+=(n.relative?"c":"C")+n.x1+" "+n.y1+" "+n.x2+" "+n.y2+" "+n.x+" "+n.y;else if(n.type===_.SMOOTH_CURVE_TO)t+=(n.relative?"s":"S")+n.x2+" "+n.y2+" "+n.x+" "+n.y;else if(n.type===_.QUAD_TO)t+=(n.relative?"q":"Q")+n.x1+" "+n.y1+" "+n.x+" "+n.y;else if(n.type===_.SMOOTH_QUAD_TO)t+=(n.relative?"t":"T")+n.x+" "+n.y;else{if(n.type!==_.ARC)throw new Error('Unexpected command type "'+n.type+'" at index '+r+".");t+=(n.relative?"a":"A")+n.rX+" "+n.rY+" "+n.xRot+" "+ +n.lArcFlag+" "+ +n.sweepFlag+" "+n.x+" "+n.y}}return t}function o(e,t){var r=e[0],n=e[1];return[r*Math.cos(t)-n*Math.sin(t),r*Math.sin(t)+n*Math.cos(t)]}function s(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var r=0;r<e.length;r++)if("number"!=typeof e[r])throw new Error("assertNumbers arguments["+r+"] is not a number. "+typeof e[r]+" == typeof "+e[r]);return!0}var l=Math.PI;function c(e,t,r){e.lArcFlag=0===e.lArcFlag?0:1,e.sweepFlag=0===e.sweepFlag?0:1;var n=e.rX,i=e.rY,a=e.x,s=e.y;n=Math.abs(e.rX),i=Math.abs(e.rY);var c=o([(t-a)/2,(r-s)/2],-e.xRot/180*l),u=c[0],h=c[1],p=Math.pow(u,2)/Math.pow(n,2)+Math.pow(h,2)/Math.pow(i,2);1<p&&(n*=Math.sqrt(p),i*=Math.sqrt(p)),e.rX=n,e.rY=i;var m=Math.pow(n,2)*Math.pow(h,2)+Math.pow(i,2)*Math.pow(u,2),d=(e.lArcFlag!==e.sweepFlag?1:-1)*Math.sqrt(Math.max(0,(Math.pow(n,2)*Math.pow(i,2)-m)/m)),v=n*h/i*d,y=-i*u/n*d,f=o([v,y],e.xRot/180*l);e.cX=f[0]+(t+a)/2,e.cY=f[1]+(r+s)/2,e.phi1=Math.atan2((h-y)/i,(u-v)/n),e.phi2=Math.atan2((-h-y)/i,(-u-v)/n),0===e.sweepFlag&&e.phi2>e.phi1&&(e.phi2-=2*l),1===e.sweepFlag&&e.phi2<e.phi1&&(e.phi2+=2*l),e.phi1*=180/l,e.phi2*=180/l}function u(e,t,r){s(e,t,r);var n=e*e+t*t-r*r;if(0>n)return[];if(0===n)return[[e*r/(e*e+t*t),t*r/(e*e+t*t)]];var i=Math.sqrt(n);return[[(e*r+t*i)/(e*e+t*t),(t*r-e*i)/(e*e+t*t)],[(e*r-t*i)/(e*e+t*t),(t*r+e*i)/(e*e+t*t)]]}var h,p=Math.PI/180;function m(e,t,r){return(1-r)*e+r*t}function d(e,t,r,n){return e+Math.cos(n/180*l)*t+Math.sin(n/180*l)*r}function v(e,t,r,n){var i=1e-6,a=t-e,o=r-t,s=3*a+3*(n-r)-6*o,l=6*(o-a),c=3*a;return Math.abs(s)<i?[-c/l]:function(e,t,r){void 0===r&&(r=1e-6);var n=e*e/4-t;if(n<-r)return[];if(n<=r)return[-e/2];var i=Math.sqrt(n);return[-e/2-i,-e/2+i]}(l/s,c/s,i)}function y(e,t,r,n,i){var a=1-i;return e*(a*a*a)+t*(3*a*a*i)+r*(3*a*i*i)+n*(i*i*i)}!function(e){function t(){return i((function(e,t,r){return e.relative&&(void 0!==e.x1&&(e.x1+=t),void 0!==e.y1&&(e.y1+=r),void 0!==e.x2&&(e.x2+=t),void 0!==e.y2&&(e.y2+=r),void 0!==e.x&&(e.x+=t),void 0!==e.y&&(e.y+=r),e.relative=!1),e}))}function r(){var e=NaN,t=NaN,r=NaN,n=NaN;return i((function(i,a,o){return i.type&_.SMOOTH_CURVE_TO&&(i.type=_.CURVE_TO,e=isNaN(e)?a:e,t=isNaN(t)?o:t,i.x1=i.relative?a-e:2*a-e,i.y1=i.relative?o-t:2*o-t),i.type&_.CURVE_TO?(e=i.relative?a+i.x2:i.x2,t=i.relative?o+i.y2:i.y2):(e=NaN,t=NaN),i.type&_.SMOOTH_QUAD_TO&&(i.type=_.QUAD_TO,r=isNaN(r)?a:r,n=isNaN(n)?o:n,i.x1=i.relative?a-r:2*a-r,i.y1=i.relative?o-n:2*o-n),i.type&_.QUAD_TO?(r=i.relative?a+i.x1:i.x1,n=i.relative?o+i.y1:i.y1):(r=NaN,n=NaN),i}))}function n(){var e=NaN,t=NaN;return i((function(r,n,i){if(r.type&_.SMOOTH_QUAD_TO&&(r.type=_.QUAD_TO,e=isNaN(e)?n:e,t=isNaN(t)?i:t,r.x1=r.relative?n-e:2*n-e,r.y1=r.relative?i-t:2*i-t),r.type&_.QUAD_TO){e=r.relative?n+r.x1:r.x1,t=r.relative?i+r.y1:r.y1;var a=r.x1,o=r.y1;r.type=_.CURVE_TO,r.x1=((r.relative?0:n)+2*a)/3,r.y1=((r.relative?0:i)+2*o)/3,r.x2=(r.x+2*a)/3,r.y2=(r.y+2*o)/3}else e=NaN,t=NaN;return r}))}function i(e){var t=0,r=0,n=NaN,i=NaN;return function(a){if(isNaN(n)&&!(a.type&_.MOVE_TO))throw new Error("path must start with moveto");var o=e(a,t,r,n,i);return a.type&_.CLOSE_PATH&&(t=n,r=i),void 0!==a.x&&(t=a.relative?t+a.x:a.x),void 0!==a.y&&(r=a.relative?r+a.y:a.y),a.type&_.MOVE_TO&&(n=t,i=r),o}}function a(e,t,r,n,a,o){return s(e,t,r,n,a,o),i((function(i,s,l,c){var u=i.x1,h=i.x2,p=i.relative&&!isNaN(c),m=void 0!==i.x?i.x:p?0:s,d=void 0!==i.y?i.y:p?0:l;function v(e){return e*e}i.type&_.HORIZ_LINE_TO&&0!==t&&(i.type=_.LINE_TO,i.y=i.relative?0:l),i.type&_.VERT_LINE_TO&&0!==r&&(i.type=_.LINE_TO,i.x=i.relative?0:s),void 0!==i.x&&(i.x=i.x*e+d*r+(p?0:a)),void 0!==i.y&&(i.y=m*t+i.y*n+(p?0:o)),void 0!==i.x1&&(i.x1=i.x1*e+i.y1*r+(p?0:a)),void 0!==i.y1&&(i.y1=u*t+i.y1*n+(p?0:o)),void 0!==i.x2&&(i.x2=i.x2*e+i.y2*r+(p?0:a)),void 0!==i.y2&&(i.y2=h*t+i.y2*n+(p?0:o));var y=e*n-t*r;if(void 0!==i.xRot&&(1!==e||0!==t||0!==r||1!==n))if(0===y)delete i.rX,delete i.rY,delete i.xRot,delete i.lArcFlag,delete i.sweepFlag,i.type=_.LINE_TO;else{var f=i.xRot*Math.PI/180,O=Math.sin(f),T=Math.cos(f),x=1/v(i.rX),g=1/v(i.rY),E=v(T)*x+v(O)*g,N=2*O*T*(x-g),A=v(O)*x+v(T)*g,C=E*n*n-N*t*n+A*t*t,M=N*(e*n+t*r)-2*(E*r*n+A*e*t),R=E*r*r-N*e*r+A*e*e,w=(Math.atan2(M,C-R)+Math.PI)%Math.PI/2,b=Math.sin(w),S=Math.cos(w);i.rX=Math.abs(y)/Math.sqrt(C*v(S)+M*b*S+R*v(b)),i.rY=Math.abs(y)/Math.sqrt(C*v(b)-M*b*S+R*v(S)),i.xRot=180*w/Math.PI}return void 0!==i.sweepFlag&&0>y&&(i.sweepFlag=+!i.sweepFlag),i}))}e.ROUND=function(e){function t(t){return Math.round(t*e)/e}return void 0===e&&(e=1e13),s(e),function(e){return void 0!==e.x1&&(e.x1=t(e.x1)),void 0!==e.y1&&(e.y1=t(e.y1)),void 0!==e.x2&&(e.x2=t(e.x2)),void 0!==e.y2&&(e.y2=t(e.y2)),void 0!==e.x&&(e.x=t(e.x)),void 0!==e.y&&(e.y=t(e.y)),void 0!==e.rX&&(e.rX=t(e.rX)),void 0!==e.rY&&(e.rY=t(e.rY)),e}},e.TO_ABS=t,e.TO_REL=function(){return i((function(e,t,r){return e.relative||(void 0!==e.x1&&(e.x1-=t),void 0!==e.y1&&(e.y1-=r),void 0!==e.x2&&(e.x2-=t),void 0!==e.y2&&(e.y2-=r),void 0!==e.x&&(e.x-=t),void 0!==e.y&&(e.y-=r),e.relative=!0),e}))},e.NORMALIZE_HVZ=function(e,t,r){return void 0===e&&(e=!0),void 0===t&&(t=!0),void 0===r&&(r=!0),i((function(n,i,a,o,s){if(isNaN(o)&&!(n.type&_.MOVE_TO))throw new Error("path must start with moveto");return t&&n.type&_.HORIZ_LINE_TO&&(n.type=_.LINE_TO,n.y=n.relative?0:a),r&&n.type&_.VERT_LINE_TO&&(n.type=_.LINE_TO,n.x=n.relative?0:i),e&&n.type&_.CLOSE_PATH&&(n.type=_.LINE_TO,n.x=n.relative?o-i:o,n.y=n.relative?s-a:s),n.type&_.ARC&&(0===n.rX||0===n.rY)&&(n.type=_.LINE_TO,delete n.rX,delete n.rY,delete n.xRot,delete n.lArcFlag,delete n.sweepFlag),n}))},e.NORMALIZE_ST=r,e.QT_TO_C=n,e.INFO=i,e.SANITIZE=function(e){void 0===e&&(e=0),s(e);var t=NaN,r=NaN,n=NaN,a=NaN;return i((function(i,o,s,l,c){var u=Math.abs,h=!1,p=0,m=0;if(i.type&_.SMOOTH_CURVE_TO&&(p=isNaN(t)?0:o-t,m=isNaN(r)?0:s-r),i.type&(_.CURVE_TO|_.SMOOTH_CURVE_TO)?(t=i.relative?o+i.x2:i.x2,r=i.relative?s+i.y2:i.y2):(t=NaN,r=NaN),i.type&_.SMOOTH_QUAD_TO?(n=isNaN(n)?o:2*o-n,a=isNaN(a)?s:2*s-a):i.type&_.QUAD_TO?(n=i.relative?o+i.x1:i.x1,a=i.relative?s+i.y1:i.y2):(n=NaN,a=NaN),i.type&_.LINE_COMMANDS||i.type&_.ARC&&(0===i.rX||0===i.rY||!i.lArcFlag)||i.type&_.CURVE_TO||i.type&_.SMOOTH_CURVE_TO||i.type&_.QUAD_TO||i.type&_.SMOOTH_QUAD_TO){var d=void 0===i.x?0:i.relative?i.x:i.x-o,v=void 0===i.y?0:i.relative?i.y:i.y-s;p=isNaN(n)?void 0===i.x1?p:i.relative?i.x:i.x1-o:n-o,m=isNaN(a)?void 0===i.y1?m:i.relative?i.y:i.y1-s:a-s;var y=void 0===i.x2?0:i.relative?i.x:i.x2-o,f=void 0===i.y2?0:i.relative?i.y:i.y2-s;u(d)<=e&&u(v)<=e&&u(p)<=e&&u(m)<=e&&u(y)<=e&&u(f)<=e&&(h=!0)}return i.type&_.CLOSE_PATH&&u(o-l)<=e&&u(s-c)<=e&&(h=!0),h?[]:i}))},e.MATRIX=a,e.ROTATE=function(e,t,r){void 0===t&&(t=0),void 0===r&&(r=0),s(e,t,r);var n=Math.sin(e),i=Math.cos(e);return a(i,n,-n,i,t-t*i+r*n,r-t*n-r*i)},e.TRANSLATE=function(e,t){return void 0===t&&(t=0),s(e,t),a(1,0,0,1,e,t)},e.SCALE=function(e,t){return void 0===t&&(t=e),s(e,t),a(e,0,0,t,0,0)},e.SKEW_X=function(e){return s(e),a(1,0,Math.atan(e),1,0,0)},e.SKEW_Y=function(e){return s(e),a(1,Math.atan(e),0,1,0,0)},e.X_AXIS_SYMMETRY=function(e){return void 0===e&&(e=0),s(e),a(-1,0,0,1,e,0)},e.Y_AXIS_SYMMETRY=function(e){return void 0===e&&(e=0),s(e),a(1,0,0,-1,0,e)},e.A_TO_C=function(){return i((function(e,t,r){return _.ARC===e.type?function(e,t,r){var n,i,a,s;e.cX||c(e,t,r);for(var l=Math.min(e.phi1,e.phi2),u=Math.max(e.phi1,e.phi2)-l,h=Math.ceil(u/90),d=new Array(h),v=t,y=r,f=0;f<h;f++){var O=m(e.phi1,e.phi2,f/h),T=m(e.phi1,e.phi2,(f+1)/h),x=T-O,g=4/3*Math.tan(x*p/4),E=[Math.cos(O*p)-g*Math.sin(O*p),Math.sin(O*p)+g*Math.cos(O*p)],N=E[0],A=E[1],C=[Math.cos(T*p),Math.sin(T*p)],M=C[0],R=C[1],w=[M+g*Math.sin(T*p),R-g*Math.cos(T*p)],b=w[0],S=w[1];d[f]={relative:e.relative,type:_.CURVE_TO};var I=function(t,r){var n=o([t*e.rX,r*e.rY],e.xRot),i=n[0],a=n[1];return[e.cX+i,e.cY+a]};n=I(N,A),d[f].x1=n[0],d[f].y1=n[1],i=I(b,S),d[f].x2=i[0],d[f].y2=i[1],a=I(M,R),d[f].x=a[0],d[f].y=a[1],e.relative&&(d[f].x1-=v,d[f].y1-=y,d[f].x2-=v,d[f].y2-=y,d[f].x-=v,d[f].y-=y),v=(s=[d[f].x,d[f].y])[0],y=s[1]}return d}(e,e.relative?0:t,e.relative?0:r):e}))},e.ANNOTATE_ARCS=function(){return i((function(e,t,r){return e.relative&&(t=0,r=0),_.ARC===e.type&&c(e,t,r),e}))},e.CLONE=function(){return function(e){var t={};for(var r in e)t[r]=e[r];return t}},e.CALCULATE_BOUNDS=function(){var e=t(),a=n(),o=r(),s=i((function(t,r,n){var i=o(a(e(function(e){var t={};for(var r in e)t[r]=e[r];return t}(t))));function l(e){e>s.maxX&&(s.maxX=e),e<s.minX&&(s.minX=e)}function h(e){e>s.maxY&&(s.maxY=e),e<s.minY&&(s.minY=e)}if(i.type&_.DRAWING_COMMANDS&&(l(r),h(n)),i.type&_.HORIZ_LINE_TO&&l(i.x),i.type&_.VERT_LINE_TO&&h(i.y),i.type&_.LINE_TO&&(l(i.x),h(i.y)),i.type&_.CURVE_TO){l(i.x),h(i.y);for(var p=0,m=v(r,i.x1,i.x2,i.x);p<m.length;p++)0<(L=m[p])&&1>L&&l(y(r,i.x1,i.x2,i.x,L));for(var f=0,O=v(n,i.y1,i.y2,i.y);f<O.length;f++)0<(L=O[f])&&1>L&&h(y(n,i.y1,i.y2,i.y,L))}if(i.type&_.ARC){l(i.x),h(i.y),c(i,r,n);for(var T=i.xRot/180*Math.PI,x=Math.cos(T)*i.rX,g=Math.sin(T)*i.rX,E=-Math.sin(T)*i.rY,N=Math.cos(T)*i.rY,A=i.phi1<i.phi2?[i.phi1,i.phi2]:-180>i.phi2?[i.phi2+360,i.phi1+360]:[i.phi2,i.phi1],C=A[0],M=A[1],R=function(e){var t=e[0],r=e[1],n=180*Math.atan2(r,t)/Math.PI;return n<C?n+360:n},w=0,b=u(E,-x,0).map(R);w<b.length;w++)(L=b[w])>C&&L<M&&l(d(i.cX,x,E,L));for(var S=0,I=u(N,-g,0).map(R);S<I.length;S++){var L;(L=I[S])>C&&L<M&&h(d(i.cY,g,N,L))}}return t}));return s.minX=1/0,s.maxX=-1/0,s.minY=1/0,s.maxY=-1/0,s}}(h||(h={}));var f,O=function(){function e(){}return e.prototype.round=function(e){return this.transform(h.ROUND(e))},e.prototype.toAbs=function(){return this.transform(h.TO_ABS())},e.prototype.toRel=function(){return this.transform(h.TO_REL())},e.prototype.normalizeHVZ=function(e,t,r){return this.transform(h.NORMALIZE_HVZ(e,t,r))},e.prototype.normalizeST=function(){return this.transform(h.NORMALIZE_ST())},e.prototype.qtToC=function(){return this.transform(h.QT_TO_C())},e.prototype.aToC=function(){return this.transform(h.A_TO_C())},e.prototype.sanitize=function(e){return this.transform(h.SANITIZE(e))},e.prototype.translate=function(e,t){return this.transform(h.TRANSLATE(e,t))},e.prototype.scale=function(e,t){return this.transform(h.SCALE(e,t))},e.prototype.rotate=function(e,t,r){return this.transform(h.ROTATE(e,t,r))},e.prototype.matrix=function(e,t,r,n,i,a){return this.transform(h.MATRIX(e,t,r,n,i,a))},e.prototype.skewX=function(e){return this.transform(h.SKEW_X(e))},e.prototype.skewY=function(e){return this.transform(h.SKEW_Y(e))},e.prototype.xSymmetry=function(e){return this.transform(h.X_AXIS_SYMMETRY(e))},e.prototype.ySymmetry=function(e){return this.transform(h.Y_AXIS_SYMMETRY(e))},e.prototype.annotateArcs=function(){return this.transform(h.ANNOTATE_ARCS())},e}(),T=function(e){return" "===e||"\t"===e||"\r"===e||"\n"===e},x=function(e){return"0".charCodeAt(0)<=e.charCodeAt(0)&&e.charCodeAt(0)<="9".charCodeAt(0)},g=function(e){function t(){var t=e.call(this)||this;return t.curNumber="",t.curCommandType=-1,t.curCommandRelative=!1,t.canParseCommandOrComma=!0,t.curNumberHasExp=!1,t.curNumberHasExpDigits=!1,t.curNumberHasDecimal=!1,t.curArgs=[],t}return i(t,e),t.prototype.finish=function(e){if(void 0===e&&(e=[]),this.parse(" ",e),0!==this.curArgs.length||!this.canParseCommandOrComma)throw new SyntaxError("Unterminated command at the path end.");return e},t.prototype.parse=function(e,t){var r=this;void 0===t&&(t=[]);for(var n=function(e){t.push(e),r.curArgs.length=0,r.canParseCommandOrComma=!0},i=0;i<e.length;i++){var a=e[i],o=!(this.curCommandType!==_.ARC||3!==this.curArgs.length&&4!==this.curArgs.length||1!==this.curNumber.length||"0"!==this.curNumber&&"1"!==this.curNumber),s=x(a)&&("0"===this.curNumber&&"0"===a||o);if(!x(a)||s)if("e"!==a&&"E"!==a)if("-"!==a&&"+"!==a||!this.curNumberHasExp||this.curNumberHasExpDigits)if("."!==a||this.curNumberHasExp||this.curNumberHasDecimal||o){if(this.curNumber&&-1!==this.curCommandType){var l=Number(this.curNumber);if(isNaN(l))throw new SyntaxError("Invalid number ending at "+i);if(this.curCommandType===_.ARC)if(0===this.curArgs.length||1===this.curArgs.length){if(0>l)throw new SyntaxError('Expected positive number, got "'+l+'" at index "'+i+'"')}else if((3===this.curArgs.length||4===this.curArgs.length)&&"0"!==this.curNumber&&"1"!==this.curNumber)throw new SyntaxError('Expected a flag, got "'+this.curNumber+'" at index "'+i+'"');this.curArgs.push(l),this.curArgs.length===E[this.curCommandType]&&(_.HORIZ_LINE_TO===this.curCommandType?n({type:_.HORIZ_LINE_TO,relative:this.curCommandRelative,x:l}):_.VERT_LINE_TO===this.curCommandType?n({type:_.VERT_LINE_TO,relative:this.curCommandRelative,y:l}):this.curCommandType===_.MOVE_TO||this.curCommandType===_.LINE_TO||this.curCommandType===_.SMOOTH_QUAD_TO?(n({type:this.curCommandType,relative:this.curCommandRelative,x:this.curArgs[0],y:this.curArgs[1]}),_.MOVE_TO===this.curCommandType&&(this.curCommandType=_.LINE_TO)):this.curCommandType===_.CURVE_TO?n({type:_.CURVE_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x2:this.curArgs[2],y2:this.curArgs[3],x:this.curArgs[4],y:this.curArgs[5]}):this.curCommandType===_.SMOOTH_CURVE_TO?n({type:_.SMOOTH_CURVE_TO,relative:this.curCommandRelative,x2:this.curArgs[0],y2:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===_.QUAD_TO?n({type:_.QUAD_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===_.ARC&&n({type:_.ARC,relative:this.curCommandRelative,rX:this.curArgs[0],rY:this.curArgs[1],xRot:this.curArgs[2],lArcFlag:this.curArgs[3],sweepFlag:this.curArgs[4],x:this.curArgs[5],y:this.curArgs[6]})),this.curNumber="",this.curNumberHasExpDigits=!1,this.curNumberHasExp=!1,this.curNumberHasDecimal=!1,this.canParseCommandOrComma=!0}if(!T(a))if(","===a&&this.canParseCommandOrComma)this.canParseCommandOrComma=!1;else if("+"!==a&&"-"!==a&&"."!==a)if(s)this.curNumber=a,this.curNumberHasDecimal=!1;else{if(0!==this.curArgs.length)throw new SyntaxError("Unterminated command at index "+i+".");if(!this.canParseCommandOrComma)throw new SyntaxError('Unexpected character "'+a+'" at index '+i+". Command cannot follow comma");if(this.canParseCommandOrComma=!1,"z"!==a&&"Z"!==a)if("h"===a||"H"===a)this.curCommandType=_.HORIZ_LINE_TO,this.curCommandRelative="h"===a;else if("v"===a||"V"===a)this.curCommandType=_.VERT_LINE_TO,this.curCommandRelative="v"===a;else if("m"===a||"M"===a)this.curCommandType=_.MOVE_TO,this.curCommandRelative="m"===a;else if("l"===a||"L"===a)this.curCommandType=_.LINE_TO,this.curCommandRelative="l"===a;else if("c"===a||"C"===a)this.curCommandType=_.CURVE_TO,this.curCommandRelative="c"===a;else if("s"===a||"S"===a)this.curCommandType=_.SMOOTH_CURVE_TO,this.curCommandRelative="s"===a;else if("q"===a||"Q"===a)this.curCommandType=_.QUAD_TO,this.curCommandRelative="q"===a;else if("t"===a||"T"===a)this.curCommandType=_.SMOOTH_QUAD_TO,this.curCommandRelative="t"===a;else{if("a"!==a&&"A"!==a)throw new SyntaxError('Unexpected character "'+a+'" at index '+i+".");this.curCommandType=_.ARC,this.curCommandRelative="a"===a}else t.push({type:_.CLOSE_PATH}),this.canParseCommandOrComma=!0,this.curCommandType=-1}else this.curNumber=a,this.curNumberHasDecimal="."===a}else this.curNumber+=a,this.curNumberHasDecimal=!0;else this.curNumber+=a;else this.curNumber+=a,this.curNumberHasExp=!0;else this.curNumber+=a,this.curNumberHasExpDigits=this.curNumberHasExp}return t},t.prototype.transform=function(e){return Object.create(this,{parse:{value:function(t,r){void 0===r&&(r=[]);for(var n=0,i=Object.getPrototypeOf(this).parse.call(this,t);n<i.length;n++){var a=i[n],o=e(a);Array.isArray(o)?r.push.apply(r,o):r.push(o)}return r}}})},t}(O),_=function(e){function t(r){var n=e.call(this)||this;return n.commands="string"==typeof r?t.parse(r):r,n}return i(t,e),t.prototype.encode=function(){return t.encode(this.commands)},t.prototype.getBounds=function(){var e=h.CALCULATE_BOUNDS();return this.transform(e),e},t.prototype.transform=function(e){for(var t=[],r=0,n=this.commands;r<n.length;r++){var i=e(n[r]);Array.isArray(i)?t.push.apply(t,i):t.push(i)}return this.commands=t,this},t.encode=function(e){return a(e)},t.parse=function(e){var t=new g,r=[];return t.parse(e,r),t.finish(r),r},t.CLOSE_PATH=1,t.MOVE_TO=2,t.HORIZ_LINE_TO=4,t.VERT_LINE_TO=8,t.LINE_TO=16,t.CURVE_TO=32,t.SMOOTH_CURVE_TO=64,t.QUAD_TO=128,t.SMOOTH_QUAD_TO=256,t.ARC=512,t.LINE_COMMANDS=t.LINE_TO|t.HORIZ_LINE_TO|t.VERT_LINE_TO,t.DRAWING_COMMANDS=t.HORIZ_LINE_TO|t.VERT_LINE_TO|t.LINE_TO|t.CURVE_TO|t.SMOOTH_CURVE_TO|t.QUAD_TO|t.SMOOTH_QUAD_TO|t.ARC,t}(O),E=((f={})[_.MOVE_TO]=2,f[_.LINE_TO]=2,f[_.HORIZ_LINE_TO]=1,f[_.VERT_LINE_TO]=1,f[_.CLOSE_PATH]=0,f[_.QUAD_TO]=4,f[_.SMOOTH_QUAD_TO]=2,f[_.CURVE_TO]=6,f[_.SMOOTH_CURVE_TO]=4,f[_.ARC]=7,f)}}]);
//# sourceMappingURL=paperPolygonBox-index.js.map