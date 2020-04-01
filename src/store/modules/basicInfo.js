import { getBasicInfoKeyValueList } from '@/api/blog/basicInfo'
import { BASIC_INFO } from '../mutation'

const basicInfo = {
  state: {
    basicInfo: []
  },
  mutations: {
    SET_BASIC_INFO: (state, data) => {
      state.basicInfo = data
    }
  },
  actions: {
    // 生成路由
    getBasicInfo({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getBasicInfoKeyValueList('').then(res => {
          commit('SET_BASIC_INFO', res.data)
          localStorage.setItem(BASIC_INFO, JSON.stringify(res.data))
          resolve(res.data)
        })
      })
    }

  }
}

export default basicInfo
