// 对axios 进行一个封装
import axios from 'axios'// 引入axios

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置基础地址
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 成功执行代码
  // config axios 的所有配置
  let token = window.localStorage.getItem('user-token') // 获取本地存储中的地址
  config.headers.Authorization = `Bearer ${token}`// 统一注入token
  return config // 必须有返回值，返回注入token的配置
}, function () {
  // 错误执行代码
})

export default axios
