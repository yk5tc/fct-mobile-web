"use strict";Vue.component("star",{template:"#m_star",data:function(){return{stars_num:5,stars_msg:["非常差","很差","一般","很好","非常好"],stars_chosen_msg:"",stars_chosen:0}},mounted:function(){},methods:{c_star:function(t){var o=this;o.stars_chosen=t+1,o.stars_chosen_msg=o.stars_msg[o.stars_chosen-1]}}}),Vue.component("m-textarea",{template:"#m_textarea",data:function(){return{content:""}},mounted:function(){},methods:{}}),Vue.component("upload",{template:"#m_upload",data:function(){return{uploadItem:[],subUpload:[],maxNum:5}},mounted:function(){},methods:{delImg:function(t){var o=this;o.uploadItem.splice(t,1),o.subUpload.splice(t,1)},fileChange:function(t){var o=this,s={};s=void 0===t.target?t[0]:t.target.files[0],"image/png"!==s.type&&"image/jpeg"!==s.type&&"image/jpg"!==s.type?o.$emit("pop"):tools.imgCompress(s,o.upload)},upload:function(t,o){var s=this,e=new FormData;e.append("action","images"),e.append("file",t,o),tools.ajaxPost(config.uploadFileUrl,e,s.postSuc,s.postBefore,s.postError,{},s.postTip,!1)},postSuc:function(t){var o=this;o.uploadItem.push(t.data.fullUrl),o.subUpload.push(t.data.url)},postTip:function(t){var o=this;o.msg=t.message,o.showAlert=!0,o.close_auto()},postBefore:function(){},postError:function(){}}});var app=new Vue({mounted:function(){},data:{showAlert:!1,msg:null,order_detail:config.order_detail,anonymous:!1,is_break:!1},watch:{},methods:{postSuc:function(t){},postTip:function(t){var o=this;o.msg=t.message,o.showAlert=!0,o.close_auto()},postBefore:function(){},postError:function(){},sub:function(){var t=this,o=[];if(t.order_detail.orderGoods.forEach(function(s,e){var n=t.$refs.star[e],a=t.$refs.text[e],r=t.$refs.uploadimg[e],u={};u.goodsId=s.goodsId,u.content=a.content,u.descScore=n.stars_chosen,u.picture=r.subUpload,o.push(u)}),!t.is_break){var s=config.commentUrl,e={order_id:t.order_detail.orderId,express_score:t.$refs.express.stars_chosen,sale_score:t.$refs.sale.stars_chosen,has_anonymous:t.anonymous,products:JSON.stringify(o)};t.$refs.subpost.post(s,e)}},succhandle:function(t){var o=this;o.msg=t.message,o.showAlert=!0,t.url?o.close_auto(o.linkto,t.url):o.close_auto()},close:function(){this.showAlert=!1},close_auto:function(t,o){var s=this;setTimeout(function(){s.showAlert=!1,t&&t(o)},1500)},linkto:function(t){t&&(location.href=t)},alert:function(){var t=this;t.msg="文件格式不正确",t.showAlert=!0,t.close_auto()}}}).$mount("#ordercomment");