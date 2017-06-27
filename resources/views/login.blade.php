@extends("layout")

@section("title", $title)
@section('content')
    <div class="login-container" id="login">
        <div class="logo"></div>
        <form id="userLogin" v-if="loginWay">
            <ul class="form-data">
                <li class="items clearfix">
                    <div class="left">账号</div>
                    <div class="right">
                        <input type="text" name="cellphone" class="" placeholder="请输入手机号码" v-model.number="phoneNumber"/>
                    </div>
                </li>
                <li class="items clearfix">
                    <div class="left">密码</div>
                    <div class="right">
                        <input type="password" name="password" class="val-code" placeholder="请输入登录密码" v-model="passWord"/>
                    </div>
                </li>
            </ul>
            <div class="log-btn">
                <div class="sub" @click="mobileLogin">登录</div>
            </div>
            <div class="options">
                <a href="{{ url('forget-password') }}">忘记密码？</a>
                <a href="javascript:;" @click="changeway(loginWay)">快捷登录</a>
            </div>
        </form>
        <form id="quickLogin" v-else>
            <ul class="form-data">
                <li class="items clearfix">
                    <div class="left"><i class="fa fa-mobile"></i></div>
                    <div class="right">
                        <input name="cellphone" type="text" class="q" placeholder="请输入手机号码" v-model.number="phoneNumber"/>
                        <div class="code-container">
                            <a name="" @click.prevent="getVerifyCode" class="get-code" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</a>
                            <a class="get-code" @click.prevent v-show="computedTime">已发送(@{{computedTime}}s)</a>
                        </div>
                    </div>
                </li>
                <li class="items clearfix">
                    <div class="left"><img src="images/valicode.png"></div>
                    <div class="right">
                        <input type="text" class="val-code" placeholder="请输入验证码" name="captcha"
                               maxlength="6" v-model="mobileCode">
                    </div>
                </li>
            </ul>
            <div class="log-btn">
                <div class="sub" @click="mobileMsgLogin()">登录</div>
            </div>
            <div class="options">
                <a href="{{ url('forget-password') }}">忘记密码？</a>
                <a href="javascript:;" @click="changeway(loginWay)">密码登录</a>
            </div>
        </form>
        <div class="others">
            <a href="javascript:;">
                <img src="images/qq.png">
            </a>
            <a href="javascript:;">
                <img src="images/weibo.png">
            </a>
        </div>
        <pop v-if="showAlert" :showHide="showAlert" @close="close" :msg="msg"></pop>
    </div>
    <template id="pop">
        <div class="alet_container">
            <section class="tip_text_container">
                <div class="tip_text">@{{ msg }}</div>
                <!--<div class="confrim" @click="close">确认</div>-->
            </section>
        </div>
    </template>
@endsection
@section('javascript')
    <script>
    var apis = {
    userResource:"{{ url('login')  }}",
        mobileCodeResource:"{{ url('send-captcha') }}"
    };
    </script>
    <script src="js/api/index.js"></script>
    <script src="js/login.js"></script>
@endsection