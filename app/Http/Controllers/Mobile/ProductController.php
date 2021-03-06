<?php

namespace App\Http\Controllers\Mobile;

use App\Artist;
use App\Exceptions\BusinessException;
use App\Member;
use App\Product;
use App\OrderComment;
use App\ProductCategory;
use App\ProductMaterial;
use Illuminate\Http\Request;

/**宝贝
 * Class ProductController
 * @package App\Http\Controllers\Mobile
 */
class ProductController extends BaseController
{

    /**宝贝详情
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|string
     * @throws BusinessException
     */
    public function show(Request $request, $id)
    {
        try
        {
            $result = Product::getProduct($id);
            if ($result)
                Product::addVisitCount($id);
        }
        catch (BusinessException $e)
        {
            //错误处理
            return $this->autoReturn($e->getMessage(), $e->getCode());
        }

        if (!$result) return $this->autoReturn('没有找到此产品内容');

        //处理content图片延迟加载
/*        $result->content = str_replace(
            'src="', 'src="'.fct_cdn('/img/mobile/img_loader.gif').'" v-view="',
            $result->content);*/
        $images = [];
        $contentImages = [];
        preg_match_all("/src=[\"|'| ]{0,}((?!\").)+\"/is", $result->content, $images);
        if ($images && $images[0])
        {
            $content = $result->content;
            foreach ($images[0] as $key=>$val) {
                $imageKey = "image" . $key;
                $content = str_replace($val, 'v-view="product.cImgs.'.$imageKey.'" src="'.fct_cdn('/img/mobile/img_loader.gif').'"', $content);
                $val = str_replace("src=", "", str_replace('"', '', $val));
                $contentImages[$imageKey] = $val;
            }

            $result->content = $content;
        }

        $result->cImgs = $contentImages;

        $shareUrl = $this->myShareUrl(url('products/'. $id, [], env('APP_SECURE')));
        return view('product.show', [
            'title' => fct_title($result->artistNames.'制宜兴紫砂壶作品'.$result->name),
            'keywords' => $result->artistNames.'宜兴紫砂壶,'
                .$result->artistNames.'紫砂,'
                .$result->artistNames.'紫砂壶,'
                .$result->artistNames.'壶,'
                .$result->artistNames.'茶壶,紫砂壶名家'
                .$result->artistNames.',宜兴紫砂艺人'
                .$result->artistNames.',宜兴紫砂大师'
                .$result->artistNames.',方寸堂,宜兴方寸堂',
            'description' => '方寸堂旗下宜兴紫砂壶名家'
                .$result->artistNames.'采用'
                .$result->materialNames.'经过全手工制作的'
                .$result->name.'壶，全场正品限量发行，支持保值换购。',
            'categories' => ProductCategory::getCategories(),
            'product' => $result,
            'share' => [
                'title' => $result->artistNames . '制《' .$result->name. '》',
                'link' => $shareUrl,
                'img' => $result->defaultImage,
                'desc' => $result->subTitle,
            ]
        ]);
    }

    public function getProductComments(Request $request, $product_id)
    {
        $pageIndex = $request->get('page', 1);

        try
        {
            $result = OrderComment::getComments($product_id, $pageIndex);
        }
        catch (BusinessException $e)
        {
            //错误处理
            return $this->autoReturn($e->getMessage(), $e->getCode());
        }

        return $this->returnAjaxSuccess("获取评论列表成功", null, $result);
    }

    public function getProductArtists(Request $request, $product_id)
    {
        $ids = $request->get('ids', '');
        try
        {
            $result = Artist::getArtistByIds($ids, $product_id);
            return $this->returnAjaxSuccess('获取宝贝艺术家列表成功', null, $result);
        }
        catch (BusinessException $e)
        {
            //错误处理
            return $this->autoReturn($e->getMessage(), $e->getCode());
        }
    }

    public function getProductaMaterials(Request $request, $product_id)
    {
        $materialIds = $request->get('ids');
        try
        {
            $result = ProductMaterial::getMaterialsByIds($materialIds, $product_id);

            return $this->returnAjaxSuccess('获取宝贝泥料列表成功', null, $result);
        }
        catch (BusinessException $e)
        {
            //错误处理
            return $this->autoReturn($e->getMessage(), $e->getCode());
        }
    }
}
