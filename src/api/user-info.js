import { request } from '@/utils/http'

// 获取类目
export function change_password(data) {
  return request('post|changePassword', data).axios()
}
