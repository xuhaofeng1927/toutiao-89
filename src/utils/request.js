// 对axios 进行一个封装
import axios from 'axios'// 引入axios
import router from '../router'// 引入路由实例对象
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'

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

// 后台数据 到达 响应拦截之前走的一个函数
axios.defaults.transformResponse = [function (data) {
  // return JSON.parse(data)  原来的JSon转字符串
  let result = data ? JSONBig.parse(data) : {}
  console.log(result)

  return result// 使用大数字转换
}]
// 响应拦截

axios.interceptors.response.use(function (res) {
  // 成功执行代码
  return res.data ? res.data : {} // 解决当data不存在时  then中读取数据报错问题
}, function (error) {
  // 错误执行代码
  console.dir(error)
  let status = error.response.status // 获取状态
  let message = ''// 提示信息

  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '手机号或者验证码错误'
      window.localStorage.removeItem('user-token') // 强制删除命令
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
      router.push('/login') // 强制回登录
      break
    default:
      break
  }
  Message({ type: 'warning', message })// 提示信息

  // 想让错误拦截器的内容继续进入到以后的catch中 而不进入then
  return Promise.reject(error) // 存在bug，error 获取不到
})

export default axios
