import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import theme from './modules/theme'
import counter from './modules/counter'
import message from './modules/message'
import user from './modules/user'
import session from './modules/session'

Vue.use(Vuex)

const state = {
  currentTime: Date.now(),
  website: {}
}

const getters = {
  currentTime: state => state.currentTime
}

const mutations = {
  [types.SET_SERVERTIME]: (state, payload) => {
    state.currentTime = payload.serverTime
  },
  [types.UPDATE_SERVERTIME]: (state, payload) => {
    state.currentTime += payload.step
  }
}

const actions = {
  // fetchTime ({ commit }) {
  //   return api.getTime().then(({ data }) => {
  //     commit(types.SET_SERVERTIME, data)
  //   })
  // },
  updateTime ({ commit }, payload) {
    setInterval(() => {
      commit(types.UPDATE_SERVERTIME, {
        step: 1000
      })
    }, 1000)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    theme,
    counter,
    message,
    user,
    session
  }
})
