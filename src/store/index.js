import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    // 使用時機：登入時
    // 第一個參數為 state, 第二個參數為 payload
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      // 將 token 放進 state
      state.token = localStorage.getItem('token')
    },
    // 使用時機：登入時驗證不通過時或登出時
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    // 在 actions 中可以透過參數的方式取得 commit 的方法
    // 方法二： 
    // fetchCurrentUser({commit}) {
    //    commit()   
    // }
    // 方法二： 
    // fetchCurrentUser(context) {
    //    context.commit()   
    // }
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        // commit a mutation
        commit('setCurrentUser', {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
          isAdmin: data.isAdmin,
        })
        return true
      } catch (error) {
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
