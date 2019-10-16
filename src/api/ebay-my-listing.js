import { request} from '@/utils/http'
//获取关键字
export function ebay_us_user_key_word () {
    return request('get|get/ebay/us/user/keyWord').axios()
}
//获取listing跟踪列表
export function ebay_us_user_goods_track_details (data) {
    return request('post|ebay/us/user/goodsTrackDetails',data).axios()
}
//添加到我的listing追踪
export function ebay_us_goods_item_track (data) {
    return request('post|ebay/us/goodsItemTrack',data).axios()
}