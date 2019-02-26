import axios from '@/plugins/axios'

// 菜单列表
export const menus = data =>
  axios({
    url: 'menus',
    method: 'get',
    params: data || {}
  })

// 新增菜单
export const addMenus = data =>
  axios({
    url: 'menus',
    method: 'post',
    data: data
  })

// 菜单详情
export const menu = id =>
  axios({
    url: `menus/${id}`,
    method: 'get'
  })

// 编辑菜单
export const editMenus = (data, id) =>
  axios({
    url: `menus/${id}`,
    method: 'put',
    data: data
  })

// 删除菜单
export const delMenu = id =>
  axios({
    url: `menus/${id}`,
    method: 'delete'
  })

// 所有 App 页面
export const allMenu = (data) =>
  axios({
    url: 'all/menu-activities',
    method: 'get',
    params: data || {}
  })
