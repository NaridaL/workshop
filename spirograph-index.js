"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[878],{4004:(e,t,n)=>{n.d(t,{U:()=>i});var r=n(9526),a=n(2182);function i({from:e,to:t,children:n,hideRight:i=!1,offset:o=0}){Array.isArray(e)&&(e=(0,a.V)(e)),Array.isArray(t)&&(t=(0,a.V)(t));const s=e.to(t),l=s.length();if(l<.05)return null;n||=""+(0,a.At)(l,-1);const c=3*n.length;return r.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${s.angleXY()/a.Co}) translate(0, ${10*o})`,style:{stroke:"#aaa"}},!i&&r.createElement("path",{d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2"}),r.createElement("path",{d:`\n        M0,5\n        H${(l-c)/2}\n        M${(l+c)/2},5\n        H${l}\n        M${l},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`}),r.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:l/2,y:5},n))}},7727:(e,t,n)=>{n.d(t,{G:()=>o});var r=n(9526),a=n(2182),i=n(3671);function o({center:e,start:t,toRel:n,children:o}){Array.isArray(e)&&(e=(0,a.V)(e));const s=a.V3.polar(20,t).plus((0,a.V)(e)),l=a.V3.polar(20,t+n).plus((0,a.V)(e)),c=a.V3.polar(14,t+n/2).plus((0,a.V)(e)),m=Math.abs(n)>Math.PI?"1":"0",u=n>0?"1":"0";return r.createElement("g",null,r.createElement("path",{d:`M${s.x},${s.y} A20,20,0,${m},${u},${l.x},${l.y}`}),r.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:c.x,y:c.y},null!=(d=o)?d:(()=>(0,i.X$)(n))()));var d}},3671:(e,t,n)=>{n.d(t,{PM:()=>i,Qn:()=>l,X$:()=>o,XJ:()=>s,YQ:()=>$,_x:()=>u,hv:()=>d,kC:()=>p,li:()=>g,nl:()=>f,oe:()=>m,q3:()=>c,t1:()=>h});var r=n(9526),a=n(2182);const i=25.4,o=e=>(0,a.At)(e/a.Co,-1)+"°",s=(e,t)=>t/2/Math.sin(a.gc/e/2),l=(e,t)=>2*t*Math.sin(a.gc/e/2),c=(e,t)=>t/2/Math.tan(a.gc/e/2),m=(e,t)=>t/Math.cos(a.gc/e/2),u=(e,t)=>2*t*Math.tan(a.gc/e/2);function d({sides:e,radius:t,startAngle:n=0,sideLength:i,...o}){if(void 0!==i==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=s(e,i));const{x:l,y:c}=a.V3.polar(t,n);return r.createElement("path",{d:f`
        M${l},${c}
        ${(0,a.hS)(0,e).map((r=>f`L${a.V3.polar(t,n+r*(a.gc/e))}`))}Z`,...o})}function p({id:e,children:t,count:n,stepDeg:i}){return r.createElement(r.Fragment,null,r.createElement("g",{id:e},t),(0,a.hS)(0,n-1).map((t=>r.createElement("use",{key:t,href:"#"+e,transform:`rotate(${(t+1)*i} 0 0)`}))))}const g=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]],h=g.find((([,,e])=>e.includes("A4")));function f(e,...t){const n=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(n).join(" "):e.x+","+e.y;let r=e[0];for(let a=0;a<t.length;a++)r+=n(t[a]),r+=e[a+1];return r}const $=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},8012:(e,t,n)=>{n.d(t,{G:()=>s});var r=n(9526),a=n(2182),i=n(3671),o=n(4004);function s({baseRadius:e,topRadius:t,radius:n,print:s=!1,style:l,paperSize:c,children:m}){const u=c&&[Math.min(-20,n-c[0]),Math.min(-20,n-c[1])],d=s?c?[u[0],u[1],c[0],c[1]]:[-n,-n,2*n,2*n]:[-n-10,-n-10,2*n+20,2*n+20],p=t-e,g=n-t;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"none",stroke:"#123456",strokeWidth:2*i.PM/300,...l},width:s?d[2]*(96/i.PM):d[2]+"mm",height:s?d[3]*(96/i.PM):d[3]+"mm",viewBox:d.join(" "),className:"adrian"},r.createElement("style",null,".valley {stroke-dasharray: 1,1;}",".outline {stroke-dasharray: .1,1;}",".mountain {stroke-dasharray: 10,2,1,1,1,2;}"),!s&&r.createElement("g",{transform:"translate(-20 -20) rotate(180)"},r.createElement("path",{d:i.nl`
          M${(0,a.V)(e-g,.99*p)}
          L${(0,a.V)(e,p)}
          L${(0,a.V)(e,0)}
          L${(0,a.V)(-e,0)}
          L${(0,a.V)(-e,p)}
          L${(0,a.V)(g-e,1.01*p)}
          `}),r.createElement(o.U,{from:(0,a.V)(e,0),to:(0,a.V)(-e,0)}),r.createElement(o.U,{from:(0,a.V)(e,p),to:(0,a.V)(e,0)}),r.createElement(o.U,{from:(0,a.V)(g-e,p),to:(0,a.V)(0,p)})),!s&&c&&r.createElement("rect",{x:u[0],y:u[1],width:c[0],height:c[1]}),m)}},8492:(e,t,n)=>{n.d(t,{M1:()=>u,ST:()=>m,pC:()=>c});var r=n(9526),a=n(2182),i=n(3671),o=n(4004),s=n(7727),l=n(8012);function c(e,t,n){return Math.PI/2-t-Math.acos(n/e*Math.sin(t))}function m(e,t,n){return n/Math.cos(e-Math.PI/2+t)/Math.sin(t)}function u(e){const{baseRadius:t,topRadius:n,radius:m,print:u=!1,sides:d}=e,p=(0,i.oe)(d,t),g=(0,i.oe)(d,n),h=a.gc/d/2,f=c(m,h,p);function $(e){return u?{}:{stroke:e}}const x=(0,a.V)(p,0).plus(a.V3.polar(n-t,h)),w=a.V3.X,S=e=>x.plus(w.times(e)),M=S((0,a.zj)((e=>S(e).length()-m),1,4));return r.createElement(l.G,{...e},r.createElement("g",null,r.createElement(i.hv,{radius:p,sides:d,className:"valley"}),!u&&r.createElement(r.Fragment,null,r.createElement(o.U,{offset:-.5,from:[0,0],to:a.V3.polar(t,h)},"baseRadius"),r.createElement(o.U,{offset:-.5,from:a.V3.polar(t,h),to:a.V3.polar(n,h),hideRight:!0},"topRadius"),r.createElement(o.U,{offset:-.5,from:a.V3.polar(n,h),to:a.V3.polar(m,h),hideRight:!0},"radius"),r.createElement(s.G,{center:x,start:Math.PI,toRel:h}),r.createElement(o.U,{from:a.V3.polar(p,-a.gc/d),to:a.V3.polar(p,0)})),r.createElement(i.kC,{id:"foo",count:d,stepDeg:360/d},r.createElement("path",{d:i.nl`
                M${p},0
                H${m}`,className:"mountain",style:$("green")}),r.createElement("path",{d:i.nl`
                M${p},0
                L${a.V3.polar(m,f)}
                M${p},0
                L${x}`,className:"valley",style:$("blue")}),r.createElement("path",{d:i.nl`
                M${x}
                L${a.V3.polar(m,-f)}`,className:"mountain",style:$("blue")}),r.createElement("path",{d:i.nl`
                M${g},0
                L${a.V3.polar(p,-a.gc/d).plus(a.V3.polar(n-t,-a.gc/d/2))}`,className:"valley",style:$("hotpink")}),r.createElement("path",{d:i.nl`
                M${a.V3.polar(p,-a.gc/d).plus(a.V3.polar(n-t,-a.gc/d/2))}
                L${a.V3.polar(g,-a.gc/d)}`,className:"mountain",style:$("orange")}),r.createElement("path",{d:i.nl`
                M${x}
                L${M}`,className:"valley",style:$("red")})),r.createElement("circle",{r:m})))}},294:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var r=n(871),a=n(8051),i=n(9526),o=n(2182),s=n(8492);const l=new class{constructor(e,t){this.radius=e,this.d=t}sideLength(){return 2*(0,s.pC)(this.radius,45*o.Co,this.d)*this.radius}angleForDistance(e){const t=this.sideLength(),n=Math.floor(e/t);let r=e%t;r>t/2&&(r-=t);const a=r/this.radius;return n*o.PI/2+a}radiusForAngle(e){return(e%=o.PI/2)>o.PI/4&&(e-=o.PI/2),(0,s.ST)(e,45*o.Co,this.d)}}(.5,.4),c=function(e,t){const n=(0,s.pC)(2,45*o.Co,1.8),r=2*n*2;return console.log(r,n/o.Co),function(e){Math.floor(e/r);let t=e%r;return t>r/2&&(t-=r),[(0,o.V)(1.8-2,0).plus(o.V3.polar(2,t/2))]}}();function m(e){const t=l.angleForDistance(1.5*e),n=l.radiusForAngle(e/1.5),r=o.V3.polar(1.5-n,e);return[c(e)[0],r.plus(o.V3.polar(-.2,t))]}function u(){const e=(0,i.useRef)(null),t=(0,a.Z)();return(0,i.useEffect)((()=>{const n=e.current;return n.height=devicePixelRatio*n.offsetHeight,n.width=devicePixelRatio*n.offsetWidth,function(e,t){e.lineWidth=.005;const n=Math.min(e.canvas.width,e.canvas.height);e.scale(n,n),e.translate(.5,.5),e.scale(.25,.25);let r=0,a=!1;const i=m(0);return requestAnimationFrame((function n(o){for(;r<o;r+=1){const n=m(r/1e3);for(let r=0;r<i.length;r++){const a=n[r],o=i[r];o.distanceTo(a)>1e-4&&(e.beginPath(),e.strokeStyle=t[r],e.moveTo(o.x,o.y),e.lineTo(a.x,a.y),e.stroke(),i[r]=a)}}!a&&requestAnimationFrame(n)})),()=>{a=!0}}(n.getContext("2d"),[t.palette.primary.main,t.palette.secondary.main,"red","blue","black"])}),[t.palette]),i.createElement(r.ZP,{container:!0,style:{minHeight:"100vh"}},i.createElement(r.ZP,{item:!0,xs:12},i.createElement("canvas",{ref:e,style:{width:"100%",height:"100%"}})))}},871:(e,t,n)=>{n.d(t,{ZP:()=>y});var r=n(1972),a=n(7692),i=n(9526),o=(n(2652),n(3060)),s=n(6006),l=n(8368),c=n(6031),m=n(7014),u=n(7260);const d=i.createContext();var p=n(4969);function g(e){return(0,p.Z)("MuiGrid",e)}const h=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],f=(0,n(2926).Z)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map((e=>`spacing-xs-${e}`)),...["column-reverse","column","row-reverse","row"].map((e=>`direction-xs-${e}`)),...["nowrap","wrap-reverse","wrap"].map((e=>`wrap-xs-${e}`)),...h.map((e=>`grid-xs-${e}`)),...h.map((e=>`grid-sm-${e}`)),...h.map((e=>`grid-md-${e}`)),...h.map((e=>`grid-lg-${e}`)),...h.map((e=>`grid-xl-${e}`))]);var $=n(7557);const x=["className","columns","columnSpacing","component","container","direction","item","lg","md","rowSpacing","sm","spacing","wrap","xl","xs","zeroMinWidth"];function w(e){const t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function S(e,t,n={}){if(!t||!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[n[`spacing-xs-${String(e)}`]||`spacing-xs-${String(e)}`];const{xs:r,sm:a,md:i,lg:o,xl:s}=e;return[Number(r)>0&&(n[`spacing-xs-${String(r)}`]||`spacing-xs-${String(r)}`),Number(a)>0&&(n[`spacing-sm-${String(a)}`]||`spacing-sm-${String(a)}`),Number(i)>0&&(n[`spacing-md-${String(i)}`]||`spacing-md-${String(i)}`),Number(o)>0&&(n[`spacing-lg-${String(o)}`]||`spacing-lg-${String(o)}`),Number(s)>0&&(n[`spacing-xl-${String(s)}`]||`spacing-xl-${String(s)}`)]}const M=(0,m.ZP)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{container:n,direction:r,item:a,lg:i,md:o,sm:s,spacing:l,wrap:c,xl:m,xs:u,zeroMinWidth:d}=e.ownerState;return[t.root,n&&t.container,a&&t.item,d&&t.zeroMinWidth,...S(l,n,t),"row"!==r&&t[`direction-xs-${String(r)}`],"wrap"!==c&&t[`wrap-xs-${String(c)}`],!1!==u&&t[`grid-xs-${String(u)}`],!1!==s&&t[`grid-sm-${String(s)}`],!1!==o&&t[`grid-md-${String(o)}`],!1!==i&&t[`grid-lg-${String(i)}`],!1!==m&&t[`grid-xl-${String(m)}`]]}})((({ownerState:e})=>(0,a.Z)({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},"wrap"!==e.wrap&&{flexWrap:e.wrap})),(function({theme:e,ownerState:t}){const n=(0,s.P$)({values:t.direction,breakpoints:e.breakpoints.values});return(0,s.k9)({theme:e},n,(e=>{const t={flexDirection:e};return 0===e.indexOf("column")&&(t[`& > .${f.item}`]={maxWidth:"none"}),t}))}),(function({theme:e,ownerState:t}){const{container:n,rowSpacing:r}=t;let a={};if(n&&0!==r){const t=(0,s.P$)({values:r,breakpoints:e.breakpoints.values});a=(0,s.k9)({theme:e},t,(t=>{const n=e.spacing(t);return"0px"!==n?{marginTop:`-${w(n)}`,[`& > .${f.item}`]:{paddingTop:w(n)}}:{}}))}return a}),(function({theme:e,ownerState:t}){const{container:n,columnSpacing:r}=t;let a={};if(n&&0!==r){const t=(0,s.P$)({values:r,breakpoints:e.breakpoints.values});a=(0,s.k9)({theme:e},t,(t=>{const n=e.spacing(t);return"0px"!==n?{width:`calc(100% + ${w(n)})`,marginLeft:`-${w(n)}`,[`& > .${f.item}`]:{paddingLeft:w(n)}}:{}}))}return a}),(function({theme:e,ownerState:t}){let n;return e.breakpoints.keys.reduce(((r,i)=>{let o={};if(t[i]&&(n=t[i]),!n)return r;if(!0===n)o={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===n)o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const l=(0,s.P$)({values:t.columns,breakpoints:e.breakpoints.values}),c="object"==typeof l?l[i]:l;if(null==c)return r;const m=Math.round(n/c*1e8)/1e6+"%";let u={};if(t.container&&t.item&&0!==t.columnSpacing){const n=e.spacing(t.columnSpacing);if("0px"!==n){const e=`calc(${m} + ${w(n)})`;u={flexBasis:e,maxWidth:e}}}o=(0,a.Z)({flexBasis:m,flexGrow:0,maxWidth:m},u)}return 0===e.breakpoints.values[i]?Object.assign(r,o):r[e.breakpoints.up(i)]=o,r}),{})})),y=i.forwardRef((function(e,t){const n=(0,u.Z)({props:e,name:"MuiGrid"}),s=(0,l.Z)(n),{className:m,columns:p,columnSpacing:h,component:f="div",container:w=!1,direction:y="row",item:v=!1,lg:V=!1,md:E=!1,rowSpacing:k,sm:b=!1,spacing:A=0,wrap:P="wrap",xl:L=!1,xs:N=!1,zeroMinWidth:W=!1}=s,R=(0,r.Z)(s,x),Z=k||A,C=h||A,z=i.useContext(d),G=w?p||12:z,F=(0,a.Z)({},s,{columns:G,container:w,direction:y,item:v,lg:V,md:E,sm:b,rowSpacing:Z,columnSpacing:C,wrap:P,xl:L,xs:N,zeroMinWidth:W}),I=(e=>{const{classes:t,container:n,direction:r,item:a,lg:i,md:o,sm:s,spacing:l,wrap:m,xl:u,xs:d,zeroMinWidth:p}=e,h={root:["root",n&&"container",a&&"item",p&&"zeroMinWidth",...S(l,n),"row"!==r&&`direction-xs-${String(r)}`,"wrap"!==m&&`wrap-xs-${String(m)}`,!1!==d&&`grid-xs-${String(d)}`,!1!==s&&`grid-sm-${String(s)}`,!1!==o&&`grid-md-${String(o)}`,!1!==i&&`grid-lg-${String(i)}`,!1!==u&&`grid-xl-${String(u)}`]};return(0,c.Z)(h,g,t)})(F);return(0,$.jsx)(d.Provider,{value:G,children:(0,$.jsx)(M,(0,a.Z)({ownerState:F,className:(0,o.Z)(I.root,m),as:f,ref:t},R))})}))}}]);