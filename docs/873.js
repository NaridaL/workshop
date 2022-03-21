/*! For license information please see 873.js.LICENSE.txt */
"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[873],{7445:(e,t,r)=>{r.d(t,{Z:()=>C});var a=r(7692),n=r(9382),i=r(9526),o=(r(2652),r(3060)),s=r(2256),c=r(652),u=r(2746),l=r(562),h=r(9110),m=i.forwardRef((function(e,t){var r=e.autoFocus,l=e.checked,m=e.checkedIcon,p=e.classes,d=e.className,y=e.defaultChecked,v=e.disabled,f=e.icon,O=e.id,T=e.inputProps,_=e.inputRef,N=e.name,x=e.onBlur,E=e.onChange,C=e.onFocus,A=e.readOnly,g=e.required,M=e.tabIndex,R=e.type,b=e.value,I=(0,n.Z)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),S=(0,c.Z)({controlled:l,default:Boolean(y),name:"SwitchBase",state:"checked"}),L=(0,s.Z)(S,2),H=L[0],w=L[1],U=(0,u.Z)(),V=v;U&&void 0===V&&(V=U.disabled);var Z="checkbox"===R||"radio"===R;return i.createElement(h.Z,(0,a.Z)({component:"span",className:(0,o.Z)(p.root,d,H&&p.checked,V&&p.disabled),disabled:V,tabIndex:null,role:void 0,onFocus:function(e){C&&C(e),U&&U.onFocus&&U.onFocus(e)},onBlur:function(e){x&&x(e),U&&U.onBlur&&U.onBlur(e)},ref:t},I),i.createElement("input",(0,a.Z)({autoFocus:r,checked:l,defaultChecked:y,className:p.input,disabled:V,id:Z&&O,name:N,onChange:function(e){var t=e.target.checked;w(t),E&&E(e,t)},readOnly:A,ref:_,required:g,tabIndex:M,type:R,value:b},T)),H?m:f)}));const p=(0,l.Z)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(m);var d=r(1004);const y=(0,d.Z)(i.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),v=(0,d.Z)(i.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox");var f=r(5662);const O=(0,d.Z)(i.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");var T=r(1514),_=i.createElement(v,null),N=i.createElement(y,null),x=i.createElement(O,null),E=i.forwardRef((function(e,t){var r=e.checkedIcon,s=void 0===r?_:r,c=e.classes,u=e.color,l=void 0===u?"secondary":u,h=e.icon,m=void 0===h?N:h,d=e.indeterminate,y=void 0!==d&&d,v=e.indeterminateIcon,f=void 0===v?x:v,O=e.inputProps,E=e.size,C=void 0===E?"medium":E,A=(0,n.Z)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]),g=y?f:m,M=y?f:s;return i.createElement(p,(0,a.Z)({type:"checkbox",classes:{root:(0,o.Z)(c.root,c["color".concat((0,T.Z)(l))],y&&c.indeterminate),checked:c.checked,disabled:c.disabled},color:l,inputProps:(0,a.Z)({"data-indeterminate":y},O),icon:i.cloneElement(g,{fontSize:void 0===g.props.fontSize&&"small"===C?C:g.props.fontSize}),checkedIcon:i.cloneElement(M,{fontSize:void 0===M.props.fontSize&&"small"===C?C:M.props.fontSize}),ref:t},A))}));const C=(0,l.Z)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,f.Fq)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,f.Fq)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(E)},5147:(e,t,r)=>{r.d(t,{Z:()=>m});var a=r(7692),n=r(9382),i=r(9526),o=(r(2652),r(3060)),s=r(2746),c=r(562),u=r(2248),l=r(1514),h=i.forwardRef((function(e,t){e.checked;var r=e.classes,c=e.className,h=e.control,m=e.disabled,p=(e.inputRef,e.label),d=e.labelPlacement,y=void 0===d?"end":d,v=(e.name,e.onChange,e.value,(0,n.Z)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),f=(0,s.Z)(),O=m;void 0===O&&void 0!==h.props.disabled&&(O=h.props.disabled),void 0===O&&f&&(O=f.disabled);var T={disabled:O};return["checked","name","onChange","value","inputRef"].forEach((function(t){void 0===h.props[t]&&void 0!==e[t]&&(T[t]=e[t])})),i.createElement("label",(0,a.Z)({className:(0,o.Z)(r.root,c,"end"!==y&&r["labelPlacement".concat((0,l.Z)(y))],O&&r.disabled),ref:t},v),i.cloneElement(h,T),i.createElement(u.Z,{component:"span",className:(0,o.Z)(r.label,O&&r.disabled)},p))}));const m=(0,c.Z)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(h)},6279:(e,t,r)=>{r.d(t,{Z:()=>h});var a=r(7692),n=r(9382),i=r(9526),o=(r(2652),r(3060)),s=r(2248),c=r(562),u=r(6647),l=i.forwardRef((function(e,t){var r=e.children,c=e.classes,l=e.className,h=e.component,m=void 0===h?"div":h,p=e.disablePointerEvents,d=void 0!==p&&p,y=e.disableTypography,v=void 0!==y&&y,f=e.position,O=e.variant,T=(0,n.Z)(e,["children","classes","className","component","disablePointerEvents","disableTypography","position","variant"]),_=(0,u.Y)()||{},N=O;return O&&_.variant,_&&!N&&(N=_.variant),i.createElement(u.Z.Provider,{value:null},i.createElement(m,(0,a.Z)({className:(0,o.Z)(c.root,l,"end"===f?c.positionEnd:c.positionStart,d&&c.disablePointerEvents,_.hiddenLabel&&c.hiddenLabel,"filled"===N&&c.filled,"dense"===_.margin&&c.marginDense),ref:t},T),"string"!=typeof r||v?r:i.createElement(s.Z,{color:"textSecondary"},r)))}));const h=(0,c.Z)({root:{display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap"},filled:{"&$positionStart:not($hiddenLabel)":{marginTop:16}},positionStart:{marginRight:8},positionEnd:{marginLeft:8},disablePointerEvents:{pointerEvents:"none"},hiddenLabel:{},marginDense:{}},{name:"MuiInputAdornment"})(l)},3680:(e,t,r)=>{var a=r(9736),n=r(3805);t.Z=void 0;var i=n(r(9526)),o=(0,a(r(2265)).default)(i.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");t.Z=o},9896:(e,t,r)=>{var a=r(9736),n=r(3805);t.Z=void 0;var i=n(r(9526)),o=(0,a(r(2265)).default)(i.createElement("path",{d:"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"}),"LockOpen");t.Z=o},4065:(e,t,r)=>{r.d(t,{OU:()=>x,QI:()=>i});var a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}function i(e){var t="";Array.isArray(e)||(e=[e]);for(var r=0;r<e.length;r++){var a=e[r];if(a.type===x.CLOSE_PATH)t+="z";else if(a.type===x.HORIZ_LINE_TO)t+=(a.relative?"h":"H")+a.x;else if(a.type===x.VERT_LINE_TO)t+=(a.relative?"v":"V")+a.y;else if(a.type===x.MOVE_TO)t+=(a.relative?"m":"M")+a.x+" "+a.y;else if(a.type===x.LINE_TO)t+=(a.relative?"l":"L")+a.x+" "+a.y;else if(a.type===x.CURVE_TO)t+=(a.relative?"c":"C")+a.x1+" "+a.y1+" "+a.x2+" "+a.y2+" "+a.x+" "+a.y;else if(a.type===x.SMOOTH_CURVE_TO)t+=(a.relative?"s":"S")+a.x2+" "+a.y2+" "+a.x+" "+a.y;else if(a.type===x.QUAD_TO)t+=(a.relative?"q":"Q")+a.x1+" "+a.y1+" "+a.x+" "+a.y;else if(a.type===x.SMOOTH_QUAD_TO)t+=(a.relative?"t":"T")+a.x+" "+a.y;else{if(a.type!==x.ARC)throw new Error('Unexpected command type "'+a.type+'" at index '+r+".");t+=(a.relative?"a":"A")+a.rX+" "+a.rY+" "+a.xRot+" "+ +a.lArcFlag+" "+ +a.sweepFlag+" "+a.x+" "+a.y}}return t}function o(e,t){var r=e[0],a=e[1];return[r*Math.cos(t)-a*Math.sin(t),r*Math.sin(t)+a*Math.cos(t)]}function s(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var r=0;r<e.length;r++)if("number"!=typeof e[r])throw new Error("assertNumbers arguments["+r+"] is not a number. "+typeof e[r]+" == typeof "+e[r]);return!0}var c=Math.PI;function u(e,t,r){e.lArcFlag=0===e.lArcFlag?0:1,e.sweepFlag=0===e.sweepFlag?0:1;var a=e.rX,n=e.rY,i=e.x,s=e.y;a=Math.abs(e.rX),n=Math.abs(e.rY);var u=o([(t-i)/2,(r-s)/2],-e.xRot/180*c),l=u[0],h=u[1],m=Math.pow(l,2)/Math.pow(a,2)+Math.pow(h,2)/Math.pow(n,2);1<m&&(a*=Math.sqrt(m),n*=Math.sqrt(m)),e.rX=a,e.rY=n;var p=Math.pow(a,2)*Math.pow(h,2)+Math.pow(n,2)*Math.pow(l,2),d=(e.lArcFlag!==e.sweepFlag?1:-1)*Math.sqrt(Math.max(0,(Math.pow(a,2)*Math.pow(n,2)-p)/p)),y=a*h/n*d,v=-n*l/a*d,f=o([y,v],e.xRot/180*c);e.cX=f[0]+(t+i)/2,e.cY=f[1]+(r+s)/2,e.phi1=Math.atan2((h-v)/n,(l-y)/a),e.phi2=Math.atan2((-h-v)/n,(-l-y)/a),0===e.sweepFlag&&e.phi2>e.phi1&&(e.phi2-=2*c),1===e.sweepFlag&&e.phi2<e.phi1&&(e.phi2+=2*c),e.phi1*=180/c,e.phi2*=180/c}function l(e,t,r){s(e,t,r);var a=e*e+t*t-r*r;if(0>a)return[];if(0===a)return[[e*r/(e*e+t*t),t*r/(e*e+t*t)]];var n=Math.sqrt(a);return[[(e*r+t*n)/(e*e+t*t),(t*r-e*n)/(e*e+t*t)],[(e*r-t*n)/(e*e+t*t),(t*r+e*n)/(e*e+t*t)]]}var h,m=Math.PI/180;function p(e,t,r){return(1-r)*e+r*t}function d(e,t,r,a){return e+Math.cos(a/180*c)*t+Math.sin(a/180*c)*r}function y(e,t,r,a){var n=1e-6,i=t-e,o=r-t,s=3*i+3*(a-r)-6*o,c=6*(o-i),u=3*i;return Math.abs(s)<n?[-u/c]:function(e,t,r){void 0===r&&(r=1e-6);var a=e*e/4-t;if(a<-r)return[];if(a<=r)return[-e/2];var n=Math.sqrt(a);return[-e/2-n,-e/2+n]}(c/s,u/s,n)}function v(e,t,r,a,n){var i=1-n;return e*(i*i*i)+t*(3*i*i*n)+r*(3*i*n*n)+a*(n*n*n)}!function(e){function t(){return n((function(e,t,r){return e.relative&&(void 0!==e.x1&&(e.x1+=t),void 0!==e.y1&&(e.y1+=r),void 0!==e.x2&&(e.x2+=t),void 0!==e.y2&&(e.y2+=r),void 0!==e.x&&(e.x+=t),void 0!==e.y&&(e.y+=r),e.relative=!1),e}))}function r(){var e=NaN,t=NaN,r=NaN,a=NaN;return n((function(n,i,o){return n.type&x.SMOOTH_CURVE_TO&&(n.type=x.CURVE_TO,e=isNaN(e)?i:e,t=isNaN(t)?o:t,n.x1=n.relative?i-e:2*i-e,n.y1=n.relative?o-t:2*o-t),n.type&x.CURVE_TO?(e=n.relative?i+n.x2:n.x2,t=n.relative?o+n.y2:n.y2):(e=NaN,t=NaN),n.type&x.SMOOTH_QUAD_TO&&(n.type=x.QUAD_TO,r=isNaN(r)?i:r,a=isNaN(a)?o:a,n.x1=n.relative?i-r:2*i-r,n.y1=n.relative?o-a:2*o-a),n.type&x.QUAD_TO?(r=n.relative?i+n.x1:n.x1,a=n.relative?o+n.y1:n.y1):(r=NaN,a=NaN),n}))}function a(){var e=NaN,t=NaN;return n((function(r,a,n){if(r.type&x.SMOOTH_QUAD_TO&&(r.type=x.QUAD_TO,e=isNaN(e)?a:e,t=isNaN(t)?n:t,r.x1=r.relative?a-e:2*a-e,r.y1=r.relative?n-t:2*n-t),r.type&x.QUAD_TO){e=r.relative?a+r.x1:r.x1,t=r.relative?n+r.y1:r.y1;var i=r.x1,o=r.y1;r.type=x.CURVE_TO,r.x1=((r.relative?0:a)+2*i)/3,r.y1=((r.relative?0:n)+2*o)/3,r.x2=(r.x+2*i)/3,r.y2=(r.y+2*o)/3}else e=NaN,t=NaN;return r}))}function n(e){var t=0,r=0,a=NaN,n=NaN;return function(i){if(isNaN(a)&&!(i.type&x.MOVE_TO))throw new Error("path must start with moveto");var o=e(i,t,r,a,n);return i.type&x.CLOSE_PATH&&(t=a,r=n),void 0!==i.x&&(t=i.relative?t+i.x:i.x),void 0!==i.y&&(r=i.relative?r+i.y:i.y),i.type&x.MOVE_TO&&(a=t,n=r),o}}function i(e,t,r,a,i,o){return s(e,t,r,a,i,o),n((function(n,s,c,u){var l=n.x1,h=n.x2,m=n.relative&&!isNaN(u),p=void 0!==n.x?n.x:m?0:s,d=void 0!==n.y?n.y:m?0:c;function y(e){return e*e}n.type&x.HORIZ_LINE_TO&&0!==t&&(n.type=x.LINE_TO,n.y=n.relative?0:c),n.type&x.VERT_LINE_TO&&0!==r&&(n.type=x.LINE_TO,n.x=n.relative?0:s),void 0!==n.x&&(n.x=n.x*e+d*r+(m?0:i)),void 0!==n.y&&(n.y=p*t+n.y*a+(m?0:o)),void 0!==n.x1&&(n.x1=n.x1*e+n.y1*r+(m?0:i)),void 0!==n.y1&&(n.y1=l*t+n.y1*a+(m?0:o)),void 0!==n.x2&&(n.x2=n.x2*e+n.y2*r+(m?0:i)),void 0!==n.y2&&(n.y2=h*t+n.y2*a+(m?0:o));var v=e*a-t*r;if(void 0!==n.xRot&&(1!==e||0!==t||0!==r||1!==a))if(0===v)delete n.rX,delete n.rY,delete n.xRot,delete n.lArcFlag,delete n.sweepFlag,n.type=x.LINE_TO;else{var f=n.xRot*Math.PI/180,O=Math.sin(f),T=Math.cos(f),_=1/y(n.rX),N=1/y(n.rY),E=y(T)*_+y(O)*N,C=2*O*T*(_-N),A=y(O)*_+y(T)*N,g=E*a*a-C*t*a+A*t*t,M=C*(e*a+t*r)-2*(E*r*a+A*e*t),R=E*r*r-C*e*r+A*e*e,b=(Math.atan2(M,g-R)+Math.PI)%Math.PI/2,I=Math.sin(b),S=Math.cos(b);n.rX=Math.abs(v)/Math.sqrt(g*y(S)+M*I*S+R*y(I)),n.rY=Math.abs(v)/Math.sqrt(g*y(I)-M*I*S+R*y(S)),n.xRot=180*b/Math.PI}return void 0!==n.sweepFlag&&0>v&&(n.sweepFlag=+!n.sweepFlag),n}))}e.ROUND=function(e){function t(t){return Math.round(t*e)/e}return void 0===e&&(e=1e13),s(e),function(e){return void 0!==e.x1&&(e.x1=t(e.x1)),void 0!==e.y1&&(e.y1=t(e.y1)),void 0!==e.x2&&(e.x2=t(e.x2)),void 0!==e.y2&&(e.y2=t(e.y2)),void 0!==e.x&&(e.x=t(e.x)),void 0!==e.y&&(e.y=t(e.y)),void 0!==e.rX&&(e.rX=t(e.rX)),void 0!==e.rY&&(e.rY=t(e.rY)),e}},e.TO_ABS=t,e.TO_REL=function(){return n((function(e,t,r){return e.relative||(void 0!==e.x1&&(e.x1-=t),void 0!==e.y1&&(e.y1-=r),void 0!==e.x2&&(e.x2-=t),void 0!==e.y2&&(e.y2-=r),void 0!==e.x&&(e.x-=t),void 0!==e.y&&(e.y-=r),e.relative=!0),e}))},e.NORMALIZE_HVZ=function(e,t,r){return void 0===e&&(e=!0),void 0===t&&(t=!0),void 0===r&&(r=!0),n((function(a,n,i,o,s){if(isNaN(o)&&!(a.type&x.MOVE_TO))throw new Error("path must start with moveto");return t&&a.type&x.HORIZ_LINE_TO&&(a.type=x.LINE_TO,a.y=a.relative?0:i),r&&a.type&x.VERT_LINE_TO&&(a.type=x.LINE_TO,a.x=a.relative?0:n),e&&a.type&x.CLOSE_PATH&&(a.type=x.LINE_TO,a.x=a.relative?o-n:o,a.y=a.relative?s-i:s),a.type&x.ARC&&(0===a.rX||0===a.rY)&&(a.type=x.LINE_TO,delete a.rX,delete a.rY,delete a.xRot,delete a.lArcFlag,delete a.sweepFlag),a}))},e.NORMALIZE_ST=r,e.QT_TO_C=a,e.INFO=n,e.SANITIZE=function(e){void 0===e&&(e=0),s(e);var t=NaN,r=NaN,a=NaN,i=NaN;return n((function(n,o,s,c,u){var l=Math.abs,h=!1,m=0,p=0;if(n.type&x.SMOOTH_CURVE_TO&&(m=isNaN(t)?0:o-t,p=isNaN(r)?0:s-r),n.type&(x.CURVE_TO|x.SMOOTH_CURVE_TO)?(t=n.relative?o+n.x2:n.x2,r=n.relative?s+n.y2:n.y2):(t=NaN,r=NaN),n.type&x.SMOOTH_QUAD_TO?(a=isNaN(a)?o:2*o-a,i=isNaN(i)?s:2*s-i):n.type&x.QUAD_TO?(a=n.relative?o+n.x1:n.x1,i=n.relative?s+n.y1:n.y2):(a=NaN,i=NaN),n.type&x.LINE_COMMANDS||n.type&x.ARC&&(0===n.rX||0===n.rY||!n.lArcFlag)||n.type&x.CURVE_TO||n.type&x.SMOOTH_CURVE_TO||n.type&x.QUAD_TO||n.type&x.SMOOTH_QUAD_TO){var d=void 0===n.x?0:n.relative?n.x:n.x-o,y=void 0===n.y?0:n.relative?n.y:n.y-s;m=isNaN(a)?void 0===n.x1?m:n.relative?n.x:n.x1-o:a-o,p=isNaN(i)?void 0===n.y1?p:n.relative?n.y:n.y1-s:i-s;var v=void 0===n.x2?0:n.relative?n.x:n.x2-o,f=void 0===n.y2?0:n.relative?n.y:n.y2-s;l(d)<=e&&l(y)<=e&&l(m)<=e&&l(p)<=e&&l(v)<=e&&l(f)<=e&&(h=!0)}return n.type&x.CLOSE_PATH&&l(o-c)<=e&&l(s-u)<=e&&(h=!0),h?[]:n}))},e.MATRIX=i,e.ROTATE=function(e,t,r){void 0===t&&(t=0),void 0===r&&(r=0),s(e,t,r);var a=Math.sin(e),n=Math.cos(e);return i(n,a,-a,n,t-t*n+r*a,r-t*a-r*n)},e.TRANSLATE=function(e,t){return void 0===t&&(t=0),s(e,t),i(1,0,0,1,e,t)},e.SCALE=function(e,t){return void 0===t&&(t=e),s(e,t),i(e,0,0,t,0,0)},e.SKEW_X=function(e){return s(e),i(1,0,Math.atan(e),1,0,0)},e.SKEW_Y=function(e){return s(e),i(1,Math.atan(e),0,1,0,0)},e.X_AXIS_SYMMETRY=function(e){return void 0===e&&(e=0),s(e),i(-1,0,0,1,e,0)},e.Y_AXIS_SYMMETRY=function(e){return void 0===e&&(e=0),s(e),i(1,0,0,-1,0,e)},e.A_TO_C=function(){return n((function(e,t,r){return x.ARC===e.type?function(e,t,r){var a,n,i,s;e.cX||u(e,t,r);for(var c=Math.min(e.phi1,e.phi2),l=Math.max(e.phi1,e.phi2)-c,h=Math.ceil(l/90),d=new Array(h),y=t,v=r,f=0;f<h;f++){var O=p(e.phi1,e.phi2,f/h),T=p(e.phi1,e.phi2,(f+1)/h),_=T-O,N=4/3*Math.tan(_*m/4),E=[Math.cos(O*m)-N*Math.sin(O*m),Math.sin(O*m)+N*Math.cos(O*m)],C=E[0],A=E[1],g=[Math.cos(T*m),Math.sin(T*m)],M=g[0],R=g[1],b=[M+N*Math.sin(T*m),R-N*Math.cos(T*m)],I=b[0],S=b[1];d[f]={relative:e.relative,type:x.CURVE_TO};var L=function(t,r){var a=o([t*e.rX,r*e.rY],e.xRot),n=a[0],i=a[1];return[e.cX+n,e.cY+i]};a=L(C,A),d[f].x1=a[0],d[f].y1=a[1],n=L(I,S),d[f].x2=n[0],d[f].y2=n[1],i=L(M,R),d[f].x=i[0],d[f].y=i[1],e.relative&&(d[f].x1-=y,d[f].y1-=v,d[f].x2-=y,d[f].y2-=v,d[f].x-=y,d[f].y-=v),y=(s=[d[f].x,d[f].y])[0],v=s[1]}return d}(e,e.relative?0:t,e.relative?0:r):e}))},e.ANNOTATE_ARCS=function(){return n((function(e,t,r){return e.relative&&(t=0,r=0),x.ARC===e.type&&u(e,t,r),e}))},e.CLONE=function(){return function(e){var t={};for(var r in e)t[r]=e[r];return t}},e.CALCULATE_BOUNDS=function(){var e=t(),i=a(),o=r(),s=n((function(t,r,a){var n=o(i(e(function(e){var t={};for(var r in e)t[r]=e[r];return t}(t))));function c(e){e>s.maxX&&(s.maxX=e),e<s.minX&&(s.minX=e)}function h(e){e>s.maxY&&(s.maxY=e),e<s.minY&&(s.minY=e)}if(n.type&x.DRAWING_COMMANDS&&(c(r),h(a)),n.type&x.HORIZ_LINE_TO&&c(n.x),n.type&x.VERT_LINE_TO&&h(n.y),n.type&x.LINE_TO&&(c(n.x),h(n.y)),n.type&x.CURVE_TO){c(n.x),h(n.y);for(var m=0,p=y(r,n.x1,n.x2,n.x);m<p.length;m++)0<(H=p[m])&&1>H&&c(v(r,n.x1,n.x2,n.x,H));for(var f=0,O=y(a,n.y1,n.y2,n.y);f<O.length;f++)0<(H=O[f])&&1>H&&h(v(a,n.y1,n.y2,n.y,H))}if(n.type&x.ARC){c(n.x),h(n.y),u(n,r,a);for(var T=n.xRot/180*Math.PI,_=Math.cos(T)*n.rX,N=Math.sin(T)*n.rX,E=-Math.sin(T)*n.rY,C=Math.cos(T)*n.rY,A=n.phi1<n.phi2?[n.phi1,n.phi2]:-180>n.phi2?[n.phi2+360,n.phi1+360]:[n.phi2,n.phi1],g=A[0],M=A[1],R=function(e){var t=e[0],r=e[1],a=180*Math.atan2(r,t)/Math.PI;return a<g?a+360:a},b=0,I=l(E,-_,0).map(R);b<I.length;b++)(H=I[b])>g&&H<M&&c(d(n.cX,_,E,H));for(var S=0,L=l(C,-N,0).map(R);S<L.length;S++){var H;(H=L[S])>g&&H<M&&h(d(n.cY,N,C,H))}}return t}));return s.minX=1/0,s.maxX=-1/0,s.minY=1/0,s.maxY=-1/0,s}}(h||(h={}));var f,O=function(){function e(){}return e.prototype.round=function(e){return this.transform(h.ROUND(e))},e.prototype.toAbs=function(){return this.transform(h.TO_ABS())},e.prototype.toRel=function(){return this.transform(h.TO_REL())},e.prototype.normalizeHVZ=function(e,t,r){return this.transform(h.NORMALIZE_HVZ(e,t,r))},e.prototype.normalizeST=function(){return this.transform(h.NORMALIZE_ST())},e.prototype.qtToC=function(){return this.transform(h.QT_TO_C())},e.prototype.aToC=function(){return this.transform(h.A_TO_C())},e.prototype.sanitize=function(e){return this.transform(h.SANITIZE(e))},e.prototype.translate=function(e,t){return this.transform(h.TRANSLATE(e,t))},e.prototype.scale=function(e,t){return this.transform(h.SCALE(e,t))},e.prototype.rotate=function(e,t,r){return this.transform(h.ROTATE(e,t,r))},e.prototype.matrix=function(e,t,r,a,n,i){return this.transform(h.MATRIX(e,t,r,a,n,i))},e.prototype.skewX=function(e){return this.transform(h.SKEW_X(e))},e.prototype.skewY=function(e){return this.transform(h.SKEW_Y(e))},e.prototype.xSymmetry=function(e){return this.transform(h.X_AXIS_SYMMETRY(e))},e.prototype.ySymmetry=function(e){return this.transform(h.Y_AXIS_SYMMETRY(e))},e.prototype.annotateArcs=function(){return this.transform(h.ANNOTATE_ARCS())},e}(),T=function(e){return" "===e||"\t"===e||"\r"===e||"\n"===e},_=function(e){return"0".charCodeAt(0)<=e.charCodeAt(0)&&e.charCodeAt(0)<="9".charCodeAt(0)},N=function(e){function t(){var t=e.call(this)||this;return t.curNumber="",t.curCommandType=-1,t.curCommandRelative=!1,t.canParseCommandOrComma=!0,t.curNumberHasExp=!1,t.curNumberHasExpDigits=!1,t.curNumberHasDecimal=!1,t.curArgs=[],t}return n(t,e),t.prototype.finish=function(e){if(void 0===e&&(e=[]),this.parse(" ",e),0!==this.curArgs.length||!this.canParseCommandOrComma)throw new SyntaxError("Unterminated command at the path end.");return e},t.prototype.parse=function(e,t){var r=this;void 0===t&&(t=[]);for(var a=function(e){t.push(e),r.curArgs.length=0,r.canParseCommandOrComma=!0},n=0;n<e.length;n++){var i=e[n],o=!(this.curCommandType!==x.ARC||3!==this.curArgs.length&&4!==this.curArgs.length||1!==this.curNumber.length||"0"!==this.curNumber&&"1"!==this.curNumber),s=_(i)&&("0"===this.curNumber&&"0"===i||o);if(!_(i)||s)if("e"!==i&&"E"!==i)if("-"!==i&&"+"!==i||!this.curNumberHasExp||this.curNumberHasExpDigits)if("."!==i||this.curNumberHasExp||this.curNumberHasDecimal||o){if(this.curNumber&&-1!==this.curCommandType){var c=Number(this.curNumber);if(isNaN(c))throw new SyntaxError("Invalid number ending at "+n);if(this.curCommandType===x.ARC)if(0===this.curArgs.length||1===this.curArgs.length){if(0>c)throw new SyntaxError('Expected positive number, got "'+c+'" at index "'+n+'"')}else if((3===this.curArgs.length||4===this.curArgs.length)&&"0"!==this.curNumber&&"1"!==this.curNumber)throw new SyntaxError('Expected a flag, got "'+this.curNumber+'" at index "'+n+'"');this.curArgs.push(c),this.curArgs.length===E[this.curCommandType]&&(x.HORIZ_LINE_TO===this.curCommandType?a({type:x.HORIZ_LINE_TO,relative:this.curCommandRelative,x:c}):x.VERT_LINE_TO===this.curCommandType?a({type:x.VERT_LINE_TO,relative:this.curCommandRelative,y:c}):this.curCommandType===x.MOVE_TO||this.curCommandType===x.LINE_TO||this.curCommandType===x.SMOOTH_QUAD_TO?(a({type:this.curCommandType,relative:this.curCommandRelative,x:this.curArgs[0],y:this.curArgs[1]}),x.MOVE_TO===this.curCommandType&&(this.curCommandType=x.LINE_TO)):this.curCommandType===x.CURVE_TO?a({type:x.CURVE_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x2:this.curArgs[2],y2:this.curArgs[3],x:this.curArgs[4],y:this.curArgs[5]}):this.curCommandType===x.SMOOTH_CURVE_TO?a({type:x.SMOOTH_CURVE_TO,relative:this.curCommandRelative,x2:this.curArgs[0],y2:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===x.QUAD_TO?a({type:x.QUAD_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===x.ARC&&a({type:x.ARC,relative:this.curCommandRelative,rX:this.curArgs[0],rY:this.curArgs[1],xRot:this.curArgs[2],lArcFlag:this.curArgs[3],sweepFlag:this.curArgs[4],x:this.curArgs[5],y:this.curArgs[6]})),this.curNumber="",this.curNumberHasExpDigits=!1,this.curNumberHasExp=!1,this.curNumberHasDecimal=!1,this.canParseCommandOrComma=!0}if(!T(i))if(","===i&&this.canParseCommandOrComma)this.canParseCommandOrComma=!1;else if("+"!==i&&"-"!==i&&"."!==i)if(s)this.curNumber=i,this.curNumberHasDecimal=!1;else{if(0!==this.curArgs.length)throw new SyntaxError("Unterminated command at index "+n+".");if(!this.canParseCommandOrComma)throw new SyntaxError('Unexpected character "'+i+'" at index '+n+". Command cannot follow comma");if(this.canParseCommandOrComma=!1,"z"!==i&&"Z"!==i)if("h"===i||"H"===i)this.curCommandType=x.HORIZ_LINE_TO,this.curCommandRelative="h"===i;else if("v"===i||"V"===i)this.curCommandType=x.VERT_LINE_TO,this.curCommandRelative="v"===i;else if("m"===i||"M"===i)this.curCommandType=x.MOVE_TO,this.curCommandRelative="m"===i;else if("l"===i||"L"===i)this.curCommandType=x.LINE_TO,this.curCommandRelative="l"===i;else if("c"===i||"C"===i)this.curCommandType=x.CURVE_TO,this.curCommandRelative="c"===i;else if("s"===i||"S"===i)this.curCommandType=x.SMOOTH_CURVE_TO,this.curCommandRelative="s"===i;else if("q"===i||"Q"===i)this.curCommandType=x.QUAD_TO,this.curCommandRelative="q"===i;else if("t"===i||"T"===i)this.curCommandType=x.SMOOTH_QUAD_TO,this.curCommandRelative="t"===i;else{if("a"!==i&&"A"!==i)throw new SyntaxError('Unexpected character "'+i+'" at index '+n+".");this.curCommandType=x.ARC,this.curCommandRelative="a"===i}else t.push({type:x.CLOSE_PATH}),this.canParseCommandOrComma=!0,this.curCommandType=-1}else this.curNumber=i,this.curNumberHasDecimal="."===i}else this.curNumber+=i,this.curNumberHasDecimal=!0;else this.curNumber+=i;else this.curNumber+=i,this.curNumberHasExp=!0;else this.curNumber+=i,this.curNumberHasExpDigits=this.curNumberHasExp}return t},t.prototype.transform=function(e){return Object.create(this,{parse:{value:function(t,r){void 0===r&&(r=[]);for(var a=0,n=Object.getPrototypeOf(this).parse.call(this,t);a<n.length;a++){var i=n[a],o=e(i);Array.isArray(o)?r.push.apply(r,o):r.push(o)}return r}}})},t}(O),x=function(e){function t(r){var a=e.call(this)||this;return a.commands="string"==typeof r?t.parse(r):r,a}return n(t,e),t.prototype.encode=function(){return t.encode(this.commands)},t.prototype.getBounds=function(){var e=h.CALCULATE_BOUNDS();return this.transform(e),e},t.prototype.transform=function(e){for(var t=[],r=0,a=this.commands;r<a.length;r++){var n=e(a[r]);Array.isArray(n)?t.push.apply(t,n):t.push(n)}return this.commands=t,this},t.encode=function(e){return i(e)},t.parse=function(e){var t=new N,r=[];return t.parse(e,r),t.finish(r),r},t.CLOSE_PATH=1,t.MOVE_TO=2,t.HORIZ_LINE_TO=4,t.VERT_LINE_TO=8,t.LINE_TO=16,t.CURVE_TO=32,t.SMOOTH_CURVE_TO=64,t.QUAD_TO=128,t.SMOOTH_QUAD_TO=256,t.ARC=512,t.LINE_COMMANDS=t.LINE_TO|t.HORIZ_LINE_TO|t.VERT_LINE_TO,t.DRAWING_COMMANDS=t.HORIZ_LINE_TO|t.VERT_LINE_TO|t.LINE_TO|t.CURVE_TO|t.SMOOTH_CURVE_TO|t.QUAD_TO|t.SMOOTH_QUAD_TO|t.ARC,t}(O),E=((f={})[x.MOVE_TO]=2,f[x.LINE_TO]=2,f[x.HORIZ_LINE_TO]=1,f[x.VERT_LINE_TO]=1,f[x.CLOSE_PATH]=0,f[x.QUAD_TO]=4,f[x.SMOOTH_QUAD_TO]=2,f[x.CURVE_TO]=6,f[x.SMOOTH_CURVE_TO]=4,f[x.ARC]=7,f)}}]);