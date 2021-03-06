@extends("layout")
@section('content')
    <div class="order-container" id="order" v-cloak>
        <head-top></head-top>
        <section class="info">
            <div class="text">
              <span v-if="order_detail.status == 0">
                <img src="{{ fct_cdn('/img/mobile/fork_w.png') }}">待付款
              </span>
                <span v-if="order_detail.status !== 0 && order_detail.status !== 4">
                <img src="{{ fct_cdn('/img/mobile/check_w.png') }}">付款成功
                <span class="status">@{{ order_detail.statusName }}</span>
              </span>
                <span v-if="order_detail.status == 4">
                <img src="{{ fct_cdn('/img/mobile/fork_w.png') }}">订单关闭
              </span>
            </div>
        </section>
        <section class="detail">
            <div class="express" v-if="order_detail.orderReceiver.expressNO">
                <a :href="'{{ url('express', [], env('APP_SECURE')) }}?name=' + order_detail.orderReceiver.expressPlatform + '&number=' + order_detail.orderReceiver.expressNO" class="link">
                    <span class="img-container item">
                        <img src="{{ fct_cdn('/img/mobile/order_transport.png') }}">
                    </span>
                    <span class="item t">@{{ order_detail.orderReceiver.expressPlatform }}(@{{ order_detail.orderReceiver.expressNO }})<br><span class="time">@{{ order_detail.orderReceiver.deliveryTime }}</span></span>
                    <span class="wei-arrow-right"></span>
                </a>
            </div>
            <div class="addr">
                <div class="img-container">
                    <img src="{{ fct_cdn('/img/mobile/order_addr.png') }}">
                </div>
                <div class="addr-info">
                    <div class="item">收货人：@{{ order_detail.orderReceiver.name }}</div>
                    <div class="item right">@{{ order_detail.orderReceiver.phone }}</div>
                </div>
                <div class="address">收货地址：@{{ order_detail.orderReceiver.province + "&nbsp;" + order_detail.orderReceiver.city + "&nbsp;" +  order_detail.orderReceiver.region + "&nbsp;" + order_detail.orderReceiver.address }}</div>
            </div>
            <div class="express invoice" v-if="order_detail.status == 3">
                <a href="{{ url('my/orders/'. $entity->orderId .'/invoice', [], env('APP_SECURE')) }}" class="link">
                    <span class="img-container item">
                        <img src="{{ fct_cdn('/img/mobile/order_invoice.png') }}">
                      </span>
                    <span class="item t" v-if="order_detail.orderInvoice && order_detail.orderInvoice.title">已申请（@{{ order_detail.orderInvoice.statusName }}）</span>
                    <span class="item t" v-else>申请发票</span>
                    <span class="wei-arrow-right"></span>
                </a>
            </div>
        </section>
        <section class="">
            <div class="product" v-for="(item, index) in order_detail.orderGoods">
                <div class="pro-item img-container">
                    <a :href="'{{ url('products') }}/' + item.goodsId"><img v-view="item.img" src="{{ fct_cdn('/img/mobile/img_loader.gif') }}"></a>
                </div>
                <div class="pro-item title-container">
                    <div class="title">@{{ item.name }}</div>
                    <div class="spec">编号:@{{ item.code }}</div>
                    <div class="spec" v-if="item.specName && item.specName != null">规格:@{{ item.specName }}</div>
                </div>
                <div class="pro-item price-container">
                    <div class="price"><small class="pri-mark">￥</small>@{{ item.price }}</div>
                    <div class="num">&times; @{{ item.buyCount }}</div>
                    <a :href="'{{ url('my/refunds/create', [], env('APP_SECURE')) }}?og_id=' + item.id"
                       class="after-sale" v-if="item.status == -1">申请售后</a>
                    <a href="javascript:;" class="after-sale" v-if="item.statusName">@{{ item.statusName }}</a>      <!-- href的url带参数status -->
                </div>
            </div>
        </section>
        <section class="total">
            <div class="inner">
                共<span class="pri-color">@{{ order_detail.buyTotalCount }}</span>件宝贝&nbsp;合计:<span class="pri-color"><small class="pri-mark">￥</small>@{{ (order_detail.payAmount).toFixed(2) }}</span>（含运费）
            </div>
        </section>
        <section class="order-detail">
            <div class="inner">
                <span v-if="order_detail.orderId">订单编号：@{{ order_detail.orderId }}<br></span>
                <span v-if="order_detail.payOrderId">支付单号：@{{ order_detail.payOrderId }}<br></span>
                <span v-if="order_detail.payName">支付方式：@{{ order_detail.payName }}（@{{ order_detail.status == 0 || order_detail.status == 4 ? '未付款' : '已付款' }}）<br></span>
                <span v-if="order_detail.createTime">创建时间：@{{ order_detail.createTime }}<br></span>
                <span v-if="order_detail.payTime">付款时间：@{{ order_detail.payTime }}<br></span>
                <span v-if="order_detail.expiresTime">发货时间：@{{ order_detail.expiresTime }}<br></span>
                <span v-if="order_detail.finishTime">完成时间：@{{ order_detail.finishTime }}</span>
            </div>
        </section>
        <footer class="footer">
            <div class="inner">
                <a href="{!! api_chat_url(url('my/order/'.$entity->orderId, [], env('APP_SECURE')), '订单：'.$entity->orderId) !!}"
                   class="chat"><img src="{{ fct_cdn('/img/mobile/order_chat.png') }}"><span class="text">在线客服</span></a>
                <div class="del" v-if="order_detail.status == 0">
                    <a href="javascript:;">
                        <subpost :txt="'取消订单'" :status="false" ref="cancelref" @callback="confirm(order_detail.orderId, cancel)" @before="postBefore"
                                 @success="postSuc" @error="postError" @alert="postTip"></subpost>
                    </a>
                </div>
                <div class="comment">
                    <a v-if="order_detail.payStatus != 2 && order_detail.status == 0"
                       :href="'{{  sprintf('%s?tradetype=buy&tradeid=', env('PAY_URL')) }}' + order_detail.orderId">我要付款</a>
                    <a v-else-if="order_detail.status == 0" href="javascript:;">已付:<small class="pri-mark">￥</small>@{{order_detail.paidAmount}}</a>

                    <a :href="'{{ url('my/orders', [], env('APP_SECURE')) }}/' + order_detail.orderId + '/comments/create'"
                       v-if="order_detail.status == 3 && order_detail.commentStatus == 0">我要评价</a>
{{--                    <a href="javascript:;" v-if="order_detail.status == 2">
                        <subpost :txt="'确认收货'" :status="false" ref="delref" @callback="confirm(order_detail.orderId, finish)" @before="postBefore"
                                 @success="postSuc" @error="postError" @alert="postTip"></subpost>
                    </a>--}}
                </div>
            </div>
        </footer>
        <pop v-if="showAlert" :showHide="showAlert" @close="close" :msg="msg"></pop>
        <confirm v-if="showConfirm" :showHide="showConfirm" @ok="ok" @no="no" :callback="callback" :obj="orderId" :title="msg"></confirm>
    </div>
@endsection
@section('javascript')
    <script>
        config.productsType = {!! json_encode($categories, JSON_UNESCAPED_UNICODE) !!};
        config.order_detail = {!! json_encode($entity, JSON_UNESCAPED_UNICODE) !!};
        config.cancel_url = "{{ url('my/orders', [], env('APP_SECURE')) }}";
        config.finish_url = "{{ url('my/orders', [], env('APP_SECURE')) }}";
    </script>
    <script src="{{ fct_cdn('/js/mobile/head.js') }}"></script>
    <script src="{{ fct_cdn('/js/mobile/order.js') }}"></script>
@endsection