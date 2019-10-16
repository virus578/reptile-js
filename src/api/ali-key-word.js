import { request } from '@/utils/http'
export function get_aliexpress_searchCategory() {
  return request('get|get/aliexpress/searchCategory').axios()
}
export function aliexpress_keyWord_search(params) {
  return request('get|aliexpress/keyWord/search', params).axios()
}
