import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import router from './modules/router'
import tagsView from './modules/tagsView'
import amzon_us from './modules/amazon_us'
import ebay_us from './modules/ebay_us'
import ali_us from './modules/ali_us'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    router,
    tagsView,
    amzon_us,
    ebay_us,
    ali_us
  },
  getters
})

export default store
