import * as types from '../types'

const state = {
  msg: '',
  type: ''
}

const mutations = {
  [types.CHANGEMSG] (state, data) {
    state.msg = data.msg
    state.type = data.type
  },
  [types.CLOSEMSG] (state) {
    state.msg = ''
  }
}

const actions = {
  changeMsg ({ commit, data }) {
    commit(types.CHANGEMSG, data)
  },
  closeMsg ({ commit }) {
    commit(types.CLOSEMSG)
  }
}

const getters = {
  hasMsg () {
    return state.msg !== ''
  },
  iconType () {
    switch (state.type) {
      case 'success':
        return 'check_circle'
      case 'info':
        return 'info'
      case 'warning':
        return 'priority_high'
      case 'error':
        return 'warning'
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
