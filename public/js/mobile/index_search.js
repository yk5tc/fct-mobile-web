"use strict";var app=new Vue({mounted:function(){var t=this;window.addEventListener("scroll",function(){t.showTop=tools.getScrollTop()>=tools.getWindowHeight()},!1),t.isearch=config.isearch,t.listloading=!1},data:{showTop:!1,search:config.keyword,isearch:[],nodata:!1,listloading:!0},watch:{isearch:function(t,o){this.listloading||(this.isearch&&this.isearch.length>0?this.nodata=!1:this.nodata=!0)}},methods:{clear:function(){this.search=""},subSearch:function(){var t=this;t.nodata=!1;var o=config.searchUrl;t.search&&tools.ajaxGet(o+t.search,t.searchSuc,t.getBefore)},getBefore:function(){this.listloading=!0},searchSuc:function(t){var o=this;o.isearch=t.data,o.listloading=!1},end:function(){},top:function(){tools.animate(document,{scrollTop:"0"},400,"ease-out")}}}).$mount("#isearch");