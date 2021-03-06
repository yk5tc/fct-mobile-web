<?php
/**
 * Created by PhpStorm.
 * User: z
 * Date: 17-6-22
 * Time: 下午3:39
 */

namespace App;


use App\Exceptions\BusinessException;
use Illuminate\Support\Facades\Cache;

class Product
{
    public static $resourceUrl = '/mall/products';

    /**宝贝详情
     * @param $id
     * @return array
     * @throws BusinessException
     */
    public static function getProduct($id)
    {
        $id = intval($id);
        if (!$id) {
            throw new BusinessException("无此宝贝");
        }


        $cacheKey = 'product_' . $id;
        $cacheTime = 5 / 60;
        $cacheResult = false;

        if (Cache::has($cacheKey)) {
            $cacheResult = Cache::get($cacheKey);
        }

        if (!$cacheResult) {
            $result = Base::http(
                env('API_URL') . sprintf('%s/%d', self::$resourceUrl, $id),
                [],
                [env('MEMBER_TOKEN_NAME') => Member::getToken()],
                'GET'
            );

            if ($result->code != 200) {
                throw new BusinessException($result->msg, $result->code);
            }

            $product = $result->data;
            if ($product->hasCoupon) {
                $product->coupon_url = url('coupons/new?product_id=' . $product->id, [], env('APP_SECURE'));
            }

            $cacheResult = $product;
            Cache::put($cacheKey, $cacheResult, $cacheTime);
        }

        //未登录不显示价格
        $cacheResult->promotionPrice = show_price($cacheResult->promotionPrice, true, ($cacheResult->hasDiscount ? $cacheResult->salePrice: 0));

        return $cacheResult;
    }

    /**艺术家作品列表
     * @param $artistId
     * @return mixed
     * @throws BusinessException
     */
    public static function getPrdocutsByArtistId($artistId)
    {
        $result = Base::http(
            env('API_URL') . sprintf('%s/by-artist', self::$resourceUrl),
            [
                'artist_id' => $artistId,
            ],
            [],
            'GET'
        );

        if ($result->code != 200)
        {
            throw new BusinessException($result->msg, $result->code);
        }

/*        if ($result->data) {
            foreach ($result->data as $key => $val) {
                $val->price = show_price($val->price);
                $result->data[$key] = $val;
            }
        }*/

        return $result->data;
    }

    /**获取分享的宝贝
     * @param $categoryCode
     * @param $name
     * @param $page
     * @return mixed
     * @throws BusinessException
     */
    public static function getShareProducts($artistId, $name, $sortIndex, $page)
    {
        $pageIndex = $page < 1 ? 1 : $page;
        $pageSize = 10;

        $result = Base::http(
            env('API_URL') . sprintf('%s/share', self::$resourceUrl),
            [
                'name' => $name,
                'artistId' => $artistId,
                'sort_index' => $sortIndex,
                'page_index' => $pageIndex,
                'page_size' => $pageSize,
            ],
            [env('MEMBER_TOKEN_NAME') => Member::getToken()],
            'GET'
        );

        if ($result->code != 200)
        {
            throw new BusinessException($result->msg, $result->code);
        }

        $pagination = Base::pagination($result->data, $pageIndex, $pageSize);

        return $pagination;
    }

    public static function getShareProduct($id)
    {
        $id = intval($id);
        if (!$id) {
            throw new BusinessException("无此宝贝");
        }
        $result = Base::http(
            env('API_URL') . sprintf('%s/share/%d', self::$resourceUrl, $id),
            [],
            [env('MEMBER_TOKEN_NAME') => Member::getToken()],
            'GET'
        );

        if ($result->code != 200)
        {
            throw new BusinessException($result->msg, $result->code);
        }

        return $result->data;
    }

    public static function addVisitCount($id) {

        $limitVisitCacheName = 'p_v_' . $id;
        $longIp = ip2long(request()->ip());
        $visiters = [];
        if (Cache::has($limitVisitCacheName))
        {
            $visiters = Cache::get($limitVisitCacheName);
        }
        if (in_array($longIp, $visiters)) {

            return true;
        }
        //初次访问记录ip
        $visiters[] = $longIp;
        //获取当天过期时间变缓存
        $cacheTime = 30;//(strtotime(date('Y-m-d 23:59:59')) - time()) / 60;
        Cache::put($limitVisitCacheName, $visiters, $cacheTime);



        $result = Base::http(
            env('API_URL') . sprintf('%s/%d/visit', self::$resourceUrl, $id),
            [],
            [],
            'POST'
        );

        return true;
    }
}