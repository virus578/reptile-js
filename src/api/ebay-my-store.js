import { request} from '@/utils/http'
//获取关键字
export function ebay_us_store_name () {
    return request('get|get/ebay/us/storeName').axios()
}
//搜索
export function ebay_us_store_track_search (data) {
    return request('post|ebay/us/storeTrackSearch',data).axios()
}
//通过店铺名追踪
export function ebay_us_store_name_track (data) {
    return request('post|ebay/us/storeNameTrack',data).axios()
}