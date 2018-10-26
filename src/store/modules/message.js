import * as types from '../types'

const state = {
  msg: '',
  type: ''
}

const mutations = {
  [types.SHOWMSG] (state, data) {
    state.msg = data.msg
    state.type = data.type
  },
  [types.CLOSEMSG] (state) {
    state.msg = ''
  }
}

const actions = {
  showMsg ({ commit }, data) {
    commit(types.SHOWMSG, data)
  },
  closeMsg ({ commit }) {
    commit(types.CLOSEMSG)
  }
}

const getters = {
  hasMsg () {
    return state.msg !== ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
