import axios from '@/plugins/axios'
// import md5 from 'js-md5'
import { login, logout } from '@/assets/api/user'
import { cookie } from '@/assets/js/utils'

// 获取cookie上面的用户信息
let userData = cookie.get('user') ? JSON.parse(cookie.get('user')) : {}
// 用户token
const token = userData.token
// 用户名
const userName = userData.userName
// 用户id
const accountId = userData.accountId

export default{
  namespaced: true,
  state: {
    token: token,
    userName: userName,
    accountId: accountId,
    login: !!token
  },
  mutations: {
    afterLogin (state, data) {
      // 存储 token
      axios.defaults.params.access_token = data.access_token
      // 用户token
      state.token = data.access_token
      // 用户名
      state.userName = data.username
      // 用户id
      state.accountId = data.id
      cookie.set('accountId', data.id, 24)
      // 储存用户信息
      let info = {
        token: data.access_token,
        userName: data.username,
        accountId: data.id
      }
      cookie.set('user', JSON.stringify(info), 24)
      // 登录标识
      state.login = true
    },
    afterLogout (state) {
      state.token = ''
      state.accountId = ''
      cookie.del('accountId')
      cookie.del('user')
      state.login = false
    }
  },
  actions: {
    signIn ({ state, commit }, info) {
      localStorage.setItem('pathItem', JSON.stringify([]))
      localStorage.setItem('path', JSON.stringify([]))
      return new Promise((resolve, reject) => {
        let sendData = {
          username: info.username,
          password: info.password
        }
        login(sendData).then(res => {
          let data = res.data
          commit('afterLogin', data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout ({ state, commit }) {
      localStorage.removeItem('pathItem')
      localStorage.removeItem('path')
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('afterLogout')
          resolve()
        })
      })
    }
  }
}
