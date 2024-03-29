import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { BASIC_INFO } from './store/mutation'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register', '/login1', '/', '/index',  '/search','/detial']//'/classify/index', '/pigeonhole/index', '/tag/index', '/link/index', '/about/index', '/detial/index',

router.beforeEach((to, from, next) => {
  NProgress.start()


  /** 拉取网站基本信息**/
  if (!localStorage.getItem(BASIC_INFO)) {
    store.dispatch('getBasicInfo').then(res => {

    })
  }

  if (store.getters.IndexAddRoutes.length === 0) {

    store.dispatch('GenerateIndexRoutes').then(accessRoutes => {
      // 根据roles权限生成可访问的路由表
      router.addRoutes(accessRoutes) // 动态添加可访问路由表
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
  }


  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/login' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => {
          // 拉取user_info
          const roles = res.data.roles
          // 拉取网站基本信息
          store.dispatch('getBasicInfo').then(res => { })
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err)
              next({ path: '/' })
            })
          })
      } else {
        next()
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
        // 可删 ↑
      }
    }
  } else {
    // 没有token和排除首页菜单
    if ((whiteList.indexOf(to.path) !== -1)
      ||(JSON.stringify(store.getters.IndexAddRoutes)
        .indexOf(to.path.replace("/index","")) !== -1)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
