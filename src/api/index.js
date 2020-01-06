import request from '@/api/axiosConfig'

export function getIndexBanner(params) {
  return request({
    url: '/api/index/banner',
    method: 'get',
    params
  })
}