/*! For license information please see main.78a5e857bc9053254fd2.bundle.js.LICENSE.txt */
(()=>{var e,t,r,n={12:(e,t,r)=>{"use strict";r.d(t,{sZ:()=>s,Zj:()=>c,CL:()=>i,Pg:()=>a}),r(260);var n=r(232);class o extends Phaser.Scene{constructor(){super({key:"PreloadScene"})}preload(){this.load.image("phaser-logo","assets/img/phaser-logo.png")}create(){return e=this,t=void 0,o=function*(){this.add.image(this.sys.canvas.width/2,this.sys.canvas.height/2,"phaser-logo").setOrigin(.5),setTimeout((()=>{r.e(394).then(r.bind(r,215)).then((e=>{this.scene.add("MainScene",e.default,!0)}))}),1500)},new((n=void 0)||(n=Promise))((function(r,a){function i(e){try{c(o.next(e))}catch(e){a(e)}}function s(e){try{c(o.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((o=o.apply(e,t||[])).next())}));var e,t,n,o}}const a=2560,i=1440;let s=1;const c=2;let d;const l={type:Phaser.AUTO,backgroundColor:"#000000",height:i,width:a,pixelArt:!0,scale:{parent:"game",width:"100%",height:"100%"},scene:[o],physics:{default:"arcade",arcade:{debug:!1}},plugins:{scene:[{key:"rexGestures",plugin:n.Z,mapping:"rexGestures"}]}};window.addEventListener("load",(()=>{const e=new Phaser.Game(l),t=()=>{const{width:t,height:r}={width:window.innerWidth,height:window.innerHeight},n=Math.min(t,a),o=Math.min(r,i);s=Math.max(n/a,o/i),e.scale.resize(n,o);const c=document.getElementById("resize");c&&(c.style.backgroundColor="red",setTimeout((()=>c.style.backgroundColor="white"),3e3));const d=new CustomEvent("game-resize",{detail:{width:n,height:o}});window.dispatchEvent(d)};window.addEventListener("resize",(()=>{window.clearTimeout(d),d=window.setTimeout(t,250)})),t()}))},204:()=>{console.log("%c %c %c %c %c Built using phaser-project-template %c https://github.com/yandeu/phaser-project-template","background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none")}},o={};function a(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={exports:{}};return n[e].call(r.exports,r,r.exports,a),r.exports}a.m=n,e=[],a.O=(t,r,n,o)=>{if(!r){var i=1/0;for(l=0;l<e.length;l++){for(var[r,n,o]=e[l],s=!0,c=0;c<r.length;c++)(!1&o||i>=o)&&Object.keys(a.O).every((e=>a.O[e](r[c])))?r.splice(c--,1):(s=!1,o<i&&(i=o));if(s){e.splice(l--,1);var d=n();void 0!==d&&(t=d)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,n,o]},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[])),a.u=e=>({16:"testScene",394:"mainScene",444:"debugScene"}[e]+"."+{16:"879d3be4778b2ad94fb7",394:"033fc9bdecf2f7d14b3e",444:"fd800b260811d80259c7"}[e]+".chunk.js"),a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},r="phaser-test:",a.l=(e,n,o,i)=>{if(t[e])t[e].push(n);else{var s,c;if(void 0!==o)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var u=d[l];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==r+o){s=u;break}}s||(c=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.setAttribute("data-webpack",r+o),s.src=e),t[e]=[n];var h=(r,n)=>{s.onerror=s.onload=null,clearTimeout(p);var o=t[e];if(delete t[e],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(n))),r)return r(n)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),c&&document.head.appendChild(s)}},a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),(()=>{var e={179:0};a.f.j=(t,r)=>{var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise(((r,o)=>n=e[t]=[r,o]));r.push(n[2]=o);var i=a.p+a.u(t),s=new Error;a.l(i,(r=>{if(a.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,n[1](s)}}),"chunk-"+t,t)}},a.O.j=t=>0===e[t];var t=(t,r)=>{var n,o,[i,s,c]=r,d=0;if(i.some((t=>0!==e[t]))){for(n in s)a.o(s,n)&&(a.m[n]=s[n]);if(c)var l=c(a)}for(t&&t(r);d<i.length;d++)o=i[d],a.o(e,o)&&e[o]&&e[o][0](),e[i[d]]=0;return a.O(l)},r=self.webpackChunkphaser_test=self.webpackChunkphaser_test||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),a.O(void 0,[216],(()=>a(12)));var i=a.O(void 0,[216],(()=>a(204)));i=a.O(i)})();