import * as type from '../types'
import api from '../../../api'

const state = {
  uid: '',
  uname: '',
  avatar: '',
  background: '',
  sign: ''
}

const mutations = {
  [type.GETUSERINFO] (state, user) {
    state.uid = user.uid
    state.uname = user.uname
    state.avatar = user.avatar
    state.background = user.background
    state.sign = user.sign
  },
  [type.UPLOADBACKGTOUND] (state, src) {
    state.background = src
  }
}

const actions = {
  getUserInfo ({ commit }, uid) {
    api.user.getUserInfo(uid).then(({ data }) => {
      console.log(data.user)
      commit(type.GETUSERINFO, data.user)
    })
  },
  uploadCb ({ commit }, payload) {
    if (payload.type === 'background') {
      commit(type.UPLOADBACKGTOUND, payload.src)
    } else if (payload.type === 'avatar') {
      // 更改session avatar
      commit('session/UPLOADAVATAR', payload.src, { root: true })
    }
  }
}

const getters = {
  uid: state => {
    return state.uid
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
