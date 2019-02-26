import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(Router)

const route = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE,
  base: process.env.VUE_APP_BASE_URL,
  routes
})

// 如果没有登录就跳到登录页
route.beforeEach((to, from, next) => {
  if (!store.state.user.login && to.name !== 'SignIn') {
    store.dispatch('user/logout').then(() => {
      next({
        name: 'SignIn',
        replace: true
      })
    })
  } else if (to.meta.need !== undefined) {
    let need = to.meta.need
    let redirect = to.meta.redirect
    if (!to.query[need]) {
      next({
        name: redirect,
        replace: true
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default route
