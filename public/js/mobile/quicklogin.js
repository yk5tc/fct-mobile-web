"use strict";Vue.component("pop",{template:"#pop",computed:{},mounted:function(){},watch:{},activated:function(){},deactivated:function(){},data:function(){return{positionY:0,timer:null}},props:["msg"],methods:{close:function(){this.$emit("close")}}});var app=new Vue({computed:{rightPhoneNumber:function(){return/^1\d{10}$/gi.test(this.phoneNumber)}},mounted:function(){},created:function(){},activated:function(){},deactivated:function(){},data:function(){return{phoneNumber:12345678900,mobileCode:123456,validate_token:null,computedTime:0,userInfo:null,userAccount:null,passWord:null,captchaCodeImg:null,codeNumber:null,showAlert:!1,msg:null}},watch:{},methods:{getVerifyCode:function(){var e=this,t=this;this.rightPhoneNumber&&(this.computedTime=30,this.timer=setInterval(function(){0==--e.computedTime&&clearInterval(e.timer)},1e3),jAjax({type:"post",url:apis.mobileCodeResource,data:this.phoneNumber,timeOut:5e3,before:function(){console.log("before")},success:function(e){e?(e=JSON.parse(e),t.msg=e.code,t.showAlert=!0):(t.showAlert=!0,t.msg="")},error:function(e,o){t.msg=e,t.showAlert=!0,t.msg=e}}))},mobileLogin:function(){var e=this;return this.rightPhoneNumber?/^\d{6}$/gi.test(this.mobileCode)?void jAjax({type:"post",url:apis.userResource,data:formData.serializeForm("quick_login"),timeOut:5e3,before:function(){console.log("before")},success:function(t){t?(t=JSON.parse(t),e.msg=t,e.showAlert=!0,location.href="main.html"):(e.showAlert=!0,e.msg=t)},error:function(e,t){console.log(t)}}):(this.showAlert=!0,void(this.msg="短信验证码不正确")):(this.showAlert=!0,void(this.msg="手机号码不正确"))},close:function(){this.showAlert=!1}},components:{}}).$mount("#quicklogin");