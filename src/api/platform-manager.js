import { request } from '@/utils/http'
// 搜索
export function platform_manage_search(params) {
  return request('get|platformManage/search', params).axios()
}
// 添加
export function platform_manage_addAccount(data) {
  return request('post|platformManage/addAccount', data).axios()
}
export function platform_manage_delete(params) {
  return request('get|platformManage/delete', params).axios()
}
export function platform_manage_update_account_cookie(post) {
  return request('post|platformManage/updateAccountCookie', post).axios()
}
