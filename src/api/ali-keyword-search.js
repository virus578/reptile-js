import { request } from '@/utils/http'
// 获取类目
export function get_aliexpress_searchCategory() {
  return request('get|get/aliexpress/searchCategory').axios()
}
// 搜索
export function aliexpress_keyWord_search(params) {
  return request('get|aliexpress/keyWord/search', params).axios()
}
// 关注
export function aliexpress_add_goods_focus(data) {
  return request('post|aliexpress/add/goodsFocus', data).axios()
}
// 加入搜索队列
export const aliexpress_addsearch_track = (data) => request('get|aliexpress/addsearchTrack', data).axios()
