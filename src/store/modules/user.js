import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { reject, resolve } from 'core-js/fn/promise'
import request from '@/utils/request'


const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_ROLES (state, roles) {
    state.roles = roles
  }
}

const actions = {
  // user login
  login ({ commit, state }, userInfo) {
    const { userName, password } = userInfo
    console.log(userInfo);
    return new Promise((resolve, reject) => {
      login({ username: userName.trim(), password })
        .then(response => {
          const { data } = response
          console.log(response);
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        const { data } = res
        const { roles } = data
        console.log('roles', roles);
        commit('SET_ROLES', roles)
        resolve(res)
      })
    })
  },
  logout ({ commit, state }) {
    return new Promise((reslove, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          reslove()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}