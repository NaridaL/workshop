"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[64],{3941:(e,t,a)=>{a.d(t,{Z:()=>o});var r=a(7692),n=a(4823);function o(e,t={},a){return(0,n.Z)(e)?t:(0,r.Z)({},t,{ownerState:(0,r.Z)({},t.ownerState,a)})}},5069:(e,t,a)=>{a.d(t,{Z:()=>b});var r=a(7692),n=a(1972),o=a(9526),i=(a(2652),a(3060)),l=a(6031),s=a(7014),c=a(7260),u=a(3172),d=a(4969);function m(e){return(0,d.Z)("MuiCard",e)}(0,a(2926).Z)("MuiCard",["root"]);var p=a(7557);const v=["className","raised"],h=(0,s.ZP)(u.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),b=o.forwardRef((function(e,t){const a=(0,c.Z)({props:e,name:"MuiCard"}),{className:o,raised:s=!1}=a,u=(0,n.Z)(a,v),d=(0,r.Z)({},a,{raised:s}),b=(e=>{const{classes:t}=e;return(0,l.Z)({root:["root"]},m,t)})(d);return(0,p.jsx)(h,(0,r.Z)({className:(0,i.Z)(b.root,o),elevation:s?8:void 0,ref:t,ownerState:d},u))}))},4854:(e,t,a)=>{a.d(t,{Z:()=>h});var r=a(7692),n=a(1972),o=a(9526),i=(a(2652),a(3060)),l=a(6031),s=a(7014),c=a(7260),u=a(4969);function d(e){return(0,u.Z)("MuiCardContent",e)}(0,a(2926).Z)("MuiCardContent",["root"]);var m=a(7557);const p=["className","component"],v=(0,s.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),h=o.forwardRef((function(e,t){const a=(0,c.Z)({props:e,name:"MuiCardContent"}),{className:o,component:s="div"}=a,u=(0,n.Z)(a,p),h=(0,r.Z)({},a,{component:s}),b=(e=>{const{classes:t}=e;return(0,l.Z)({root:["root"]},d,t)})(h);return(0,m.jsx)(v,(0,r.Z)({as:s,className:(0,i.Z)(b.root,o),ownerState:h,ref:t},u))}))},3409:(e,t,a)=>{a.d(t,{ZP:()=>te});var r=a(1972),n=a(7692),o=a(9526),i=(a(2652),a(3060)),l=a(2926),s=a(4969);function c(e){return(0,s.Z)("MuiSlider",e)}const u=(0,l.Z)("MuiSlider",["root","active","focusVisible","disabled","dragging","marked","vertical","trackInverted","trackFalse","rail","track","mark","markActive","markLabel","markLabelActive","thumb","valueLabel","valueLabelOpen","valueLabelCircle","valueLabelLabel"]);var d=a(7557);const m=function(e){const{children:t,className:a,value:r,theme:n}=e,l=(e=>{const{open:t}=e;return{offset:(0,i.Z)(t&&u.valueLabelOpen),circle:u.valueLabelCircle,label:u.valueLabelLabel}})(e);return o.cloneElement(t,{className:(0,i.Z)(t.props.className)},(0,d.jsxs)(o.Fragment,{children:[t.props.children,(0,d.jsx)("span",{className:(0,i.Z)(l.offset,a),theme:n,"aria-hidden":!0,children:(0,d.jsx)("span",{className:l.circle,children:(0,d.jsx)("span",{className:l.label,children:r})})})]}))};var p=a(3941),v=a(4823),h=a(6031),b=a(5156),f=a(904),Z=a(9665),g=a(1199),x=a(6341),k=a(8426);const w={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:-1,overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"};function S(e,t){return e-t}function y(e,t,a){return null==e?t:Math.min(Math.max(t,e),a)}function L(e,t){var a;const{index:r}=null!=(a=e.reduce(((e,a,r)=>{const n=Math.abs(t-a);return null===e||n<e.distance||n===e.distance?{distance:n,index:r}:e}),null))?a:{};return r}function C(e,t){if(void 0!==t.current&&e.changedTouches){const a=e;for(let e=0;e<a.changedTouches.length;e+=1){const r=a.changedTouches[e];if(r.identifier===t.current)return{x:r.clientX,y:r.clientY}}return!1}return{x:e.clientX,y:e.clientY}}function R(e,t,a){return 100*(e-t)/(a-t)}function z({values:e,newValue:t,index:a}){const r=e.slice();return r[a]=t,r.sort(S)}function M({sliderRef:e,activeIndex:t,setActive:a}){var r,n;const o=(0,b.Z)(e.current);var i;null!=(r=e.current)&&r.contains(o.activeElement)&&Number(null==o||null==(n=o.activeElement)?void 0:n.getAttribute("data-index"))===t||null==(i=e.current)||i.querySelector(`[type="range"][data-index="${t}"]`).focus(),a&&a(t)}const N={horizontal:{offset:e=>({left:`${e}%`}),leap:e=>({width:`${e}%`})},"horizontal-reverse":{offset:e=>({right:`${e}%`}),leap:e=>({width:`${e}%`})},vertical:{offset:e=>({bottom:`${e}%`}),leap:e=>({height:`${e}%`})}},A=e=>e;let P;function $(){return void 0===P&&(P="undefined"==typeof CSS||"function"!=typeof CSS.supports||CSS.supports("touch-action","none")),P}function V(e){const{ref:t,"aria-labelledby":a,defaultValue:r,disableSwap:i=!1,disabled:l=!1,marks:s=!1,max:c=100,min:u=0,name:d,onChange:m,onChangeCommitted:p,orientation:v="horizontal",scale:h=A,step:P=1,tabIndex:V,value:j,isRtl:I=!1}=e,E=o.useRef(),[T,F]=o.useState(-1),[O,D]=o.useState(-1),[Y,B]=o.useState(!1),X=o.useRef(0),[q,H]=(0,f.Z)({controlled:j,default:null!=r?r:u,name:"Slider"}),W=m&&((e,t,a)=>{const r=e.nativeEvent||e,n=new r.constructor(r.type,r);Object.defineProperty(n,"target",{writable:!0,value:{value:t,name:d}}),m(n,t,a)}),_=Array.isArray(q);let G=_?q.slice().sort(S):[q];G=G.map((e=>y(e,u,c)));const J=!0===s&&null!==P?[...Array(Math.floor((c-u)/P)+1)].map(((e,t)=>({value:u+P*t}))):s||[],K=J.map((e=>e.value)),{isFocusVisibleRef:Q,onBlur:U,onFocus:ee,ref:te}=(0,Z.Z)(),[ae,re]=o.useState(-1),ne=o.useRef(),oe=(0,g.Z)(te,ne),ie=(0,g.Z)(t,oe),le=e=>t=>{var a;const r=Number(t.currentTarget.getAttribute("data-index"));ee(t),!0===Q.current&&re(r),D(r),null==e||null==(a=e.onFocus)||a.call(e,t)},se=e=>t=>{var a;U(t),!1===Q.current&&re(-1),D(-1),null==e||null==(a=e.onBlur)||a.call(e,t)};(0,x.Z)((()=>{var e;l&&ne.current.contains(document.activeElement)&&(null==(e=document.activeElement)||e.blur())}),[l]),l&&-1!==T&&F(-1),l&&-1!==ae&&re(-1);const ce=e=>t=>{var a;null==(a=e.onChange)||a.call(e,t);const r=Number(t.currentTarget.getAttribute("data-index")),n=G[r],o=K.indexOf(n);let l=t.target.valueAsNumber;if(J&&null==P&&(l=l<n?K[o-1]:K[o+1]),l=y(l,u,c),J&&null==P){const e=K.indexOf(G[r]);l=l<G[r]?K[e-1]:K[e+1]}if(_){i&&(l=y(l,G[r-1]||-1/0,G[r+1]||1/0));const e=l;l=z({values:G,newValue:l,index:r});let t=r;i||(t=l.indexOf(e)),M({sliderRef:ne,activeIndex:t})}H(l),re(r),W&&W(t,l,r),p&&p(t,l)},ue=o.useRef();let de=v;I&&"horizontal"===v&&(de+="-reverse");const me=({finger:e,move:t=!1,values:a})=>{const{current:r}=ne,{width:n,height:o,bottom:l,left:s}=r.getBoundingClientRect();let d,m;if(d=0===de.indexOf("vertical")?(l-e.y)/o:(e.x-s)/n,-1!==de.indexOf("-reverse")&&(d=1-d),m=function(e,t,a){return(a-t)*e+t}(d,u,c),P)m=function(e,t,a){const r=Math.round((e-a)/t)*t+a;return Number(r.toFixed(function(e){if(Math.abs(e)<1){const t=e.toExponential().split("e-"),a=t[0].split(".")[1];return(a?a.length:0)+parseInt(t[1],10)}const t=e.toString().split(".")[1];return t?t.length:0}(t)))}(m,P,u);else{const e=L(K,m);m=K[e]}m=y(m,u,c);let p=0;if(_){p=t?ue.current:L(a,m),i&&(m=y(m,a[p-1]||-1/0,a[p+1]||1/0));const e=m;m=z({values:a,newValue:m,index:p}),i&&t||(p=m.indexOf(e),ue.current=p)}return{newValue:m,activeIndex:p}},pe=(0,k.Z)((e=>{const t=C(e,E);if(!t)return;if(X.current+=1,"mousemove"===e.type&&0===e.buttons)return void ve(e);const{newValue:a,activeIndex:r}=me({finger:t,move:!0,values:G});M({sliderRef:ne,activeIndex:r,setActive:F}),H(a),!Y&&X.current>2&&B(!0),W&&W(e,a,r)})),ve=(0,k.Z)((e=>{const t=C(e,E);if(B(!1),!t)return;const{newValue:a}=me({finger:t,values:G});F(-1),"touchend"===e.type&&D(-1),p&&p(e,a),E.current=void 0,be()})),he=(0,k.Z)((e=>{if(l)return;$()||e.preventDefault();const t=e.changedTouches[0];null!=t&&(E.current=t.identifier);const a=C(e,E);if(!1!==a){const{newValue:t,activeIndex:r}=me({finger:a,values:G});M({sliderRef:ne,activeIndex:r,setActive:F}),H(t),W&&W(e,t,r)}X.current=0;const r=(0,b.Z)(ne.current);r.addEventListener("touchmove",pe),r.addEventListener("touchend",ve)})),be=o.useCallback((()=>{const e=(0,b.Z)(ne.current);e.removeEventListener("mousemove",pe),e.removeEventListener("mouseup",ve),e.removeEventListener("touchmove",pe),e.removeEventListener("touchend",ve)}),[ve,pe]);o.useEffect((()=>{const{current:e}=ne;return e.addEventListener("touchstart",he,{passive:$()}),()=>{e.removeEventListener("touchstart",he,{passive:$()}),be()}}),[be,he]),o.useEffect((()=>{l&&be()}),[l,be]);const fe=e=>t=>{var a;if(null==(a=e.onMouseDown)||a.call(e,t),l)return;if(t.defaultPrevented)return;if(0!==t.button)return;t.preventDefault();const r=C(t,E);if(!1!==r){const{newValue:e,activeIndex:a}=me({finger:r,values:G});M({sliderRef:ne,activeIndex:a,setActive:F}),H(e),W&&W(t,e,a)}X.current=0;const n=(0,b.Z)(ne.current);n.addEventListener("mousemove",pe),n.addEventListener("mouseup",ve)},Ze=R(_?G[0]:u,u,c),ge=R(G[G.length-1],u,c)-Ze,xe=e=>t=>{var a;null==(a=e.onMouseOver)||a.call(e,t);const r=Number(t.currentTarget.getAttribute("data-index"));D(r)},ke=e=>t=>{var a;null==(a=e.onMouseLeave)||a.call(e,t),D(-1)};return{axis:de,axisProps:N,getRootProps:e=>{const t={onMouseDown:fe(e||{})},a=(0,n.Z)({},e,t);return(0,n.Z)({ref:ie},a)},getHiddenInputProps:t=>{const r={onChange:ce(t||{}),onFocus:le(t||{}),onBlur:se(t||{})},o=(0,n.Z)({},t,r);return(0,n.Z)({tabIndex:V,"aria-labelledby":a,"aria-orientation":v,"aria-valuemax":h(c),"aria-valuemin":h(u),name:d,type:"range",min:e.min,max:e.max,step:e.step,disabled:l},o,{style:(0,n.Z)({},w,{direction:I?"rtl":"ltr",width:"100%",height:"100%"})})},getThumbProps:e=>{const t={onMouseOver:xe(e||{}),onMouseLeave:ke(e||{})},a=(0,n.Z)({},e,t);return(0,n.Z)({},a)},dragging:Y,marks:J,values:G,active:T,focusVisible:ae,open:O,range:_,trackOffset:Ze,trackLeap:ge}}const j=["aria-label","aria-valuetext","className","component","classes","disableSwap","disabled","getAriaLabel","getAriaValueText","marks","max","min","name","onChange","onChangeCommitted","onMouseDown","orientation","scale","step","tabIndex","track","value","valueLabelDisplay","valueLabelFormat","isRtl","components","componentsProps"],I=e=>e,E=({children:e})=>e,T=o.forwardRef((function(e,t){var a,l,s,u,b,f,Z;const{"aria-label":g,"aria-valuetext":x,className:k,component:w,classes:S,disableSwap:y=!1,disabled:L=!1,getAriaLabel:C,getAriaValueText:z,marks:M=!1,max:N=100,min:A=0,onMouseDown:P,orientation:$="horizontal",scale:T=I,step:F=1,track:O="normal",valueLabelDisplay:D="off",valueLabelFormat:Y=I,isRtl:B=!1,components:X={},componentsProps:q={}}=e,H=(0,r.Z)(e,j),W=(0,n.Z)({},e,{mark:M,classes:S,disabled:L,isRtl:B,max:N,min:A,orientation:$,scale:T,step:F,track:O,valueLabelDisplay:D,valueLabelFormat:Y}),{axisProps:_,getRootProps:G,getHiddenInputProps:J,getThumbProps:K,open:Q,active:U,axis:ee,range:te,focusVisible:ae,dragging:re,marks:ne,values:oe,trackOffset:ie,trackLeap:le}=V((0,n.Z)({},W,{ref:t}));W.marked=ne.length>0&&ne.some((e=>e.label)),W.dragging=re;const se=null!=(a=null!=w?w:X.Root)?a:"span",ce=(0,p.Z)(se,(0,n.Z)({},H,q.root),W),ue=null!=(l=X.Rail)?l:"span",de=(0,p.Z)(ue,q.rail,W),me=null!=(s=X.Track)?s:"span",pe=(0,p.Z)(me,q.track,W),ve=(0,n.Z)({},_[ee].offset(ie),_[ee].leap(le)),he=null!=(u=X.Thumb)?u:"span",be=(0,p.Z)(he,q.thumb,W),fe=null!=(b=X.ValueLabel)?b:m,Ze=(0,p.Z)(fe,q.valueLabel,W),ge=null!=(f=X.Mark)?f:"span",xe=(0,p.Z)(ge,q.mark,W),ke=null!=(Z=X.MarkLabel)?Z:"span",we=(0,p.Z)(ke,q.markLabel,W),Se=X.Input||"input",ye=(0,p.Z)(Se,q.input,W),Le=J(),Ce=(e=>{const{disabled:t,dragging:a,marked:r,orientation:n,track:o,classes:i}=e,l={root:["root",t&&"disabled",a&&"dragging",r&&"marked","vertical"===n&&"vertical","inverted"===o&&"trackInverted",!1===o&&"trackFalse"],rail:["rail"],track:["track"],mark:["mark"],markActive:["markActive"],markLabel:["markLabel"],markLabelActive:["markLabelActive"],valueLabel:["valueLabel"],thumb:["thumb",t&&"disabled"],active:["active"],disabled:["disabled"],focusVisible:["focusVisible"]};return(0,h.Z)(l,c,i)})(W);return(0,d.jsxs)(se,(0,n.Z)({},ce,G({onMouseDown:P}),{className:(0,i.Z)(Ce.root,ce.className,k),children:[(0,d.jsx)(ue,(0,n.Z)({},de,{className:(0,i.Z)(Ce.rail,de.className)})),(0,d.jsx)(me,(0,n.Z)({},pe,{className:(0,i.Z)(Ce.track,pe.className),style:(0,n.Z)({},ve,pe.style)})),ne.map(((e,t)=>{const a=R(e.value,A,N),r=_[ee].offset(a);let l;return l=!1===O?-1!==oe.indexOf(e.value):"normal"===O&&(te?e.value>=oe[0]&&e.value<=oe[oe.length-1]:e.value<=oe[0])||"inverted"===O&&(te?e.value<=oe[0]||e.value>=oe[oe.length-1]:e.value>=oe[0]),(0,d.jsxs)(o.Fragment,{children:[(0,d.jsx)(ge,(0,n.Z)({"data-index":t},xe,!(0,v.Z)(ge)&&{markActive:l},{style:(0,n.Z)({},r,xe.style),className:(0,i.Z)(Ce.mark,xe.className,l&&Ce.markActive)})),null!=e.label?(0,d.jsx)(ke,(0,n.Z)({"aria-hidden":!0,"data-index":t},we,!(0,v.Z)(ke)&&{markLabelActive:l},{style:(0,n.Z)({},r,we.style),className:(0,i.Z)(Ce.markLabel,we.className,l&&Ce.markLabelActive),children:e.label})):null]},e.value)})),oe.map(((e,t)=>{const a=R(e,A,N),r=_[ee].offset(a),l="off"===D?E:fe;return(0,d.jsx)(o.Fragment,{children:(0,d.jsx)(l,(0,n.Z)({},!(0,v.Z)(l)&&{valueLabelFormat:Y,valueLabelDisplay:D,value:"function"==typeof Y?Y(T(e),t):Y,index:t,open:Q===t||U===t||"on"===D,disabled:L},Ze,{className:(0,i.Z)(Ce.valueLabel,Ze.className),children:(0,d.jsx)(he,(0,n.Z)({"data-index":t},be,K(),{className:(0,i.Z)(Ce.thumb,be.className,U===t&&Ce.active,ae===t&&Ce.focusVisible)},!(0,v.Z)(he)&&{ownerState:(0,n.Z)({},W,be.ownerState)},{style:(0,n.Z)({},r,{pointerEvents:y&&U!==t?"none":void 0},be.style),children:(0,d.jsx)(Se,(0,n.Z)({},Le,{"data-index":t,"aria-label":C?C(t):g,"aria-valuenow":T(e),"aria-valuetext":z?z(T(e),t):x,value:oe[t]},!(0,v.Z)(Se)&&{ownerState:(0,n.Z)({},W,ye.ownerState)},ye,{style:(0,n.Z)({},Le.style,ye.style)}))}))}))},t)}))]}))})),F=T;var O=a(2945),D=a(7260),Y=a(7014),B=a(8051);const X=e=>!e||!(0,v.Z)(e);var q=a(8623);const H=["component","components","componentsProps","color","size"],W=(0,n.Z)({},u,(0,l.Z)("MuiSlider",["colorPrimary","colorSecondary","thumbColorPrimary","thumbColorSecondary","sizeSmall","thumbSizeSmall"])),_=(0,Y.ZP)("span",{name:"MuiSlider",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e,r=!0===a.marksProp&&null!==a.step?[...Array(Math.floor((a.max-a.min)/a.step)+1)].map(((e,t)=>({value:a.min+a.step*t}))):a.marksProp||[],n=r.length>0&&r.some((e=>e.label));return[t.root,t[`color${(0,q.Z)(a.color)}`],"medium"!==a.size&&t[`size${(0,q.Z)(a.size)}`],n&&t.marked,"vertical"===a.orientation&&t.vertical,"inverted"===a.track&&t.trackInverted,!1===a.track&&t.trackFalse]}})((({theme:e,ownerState:t})=>(0,n.Z)({borderRadius:12,boxSizing:"content-box",display:"inline-block",position:"relative",cursor:"pointer",touchAction:"none",color:e.palette[t.color].main,WebkitTapHighlightColor:"transparent"},"horizontal"===t.orientation&&(0,n.Z)({height:4,width:"100%",padding:"13px 0","@media (pointer: coarse)":{padding:"20px 0"}},"small"===t.size&&{height:2},t.marked&&{marginBottom:20}),"vertical"===t.orientation&&(0,n.Z)({height:"100%",width:4,padding:"0 13px","@media (pointer: coarse)":{padding:"0 20px"}},"small"===t.size&&{width:2},t.marked&&{marginRight:44}),{"@media print":{colorAdjust:"exact"},[`&.${W.disabled}`]:{pointerEvents:"none",cursor:"default",color:e.palette.grey[400]},[`&.${W.dragging}`]:{[`& .${W.thumb}, & .${W.track}`]:{transition:"none"}}}))),G=(0,Y.ZP)("span",{name:"MuiSlider",slot:"Rail",overridesResolver:(e,t)=>t.rail})((({ownerState:e})=>(0,n.Z)({display:"block",position:"absolute",borderRadius:"inherit",backgroundColor:"currentColor",opacity:.38},"horizontal"===e.orientation&&{width:"100%",height:"inherit",top:"50%",transform:"translateY(-50%)"},"vertical"===e.orientation&&{height:"100%",width:"inherit",left:"50%",transform:"translateX(-50%)"},"inverted"===e.track&&{opacity:1}))),J=(0,Y.ZP)("span",{name:"MuiSlider",slot:"Track",overridesResolver:(e,t)=>t.track})((({theme:e,ownerState:t})=>{const a="light"===e.palette.mode?(0,O.$n)(e.palette[t.color].main,.62):(0,O._j)(e.palette[t.color].main,.5);return(0,n.Z)({display:"block",position:"absolute",borderRadius:"inherit",border:"1px solid currentColor",backgroundColor:"currentColor",transition:e.transitions.create(["left","width","bottom","height"],{duration:e.transitions.duration.shortest})},"small"===t.size&&{border:"none"},"horizontal"===t.orientation&&{height:"inherit",top:"50%",transform:"translateY(-50%)"},"vertical"===t.orientation&&{width:"inherit",left:"50%",transform:"translateX(-50%)"},!1===t.track&&{display:"none"},"inverted"===t.track&&{backgroundColor:a,borderColor:a})})),K=(0,Y.ZP)("span",{name:"MuiSlider",slot:"Thumb",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.thumb,t[`thumbColor${(0,q.Z)(a.color)}`],"medium"!==a.size&&t[`thumbSize${(0,q.Z)(a.size)}`]]}})((({theme:e,ownerState:t})=>(0,n.Z)({position:"absolute",width:20,height:20,boxSizing:"border-box",borderRadius:"50%",outline:0,backgroundColor:"currentColor",display:"flex",alignItems:"center",justifyContent:"center",transition:e.transitions.create(["box-shadow","left","bottom"],{duration:e.transitions.duration.shortest})},"small"===t.size&&{width:12,height:12},"horizontal"===t.orientation&&{top:"50%",transform:"translate(-50%, -50%)"},"vertical"===t.orientation&&{left:"50%",transform:"translate(-50%, 50%)"},{"&:before":(0,n.Z)({position:"absolute",content:'""',borderRadius:"inherit",width:"100%",height:"100%",boxShadow:e.shadows[2]},"small"===t.size&&{boxShadow:"none"}),"&::after":{position:"absolute",content:'""',borderRadius:"50%",width:42,height:42,top:"50%",left:"50%",transform:"translate(-50%, -50%)"},[`&:hover, &.${W.focusVisible}`]:{boxShadow:`0px 0px 0px 8px ${(0,O.Fq)(e.palette[t.color].main,.16)}`,"@media (hover: none)":{boxShadow:"none"}},[`&.${W.active}`]:{boxShadow:`0px 0px 0px 14px ${(0,O.Fq)(e.palette[t.color].main,.16)}`},[`&.${W.disabled}`]:{"&:hover":{boxShadow:"none"}}}))),Q=(0,Y.ZP)(m,{name:"MuiSlider",slot:"ValueLabel",overridesResolver:(e,t)=>t.valueLabel})((({theme:e,ownerState:t})=>(0,n.Z)({[`&.${W.valueLabelOpen}`]:{transform:"translateY(-100%) scale(1)"},zIndex:1,whiteSpace:"nowrap"},e.typography.body2,{fontWeight:500,transition:e.transitions.create(["transform"],{duration:e.transitions.duration.shortest}),top:-10,transformOrigin:"bottom center",transform:"translateY(-100%) scale(0)",position:"absolute",backgroundColor:e.palette.grey[600],borderRadius:2,color:e.palette.common.white,display:"flex",alignItems:"center",justifyContent:"center",padding:"0.25rem 0.75rem"},"small"===t.size&&{fontSize:e.typography.pxToRem(12),padding:"0.25rem 0.5rem"},{"&:before":{position:"absolute",content:'""',width:8,height:8,bottom:0,left:"50%",transform:"translate(-50%, 50%) rotate(45deg)",backgroundColor:"inherit"}}))),U=(0,Y.ZP)("span",{name:"MuiSlider",slot:"Mark",shouldForwardProp:e=>(0,Y.Dz)(e)&&"markActive"!==e,overridesResolver:(e,t)=>t.mark})((({theme:e,ownerState:t,markActive:a})=>(0,n.Z)({position:"absolute",width:2,height:2,borderRadius:1,backgroundColor:"currentColor"},"horizontal"===t.orientation&&{top:"50%",transform:"translate(-1px, -50%)"},"vertical"===t.orientation&&{left:"50%",transform:"translate(-50%, 1px)"},a&&{backgroundColor:e.palette.background.paper,opacity:.8}))),ee=(0,Y.ZP)("span",{name:"MuiSlider",slot:"MarkLabel",shouldForwardProp:e=>(0,Y.Dz)(e)&&"markLabelActive"!==e,overridesResolver:(e,t)=>t.markLabel})((({theme:e,ownerState:t,markLabelActive:a})=>(0,n.Z)({},e.typography.body2,{color:e.palette.text.secondary,position:"absolute",whiteSpace:"nowrap"},"horizontal"===t.orientation&&{top:30,transform:"translateX(-50%)","@media (pointer: coarse)":{top:40}},"vertical"===t.orientation&&{left:36,transform:"translateY(50%)","@media (pointer: coarse)":{left:44}},a&&{color:e.palette.text.primary}))),te=o.forwardRef((function(e,t){var a,o,l,s;const u=(0,D.Z)({props:e,name:"MuiSlider"}),m="rtl"===(0,B.Z)().direction,{component:p="span",components:v={},componentsProps:h={},color:b="primary",size:f="medium"}=u,Z=(0,r.Z)(u,H),g=(e=>{const{color:t,size:a,classes:r={}}=e;return(0,n.Z)({},r,{root:(0,i.Z)(r.root,c(`color${(0,q.Z)(t)}`),r[`color${(0,q.Z)(t)}`],a&&[c(`size${(0,q.Z)(a)}`),r[`size${(0,q.Z)(a)}`]]),thumb:(0,i.Z)(r.thumb,c(`thumbColor${(0,q.Z)(t)}`),r[`thumbColor${(0,q.Z)(t)}`],a&&[c(`thumbSize${(0,q.Z)(a)}`),r[`thumbSize${(0,q.Z)(a)}`]])})})((0,n.Z)({},u,{color:b,size:f}));return(0,d.jsx)(F,(0,n.Z)({},Z,{isRtl:m,components:(0,n.Z)({Root:_,Rail:G,Track:J,Thumb:K,ValueLabel:Q,Mark:U,MarkLabel:ee},v),componentsProps:(0,n.Z)({},h,{root:(0,n.Z)({},h.root,X(v.Root)&&{as:p,ownerState:(0,n.Z)({},null==(a=h.root)?void 0:a.ownerState,{color:b,size:f})}),thumb:(0,n.Z)({},h.thumb,X(v.Thumb)&&{ownerState:(0,n.Z)({},null==(o=h.thumb)?void 0:o.ownerState,{color:b,size:f})}),track:(0,n.Z)({},h.track,X(v.Track)&&{ownerState:(0,n.Z)({},null==(l=h.track)?void 0:l.ownerState,{color:b,size:f})}),valueLabel:(0,n.Z)({},h.valueLabel,X(v.ValueLabel)&&{ownerState:(0,n.Z)({},null==(s=h.valueLabel)?void 0:s.ownerState,{color:b,size:f})})}),classes:g,ref:t}))}))}}]);