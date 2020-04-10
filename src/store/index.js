import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import setting from './modules/setting'
import getters from './getters'
import basicInfo from './modules/basicInfo'
import IndexPermission from './modules/IndexPermission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    IndexPermission,
    tagsView,
    user,
    setting,
    basicInfo
  },
  getters
})

export default store
