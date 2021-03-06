@extends("layout")
@section('content')
    <div class="buy-container" id="buy_address" v-cloak>
        <ul class="address-choose-list" v-if="address && address.length > 0">
            <li v-for="(item, index) in address" @click="choose(item)">
                <div class="item-container">
                    <div class="info">
                        <span>@{{ item.name }}</span>
                        <span class="phone">@{{ item.cellPhone }}</span>
                    </div>
                    <div class="addr"><span class="default-addr" v-if="item.isDefault == 1">[默认地址]</span>@{{ addressStr(item) }}</div>
                </div>
            </li>
        </ul>

        <div class="address-btn">
            <a href="{{ url('my/address', [], env('APP_SECURE')) }}">管理</a>
        </div>
        <pop v-if="showAlert" :showHide="showAlert" @close="close" :msg="msg"></pop>
    </div>
@endsection
@section('javascript')
    <script>
        config.address = {!! json_encode($addressList, JSON_UNESCAPED_UNICODE) !!};
        config.chooseAddrUrl = "{{ url('my/address/default', [], env('APP_SECURE')) }}";
    </script>
    <script src="{{ fct_cdn('/js/mobile/buy_address_choose.js') }}"></script>
@endsection