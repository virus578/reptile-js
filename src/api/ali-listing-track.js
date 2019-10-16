import { request } from '@/utils/http'
// 获取keyword
export function get_ali_listing_follow_keyword() {
  return request('get|get/aliexpress/user/keyWord').axios()
}
// 搜索
export function aliexpress_goods_track_search(data) {
  return request('post|aliexpress/goodsTrack/search', data).axios()
}
// 店铺跟踪
export function aliexpress_add_storeTrack(data) {
  return request('post|aliexpress/add/storeTrack', data).axios()
}
