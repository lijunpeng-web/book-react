import request from '@/api/axiosConfig'
export function getBookDetail(params) {
  return request({
    url: '/api/book/detail',
    method: 'get',
    params
  })
}

export function getCollectionBook(params) {
  return request({
    url: '/api/book/collection',
    method: 'get',
    params
  })
}

export function getSearch(params) {
  return request({
    url: '/api/book/search',
    method: 'get',
    params
  })
}