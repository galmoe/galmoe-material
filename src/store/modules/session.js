import * as type from '../types'
import api from '../../../api'

const state = {
  uid_s: '',
  name_s: '',
  avatar_s: ''
}

const mutations = {
  [type.GETSESSIONINFO] (state, user) {
    state.uid_s = user.uid
    state.name_s = user.uname
    state.avatar_s = user.avatar
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
      commit(type.GETSESSIONINFO, data.user)
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
