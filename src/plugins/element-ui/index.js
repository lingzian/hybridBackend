import Vue from 'vue'
import ElementUI from 'element-ui'
import './element-variables.scss'

Vue.use(ElementUI)

const language = localStorage.getItem('language')
const locale = require('element-ui/lib/locale').default
if (language === 'tw') {
  locale.use(
    require('element-ui/lib/locale/lang/zh-TW').default
  )
} else if (language === 'cn') {
  locale.use(
    require('element-ui/lib/locale/lang/zh-CN').default
  )
} else {
  locale.use(
    require('element-ui/lib/locale/lang/en').default
  )
}
