import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './styles/index.less' // 引入一个基础css样式
import ElementUI from 'element-ui' // 引入element-ui组件库
import 'element-ui/lib/theme-chalk/index.css' // 引入 element-ui css 样式

import './permission'
import Component from './components'// 引入一个组件对象

import axios from 'axios'// 引入axios

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置基础地址
Vue.prototype.$axios = axios // 赋值给全局对象
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component) // 使用这个组件对象
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
