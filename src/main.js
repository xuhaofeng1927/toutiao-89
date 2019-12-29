import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由

import './styles/index.less' // 引入一个基础css样式
import ElementUI from 'element-ui' // 引入element-ui组件库
import 'element-ui/lib/theme-chalk/index.css' // 引入 element-ui css 样式

import './permission'// 引入导航守卫
import Component from './components'// 引入一个组件对象

// import axios from 'axios'// 引入axios

import axios from './utils/request'// 引入自己封装的axios

import evenBus from './utils/evenBus' // 全局注册even Bus
Vue.prototype.$evenBus = evenBus // 赋值给全局对象
Vue.prototype.$axios = axios // 赋值给全局对象
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component) // 使用这个组件对象
// Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
