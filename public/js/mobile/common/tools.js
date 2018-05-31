"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function base64_encode(e){var t=0,n=[],o=0,i=0;if(e.length>0)for(;i<e.length;){var r=e.charCodeAt(i++);switch(++t){case 1:n.push(tab[r>>2]),o=3&r,i>=e.length&&(n.push(tab[o<<4]),n.push("=="));break;case 2:n.push(tab[r>>4|o<<4]),o=15&r,i>=e.length&&(n.push(tab[o<<2]),n.push("="));break;case 3:n.push(tab[r>>6|o<<2]),n.push(tab[63&r]),o=0,t=0}}return n.join("")}function EventTarget(){this.handlers={}}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),tools={animate:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:400,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"ease-out",i=arguments[4];clearInterval(e.timer),n instanceof Function?(i=n,n=400):n instanceof String&&(o=n,n=400),o instanceof Function&&(i=o,o="ease-out");var r=function(t){return"opacity"===t?Math.round(100*tools.getStyle(e,t,"float")):tools.getStyle(e,t)},s=parseFloat(document.documentElement.style.fontSize),a={},c={};Object.keys(t).forEach(function(e){/[^\d^\.]+/gi.test(t[e])?a[e]=t[e].match(/[^\d^\.]+/gi)[0]||"px":a[e]="px",c[e]=r(e)}),Object.keys(t).forEach(function(e){"rem"==a[e]?t[e]=Math.ceil(parseInt(t[e])*s):t[e]=parseInt(t[e])});var l=!0,u={};e.timer=setInterval(function(){Object.keys(t).forEach(function(s){var a,d=0,h=!1,m=r(s)||0,v=0;switch(o){case"ease-out":v=m,a=5*n/400;break;case"linear":v=c[s],a=20*n/400;break;case"ease-in":d=(u[s]||0)+(t[s]-c[s])/n,u[s]=d;break;default:v=m,a=5*n/400}switch("ease-in"!==o&&(d=(t[s]-v)/a,d=d>0?Math.ceil(d):Math.floor(d)),o){case"ease-out":h=m!=t[s];break;case"linear":case"ease-in":h=Math.abs(Math.abs(m)-Math.abs(t[s]))>Math.abs(d);break;default:h=m!=t[s]}h?(l=!1,"opacity"===s?(e.style.filter="alpha(opacity:"+(m+d)+")",e.style.opacity=(m+d)/100):"scrollTop"===s?(e.documentElement.scrollTop=m+d,e.body.scrollTop=m+d):e.style[s]=m+d+"px"):l=!0,l&&(clearInterval(e.timer),i&&i())})},20)},showBack:function(e){var t,n;document.addEventListener("scroll",function(){i()},!1),document.addEventListener("touchstart",function(){i()},{passive:!0}),document.addEventListener("touchmove",function(){i()},{passive:!0}),document.addEventListener("touchend",function(){n=document.body.scrollTop,o()},{passive:!0});var o=function e(){t=requestAnimationFrame(function(){document.body.scrollTop!=n?(n=document.body.scrollTop,e()):cancelAnimationFrame(t),i()})},i=function(){e(document.body.scrollTop>500?!0:!1)}},loadMore:function(e,t){var n,o,i,r,s,a,c=window.screen.height;document.body.addEventListener("scroll",function(){u()},!1),e.addEventListener("touchstart",function(){n=e.offsetHeight,o=e.offsetTop,i=tools.getStyle(e,"paddingBottom"),r=tools.getStyle(e,"marginBottom")},{passive:!0}),e.addEventListener("touchmove",function(){u()},{passive:!0}),e.addEventListener("touchend",function(){a=document.body.scrollTop,l()},{passive:!0});var l=function t(){s=requestAnimationFrame(function(){document.body.scrollTop!=a?(a=document.body.scrollTop,u(),t()):(cancelAnimationFrame(s),n=e.offsetHeight,u())})},u=function(){document.body.scrollTop+c>=n+o+i+r&&t()}},getStyle:function(e,t){var n,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"int";return n="scrollTop"===t?e.documentElement.scrollTop||e.body.scrollTop:e.currentStyle?e.currentStyle[t]:document.defaultView.getComputedStyle(e,null)[t],"float"==o?parseFloat(n):parseInt(n)},getUrlKey:function(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.href)||[,""])[1].replace(/\+/g,"%20"))||null},ajaxGet:function(e,t,n,o){jAjax({type:"get",url:e,timeOut:5e3,before:function(){n&&n()},success:function(e){e&&(e=JSON.parse(e),200==parseInt(e.code)&&t?t(e):console.log("false"))},error:function(){o&&o()}})},ajaxPost:function(e,t,n,o,i,r,s,a){var c=5e3;a||(c=6e4),jAjax({type:"post",url:e,data:t||{},timeOut:c,contentType:a,before:function(){o&&o()},success:function(e){e&&(e=JSON.parse(e),200==parseInt(e.code)&&n&&n(e,r),e.message&&null!==e.message&&""!==e.message&&s&&s(e),e.url&&(location.href=e.url))},error:function(e,t){i&&i()}})},getScrollTop:function(){var e=0,t=0;return document.body&&(e=document.body.scrollTop),document.documentElement&&(t=document.documentElement.scrollTop),e-t>0?e:t},getScrollHeight:function(){var e=0,t=0;return document.body&&(e=document.body.scrollHeight),document.documentElement&&(t=document.documentElement.scrollHeight),e-t>0?e:t},getWindowHeight:function(){return"CSS1Compat"==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight}};EventTarget.prototype={constructor:EventTarget,addEvent:function(e,t){void 0===this.handlers[e]&&(this.handlers[e]=[]),this.handlers[e].push(t)},fireEvent:function(e){if(e.target||(e.target=this),this.handlers[e.type]instanceof Array)for(var t=this.handlers[e.type],n=0;n<t.length;n++)t[n](e)},removeEvent:function(e,t){if(this.handlers[e]instanceof Array){for(var n=this.handlers[e],o=0;o<n.length&&n[o]!=t;o++);n.splice(o,1)}}};var def_target=new EventTarget,_util={debounce:function(e,t){var n=this,o=arguments,i=void 0;return function(){clearTimeout(i),i=setTimeout(function(){e.apply(n,o)},t)}},getPicInfo:function(e){var t=e.src||"",n=e.fastCallback,o=e.loadedCallback,i=e.errorCallback,r=new Image,s={isError:!1,width:0,height:0},a=function(){(s.isError||r.width>0||r.height>0)&&(clearInterval(c),s.width=r.width,s.height=r.height,n&&n(s))},c=void 0;r.src=t,r.addEventListener("error",function(e){s.isError=!0,i&&i(s)},!1),r.complete?(s.width=r.width,s.height=r.height,n&&n(s),o&&o(s)):(r.addEventListener("load",function(){s.width=r.width,s.height=r.height,o&&o(s)},!1),c=setInterval(a,50))}},VueViewload=function(){function e(t){_classCallCheck(this,e),this.emptyPic="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",this.defaultPic=t&&t.defaultPic||this.emptyPic,this.errorPic=t&&t.errorPic||this.emptyPic,this.container=t&&t.container||window,this.threshold=t&&parseInt(t.threshold,10)||0,this.effectFadeIn=t&&t.effectFadeIn||!1,this.callback=t&&t.callback||new Function,this.selector=t&&t.selector||[],this.event=["scroll","resize"],this.status=["loading","loaded","error"],this.delayRender=_util.debounce(this.render.bind(this),200)}return _createClass(e,[{key:"inView",value:function(e){var t=!1,n=e.getBoundingClientRect(),o=this.container==window?{left:0,top:0}:this.container.getBoundingClientRect(),i=this.container==window?window.innerWidth:this.container.clientWidth,r=this.container==window?window.innerHeight:this.container.clientHeight;return n.bottom>this.threshold+o.top&&n.top+this.threshold<r+o.top&&n.right>this.threshold+o.left&&n.left+this.threshold<i+o.left&&(t=!0),t}},{key:"bindUI",value:function(){var e=this;this.event.forEach(function(t,n){e.container.addEventListener(t,e.delayRender,!1),e.container!==window&&"resize"==t&&window.addEventListener(t,e.delayRender,!1)}),def_target.addEvent("slide",this.delayRender)}},{key:"unbindUI",value:function(){var e=this;this.event.forEach(function(t,n){e.container.removeEventListener(t,e.delayRender,!1),e.container!==window&&"resize"==t&&window.removeEventListener(t,e.delayRender,!1)}),def_target.removeEvent("slide",this.delayRender)}},{key:"render",value:function(){var e=this;this.isLoadEvent||(this.isLoadEvent=!0,this.bindUI()),this.selector.length||this.unbindUI();for(var t=0;t<this.selector.length;t++){(function(n){var o=e.selector[n],i=o.ele.nodeName.toLowerCase();if("none"==getComputedStyle(o.ele,null).display)return e.selector.splice(n--,1),"continue";"img"==i&&(o.ele.getAttribute("data-src")||(o.ele.setAttribute("data-src",o.src),o.ele.setAttribute("data-status",e.status[0])),o.ele.getAttribute("src")||o.ele.setAttribute("src",e.defaultPic)),e.inView(o.ele)&&("img"==i?(_util.getPicInfo({src:o.src,errorCallback:function(t){o.ele.src=e.errorPic,o.ele.setAttribute("data-status",e.status[2])},loadedCallback:function(t){e.effectFadeIn&&(o.ele.style.opacity=0),o.ele.src=t.isError?e.errorPic:o.src,o.ele.removeAttribute("data-src"),o.ele.setAttribute("data-status",e.status[1]),setTimeout(function(){o.ele.style.opacity=1,o.ele.style.transition="all 1s"},50)}}),e.callback(o.ele,o.src)):"function"==typeof o.src&&o.src.call(o.ele),e.selector.splice(n--,1)),t=n})(t)}}}]),e}();Vue.directive("view",{inserted:function(e,t){var n={},o={threshold:-50},i=void 0,r=void 0==t.arg?"window":t.arg;void 0==n[r]&&(n[r]=[]),n[r].push({ele:e,src:t.value}),Vue.nextTick(function(){void 0===i&&(i=_util.debounce(function(){for(var e in n)o.container="window"==e?window:document.getElementById(e),o.selector=n[e],new VueViewload(o).render()},200)),i()})},bind:function(e,t){var n={},o={threshold:-50},i=void 0,r=void 0==t.arg?"window":t.arg;void 0==n[r]&&(n[r]=[]),n[r].push({ele:e,src:t.value}),Vue.nextTick(function(){void 0===i&&(i=_util.debounce(function(){for(var e in n)o.container="window"==e?window:document.getElementById(e),o.selector=n[e],new VueViewload(o).render()},200)),i()})},update:function(e,t){var n={},o={threshold:-50},i=void 0,r=void 0==t.arg?"window":t.arg;void 0==n[r]&&(n[r]=[]),n[r].push({ele:e,src:t.value}),Vue.nextTick(function(){void 0===i&&(i=_util.debounce(function(){for(var e in n)o.container="window"==e?window:document.getElementById(e),o.selector=n[e],new VueViewload(o).render()},200)),i()})},componentUpdated:function(e,t){var n={},o={threshold:-50},i=void 0,r=void 0==t.arg?"window":t.arg;void 0==n[r]&&(n[r]=[]),n[r].push({ele:e,src:t.value}),Vue.nextTick(function(){void 0===i&&(i=_util.debounce(function(){for(var e in n)o.container="window"==e?window:document.getElementById(e),o.selector=n[e],new VueViewload(o).render()},200)),i()})}}),Vue.directive("load-more",{bind:function(e,t){var n=(window.screen.height,void 0),o=void 0,i=void 0,r=void 0,s=void 0,a=void 0,c=void 0,l=void 0,u=e.attributes.type&&e.attributes.type.value;2==u?(c=e,l=e.children[0]):(c=document.body,l=e),e.addEventListener("touchstart",function(){n=l.clientHeight,2==u&&(n=n),o=e.offsetTop,i=tools.getStyle(e,"paddingBottom"),r=tools.getStyle(e,"marginBottom")},!1),e.addEventListener("touchmove",function(){},!1),e.addEventListener("touchend",function(){a=c.scrollTop},!1),window.addEventListener("scroll",function(){parseFloat(tools.getScrollTop())+parseFloat(tools.getWindowHeight())==parseFloat(tools.getScrollHeight())&&d()});var d=function e(){s=requestAnimationFrame(function(){c.scrollTop!=a?(a=c.scrollTop,e()):(cancelAnimationFrame(s),n=l.clientHeight,h())})},h=function(){t.value()}}});var photo_html='<div class="photogallery-container"><transition appear name="v-img-fade"><div v-if="!closed" class="fullscreen-v-img" @click.self="close()"><div class="header-v-img"><span v-if="images.length > 1" class="count-v-img">{{ currentImageIndex + 1 }}/{{ images.length }}</span><span class="close-v-img" @click="close">&times;</span></div><transition appear name="v-img-fade"><span v-if="visibleUI && images.length !== 1" class="prev-v-img" @click="prev"><svg width="25" height="25" viewBox="0 0 1792 1915" xmlns="http://www.w3.org/2000/svg"><path d="M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z" fill="#fff"/></svg></span></transition><transition appear name="v-img-fade"><span v-if="visibleUI && images.length !== 1" class="next-v-img" @click="next"><svg width="25" height="25" viewBox="0 0 1792 1915" xmlns="http://www.w3.org/2000/svg"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" fill="#fff"/></svg></span></transition><div class="content-v-img"><img :src="images[currentImageIndex]" id="img-slide"></div></div></transition></div>',imgscreen=Vue.extend({template:photo_html,data:function(){return{images:[],visibleUI:!0,currentImageIndex:0,closed:!0,uiTimeout:null}},methods:{close:function(){document.querySelector("body").classList.remove("body-fs-v-img"),this.images=[],this.currentImageIndex=0,this.closed=!0},next:function(){this.currentImageIndex+1<this.images.length?this.currentImageIndex++:this.currentImageIndex=0},prev:function(){this.currentImageIndex>0?this.currentImageIndex--:this.currentImageIndex=this.images.length-1},showUI:function(){var e=this;clearTimeout(this.uiTimeout),this.visibleUI=!0,this.uiTimeout=setTimeout(function(){e.visibleUI=!1},3500)}},created:function(){var e=this,t=this;window.addEventListener("scroll",function(){e.close()}),window.addEventListener("mousemove",function(){e.showUI()});var n=document.querySelector("body"),o=new Hammer(n);o.on("swipeleft",function(e){t.next()}),o.on("swiperight",function(e){t.prev()})}});Vue.directive("img",{bind:function(e,t){var n="pointer",o="",i=t.arg||null;void 0!==t.value&&(n=t.value.cursor||n,o=t.value.exsrc,i=t.value.group||i),e.setAttribute("data-vue-img-group",i||null),t.value&&t.value.exsrc&&e.setAttribute("data-vue-img-src",t.value.exsrc),o||console.error("v-img element missing src parameter."),e.style.cursor=n;var r=document.vueImg;if(!r){var s=document.createElement("div");s.setAttribute("id","imageScreen"),document.querySelector("body").appendChild(s),r=document.vueImg=(new imgscreen).$mount("#imageScreen")}e.addEventListener("click",function(){document.querySelector("body").classList.add("body-fs-v-img");var t=[].concat(_toConsumableArray(document.querySelectorAll('img[data-vue-img-group="'+i+'"]')));0==t.length?Vue.set(r,"images",[o]):(Vue.set(r,"images",t.map(function(e,t,n){return e.dataset.vueImgSrc||e.src})),Vue.set(r,"currentImageIndex",t.indexOf(e))),Vue.set(r,"closed",!1)})}});var pop_html='<div class="alet_container"><section class="tip_text_container"><div class="tip_text">{{ msg }}</div></section></div>';Vue.component("pop",{template:pop_html,data:function(){return{positionY:0,timer:null}},props:["msg"],methods:{close:function(){this.$emit("close")}}});var confirm_html='<div class="confirm-container"><section class="inner"><div class="confirm-text">{{ msg }}</div><div class="confirm-btn"><a href="javascript:;" class="cancel" @click="no()">取消</a><a href="javascript:;" class="ok" @click="ok()">确定</a></div></section></div>';Vue.component("confirm",{template:confirm_html,data:function(){return{positionY:0,timer:null}},props:["msg","callback","obj"],methods:{no:function(){this.$emit("no")},ok:function(){this.$emit("ok",this.callback,this.obj)}}});var post_html='<span id="post" class="post-container"><span class="post-inner" v-if="postProcess">{{ txt }}<span v-if="status">...</span></span><span class="post-inner" @click="sub()" v-else>{{ txt }}</span></span>';Vue.component("subpost",{template:post_html,props:{txt:{type:String,default:""},status:{type:Boolean,default:!1}},data:function(){return{postProcess:!1}},mounted:function(){},methods:{sub:function(){this.$emit("callback")},post:function(e,t,n){var o=this;o.postProcess=!0,n&&n.delaynum?setTimeout(function(){tools.ajaxPost(e,t,o.success,o.before,o.error,n,o.alert)},n.delaynum):tools.ajaxPost(e,t,o.success,o.before,o.error,n,o.alert)},before:function(){this.$emit("before")},success:function(e,t){var n=this;n.postProcess=!1,n.$emit("success",e,t)},error:function(){var e=this;e.$emit("error"),e.postProcess=!1},alert:function(e){var t=this;t.$emit("alert",e),setTimeout(function(){t.postProcess=!1},1500)}}});var nodata_html='<div class="noData"><div class="inner"><img :src="imgurl"><span class="no">{{ text }}</span></div></div>';Vue.component("no-data",{template:nodata_html,data:function(){return{}},props:{imgurl:{type:String,default:""},text:{type:String,default:""}},mounted:function(){},methods:{}});