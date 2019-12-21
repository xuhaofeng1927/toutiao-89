// 对axios 进行一个封装
import axios from 'axios'// 引入axios
import router from '../router'// 引入路由实例对象
import { Message } from 'element-ui'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置基础地址
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 成功执行代码
  // config axios 的所有配置
  //   console.log(config)

  let token = window.localStorage.getItem('user-token') // 获取本地存储中的地址
  config.headers.Authorization = `Bearer ${token}`// 统一注入token
  return config // 必须有返回值，返回注入token的配置
}, function () {
  // 错误执行代码
})
// 响应拦截
axios.interceptors.response.use(function (res) {
  // 成功执行代码
  return res.data ? res.data : {} // 解决当data不存在时  then中读取数据报错问题
}, function (error) {
  // 错误执行代码
  console.log(error)
  let status = error.response.status// 获取状态
  let message = ''// 提示信息

  switch (status) {
    case 400:
      message = '手机号或者验证码错误'
      break
    case 403:
      message = '手机号或者验证码错误'
      router.push('/login') // 强制回登录
      break
    case 401:
      // token过期
      router.push('/login') // 强制回登录
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message })// 提示信息
})

export default axios
