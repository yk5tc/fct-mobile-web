"use strict";var app=new Vue({computed:{},mounted:function(){this.initData()},directives:{"load-more":{bind:function(t,e){var n=window.screen.height,o=void 0,i=void 0,a=void 0,c=void 0,l=void 0,s=void 0,u=void 0,r=void 0,d=t.attributes.type&&t.attributes.type.value;2==d?(u=t,r=t.children[0]):(u=document.body,r=t),t.addEventListener("touchstart",function(){o=r.clientHeight,2==d&&(o=o),i=t.offsetTop,a=tools.getStyle(t,"paddingBottom"),c=tools.getStyle(t,"marginBottom")},!1),t.addEventListener("touchmove",function(){h()},!1),t.addEventListener("touchend",function(){s=u.scrollTop,g()},!1);var g=function t(){l=requestAnimationFrame(function(){u.scrollTop!=s?(s=u.scrollTop,t()):(cancelAnimationFrame(l),o=r.clientHeight,h())})},h=function(){u.scrollTop+n>=o+i+a+c-2&&e.value()}}}},data:{showAlert:!1,msg:null,walletaccountList:[],pager:config.walletaccountList.pager,preventRepeatReuqest:!1,last_url:"",listloading:!0,nodata:!1},watch:{walletaccountList:function(t,e){this.listloading||(this.walletaccountList&&this.walletaccountList.length>0?this.nodata=!1:this.nodata=!0)}},methods:{initData:function(){var t=this;t.walletaccountList=config.walletaccountList.entries,t.listloading=!1},getBefore:function(){this.listloading=!0},nextPage:function(){var t=this;if(t.preventRepeatReuqest=!0,t.pager.next>0){var e=config.walletaccountUrl+"?page="+t.pager.next;e!==t.last_url&&(t.last_url=e,tools.ajaxGet(e,t.pageSucc,t.getBefore))}},pageSucc:function(t){var e=this;e.pager=t.data.pager,e.walletaccountList=t.data.entries.concat(e.walletaccountList),e.preventRepeatReuqest=!1,e.listloading=!1},close:function(){this.showAlert=!1},close_auto:function(t,e){var n=this;setTimeout(function(){n.showAlert=!1,t&&t(e)},1500)},linkto:function(t){t&&(location.href=t)}}}).$mount("#walletaccount");