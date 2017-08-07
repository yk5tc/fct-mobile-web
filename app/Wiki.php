<?php
/**
 * Created by PhpStorm.
 * User: z
 * Date: 17-7-11
 * Time: 下午3:11
 */

namespace App;


use App\Exceptions\BusinessException;
use Illuminate\Support\Facades\Cache;

class Wiki
{

    public static function getHome()
    {

        $cacheKey = 'php_wiki';
        $cacheTime = 30;
        $cacheResult = false;

        if (Cache::has($cacheKey)) {
            $cacheResult = Cache::get($cacheKey);
        }

        if (!$cacheResult) {

            $result = Base::http(
                env('API_URL') . '/wiki',
                [],
                [],
                'GET'
            );

            if ($result->code != 200) {
                throw new BusinessException($result->msg);
            }

            $cacheResult = [
                'wikiCategories' => $result->data->categoryList,
                'materials' => $result->data->materialList,
            ];
            Cache::put($cacheKey, $cacheResult, $cacheTime);
        }

        return $cacheResult;
    }

    public static function getItem($typeId, $type)
    {
        $allowTypes = ['category', 'material'];
        if (!in_array($type, $allowTypes)) {
            throw new BusinessException("请求的类型不存在");
        }
        if ($typeId < 1) {
            throw new BusinessException("请求的类型不存在");
        }
        $cacheKey = 'php_wiki_' . $type . '_' . $typeId;
        $cacheTime = 30;
        $cacheResult = false;

        if (Cache::has($cacheKey)) {
            $cacheResult = Cache::get($cacheKey);
        }

        if (!$cacheResult) {
            $result = Base::http(
                env('API_URL') . '/wiki/item',
                [
                    'type_id' => $typeId,
                    'type' => $type,
                ],
                [],
                'GET'
            );

            if ($result->code != 200) {
                throw new BusinessException($result->msg);
            }

            /*return ;*/
            $cacheResult = $result->data;
            Cache::put($cacheKey, $cacheResult, $cacheTime);
        }

        return $cacheResult;
    }
}