// 权限拦截，导航守卫
import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  // 添加导航进度
  progress.start()

  // 拦截谁判断拦截地址
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')// 强制跳转到登录页
    }
  } else {
    next() // 直接放行
  }
})
router.afterEach(function () {
  // progress.done()
  setTimeout(() => { progress.done() }, 1000)
})
