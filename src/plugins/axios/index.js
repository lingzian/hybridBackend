import Axios from 'axios'
import qs from 'qs'
import { messageTips } from '@/assets/js/utils'
import router from '@/router'
import store from '@/store'

const token = store.state.user.token
let language = localStorage.getItem('language')
if (language === 'cn') {
  language = 'zh-CN'
} else if (language === 'tw') {
  language = 'zh-TW'
}

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_HOST + process.env.VUE_APP_API_VERSION,
  params: {
    access_token: token,
    lang: language
  }
})

// 請求攔截器
axios.interceptors.request.use(
  config => {
    const method = config.method
    if (method !== 'get' && !config.isFormData) {
      config.data = qs.stringify(config.data)
    }
    if (config.url.includes('login')) {
      delete config.params.accessToken
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    const code = parseInt(response.data.code)
    const message = response.data.message
    if (code !== 1000) {
      if (code === 401) {
        // token异常
        delete axios.defaults.params.accessToken
        store.dispatch('user/logout').then(() => {
          router.replace({
            name: 'SignIn'
          })
        })
      } else {
        messageTips(message, 'error')
        return Promise.reject(response.data)
      }
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios
