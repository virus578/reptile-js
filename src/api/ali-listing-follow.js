import { request } from '@/utils/http'

// 获取关键字list
export function get_ali_listing_follow_keyword() {
  return request('get|get/aliexpress/user/keyWord').axios()
}
// 搜索
export function get_ali_listing_follow_search(data) {
  return request('post|aliexpress/myFocus/search', data).axios()
}
// listing跟踪
export function aliexpress_add_trackGoods(data) {
  return request('post|aliexpress/add/trackGoods', data).axios()
}
// 店铺跟踪
export function aliexpress_add_storeTrack(data) {
  return request('post|aliexpress/add/storeTrack', data).axios()
}
// 通过商品id 关注
export function aliexpress_my_focus_goods_id_focus(data) {
  return request('post|aliexpress/myFocus/goodsIdFocus', data).axios()
}
