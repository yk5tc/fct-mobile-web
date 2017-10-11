@extends("layout")
@section('content')
    <div class="aftersale-container" id="aftersale" v-cloak>
        <ul class="after-list" v-load-more="nextPage" type="1" v-if="refund && refund.length > 0">
            <li class="items" v-for="(item, index) in refund">
                <div class="info">
                    <div class="left">退款单号：@{{ item.id }}</div>
                    <div class="right">@{{ item.statusName }}</div>
                </div>
                <div class="product">
                    <div class="pro-item img-container">
                        <img v-view="item.img" src="{{ fct_cdn('/img/mobile/img_loader.gif') }}">
                    </div>
                    <div class="pro-item title-container">
                        <div class="title">@{{ item.name }}</div>
                        <div class="spec" v-if="item.specName && item.specName != null">规格:@{{ item.specName }}</div>
                    </div>
                    <div class="pro-item price-container">
                        <div class="price"><small class="pri-mark">￥</small>@{{ item.price }}</div>
                        <div class="num">&times; @{{ item.buyCount }}</div>
                    </div>
                </div>
                <div class="btn clearfix">
                    <div class="txt">退款金额：<small class="pri-mark">￥</small>@{{ item.payAmount }}</div>
                    <div class="btn-container">
                        <a :href="'{{ url('my/refunds') }}/' + item.id" class="black">查看详情</a>
                    </div>
                </div>
            </li>
        </ul>

        <no-data v-if="nodata"></no-data>
        <img src="{{ fct_cdn('/img/mobile/img_loader_s.gif') }}" class="list-loader" v-if="listloading">
        <pop v-if="showAlert" :showHide="showAlert" @close="close" :msg="msg"></pop>
    </div>
@endsection
@section('javascript')
    <script>
        config.refundUrl = "{{ url('my/refunds') }}";
        config.refund = {!! json_encode($refunds, JSON_UNESCAPED_UNICODE) !!};
    </script>
    <script src="{{ fct_cdn('/js/mobile/aftersale.js') }}"></script>
@endsection