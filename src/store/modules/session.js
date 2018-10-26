import * as type from '../types'
import api from '../../../api'

const state = {
  uid_s: '',
  name_s: '',
  avatar_s: '',
  showLogin_s: false
}

const mutations = {
  [type.GETSESSIONINFO] (state, user) {
    console.log('user: ', user)
    state.uid_s = user.uid
    state.name_s = user.uname
    state.avatar_s = user.avatar
  },
  [type.UPLOADAVATAR] (state, src) {
    state.avatar_s = src
  },
  [type.SHOWLOGIN] (state) {
    state.showLogin_s = true
  },
  [type.CLOSELOGIN] (state) {
    state.showLogin_s = false
  }
}

const actions = {
  getSessionInfo ({ commit }, uid) {
    api.user.getUserInfo(uid).then(({ data }) => {
      commit(type.GETSESSIONINFO, data.user)
    })
  },
  showLogin ({ commit }) {
    commit(type.SHOWLOGIN)
  },
  closeLogin ({ commit }) {
    commit(type.CLOSELOGIN)
  }
}

const getters = {
  isLogined: state => {
    if (typeof (state.uid_s) === 'number') {
      return true
    }
    return false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
