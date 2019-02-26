/*
  vue 全局注册的组件
*/
import Vue from 'vue'
import BreadCrumb from './common/breadcrumb'
import Pagination from './common/pagination'
import CommonSearch from './common/commonSearch'
import Images from './common/image'
import CommonSelect from './common/commonSelect'

/*
  面包屑
*/
Vue.component('BreadCrumb', BreadCrumb)

/*
  列表页 分页选择器
*/
Vue.component('Pagination', Pagination)

/*
  搜索
*/
Vue.component('CommonSearch', CommonSearch)

/*
  图片
*/
Vue.component('Images', Images)

/*
  下拉选择
*/
Vue.component('CommonSelect', CommonSelect)
