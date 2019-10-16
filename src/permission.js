import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
const $go = (path, to, from, next) => {
  if (path === '/' ? path === to.path : ((new RegExp(path)).test(to.path))) {
    next()
  } else {
    next(path)
  }
}
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (false) {
    if (to.path === '/login') {
      // next({ path: '/' })
      // next({ path: '/login' })
      // next()
      // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // store.dispatch('GetInfo').then(res => { // 拉取用户信息
        //   next()
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
        // next({ path: '/login' })
        next()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (sessionStorage.getItem('Token')) {
        $go(`${to.path}`, to, from, next)
      } else {
        $go(`/login?redirect=${to.path}`, to, from, next)
      }
      //  next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      // next({ path: '/login' })
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
