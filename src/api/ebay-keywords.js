import { request} from '@/utils/http'

// 获取类目
export function ebay_us_search_category () {
    return request('get|get/ebay/us/searchCategory').axios()
}
// 爬取table
export function ebay_us_search (data) {
    return request('post|ebay/us/search',data).axios()
}
// 获取table
export function get_ebay_us_search (data) {
     return request(`get|get/ebay/us/search?key_word=${data.key_word}&request_time=${data.request_time}&offset=${data.offset}&site=${data.site}`).axios()
}
// 商品tarck
export function ebay_us_goods_track (data) {
    return request('post|ebay/us/goods/track',data).axios()
}
// 商铺tarck
export function ebay_us_store_track (data) {
    return request('post|ebay/us/storeTrack',data).axios()
}
