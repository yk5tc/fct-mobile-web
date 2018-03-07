"use strict";var app=new Vue({mounted:function(){this.drawCanvas()},data:{showAlert:!1,msg:config.msg,imgObj:config.imgObj},methods:{drawCanvas:function(){var e=this,t=window.innerWidth||document.documentElement.clientWidth,n=(window.innerHeight||document.documentElement.clientHeight,null);n=document.createElement("canvas");var o=document.getElementById("btn"),i=document.getElementById("con_result");n.width=t,n.height=970/750*t;var a=n.getContext("2d");a.fillStyle="#ffffff",a.fillRect(0,0,t,970/750*t);var r=.04*t;a.fillStyle="#333",a.font="1.6em 微软雅黑",a.fillText(e.imgObj.name,r,t+70/750*t),a.fillStyle="#666",a.font="1.5em 微软雅黑",a.fillText(e.imgObj.artistName,r,t+.16*t),a.fillStyle="#993333",a.font="2em 微软雅黑",a.fillText(e.imgObj.price,r,t+.24*t);var c=0,l=new Image;l.setAttribute("crossOrigin","anonymous"),l.src=e.imgObj.defaultImage,l.onload=function(){a.drawImage(l,0,0,t,l.height/l.width*t),3===(c+=1)&&i.insertBefore(Canvas2Image.convertToImage(n,t,970/750*t),o);var r=new Image;r.setAttribute("crossOrigin","anonymous"),r.src=e.imgObj.qrcodeUrl,r.onload=function(){a.drawImage(r,464/750*t,.92*t,260/750*t,260/750*t),3===(c+=1)&&i.insertBefore(Canvas2Image.convertToImage(n,t,970/750*t),o)};var m=new Image;m.setAttribute("crossOrigin","anonymous"),m.src=e.imgObj.headPortrait,m.onload=function(){e.circleImg(a,m,(t-128/750*t)/2,.08*t,128/750*t/2),3===(c+=1)&&i.insertBefore(Canvas2Image.convertToImage(n,t,970/750*t),o)}}},preImage:function(e,t,n){var o=new Image;if(o.src=e,o.complete)return void t.call(o,n);o.onload=function(){t.call(o,n)},o.onerror=function(){var o=+new Date;vue.preImage(e+"?"+o,t,n)}},circleImg:function(e,t,n,o,i){e.save();var a=2*i,r=n+i,c=o+i;e.beginPath(),e.lineWidth=3,e.strokeStyle="#fff",e.arc(r,c,i,0,2*Math.PI),e.stroke(),e.closePath(),e.arc(r,c,i,0,2*Math.PI),e.clip(),e.drawImage(t,n,o,a,a),e.restore()},pop:function(){var e=this;e.showAlert=!0,e.close_auto()},close:function(){this.showAlert=!1},close_auto:function(e,t){var n=this;setTimeout(function(){n.showAlert=!1,e&&e(t)},1500)},linkto:function(e){e&&(location.href=e)}}}).$mount("#screenshot");