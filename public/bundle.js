!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r,a=(r=n(1))&&r.__esModule?r:{default:r};var o,c,u,i,l,d={x:4,y:9},m={x:4,y:8},s={x:0,y:0},f=[],y=[];function g(e,t){return e==s.x&&t==s.y||e==d.x&&t==d.y||e==m.x&&t==m.y||e==d.x-1&&t==d.y||null!=y.find((function(n){return JSON.stringify(n)===JSON.stringify({x:e,y:t})}))||null!=f.find((function(n){return JSON.stringify(n)===JSON.stringify({x:e,y:t})}))}function p(){if(0!=c.length){document.getElementById("".concat(s.x," ").concat(s.y)).innerHTML="",s.x=c[0][0],s.y=c[0][1],console.log(c.shift(),s);var e=document.getElementById("".concat(s.x," ").concat(s.y)),t=document.createElement("img");t.setAttribute("src","img/marioRunner.gif"),t.setAttribute("class","imgBox"),e.append(t),setTimeout(p,500)}}a.default.drawScreen(),a.default.drawMario(s),a.default.drawPrincess(d),a.default.drawDonkey(m),function(){for(var e=0;e<4;e++)for(var t=parseInt(1+2*Math.random()),n=0;n<t;n++){var r=parseInt(10*Math.random());g(e,r)?n--:y[y.length]={x:e,y:r}}for(var a=0;a<4;a++){var c=parseInt(5*Math.random()),u=parseInt(10*Math.random());g(c,u)?a--:f[f.length]={x:c,y:u}}for(var i=0;i<1;i++){var l=parseInt(5*Math.random()),d=parseInt(10*Math.random());g(l,d)?i--:o={x:l,y:d}}}(),a.default.drawHammer(o),a.default.drawLadder(y),a.default.drawBarrel(f),u=document.getElementById("edge"),i=document.createElement("div"),(l=document.createElement("img")).setAttribute("src","img/marioHammer.gif"),l.setAttribute("class","imgBox"),i.setAttribute("class","animate"),i.append(l),u.append(i),document.getElementById("generateMap").onclick=function(){return location.reload()},document.getElementById("generatePath").onclick=function(){document.querySelector("audio").play();var e=pl.create();e.consult("prolog.pl"),e.query("main([0,0], ".concat(JSON.stringify(y.map((function(e){return[e.x,e.y]}))),", [").concat(o.x,",").concat(o.y,"],[4,9], Solucao).")),e.answer((function(e){var t=e.toString().replace("Solucao/",'"path":');c=JSON.parse(t).path})),c.reverse(),console.log(c),p()}},function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,a;return t=e,a=[{key:"drawScreen",value:function(){for(var e=4;e>=0;e--){for(var t=document.createElement("tr"),n=0;n<10;n++){var r=document.createElement("td");r.setAttribute("id","".concat(e," ").concat(n)),r.setAttribute("class","tabuleiro"),t.append(r)}document.querySelector("#table").append(t)}}},{key:"drawMario",value:function(e){var t=document.getElementById("".concat(e.x," ").concat(e.y)),n=document.createElement("img");n.setAttribute("src","img/mario.png"),n.setAttribute("class","imgBox"),t.append(n)}},{key:"drawPrincess",value:function(e){var t=document.getElementById("".concat(e.x," ").concat(e.y)),n=document.createElement("img");n.setAttribute("src","img/peach.gif"),n.setAttribute("class","imgBox"),t.append(n)}},{key:"drawDonkey",value:function(e){var t=document.getElementById("".concat(e.x," ").concat(e.y)),n=document.createElement("img");n.setAttribute("src","img/donkey_kong.webp"),n.setAttribute("class","imgBox"),t.append(n)}},{key:"drawLadder",value:function(e){for(var t=0;t<e.length;t++){var n=document.getElementById("".concat(e[t].x," ").concat(e[t].y)),r=document.createElement("img");r.setAttribute("src","img/ladder.png"),r.setAttribute("class","ladder"),n.append(r)}}},{key:"drawHammer",value:function(e){var t=document.getElementById("".concat(e.x," ").concat(e.y)),n=document.createElement("img");n.setAttribute("src","img/hammer.png"),n.setAttribute("class","imgBox"),t.append(n)}},{key:"drawBarrel",value:function(e){for(var t=0;t<e.length;t++){var n=document.getElementById("".concat(e[t].x," ").concat(e[t].y)),r=document.createElement("img");r.setAttribute("src","img/barrel.png"),r.setAttribute("class","imgBox"),n.append(r)}}}],(n=null)&&r(t.prototype,n),a&&r(t,a),e}();t.default=a}]);