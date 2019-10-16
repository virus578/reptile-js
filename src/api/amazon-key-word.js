import { request } from '@/utils/http'

// 获取类目
export function get_amazon_category() {
  return request('get|get/amazonCategory').axios()
}
export function get_amazon_us_search_category() {
  return request('get|get/amazon/us/searchCategory').axios()
}
// 获取商品列表
export function amazon_us_goods(data) {
  return request('post|get/amazon/us/goods', data).axios()
}
// 获取商品详情
export function get_amazon_us_goods_details(data) {
  return request('get|get/amazon/us/goodsDetails?', data).axios()
}
// 添加到我的跟踪页面
export function add_amazon_us_user_track_list(data) {
  return request('post|add/amazon/us/UserTrackList', data).axios()
}
