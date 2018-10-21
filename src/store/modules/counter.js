const state = {
  count: 0
}

// 更新state函数对象
const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  }
}

// 对应事件回调函数对象
const actions = {
  increment ({ commit, dispatch }) {
    // 提交mutation
    commit('INCREMENT')
  },
  decrement ({ commit }) {
    commit('DECREMENT')
  },
  incrementIfOdd ({ commit, state }) {
    if ((state.count % 2) === 1) {
      commit('INCREMENT')
    }
  },
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 3000)
  }
}

// 计算属性函数对象
const getters = {
  evenOrOdd () {
    return state.count % 2 === 0 ? 'even' : 'odd'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
