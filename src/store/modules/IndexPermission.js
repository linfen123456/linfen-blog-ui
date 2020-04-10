import { constantRoutes } from '@/router'
import { getIndexRouters } from '@/api/blog/menu'
import IndexLayout from '@/views/index/layout/IndexLayout'

const IndexPermission = {
  state: {
    IndexRoutes: [],
    IndexAddRoutes: []
  },
  mutations: {
    SET_INDEX_ROUTES: (state, routes) => {
      state.IndexAddRoutes = routes
      state.IndexRoutes = getIndexRotes(constantRoutes).concat(routes)
    }
  },
  actions: {
    // 生成路由
    GenerateIndexRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getIndexRouters().then(res => {
          const accessedRoutes = filterAsyncRouter(res.data.data)
          commit('SET_INDEX_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    }

  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    // console.log(route.component)
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = IndexLayout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

function getIndexRotes(rotes) {
  for (let i = 0; i < rotes.length; i++) {
    const rote = rotes[i]
    if (rote.path === '/') {
      return rote.children
    }
  }
  return rotes
}

export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
}

export default IndexPermission
