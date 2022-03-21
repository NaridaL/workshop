"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[585],{4004:(e,t,l)=>{l.d(t,{U:()=>n});var r=l(9526),i=l(2182);const a="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\Measure.tsx";function n({from:e,to:t,children:l,hideRight:n=!1,offset:s=0}){Array.isArray(e)&&(e=(0,i.V)(e)),Array.isArray(t)&&(t=(0,i.V)(t));const o=e.to(t),m=o.length();if(m<.05)return null;l||=""+(0,i.At)(m,-1);const _=3*l.length;return r.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${o.angleXY()/i.Co}) translate(0, ${10*s})`,style:{stroke:"#aaa"},__self:this,__source:{fileName:a,lineNumber:27}},!n&&r.createElement("path",{d:"M0,0\n          l0,10\n          M4,3\n          l-4,2\n          l4,2",__self:this,__source:{fileName:a,lineNumber:34}}),r.createElement("path",{d:`\n        M0,5\n        H${(m-_)/2}\n        M${(m+_)/2},5\n        H${m}\n        M${m},0\n        l0,10\n        m-4,-7\n        l4,2\n        l-4,2`,__self:this,__source:{fileName:a,lineNumber:42}}),r.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:m/2,y:5,__self:this,__source:{fileName:a,lineNumber:54}},l))}},7727:(e,t,l)=>{l.d(t,{G:()=>s});var r=l(9526),i=l(2182),a=l(3671);const n="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\MeasureAngle.tsx";function s({center:e,start:t,toRel:l,children:s}){Array.isArray(e)&&(e=(0,i.V)(e));const o=i.V3.polar(20,t).plus((0,i.V)(e)),m=i.V3.polar(20,t+l).plus((0,i.V)(e)),_=i.V3.polar(14,t+l/2).plus((0,i.V)(e)),c=Math.abs(l)>Math.PI?"1":"0",u=l>0?"1":"0";return r.createElement("g",{__self:this,__source:{fileName:n,lineNumber:25}},r.createElement("path",{d:`M${o.x},${o.y} A20,20,0,${c},${u},${m.x},${m.y}`,__self:this,__source:{fileName:n,lineNumber:26}}),r.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:_.x,y:_.y,__self:this,__source:{fileName:n,lineNumber:29}},null!=(f=s)?f:(()=>(0,a.X$)(l))()));var f}},6446:(e,t,l)=>{l.d(t,{W:()=>m});var r=l(8215),i=l(3121),a=l(9526),n=l(2182),s=l(3671);const o="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\PaperAutocomplete.tsx",m=(0,a.forwardRef)((({disableClearance:e=!1,onChange:t,value:l,label:m},_)=>{let c=null;if(l){const[e,t]=l,[r,i]=e<t?[e,t]:[t,e];c=null!=(u=s.li.find((([e,t])=>e===r&&t===i)))?u:(()=>[r,i,"custom"])()}var u;return a.createElement(r.Z,{ref:_,disableClearable:e,size:"small",freeSolo:!0,renderInput:e=>a.createElement(i.Z,{...e,label:m,variant:"outlined",__self:void 0,__source:{fileName:o,lineNumber:38}}),value:c,onChange:(e,l)=>{let r;if("string"==typeof l){const e=/(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/,[,t,i]=e.exec(l),[a,s]=[+t,+i].sort(n.uK);r=[a,s,"custom"]}else r=l;t(r)},getOptionLabel:e=>{const[t,l,r="custom"]=e;return`${r} ${t}x${l}mm`},options:s.li,__self:void 0,__source:{fileName:o,lineNumber:32}})}))},3671:(e,t,l)=>{l.d(t,{PM:()=>n,Qn:()=>m,X$:()=>s,XJ:()=>o,YQ:()=>b,_x:()=>u,hv:()=>f,kC:()=>d,li:()=>h,nl:()=>N,oe:()=>c,q3:()=>_,t1:()=>p});var r=l(9526),i=l(2182);const a="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\common.tsx",n=25.4,s=e=>(0,i.At)(e/i.Co,-1)+"°",o=(e,t)=>t/2/Math.sin(i.gc/e/2),m=(e,t)=>2*t*Math.sin(i.gc/e/2),_=(e,t)=>t/2/Math.tan(i.gc/e/2),c=(e,t)=>t/Math.cos(i.gc/e/2),u=(e,t)=>2*t*Math.tan(i.gc/e/2);function f({sides:e,radius:t,startAngle:l=0,sideLength:n,...s}){if(void 0!==n==(void 0!==t))throw new Error("must set either sideLength or radius");void 0===t&&(t=o(e,n));const{x:m,y:_}=i.V3.polar(t,l);return r.createElement("path",{d:N`
        M${m},${_}
        ${(0,i.hS)(0,e).map((r=>N`L${i.V3.polar(t,l+r*(i.gc/e))}`))}Z`,...s,__self:this,__source:{fileName:a,lineNumber:48}})}function d({id:e,children:t,count:l,stepDeg:n}){return r.createElement(r.Fragment,null,r.createElement("g",{id:e,__self:this,__source:{fileName:a,lineNumber:72}},t),(0,i.hS)(0,l-1).map((t=>r.createElement("use",{key:t,href:"#"+e,transform:`rotate(${(t+1)*n} 0 0)`,__self:this,__source:{fileName:a,lineNumber:74}}))))}const h=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]],p=h.find((([,,e])=>e.includes("A4")));function N(e,...t){const l=e=>"number"==typeof e?""+e:"string"==typeof e?e:Array.isArray(e)?e.map(l).join(" "):e.x+","+e.y;let r=e[0];for(let i=0;i<t.length;i++)r+=l(t[i]),r+=e[i+1];return r}const b=e=>{const t=window.open(e,"_blank","noopener,noreferrer");t&&(t.opener=null)}},8511:(e,t,l)=>{l.r(t),l.d(t,{default:()=>P});var r=l(6908),i=l(8578),a=l(8864),n=l(5069),s=l(4854),o=l(4353),m=l(6726),_=l(9717),c=l(871),u=l(2525),f=l(6756),d=l(9516),h=l(8051),p=l(3121),N=l(4484),b=l(1413),v=l.n(b),g=l(9526),E=l(2279),y=l(2182),x=l(3671),M=l(1756),w=l(6446),A=l(4065),O=l(4004),k=l(7727);const L="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\PrismBoxSvg.tsx";function $({height:e,width:t,topLip:l=100,bottomLip:r,theta:i,sideWidth:a,sides:n,print:s=!1,style:o}){const m=y.gc/n/2,_=(Math.tan(m),t-n*a),c=Math.tan(m)*r,u=i*y.Co,f=e-r-l,d=(0,x.XJ)(n,a),h=(0,x.q3)(n,a),p=h+(n%2==0?h:d),N=(0,A.QI)([{type:A.OU.MOVE_TO,relative:!1,x:0,y:e-r},{type:A.OU.HORIZ_LINE_TO,relative:!1,x:t},...(0,y.hS)(0,n+1).flatMap((t=>[{type:A.OU.MOVE_TO,relative:!1,x:t*a,y:l},{type:A.OU.VERT_LINE_TO,relative:!1,y:e-r},{type:A.OU.MOVE_TO,relative:!1,x:t*a,y:e-r},{type:A.OU.LINE_TO,relative:!1,x:t*a+Math.tan(m+u)*r,y:e}])),{type:A.OU.MOVE_TO,relative:!1,x:0,y:l},{type:A.OU.HORIZ_LINE_TO,relative:!1,x:t}]),b=(0,A.QI)([...(0,y.hS)(0,n+1).flatMap((t=>[{type:A.OU.MOVE_TO,relative:!1,x:t*a,y:e-r},{type:A.OU.LINE_TO,relative:!0,x:Math.sin(u)*r,y:r}])),...(0,y.hS)(0,n).flatMap((e=>[{type:A.OU.MOVE_TO,relative:!1,x:(e+1)*a,y:0},{type:A.OU.VERT_LINE_TO,relative:!1,y:l}]))]),v=-f-10-d,E=s?[0,0,t,e]:[-10,-10,t+20,e+30],M=r*Math.tan(u);return g.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"none",stroke:"#123456",strokeWidth:2*x.PM/300,...o},width:s?t*(96/x.PM):E[2]+"mm",height:s?e*(96/x.PM):E[3]+"mm",viewBox:E.join(" "),className:"adrian",__self:this,__source:{fileName:L,lineNumber:134}},g.createElement("defs",{__self:this,__source:{fileName:L,lineNumber:147}},g.createElement("pattern",{id:"glue",patternUnits:"userSpaceOnUse",width:"4",height:"4",__self:this,__source:{fileName:L,lineNumber:148}},g.createElement("path",{d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",style:{stroke:"#eee",strokeWidth:1},__self:this,__source:{fileName:L,lineNumber:149}})),g.createElement("clipPath",{id:"page",__self:this,__source:{fileName:L,lineNumber:156}},g.createElement("rect",{width:t,height:e,__self:this,__source:{fileName:L,lineNumber:157}}))),g.createElement("g",{clipPath:"url(#page)",__self:this,__source:{fileName:L,lineNumber:161}},!s&&g.createElement("rect",{width:_,height:e,fill:"url(#glue)",stroke:"none",__self:this,__source:{fileName:L,lineNumber:163}}),g.createElement("rect",{width:t,height:e,__self:this,__source:{fileName:L,lineNumber:170}}),g.createElement("path",{d:N,style:{strokeDasharray:"1,1"},__self:this,__source:{fileName:L,lineNumber:171}}),g.createElement("path",{d:b,style:{strokeDasharray:"10,2,1,1,1,2"},__self:this,__source:{fileName:L,lineNumber:172}}),(0,y.hS)(0,n).map((t=>{const l=(0,y.V)(t*a,e-r).plus(y.V3.polar(d,90*y.Co-m-u));return g.createElement("circle",{key:t,cx:l.x,cy:l.y,r:.5,stroke:"black",__self:this,__source:{fileName:L,lineNumber:178}})}))),!s&&g.createElement(g.Fragment,null,g.createElement(O.U,{from:[0,0],to:[0,l],__self:this,__source:{fileName:L,lineNumber:183}},"topLip"),g.createElement(O.U,{from:[0,l],to:[0,e-r],__self:this,__source:{fileName:L,lineNumber:186}},""+(0,y.At)(e-l-r,-1)),g.createElement(O.U,{from:[0,e-r],to:[0,e],__self:this,__source:{fileName:L,lineNumber:189}},"bottomLip"),g.createElement(O.U,{from:[0,0],to:[a,0],__self:this,__source:{fileName:L,lineNumber:192}},"sideWidth"),(0,y.hS)(1,n).map((e=>g.createElement(O.U,{key:e,from:[e*a,0],to:[(e+1)*a,0],hideRight:!0,__self:this,__source:{fileName:L,lineNumber:196}},""+(0,y.At)(a*(e+1),-1)))),g.createElement(O.U,{from:[0,e],to:[M,e],__self:this,__source:{fileName:L,lineNumber:206}},""+(0,y.At)(M,-2)),(0,y.hS)(0,n).map((t=>g.createElement(O.U,{key:t,from:[M+t*a,e],to:[M+(t+1)*a,e],hideRight:!0,__self:this,__source:{fileName:L,lineNumber:210}},""+(0,y.At)(M+a*(t+1),-1)))),g.createElement(O.U,{from:[n*a,0],to:[t,0],__self:this,__source:{fileName:L,lineNumber:220}},""+(0,y.At)(_,-1)),g.createElement(O.U,{from:[a,e],to:[a+c,e],offset:1,__self:this,__source:{fileName:L,lineNumber:223}},""+(0,y.At)(c,-1)),c<a&&g.createElement(O.U,{from:[a+c,e],to:[a+a,e],offset:1,__self:this,__source:{fileName:L,lineNumber:231}},""+(0,y.At)(a-c,-1)),g.createElement(k.G,{center:[2*a,e-r],start:90*y.Co,toRel:-m,__self:this,__source:{fileName:L,lineNumber:239}},(0,x.X$)(m))),!s&&g.createElement("g",{transform:`translate(200, ${2*f})`,style:{stroke:"blue"},__self:this,__source:{fileName:L,lineNumber:249}},g.createElement("rect",{transform:"translate(0, -0)",x:-h,y:-f-10-d,width:p,height:f,__self:this,__source:{fileName:L,lineNumber:253}}),g.createElement("path",{d:`${(0,y.hS)(2,n/2).map((e=>"M"+y.V3.polar(d,y.gc/n*e+(Math.PI-y.gc/n/2)).x+","+v+" v"+f)).join(" ")} `,__self:this,__source:{fileName:L,lineNumber:261}}),g.createElement(O.U,{from:[-h,v],to:[-h,v+f],__self:this,__source:{fileName:L,lineNumber:272}},""+(0,y.At)(f,-1)),g.createElement(O.U,{from:[-h,v+f],to:[-h+p,v+f],__self:this,__source:{fileName:L,lineNumber:278}},""+(0,y.At)(p,-1)),g.createElement("path",{d:`${(0,y.hS)(0,n).map((e=>{const t=y.V3.polar(d,y.gc/n*e+(Math.PI-y.gc/n/2));return(0===e?"M":"L")+t.x+","+t.y})).join(" ")} Z`,__self:this,__source:{fileName:L,lineNumber:285}}),g.createElement("path",{d:(0,A.QI)([...(0,y.hS)(0,n).flatMap((e=>{const t=y.V3.polar(d,y.gc/n*e+(Math.PI-y.gc/n/2)),l=y.V3.polar(r/Math.cos(m+u),y.gc/n*e+-y.gc/n/2+u);return[{type:A.OU.MOVE_TO,relative:!1,x:t.x,y:t.y},{type:A.OU.LINE_TO,relative:!0,x:l.x,y:l.y}]}))]),__self:this,__source:{fileName:L,lineNumber:296}})))}var U=l(1641);const C="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\index.tsx",Z=(0,N.Z)((e=>({sidebar:{display:"flex",flexDirection:"column",width:"100%",padding:e.spacing(1),alignItems:"stretch","& > *":{margin:e.spacing(1)}},media:{height:0,paddingTop:"100%"}}))),P=()=>{const[e,t]=(0,U.q)({width:x.t1[1],height:x.t1[0],sides:6,sideWidth:45,topLip:30,bottomLip:30,theta:5}),N=e.width>e.height,[b,A]=[e.width,e.height],[O,k]=[b,A].sort(y.uK),L=Math.floor((A-e.bottomLip-1)/2),[P,I]=(0,g.useState)(!0),V=y.gc/e.sides/2,S=(0,y.At)(e.sideWidth/Math.tan(V),-1),[T,R]=(0,g.useState)(!1),W=(0,g.useCallback)((l=>{t((t=>{const r={...t,...l};return P&&L!==e.topLip&&(r.topLip=L),T&&S!==e.bottomLip&&(r.bottomLip=S),r}))}),[t,P,L,e.topLip,e.bottomLip,T,S]),z=(0,h.Z)(),B=Z(),j=()=>E.renderToStaticMarkup(g.createElement($,{...e,print:!0,__self:void 0,__source:{fileName:C,lineNumber:99}})).replace(/\s{2,}/g," ");return g.createElement(c.ZP,{container:!0,style:{width:"100%"},__self:void 0,__source:{fileName:C,lineNumber:130}},g.createElement(c.ZP,{item:!0,xs:12,md:10,style:{display:"flex",alignItems:"center",maxHeight:"100vh",padding:z.spacing(2)},__self:void 0,__source:{fileName:C,lineNumber:131}},g.createElement($,{...e,style:{maxWidth:"100%",maxHeight:"100%",height:"auto",margin:"auto"},__self:void 0,__source:{fileName:C,lineNumber:142}})),g.createElement(c.ZP,{item:!0,xs:12,md:2,__self:void 0,__source:{fileName:C,lineNumber:152}},g.createElement("div",{className:B.sidebar,__self:void 0,__source:{fileName:C,lineNumber:153}},g.createElement(n.Z,{__self:void 0,__source:{fileName:C,lineNumber:154}},g.createElement(o.Z,{className:B.media,image:M,title:"Hexagonal Prism Box",__self:void 0,__source:{fileName:C,lineNumber:155}}),g.createElement(s.Z,{__self:void 0,__source:{fileName:C,lineNumber:160}},"Helper to build"," ",g.createElement(d.Z,{href:"https://www.paperkawaii.com/video-tutorial-origami-hexagonal-gift-box/",__self:void 0,__source:{fileName:C,lineNumber:162}},"this box"),". All measurements are in millimeters. To make a lid, you should increase the sideWidth by 1mm and ~halve the paper height.")),g.createElement(w.W,{label:"Paper Size",value:[O,k,"custom"],onChange:e=>{const[t,l]=e;W(N?{width:l,height:t}:{width:t,height:l})},__self:void 0,__source:{fileName:C,lineNumber:169}}),g.createElement(_.Z,{control:g.createElement(m.Z,{checked:N,onChange:()=>{W({width:A,height:b})},color:"primary",__self:void 0,__source:{fileName:C,lineNumber:183}}),label:"Landscape",__self:void 0,__source:{fileName:C,lineNumber:181}}),g.createElement(p.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:3,max:16},value:e.sides,onChange:e=>W({sides:+e.target.value}),label:"Sides",__self:void 0,__source:{fileName:C,lineNumber:197}}),g.createElement(p.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:1},value:e.sideWidth,onChange:e=>W({sideWidth:+e.target.value}),InputProps:{endAdornment:g.createElement(f.Z,{position:"end",__self:void 0,__source:{fileName:C,lineNumber:214}},"mm")},label:"sideWidth",__self:void 0,__source:{fileName:C,lineNumber:206}}),g.createElement(p.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:0},value:e.theta,onChange:e=>W({theta:+e.target.value}),InputProps:{endAdornment:g.createElement(f.Z,{position:"end",__self:void 0,__source:{fileName:C,lineNumber:226}},"mm")},label:"theta",__self:void 0,__source:{fileName:C,lineNumber:218}}),g.createElement(p.Z,{variant:"outlined",disabled:P,size:"small",type:"number",inputProps:{step:1,min:0,max:L},value:e.topLip,onChange:e=>W({topLip:+e.target.value}),InputProps:{endAdornment:g.createElement(g.Fragment,null,g.createElement(f.Z,{position:"end",__self:void 0,__source:{fileName:C,lineNumber:245}},"mm"),g.createElement(u.Z,{onClick:()=>{I(!P),W({})},size:"large",__self:void 0,__source:{fileName:C,lineNumber:246}},P?g.createElement(r.Z,{color:"primary",__self:void 0,__source:{fileName:C,lineNumber:252}}):g.createElement(i.Z,{__self:void 0,__source:{fileName:C,lineNumber:252}})))},label:"topLip",__self:void 0,__source:{fileName:C,lineNumber:230}}),g.createElement(p.Z,{variant:"outlined",disabled:T,size:"small",type:"number",inputProps:{step:1,min:0},value:e.bottomLip,onChange:e=>W({bottomLip:+e.target.value}),InputProps:{endAdornment:g.createElement(g.Fragment,null,g.createElement(f.Z,{position:"end",__self:void 0,__source:{fileName:C,lineNumber:270}},"mm"),g.createElement(u.Z,{onClick:()=>{R(!T),W({})},size:"large",__self:void 0,__source:{fileName:C,lineNumber:271}},T?g.createElement(r.Z,{color:"primary",__self:void 0,__source:{fileName:C,lineNumber:277}}):g.createElement(i.Z,{__self:void 0,__source:{fileName:C,lineNumber:277}})))},label:"bottomLip",__self:void 0,__source:{fileName:C,lineNumber:259}}),g.createElement(a.Z,{variant:"contained",onClick:()=>{const t=j();v()(t,`${b}x${A}-${e.sides}x${e.sideWidth}-${e.topLip}-${e.bottomLip}.svg`)},__self:void 0,__source:{fileName:C,lineNumber:284}},"Download As SVG"),g.createElement(a.Z,{variant:"contained",onClick:async()=>{const{svgToPdf:t}=await Promise.all([l.e(853),l.e(898)]).then(l.bind(l,6997)),r=await t({title:"Paper Box Template",author:"Adrian Leonhard",svg:j()});v()(r,`${b}x${A}-${e.sides}x${e.sideWidth}-${e.topLip}-${e.bottomLip}.pdf`)},__self:void 0,__source:{fileName:C,lineNumber:287}},"Template as PDF"))))}},1641:(e,t,l)=>{l.d(t,{q:()=>c});var r=l(6897),i=l.n(r),a=l(508),n=l.n(a),s=l(9526);const o=e=>"#"+Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&"),m=e=>n()(e,(e=>"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:""===e?"":isNaN(+e)?e:+e))),_=e=>n()(e,(e=>""+e));function c(e,{deserialize:t=m,serialize:l=_,wait:r=1e3}={}){const a=(0,s.useCallback)((()=>{const r="function"==typeof e?e():e,i=t(Object.assign(l(r),(a=document.location.hash)?a.substr(1).split("&").map((e=>{const[t,l]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(l)]})).reduce(((e,[t,l])=>(e[t]=l,e)),{}):{}));var a;return history.pushState(void 0,document.title,o(l(i))),i}),[t,e,l]),[n,c]=(0,s.useState)(a),u=(0,s.useRef)();return u.current||(u.current=i()((function(e){history.pushState(void 0,document.title,o(l(e)))}),r)),(0,s.useEffect)((()=>u.current(n)),[n]),(0,s.useEffect)((()=>{const e=()=>{c(a())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[a]),[n,c]}},1756:(e,t,l)=>{e.exports=l.p+"5f305f1aadc5e269e4f4.jpg"}}]);