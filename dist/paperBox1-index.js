(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[585],{3671:(e,t,i)=>{"use strict";i.d(t,{P:()=>a,X:()=>r});var n=i(3376);const a=25.4,r=e=>(0,n.At)(e/n.Co,-1)+"°"},8671:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>D});var n=i(6046),a=i(6429),r=i(1416),l=i(2379),s=i(9526),o=(i(2652),i(3060)),c=i(2248),m=i(1342),u=i(6647),d=s.forwardRef((function(e,t){var i=e.children,n=e.classes,a=e.className,m=e.component,d=void 0===m?"div":m,_=e.disablePointerEvents,f=void 0!==_&&_,p=e.disableTypography,h=void 0!==p&&p,g=e.position,v=e.variant,N=(0,l.Z)(e,["children","classes","className","component","disablePointerEvents","disableTypography","position","variant"]),b=(0,u.Y)()||{},x=v;return v&&b.variant,b&&!x&&(x=b.variant),s.createElement(u.Z.Provider,{value:null},s.createElement(d,(0,r.Z)({className:(0,o.Z)(n.root,a,f&&n.disablePointerEvents,b.hiddenLabel&&n.hiddenLabel,"filled"===x&&n.filled,{start:n.positionStart,end:n.positionEnd}[g],"dense"===b.margin&&n.marginDense),ref:t},N),"string"!=typeof i||h?i:s.createElement(c.Z,{color:"textSecondary"},i)))}));const _=(0,m.Z)({root:{display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap"},filled:{"&$positionStart:not($hiddenLabel)":{marginTop:16}},positionStart:{marginRight:8},positionEnd:{marginLeft:8},disablePointerEvents:{pointerEvents:"none"},hiddenLabel:{},marginDense:{}},{name:"MuiInputAdornment"})(d);var f=i(5898),p=i(7445),h=i(5147),g=i(4881),v=i(9905),N=i(1413),b=i.n(N),x=i(3680),E=i(9896),y=i(2279),w=i(2310),M=i(3376),O=i(3671);const L="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\Measure.tsx";function S({from:e,to:t,children:i,hideRight:n=!1,offset:a=0}){const r=(0,M.V)(e).to((0,M.V)(t)),l=r.length();if(l<.05)return null;const o=3*i.length;return s.createElement("g",{transform:` translate(${e[0]}, ${e[1]}) rotate(${r.angleXY()/M.Co}) translate(0, ${10*a})`,style:{stroke:"#aaa"},__self:this,__source:{fileName:L,lineNumber:23}},!n&&s.createElement("path",{d:"M0,0\n\t  l0,10\n\t  M4,3\n\t  l-4,2\n\t  l4,2",__self:this,__source:{fileName:L,lineNumber:30}}),s.createElement("path",{d:`\n\t  M0,5\n\t  H${(l-o)/2}\n\t  M${(l+o)/2},5\n\t  H${l}\n\t  M${l},0\n\t  l0,10\n\t  m-4,-7\n\t  l4,2\n\t  l-4,2`,__self:this,__source:{fileName:L,lineNumber:38}}),s.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:l/2,y:5,__self:this,__source:{fileName:L,lineNumber:50}},i))}const C="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\MeasureAngle.tsx";function Z({center:e,start:t,toRel:i,children:n}){const a=M.V3.polar(20,t).plus((0,M.V)(e)),r=M.V3.polar(20,t+i).plus((0,M.V)(e)),l=M.V3.polar(14,t+i/2).plus((0,M.V)(e));return s.createElement("g",{__self:this,__source:{fileName:C,lineNumber:22}},s.createElement("path",{d:`M${a.x},${a.y} A20,20,0,0,0,${r.x},${r.y}`,__self:this,__source:{fileName:C,lineNumber:23}}),s.createElement("text",{style:{stroke:"none",fill:"#aaa",fontSize:4,dominantBaseline:"middle",textAnchor:"middle"},x:l.x,y:l.y,__self:this,__source:{fileName:C,lineNumber:26}},n))}const k="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\BaseDrawing.tsx";function A({height:e,width:t,topLip:i=100,bottomLip:n,theta:a,sideWidth:r,sides:l,print:o=!1,style:c}){const m=M.gc/l/2,u=(Math.tan(m),Math.atan(r/n),t-l*r),d=Math.tan(m)*n,_=a*M.Co,f=e-n-i,p=((e,t)=>t/2/Math.sin(M.gc/e/2))(l,r),h=((e,t)=>t/2/Math.tan(M.gc/e/2))(l,r),g=h+(l%2==0?h:p),v=(0,w.QI)([{type:w.OU.MOVE_TO,relative:!1,x:0,y:e-n},{type:w.OU.HORIZ_LINE_TO,relative:!1,x:t},...(0,M.hS)(0,l+1).flatMap((t=>[{type:w.OU.MOVE_TO,relative:!1,x:t*r,y:i},{type:w.OU.VERT_LINE_TO,relative:!1,y:e-n},{type:w.OU.MOVE_TO,relative:!1,x:t*r,y:e-n},{type:w.OU.LINE_TO,relative:!1,x:t*r+Math.tan(m+_)*n,y:e}])),{type:w.OU.MOVE_TO,relative:!1,x:0,y:i},{type:w.OU.HORIZ_LINE_TO,relative:!1,x:t}]),N=(0,w.QI)([...(0,M.hS)(0,l+1).flatMap((t=>[{type:w.OU.MOVE_TO,relative:!1,x:t*r,y:e-n},{type:w.OU.LINE_TO,relative:!0,x:Math.sin(_)*n,y:n}])),...(0,M.hS)(0,l).flatMap((e=>[{type:w.OU.MOVE_TO,relative:!1,x:(e+1)*r,y:0},{type:w.OU.VERT_LINE_TO,relative:!1,y:i}]))]),b=-f-10-p,x=o?[0,0,t,e]:[-10,-10,t+20,e+30];let E=n*Math.tan(_);return s.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"none",stroke:"#123456",strokeWidth:2*O.P/300,...c},width:o?t*(96/O.P):x[2]+"mm",height:o?e*(96/O.P):x[3]+"mm",viewBox:x.join(" "),__self:this,__source:{fileName:k,lineNumber:145}},s.createElement("defs",{__self:this,__source:{fileName:k,lineNumber:157}},s.createElement("pattern",{id:"glue",patternUnits:"userSpaceOnUse",width:"4",height:"4",__self:this,__source:{fileName:k,lineNumber:158}},s.createElement("path",{d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",style:{stroke:"#eee",strokeWidth:1},__self:this,__source:{fileName:k,lineNumber:159}})),s.createElement("clipPath",{id:"page",__self:this,__source:{fileName:k,lineNumber:166}},s.createElement("rect",{width:t,height:e,__self:this,__source:{fileName:k,lineNumber:167}}))),s.createElement("g",{clipPath:"url(#page)",__self:this,__source:{fileName:k,lineNumber:171}},!o&&s.createElement("rect",{width:u,height:e,fill:"url(#glue)",stroke:"none",__self:this,__source:{fileName:k,lineNumber:173}}),s.createElement("rect",{width:t,height:e,__self:this,__source:{fileName:k,lineNumber:180}}),s.createElement("path",{d:v,style:{strokeDasharray:"1,1"},__self:this,__source:{fileName:k,lineNumber:181}}),s.createElement("path",{d:N,style:{strokeDasharray:"10,2,1,1,1,2"},__self:this,__source:{fileName:k,lineNumber:182}}),(0,M.hS)(0,l).map((t=>{const i=(0,M.V)(t*r,e-n).plus(M.V3.polar(p,90*M.Co-m-_));return s.createElement("circle",{key:t,cx:i.x,cy:i.y,r:.5,stroke:"black",__self:this,__source:{fileName:k,lineNumber:188}})}))),!o&&s.createElement(s.Fragment,null,s.createElement(S,{from:[0,0],to:[0,i],__self:this,__source:{fileName:k,lineNumber:193}},"topLip"),s.createElement(S,{from:[0,i],to:[0,e-n],__self:this,__source:{fileName:k,lineNumber:196}},""+(0,M.At)(e-i-n,-1)),s.createElement(S,{from:[0,e-n],to:[0,e],__self:this,__source:{fileName:k,lineNumber:199}},"bottomLip"),s.createElement(S,{from:[0,0],to:[r,0],__self:this,__source:{fileName:k,lineNumber:202}},"sideWidth"),...(0,M.hS)(1,l).map((e=>s.createElement(S,{from:[e*r,0],to:[(e+1)*r,0],hideRight:!0,__self:this,__source:{fileName:k,lineNumber:206}},""+(0,M.At)(r*(e+1),-1)))),s.createElement(S,{from:[0,e],to:[E,e],__self:this,__source:{fileName:k,lineNumber:215}},""+(0,M.At)(E,-2)),...(0,M.hS)(0,l).map((t=>s.createElement(S,{from:[E+t*r,e],to:[E+(t+1)*r,e],hideRight:!0,__self:this,__source:{fileName:k,lineNumber:219}},""+(0,M.At)(E+r*(t+1),-1)))),s.createElement(S,{from:[l*r,0],to:[t,0],__self:this,__source:{fileName:k,lineNumber:228}},""+(0,M.At)(u,-1)),s.createElement(S,{from:[r,e],to:[r+d,e],offset:1,__self:this,__source:{fileName:k,lineNumber:231}},""+(0,M.At)(d,-1)),d<r&&s.createElement(S,{from:[r+d,e],to:[r+r,e],offset:1,__self:this,__source:{fileName:k,lineNumber:239}},""+(0,M.At)(r-d,-1)),s.createElement(Z,{center:[2*r,e-n],start:90*M.Co,toRel:-m,__self:this,__source:{fileName:k,lineNumber:247}},(0,O.X)(m))),!o&&s.createElement("g",{transform:`translate(200, ${2*f})`,style:{stroke:"blue"},__self:this,__source:{fileName:k,lineNumber:257}},s.createElement("rect",{transform:"translate(0, -0)",x:-h,y:-f-10-p,width:g,height:f,__self:this,__source:{fileName:k,lineNumber:261}}),s.createElement("path",{d:`${(0,M.hS)(2,l/2).map((e=>"M"+M.V3.polar(p,M.gc/l*e+(Math.PI-M.gc/l/2)).x+","+b+" v"+f)).join(" ")} `,__self:this,__source:{fileName:k,lineNumber:269}}),s.createElement(S,{from:[-h,b],to:[-h,b+f],__self:this,__source:{fileName:k,lineNumber:280}},""+(0,M.At)(f,-1)),s.createElement(S,{from:[-h,b+f],to:[-h+g,b+f],__self:this,__source:{fileName:k,lineNumber:286}},""+(0,M.At)(g,-1)),s.createElement("path",{d:`${(0,M.hS)(0,l).map((e=>{const t=M.V3.polar(p,M.gc/l*e+(Math.PI-M.gc/l/2));return(0==e?"M":"L")+t.x+","+t.y})).join(" ")} Z`,__self:this,__source:{fileName:k,lineNumber:293}}),s.createElement("path",{d:(0,w.QI)([...(0,M.hS)(0,l).flatMap((e=>{const t=M.V3.polar(p,M.gc/l*e+(Math.PI-M.gc/l/2)),i=M.V3.polar(n/Math.cos(m+_),M.gc/l*e+-M.gc/l/2+_);return[{type:w.OU.MOVE_TO,relative:!1,x:t.x,y:t.y},{type:w.OU.LINE_TO,relative:!0,x:i.x,y:i.y}]}))]),__self:this,__source:{fileName:k,lineNumber:304}})))}var I=i(1845),$=i(1641),P=i(9110),V=[0,1,2,3,4,5,6,7,8,9,10],T=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function U(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=parseFloat(e);return"".concat(i/t).concat(String(e).replace(String(i),"")||"px")}var W=s.forwardRef((function(e,t){var i=e.alignContent,n=void 0===i?"stretch":i,a=e.alignItems,c=void 0===a?"stretch":a,m=e.classes,u=e.className,d=e.component,_=void 0===d?"div":d,f=e.container,p=void 0!==f&&f,h=e.direction,g=void 0===h?"row":h,v=e.item,N=void 0!==v&&v,b=e.justify,x=void 0===b?"flex-start":b,E=e.lg,y=void 0!==E&&E,w=e.md,M=void 0!==w&&w,O=e.sm,L=void 0!==O&&O,S=e.spacing,C=void 0===S?0:S,Z=e.wrap,k=void 0===Z?"wrap":Z,A=e.xl,I=void 0!==A&&A,$=e.xs,P=void 0!==$&&$,V=e.zeroMinWidth,T=void 0!==V&&V,U=(0,l.Z)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),W=(0,o.Z)(m.root,u,p&&[m.container,0!==C&&m["spacing-xs-".concat(String(C))]],N&&m.item,T&&m.zeroMinWidth,"row"!==g&&m["direction-xs-".concat(String(g))],"wrap"!==k&&m["wrap-xs-".concat(String(k))],"stretch"!==c&&m["align-items-xs-".concat(String(c))],"stretch"!==n&&m["align-content-xs-".concat(String(n))],"flex-start"!==x&&m["justify-xs-".concat(String(x))],!1!==P&&m["grid-xs-".concat(String(P))],!1!==L&&m["grid-sm-".concat(String(L))],!1!==M&&m["grid-md-".concat(String(M))],!1!==y&&m["grid-lg-".concat(String(y))],!1!==I&&m["grid-xl-".concat(String(I))]);return s.createElement(_,(0,r.Z)({className:W,ref:t},U))}));const z=(0,m.Z)((function(e){return(0,r.Z)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var i={};return V.forEach((function(t){var n=e.spacing(t);0!==n&&(i["spacing-".concat("xs","-").concat(t)]={margin:"-".concat(U(n,2)),width:"calc(100% + ".concat(U(n),")"),"& > $item":{padding:U(n,2)}})})),i}(e),e.breakpoints.keys.reduce((function(t,i){return function(e,t,i){var n={};T.forEach((function(e){var t="grid-".concat(i,"-").concat(e);if(!0!==e)if("auto"!==e){var a="".concat(Math.round(e/12*1e8)/1e6,"%");n[t]={flexBasis:a,flexGrow:0,maxWidth:a}}else n[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else n[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===i?(0,r.Z)(e,n):e[t.breakpoints.up(i)]=n}(t,e,i),t}),{}))}),{name:"MuiGrid"})(W),j="C:\\Users\\aval\\tsdev\\workshop\\src\\paperBox1\\index.tsx",R=[[841,1189,"A0"],[594,841,"A1"],[420,594,"A2"],[297,420,"A3"],[210,297,"A4"],[148,210,"A5"],[105,148,"A6"],[74,105,"A7"],[52,74,"A8"],[37,52,"A9"],[26,37,"A10"],[150,150,"Origami 15cm"],[100,100,"Origami 10cm"],[75,75,"Origami 7.5cm"],[215.9,279.4,"Letter"],[215.9,355.6,"Legal"]],B=R.find((([,,e])=>e.includes("A4"))),H=(0,v.Z)((e=>({sidebar:{display:"flex",flexDirection:"column",width:"100%",padding:e.spacing(1),alignItems:"stretch","& > *":{margin:e.spacing(1)}}}))),D=()=>{const[e,t]=(0,$.q)({width:B[1],height:B[0],sides:6,sideWidth:45,topLip:30,bottomLip:30,theta:5}),r=e.width>e.height,[l,o]=[e.width,e.height],[c,m]=[l,o].sort(M.uK),u=null!=(d=R.find((([e,t])=>e===c&&t===m)))?d:(()=>[c,m,"custom"])();var d;const v=Math.floor((o-e.bottomLip-1)/2),[N,w]=(0,s.useState)(!0);N&&v!=e.topLip&&t((e=>({...e,topLip:v})));const L=M.gc/e.sides/2,S=(0,M.At)(e.sideWidth/Math.tan(L),-1),[C,Z]=(0,s.useState)(!1);C&&S!=e.bottomLip&&t((e=>({...e,bottomLip:S})));const k=(0,g.Z)(),V=H(),T=()=>y.renderToStaticMarkup(s.createElement(A,{...{...e,print:!0},__self:void 0,__source:{fileName:j,lineNumber:101}})).replace(/\s{2,}/g," ");return s.createElement(z,{container:!0,style:{width:"100%"},__self:void 0,__source:{fileName:j,lineNumber:136}},s.createElement(z,{item:!0,xs:12,md:10,style:{display:"flex",alignItems:"center",maxHeight:"100vh",padding:k.spacing(2)},__self:void 0,__source:{fileName:j,lineNumber:137}},s.createElement(A,{...e,style:{maxWidth:"100%",maxHeight:"100%",height:"auto",margin:"auto"},__self:void 0,__source:{fileName:j,lineNumber:148}})),s.createElement(z,{item:!0,xs:12,md:2,__self:void 0,__source:{fileName:j,lineNumber:158}},s.createElement(z,{container:!0,className:V.sidebar,__self:void 0,__source:{fileName:j,lineNumber:159}},s.createElement(I.Z,{style:{padding:k.spacing(1)},__self:void 0,__source:{fileName:j,lineNumber:160}},"Helper to build"," ",s.createElement("a",{href:"https://www.paperkawaii.com/video-tutorial-origami-hexagonal-gift-box/",__self:void 0,__source:{fileName:j,lineNumber:162}},"this")," ","box. All measurements are in millimeters. To make a lid, you should increase the sideWidth by 1mm and ~halve the paper height."),s.createElement(a.ZP,{disableClearable:!0,size:"small",freeSolo:!0,renderInput:e=>s.createElement(n.Z,{...e,label:"Paper Size",variant:"outlined",__self:void 0,__source:{fileName:j,lineNumber:173}}),value:u,onChange:(e,i)=>{let n,a;if("string"==typeof i){const e=/(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/,[,t,r]=e.exec(i);[n,a]=[+t,+r].sort(M.uK)}else[n,a]=i;t(r?e=>({...e,width:a,height:n}):e=>({...e,width:n,height:a}))},getOptionLabel:e=>{const[t,i,n="custom"]=e;return`${n} ${t}x${i}mm`},options:R,__self:void 0,__source:{fileName:j,lineNumber:168}}),s.createElement(h.Z,{control:s.createElement(p.Z,{checked:r,onChange:()=>{t((e=>({...e,width:o,height:l})))},color:"primary",__self:void 0,__source:{fileName:j,lineNumber:207}}),label:"Landscape",__self:void 0,__source:{fileName:j,lineNumber:205}}),s.createElement(n.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:3,max:16},value:e.sides,onChange:e=>t((t=>({...t,sides:+e.target.value}))),label:"Sides",__self:void 0,__source:{fileName:j,lineNumber:222}}),s.createElement(n.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:1},value:e.sideWidth,onChange:e=>t((t=>({...t,sideWidth:+e.target.value}))),InputProps:{endAdornment:s.createElement(_,{position:"end",__self:void 0,__source:{fileName:j,lineNumber:246}},"mm")},label:"sideWidth",__self:void 0,__source:{fileName:j,lineNumber:233}}),s.createElement(n.Z,{variant:"outlined",size:"small",type:"number",inputProps:{step:1,min:0},value:e.theta,onChange:e=>t((t=>({...t,theta:+e.target.value}))),InputProps:{endAdornment:s.createElement(_,{position:"end",__self:void 0,__source:{fileName:j,lineNumber:260}},"mm")},label:"theta",__self:void 0,__source:{fileName:j,lineNumber:250}}),s.createElement(n.Z,{variant:"outlined",disabled:N,size:"small",type:"number",inputProps:{step:1,min:0,max:v},value:e.topLip,onChange:e=>t((t=>({...t,topLip:+e.target.value}))),InputProps:{endAdornment:s.createElement(s.Fragment,null,s.createElement(_,{position:"end",__self:void 0,__source:{fileName:j,lineNumber:281}},"mm"),s.createElement(P.Z,{onClick:()=>w(!N),__self:void 0,__source:{fileName:j,lineNumber:282}},N?s.createElement(x.Z,{color:"primary",__self:void 0,__source:{fileName:j,lineNumber:283}}):s.createElement(E.Z,{__self:void 0,__source:{fileName:j,lineNumber:283}})))},label:"topLip",__self:void 0,__source:{fileName:j,lineNumber:264}}),s.createElement(n.Z,{variant:"outlined",disabled:C,size:"small",type:"number",inputProps:{step:1,min:0},value:e.bottomLip,onChange:e=>t((t=>({...t,bottomLip:+e.target.value}))),InputProps:{endAdornment:s.createElement(s.Fragment,null,s.createElement(_,{position:"end",__self:void 0,__source:{fileName:j,lineNumber:306}},"mm"),s.createElement(P.Z,{onClick:()=>Z(!C),__self:void 0,__source:{fileName:j,lineNumber:307}},C?s.createElement(x.Z,{color:"primary",__self:void 0,__source:{fileName:j,lineNumber:308}}):s.createElement(E.Z,{__self:void 0,__source:{fileName:j,lineNumber:308}})))},label:"bottomLip",__self:void 0,__source:{fileName:j,lineNumber:290}}),s.createElement(f.Z,{variant:"contained",onClick:()=>{const t=T();b()(t,`${l}x${o}-${e.sides}x${e.sideWidth}-${e.topLip}-${e.bottomLip}.svg`)},__self:void 0,__source:{fileName:j,lineNumber:315}},"Download As SVG"),s.createElement(f.Z,{variant:"contained",onClick:async()=>{const{svgToPdf:t}=await Promise.all([i.e(853),i.e(898)]).then(i.bind(i,6997)),n=await t({size:[l,o].sort(M.uK).map((e=>(0,M.At)(e*(72/O.P),-2))),layout:r?"landscape":"portrait",title:"Paper Box Template",author:"Adrian Leonhard",svg:T()});b()(n,`${l}x${o}-${e.sides}x${e.sideWidth}-${e.topLip}-${e.bottomLip}.pdf`)},__self:void 0,__source:{fileName:j,lineNumber:318}},"Template as PDF"))))}},1641:(e,t,i)=>{"use strict";i.d(t,{q:()=>c});var n=i(9526),a=i(508),r=i.n(a),l=i(6897),s=i.n(l);const o=e=>Object.entries(e).map((([e,t])=>encodeURIComponent(e)+"="+encodeURIComponent(t))).join("&");function c(e){const t=e=>r()(e,(e=>""+e)),i=(0,n.useCallback)((()=>{const i="function"==typeof e?e():e,n=(a=Object.assign(t(i),(l=document.location.hash)?l.substr(1).split("&").map((e=>{const[t,i]=e.split("=");return[decodeURIComponent(t),decodeURIComponent(i)]})).reduce(((e,[t,i])=>(e[t]=i,e)),{}):{}),r()(a,(e=>"true"===e||"false"!==e&&("NaN"===e?NaN:"undefined"===e?void 0:"null"===e?null:isNaN(+e)?e:+e))));var a,l;return document.location.hash=o(t(n)),n}),[e]),[a,l]=(0,n.useState)(i),c=(0,n.useRef)();return c.current||(c.current=s()((function(e){document.location.hash=o(t(e))}))),c.current(a),(0,n.useEffect)((()=>{const e=()=>{l(i())};return window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}}),[i]),[a,l]}},3680:(e,t,i)=>{"use strict";var n=i(9736),a=i(3805);t.Z=void 0;var r=a(i(9526)),l=(0,n(i(2265)).default)(r.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");t.Z=l},9896:(e,t,i)=>{"use strict";var n=i(9736),a=i(3805);t.Z=void 0;var r=a(i(9526)),l=(0,n(i(2265)).default)(r.createElement("path",{d:"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"}),"LockOpen");t.Z=l}}]);