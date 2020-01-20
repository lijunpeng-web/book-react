import request from '@/api/axiosConfig'

export function login(params) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: params
  })
}

export function registerUser(params) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: params
  })
}

export function getUserInfo(params) {
  return request({
    url: '/api/user/userinfo',
    method: 'get',
    params
  })
}

export function buyBook(params) {
  return request({
    url: '/api/user/buy',
    method: 'post',
    data: params
  })
}

