import * as type from '../types'
import api from '../../../api'
import { getCookie } from '../../public/utils'

const state = {
  uid_s: '',
  uname_s: '',
  avatar_s: 'https://raw.githubusercontent.com/galmoe/galmoe-ts/master/public/images/akkarin.jpg',
  showLogin_s: false
}

const mutations = {
  [type.GETSESSIONINFO] (state, user) {
    state.uid_s = user.uid
    state.uname_s = user.uname
    state.avatar_s = user.avatar || state.avatar_s
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
    return typeof (state.uid_s) === 'number'
  },
  isMyself: (state, rootGetters, rootState) => {
    const cuid = Number(getCookie('cuid'))
    return cuid === state.uid_s && rootState.user.uid === state.uid_s
  },
  isAdmin: state => {
    return state.uid_s === 1
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
