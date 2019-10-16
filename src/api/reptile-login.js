import { request } from '@/utils/http'
export function login(data) {
  return request('post|login', data).axios()
}
