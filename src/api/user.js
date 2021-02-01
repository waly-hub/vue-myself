import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/vue-myself/user/login',
    method: 'POST',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/vue-myself/user/getInfo',
    method: 'POST',
    data: { token }
  })
}

export function logout () {
  return request({
    url: '/vue-myself/user/logout',
    method: 'POST',
  })
}