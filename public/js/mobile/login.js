"use strict";var app=new Vue({computed:{rightPhoneNumber:function(){return/^1\d{10}$/gi.test(this.phoneNumber)}},data:function(){return{loginWay:!0,phoneNumber:null,userInfo:null,userAccount:null,passWord:null,showAlert:!1,msg:null,mobileCode:null,validate_token:null,computedTime:0,captchaCodeImg:null,codeNumber:null,action:"login",subText:"登录"}},methods:{changeway:function(e){this.loginWay=e,this.loginWay=!this.loginWay},getVerifyCode:function(){var e=this,o=this;this.rightPhoneNumber?(this.computedTime=60,this.timer=setInterval(function(){0==--e.computedTime&&clearInterval(e.timer)},1e3),jAjax({type:"post",url:apis.mobileCodeResource,data:{cellphone:this.phoneNumber,action:this.action},timeOut:5e3,before:function(){console.log("before")},success:function(e){e&&(e=JSON.parse(e),parseInt(e.code),o.msg=e.message,o.showAlert=!0,o.close_auto())},error:function(e,t){o.msg=e,o.showAlert=!0,o.msg="请求失败",o.close_auto()}})):(o.msg="手机号码格式不正确",o.showAlert=!0,o.close_auto())},mobileLogin:function(){var e=this;return e.phoneNumber?e.passWord?void e.$refs.subpost.post(apis.userResource,formData.serializeForm("userLogin")):(e.showAlert=!0,e.msg="请输入密码",void e.close_auto()):(e.showAlert=!0,e.msg="请输入手机号",void e.close_auto())},mobileMsgLogin:function(){var e=this,o=apis.userResource,t=formData.serializeForm("quickLogin");if(!this.rightPhoneNumber)return this.showAlert=!0,this.msg="手机号码不正确",void e.close_auto();e.$refs.subpost.post(o,t)},succhandle:function(e){var o=this;o.msg=e.message,o.showAlert=!0,e.url?o.close_auto(o.linkto,e.url):o.close_auto()},close:function(){this.showAlert=!1},close_auto:function(e,o){var t=this;setTimeout(function(){t.showAlert=!1,e&&e(o)},1500)},linkto:function(e){e&&(location.href=e)}}}).$mount("#login");