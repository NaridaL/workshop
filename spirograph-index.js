"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[878],{4004:(e,t,n)=>{n.d(t,{U:()=>l});var r=n(9526),a=n(2182);function l({from:e,to:t,children:n,hideRight:l=!1,offset:o=0}){Array.isArray(e)&&(e=(0,a.V)(e)),Array.isArray(t)&&(t=(0,a.V)(t));const s=e.to(t),i=s.length();if(i<.05)return null;n||=""+(0,a.At)(i,-1);const c=3*n.length;return r.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${s.angleXY()/a.Co}) translate(0, ${10*o})`,style:{stroke:"#aaa"}},!l&&r.createElement("path",{d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2"}),r.createElement("path",{d:`\n        M0,5\n        H${(i-c)/2}\n        M${(i+c)/2},5\n        H${i}\n        M${i},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`}),r.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:i/2,y:5},n))}},7727:(e,t,n)=>{n.d(t,{G:()=>o});var r=n(9526),a=n(2182),l=n(3671);function o({center:e,start:t,toRel:n,children:o}){Array.isArray(e)&&(e=(0,a.V)(e));const s=a.V3.polar(20,t).plus((0,a.V)(e)),i=a.V3.polar(20,t+n).plus((0,a.V)(e)),c=a.V3.polar(14,t+n/2).plus((0,a.V)(e)),m=Math.abs(n)>Math.PI?"1":"0",h=n>0?"1":"0";return r.createElement("g",null,r.createElement("path",{d:`M${s.x},${s.y} A20,20,0,${m},${h},${i.x},${i.y}`}),r.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:c.x,y:c.y},null!=(u=o)?u:(()=>(0,l.X$)(n))()));var u}},3671:(e,t,n)=>{n.d(t,{PM:()=>l,Qn:()=>i,X$:()=>o,XJ:()=>s,YQ:()=>y,_x:()=>h,hv:()=>u,kC:()=>d,li:()=>p,nl:()=>g,oe:()=>m,q3:()=>c,t1:()=>f});var r=n(9526),a=n(2182);const l=25.4,o=e=>(0,a.At)(e/a.Co,-1)+"°",s=(e,t)=>t/2/Math.sin(a.gc/e/2),i=(e,t)=>2*t*Math.sin(a.gc/e/2),c=(e,t)=>t/2/Math.tan(a.gc/e/2),m=(e,t)=>t/Math.cos(a.gc/e/2),h=(e,t)=>2*t*Math.tan(a.gc/e/2);function u({sides:e,radius:t,startAngle:n=0,sideLength:l,...o}){if(void 0!==l==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=s(e,l));const{x:i,y:c}=a.V3.polar(t,n);return r.createElement("path",{d:g`
        M${i},${c}
        ${(0,a.hS)(0,e).map((r=>g`L${a.V3.polar(t,n+r*(a.gc/e))}`))}Z`,...o})}function d({id:e,children:t,count:n,stepDeg:l}){return r.createElement(r.Fragment,null,r.createElement("g",{id:e},t),(0,a.hS)(0,n-1).map((t=>r.createElement("use",{key:t,href:"#"+e,transform:`rotate(${(t+1)*l} 0 0)`}))))}const p=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]],f=p.find((([,,e])=>e.includes("A4")));function g(e,...t){const n=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(n).join(" "):e.x+","+e.y;let r=e[0];for(let a=0;a<t.length;a++)r+=n(t[a]),r+=e[a+1];return r}const y=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},8012:(e,t,n)=>{n.d(t,{G:()=>s});var r=n(9526),a=n(2182),l=n(3671),o=n(4004);function s({baseRadius:e,topRadius:t,radius:n,print:s=!1,style:i,paperSize:c,children:m}){const h=c&&[Math.min(-20,n-c[0]),Math.min(-20,n-c[1])],u=s?c?[h[0],h[1],c[0],c[1]]:[-n,-n,2*n,2*n]:[-n-10,-n-10,2*n+20,2*n+20],d=t-e,p=n-t;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"none",stroke:"#123456",strokeWidth:2*l.PM/300,...i},width:s?u[2]*(96/l.PM):u[2]+"mm",height:s?u[3]*(96/l.PM):u[3]+"mm",viewBox:u.join(" "),className:"adrian"},r.createElement("style",null,".valley {stroke-dasharray: 1,1;}",".outline {stroke-dasharray: .1,1;}",".mountain {stroke-dasharray: 10,2,1,1,1,2;}"),!s&&r.createElement("g",{transform:"translate(-20 -20) rotate(180)"},r.createElement("path",{d:l.nl`
          M${(0,a.V)(e-p,.99*d)}
          L${(0,a.V)(e,d)}
          L${(0,a.V)(e,0)}
          L${(0,a.V)(-e,0)}
          L${(0,a.V)(-e,d)}
          L${(0,a.V)(p-e,1.01*d)}
          `}),r.createElement(o.U,{from:(0,a.V)(e,0),to:(0,a.V)(-e,0)}),r.createElement(o.U,{from:(0,a.V)(e,d),to:(0,a.V)(e,0)}),r.createElement(o.U,{from:(0,a.V)(p-e,d),to:(0,a.V)(0,d)})),!s&&c&&r.createElement("rect",{x:h[0],y:h[1],width:c[0],height:c[1]}),m)}},8492:(e,t,n)=>{n.d(t,{M1:()=>h,ST:()=>m,pC:()=>c});var r=n(9526),a=n(2182),l=n(3671),o=n(4004),s=n(7727),i=n(8012);function c(e,t,n){return Math.PI/2-t-Math.acos(n/e*Math.sin(t))}function m(e,t,n){return n/Math.cos(e-Math.PI/2+t)/Math.sin(t)}function h(e){const{baseRadius:t,topRadius:n,radius:m,print:h=!1,sides:u}=e,d=(0,l.oe)(u,t),p=(0,l.oe)(u,n),f=a.gc/u/2,g=c(m,f,d);function y(e){return h?{}:{stroke:e}}const V=(0,a.V)(d,0).plus(a.V3.polar(n-t,f)),E=a.V3.X,$=e=>V.plus(E.times(e)),M=$((0,a.zj)((e=>$(e).length()-m),1,4));return r.createElement(i.G,{...e},r.createElement("g",null,r.createElement(l.hv,{radius:d,sides:u,className:"valley"}),!h&&r.createElement(r.Fragment,null,r.createElement(o.U,{offset:-.5,from:[0,0],to:a.V3.polar(t,f)},"baseRadius"),r.createElement(o.U,{offset:-.5,from:a.V3.polar(t,f),to:a.V3.polar(n,f),hideRight:!0},"topRadius"),r.createElement(o.U,{offset:-.5,from:a.V3.polar(n,f),to:a.V3.polar(m,f),hideRight:!0},"radius"),r.createElement(s.G,{center:V,start:Math.PI,toRel:f}),r.createElement(o.U,{from:a.V3.polar(d,-a.gc/u),to:a.V3.polar(d,0)})),r.createElement(l.kC,{id:"foo",count:u,stepDeg:360/u},r.createElement("path",{d:l.nl`
                M${d},0
                H${m}`,className:"mountain",style:y("green")}),r.createElement("path",{d:l.nl`
                M${d},0
                L${a.V3.polar(m,g)}
                M${d},0
                L${V}`,className:"valley",style:y("blue")}),r.createElement("path",{d:l.nl`
                M${V}
                L${a.V3.polar(m,-g)}`,className:"mountain",style:y("blue")}),r.createElement("path",{d:l.nl`
                M${p},0
                L${a.V3.polar(d,-a.gc/u).plus(a.V3.polar(n-t,-a.gc/u/2))}`,className:"valley",style:y("hotpink")}),r.createElement("path",{d:l.nl`
                M${a.V3.polar(d,-a.gc/u).plus(a.V3.polar(n-t,-a.gc/u/2))}
                L${a.V3.polar(p,-a.gc/u)}`,className:"mountain",style:y("orange")}),r.createElement("path",{d:l.nl`
                M${V}
                L${M}`,className:"valley",style:y("red")})),r.createElement("circle",{r:m})))}},294:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var r=n(871),a=n(8051),l=n(9526),o=n(2182),s=n(8492);const i=new class{constructor(e,t){this.radius=e,this.d=t}sideLength(){return 2*(0,s.pC)(this.radius,45*o.Co,this.d)*this.radius}angleForDistance(e){const t=this.sideLength(),n=Math.floor(e/t);let r=e%t;r>t/2&&(r-=t);const a=r/this.radius;return n*o.PI/2+a}radiusForAngle(e){return(e%=o.PI/2)>o.PI/4&&(e-=o.PI/2),(0,s.ST)(e,45*o.Co,this.d)}}(.5,.4),c=function(e,t){const n=(0,s.pC)(2,45*o.Co,1.8),r=2*n*2;return console.log(r,n/o.Co),function(e){Math.floor(e/r);let t=e%r;return t>r/2&&(t-=r),[(0,o.V)(1.8-2,0).plus(o.V3.polar(2,t/2))]}}();function m(e){const t=i.angleForDistance(1.5*e),n=i.radiusForAngle(e/1.5),r=o.V3.polar(1.5-n,e);return[c(e)[0],r.plus(o.V3.polar(-.2,t))]}function h(){const e=(0,l.useRef)(null),t=(0,a.Z)();return(0,l.useEffect)((()=>{const n=e.current;return n.height=devicePixelRatio*n.offsetHeight,n.width=devicePixelRatio*n.offsetWidth,function(e,t){e.lineWidth=.005;const n=Math.min(e.canvas.width,e.canvas.height);e.scale(n,n),e.translate(.5,.5),e.scale(.25,.25);let r=0,a=!1;const l=m(0);return requestAnimationFrame((function n(o){for(;r<o;r+=1){const n=m(r/1e3);for(let r=0;r<l.length;r++){const a=n[r],o=l[r];o.distanceTo(a)>1e-4&&(e.beginPath(),e.strokeStyle=t[r],e.moveTo(o.x,o.y),e.lineTo(a.x,a.y),e.stroke(),l[r]=a)}}!a&&requestAnimationFrame(n)})),()=>{a=!0}}(n.getContext("2d"),[t.palette.primary.main,t.palette.secondary.main,"red","blue","black"])}),[t.palette]),l.createElement(r.ZP,{container:!0,style:{minHeight:"100vh"}},l.createElement(r.ZP,{item:!0,xs:12},l.createElement("canvas",{ref:e,style:{width:"100%",height:"100%"}})))}}}]);