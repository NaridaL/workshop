"use strict";(self.webpackChunkworkshop=self.webpackChunkworkshop||[]).push([[244],{4230:(e,n,o)=>{o.r(n),o.d(n,{default:()=>u});var t=o(7392),i=o(9526),s=o(2182),l=o(2004);function r(e,n){return null!=e?e:n()}function a(e,n){const o=[];for(let t=0;t<e.length;t++)n(e[t],t,e)&&o.push(t);return o}function c(e,n){return e[0]===n[0]&&e[1]===n[1]||e[0]===n[1]&&e[1]===n[0]}const f=t.$_("orange").gl(),d=t.$_("blue").gl(),g=e=>new Promise(((n,o)=>setTimeout(n,e)));const u=()=>{const e=(0,i.useRef)(null);return(0,i.useEffect)((()=>{const n=l.ZG.create({canvas:e.current});n.addResizeListener(),function(e){const n=(0,s.Nv)(1e3,(()=>s.V3.randomUnit().plus(s.V3.XYZ).times(.5)));(new l.Kj).addIndexBuffer("TRIANGLES").addIndexBuffer("LINES").vertices=n;const o=[];!async function(){let e=(new l.Kj).addIndexBuffer("TRIANGLES").addIndexBuffer("LINES");for(const[t,i]of function*(e){yield["start",{triangles:[]}];const[n,o,t,i]=e,l=[];function r(n,o){const[t,i,s]=l[n].triangle;return function(e,n,o,t){const i=e.to(n).cross(e.to(o));return e.to(t).dot(i)}(e[t],e[i],e[s],o)}let d=0;l.push({triangle:[0,1,2],pointsAboveIndexes:[],fInfex:d++}),l.push({triangle:[1,0,3],pointsAboveIndexes:[],fInfex:d++}),l.push({triangle:[2,1,3],pointsAboveIndexes:[],fInfex:d++}),l.push({triangle:[0,2,3],pointsAboveIndexes:[],fInfex:d++}),console.log("glug",r(0,e[3])),r(0,e[3])>0&&l.forEach((e=>(0,s.qC)(e.triangle,0,1))),yield["selecting first 4 points",{hp:[0,1,2,3]}];for(let n=0;n<4;n++){const o=l.slice(0,n+1).flatMap((e=>e.triangle));yield["creating base tetra",{triangles:o,hf:[n]}];const t=[];for(let o=0;o<e.length;o++)r(n,e[o])>0&&t.push(o);l[n].pointsAboveIndexes=t,yield['finding points "above" facet',{triangles:o,hf:[n],hp:t,hpc:"yes"}]}for(let n=0;n<l.length;n++){const o=l[n];if(console.log("triangle",n,"pointsAbove",o.pointsAboveIndexes.length),yield["finding highest point above facet",{hf:[n],hp:o.pointsAboveIndexes}],0===o.pointsAboveIndexes.length)continue;const t=(0,s.AW)(o.pointsAboveIndexes,(o=>r(n,e[o])));yield["highet point above facet",{hf:[n],hp:[t]}];const i=e[t],g=a(l,((e,n)=>r(n,i)>0));yield["facets visible from highest point",{hf:g,hp:[t]}];const u=[];for(const e of g){const n=e=>{const n=u.findIndex((n=>c(n,e)));-1===n?u.push(e):(0,s.J8)(u,n)};n([l[e].triangle[0],l[e].triangle[1]]),n([l[e].triangle[1],l[e].triangle[2]]),n([l[e].triangle[2],l[e].triangle[0]])}for(const n of u){const o=l.length;l.push({triangle:[t,n[0],n[1]],pointsAboveIndexes:[],fInfex:d++}),l[o].pointsAboveIndexes=(0,s.Tw)(g.flatMap((n=>l[n].pointsAboveIndexes.filter((n=>r(o,e[n])>0))))),yield["creating new facet",{triangles:l.flatMap((e=>e.triangle)),hf:[o]}],yield['finding points "above" new facet',{hf:[o],hp:l[o].pointsAboveIndexes,hpc:"yes"}]}yield["delete old triangles",{hf:g,hfc:f}],console.log("removeIndexes",l.slice(),g),(0,s.hO)(l,g),console.log(l.slice()),n-=g.filter((e=>e<=n)).length,yield["delete old triangles",{triangles:l.flatMap((e=>e.triangle))}],console.log("visibleTriIndexes",g),console.log("facets",l)}return l.flatMap((e=>e.triangle))}(n))i.triangles&&(e=(new l.Kj).addIndexBuffer("TRIANGLES").addIndexBuffer("LINES"),e.vertices=n,e.TRIANGLES=i.triangles,e.computeWireframeFromFlatTriangles(),e.compile()),o.push({mesh:e,description:t,cd:i}),await g(100);console.log("finished doo")}(),console.log(o);let i=0;const u=l.ex.create("\n    uniform mat4 ts_ModelViewProjectionMatrix;\n    attribute vec4 ts_Vertex;\n    uniform float pointSize;\n    varying vec4 foo;\n    void main() {\n      foo = vec4(1.0, 1.0, 1.0, 1.0);\n      gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;\n      gl_PointSize = pointSize;\n    }\n  ","\n    precision highp float;\n    uniform vec4 color;\n    varying vec4 bar;\n    void main() {\n      gl_FragColor = color;\n      if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {\n        discard;\n      }\n    }\n  ");e.clearColor(1,1,1,0),e.cullFace(e.BACK),e.matrixMode(e.PROJECTION),e.loadIdentity(),e.perspective(70,e.canvas.width/e.canvas.height,.1,1e3),e.lookAt((0,s.V)(0,-2,1.5),s.V3.O,s.V3.Z),e.matrixMode(e.MODELVIEW),e.pointSize(10),e.enable(e.CULL_FACE),e.enable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),console.log(e.canvas),e.canvas.contentEditable="true",e.canvas.focus(),e.canvas.onkeydown=function(e){console.log("keydown");const n=(0,s.uZ)(i+("j"===e.key?-1:"k"===e.key?1:0),0,o.length-1);n!==i&&(i=n,console.log(i,o[i].description,o[i].cd))};let p=s.V3.O,h=s.M4.IDENTITY;e.canvas.onmousemove=function(e){console.log("onmousemove");const n=(0,s.V)(e.pageX,e.pageY),o=p.to(n);1&e.buttons&&(h=h.rotateZ(.25*o.x*s.Co),h=h.rotateX(.25*o.y*s.Co)),p=n},e.animate((function(n,s){i+1<o.length&&i++,e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.loadIdentity(),e.multMatrix(h),e.scale(1.5),e.translate(-.5,-.5,-.5);const l=o[i].mesh,a=o[i].cd;e.projectionMatrix.m[11]-=1/(1<<20);for(const n of r(a.hp,(()=>[]))){const o="yes"===a.hpc?"lime":"no"===a.hpc?"red":"blue";u.uniforms({color:t.iv(o).gl(),pointSize:12}).drawBuffers(l.vertexBuffers,void 0,e.POINTS,n,1)}for(const n of r(a.hf,(()=>[])))u.uniforms({color:r(a.hfc,(()=>d))}).draw(l,e.TRIANGLES,3*n,3);e.projectionMatrix.m[11]+=1/(1<<20),u.uniforms({color:t.iv("grey").gl(),pointSize:10}).drawBuffers(l.vertexBuffers,void 0,e.POINTS),u.uniforms({color:[1,1,0,1]}).draw(l,e.LINES),u.uniforms({color:[0,0,0,.5]}).draw(l,e.TRIANGLES)}))}(n)}),[]),i.createElement("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},i.createElement("canvas",{ref:e,style:{flexGrow:1},tabIndex:0}))}}}]);
//# sourceMappingURL=quickhull-index.js.map