@extends("layout")
@section('content')
    <div class="orderreturn-container" id="orderreturn" v-cloak>
        <section class="product">
            <div class="pro-item img-container">
                <img :src="product.img">
            </div>
            <div class="pro-item title-container">
                <div class="title">@{{ product.name }}</div>
                <div class="spec" v-if="product.specName && product.specName != null">规格: &nbsp;@{{ product.specName }}</div>
            </div>
            <div class="pro-item price-container">
                <div class="price"><small class="pri-mark">￥</small>@{{ product.price }}</div>
                <div class="num">&times; @{{ product.buyCount }}</div>
                <div class="total"><span class="inner">合计:<span class="pri"><small class="pri-mark">￥</small>@{{ product.payAmount }}</span></span></div>
            </div>
        </section>
        <section class="options">
            <ul class="list">
                <li>
                    <div class="inner">
                        <span class="left">服务类型</span>
                        <select class="select" v-model="servicetype">
                            <option value="0">退货退款</option>
                            <option value="1">仅退款</option>
                        </select>
                    </div>
                </li>
                <li>
                    <div class="inner">
                        <span class="left">退款原因</span>
                        <select class="select" v-model="reason">
                            <option value="">选择退款原因</option>
                            <option :value="reason" v-for="(reason, i) in product.reasons">@{{ reason }}</option>
                        </select>
                    </div>
                </li>
            </ul>
            <div class="comment">
                <textarea class="textarea" placeholder="请你在此描述详情问题。" v-model="description"></textarea>
                <div class="upload-container">
                    <div class="item" v-for="(image, index) in uploadItem">
                        <div class="inner">
                            <img :src="image">
                        </div>
                        <a href="javascript:;" class="fork" @click="delImg(index)"><i class="fa fa-times"></i></a>
                    </div>
                    <div class="item" v-if="uploadItem.length < maxNum">
                        <div class="inner">
                            <img src="{{ fct_cdn('/img/mobile/upload.png') }}">
                            <input type="file" name="file" class="upload" @change="fileChange">
                        </div>
                    </div>
                    <input type="hidden" name="uploadimg" :value="subUpload">
                </div>
            </div>
        </section>
        <div class="sub-btn">
            <a href="javascript:;">
                <subpost :txt="'提交申请'" :status="true" ref="subpost" @callback="sub" @before="postBefore"
                         @success="postSuc" @error="postError" @alert="postTip"></subpost>
            </a>
        </div>
        <pop v-if="showAlert" :showHide="showAlert" @close="close" :msg="msg"></pop>
    </div>
@endsection
@section('javascript')
    <script>
        config.product = {!! json_encode($entity, JSON_UNESCAPED_UNICODE) !!};
        config.returnUrl = "{{ url('my/refunds', [], env('APP_SECURE')) }}";
        config.uploadFileUrl = "{{ url('upload/image', [], env('APP_SECURE')) }}";
    </script>
    <script src="{{ fct_cdn('/js/mobile/orderreturn.js') }}"></script>
@endsection