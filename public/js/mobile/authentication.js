"use strict";var app=new Vue({computed:{},mounted:function(){},data:{showAlert:!1,msg:null,bankList:config.bankList,IDcard:"",bankAccount:"",bank:"",name:"",uploadImg:{}},watch:{},methods:{fileChange:function(o){var t=this,n={};n=void 0===o.target?o[0]:o.target.files[0],tools.imgCompress(n,t.upload)},upload:function(o){var t=this,n=new FormData;n.append("action","head"),n.append("file",o),console.log(o),tools.ajaxPost(config.uploadFileUrl,n,t.postSuc,t.postBefore,t.postError,{},t.postTip,!1)},postSuc:function(o){this.uploadImg=o.data},postTip:function(o){var t=this;t.msg=o.message,t.showAlert=!0,t.close_auto()},postBefore:function(){},postError:function(){},sub:function(){var o=this,t={};return o.name?o.bank?o.bankAccount?o.IDcard?(t={IDcard:o.IDcard,bankAccount:o.bankAccount,bank:o.bank,name:o.name,avatar:o.uploadImg.url},void o.$refs.subpost.post(config.authenticationUrl,t)):(o.msg="请输入身份证号码",o.showAlert=!0,o.close_auto(),!1):(o.msg="请输入开户行账号",o.showAlert=!0,o.close_auto(),!1):(o.msg="请选择开户行",o.showAlert=!0,o.close_auto(),!1):(o.msg="请输入真实姓名",o.showAlert=!0,o.close_auto(),!1)},succhandle:function(o){},close:function(){this.showAlert=!1},close_auto:function(o,t){var n=this;setTimeout(function(){n.showAlert=!1,o&&o(t)},1500)},linkto:function(o){o&&(location.href=o)}}}).$mount("#authentication");