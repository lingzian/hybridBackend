import Vue from 'vue'
import I18n from 'vue-i18n'
import cn from './cn' // 简体
import tw from './tw' // 繁体
import en from './en' // 英文

let locale = localStorage.getItem('language')
// 如果用户没设置过语言，取系统默认语言
if (!locale) {
  let systemLanguage = navigator.language.toLocaleLowerCase().replace(/-/g, '')
  if (systemLanguage.includes('tw')) {
    locale = 'tw'
  } else if (systemLanguage.includes('cn')) {
    locale = 'cn'
  } else {
    locale = 'en'
  }
  localStorage.setItem('language', locale)
}
Vue.use(I18n)

export default new I18n({
  locale,
  messages: {
    cn,
    tw,
    en
  }
})
