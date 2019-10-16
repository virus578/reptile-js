import axios from 'axios'
import router from '../router'
import Cookies from 'js-cookie'

import { Message } from 'element-ui'
export const baseURL = process.env.BASE_API

export const server = axios.create({ baseURL, timeout: 0 })
// timeout: 0
server.interceptors.request.use(
  config => {
    config.headers.timeout = 'infinite'
    let Token
    if (config.headers.Authorization) {
      Token = config.headers.Authorization
    } else {
      Token = sessionStorage.getItem('Token')
    }
    config.headers.Authorization = Token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

server.interceptors.response.use(response => {
  const resData = response.data
  if (resData.token) {
    sessionStorage.setItem('Token', resData.token)
    Cookies.set('Token', resData.token)
  }
  return resData
},
error => {
  if (error.response && error.response.status === 401) {
    sessionStorage.clear()
    Message.error('身份已过期，请重新登录')
    router.push('/login')
  }
}
)

export class Request {
  // url,method = 'get', data = {}, headers = {'Content-Type': 'application/json'},responseType = ''
  constructor(url, method, data, headers, responseType) {
    this.url = url
    this.method = method
    this.data = data
    this.headers = headers
    this.responseType = responseType
  }
  axios() {
    if (this.method === 'get') {
      return server({ url: this.url, method: this.method, params: this.data, headers: this.headers, responseType: this.responseType })
    } else {
      return server({ url: this.url, method: this.method, data: this.data, headers: this.headers, responseType: this.responseType })
    }
  }
}

export function request(api, data = {}, headers = { 'Content-Type': 'application/json' }, responseType = '') {
  const [method, url] = [...api.split('|')]
  return new Request(url, method, data, headers, responseType)
}
