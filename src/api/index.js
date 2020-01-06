import request from '@/api/axiosConfig'

export function getIndexBanner(params) {
  return request({
    url: '/api/index/banner',
    method: 'get',
    params
  })
}
export function getIndexBookList(params) {
  return request({
    url: '/api/index/booklist',
    method: 'get',
    params
  })
}