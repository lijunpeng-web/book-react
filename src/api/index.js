import request from './axios.config'

export function getBookList(params) {
  return request({
    url: '/api/book/list',
    method: 'get',
    params
  })
}