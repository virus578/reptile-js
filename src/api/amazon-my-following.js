import { request } from '@/utils/http'

// 获取关键字列表
export function get_amazon_us_my_track_key_word() {
  return request('get|get/amazon/us/myTrackKeyWord').axios()
}
// 获取类目列表
export function get_amazon_us_my_track_category() {
  return request('get|get/amazon/us/myTrackCategory').axios()
}
// 获取跟踪列表
export function get_amazon_us_my_track_details(data) {
  return request('post|get/amazon/us/myTrackDetails', data).axios()
}

// 添加到我的追踪
export function add_amaozn_us_asin_track(data) {
  return request('post|add/amaozn/us/asinTrack', data).axios()
}
