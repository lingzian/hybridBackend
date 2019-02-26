import Vue from 'vue'
import * as format from './format'

/*
  过滤参数
*/
const filter = {}
Object.keys(format).forEach(key => {
  filter[key] = new Proxy(format[key], {
    apply (target, ctx, args) {
      if (typeof args[0] === 'object' && typeof args[1] === 'object' && typeof args[3] === 'number') {
        let params = args[2]
        args.splice(0, 4)
        args.unshift(params)
      }
      return Reflect.apply(target, ctx, args)
    }
  })
})

/*
  添加全局过滤
*/
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

/*
  添加原型方法
*/
Vue.prototype.tableFilter = filter
