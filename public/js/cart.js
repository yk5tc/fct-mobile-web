"use strict";new Vue({watch:{ischeck:function(){var o=this;o.choose_num=o.ischeck.length,o.caltotalpri()}},computed:{all:{get:function(){return!!this.pro_list&&this.ischeck.length==this.pro_list.length},set:function(o){var t=[];o&&this.pro_list.forEach(function(o){t.push(o)}),this.ischeck=t}}},data:function(){return{min:!1,max:!1,showAlert:!1,msg:null,pro_list:[],ischeck:[],choose_num:0,total_pri:0,like_list:[],callback:null,showConfirm:!1,cartItem:null}},mounted:function(){var o=this;o.loadPro(),o.show_like()},methods:{add:function(o){var t=this,n=parseInt(o.buyCount.toString().replace(/[^\d]/g,""));t.min&&(t.min=!1),n<o.stockCount&&(n+=1)===o.stockCount&&(t.max=!0),jAjax({type:"post",url:config.cart_add_url,data:{buy_number:n-o.buyCount,product_id:o.goodsId,spec_id:o.specId},timeOut:5e3,before:function(){console.log("before")},success:function(o){o&&(o=JSON.parse(o),200==parseInt(o.code)?console.log("ok"):console.log("false"))},error:function(o,t){console.log(t)}}),o.buyCount=n,t.caltotalpri()},minus:function(o,t){var n=this,e=parseInt(o.buyCount.toString().replace(/[^\d]/g,""));n.max&&(n.max=!1),e>1?(e-=1,0===e&&(n.min=!0),jAjax({type:"post",url:config.cart_minus_url,data:{buy_number:e-o.buyCount,product_id:o.goodsId,spec_id:o.specId},timeOut:5e3,before:function(){console.log("before")},success:function(o){o&&(o=JSON.parse(o),200==parseInt(o.code)?console.log("ok"):console.log("false"))},error:function(o,t){console.log(t)}}),o.buyCount=e):1===e&&(o.index=t,n.confirm(o,n.delCart)),n.caltotalpri()},delCart:function(o){var t=this;parseInt(o.buyCount.toString().replace(/[^\d]/g,""));jAjax({type:"post",url:config.delete_url+"/"+o.id+"/delete",data:{},timeOut:5e3,before:function(){console.log("before")},success:function(n){n&&(n=JSON.parse(n),200==parseInt(n.code)?(t.pro_list.splice(o.index,1),t.msg=n.message,t.showAlert=!0,n.url?t.close_auto(t.linkto,n.url):t.close_auto()):console.log("false"))},error:function(o,t){console.log(t)}})},caltotalpri:function(){var o=this;o.total_pri=0,o.ischeck.forEach(function(t){o.total_pri+=parseFloat(t.promotionPrice)*parseFloat(t.buyCount)}),o.total_pri=o.total_pri.toFixed(2)},close:function(){this.showAlert=!1},close_auto:function(o,t){var n=this;setTimeout(function(){n.showAlert=!1,o&&o(t)},1500)},show_like:function(){this.like_list=config.like_list},linkto:function(o){o&&(location.href="http://localhost:9000/login.html")},loadPro:function(){this.pro_list=config.carts},buy:function(){var o=this,t=[];o.ischeck.forEach(function(o){var n={};n.goodsId=o.goodsId,n.specId=o.specId,n.buyCount=o.buyCount,t.push(n)}),t.length>0&&(location.href=encodeURI(config.buy_url+"?product="+JSON.stringify(t)))},toFloat:function(o){return parseFloat(o).toFixed(2)},confirm:function(o,t){var n=this;n.msg="是否要移除该宝贝？",n.cartItem=o,n.callback=t,n.showConfirm=!0},no:function(){this.showConfirm=!1},ok:function(o,t){this.showConfirm=!1,o&&o(t)}}}).$mount("#cart");