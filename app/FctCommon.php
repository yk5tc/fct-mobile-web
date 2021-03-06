<?php
/**
 * Created by PhpStorm.
 * User: z
 * Date: 17-6-22
 * Time: 上午11:28
 */

namespace App;

use Illuminate\Support\Facades\Cookie;
use Ramsey\Uuid\Uuid;

class FctCommon
{
    /**去除所有空格
     * @param $str
     * @return mixed
     */
    public static function trimAll($str)
    {
        return str_replace(
            [" ","　","\t","\n","\r"],
            ["","","","",""],
            $str);
    }

    public static function secondToString($time, $i = 2)
    {
        $dateArr = [];
        $dateSpec = [86400 => '天', 3600 => '小时', 60 => '分钟'];
        foreach ($dateSpec as $key => $value) {

            if ($time >= $key) {
                $count = intval($time / $key);
                $time = $time % $key;
                switch ($key)
                {
                    case 3600:
                    case 86400:
                        if ($count > 0)
                            return $count . $value;
                        break;
                    default:
                        $dateArr[] = $count . $value;
                        break;
                }
                if (count($dateArr) == $i || !$time) {

                    break;
                }
            }
        }
        return $dateArr ? implode("", $dateArr) : "";

    }

    /**生成验证码验证的SESSION_ID
     * @return string
     */
    public static function createMobileSessionId()
    {
        $uuid = Uuid::uuid1()->getHex();
        Cookie::queue('_mvsid', $uuid, 10);
        return $uuid;
    }

    /**获取验证码SESSION_ID
     * @return string
     */
    public static function getMobileSessionId()
    {
        return Cookie::has('_mvsid') ? Cookie::get('_mvsid') : '';
    }

    /**删除验证码SESSION_ID
     *
     */
    public static function removeMobileSessionId()
    {
        Cookie::forget('_mvsid');
    }

    public static function fctBase64Encode($str)
    {
        if (!$str)
            return $str;

        return str_replace(['+', '/', '='], ['-', '_', '*'], base64_encode($str));
    }

    public static function fctBase64Decode($base64Str)
    {
        if (!$base64Str)
            return $base64Str;

        return base64_decode(str_replace(['-', '_', '*'], ['+', '/', '='], $base64Str));
    }

    public static function hasWeChat()
    {
        $userAgent = request()->server('HTTP_USER_AGENT');
        if (strpos($userAgent, 'MicroMessenger') === false)
        {
            return false;
        }

        return true;
    }


    /**缓存用户跳转地址
     * @param string $url
     * @param bool $hasCacheCookie
     */
    public static function cacheRedirectURI($url = '', $hasCacheCookie = false)
    {
        $url = $url ? $url : self::getRedirectURI();
        if ($hasCacheCookie)
        {
            Cookie::queue(env('REDIRECT_KEY'), $url, 10);
        }
        else
        {
            request()->merge([env('REDIRECT_KEY') => $url]);
        }
    }
    /**获取用户自定义返回原地址
     * @return \Illuminate\Contracts\Routing\UrlGenerator|mixed|string
     */
    public static function getRedirectURI($hasCleanCache = true, $hasDefault = true)
    {
        //主动传递跳转url
        $redirectUrl = request()->get(env('REDIRECT_KEY'));
        if ($redirectUrl)
        {
            if ($hasCleanCache && Cookie::has(env('REDIRECT_KEY')))
                Cookie::forget(env('REDIRECT_KEY'));

            return $redirectUrl;
        }

        //系统与第三方系统交互，临时存入cookie中
        if (Cookie::has(env('REDIRECT_KEY')) && Cookie::get(env('REDIRECT_KEY')))
        {
            $redirectUrl = Cookie::get(env('REDIRECT_KEY'));
            if ($hasCleanCache)
                Cookie::forget(env('REDIRECT_KEY'));

            return $redirectUrl;
        }

        if ($hasDefault)
            //返回默认指定页面
            return url('/', [], env('APP_SECURE'));

        return '';
    }

    public static function weChatJs($share)
    {
        if ((!isset($share['title'])) || !$share) return '';
        if ((!isset($share['link'])) || !$share) return '';
        if ((!isset($share['img'])) || !$share) return '';
        if ((!isset($share['desc'])) || !$share) return '';
        $title = $share['title'];
        $link = $share['link'];
        $img = $share['img'];
        $desc = $share['desc'];
        return '<script src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>'
            . '<script>' . Main::weChatShare($title, $link, $img, $desc) . '</script>';
    }
}