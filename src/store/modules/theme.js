import * as types from '../types'
import Storage from '../../public/storage'

const state = {
  theme: Storage.get('theme') || 'light'
}

const mutations = {
  [types.LIGHT] (state) {
    state.theme = 'light'
  },
  [types.DARK] (state) {
    state.theme = 'dark'
  }
}

const actions = {
  changeTheme ({ commit }) {
    if (state.theme === 'light') {
      Storage.set('theme', 'dark')
      commit(types.DARK)
    } else {
      Storage.set('theme', 'light')
      commit(types.LIGHT)
    }
  }
}

const getters = {
  isDark () {
    return state.theme === 'dark'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
