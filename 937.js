/*! For license information please see 937.js.LICENSE.txt */
(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[937],{3394:(t,e,r)=>{"use strict";r.d(e,{Z:()=>f});var i=r(1972),a=r(7692),n=r(9526),o=r(3060),s=r(3957),u=r(2945),c=r(949),l=r(7260),h=r(3272),p=r(7557);const d=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],m=(0,c.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,r.absolute&&e.absolute,e[r.variant],r.light&&e.light,"vertical"===r.orientation&&e.vertical,r.flexItem&&e.flexItem,r.children&&e.withChildren,r.children&&"vertical"===r.orientation&&e.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&e.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&e.textAlignLeft]}})((({theme:t,ownerState:e})=>(0,a.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},e.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},e.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:(0,u.Fq)(t.palette.divider,.08)},"inset"===e.variant&&{marginLeft:72},"middle"===e.variant&&"horizontal"===e.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===e.variant&&"vertical"===e.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===e.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},e.flexItem&&{alignSelf:"stretch",height:"auto"})),(({ownerState:t})=>(0,a.Z)({},t.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}})),(({theme:t,ownerState:e})=>(0,a.Z)({},e.children&&"vertical"!==e.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`}})),(({theme:t,ownerState:e})=>(0,a.Z)({},e.children&&"vertical"===e.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(t.vars||t).palette.divider}`}})),(({ownerState:t})=>(0,a.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}}))),v=(0,c.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.wrapper,"vertical"===r.orientation&&e.wrapperVertical]}})((({theme:t,ownerState:e})=>(0,a.Z)({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},"vertical"===e.orientation&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`}))),f=n.forwardRef((function(t,e){const r=(0,l.Z)({props:t,name:"MuiDivider"}),{absolute:n=!1,children:u,className:c,component:f=(u?"div":"hr"),flexItem:y=!1,light:O=!1,orientation:x="horizontal",role:T=("hr"!==f?"separator":void 0),textAlign:g="center",variant:_="fullWidth"}=r,N=(0,i.Z)(r,d),C=(0,a.Z)({},r,{absolute:n,component:f,flexItem:y,light:O,orientation:x,role:T,textAlign:g,variant:_}),A=(t=>{const{absolute:e,children:r,classes:i,flexItem:a,light:n,orientation:o,textAlign:u,variant:c}=t,l={root:["root",e&&"absolute",c,n&&"light","vertical"===o&&"vertical",a&&"flexItem",r&&"withChildren",r&&"vertical"===o&&"withChildrenVertical","right"===u&&"vertical"!==o&&"textAlignRight","left"===u&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]};return(0,s.Z)(l,h.V,i)})(C);return(0,p.jsx)(m,(0,a.Z)({as:f,className:(0,o.Z)(A.root,c),role:T,ref:e,ownerState:C},N,{children:u?(0,p.jsx)(v,{className:A.wrapper,ownerState:C,children:u}):null}))}))},3272:(t,e,r)=>{"use strict";r.d(e,{V:()=>n,Z:()=>o});var i=r(7402),a=r(5111);function n(t){return(0,a.Z)("MuiDivider",t)}const o=(0,i.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"])},897:(t,e,r)=>{"use strict";r.d(e,{Z:()=>A});var i=r(1972),a=r(7692),n=r(9526),o=r(3060),s=r(3957),u=r(2945),c=r(949),l=r(7260),h=r(7511),p=r(8592),d=r(3830),m=r(9428),v=r(3272),f=r(4534),y=r(7148),O=r(7402),x=r(5111);function T(t){return(0,x.Z)("MuiMenuItem",t)}const g=(0,O.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var _=r(7557);const N=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],C=(0,c.ZP)(p.Z,{shouldForwardProp:t=>(0,c.FO)(t)||"classes"===t,name:"MuiMenuItem",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,r.dense&&e.dense,r.divider&&e.divider,!r.disableGutters&&e.gutters]}})((({theme:t,ownerState:e})=>(0,a.Z)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!e.disableGutters&&{paddingLeft:16,paddingRight:16},e.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${g.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:(0,u.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${g.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:(0,u.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${g.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:(0,u.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:(0,u.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}},[`&.${g.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${g.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity},[`& + .${v.Z.root}`]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},[`& + .${v.Z.inset}`]:{marginLeft:52},[`& .${y.Z.root}`]:{marginTop:0,marginBottom:0},[`& .${y.Z.inset}`]:{paddingLeft:36},[`& .${f.Z.root}`]:{minWidth:36}},!e.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},e.dense&&(0,a.Z)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{[`& .${f.Z.root} svg`]:{fontSize:"1.25rem"}})))),A=n.forwardRef((function(t,e){const r=(0,l.Z)({props:t,name:"MuiMenuItem"}),{autoFocus:u=!1,component:c="li",dense:p=!1,divider:v=!1,disableGutters:f=!1,focusVisibleClassName:y,role:O="menuitem",tabIndex:x,className:g}=r,A=(0,i.Z)(r,N),E=n.useContext(h.Z),M=n.useMemo((()=>({dense:p||E.dense||!1,disableGutters:f})),[E.dense,p,f]),b=n.useRef(null);(0,d.Z)((()=>{u&&b.current&&b.current.focus()}),[u]);const R=(0,a.Z)({},r,{dense:M.dense,divider:v,disableGutters:f}),w=(t=>{const{disabled:e,dense:r,divider:i,disableGutters:n,selected:o,classes:u}=t,c={root:["root",r&&"dense",e&&"disabled",!n&&"gutters",i&&"divider",o&&"selected"]},l=(0,s.Z)(c,T,u);return(0,a.Z)({},u,l)})(r),I=(0,m.Z)(b,e);let S;return r.disabled||(S=void 0!==x?x:-1),(0,_.jsx)(h.Z.Provider,{value:M,children:(0,_.jsx)(C,(0,a.Z)({ref:I,role:O,tabIndex:S,component:c,focusVisibleClassName:(0,o.Z)(w.focusVisible,y),className:(0,o.Z)(w.root,g)},A,{ownerState:R,classes:w}))})}))},929:t=>{t.exports=function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}},5534:(t,e,r)=>{var i=r(9415),a=r(4728)(i);t.exports=a},2153:(t,e,r)=>{var i=r(2824),a=r(6648);t.exports=function t(e,r,n,o,s){var u=-1,c=e.length;for(n||(n=a),s||(s=[]);++u<c;){var l=e[u];r>0&&n(l)?r>1?t(l,r-1,n,o,s):i(s,l):o||(s[s.length]=l)}return s}},472:(t,e,r)=>{var i=r(5534),a=r(1528);t.exports=function(t,e){var r=-1,n=a(t)?Array(t.length):[];return i(t,(function(t,i,a){n[++r]=e(t,i,a)})),n}},5222:(t,e,r)=>{var i=r(7041),a=r(1845),n=r(7159),o=r(472),s=r(3032),u=r(2723),c=r(7099),l=r(1549),h=r(3706);t.exports=function(t,e,r){e=e.length?i(e,(function(t){return h(t)?function(e){return a(e,1===t.length?t[0]:t)}:t})):[l];var p=-1;e=i(e,u(n));var d=o(t,(function(t,r,a){return{criteria:i(e,(function(e){return e(t)})),index:++p,value:t}}));return s(d,(function(t,e){return c(t,e,r)}))}},59:(t,e,r)=>{var i=r(1549),a=r(3039),n=r(7209);t.exports=function(t,e){return n(a(t,e,i),t+"")}},6920:(t,e,r)=>{var i=r(446),a=r(8689),n=r(1549),o=a?function(t,e){return a(t,"toString",{configurable:!0,enumerable:!1,value:i(e),writable:!0})}:n;t.exports=o},3032:t=>{t.exports=function(t,e){var r=t.length;for(t.sort(e);r--;)t[r]=t[r].value;return t}},7487:(t,e,r)=>{var i=r(1878);t.exports=function(t,e){if(t!==e){var r=void 0!==t,a=null===t,n=t==t,o=i(t),s=void 0!==e,u=null===e,c=e==e,l=i(e);if(!u&&!l&&!o&&t>e||o&&s&&c&&!u&&!l||a&&s&&c||!r&&c||!n)return 1;if(!a&&!o&&!l&&t<e||l&&r&&n&&!a&&!o||u&&r&&n||!s&&n||!c)return-1}return 0}},7099:(t,e,r)=>{var i=r(7487);t.exports=function(t,e,r){for(var a=-1,n=t.criteria,o=e.criteria,s=n.length,u=r.length;++a<s;){var c=i(n[a],o[a]);if(c)return a>=u?c:c*("desc"==r[a]?-1:1)}return t.index-e.index}},4728:(t,e,r)=>{var i=r(1528);t.exports=function(t,e){return function(r,a){if(null==r)return r;if(!i(r))return t(r,a);for(var n=r.length,o=e?n:-1,s=Object(r);(e?o--:++o<n)&&!1!==a(s[o],o,s););return r}}},6648:(t,e,r)=>{var i=r(4937),a=r(7016),n=r(3706),o=i?i.isConcatSpreadable:void 0;t.exports=function(t){return n(t)||a(t)||!!(o&&t&&t[o])}},8360:(t,e,r)=>{var i=r(1316),a=r(1528),n=r(9699),o=r(3619);t.exports=function(t,e,r){if(!o(r))return!1;var s=typeof e;return!!("number"==s?a(r)&&n(e,r.length):"string"==s&&e in r)&&i(r[e],t)}},3039:(t,e,r)=>{var i=r(929),a=Math.max;t.exports=function(t,e,r){return e=a(void 0===e?t.length-1:e,0),function(){for(var n=arguments,o=-1,s=a(n.length-e,0),u=Array(s);++o<s;)u[o]=n[e+o];o=-1;for(var c=Array(e+1);++o<e;)c[o]=n[o];return c[e]=r(u),i(t,this,c)}}},7209:(t,e,r)=>{var i=r(6920),a=r(832)(i);t.exports=a},832:t=>{var e=Date.now;t.exports=function(t){var r=0,i=0;return function(){var a=e(),n=16-(a-i);if(i=a,n>0){if(++r>=800)return arguments[0]}else r=0;return t.apply(void 0,arguments)}}},446:t=>{t.exports=function(t){return function(){return t}}},5853:(t,e,r)=>{var i=r(2153),a=r(5222),n=r(59),o=r(8360),s=n((function(t,e){if(null==t)return[];var r=e.length;return r>1&&o(t,e[0],e[1])?e=[]:r>2&&o(e[0],e[1],e[2])&&(e=[e[0]]),a(t,i(e,1),[])}));t.exports=s},4065:(t,e,r)=>{"use strict";r.d(e,{OU:()=>_,QI:()=>n});var i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)};function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function n(t){var e="";Array.isArray(t)||(t=[t]);for(var r=0;r<t.length;r++){var i=t[r];if(i.type===_.CLOSE_PATH)e+="z";else if(i.type===_.HORIZ_LINE_TO)e+=(i.relative?"h":"H")+i.x;else if(i.type===_.VERT_LINE_TO)e+=(i.relative?"v":"V")+i.y;else if(i.type===_.MOVE_TO)e+=(i.relative?"m":"M")+i.x+" "+i.y;else if(i.type===_.LINE_TO)e+=(i.relative?"l":"L")+i.x+" "+i.y;else if(i.type===_.CURVE_TO)e+=(i.relative?"c":"C")+i.x1+" "+i.y1+" "+i.x2+" "+i.y2+" "+i.x+" "+i.y;else if(i.type===_.SMOOTH_CURVE_TO)e+=(i.relative?"s":"S")+i.x2+" "+i.y2+" "+i.x+" "+i.y;else if(i.type===_.QUAD_TO)e+=(i.relative?"q":"Q")+i.x1+" "+i.y1+" "+i.x+" "+i.y;else if(i.type===_.SMOOTH_QUAD_TO)e+=(i.relative?"t":"T")+i.x+" "+i.y;else{if(i.type!==_.ARC)throw new Error('Unexpected command type "'+i.type+'" at index '+r+".");e+=(i.relative?"a":"A")+i.rX+" "+i.rY+" "+i.xRot+" "+ +i.lArcFlag+" "+ +i.sweepFlag+" "+i.x+" "+i.y}}return e}function o(t,e){var r=t[0],i=t[1];return[r*Math.cos(e)-i*Math.sin(e),r*Math.sin(e)+i*Math.cos(e)]}function s(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var r=0;r<t.length;r++)if("number"!=typeof t[r])throw new Error("assertNumbers arguments["+r+"] is not a number. "+typeof t[r]+" == typeof "+t[r]);return!0}var u=Math.PI;function c(t,e,r){t.lArcFlag=0===t.lArcFlag?0:1,t.sweepFlag=0===t.sweepFlag?0:1;var i=t.rX,a=t.rY,n=t.x,s=t.y;i=Math.abs(t.rX),a=Math.abs(t.rY);var c=o([(e-n)/2,(r-s)/2],-t.xRot/180*u),l=c[0],h=c[1],p=Math.pow(l,2)/Math.pow(i,2)+Math.pow(h,2)/Math.pow(a,2);1<p&&(i*=Math.sqrt(p),a*=Math.sqrt(p)),t.rX=i,t.rY=a;var d=Math.pow(i,2)*Math.pow(h,2)+Math.pow(a,2)*Math.pow(l,2),m=(t.lArcFlag!==t.sweepFlag?1:-1)*Math.sqrt(Math.max(0,(Math.pow(i,2)*Math.pow(a,2)-d)/d)),v=i*h/a*m,f=-a*l/i*m,y=o([v,f],t.xRot/180*u);t.cX=y[0]+(e+n)/2,t.cY=y[1]+(r+s)/2,t.phi1=Math.atan2((h-f)/a,(l-v)/i),t.phi2=Math.atan2((-h-f)/a,(-l-v)/i),0===t.sweepFlag&&t.phi2>t.phi1&&(t.phi2-=2*u),1===t.sweepFlag&&t.phi2<t.phi1&&(t.phi2+=2*u),t.phi1*=180/u,t.phi2*=180/u}function l(t,e,r){s(t,e,r);var i=t*t+e*e-r*r;if(0>i)return[];if(0===i)return[[t*r/(t*t+e*e),e*r/(t*t+e*e)]];var a=Math.sqrt(i);return[[(t*r+e*a)/(t*t+e*e),(e*r-t*a)/(t*t+e*e)],[(t*r-e*a)/(t*t+e*e),(e*r+t*a)/(t*t+e*e)]]}var h,p=Math.PI/180;function d(t,e,r){return(1-r)*t+r*e}function m(t,e,r,i){return t+Math.cos(i/180*u)*e+Math.sin(i/180*u)*r}function v(t,e,r,i){var a=1e-6,n=e-t,o=r-e,s=3*n+3*(i-r)-6*o,u=6*(o-n),c=3*n;return Math.abs(s)<a?[-c/u]:function(t,e,r){void 0===r&&(r=1e-6);var i=t*t/4-e;if(i<-r)return[];if(i<=r)return[-t/2];var a=Math.sqrt(i);return[-t/2-a,-t/2+a]}(u/s,c/s,a)}function f(t,e,r,i,a){var n=1-a;return t*(n*n*n)+e*(3*n*n*a)+r*(3*n*a*a)+i*(a*a*a)}!function(t){function e(){return a((function(t,e,r){return t.relative&&(void 0!==t.x1&&(t.x1+=e),void 0!==t.y1&&(t.y1+=r),void 0!==t.x2&&(t.x2+=e),void 0!==t.y2&&(t.y2+=r),void 0!==t.x&&(t.x+=e),void 0!==t.y&&(t.y+=r),t.relative=!1),t}))}function r(){var t=NaN,e=NaN,r=NaN,i=NaN;return a((function(a,n,o){return a.type&_.SMOOTH_CURVE_TO&&(a.type=_.CURVE_TO,t=isNaN(t)?n:t,e=isNaN(e)?o:e,a.x1=a.relative?n-t:2*n-t,a.y1=a.relative?o-e:2*o-e),a.type&_.CURVE_TO?(t=a.relative?n+a.x2:a.x2,e=a.relative?o+a.y2:a.y2):(t=NaN,e=NaN),a.type&_.SMOOTH_QUAD_TO&&(a.type=_.QUAD_TO,r=isNaN(r)?n:r,i=isNaN(i)?o:i,a.x1=a.relative?n-r:2*n-r,a.y1=a.relative?o-i:2*o-i),a.type&_.QUAD_TO?(r=a.relative?n+a.x1:a.x1,i=a.relative?o+a.y1:a.y1):(r=NaN,i=NaN),a}))}function i(){var t=NaN,e=NaN;return a((function(r,i,a){if(r.type&_.SMOOTH_QUAD_TO&&(r.type=_.QUAD_TO,t=isNaN(t)?i:t,e=isNaN(e)?a:e,r.x1=r.relative?i-t:2*i-t,r.y1=r.relative?a-e:2*a-e),r.type&_.QUAD_TO){t=r.relative?i+r.x1:r.x1,e=r.relative?a+r.y1:r.y1;var n=r.x1,o=r.y1;r.type=_.CURVE_TO,r.x1=((r.relative?0:i)+2*n)/3,r.y1=((r.relative?0:a)+2*o)/3,r.x2=(r.x+2*n)/3,r.y2=(r.y+2*o)/3}else t=NaN,e=NaN;return r}))}function a(t){var e=0,r=0,i=NaN,a=NaN;return function(n){if(isNaN(i)&&!(n.type&_.MOVE_TO))throw new Error("path must start with moveto");var o=t(n,e,r,i,a);return n.type&_.CLOSE_PATH&&(e=i,r=a),void 0!==n.x&&(e=n.relative?e+n.x:n.x),void 0!==n.y&&(r=n.relative?r+n.y:n.y),n.type&_.MOVE_TO&&(i=e,a=r),o}}function n(t,e,r,i,n,o){return s(t,e,r,i,n,o),a((function(a,s,u,c){var l=a.x1,h=a.x2,p=a.relative&&!isNaN(c),d=void 0!==a.x?a.x:p?0:s,m=void 0!==a.y?a.y:p?0:u;function v(t){return t*t}a.type&_.HORIZ_LINE_TO&&0!==e&&(a.type=_.LINE_TO,a.y=a.relative?0:u),a.type&_.VERT_LINE_TO&&0!==r&&(a.type=_.LINE_TO,a.x=a.relative?0:s),void 0!==a.x&&(a.x=a.x*t+m*r+(p?0:n)),void 0!==a.y&&(a.y=d*e+a.y*i+(p?0:o)),void 0!==a.x1&&(a.x1=a.x1*t+a.y1*r+(p?0:n)),void 0!==a.y1&&(a.y1=l*e+a.y1*i+(p?0:o)),void 0!==a.x2&&(a.x2=a.x2*t+a.y2*r+(p?0:n)),void 0!==a.y2&&(a.y2=h*e+a.y2*i+(p?0:o));var f=t*i-e*r;if(void 0!==a.xRot&&(1!==t||0!==e||0!==r||1!==i))if(0===f)delete a.rX,delete a.rY,delete a.xRot,delete a.lArcFlag,delete a.sweepFlag,a.type=_.LINE_TO;else{var y=a.xRot*Math.PI/180,O=Math.sin(y),x=Math.cos(y),T=1/v(a.rX),g=1/v(a.rY),N=v(x)*T+v(O)*g,C=2*O*x*(T-g),A=v(O)*T+v(x)*g,E=N*i*i-C*e*i+A*e*e,M=C*(t*i+e*r)-2*(N*r*i+A*t*e),b=N*r*r-C*t*r+A*t*t,R=(Math.atan2(M,E-b)+Math.PI)%Math.PI/2,w=Math.sin(R),I=Math.cos(R);a.rX=Math.abs(f)/Math.sqrt(E*v(I)+M*w*I+b*v(w)),a.rY=Math.abs(f)/Math.sqrt(E*v(w)-M*w*I+b*v(I)),a.xRot=180*R/Math.PI}return void 0!==a.sweepFlag&&0>f&&(a.sweepFlag=+!a.sweepFlag),a}))}t.ROUND=function(t){function e(e){return Math.round(e*t)/t}return void 0===t&&(t=1e13),s(t),function(t){return void 0!==t.x1&&(t.x1=e(t.x1)),void 0!==t.y1&&(t.y1=e(t.y1)),void 0!==t.x2&&(t.x2=e(t.x2)),void 0!==t.y2&&(t.y2=e(t.y2)),void 0!==t.x&&(t.x=e(t.x)),void 0!==t.y&&(t.y=e(t.y)),void 0!==t.rX&&(t.rX=e(t.rX)),void 0!==t.rY&&(t.rY=e(t.rY)),t}},t.TO_ABS=e,t.TO_REL=function(){return a((function(t,e,r){return t.relative||(void 0!==t.x1&&(t.x1-=e),void 0!==t.y1&&(t.y1-=r),void 0!==t.x2&&(t.x2-=e),void 0!==t.y2&&(t.y2-=r),void 0!==t.x&&(t.x-=e),void 0!==t.y&&(t.y-=r),t.relative=!0),t}))},t.NORMALIZE_HVZ=function(t,e,r){return void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),a((function(i,a,n,o,s){if(isNaN(o)&&!(i.type&_.MOVE_TO))throw new Error("path must start with moveto");return e&&i.type&_.HORIZ_LINE_TO&&(i.type=_.LINE_TO,i.y=i.relative?0:n),r&&i.type&_.VERT_LINE_TO&&(i.type=_.LINE_TO,i.x=i.relative?0:a),t&&i.type&_.CLOSE_PATH&&(i.type=_.LINE_TO,i.x=i.relative?o-a:o,i.y=i.relative?s-n:s),i.type&_.ARC&&(0===i.rX||0===i.rY)&&(i.type=_.LINE_TO,delete i.rX,delete i.rY,delete i.xRot,delete i.lArcFlag,delete i.sweepFlag),i}))},t.NORMALIZE_ST=r,t.QT_TO_C=i,t.INFO=a,t.SANITIZE=function(t){void 0===t&&(t=0),s(t);var e=NaN,r=NaN,i=NaN,n=NaN;return a((function(a,o,s,u,c){var l=Math.abs,h=!1,p=0,d=0;if(a.type&_.SMOOTH_CURVE_TO&&(p=isNaN(e)?0:o-e,d=isNaN(r)?0:s-r),a.type&(_.CURVE_TO|_.SMOOTH_CURVE_TO)?(e=a.relative?o+a.x2:a.x2,r=a.relative?s+a.y2:a.y2):(e=NaN,r=NaN),a.type&_.SMOOTH_QUAD_TO?(i=isNaN(i)?o:2*o-i,n=isNaN(n)?s:2*s-n):a.type&_.QUAD_TO?(i=a.relative?o+a.x1:a.x1,n=a.relative?s+a.y1:a.y2):(i=NaN,n=NaN),a.type&_.LINE_COMMANDS||a.type&_.ARC&&(0===a.rX||0===a.rY||!a.lArcFlag)||a.type&_.CURVE_TO||a.type&_.SMOOTH_CURVE_TO||a.type&_.QUAD_TO||a.type&_.SMOOTH_QUAD_TO){var m=void 0===a.x?0:a.relative?a.x:a.x-o,v=void 0===a.y?0:a.relative?a.y:a.y-s;p=isNaN(i)?void 0===a.x1?p:a.relative?a.x:a.x1-o:i-o,d=isNaN(n)?void 0===a.y1?d:a.relative?a.y:a.y1-s:n-s;var f=void 0===a.x2?0:a.relative?a.x:a.x2-o,y=void 0===a.y2?0:a.relative?a.y:a.y2-s;l(m)<=t&&l(v)<=t&&l(p)<=t&&l(d)<=t&&l(f)<=t&&l(y)<=t&&(h=!0)}return a.type&_.CLOSE_PATH&&l(o-u)<=t&&l(s-c)<=t&&(h=!0),h?[]:a}))},t.MATRIX=n,t.ROTATE=function(t,e,r){void 0===e&&(e=0),void 0===r&&(r=0),s(t,e,r);var i=Math.sin(t),a=Math.cos(t);return n(a,i,-i,a,e-e*a+r*i,r-e*i-r*a)},t.TRANSLATE=function(t,e){return void 0===e&&(e=0),s(t,e),n(1,0,0,1,t,e)},t.SCALE=function(t,e){return void 0===e&&(e=t),s(t,e),n(t,0,0,e,0,0)},t.SKEW_X=function(t){return s(t),n(1,0,Math.atan(t),1,0,0)},t.SKEW_Y=function(t){return s(t),n(1,Math.atan(t),0,1,0,0)},t.X_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),s(t),n(-1,0,0,1,t,0)},t.Y_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),s(t),n(1,0,0,-1,0,t)},t.A_TO_C=function(){return a((function(t,e,r){return _.ARC===t.type?function(t,e,r){var i,a,n,s;t.cX||c(t,e,r);for(var u=Math.min(t.phi1,t.phi2),l=Math.max(t.phi1,t.phi2)-u,h=Math.ceil(l/90),m=new Array(h),v=e,f=r,y=0;y<h;y++){var O=d(t.phi1,t.phi2,y/h),x=d(t.phi1,t.phi2,(y+1)/h),T=x-O,g=4/3*Math.tan(T*p/4),N=[Math.cos(O*p)-g*Math.sin(O*p),Math.sin(O*p)+g*Math.cos(O*p)],C=N[0],A=N[1],E=[Math.cos(x*p),Math.sin(x*p)],M=E[0],b=E[1],R=[M+g*Math.sin(x*p),b-g*Math.cos(x*p)],w=R[0],I=R[1];m[y]={relative:t.relative,type:_.CURVE_TO};var S=function(e,r){var i=o([e*t.rX,r*t.rY],t.xRot),a=i[0],n=i[1];return[t.cX+a,t.cY+n]};i=S(C,A),m[y].x1=i[0],m[y].y1=i[1],a=S(w,I),m[y].x2=a[0],m[y].y2=a[1],n=S(M,b),m[y].x=n[0],m[y].y=n[1],t.relative&&(m[y].x1-=v,m[y].y1-=f,m[y].x2-=v,m[y].y2-=f,m[y].x-=v,m[y].y-=f),v=(s=[m[y].x,m[y].y])[0],f=s[1]}return m}(t,t.relative?0:e,t.relative?0:r):t}))},t.ANNOTATE_ARCS=function(){return a((function(t,e,r){return t.relative&&(e=0,r=0),_.ARC===t.type&&c(t,e,r),t}))},t.CLONE=function(){return function(t){var e={};for(var r in t)e[r]=t[r];return e}},t.CALCULATE_BOUNDS=function(){var t=e(),n=i(),o=r(),s=a((function(e,r,i){var a=o(n(t(function(t){var e={};for(var r in t)e[r]=t[r];return e}(e))));function u(t){t>s.maxX&&(s.maxX=t),t<s.minX&&(s.minX=t)}function h(t){t>s.maxY&&(s.maxY=t),t<s.minY&&(s.minY=t)}if(a.type&_.DRAWING_COMMANDS&&(u(r),h(i)),a.type&_.HORIZ_LINE_TO&&u(a.x),a.type&_.VERT_LINE_TO&&h(a.y),a.type&_.LINE_TO&&(u(a.x),h(a.y)),a.type&_.CURVE_TO){u(a.x),h(a.y);for(var p=0,d=v(r,a.x1,a.x2,a.x);p<d.length;p++)0<(L=d[p])&&1>L&&u(f(r,a.x1,a.x2,a.x,L));for(var y=0,O=v(i,a.y1,a.y2,a.y);y<O.length;y++)0<(L=O[y])&&1>L&&h(f(i,a.y1,a.y2,a.y,L))}if(a.type&_.ARC){u(a.x),h(a.y),c(a,r,i);for(var x=a.xRot/180*Math.PI,T=Math.cos(x)*a.rX,g=Math.sin(x)*a.rX,N=-Math.sin(x)*a.rY,C=Math.cos(x)*a.rY,A=a.phi1<a.phi2?[a.phi1,a.phi2]:-180>a.phi2?[a.phi2+360,a.phi1+360]:[a.phi2,a.phi1],E=A[0],M=A[1],b=function(t){var e=t[0],r=t[1],i=180*Math.atan2(r,e)/Math.PI;return i<E?i+360:i},R=0,w=l(N,-T,0).map(b);R<w.length;R++)(L=w[R])>E&&L<M&&u(m(a.cX,T,N,L));for(var I=0,S=l(C,-g,0).map(b);I<S.length;I++){var L;(L=S[I])>E&&L<M&&h(m(a.cY,g,C,L))}}return e}));return s.minX=1/0,s.maxX=-1/0,s.minY=1/0,s.maxY=-1/0,s}}(h||(h={}));var y,O=function(){function t(){}return t.prototype.round=function(t){return this.transform(h.ROUND(t))},t.prototype.toAbs=function(){return this.transform(h.TO_ABS())},t.prototype.toRel=function(){return this.transform(h.TO_REL())},t.prototype.normalizeHVZ=function(t,e,r){return this.transform(h.NORMALIZE_HVZ(t,e,r))},t.prototype.normalizeST=function(){return this.transform(h.NORMALIZE_ST())},t.prototype.qtToC=function(){return this.transform(h.QT_TO_C())},t.prototype.aToC=function(){return this.transform(h.A_TO_C())},t.prototype.sanitize=function(t){return this.transform(h.SANITIZE(t))},t.prototype.translate=function(t,e){return this.transform(h.TRANSLATE(t,e))},t.prototype.scale=function(t,e){return this.transform(h.SCALE(t,e))},t.prototype.rotate=function(t,e,r){return this.transform(h.ROTATE(t,e,r))},t.prototype.matrix=function(t,e,r,i,a,n){return this.transform(h.MATRIX(t,e,r,i,a,n))},t.prototype.skewX=function(t){return this.transform(h.SKEW_X(t))},t.prototype.skewY=function(t){return this.transform(h.SKEW_Y(t))},t.prototype.xSymmetry=function(t){return this.transform(h.X_AXIS_SYMMETRY(t))},t.prototype.ySymmetry=function(t){return this.transform(h.Y_AXIS_SYMMETRY(t))},t.prototype.annotateArcs=function(){return this.transform(h.ANNOTATE_ARCS())},t}(),x=function(t){return" "===t||"\t"===t||"\r"===t||"\n"===t},T=function(t){return"0".charCodeAt(0)<=t.charCodeAt(0)&&t.charCodeAt(0)<="9".charCodeAt(0)},g=function(t){function e(){var e=t.call(this)||this;return e.curNumber="",e.curCommandType=-1,e.curCommandRelative=!1,e.canParseCommandOrComma=!0,e.curNumberHasExp=!1,e.curNumberHasExpDigits=!1,e.curNumberHasDecimal=!1,e.curArgs=[],e}return a(e,t),e.prototype.finish=function(t){if(void 0===t&&(t=[]),this.parse(" ",t),0!==this.curArgs.length||!this.canParseCommandOrComma)throw new SyntaxError("Unterminated command at the path end.");return t},e.prototype.parse=function(t,e){var r=this;void 0===e&&(e=[]);for(var i=function(t){e.push(t),r.curArgs.length=0,r.canParseCommandOrComma=!0},a=0;a<t.length;a++){var n=t[a],o=!(this.curCommandType!==_.ARC||3!==this.curArgs.length&&4!==this.curArgs.length||1!==this.curNumber.length||"0"!==this.curNumber&&"1"!==this.curNumber),s=T(n)&&("0"===this.curNumber&&"0"===n||o);if(!T(n)||s)if("e"!==n&&"E"!==n)if("-"!==n&&"+"!==n||!this.curNumberHasExp||this.curNumberHasExpDigits)if("."!==n||this.curNumberHasExp||this.curNumberHasDecimal||o){if(this.curNumber&&-1!==this.curCommandType){var u=Number(this.curNumber);if(isNaN(u))throw new SyntaxError("Invalid number ending at "+a);if(this.curCommandType===_.ARC)if(0===this.curArgs.length||1===this.curArgs.length){if(0>u)throw new SyntaxError('Expected positive number, got "'+u+'" at index "'+a+'"')}else if((3===this.curArgs.length||4===this.curArgs.length)&&"0"!==this.curNumber&&"1"!==this.curNumber)throw new SyntaxError('Expected a flag, got "'+this.curNumber+'" at index "'+a+'"');this.curArgs.push(u),this.curArgs.length===N[this.curCommandType]&&(_.HORIZ_LINE_TO===this.curCommandType?i({type:_.HORIZ_LINE_TO,relative:this.curCommandRelative,x:u}):_.VERT_LINE_TO===this.curCommandType?i({type:_.VERT_LINE_TO,relative:this.curCommandRelative,y:u}):this.curCommandType===_.MOVE_TO||this.curCommandType===_.LINE_TO||this.curCommandType===_.SMOOTH_QUAD_TO?(i({type:this.curCommandType,relative:this.curCommandRelative,x:this.curArgs[0],y:this.curArgs[1]}),_.MOVE_TO===this.curCommandType&&(this.curCommandType=_.LINE_TO)):this.curCommandType===_.CURVE_TO?i({type:_.CURVE_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x2:this.curArgs[2],y2:this.curArgs[3],x:this.curArgs[4],y:this.curArgs[5]}):this.curCommandType===_.SMOOTH_CURVE_TO?i({type:_.SMOOTH_CURVE_TO,relative:this.curCommandRelative,x2:this.curArgs[0],y2:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===_.QUAD_TO?i({type:_.QUAD_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===_.ARC&&i({type:_.ARC,relative:this.curCommandRelative,rX:this.curArgs[0],rY:this.curArgs[1],xRot:this.curArgs[2],lArcFlag:this.curArgs[3],sweepFlag:this.curArgs[4],x:this.curArgs[5],y:this.curArgs[6]})),this.curNumber="",this.curNumberHasExpDigits=!1,this.curNumberHasExp=!1,this.curNumberHasDecimal=!1,this.canParseCommandOrComma=!0}if(!x(n))if(","===n&&this.canParseCommandOrComma)this.canParseCommandOrComma=!1;else if("+"!==n&&"-"!==n&&"."!==n)if(s)this.curNumber=n,this.curNumberHasDecimal=!1;else{if(0!==this.curArgs.length)throw new SyntaxError("Unterminated command at index "+a+".");if(!this.canParseCommandOrComma)throw new SyntaxError('Unexpected character "'+n+'" at index '+a+". Command cannot follow comma");if(this.canParseCommandOrComma=!1,"z"!==n&&"Z"!==n)if("h"===n||"H"===n)this.curCommandType=_.HORIZ_LINE_TO,this.curCommandRelative="h"===n;else if("v"===n||"V"===n)this.curCommandType=_.VERT_LINE_TO,this.curCommandRelative="v"===n;else if("m"===n||"M"===n)this.curCommandType=_.MOVE_TO,this.curCommandRelative="m"===n;else if("l"===n||"L"===n)this.curCommandType=_.LINE_TO,this.curCommandRelative="l"===n;else if("c"===n||"C"===n)this.curCommandType=_.CURVE_TO,this.curCommandRelative="c"===n;else if("s"===n||"S"===n)this.curCommandType=_.SMOOTH_CURVE_TO,this.curCommandRelative="s"===n;else if("q"===n||"Q"===n)this.curCommandType=_.QUAD_TO,this.curCommandRelative="q"===n;else if("t"===n||"T"===n)this.curCommandType=_.SMOOTH_QUAD_TO,this.curCommandRelative="t"===n;else{if("a"!==n&&"A"!==n)throw new SyntaxError('Unexpected character "'+n+'" at index '+a+".");this.curCommandType=_.ARC,this.curCommandRelative="a"===n}else e.push({type:_.CLOSE_PATH}),this.canParseCommandOrComma=!0,this.curCommandType=-1}else this.curNumber=n,this.curNumberHasDecimal="."===n}else this.curNumber+=n,this.curNumberHasDecimal=!0;else this.curNumber+=n;else this.curNumber+=n,this.curNumberHasExp=!0;else this.curNumber+=n,this.curNumberHasExpDigits=this.curNumberHasExp}return e},e.prototype.transform=function(t){return Object.create(this,{parse:{value:function(e,r){void 0===r&&(r=[]);for(var i=0,a=Object.getPrototypeOf(this).parse.call(this,e);i<a.length;i++){var n=a[i],o=t(n);Array.isArray(o)?r.push.apply(r,o):r.push(o)}return r}}})},e}(O),_=function(t){function e(r){var i=t.call(this)||this;return i.commands="string"==typeof r?e.parse(r):r,i}return a(e,t),e.prototype.encode=function(){return e.encode(this.commands)},e.prototype.getBounds=function(){var t=h.CALCULATE_BOUNDS();return this.transform(t),t},e.prototype.transform=function(t){for(var e=[],r=0,i=this.commands;r<i.length;r++){var a=t(i[r]);Array.isArray(a)?e.push.apply(e,a):e.push(a)}return this.commands=e,this},e.encode=function(t){return n(t)},e.parse=function(t){var e=new g,r=[];return e.parse(t,r),e.finish(r),r},e.CLOSE_PATH=1,e.MOVE_TO=2,e.HORIZ_LINE_TO=4,e.VERT_LINE_TO=8,e.LINE_TO=16,e.CURVE_TO=32,e.SMOOTH_CURVE_TO=64,e.QUAD_TO=128,e.SMOOTH_QUAD_TO=256,e.ARC=512,e.LINE_COMMANDS=e.LINE_TO|e.HORIZ_LINE_TO|e.VERT_LINE_TO,e.DRAWING_COMMANDS=e.HORIZ_LINE_TO|e.VERT_LINE_TO|e.LINE_TO|e.CURVE_TO|e.SMOOTH_CURVE_TO|e.QUAD_TO|e.SMOOTH_QUAD_TO|e.ARC,e}(O),N=((y={})[_.MOVE_TO]=2,y[_.LINE_TO]=2,y[_.HORIZ_LINE_TO]=1,y[_.VERT_LINE_TO]=1,y[_.CLOSE_PATH]=0,y[_.QUAD_TO]=4,y[_.SMOOTH_QUAD_TO]=2,y[_.CURVE_TO]=6,y[_.SMOOTH_CURVE_TO]=4,y[_.ARC]=7,y)}}]);
//# sourceMappingURL=937.js.map