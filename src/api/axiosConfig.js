import axios from 'axios'
import { getToken } from '@/utils/local'
// 转换传参数据格式
// axios.defaults.transformRequest = [function (data) {
//   let newData = ''
//   for (let k in data) {
//     newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
//   }
//   console.log(newData,'newData')
//   return newData
// }]


axios.defaults.withCredentials = true
const service = axios.create({
  withCredentials: true,
  // baseURL: 'http://www.weinihaigou.com', // api的base_url
  timeout: 60000,// request timeout
})



service.interceptors.request.use(function (config) {
  config.headers['Authorization'] = getToken()
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error); // for debug
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
  return response;
}, error => {
  // 对响应错误做点什么
  console.log(error.response)
  return Promise.reject(error.response.data)
});

export default service