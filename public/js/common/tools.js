"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function base64_encode(e){var t=0,n=[],o=0,i=0;if(e.length>0)for(;i<e.length;){var s=e.charCodeAt(i++);switch(++t){case 1:n.push(tab[s>>2]),o=3&s,i>=e.length&&(n.push(tab[o<<4]),n.push("=="));break;case 2:n.push(tab[s>>4|o<<4]),o=15&s,i>=e.length&&(n.push(tab[o<<2]),n.push("="));break;case 3:n.push(tab[s>>6|o<<2]),n.push(tab[63&s]),o=0,t=0}}return n.join("")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),tools={animate:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:400,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"ease-out",i=arguments[4];clearInterval(e.timer),n instanceof Function?(i=n,n=400):n instanceof String&&(o=n,n=400),o instanceof Function&&(i=o,o="ease-out");var s=function(t){return"opacity"===t?Math.round(100*tools.getStyle(e,t,"float")):tools.getStyle(e,t)},a=parseFloat(document.documentElement.style.fontSize),r={},c={};Object.keys(t).forEach(function(e){/[^\d^\.]+/gi.test(t[e])?r[e]=t[e].match(/[^\d^\.]+/gi)[0]||"px":r[e]="px",c[e]=s(e)}),Object.keys(t).forEach(function(e){"rem"==r[e]?t[e]=Math.ceil(parseInt(t[e])*a):t[e]=parseInt(t[e])});var l=!0,u={};e.timer=setInterval(function(){Object.keys(t).forEach(function(a){var r,d=0,h=!1,f=s(a)||0,p=0;switch(o){case"ease-out":p=f,r=5*n/400;break;case"linear":p=c[a],r=20*n/400;break;case"ease-in":d=(u[a]||0)+(t[a]-c[a])/n,u[a]=d;break;default:p=f,r=5*n/400}switch("ease-in"!==o&&(d=(t[a]-p)/r,d=d>0?Math.ceil(d):Math.floor(d)),o){case"ease-out":h=f!=t[a];break;case"linear":case"ease-in":h=Math.abs(Math.abs(f)-Math.abs(t[a]))>Math.abs(d);break;default:h=f!=t[a]}h?(l=!1,"opacity"===a?(e.style.filter="alpha(opacity:"+(f+d)+")",e.style.opacity=(f+d)/100):"scrollTop"===a?e.scrollTop=f+d:e.style[a]=f+d+"px"):l=!0,l&&(clearInterval(e.timer),i&&i())})},20)},showBack:function(e){var t,n;document.addEventListener("scroll",function(){i()},!1),document.addEventListener("touchstart",function(){i()},{passive:!0}),document.addEventListener("touchmove",function(){i()},{passive:!0}),document.addEventListener("touchend",function(){n=document.body.scrollTop,o()},{passive:!0});var o=function e(){t=requestAnimationFrame(function(){document.body.scrollTop!=n?(n=document.body.scrollTop,e()):cancelAnimationFrame(t),i()})},i=function(){e(document.body.scrollTop>500?!0:!1)}},loadMore:function(e,t){var n,o,i,s,a,r,c=window.screen.height;document.body.addEventListener("scroll",function(){u()},!1),e.addEventListener("touchstart",function(){n=e.offsetHeight,o=e.offsetTop,i=tools.getStyle(e,"paddingBottom"),s=tools.getStyle(e,"marginBottom")},{passive:!0}),e.addEventListener("touchmove",function(){u()},{passive:!0}),e.addEventListener("touchend",function(){r=document.body.scrollTop,l()},{passive:!0});var l=function t(){a=requestAnimationFrame(function(){document.body.scrollTop!=r?(r=document.body.scrollTop,u(),t()):(cancelAnimationFrame(a),n=e.offsetHeight,u())})},u=function(){document.body.scrollTop+c>=n+o+i+s&&t()}},getStyle:function(e,t){var n,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"int";return n="scrollTop"===t?e.scrollTop:e.currentStyle?e.currentStyle[t]:document.defaultView.getComputedStyle(e,null)[t],"float"==o?parseFloat(n):parseInt(n)},getUrlKey:function(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.href)||[,""])[1].replace(/\+/g,"%20"))||null},ajaxGet:function(e,t,n){jAjax({type:"get",url:e,timeOut:5e3,before:function(){n&&n()},success:function(e){e&&(e=JSON.parse(e),200==parseInt(e.code)?t(e):console.log("false"))},error:function(){console.log("error")}})}},_util={debounce:function(e,t){var n=this,o=arguments,i=void 0;return function(){clearTimeout(i),i=setTimeout(function(){e.apply(n,o)},t)}},getPicInfo:function(e){var t=e.src||"",n=e.fastCallback,o=e.loadedCallback,i=e.errorCallback,s=new Image,a={isError:!1,width:0,height:0},r=function(){(a.isError||s.width>0||s.height>0)&&(clearInterval(c),a.width=s.width,a.height=s.height,n&&n(a))},c=void 0;s.src=t,s.addEventListener("error",function(e){a.isError=!0,i&&i(a)},!1),s.complete?(a.width=s.width,a.height=s.height,n&&n(a),o&&o(a)):(s.addEventListener("load",function(){a.width=s.width,a.height=s.height,o&&o(a)},!1),c=setInterval(r,50))}},VueViewload=function(){function e(t){_classCallCheck(this,e),this.emptyPic="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",this.defaultPic=t&&t.defaultPic||this.emptyPic,this.errorPic=t&&t.errorPic||this.emptyPic,this.container=t&&t.container||window,this.threshold=t&&parseInt(t.threshold,10)||0,this.effectFadeIn=t&&t.effectFadeIn||!1,this.callback=t&&t.callback||new Function,this.selector=t&&t.selector||[],this.event=["scroll","resize"],this.status=["loading","loaded","error"],this.delayRender=_util.debounce(this.render.bind(this),200)}return _createClass(e,[{key:"inView",value:function(e){var t=!1,n=e.getBoundingClientRect(),o=this.container==window?{left:0,top:0}:this.container.getBoundingClientRect(),i=this.container==window?window.innerWidth:this.container.clientWidth,s=this.container==window?window.innerHeight:this.container.clientHeight;return n.bottom>this.threshold+o.top&&n.top+this.threshold<s+o.top&&n.right>this.threshold+o.left&&n.left+this.threshold<i+o.left&&(t=!0),t}},{key:"bindUI",value:function(){var e=this;this.event.forEach(function(t,n){e.container.addEventListener(t,e.delayRender,!1),e.container!==window&&"resize"==t&&window.addEventListener(t,e.delayRender,!1)})}},{key:"unbindUI",value:function(){var e=this;this.event.forEach(function(t,n){e.container.removeEventListener(t,e.delayRender,!1),e.container!==window&&"resize"==t&&window.removeEventListener(t,e.delayRender,!1)})}},{key:"render",value:function(){var e=this;this.isLoadEvent||(this.isLoadEvent=!0,this.bindUI()),this.selector.length||this.unbindUI();for(var t=0;t<this.selector.length;t++){(function(n){var o=e.selector[n],i=o.ele.nodeName.toLowerCase();if("none"==getComputedStyle(o.ele,null).display)return e.selector.splice(n--,1),"continue";"img"==i&&(o.ele.getAttribute("data-src")||(o.ele.setAttribute("data-src",o.src),o.ele.setAttribute("data-status",e.status[0])),o.ele.getAttribute("src")||o.ele.setAttribute("src",e.defaultPic)),e.inView(o.ele)&&("img"==i?(_util.getPicInfo({src:o.src,errorCallback:function(t){o.ele.src=e.errorPic,o.ele.setAttribute("data-status",e.status[2])},loadedCallback:function(t){e.effectFadeIn&&(o.ele.style.opacity=0),o.ele.src=t.isError?e.errorPic:o.src,o.ele.removeAttribute("data-src"),o.ele.setAttribute("data-status",e.status[1]),setTimeout(function(){o.ele.style.opacity=1,o.ele.style.transition="all 1s"},50)}}),e.callback(o.ele,o.src)):"function"==typeof o.src&&o.src.call(o.ele),e.selector.splice(n--,1)),t=n})(t)}}}]),e}();Vue.directive("view",{bind:function(e,t){var n={},o={},i=void 0,s=void 0==t.arg?"window":t.arg;void 0==n[s]&&(n[s]=[]),n[s].push({ele:e,src:t.value}),Vue.nextTick(function(){void 0===i&&(i=_util.debounce(function(){for(var e in n)o.container="window"==e?window:document.getElementById(e),o.selector=n[e],new VueViewload(o).render()},200)),i()})}});var pop_html='<div class="alet_container"><section class="tip_text_container"><div class="tip_text">{{ msg }}</div></section></div>';Vue.component("pop",{template:pop_html,data:function(){return{positionY:0,timer:null}},props:["msg"],methods:{close:function(){this.$emit("close")}}});var confirm_html='<div class="confirm-container"><section class="inner"><div class="confirm-text">{{ msg }}</div><div class="confirm-btn"><a href="javascript:;" class="cancel" @click="no()">取消</a><a href="javascript:;" class="ok" @click="ok()">确定</a></div></section></div>';Vue.component("confirm",{template:confirm_html,data:function(){return{positionY:0,timer:null}},props:["msg","callback","obj"],methods:{no:function(){this.$emit("no")},ok:function(){this.$emit("ok",this.callback,this.obj)}}});var post_html='<span class="post-container"><span class="post-inner" v-if="postProcess">{{ txt }}...</span><span class="post-inner" @click="sub()" v-else>{{ txt }}</span></span>';Vue.component("subpost",{template:post_html,props:{txt:{type:String,default:""}},data:function(){return{postProcess:!1}},mounted:function(){},methods:{sub:function(){this.$emit("callback")},post:function(e,t){var n=this;jAjax({type:"post",url:e,data:t,timeOut:5e3,before:function(){n.postProcess=!0},success:function(e){e&&(e=JSON.parse(e),parseInt(e.code),n.$emit("succhandle",e)),n.postProcess=!1},error:function(e,t){n.postProcess=!1}})}}});