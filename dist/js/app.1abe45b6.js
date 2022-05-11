(function(t){function e(e){for(var r,o,a=e[0],c=e[1],u=e[2],p=0,f=[];p<a.length;p++)o=a[p],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(r=!1)}r&&(s.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},i={app:0},s=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/turbocodes/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"col p-5"},[n("h1",[t._v("convolutional Codes")]),n("div",{staticClass:"row mt-5"},[t._m(0),n("div",{staticClass:"col"},[n("b-form-input",{attrs:{placeholder:"enter source bits"},model:{value:t.source,callback:function(e){t.source=e},expression:"source"}})],1)]),n("div",{staticClass:"row"},[n("TurboEncoder",{attrs:{source:t.source},on:{encoded:t.set_encoded,trellis:t.set_trellis}}),n("BinarySymmetricChannel",{attrs:{f:t.flip_probability,input:t.encoded},on:{"update:f":function(e){t.flip_probability=e},received:t.set_received}}),n("TurboDecoder",{attrs:{input:t.received,source:t.source,trellis:t.trellis,f:t.flip_probability},on:{decoded:t.set_decoded}})],1)])])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-2"},[n("label",{attrs:{for:"source"}},[t._v("source:")])])}],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-6 mt-3"},[n("b-card",[n("b-card-header",[n("h4",[t._v("Encoder")])]),n("b-card-body",[n("convcode",{attrs:{source:t.source},on:{encoded:function(e){return t.$emit("encoded",e)},trellis:function(e){return t.$emit("trellis",e)}}})],1)],1)],1)},a=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("div",{staticClass:"row p-2"},[t._m(0),n("div",{staticClass:"col"},[n("b-form-select",{attrs:{id:"encoder-type",options:t.types},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}})],1)]),n("div",{staticClass:"row p-2"},[t._m(1),n("div",{staticClass:"col"},[n("b-form-input",{attrs:{id:"taptext0",placeholder:"enter tap bits"},model:{value:t.taptext0,callback:function(e){t.taptext0=e},expression:"taptext0"}})],1)]),"sysnonrec"!==t.type?n("div",{staticClass:"row p-2"},[t._m(2),n("div",{staticClass:"col"},[n("b-form-input",{attrs:{id:"taptext1",placeholder:"enter tap bits"},model:{value:t.taptext1,callback:function(e){t.taptext1=e},expression:"taptext1"}})],1)]):t._e(),n("div",{staticClass:"row p-2"},[n("div",{staticClass:"col-2"},[t.output?n("label",{attrs:{for:"encoded"}},[t._v(" Encoded: ")]):t._e()]),n("div",{staticClass:"col"},[t.output?n("p",{attrs:{id:"encoded"}},[t._v(t._s(t.boolArrToStr(t.output[0]))+"  "+t._s(t.boolArrToStr(t.output[1])))]):t._e()])])]),n("div",{staticClass:"col-12"})])},u=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-2"},[n("label",{attrs:{for:"encoder-type"}},[t._v(" Code type: ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-2"},[n("label",{attrs:{for:"taptext0"}},[t._v(" Tap A: ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-2"},[n("label",{attrs:{for:"taptext1"}},[t._v(" Tap B: ")])])}],l=n("53ca"),p=(n("d81d"),n("cb29"),n("d3b7"),n("159b"),n("b64b"),n("99af"),n("fb6a"),n("ac1f"),n("1276"),n("a15b"),n("e9c4"),n("07ac"),n("2909")),f=n("d4ec"),h=n("bee2"),d=(n("25f0"),n("4e82"),n("4de4"),function(){function t(e,n,r,i){Object(f["a"])(this,t),this.u=e,this.x=n,this.from=r,this.to=i,this.from.addOutgoing(this),this.to.addIncoming(this),this.color="black",this.log_g=0}return Object(h["a"])(t,[{key:"time",get:function(){return this.from.time+""+this.to.time}},{key:"toString",value:function(){var t={from:this.from.toString(),to:this.to.toString(),u:this.u,x:this.x};return JSON.stringify(t)}}]),t}()),m=function(){function t(e,n){Object(f["a"])(this,t),this.time=e,this.state=n,this.incoming=[],this.outgoing=[]}return Object(h["a"])(t,[{key:"addIncoming",value:function(t){this.incoming.push(t)}},{key:"addOutgoing",value:function(t){this.outgoing.push(t)}},{key:"toString",value:function(){var t={time:this.time,state:this.state};return JSON.stringify(t)}}]),t}(),v=Object(h["a"])((function t(e,n){Object(f["a"])(this,t),this.nodes=e,this.edges=n;var r={};this.edges.forEach((function(t){r[t.time]=null}));var i={};this.nodes.forEach((function(t){i[t.time]=null})),this.times=Object.keys(i),this.edge_times=Object.keys(r);var s={},o={};this.times.forEach((function(t){s[t]=[],o[t]=0})),this.nodes.forEach((function(t){s[t.time].push(t),o[t.time]+=1})),this.nodes_per_time=s,this.time_widths=o,this.maximal_width=Math.max.apply(Math,Object(p["a"])(Object.values(o)))}));function b(t,e,n,r){var i=t.u;i=i>0?1:-1;var s=-Math.log(1+Math.exp(e*-i)),o=Math.log(1);Object.keys(n).forEach((function(e){n[e]===t.x[e]?o+=Math.log(1-r):o+=Math.log(r)}));var a=s+o;return t.log_g=a,a}function g(t,e,n){var r={},i={};t.forEach((function(e){if(e===t[0])r[e]=0,i[e]=[];else{var s=e.incoming[0];e.incoming.forEach((function(t){n[t]+r[t.from]<n[s]+r[s.from]&&(s=t)})),r[e]=n[s]+r[s.from],i[e]=[].concat(Object(p["a"])(i[s.from]),[s])}}));var s=t[t.length-1];return{min_cost:r[s],best_path:i[s]}}function y(t,e,n,r){var i=t.nodes,s=t.edges;i.sort((function(t,e){return t.time===e.time?t.state>e.state:t.time>e.time}));var o={};s.forEach((function(t){var i=b(t,n[t.time],e[t.time],r);o[t]=-i}));var a=g(i,s,o);return a}var _=function(t,e){return t.map((function(t,n){return[t,e[n]]}))},x={name:"convcode",props:{source:String},data:function(){return{type:"sysnonrec",types:["sysnonrec","nonsysnonrec","sysrec"],taptext0:"",taptext1:"",received:"",flip_probability:.05}},computed:{sourcetext:function(){return this.source},memlenght:function(){return this.taps?this.taps[0].length:0},output:function(){var t=this;if(this.input&&this.taps){var e=Array(this.memlenght).fill(0),n=Array(),r=Array();return this.input.forEach((function(i){var s=t.step(e,i);n.push(s.ta),r.push(s.tb)})),this.terminate(e,n,r),[n,r]}return null},encoded:function(){var t=this;if(this.output){var e="";return Object.keys(this.output[0]).forEach((function(n){e+=t.output[0][n],e+=t.output[1][n]})),e}return null},taps:function(){return this.taptext0||this.taptext1?[this.stringToBoolArr(this.taptext0),this.stringToBoolArr(this.taptext1)]:null},input:function(){return this.sourcetext?this.stringToBoolArr(this.sourcetext):null},trellis:function(){return this.newGetTrellis()}},methods:{step:function(t,e){switch(this.type){case"sysnonrec":return this.stepSysNonRec(t,e);case"nonsysnonrec":return this.stepNonSysNonRec(t,e);case"sysrec":return this.stepSysRec(t,e)}},stepSysNonRec:function(t,e){return t.push(e),t.shift(),{ta:e,tb:this.applyTap(this.taps[0],t)}},stepNonSysNonRec:function(t,e){return t.push(e),t.shift(),{ta:this.applyTap(this.taps[0],t),tb:this.applyTap(this.taps[1],t)}},stepSysRec:function(t,e){return t.shift(),t.push(this.applyTap(this.taps[0],t.concat([e]))),{ta:e,mem:t,tb:this.applyTap(this.taps[1],t)}},terminate:function(t,e,n){for(var r=0;r<t.length;r++){var i=0;if("sysrec"==this.type)var s=this.applyTap(this.taps[0],t.slice(1).concat([s]));var o=this.step(t,i);e.push(o.ta),n.push(o.tb)}},applyTap:function(t,e){return _(t,e).map((function(t){return t[0]&t[1]})).reduce((function(t,e){return t+e}),0)%2},stringToBoolArr:function(t){return t.split("").map((function(t){return parseInt(t)}))},boolArrToStr:function(t){return t.map((function(t){return t?"1":"0"})).join("")},getTrellisDict:function(){for(var t={},e=0;e<Math.pow(2,this.memlenght);e++){for(var n=e,r=[],i=0;i<this.memlenght;i++)r.push(1&n),n>>=1;t[r]={},t[r].one={u:1},t[r].zero={u:0};var s=r.slice();t[r].zero.x=this.step(s,0),t[r].zero.nextmem=s,s=r.slice(),t[r].one.x=this.step(s,1),t[r].one.nextmem=s}return t},getTrellis:function(){var t=this,e=[],n=this.getTrellisDict(),r={},i=Array(this.memlenght).fill(0);r[i]=i;for(var s=function(i){var s={},o=JSON.parse(JSON.stringify(n)),a={};Object.values(r).forEach((function(e){s[e]=o[e],i>=t.output[0].length-t.memlenght&&(s[e].one.nextmem.slice(-1)?delete s[e].one:delete s[e].zero),"one"in s[e]&&(a[s[e].one.nextmem]=s[e].one.nextmem),"zero"in s[e]&&(a[s[e].zero.nextmem]=s[e].zero.nextmem)})),r=a,e.push(s)},o=0;o<this.output[0].length;o++)s(o)},newGetTrellis:function(){var t=this;if(this.taps&&this.output){var e=function(){var e=[],n=t.getTrellisDict();e[0]=[new m(0,Array(t.memlenght+1).join("0"))];for(var r=[],i=function(i){var s={};e[i].forEach((function(e){var o=n[t.stringToBoolArr(e.state)],a=[];a=i>=t.output[0].length-t.memlenght?o.one.nextmem.slice(-1)[0]?[o.zero]:[o.one]:[o.one,o.zero],a.forEach((function(n){n.nextmem in s||(s[n.nextmem]=new m(i+1,t.boolArrToStr(n.nextmem))),r.push(new d(n.u,n.x.ta+""+n.x.tb,e,s[n.nextmem]))}))})),e.push(Object.values(s))},s=0;s<t.output[0].length;s++)i(s);return{v:new v([].concat.apply([],e),r)}}();if("object"===Object(l["a"])(e))return e.v}return null}},watch:{encoded:function(t){this.$emit("encoded",t)},trellis:function(t){this.$emit("trellis",t)}}},w=x,O=n("2877"),j=Object(O["a"])(w,c,u,!1,null,"11d3dfa6",null),C=j.exports,T={name:"TurboEncoder",props:{source:String},components:{convcode:C}},S=T,E=Object(O["a"])(S,o,a,!1,null,"146ffa66",null),k=E.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-12 mt-3"},[n("b-card",[n("b-card-header",[n("h4",[t._v("Decoder")])]),n("b-card-body",[t._v(" decoded: "),n("errordisplayer",{attrs:{source:t.source,decoded:t.result}}),n("trellis",{attrs:{trellis:t.trellis}})],1)],1)],1)},A=[],N=(n("a9e3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col",staticStyle:{"max-width":"100%",overflow:"scroll"}},[t.trellis?n("svg",{attrs:{height:t.svgHeight+"px",width:t.svgWidth+"px"}},[t._l(t.trellis.edges,(function(e,r){return n("line",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],key:r+"edge",attrs:{title:t.edgeInfo(e),x1:t.nodeX(e.from),y1:t.nodeY(e.from),x2:t.nodeX(e.to),y2:t.nodeY(e.to),stroke:e.color,"stroke-width":"5"}})})),t._l(t.trellis.nodes,(function(e,r){return n("circle",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],key:r+"node",attrs:{title:t.nodeInfo(e),cx:t.nodeX(e),cy:t.nodeY(e),r:"10",stroke:"black","stroke-width":"4",fill:"white"}})}))],2):t._e()])}),M=[],B={data:function(){return{offset:50,timestep:100,heightstep:50}},props:{trellis:v},computed:{svgHeight:function(){var t=Math.pow(2,this.trellis.nodes[0].state.length);return(t-1)*this.heightstep+2*this.offset},svgWidth:function(){var t=this.trellis.times.length;return(t-1)*this.timestep+2*this.offset}},methods:{stateToInt:function(t){return parseInt(t,2)},nodeY:function(t){var e=this.stateToInt(t.state);return this.svgHeight-(e*this.heightstep+this.offset)},nodeX:function(t){var e=t.time;return e*this.timestep+this.offset},edgeInfo:function(t){return"input: ".concat(t.u,"\noutput: ").concat(t.x," logprob: ").concat(t.log_g)},nodeInfo:function(t){return"state: ".concat(t.state,"\ntime: ").concat(t.time)}}},I=B,z=Object(O["a"])(I,N,M,!1,null,"3f9bd6eb",null),D=z.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-12 mt-3"},t._l(t.perbit,(function(e,r){return n("span",{key:r,style:e.style},[t._v(t._s(e.bit))])})),0)},R=[],J={name:"errordisplayer",props:{source:String,decoded:String},computed:{perbit:function(){for(var t=this.source.split(""),e=this.decoded.split(""),n=Array(t.length),r=0;r<t.length;r++)n[r]={bit:this.decoded[r],style:t[r]==e[r]?{}:{backgroundColor:"#ff0000"}};return n}}},X=J,Y=Object(O["a"])(X,P,R,!1,null,"4ff50f61",null),H=Y.exports,q={name:"TurboDecoder",props:{trellis:v,input:String,f:Number,source:String},components:{trellis:D,errordisplayer:H},computed:{result:function(){if(console.log(this.input),this.input&&this.trellis){for(var t={},e={},n=0;n<this.input.length/2;n++)t[n+""+(n+1)]=0,e[n+""+(n+1)]=this.input.slice(2*n,2*(n+1));var r=y(this.trellis,e,t,this.f);return this.trellis.edges.map((function(t){return t.color="black"})),r.best_path.map((function(t){return t.color="red"})),r.best_path.map((function(t){return t.u})).join("")}return""}}},G=q,W=Object(O["a"])(G,$,A,!1,null,"66ff6930",null),F=W.exports,K=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-6 mt-3"},[n("b-card",[n("b-card-header",[n("h4",[t._v("Binary Symmetric Channel")])]),n("b-card-body",[n("div",{staticClass:"m-2"},[n("p",{staticClass:"m-0"},[n("label",{attrs:{for:"range-f"}},[t._v("bit flip probability "+t._s(t.f))])]),n("b-form-input",{staticClass:"mw-100",attrs:{id:"range-f",value:t.f,type:"range",min:"0",max:"1",step:"0.0001"},on:{input:function(e){t.$emit("update:f",Number(e))}}})],1),n("p",[t._v("Transmitted: "+t._s(t.input))]),n("p",[t._v("Received: "+t._s(t.received_signal))])])],1)],1)},L=[],Q=(n("caad"),{name:"BinarySymmetricChannel",props:{f:{type:Number,required:!0},input:{type:String,required:!1,validator:function(t){for(var e=!0,n=0;n<t.length;n++)e=e&&["0","1"].includes(t[n]);return e}}},methods:{pass_through_channel:function(){var t=this;if(this.input){var e=this.input,n=[];return e.split("").forEach((function(e){Math.random()<=t.f?n.push(t.flip(e)):n.push(e)})),n}return null},flip:function(t){return"0"===t?"1":"0"}},computed:{received_signal:function(){var t=this.pass_through_channel();if(t){var e="";return t.forEach((function(t){e+=t})),e}return null}},watch:{received_signal:function(t){this.$emit("received",t)}}}),U=Q,V=Object(O["a"])(U,K,L,!1,null,"51478cc9",null),Z=V.exports,tt={name:"App",data:function(){return{source:"",encoded:"",received:"",decoded:"",trellis:null,flip_probability:.05}},methods:{set_received:function(t){this.received=t},set_encoded:function(t){this.encoded=t},set_decoded:function(t){this.decoded=t},set_trellis:function(t){this.trellis=t}},components:{TurboEncoder:k,TurboDecoder:F,BinarySymmetricChannel:Z}},et=tt,nt=(n("034f"),Object(O["a"])(et,i,s,!1,null,null,null)),rt=nt.exports,it=n("5f5b"),st=n("b1e0");n("f9e3"),n("2dd8");r["default"].config.productionTip=!1,r["default"].use(it["a"]),r["default"].use(st["a"]),new r["default"]({render:function(t){return t(rt)}}).$mount("#app")},"85ec":function(t,e,n){}});
//# sourceMappingURL=app.1abe45b6.js.map