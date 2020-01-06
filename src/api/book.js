import request from '@/api/axiosConfig'
export function getBookDetail(params) {
  return request({
    url: '/api/book/detail',
    method: 'get',
    params
  })
}