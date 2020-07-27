import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    customs: {}
  },
  mutations: {
    commit(state: object | any, pageState: object | any) {
      for (const prop in pageState) {
        state[prop] = pageState[prop];
      }
    }
  },
  actions: {

  },
  modules: {
  },
  getters: {

  }
})
