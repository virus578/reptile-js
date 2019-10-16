import { request } from '@/utils/http'
export function aliexpress_get_user_store_name_lists() {
  return request('get|aliexpress/get/userStoreNameLists').axios()
}
export function aliexpress_store_id_track(data) {
  return request('post|aliexpress/storeIdTrack', data).axios()
}
export function aliexpress_store_track_search(data) {
  return request('post|aliexpress/storeTrackSearch', data).axios()
}
