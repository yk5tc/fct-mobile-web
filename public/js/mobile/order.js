"use strict";var app=new Vue({computed:{},mounted:function(){},data:{showAlert:!1,msg:null,order_detail:config.order_detail,img_path:config.img_path,showConfirm:!1,orderId:null,callback:null,delText:"删除订单",cancelText:"取消订单"},watch:{},methods:{finish:function(o){var t=this,e=config.finish_url+"/"+o+"/finish",n={};jAjax({type:"post",url:e,data:n,timeOut:5e3,before:function(){},success:function(o){o&&(o=JSON.parse(o),200==parseInt(o.code)?(t.msg=o.message,t.showAlert=!0,o.url?t.close_auto(t.linkto,o.url):t.close_auto()):(t.msg=o.message,t.showAlert=!0,t.close_auto()))},error:function(){}})},cancel:function(o){var t=this,e=config.cancel_url+"/"+o+"/cancel",n={};jAjax({type:"post",url:e,data:n,timeOut:5e3,before:function(){},success:function(o){o&&(o=JSON.parse(o),200==parseInt(o.code)?(t.msg=o.message,t.showAlert=!0,o.url?t.close_auto(t.linkto,o.url):t.close_auto()):(t.msg=o.message,t.showAlert=!0,t.close_auto()))},error:function(){}})},order_detail:function(){},succhandle:function(o){var t=this;t.msg=o.message,t.showAlert=!0,o.url?t.close_auto(t.linkto,o.url):t.close_auto()},close:function(){this.showAlert=!1},close_auto:function(o,t){var e=this;setTimeout(function(){e.showAlert=!1,o&&o(t)},1500)},linkto:function(o){o&&(location.href=o)},confirm:function(o,t){var e=this;e.msg="您确认要执行此操作？",e.orderId=o,e.callback=t,e.showConfirm=!0},no:function(){this.showConfirm=!1},ok:function(o,t){this.showConfirm=!1,o&&o(t)}}}).$mount("#order");