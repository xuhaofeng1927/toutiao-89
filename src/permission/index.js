// 权限拦截，导航守卫
import router from '../router'
router.beforeEach(function (to, from, next) {
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
