"use strict";Vue.component("m-swipe",{template:"#m_swipe",computed:{},watch:{},activated:function(){},deactivated:function(){},props:{swipeid:{type:String,default:""},effect:{type:String,default:"slide"},loop:{type:Boolean,default:!1},direction:{type:String,default:"horizontal"},pagination:{type:Boolean,default:!0},autoplay:{type:Number,default:5e3},paginationType:{type:String,default:"bullets"},spaceBetween:{type:Number,default:10}},data:function(){return{dom:""}},mounted:function(){var t=this;this.dom=new Swiper("."+t.swipeid,{loop:t.loop,pagination:".swiper-pagination",paginationType:t.paginationType,autoplay:t.autoplay,direction:t.direction,spaceBetween:t.spaceBetween,effect:t.effect,autoplayDisableOnInteraction:!1,observer:!0,observeParents:!0,height:window.innerHeight,lazyLoading:!0,paginationBulletRender:function(t,e,i){return'<span class="en-pagination '+i+'"></span>'}})},components:{}}),Vue.component("info",{template:"#info",computed:{},mounted:function(){},watch:{},activated:function(){},deactivated:function(){},data:function(){return{positionY:0,timer:null}},props:["msg"],methods:{close:function(){this.$emit("close")}}});var app=new Vue({computed:{},mounted:function(){var t=this;t.getProductsType();var e=this.$refs.swiper;e.dom&&(this.swiper=e.dom),t.getProductsOtherType();var i=this.$refs.swipert;i.dom&&(this.swipert=i.dom)},data:{show_search:!1,show_search_d:!1,ranks_list:[],pro_list:[],loading:!1,refreshing:!1,img_url:"public/images",currentView:"overview",tabs:[],tab_num:0,list:[],swiper:"",tabs_t:[],tab_num_t:0,swipert:"",list_t:[],showAlert:!1,msg:null,wikiCategories:config.wikiCategories,materials:config.materials},methods:{close:function(){this.showAlert=!1},showinfo:function(t){var e=this;e.showAlert=!0,e.msg=t},search:function(t){var e=this;switch(parseInt(t)){case 0:e.show_search=!e.show_search;break;case 1:e.show_search_d=!e.show_search_d}},getProductsType:function(){var t=this;t.wikiCategories.forEach(function(e){t.tabs.push(e.name)}),t.linkTo(0)},linkTo:function(t){var e=this,i=[];e.list={},e.tab_num=t,i=e.wikiCategories[t].subList;for(var n=i.length,o=[],a=0,s=0;a<n;a+=12,s++)o[s]=i.slice(0,12);e.list=o},getProductsOtherType:function(){this.linkToOther(0)},linkToOther:function(t){for(var e=this,i=e.materials,n=i.length,o=[],a=0,s=0;a<n;a+=12,s++)o[s]=i.slice(0,12);e.list_t=o}},components:{}}).$mount("#encyclopedias");