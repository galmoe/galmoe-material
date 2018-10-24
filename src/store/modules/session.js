import * as type from '../types'
import api from '../../../api'

const state = {
  uid_s: '',
  name_s: '',
  avatar_s: '',
  sign_s: ''
}

const mutations = {
  [type.GETUSERINFO] (state, user) {
    state.uid_s = user.uid
    state.name_s = user.uname
    state.avatar_s = user.avatar
    state.sign_s = user.sign
  },
  [type.UPLOADAVATAR] (state, src) {
    console.log('session avatar', src)
    state.avatar_s = src
  }
}

const actions = {
  getSessionInfo ({ commit }, uid) {
    api.user.getUserInfo(uid).then(({ data }) => {
      console.log(data.user)
      commit(type.GETUSERINFO, data.user)
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
