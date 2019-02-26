import axios from '@/plugins/axios'

/*
  获取菜单
*/
export const menus = data => axios({
  url: 'my/backend-menus',
  method: 'get',
  params: data || {}
})
