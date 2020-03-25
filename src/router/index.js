import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'
import IndexLayout from '@/views/index/layout/IndexLayout'

// 公共路由
export const constantRoutes = [
  {
    path: '/',
    component: IndexLayout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index/index'),
        name: 'index',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      },
      {
        path: '/classify',
        component: () => import('@/views/index/classify'),
        name: 'classify',
        meta: { title: '分类', icon: 'blog', noCache: true, affix: true }
      },
      {
        path: '/pigeonhole',
        component: () => import('@/views/index/pigeonhole'),
        name: 'pigeonhole',
        meta: { title: '归档', icon: 'dashboard', noCache: true, affix: true }
      },
      {
        path: '/tag',
        component: () => import('@/views/index/tag'),
        name: 'tag',
        meta: { title: '标签', icon: 'tag', noCache: true, affix: true }
      },
      {
        path: '/about',
        component: () => import('@/views/index/about'),
        name: 'about',
        meta: { title: '关于', icon: 'user', noCache: true, affix: true }
      },
      {
        path: '/link',
        component: () => import('@/views/index/link'),
        name: 'link',
        meta: { title: '友联', icon: 'link', noCache: true, affix: true }
      },
      {
        path: '/detial',
        component: () => import('@/views/index/detial'),
        name: 'detial',
        meta: { title: '详情', icon: 'detial', noCache: true, affix: true }
      }

    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/bind',
    component: () => import('@/views/login/bind'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/index/home'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/user/index'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
