(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[878],{4004:(e,t,n)=>{"use strict";n.d(t,{U:()=>i});var r=n(9526),s=n(2182);const a="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\Measure.tsx";function i({from:e,to:t,children:n,hideRight:i=!1,offset:l=0}){Array.isArray(e)&&(e=(0,s.V)(e)),Array.isArray(t)&&(t=(0,s.V)(t));const o=e.to(t),c=o.length();if(c<.05)return null;n||=""+(0,s.At)(c,-1);const m=3*n.length;return r.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${o.angleXY()/s.Co}) translate(0, ${10*l})`,style:{stroke:"#aaa"},__self:this,__source:{fileName:a,lineNumber:27}},!i&&r.createElement("path",{d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2",__self:this,__source:{fileName:a,lineNumber:34}}),r.createElement("path",{d:`\n        M0,5\n        H${(c-m)/2}\n        M${(c+m)/2},5\n        H${c}\n        M${c},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`,__self:this,__source:{fileName:a,lineNumber:42}}),r.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:c/2,y:5,__self:this,__source:{fileName:a,lineNumber:54}},n))}},7727:(e,t,n)=>{"use strict";n.d(t,{G:()=>l});var r=n(9526),s=n(2182),a=n(3671);const i="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\MeasureAngle.tsx";function l({center:e,start:t,toRel:n,children:l}){Array.isArray(e)&&(e=(0,s.V)(e));const o=s.V3.polar(20,t).plus((0,s.V)(e)),c=s.V3.polar(20,t+n).plus((0,s.V)(e)),m=s.V3.polar(14,t+n/2).plus((0,s.V)(e)),u=Math.abs(n)>Math.PI?"1":"0",f=n>0?"1":"0";return r.createElement("g",{__self:this,__source:{fileName:i,lineNumber:25}},r.createElement("path",{d:`M${o.x},${o.y} A20,20,0,${u},${f},${c.x},${c.y}`,__self:this,__source:{fileName:i,lineNumber:26}}),r.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:m.x,y:m.y,__self:this,__source:{fileName:i,lineNumber:29}},null!=(d=l)?d:(()=>(0,a.X$)(n))()));var d}},3671:(e,t,n)=>{"use strict";n.d(t,{PM:()=>i,X$:()=>l,XJ:()=>o,q3:()=>c,oe:()=>m,hv:()=>u,kC:()=>f,li:()=>d,t1:()=>h,nl:()=>_,YQ:()=>p});var r=n(9526),s=n(2182);const a="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\common.tsx",i=25.4,l=e=>(0,s.At)(e/s.Co,-1)+"°",o=(e,t)=>t/2/Math.sin(s.gc/e/2),c=(e,t)=>t/2/Math.tan(s.gc/e/2),m=(e,t)=>t/Math.cos(s.gc/e/2);function u({sides:e,radius:t,startAngle:n=0,...i}){const{x:l,y:o}=s.V3.polar(t,n);return r.createElement("path",{d:_`
        M${l},${o}
        ${(0,s.hS)(0,e).map((r=>_`L${s.V3.polar(t,n+r*(s.gc/e))}`))}Z`,...i,__self:this,__source:{fileName:a,lineNumber:38}})}function f({id:e,children:t,count:n,stepDeg:i}){return r.createElement(r.Fragment,null,r.createElement("g",{id:e,__self:this,__source:{fileName:a,lineNumber:62}},t),(0,s.hS)(0,n-1).map((t=>r.createElement("use",{key:t,href:"#"+e,transform:`rotate(${(t+1)*i} 0 0)`,__self:this,__source:{fileName:a,lineNumber:64}}))))}const d=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]],h=d.find((([,,e])=>e.includes("A4")));function _(e,...t){const n=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(n).join(" "):e.x+","+e.y;let r=e[0];for(let s=0;s<t.length;s++)r+=n(t[s]),r+=e[s+1];return r}const p=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},8012:(e,t,n)=>{"use strict";n.d(t,{G:()=>o});var r=n(9526),s=n(2182),a=n(3671),i=n(4004);const l="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox2\\Common.tsx";function o({baseRadius:e,topRadius:t,radius:n,print:o=!1,style:c,paperSize:m,children:u}){const f=m&&[Math.min(-20,n-m[0]),Math.min(-20,n-m[1])],d=o?m?[f[0],f[1],m[0],m[1]]:[-n,-n,2*n,2*n]:[-n-10,-n-10,2*n+20,2*n+20],h=t-e,_=n-t;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"none",stroke:"#123456",strokeWidth:2*a.PM/300,...c},width:o?d[2]*(96/a.PM):d[2]+"mm",height:o?d[3]*(96/a.PM):d[3]+"mm",viewBox:d.join(" "),className:"adrian",__self:this,__source:{fileName:l,lineNumber:49}},r.createElement("style",{__self:this,__source:{fileName:l,lineNumber:62}},".valley {stroke-dasharray: 1,1;}",".outline {stroke-dasharray: .1,1;}",".mountain {stroke-dasharray: 10,2,1,1,1,2;}"),!o&&r.createElement("g",{transform:"translate(-20 -20) rotate(180)",__self:this,__source:{fileName:l,lineNumber:68}},r.createElement("path",{d:a.nl`
          M${(0,s.V)(e-_,.99*h)}
          L${(0,s.V)(e,h)}
          L${(0,s.V)(e,0)}
          L${(0,s.V)(-e,0)}
          L${(0,s.V)(-e,h)}
          L${(0,s.V)(_-e,1.01*h)}
          `,__self:this,__source:{fileName:l,lineNumber:69}}),r.createElement(i.U,{from:(0,s.V)(e,0),to:(0,s.V)(-e,0),__self:this,__source:{fileName:l,lineNumber:79}}),r.createElement(i.U,{from:(0,s.V)(e,h),to:(0,s.V)(e,0),__self:this,__source:{fileName:l,lineNumber:80}}),r.createElement(i.U,{from:(0,s.V)(_-e,h),to:(0,s.V)(0,h),__self:this,__source:{fileName:l,lineNumber:81}})),!o&&m&&r.createElement("rect",{x:f[0],y:f[1],width:m[0],height:m[1],__self:this,__source:{fileName:l,lineNumber:89}}),u)}},8492:(e,t,n)=>{"use strict";n.d(t,{p:()=>m,M:()=>u});var r=n(9526),s=n(2182),a=n(3671),i=n(4004),l=n(7727),o=n(8012);const c="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox2\\InsideFolds.tsx";function m(e,t,n){return Math.PI/2-t-Math.acos(n/e*Math.sin(t))}function u(e){const{baseRadius:t,topRadius:n,radius:u,print:f=!1,sides:d}=e,h=(0,a.oe)(d,t),_=(0,a.oe)(d,n),p=s.gc/d/2,g=m(u,p,h);function x(e){return f?{}:{stroke:e}}const N=(0,s.V)(h,0).plus(s.V3.polar(n-t,p)),v=s.V3.X,b=e=>N.plus(v.times(e)),y=b((0,s.zj)((e=>b(e).length()-u),1,4));return r.createElement(o.G,{...e,__self:this,__source:{fileName:c,lineNumber:58}},r.createElement("g",{__self:this,__source:{fileName:c,lineNumber:59}},r.createElement(a.hv,{radius:h,sides:d,className:"valley",__self:this,__source:{fileName:c,lineNumber:60}}),!f&&r.createElement(r.Fragment,null,r.createElement(i.U,{offset:-.5,from:[0,0],to:s.V3.polar(t,p),__self:this,__source:{fileName:c,lineNumber:67}},"baseRadius"),r.createElement(i.U,{offset:-.5,from:s.V3.polar(t,p),to:s.V3.polar(n,p),hideRight:!0,__self:this,__source:{fileName:c,lineNumber:74}},"topRadius"),r.createElement(i.U,{offset:-.5,from:s.V3.polar(n,p),to:s.V3.polar(u,p),hideRight:!0,__self:this,__source:{fileName:c,lineNumber:82}},"radius"),r.createElement(l.G,{center:N,start:Math.PI,toRel:p,__self:this,__source:{fileName:c,lineNumber:90}}),r.createElement(i.U,{from:s.V3.polar(h,-s.gc/d),to:s.V3.polar(h,0),__self:this,__source:{fileName:c,lineNumber:95}})),r.createElement(a.kC,{id:"foo",count:d,stepDeg:360/d,__self:this,__source:{fileName:c,lineNumber:101}},r.createElement("path",{d:a.nl`
                M${h},0
                H${u}`,className:"mountain",style:x("green"),__self:this,__source:{fileName:c,lineNumber:102}}),r.createElement("path",{d:a.nl`
                M${h},0
                L${s.V3.polar(u,g)}
                M${h},0
                L${N}`,className:"valley",style:x("blue"),__self:this,__source:{fileName:c,lineNumber:109}}),r.createElement("path",{d:a.nl`
                M${N}
                L${s.V3.polar(u,-g)}`,className:"mountain",style:x("blue"),__self:this,__source:{fileName:c,lineNumber:118}}),r.createElement("path",{d:a.nl`
                M${_},0
                L${s.V3.polar(h,-s.gc/d).plus(s.V3.polar(n-t,-s.gc/d/2))}`,className:"valley",style:x("hotpink"),__self:this,__source:{fileName:c,lineNumber:125}}),r.createElement("path",{d:a.nl`
                M${s.V3.polar(h,-s.gc/d).plus(s.V3.polar(n-t,-s.gc/d/2))}
                L${s.V3.polar(_,-s.gc/d)}`,className:"mountain",style:x("orange"),__self:this,__source:{fileName:c,lineNumber:134}}),r.createElement("path",{d:a.nl`
                M${N}
                L${y}`,className:"valley",style:x("red"),__self:this,__source:{fileName:c,lineNumber:143}})),r.createElement("circle",{r:u,__self:this,__source:{fileName:c,lineNumber:151}})))}},294:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>u});var r=n(1459),s=n(5282),a=n(9526),i=n(2182),l=n(8492);const o="C:\\Users\\aval\\tsdev\\workshop\\src\\spirograph\\index.tsx",c=new class{constructor(e,t){this.radius=e,this.d=t}sideLength(){return 2*(0,l.p)(this.radius,45*i.Co,this.d)*this.radius}angleForDistance(e){const t=this.sideLength(),n=Math.floor(e/t);let r=e%t;r>t/2&&(r-=t);const s=r/this.radius;return n*i.PI/2+s}}(.5,.4);function m(e){const t=c.angleForDistance(1.5*e),n=c.radiusForAngle(1.5*e),r=i.V3.polar(1.5-n,e);return[r.plus(i.V3.polar(.2,t)),r.plus(i.V3.polar(-.2,t))]}function u(){const e=(0,a.useRef)(null),t=(0,s.Z)();return(0,a.useEffect)((()=>{const n=e.current;return n.height=devicePixelRatio*n.offsetHeight,n.width=devicePixelRatio*n.offsetWidth,function(e,t){e.lineWidth=.005;const n=Math.min(e.canvas.width,e.canvas.height);e.scale(n,n),e.translate(.5,.5),e.scale(.25,.25);let r=0,s=!1;const a=m(0);return requestAnimationFrame((function n(i){for(;r<i;r+=1){const n=m(r/100);for(let r=0;r<a.length;r++){const s=n[r],i=a[r];i.distanceTo(s)>1e-4&&(e.beginPath(),e.strokeStyle=t[r],e.moveTo(i.x,i.y),e.lineTo(s.x,s.y),e.stroke(),a[r]=s)}}!s&&requestAnimationFrame(n)})),()=>{s=!0}}(n.getContext("2d"),[t.palette.primary.main,t.palette.secondary.main,"red","blue","black"])}),[t.palette]),a.createElement(r.Z,{container:!0,style:{minHeight:"100vh"},__self:this,__source:{fileName:o,lineNumber:125}},a.createElement(r.Z,{item:!0,xs:12,__self:this,__source:{fileName:o,lineNumber:126}},a.createElement("canvas",{ref:e,style:{width:"100%",height:"100%"},__self:this,__source:{fileName:o,lineNumber:127}})))}},1459:(e,t,n)=>{"use strict";n.d(t,{Z:()=>f});var r=n(2379),s=n(1416),a=n(9526),i=(n(2652),n(3060)),l=n(562),o=[0,1,2,3,4,5,6,7,8,9,10],c=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=parseFloat(e);return"".concat(n/t).concat(String(e).replace(String(n),"")||"px")}var u=a.forwardRef((function(e,t){var n=e.alignContent,l=void 0===n?"stretch":n,o=e.alignItems,c=void 0===o?"stretch":o,m=e.classes,u=e.className,f=e.component,d=void 0===f?"div":f,h=e.container,_=void 0!==h&&h,p=e.direction,g=void 0===p?"row":p,x=e.item,N=void 0!==x&&x,v=e.justify,b=void 0===v?"flex-start":v,y=e.lg,w=void 0!==y&&y,E=e.md,V=void 0!==E&&E,$=e.sm,M=void 0!==$&&$,k=e.spacing,A=void 0===k?0:k,C=e.wrap,S=void 0===C?"wrap":C,j=e.xl,L=void 0!==j&&j,R=e.xs,U=void 0!==R&&R,W=e.zeroMinWidth,B=void 0!==W&&W,I=(0,r.Z)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),P=(0,i.Z)(m.root,u,_&&[m.container,0!==A&&m["spacing-xs-".concat(String(A))]],N&&m.item,B&&m.zeroMinWidth,"row"!==g&&m["direction-xs-".concat(String(g))],"wrap"!==S&&m["wrap-xs-".concat(String(S))],"stretch"!==c&&m["align-items-xs-".concat(String(c))],"stretch"!==l&&m["align-content-xs-".concat(String(l))],"flex-start"!==b&&m["justify-xs-".concat(String(b))],!1!==U&&m["grid-xs-".concat(String(U))],!1!==M&&m["grid-sm-".concat(String(M))],!1!==V&&m["grid-md-".concat(String(V))],!1!==w&&m["grid-lg-".concat(String(w))],!1!==L&&m["grid-xl-".concat(String(L))]);return a.createElement(d,(0,s.Z)({className:P,ref:t},I))}));const f=(0,l.Z)((function(e){return(0,s.Z)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var n={};return o.forEach((function(t){var r=e.spacing(t);0!==r&&(n["spacing-".concat("xs","-").concat(t)]={margin:"-".concat(m(r,2)),width:"calc(100% + ".concat(m(r),")"),"& > $item":{padding:m(r,2)}})})),n}(e),e.breakpoints.keys.reduce((function(t,n){return function(e,t,n){var r={};c.forEach((function(e){var t="grid-".concat(n,"-").concat(e);if(!0!==e)if("auto"!==e){var s="".concat(Math.round(e/12*1e8)/1e6,"%");r[t]={flexBasis:s,flexGrow:0,maxWidth:s}}else r[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else r[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===n?(0,s.Z)(e,r):e[t.breakpoints.up(n)]=r}(t,e,n),t}),{}))}),{name:"MuiGrid"})(u)}}]);