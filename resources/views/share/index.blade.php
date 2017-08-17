@extends("layout")

@section('content')
    <div class="share-container" id="share" v-cloak>
        <section class="top">
            <div class="inner">
                <div class="item sort">
                    <select class="sel" v-model="sortsel" @change="sel">
                        <option v-for="(item, index) in sort" :value="index">@{{ item }}</option>
                    </select>
                </div>
                <div class="item category">
                    <select class="sel" v-model="categary" @change="cate">
                        <option v-for="(item, index) in productsType" :value="item.code">@{{ item.name }}</option>
                    </select>
                </div>
                <div class="item search">
                    <a href="javascript:;" class="search-link" @click="subSearch">
                        <i class="fa fa-search"></i>
                    </a>
                    <input type="search" class="search-input" placeholder="宝贝名称" v-model="search">
                    <a href="javascript:;" class="fork-link" @click="clear">
                        <i class="fa fa-times-circle"></i>
                    </a>
                </div>
            </div>
        </section>
        <ul class="list">
            <li>
                <a href="{{ url('/') .'?' . env('SHARE_SHOP_ID_KEY') . '=' . $member->shopId }}" class="link">
                    <span class="left">
                      <img src="{{ fct_cdn('/images/logo2.png') }}">
                    </span>
                    <span class="center">
                      <span class="title">方寸堂 - 只为不同</span>
                      <span class="t2">汇聚东方美学匠心之作的紫砂交流电商平台。</span>
                    </span>
                    <span class="right"><img src="{{ fct_cdn('/images/share.png') }}"></span>
                </a>
            </li>
        </ul>
        <ul class="list" v-load-more="nextPage" type="1" v-if="shareList && shareList.length > 0">
            <li v-for="(item, index) in shareList">
                <a :href="'/products/' + item.id + '{{ '?' . env('SHARE_SHOP_ID_KEY') . '=' . $member->shopId }}'" class="link">
                    <span class="left">
                        <img v-view="item.defaultImage" src="{{ fct_cdn('/images/img_loader.gif') }}">
                    </span>
                    <span class="center">
                      <span class="title">@{{ item.name }}</span>
                    <span class="t1" v-if="item.price instanceof Array">价格：<small class="pri-mark">￥</small>@{{ item.price[0] }}&sim;<small class="pri-mark">￥</small>@{{ item.price[1] }}</span>
                      <span class="t1" v-else>价格：<small class="pri-mark">￥</small>@{{ item.price }}</span>
                      <span class="t2" v-if="item.commission instanceof Array">利润：<strong class="pri"><small class="pri-mark">￥</small>@{{ item.commission[0] }}&sim;<small class="pri-mark">￥</small>@{{ item.commission[1] }}</strong></span>
                      <span class="t2" v-else>利润：<strong class="pri"><small class="pri-mark">￥</small>@{{ item.commission }}</strong></span>
                    </span>
                    <span class="right"><img src="{{ fct_cdn('/images/share.png') }}"></span>
                </a>
            </li>
        </ul>

        <div class="noData" v-if="nodata || (shareList && shareList.length <= 0)">
            <div class="inner">
                <img src="{{ fct_cdn('/images/no_data.png') }}">
                <span class="no">当前没有相关数据哟~</span>
            </div>
        </div>

        <img src="{{ fct_cdn('/images/img_loader_s.gif') }}" class="list-loader" v-if="listloading">
        <pop v-if="showAlert" :showHide="showAlert" @close="close" :msg="msg"></pop>
    </div>
@endsection
@section('javascript')
    <script>
        config.shareUrl = "{{ url('my/share') }}";
        config.sort = ['综合排序', '人气最高', '利润最高'];
        config.productsType = {!! json_encode($categories, JSON_UNESCAPED_UNICODE) !!};
        config.share = {!! json_encode($entries, JSON_UNESCAPED_UNICODE) !!};
    </script>
    <script src="{{ fct_cdn('/js/share.js') }}"></script>
@endsection