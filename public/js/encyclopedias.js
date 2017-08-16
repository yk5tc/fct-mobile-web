"use strict";Vue.component("m-swipe",{template:"#m_swipe",computed:{},watch:{},activated:function(){},deactivated:function(){},props:{swipeid:{type:String,default:""},effect:{type:String,default:"slide"},loop:{type:Boolean,default:!1},direction:{type:String,default:"horizontal"},pagination:{type:Boolean,default:!0},autoplay:{type:Number,default:5e3},paginationType:{type:String,default:"bullets"},spaceBetween:{type:Number,default:10}},data:function(){return{dom:""}},mounted:function(){var t=this;this.dom=new Swiper("."+t.swipeid,{loop:t.loop,pagination:".swiper-pagination",paginationType:t.paginationType,autoplay:t.autoplay,direction:t.direction,spaceBetween:t.spaceBetween,effect:t.effect,autoplayDisableOnInteraction:!1,observer:!0,observeParents:!0,height:window.innerHeight,lazyLoading:!0,paginationBulletRender:function(t,e,i){return'<span class="en-pagination '+i+'"></span>'}})},components:{}}),Vue.component("m-search",{template:"#search",mounted:function(){},data:function(){return{show_search:!1,placeholder:"",keywords:""}},methods:{search:function(t){var e=this;e.show_search?(e.placeholder="",1==t&&(e.$emit("subSearch",e.keywords),e.keywords="")):e.placeholder="请输入关键字",e.show_search=!e.show_search}}}),Vue.component("info",{template:"#info",computed:{},mounted:function(){},watch:{},activated:function(){},deactivated:function(){},data:function(){return{positionY:0,timer:null}},props:["msg"],methods:{close:function(){this.$emit("close")}}});var app=new Vue({computed:{},mounted:function(){var t=this;t.getProductsType();var e=this.$refs.swiper;e.dom&&(this.swiper=e.dom),t.getProductsOtherType();var i=this.$refs.swipert;i.dom&&(this.swipert=i.dom)},data:{ranks_list:[],pro_list:[],loading:!1,refreshing:!1,img_url:"public/images",currentView:"overview",tabs:[],tab_num:0,list:[],swiper:"",tabs_t:[],tab_num_t:0,swipert:"",list_t:[],showAlert:!1,msg:null,wikiCategories:config.wikiCategories,materials:config.materials,listloading:!1,nodata:!1},methods:{close:function(){this.showAlert=!1},showinfo:function(t){var e=this;e.showAlert=!0,e.msg=t},getProductsType:function(){var t=this;t.wikiCategories.forEach(function(e){t.tabs.push(e.name)}),t.linkTo(0)},linkTo:function(t){var e=this,i=[];e.list={},e.tab_num=t,i=e.wikiCategories[t].subList;for(var n=i.length,o=[],a=0,s=0;a<n;a+=12,s++)o[s]=i.slice(0,12);e.list=o},getProductsOtherType:function(){this.linkToOther(0)},linkToOther:function(t){for(var e=this,i=e.materials,n=i.length,o=[],a=0,s=0;a<n;a+=20,s++)o[s]=i.slice(0,20);e.list_t=o},subSearch:function(t){var e=this;e.list=[],e.wikiCategories[e.tab_num].subList,e.listloading=!1,e.orderlist.length>0?e.nodata=!1:e.nodata=!0}},components:{}}).$mount("#encyclopedias");