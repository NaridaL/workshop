/*! For license information please see paperArcBox-index.js.LICENSE.txt */
"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[340],{9874:(t,e,r)=>{r.d(e,{q:()=>m});var i=r(6897),n=r.n(i),a=r(508),o=r.n(a),s=r(9526);const l=t=>t?t.substring(1).split("&").map((t=>{const[e,r]=t.split("=");return[decodeURIComponent(e),decodeURIComponent(r)]})).reduce(((t,[e,r])=>(t[e]=r,t)),{}):{},c=t=>"#"+Object.entries(t).map((([t,e])=>encodeURIComponent(t)+"="+encodeURIComponent(e))).join("&"),u=t=>o()(t,(t=>"true"===t||"false"!==t&&("NaN"===t?NaN:"undefined"===t?void 0:"null"===t?null:""===t?"":isNaN(+t)?t:+t))),h=t=>o()(t,(t=>""+t));function m(t,{deserialize:e=u,serialize:r=h,wait:i=1e3}={}){const a=(0,s.useCallback)((()=>{const i="function"==typeof t?t():t,n=e(Object.assign(r(i),l(document.location.hash)));return history.pushState(void 0,document.title,c(r(n))),n}),[e,t,r]),[o,m]=(0,s.useState)(a),p=(0,s.useRef)();return p.current||(p.current=n()((function(t){history.pushState(void 0,document.title,c(r(t)))}),i)),(0,s.useEffect)((()=>p.current(o)),[o]),(0,s.useEffect)((()=>{const t=()=>{m(a())};return window.addEventListener("hashchange",t),()=>{window.removeEventListener("hashchange",t)}}),[a]),[o,m]}},439:(t,e,r)=>{r.r(e),r.d(e,{default:()=>f});var i=r(5069),n=r(4353),a=r(3394),o=r(871),s=r(8051),l=r(3121),c=r(9526),u=r(9874),h=r(3671),m=r(3514),p=r(6446),d=r(4065),y=r(4004);function v({paperSize:t,radius:e,width:r,height:i,tabWidth:n,style:a}){const o=.1*r,s=1.96*o,l=e-Math.sqrt(e**2-(r/2)**2),u=e-Math.sqrt(e**2-(s/2)**2),[m,p]=t,v=(0,c.useContext)(y.k),f=Math.sqrt(e**2-(r/2-n)**2)-Math.sqrt(e**2-(r/2)**2),O=(t,e,r,i=1)=>({type:d.OU.ARC,rX:t,rY:t,xRot:0,lArcFlag:0,sweepFlag:i,x:e,y:r,relative:!1}),g=new d.OU([{type:d.OU.MOVE_TO,x:0,y:l,relative:!1},O(e,r/2-s/2,u),O(o,r/2+s/2,u,0),O(e,r,l),O(e,2*r,l),O(e,2*r+n,l+f,0),{type:d.OU.LINE_TO,x:2*r+n,y:l+i-f,relative:!1},O(e,2*r,i+l,0),O(e,r,i+l),O(e,0,i+l),{type:d.OU.CLOSE_PATH}]).encode(),T=new d.OU([{type:d.OU.MOVE_TO,x:2*r,y:l,relative:!1},O(e,2*r+n,l+f,0),{type:d.OU.LINE_TO,x:2*r+n,y:l+i-f,relative:!1},O(e,2*r,i+l,0),{type:d.OU.CLOSE_PATH}]).encode(),x=new d.OU([{type:d.OU.MOVE_TO,x:0,y:l,relative:!1},O(e,r,l,0),O(e,2*r,l,0),{type:d.OU.LINE_TO,x:2*r,y:i+l,relative:!1},O(e,r,i+l,0),O(e,0,i+l,0),{type:d.OU.MOVE_TO,x:r,y:l,relative:!1},{type:d.OU.LINE_TO,x:r,y:i+l,relative:!1}]).encode();return c.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"none",stroke:"#123456",strokeWidth:2*h.PM/300,...a},width:m+"mm",height:p+"mm",viewBox:`0 0 ${m} ${p}`,className:"adrian"},c.createElement("defs",null,c.createElement("pattern",{id:"glue",patternUnits:"userSpaceOnUse",width:"4",height:"4"},c.createElement("path",{d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",style:{stroke:"#eee",strokeWidth:1}})),c.createElement("clipPath",{id:"page"},c.createElement("rect",{width:m,height:p}))),c.createElement("style",null,".valley {stroke-dasharray: 1,1;} ",".outline {stroke-dasharray: .1,1;} ",".mountain {stroke-dasharray: 10,2,1,1,1,2;} "),c.createElement("g",{clipPath:"url(#page)"},!v&&c.createElement("path",{d:T,fill:"url(#glue)",stroke:"none"})),c.createElement("path",{d:g}),c.createElement("path",{d:x,className:"valley"}),c.createElement("g",null,c.createElement(y.U,{from:[r/2,0],to:[r/2,i+2*l],offset:-.5}),c.createElement(y.U,{from:[r,l],to:[r,i+l]}),c.createElement(y.U,{from:[0,i-10],to:[2*r+n,i-10]}),c.createElement(y.U,{from:[1.5*r,e],to:[2*r,l],offset:-.5,hideRight:!0})))}const f=()=>{const[t,e]=(0,u.q)({width:99,radius:80,height:114,tabWidth:12,paperSize:(0,h.$Q)(h.t1)}),r=(0,c.useCallback)((t=>e((e=>({...e,...t})))),[e]),d=(0,h.nA)(t.paperSize),y=(0,s.Z)();return c.createElement(o.ZP,{container:!0,style:{width:"100%"}},c.createElement(o.ZP,{item:!0,xs:12,md:10},c.createElement(v,{...t,paperSize:d,style:{width:"100%",height:"100%",margin:y.spacing(1)}})),c.createElement(o.ZP,{item:!0,xs:12,md:2,sx:{display:"flex",flexDirection:"column",width:"100%",padding:2,alignItems:"stretch",gap:2}},c.createElement(i.Z,null,c.createElement(n.Z,{image:"",title:"Contemplative Reptile",sx:{height:0,paddingTop:"100%"}})),c.createElement(p.W,{label:"Paper Size",value:d,disableClearance:!0,onChange:t=>r({paperSize:(0,h.$Q)(t)})}),c.createElement(l.Z,{label:"Radius",variant:"outlined",size:"small",type:"number",inputProps:{min:25,step:1},value:t.radius,onChange:t=>r({radius:+t.target.value})}),c.createElement(l.Z,{label:"Width",variant:"outlined",size:"small",type:"number",inputProps:{min:0,step:1},value:t.width,onChange:t=>r({width:+t.target.value})}),c.createElement(l.Z,{label:"Height",variant:"outlined",size:"small",type:"number",inputProps:{min:0,step:1},value:t.height,onChange:t=>r({height:+t.target.value})}),c.createElement(l.Z,{label:"Tab Width",variant:"outlined",size:"small",type:"number",inputProps:{min:0,step:1},value:t.tabWidth,onChange:t=>r({tabWidth:+t.target.value})}),c.createElement(a.Z,null),c.createElement(m.F,{baseFileName:`arcBox-${t.width}-${t.height}-${t.radius}-${t.tabWidth}`,what:c.createElement(v,{...t,paperSize:d})})))}},3514:(t,e,r)=>{r.d(e,{F:()=>c});var i=r(8864),n=r(1413),a=r.n(n),o=r(9526),s=r(2279),l=r(4004);function c({what:t,baseFileName:e}){const n=()=>s.renderToStaticMarkup(o.createElement(l.k.Provider,{value:!0},t)).replace(/\s{2,}/g," ");return o.createElement(o.Fragment,null,o.createElement(i.Z,{variant:"contained",onClick:()=>{const t=n();a()(t,e+".svg")}},"Download As SVG"),o.createElement(i.Z,{variant:"contained",onClick:async()=>{const{svgToPdf:t}=await Promise.all([r.e(853),r.e(898)]).then(r.bind(r,6997)),i=await t({title:e,author:"Adrian Leonhard",svg:n()});a()(i,e+".pdf")}},"Template as PDF"))}},4004:(t,e,r)=>{r.d(e,{U:()=>o,k:()=>a});var i=r(9526),n=r(2182);const a=(0,i.createContext)(!1);function o({from:t,to:e,children:r,hideRight:o=!1,offset:s=0}){Array.isArray(t)&&(t=(0,n.V)(t)),Array.isArray(e)&&(e=(0,n.V)(e));const l=t.to(e),c=l.length();if((0,i.useContext)(a))return null;if(c<.05)return null;r||=""+(0,n.At)(c,-1);const u=3*r.length;return i.createElement("g",{transform:` translate(${t[0]}, ${t[1]}) rotate(${l.angleXY()/n.Co}) translate(0, ${10*s})`,className:"measure"},!o&&i.createElement("path",{style:{fill:"none"},d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2"}),i.createElement("path",{style:{fill:"none"},d:`\n        M0,5\n        H${(c-u)/2}\n        M${(c+u)/2},5\n        H${c}\n        M${c},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`}),i.createElement("text",{style:{stroke:"none",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:c/2,y:5},r))}},6446:(t,e,r)=>{r.d(e,{W:()=>s});var i=r(302),n=r(3121),a=r(9526),o=r(3671);const s=(0,a.forwardRef)((({disableClearance:t=!1,onChange:e,value:r,label:s},l)=>{let c=null;if(r){const[t,e]=r,[i,n]=t<e?[t,e]:[e,t];c=null!=(u=o.li.find((([t,e])=>t===i&&e===n)))?u:(()=>[i,n,"custom"])()}var u;return a.createElement(i.Z,{ref:l,disableClearable:t,size:"small",freeSolo:!0,renderInput:t=>a.createElement(n.Z,{...t,label:s,variant:"outlined"}),value:c,onChange:(r,i)=>{if("string"==typeof i)if(""===i.trim())t||e(null);else{const t=/(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/.exec(i);if(t){const[,r,i]=t;e((0,o.PN)(+r,+i))}}else e(i)},getOptionLabel:t=>{const[e,r,i="custom"]=t;return`${i} ${e}x${r}mm`},options:o.li})}))},3671:(t,e,r)=>{r.d(e,{$Q:()=>f,PM:()=>a,PN:()=>v,Qn:()=>l,X$:()=>o,XJ:()=>s,YQ:()=>T,_x:()=>h,hv:()=>m,kC:()=>p,li:()=>d,nA:()=>y,nl:()=>g,oe:()=>u,q3:()=>c,t1:()=>O});var i=r(9526),n=r(2182);const a=25.4,o=t=>(0,n.At)(t/n.Co,-1)+"°",s=(t,e)=>e/2/Math.sin(n.gc/t/2),l=(t,e)=>2*e*Math.sin(n.gc/t/2),c=(t,e)=>e/2/Math.tan(n.gc/t/2),u=(t,e)=>e/Math.cos(n.gc/t/2),h=(t,e)=>2*e*Math.tan(n.gc/t/2);function m({sides:t,radius:e,startAngle:r=0,sideLength:a,...o}){if(void 0!==a==(void 0!==e))throw new Error("must set either sideLength or radius");void 0===e&&(e=s(t,a));const{x:l,y:c}=n.V3.polar(e,r);return i.createElement("path",{d:g`
        M${l},${c}
        ${(0,n.hS)(0,t).map((i=>g`L${n.V3.polar(e,r+i*(n.gc/t))}`))}Z`,...o})}function p({id:t,children:e,count:r,stepDeg:a}){return i.createElement(i.Fragment,null,i.createElement("g",{id:t},e),(0,n.hS)(0,r-1).map((e=>i.createElement("use",{key:e,xlinkHref:"#"+t,transform:`rotate(${(e+1)*a} 0 0)`}))))}const d=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]];function y(t){const e=d.find((([,,e])=>e===t));if(e)return e;const[r,i]=t.split("x");return[+r,+i,"Custom"]}function v(t,e){return[t,e]=[t,e].sort(n.uK),null!=(r=d.find((([r,i])=>r===t&&i===e)))?r:(()=>[t,e,"Custom"])();var r}function f([t,e,r]){return"Custom"===r?t+"x"+e:r}const O=d.find((([,,t])=>"A4"===t));function g(t,...e){const r=t=>"number"==typeof t?""+t:"string"==typeof t?t:Array.isArray(t)?t.map(r).join(" "):t.x+","+t.y;let i=t[0];for(let n=0;n<e.length;n++)i+=r(e[n]),i+=t[n+1];return i}const T=t=>{const e=window.open(t,"_blank","noopener,noreferrer");e&&(e.opener=null)}},3394:(t,e,r)=>{r.d(e,{Z:()=>v});var i=r(1972),n=r(7692),a=r(9526),o=r(3060),s=r(3957),l=r(2945),c=r(949),u=r(7260),h=r(3272),m=r(7557);const p=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],d=(0,c.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,r.absolute&&e.absolute,e[r.variant],r.light&&e.light,"vertical"===r.orientation&&e.vertical,r.flexItem&&e.flexItem,r.children&&e.withChildren,r.children&&"vertical"===r.orientation&&e.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&e.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&e.textAlignLeft]}})((({theme:t,ownerState:e})=>(0,n.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},e.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},e.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:(0,l.Fq)(t.palette.divider,.08)},"inset"===e.variant&&{marginLeft:72},"middle"===e.variant&&"horizontal"===e.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===e.variant&&"vertical"===e.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===e.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},e.flexItem&&{alignSelf:"stretch",height:"auto"})),(({ownerState:t})=>(0,n.Z)({},t.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}})),(({theme:t,ownerState:e})=>(0,n.Z)({},e.children&&"vertical"!==e.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`}})),(({theme:t,ownerState:e})=>(0,n.Z)({},e.children&&"vertical"===e.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(t.vars||t).palette.divider}`}})),(({ownerState:t})=>(0,n.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}}))),y=(0,c.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.wrapper,"vertical"===r.orientation&&e.wrapperVertical]}})((({theme:t,ownerState:e})=>(0,n.Z)({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},"vertical"===e.orientation&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`}))),v=a.forwardRef((function(t,e){const r=(0,u.Z)({props:t,name:"MuiDivider"}),{absolute:a=!1,children:l,className:c,component:v=(l?"div":"hr"),flexItem:f=!1,light:O=!1,orientation:g="horizontal",role:T=("hr"!==v?"separator":void 0),textAlign:x="center",variant:E="fullWidth"}=r,_=(0,i.Z)(r,p),N=(0,n.Z)({},r,{absolute:a,component:v,flexItem:f,light:O,orientation:g,role:T,textAlign:x,variant:E}),A=(t=>{const{absolute:e,children:r,classes:i,flexItem:n,light:a,orientation:o,textAlign:l,variant:c}=t,u={root:["root",e&&"absolute",c,a&&"light","vertical"===o&&"vertical",n&&"flexItem",r&&"withChildren",r&&"vertical"===o&&"withChildrenVertical","right"===l&&"vertical"!==o&&"textAlignRight","left"===l&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]};return(0,s.Z)(u,h.V,i)})(N);return(0,m.jsx)(d,(0,n.Z)({as:v,className:(0,o.Z)(A.root,c),role:T,ref:e,ownerState:N},_,{children:l?(0,m.jsx)(y,{className:A.wrapper,ownerState:N,children:l}):null}))}))},3272:(t,e,r)=>{r.d(e,{V:()=>a,Z:()=>o});var i=r(7402),n=r(5111);function a(t){return(0,n.Z)("MuiDivider",t)}const o=(0,i.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"])},4065:(t,e,r)=>{r.d(e,{OU:()=>E,QI:()=>a});var i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)};function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function a(t){var e="";Array.isArray(t)||(t=[t]);for(var r=0;r<t.length;r++){var i=t[r];if(i.type===E.CLOSE_PATH)e+="z";else if(i.type===E.HORIZ_LINE_TO)e+=(i.relative?"h":"H")+i.x;else if(i.type===E.VERT_LINE_TO)e+=(i.relative?"v":"V")+i.y;else if(i.type===E.MOVE_TO)e+=(i.relative?"m":"M")+i.x+" "+i.y;else if(i.type===E.LINE_TO)e+=(i.relative?"l":"L")+i.x+" "+i.y;else if(i.type===E.CURVE_TO)e+=(i.relative?"c":"C")+i.x1+" "+i.y1+" "+i.x2+" "+i.y2+" "+i.x+" "+i.y;else if(i.type===E.SMOOTH_CURVE_TO)e+=(i.relative?"s":"S")+i.x2+" "+i.y2+" "+i.x+" "+i.y;else if(i.type===E.QUAD_TO)e+=(i.relative?"q":"Q")+i.x1+" "+i.y1+" "+i.x+" "+i.y;else if(i.type===E.SMOOTH_QUAD_TO)e+=(i.relative?"t":"T")+i.x+" "+i.y;else{if(i.type!==E.ARC)throw new Error('Unexpected command type "'+i.type+'" at index '+r+".");e+=(i.relative?"a":"A")+i.rX+" "+i.rY+" "+i.xRot+" "+ +i.lArcFlag+" "+ +i.sweepFlag+" "+i.x+" "+i.y}}return e}function o(t,e){var r=t[0],i=t[1];return[r*Math.cos(e)-i*Math.sin(e),r*Math.sin(e)+i*Math.cos(e)]}function s(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var r=0;r<t.length;r++)if("number"!=typeof t[r])throw new Error("assertNumbers arguments["+r+"] is not a number. "+typeof t[r]+" == typeof "+t[r]);return!0}var l=Math.PI;function c(t,e,r){t.lArcFlag=0===t.lArcFlag?0:1,t.sweepFlag=0===t.sweepFlag?0:1;var i=t.rX,n=t.rY,a=t.x,s=t.y;i=Math.abs(t.rX),n=Math.abs(t.rY);var c=o([(e-a)/2,(r-s)/2],-t.xRot/180*l),u=c[0],h=c[1],m=Math.pow(u,2)/Math.pow(i,2)+Math.pow(h,2)/Math.pow(n,2);1<m&&(i*=Math.sqrt(m),n*=Math.sqrt(m)),t.rX=i,t.rY=n;var p=Math.pow(i,2)*Math.pow(h,2)+Math.pow(n,2)*Math.pow(u,2),d=(t.lArcFlag!==t.sweepFlag?1:-1)*Math.sqrt(Math.max(0,(Math.pow(i,2)*Math.pow(n,2)-p)/p)),y=i*h/n*d,v=-n*u/i*d,f=o([y,v],t.xRot/180*l);t.cX=f[0]+(e+a)/2,t.cY=f[1]+(r+s)/2,t.phi1=Math.atan2((h-v)/n,(u-y)/i),t.phi2=Math.atan2((-h-v)/n,(-u-y)/i),0===t.sweepFlag&&t.phi2>t.phi1&&(t.phi2-=2*l),1===t.sweepFlag&&t.phi2<t.phi1&&(t.phi2+=2*l),t.phi1*=180/l,t.phi2*=180/l}function u(t,e,r){s(t,e,r);var i=t*t+e*e-r*r;if(0>i)return[];if(0===i)return[[t*r/(t*t+e*e),e*r/(t*t+e*e)]];var n=Math.sqrt(i);return[[(t*r+e*n)/(t*t+e*e),(e*r-t*n)/(t*t+e*e)],[(t*r-e*n)/(t*t+e*e),(e*r+t*n)/(t*t+e*e)]]}var h,m=Math.PI/180;function p(t,e,r){return(1-r)*t+r*e}function d(t,e,r,i){return t+Math.cos(i/180*l)*e+Math.sin(i/180*l)*r}function y(t,e,r,i){var n=1e-6,a=e-t,o=r-e,s=3*a+3*(i-r)-6*o,l=6*(o-a),c=3*a;return Math.abs(s)<n?[-c/l]:function(t,e,r){void 0===r&&(r=1e-6);var i=t*t/4-e;if(i<-r)return[];if(i<=r)return[-t/2];var n=Math.sqrt(i);return[-t/2-n,-t/2+n]}(l/s,c/s,n)}function v(t,e,r,i,n){var a=1-n;return t*(a*a*a)+e*(3*a*a*n)+r*(3*a*n*n)+i*(n*n*n)}!function(t){function e(){return n((function(t,e,r){return t.relative&&(void 0!==t.x1&&(t.x1+=e),void 0!==t.y1&&(t.y1+=r),void 0!==t.x2&&(t.x2+=e),void 0!==t.y2&&(t.y2+=r),void 0!==t.x&&(t.x+=e),void 0!==t.y&&(t.y+=r),t.relative=!1),t}))}function r(){var t=NaN,e=NaN,r=NaN,i=NaN;return n((function(n,a,o){return n.type&E.SMOOTH_CURVE_TO&&(n.type=E.CURVE_TO,t=isNaN(t)?a:t,e=isNaN(e)?o:e,n.x1=n.relative?a-t:2*a-t,n.y1=n.relative?o-e:2*o-e),n.type&E.CURVE_TO?(t=n.relative?a+n.x2:n.x2,e=n.relative?o+n.y2:n.y2):(t=NaN,e=NaN),n.type&E.SMOOTH_QUAD_TO&&(n.type=E.QUAD_TO,r=isNaN(r)?a:r,i=isNaN(i)?o:i,n.x1=n.relative?a-r:2*a-r,n.y1=n.relative?o-i:2*o-i),n.type&E.QUAD_TO?(r=n.relative?a+n.x1:n.x1,i=n.relative?o+n.y1:n.y1):(r=NaN,i=NaN),n}))}function i(){var t=NaN,e=NaN;return n((function(r,i,n){if(r.type&E.SMOOTH_QUAD_TO&&(r.type=E.QUAD_TO,t=isNaN(t)?i:t,e=isNaN(e)?n:e,r.x1=r.relative?i-t:2*i-t,r.y1=r.relative?n-e:2*n-e),r.type&E.QUAD_TO){t=r.relative?i+r.x1:r.x1,e=r.relative?n+r.y1:r.y1;var a=r.x1,o=r.y1;r.type=E.CURVE_TO,r.x1=((r.relative?0:i)+2*a)/3,r.y1=((r.relative?0:n)+2*o)/3,r.x2=(r.x+2*a)/3,r.y2=(r.y+2*o)/3}else t=NaN,e=NaN;return r}))}function n(t){var e=0,r=0,i=NaN,n=NaN;return function(a){if(isNaN(i)&&!(a.type&E.MOVE_TO))throw new Error("path must start with moveto");var o=t(a,e,r,i,n);return a.type&E.CLOSE_PATH&&(e=i,r=n),void 0!==a.x&&(e=a.relative?e+a.x:a.x),void 0!==a.y&&(r=a.relative?r+a.y:a.y),a.type&E.MOVE_TO&&(i=e,n=r),o}}function a(t,e,r,i,a,o){return s(t,e,r,i,a,o),n((function(n,s,l,c){var u=n.x1,h=n.x2,m=n.relative&&!isNaN(c),p=void 0!==n.x?n.x:m?0:s,d=void 0!==n.y?n.y:m?0:l;function y(t){return t*t}n.type&E.HORIZ_LINE_TO&&0!==e&&(n.type=E.LINE_TO,n.y=n.relative?0:l),n.type&E.VERT_LINE_TO&&0!==r&&(n.type=E.LINE_TO,n.x=n.relative?0:s),void 0!==n.x&&(n.x=n.x*t+d*r+(m?0:a)),void 0!==n.y&&(n.y=p*e+n.y*i+(m?0:o)),void 0!==n.x1&&(n.x1=n.x1*t+n.y1*r+(m?0:a)),void 0!==n.y1&&(n.y1=u*e+n.y1*i+(m?0:o)),void 0!==n.x2&&(n.x2=n.x2*t+n.y2*r+(m?0:a)),void 0!==n.y2&&(n.y2=h*e+n.y2*i+(m?0:o));var v=t*i-e*r;if(void 0!==n.xRot&&(1!==t||0!==e||0!==r||1!==i))if(0===v)delete n.rX,delete n.rY,delete n.xRot,delete n.lArcFlag,delete n.sweepFlag,n.type=E.LINE_TO;else{var f=n.xRot*Math.PI/180,O=Math.sin(f),g=Math.cos(f),T=1/y(n.rX),x=1/y(n.rY),_=y(g)*T+y(O)*x,N=2*O*g*(T-x),A=y(O)*T+y(g)*x,C=_*i*i-N*e*i+A*e*e,M=N*(t*i+e*r)-2*(_*r*i+A*t*e),R=_*r*r-N*t*r+A*t*t,w=(Math.atan2(M,C-R)+Math.PI)%Math.PI/2,b=Math.sin(w),S=Math.cos(w);n.rX=Math.abs(v)/Math.sqrt(C*y(S)+M*b*S+R*y(b)),n.rY=Math.abs(v)/Math.sqrt(C*y(b)-M*b*S+R*y(S)),n.xRot=180*w/Math.PI}return void 0!==n.sweepFlag&&0>v&&(n.sweepFlag=+!n.sweepFlag),n}))}t.ROUND=function(t){function e(e){return Math.round(e*t)/t}return void 0===t&&(t=1e13),s(t),function(t){return void 0!==t.x1&&(t.x1=e(t.x1)),void 0!==t.y1&&(t.y1=e(t.y1)),void 0!==t.x2&&(t.x2=e(t.x2)),void 0!==t.y2&&(t.y2=e(t.y2)),void 0!==t.x&&(t.x=e(t.x)),void 0!==t.y&&(t.y=e(t.y)),void 0!==t.rX&&(t.rX=e(t.rX)),void 0!==t.rY&&(t.rY=e(t.rY)),t}},t.TO_ABS=e,t.TO_REL=function(){return n((function(t,e,r){return t.relative||(void 0!==t.x1&&(t.x1-=e),void 0!==t.y1&&(t.y1-=r),void 0!==t.x2&&(t.x2-=e),void 0!==t.y2&&(t.y2-=r),void 0!==t.x&&(t.x-=e),void 0!==t.y&&(t.y-=r),t.relative=!0),t}))},t.NORMALIZE_HVZ=function(t,e,r){return void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),n((function(i,n,a,o,s){if(isNaN(o)&&!(i.type&E.MOVE_TO))throw new Error("path must start with moveto");return e&&i.type&E.HORIZ_LINE_TO&&(i.type=E.LINE_TO,i.y=i.relative?0:a),r&&i.type&E.VERT_LINE_TO&&(i.type=E.LINE_TO,i.x=i.relative?0:n),t&&i.type&E.CLOSE_PATH&&(i.type=E.LINE_TO,i.x=i.relative?o-n:o,i.y=i.relative?s-a:s),i.type&E.ARC&&(0===i.rX||0===i.rY)&&(i.type=E.LINE_TO,delete i.rX,delete i.rY,delete i.xRot,delete i.lArcFlag,delete i.sweepFlag),i}))},t.NORMALIZE_ST=r,t.QT_TO_C=i,t.INFO=n,t.SANITIZE=function(t){void 0===t&&(t=0),s(t);var e=NaN,r=NaN,i=NaN,a=NaN;return n((function(n,o,s,l,c){var u=Math.abs,h=!1,m=0,p=0;if(n.type&E.SMOOTH_CURVE_TO&&(m=isNaN(e)?0:o-e,p=isNaN(r)?0:s-r),n.type&(E.CURVE_TO|E.SMOOTH_CURVE_TO)?(e=n.relative?o+n.x2:n.x2,r=n.relative?s+n.y2:n.y2):(e=NaN,r=NaN),n.type&E.SMOOTH_QUAD_TO?(i=isNaN(i)?o:2*o-i,a=isNaN(a)?s:2*s-a):n.type&E.QUAD_TO?(i=n.relative?o+n.x1:n.x1,a=n.relative?s+n.y1:n.y2):(i=NaN,a=NaN),n.type&E.LINE_COMMANDS||n.type&E.ARC&&(0===n.rX||0===n.rY||!n.lArcFlag)||n.type&E.CURVE_TO||n.type&E.SMOOTH_CURVE_TO||n.type&E.QUAD_TO||n.type&E.SMOOTH_QUAD_TO){var d=void 0===n.x?0:n.relative?n.x:n.x-o,y=void 0===n.y?0:n.relative?n.y:n.y-s;m=isNaN(i)?void 0===n.x1?m:n.relative?n.x:n.x1-o:i-o,p=isNaN(a)?void 0===n.y1?p:n.relative?n.y:n.y1-s:a-s;var v=void 0===n.x2?0:n.relative?n.x:n.x2-o,f=void 0===n.y2?0:n.relative?n.y:n.y2-s;u(d)<=t&&u(y)<=t&&u(m)<=t&&u(p)<=t&&u(v)<=t&&u(f)<=t&&(h=!0)}return n.type&E.CLOSE_PATH&&u(o-l)<=t&&u(s-c)<=t&&(h=!0),h?[]:n}))},t.MATRIX=a,t.ROTATE=function(t,e,r){void 0===e&&(e=0),void 0===r&&(r=0),s(t,e,r);var i=Math.sin(t),n=Math.cos(t);return a(n,i,-i,n,e-e*n+r*i,r-e*i-r*n)},t.TRANSLATE=function(t,e){return void 0===e&&(e=0),s(t,e),a(1,0,0,1,t,e)},t.SCALE=function(t,e){return void 0===e&&(e=t),s(t,e),a(t,0,0,e,0,0)},t.SKEW_X=function(t){return s(t),a(1,0,Math.atan(t),1,0,0)},t.SKEW_Y=function(t){return s(t),a(1,Math.atan(t),0,1,0,0)},t.X_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),s(t),a(-1,0,0,1,t,0)},t.Y_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),s(t),a(1,0,0,-1,0,t)},t.A_TO_C=function(){return n((function(t,e,r){return E.ARC===t.type?function(t,e,r){var i,n,a,s;t.cX||c(t,e,r);for(var l=Math.min(t.phi1,t.phi2),u=Math.max(t.phi1,t.phi2)-l,h=Math.ceil(u/90),d=new Array(h),y=e,v=r,f=0;f<h;f++){var O=p(t.phi1,t.phi2,f/h),g=p(t.phi1,t.phi2,(f+1)/h),T=g-O,x=4/3*Math.tan(T*m/4),_=[Math.cos(O*m)-x*Math.sin(O*m),Math.sin(O*m)+x*Math.cos(O*m)],N=_[0],A=_[1],C=[Math.cos(g*m),Math.sin(g*m)],M=C[0],R=C[1],w=[M+x*Math.sin(g*m),R-x*Math.cos(g*m)],b=w[0],S=w[1];d[f]={relative:t.relative,type:E.CURVE_TO};var I=function(e,r){var i=o([e*t.rX,r*t.rY],t.xRot),n=i[0],a=i[1];return[t.cX+n,t.cY+a]};i=I(N,A),d[f].x1=i[0],d[f].y1=i[1],n=I(b,S),d[f].x2=n[0],d[f].y2=n[1],a=I(M,R),d[f].x=a[0],d[f].y=a[1],t.relative&&(d[f].x1-=y,d[f].y1-=v,d[f].x2-=y,d[f].y2-=v,d[f].x-=y,d[f].y-=v),y=(s=[d[f].x,d[f].y])[0],v=s[1]}return d}(t,t.relative?0:e,t.relative?0:r):t}))},t.ANNOTATE_ARCS=function(){return n((function(t,e,r){return t.relative&&(e=0,r=0),E.ARC===t.type&&c(t,e,r),t}))},t.CLONE=function(){return function(t){var e={};for(var r in t)e[r]=t[r];return e}},t.CALCULATE_BOUNDS=function(){var t=e(),a=i(),o=r(),s=n((function(e,r,i){var n=o(a(t(function(t){var e={};for(var r in t)e[r]=t[r];return e}(e))));function l(t){t>s.maxX&&(s.maxX=t),t<s.minX&&(s.minX=t)}function h(t){t>s.maxY&&(s.maxY=t),t<s.minY&&(s.minY=t)}if(n.type&E.DRAWING_COMMANDS&&(l(r),h(i)),n.type&E.HORIZ_LINE_TO&&l(n.x),n.type&E.VERT_LINE_TO&&h(n.y),n.type&E.LINE_TO&&(l(n.x),h(n.y)),n.type&E.CURVE_TO){l(n.x),h(n.y);for(var m=0,p=y(r,n.x1,n.x2,n.x);m<p.length;m++)0<(L=p[m])&&1>L&&l(v(r,n.x1,n.x2,n.x,L));for(var f=0,O=y(i,n.y1,n.y2,n.y);f<O.length;f++)0<(L=O[f])&&1>L&&h(v(i,n.y1,n.y2,n.y,L))}if(n.type&E.ARC){l(n.x),h(n.y),c(n,r,i);for(var g=n.xRot/180*Math.PI,T=Math.cos(g)*n.rX,x=Math.sin(g)*n.rX,_=-Math.sin(g)*n.rY,N=Math.cos(g)*n.rY,A=n.phi1<n.phi2?[n.phi1,n.phi2]:-180>n.phi2?[n.phi2+360,n.phi1+360]:[n.phi2,n.phi1],C=A[0],M=A[1],R=function(t){var e=t[0],r=t[1],i=180*Math.atan2(r,e)/Math.PI;return i<C?i+360:i},w=0,b=u(_,-T,0).map(R);w<b.length;w++)(L=b[w])>C&&L<M&&l(d(n.cX,T,_,L));for(var S=0,I=u(N,-x,0).map(R);S<I.length;S++){var L;(L=I[S])>C&&L<M&&h(d(n.cY,x,N,L))}}return e}));return s.minX=1/0,s.maxX=-1/0,s.minY=1/0,s.maxY=-1/0,s}}(h||(h={}));var f,O=function(){function t(){}return t.prototype.round=function(t){return this.transform(h.ROUND(t))},t.prototype.toAbs=function(){return this.transform(h.TO_ABS())},t.prototype.toRel=function(){return this.transform(h.TO_REL())},t.prototype.normalizeHVZ=function(t,e,r){return this.transform(h.NORMALIZE_HVZ(t,e,r))},t.prototype.normalizeST=function(){return this.transform(h.NORMALIZE_ST())},t.prototype.qtToC=function(){return this.transform(h.QT_TO_C())},t.prototype.aToC=function(){return this.transform(h.A_TO_C())},t.prototype.sanitize=function(t){return this.transform(h.SANITIZE(t))},t.prototype.translate=function(t,e){return this.transform(h.TRANSLATE(t,e))},t.prototype.scale=function(t,e){return this.transform(h.SCALE(t,e))},t.prototype.rotate=function(t,e,r){return this.transform(h.ROTATE(t,e,r))},t.prototype.matrix=function(t,e,r,i,n,a){return this.transform(h.MATRIX(t,e,r,i,n,a))},t.prototype.skewX=function(t){return this.transform(h.SKEW_X(t))},t.prototype.skewY=function(t){return this.transform(h.SKEW_Y(t))},t.prototype.xSymmetry=function(t){return this.transform(h.X_AXIS_SYMMETRY(t))},t.prototype.ySymmetry=function(t){return this.transform(h.Y_AXIS_SYMMETRY(t))},t.prototype.annotateArcs=function(){return this.transform(h.ANNOTATE_ARCS())},t}(),g=function(t){return" "===t||"\t"===t||"\r"===t||"\n"===t},T=function(t){return"0".charCodeAt(0)<=t.charCodeAt(0)&&t.charCodeAt(0)<="9".charCodeAt(0)},x=function(t){function e(){var e=t.call(this)||this;return e.curNumber="",e.curCommandType=-1,e.curCommandRelative=!1,e.canParseCommandOrComma=!0,e.curNumberHasExp=!1,e.curNumberHasExpDigits=!1,e.curNumberHasDecimal=!1,e.curArgs=[],e}return n(e,t),e.prototype.finish=function(t){if(void 0===t&&(t=[]),this.parse(" ",t),0!==this.curArgs.length||!this.canParseCommandOrComma)throw new SyntaxError("Unterminated command at the path end.");return t},e.prototype.parse=function(t,e){var r=this;void 0===e&&(e=[]);for(var i=function(t){e.push(t),r.curArgs.length=0,r.canParseCommandOrComma=!0},n=0;n<t.length;n++){var a=t[n],o=!(this.curCommandType!==E.ARC||3!==this.curArgs.length&&4!==this.curArgs.length||1!==this.curNumber.length||"0"!==this.curNumber&&"1"!==this.curNumber),s=T(a)&&("0"===this.curNumber&&"0"===a||o);if(!T(a)||s)if("e"!==a&&"E"!==a)if("-"!==a&&"+"!==a||!this.curNumberHasExp||this.curNumberHasExpDigits)if("."!==a||this.curNumberHasExp||this.curNumberHasDecimal||o){if(this.curNumber&&-1!==this.curCommandType){var l=Number(this.curNumber);if(isNaN(l))throw new SyntaxError("Invalid number ending at "+n);if(this.curCommandType===E.ARC)if(0===this.curArgs.length||1===this.curArgs.length){if(0>l)throw new SyntaxError('Expected positive number, got "'+l+'" at index "'+n+'"')}else if((3===this.curArgs.length||4===this.curArgs.length)&&"0"!==this.curNumber&&"1"!==this.curNumber)throw new SyntaxError('Expected a flag, got "'+this.curNumber+'" at index "'+n+'"');this.curArgs.push(l),this.curArgs.length===_[this.curCommandType]&&(E.HORIZ_LINE_TO===this.curCommandType?i({type:E.HORIZ_LINE_TO,relative:this.curCommandRelative,x:l}):E.VERT_LINE_TO===this.curCommandType?i({type:E.VERT_LINE_TO,relative:this.curCommandRelative,y:l}):this.curCommandType===E.MOVE_TO||this.curCommandType===E.LINE_TO||this.curCommandType===E.SMOOTH_QUAD_TO?(i({type:this.curCommandType,relative:this.curCommandRelative,x:this.curArgs[0],y:this.curArgs[1]}),E.MOVE_TO===this.curCommandType&&(this.curCommandType=E.LINE_TO)):this.curCommandType===E.CURVE_TO?i({type:E.CURVE_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x2:this.curArgs[2],y2:this.curArgs[3],x:this.curArgs[4],y:this.curArgs[5]}):this.curCommandType===E.SMOOTH_CURVE_TO?i({type:E.SMOOTH_CURVE_TO,relative:this.curCommandRelative,x2:this.curArgs[0],y2:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===E.QUAD_TO?i({type:E.QUAD_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===E.ARC&&i({type:E.ARC,relative:this.curCommandRelative,rX:this.curArgs[0],rY:this.curArgs[1],xRot:this.curArgs[2],lArcFlag:this.curArgs[3],sweepFlag:this.curArgs[4],x:this.curArgs[5],y:this.curArgs[6]})),this.curNumber="",this.curNumberHasExpDigits=!1,this.curNumberHasExp=!1,this.curNumberHasDecimal=!1,this.canParseCommandOrComma=!0}if(!g(a))if(","===a&&this.canParseCommandOrComma)this.canParseCommandOrComma=!1;else if("+"!==a&&"-"!==a&&"."!==a)if(s)this.curNumber=a,this.curNumberHasDecimal=!1;else{if(0!==this.curArgs.length)throw new SyntaxError("Unterminated command at index "+n+".");if(!this.canParseCommandOrComma)throw new SyntaxError('Unexpected character "'+a+'" at index '+n+". Command cannot follow comma");if(this.canParseCommandOrComma=!1,"z"!==a&&"Z"!==a)if("h"===a||"H"===a)this.curCommandType=E.HORIZ_LINE_TO,this.curCommandRelative="h"===a;else if("v"===a||"V"===a)this.curCommandType=E.VERT_LINE_TO,this.curCommandRelative="v"===a;else if("m"===a||"M"===a)this.curCommandType=E.MOVE_TO,this.curCommandRelative="m"===a;else if("l"===a||"L"===a)this.curCommandType=E.LINE_TO,this.curCommandRelative="l"===a;else if("c"===a||"C"===a)this.curCommandType=E.CURVE_TO,this.curCommandRelative="c"===a;else if("s"===a||"S"===a)this.curCommandType=E.SMOOTH_CURVE_TO,this.curCommandRelative="s"===a;else if("q"===a||"Q"===a)this.curCommandType=E.QUAD_TO,this.curCommandRelative="q"===a;else if("t"===a||"T"===a)this.curCommandType=E.SMOOTH_QUAD_TO,this.curCommandRelative="t"===a;else{if("a"!==a&&"A"!==a)throw new SyntaxError('Unexpected character "'+a+'" at index '+n+".");this.curCommandType=E.ARC,this.curCommandRelative="a"===a}else e.push({type:E.CLOSE_PATH}),this.canParseCommandOrComma=!0,this.curCommandType=-1}else this.curNumber=a,this.curNumberHasDecimal="."===a}else this.curNumber+=a,this.curNumberHasDecimal=!0;else this.curNumber+=a;else this.curNumber+=a,this.curNumberHasExp=!0;else this.curNumber+=a,this.curNumberHasExpDigits=this.curNumberHasExp}return e},e.prototype.transform=function(t){return Object.create(this,{parse:{value:function(e,r){void 0===r&&(r=[]);for(var i=0,n=Object.getPrototypeOf(this).parse.call(this,e);i<n.length;i++){var a=n[i],o=t(a);Array.isArray(o)?r.push.apply(r,o):r.push(o)}return r}}})},e}(O),E=function(t){function e(r){var i=t.call(this)||this;return i.commands="string"==typeof r?e.parse(r):r,i}return n(e,t),e.prototype.encode=function(){return e.encode(this.commands)},e.prototype.getBounds=function(){var t=h.CALCULATE_BOUNDS();return this.transform(t),t},e.prototype.transform=function(t){for(var e=[],r=0,i=this.commands;r<i.length;r++){var n=t(i[r]);Array.isArray(n)?e.push.apply(e,n):e.push(n)}return this.commands=e,this},e.encode=function(t){return a(t)},e.parse=function(t){var e=new x,r=[];return e.parse(t,r),e.finish(r),r},e.CLOSE_PATH=1,e.MOVE_TO=2,e.HORIZ_LINE_TO=4,e.VERT_LINE_TO=8,e.LINE_TO=16,e.CURVE_TO=32,e.SMOOTH_CURVE_TO=64,e.QUAD_TO=128,e.SMOOTH_QUAD_TO=256,e.ARC=512,e.LINE_COMMANDS=e.LINE_TO|e.HORIZ_LINE_TO|e.VERT_LINE_TO,e.DRAWING_COMMANDS=e.HORIZ_LINE_TO|e.VERT_LINE_TO|e.LINE_TO|e.CURVE_TO|e.SMOOTH_CURVE_TO|e.QUAD_TO|e.SMOOTH_QUAD_TO|e.ARC,e}(O),_=((f={})[E.MOVE_TO]=2,f[E.LINE_TO]=2,f[E.HORIZ_LINE_TO]=1,f[E.VERT_LINE_TO]=1,f[E.CLOSE_PATH]=0,f[E.QUAD_TO]=4,f[E.SMOOTH_QUAD_TO]=2,f[E.CURVE_TO]=6,f[E.SMOOTH_CURVE_TO]=4,f[E.ARC]=7,f)}}]);
//# sourceMappingURL=paperArcBox-index.js.map