@extends("layout")
@section('content')
    <div class="authentication-container" id="authentication" v-cloak>
        <section class="list">
            <div class="item">
                <div class="inner">
                    <span class="left">真实姓名</span>
                    <input type="text" class="inp" v-model="name">
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <span class="left">开户行</span>
                    <select class="select" v-model="bank">
                        <option v-for="(item, index) in bankList">@{{ item }}</option>
                    </select>
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <span class="left">开户行账号</span>
                    <input type="text" class="inp" v-model="bankAccount">
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <span class="left">身份证号码</span>
                    <input type="text" class="inp" v-model="IDcard">
                </div>
            </div>
            <div class="photo-container">
                <div class="line">
                    <span class="left">身份证照片</span>
                    <span class="right">手持身份证正面照</span>
                </div>
                <div class="upload-line clearfix">
                    <div class="upload-container">
                        <img :src="uploadImg.fullUrl">
                        <input type="file" name="file" class="upload" @change="fileChange">
                    </div>
                    <div class="info">
                        <div class="inner">
                            <img src="{{ fct_cdn('/img/mobile/upload_demo.png') }}">
                            <div class="title">照片中以下信息必须真实可信</div>
                            <div class="context">
                                1、手持证件人的五官<br>2、身份证上的所有信息
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="text">
            <strong>保密声明</strong>
            <p>是粉色方法是否发放的方式 </p>
        </section>
        <div class="sub-btn">
            <a href="javascript:;">
                <subpost :txt="'提交申请'" ref="subpost" :status="true" @callback="sub" @before="postBefore"
                         @success="succhandle" @error="postError" @alert="postTip"></subpost>
            </a>
        </div>
        <pop v-if="showAlert" :showHide="showAlert" @close="close" :msg="msg"></pop>
    </div>
@endsection
@section('javascript')
    <script>
        config.uploadFileUrl = "{{ url('upload/image', [], env('APP_SECURE')) }}";
        config.authenticationUrl = "{{ url('my/account/real-auth', [], env('APP_SECURE')) }}";
        config.bankList = {!! json_encode($banks, JSON_UNESCAPED_UNICODE) !!};
    </script>
    <script src="{{ fct_cdn('/js/mobile/authentication.js') }}"></script>
@endsection