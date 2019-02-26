import Vue from 'vue'
import App from './App.vue'

// 路由
import router from './router'

// vuex
import store from './store'

// 多语言
import i18n from './plugins/i18n'

// element UI
import './plugins/element-ui'

// 全局组件
import '@/components'

// 全局过滤
import '@/assets/js/filter'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created: function () {
    try {
      // 根据当前语言环境设置 Title
      document.title = i18n.t('data.helper')
    } catch (e) {
      console.log(e)
    }
  }
}).$mount('#app')
