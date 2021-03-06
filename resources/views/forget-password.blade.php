@extends("layout")
@section('content')
    <div class="login-container" id="findpwd" v-cloak>
        <div class="logo"></div>
        <form id="find">
            <ul class="form-data">
                <li class="items clearfix">
                    <div class="left"><i class="fa fa-mobile"></i></div>
                    <div class="right">
                        <input type="text" name="cellphone" class="q" placeholder="请输入手机号码" v-model.number="phoneNumber"/>
                        <div class="code-container">
                            <a name="" class="get-code" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">
                                <subpost :txt="'获取验证码'" :status="false" ref="coderef" @callback="getVerifyCode" @before="postBefore"
                                         @success="postSuc" @error="postError" @alert="postTip"></subpost>
                            </a>
                            <a class="get-code" v-show="computedTime">已发送(@{{computedTime}}s)</a>
                        </div>
                    </div>
                </li>
                <li class="items clearfix">
                    <div class="left"><img src="{{ fct_cdn('/img/mobile/valicode.png') }}"></div>
                    <div class="right">
                        <input type="text" class="val-code" placeholder="请输入验证码" name="mobileCode"
                               maxlength="6" v-model="mobileCode">
                    </div>
                </li>
                <li class="items clearfix">
                    <div class="left">
                        <i class="fa fa-lock"></i>
                    </div>
                    <div class="right">
                        <input type="password" name="password" class="val-code"
                               placeholder="请输入新密码" v-model="passWord"/>
                    </div>
                </li>
            </ul>
            <div class="log-btn">
                <div class="sub">
                    <subpost :txt="'确认'" :status="true" ref="subpost" @callback="update" @before="postBefore"
                             @success="postSuc" @error="postError" @alert="postTip"></subpost>
                </div>
            </div>
        </form>
        <pop v-if="showAlert" :showHide="showAlert" @close="close" :msg="msg"></pop>
    </div>
@endsection
@section('javascript')
    <script>
    var apis = {
        userResource:"{{ url('forget-password', [], env('APP_SECURE'))  }}",
        mobileCodeResource:"{{ url('send-captcha', [], env('APP_SECURE')) }}"
    };
    </script>
    <script src="{{ fct_cdn('/js/mobile/findpwd.js') }}"></script>
@endsection