"use strict";var app=new Vue({mounted:function(){this.initData()},data:{ranks_list:config.productsRank,pro_list:[],loading:!1,refreshing:!1,msg:0,isindex:config.isindex,code:"",_code:"",tab_num:null,listloading:!0,nodata:!1},watch:{pro_list:function(t,i){this.listloading||(this.pro_list&&this.pro_list.length>0?this.nodata=!1:this.nodata=!0)}},methods:{initData:function(){var t=this;t.pro_list=config.products,t.listloading=!1,t.tab_num=0},showImg:function(){return"public/img/mobile/img_loader.gif"},getBefore:function(){this.listloading=!0},getprolist:function(t,i,o){var n=this;n.tab_num=o,n.pro_list={},n.nodata=!1;var a="";t=t||"",i=i||0,""!=t?(a="?code="+t,i>0&&(a+="&level_id="+i)):i>=0&&(t=n.code,a="?level_id="+i,""!=t&&(a+="&code="+t)),n._code=t,a=config.product_url+a,tools.ajaxGet(a,n.getSucc,n.getBefore)},getSucc:function(t){var i=this;i.pro_list=t.data,i.code=i._code,i.listloading=!1}}}).$mount("#main");