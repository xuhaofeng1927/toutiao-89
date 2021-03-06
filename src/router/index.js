import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'

// 二级路由引入
// content
// import Publish from '../views/home/content/publish'
// import Aarticles from '../views/home/content/articles'
// import Comment from '../views/home/content/comment'
// import Material from '../views/home/content/material'
// fans
import FansImg from '../views/home/fans/fansImg'
import FansPaint from '../views/home/fans/fansPaint'
// import FansGen from '../views/home/fans/fansGen'
import FansList from '../views/home/fans/fansList'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [

      {
        path: '',
        redirect: '/home/homepage'
      },
      {
        path: 'homepage',
        component: () => import('../views/home/homePage')// 按需加载
      }, // 首页-默认页面
      // content
      {
        path: 'publish/:Id', // 定义动态路由参数  此规则只匹配修改文章
        component: () => import('../views/home/content/publish') // 按需加载
      },
      {
        path: 'publish', //  此规则只匹配发表文章
        component: () => import('../views/home/content/publish') // 按需加载
      },
      {
        path: 'articles',
        component: () => import('../views/home/content/articles') // 按需加载
      },
      {
        path: 'comment',
        component: () => import('../views/home/content/comment') // 按需加载
      }, // 评论列表
      {
        path: 'material',
        component: () => import('../views/home/content/material') // 按需加载
      }, // 素材列表
      // fans
      {
        path: 'fansImg',
        component: FansImg
      },
      {
        path: 'fansPaint',
        component: FansPaint
      },
      // {
      //   path: 'fansGen',
      //   component: FansGen
      // },
      {
        path: 'fansList',
        component: FansList
      },
      // 账户信息
      {
        path: 'accountInfo',
        component: () => import('../views/home/accountInfo') // 按需加载
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
