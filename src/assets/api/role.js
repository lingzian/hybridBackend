import axios from '@/plugins/axios'

// 角色列表
export const roles = data => axios({
  url: 'backend-roles',
  method: 'get',
  params: data || {}
})

// 删除角色
export const delRole = id => axios({
  url: `backend-roles/${id}`,
  method: 'delete'
})

// 角色詳情
export const role = id => axios({
  url: `backend-roles/${id}`,
  method: 'get'
})

// 新增角色
export const addRole = data => axios({
  url: 'backend-roles',
  method: 'post',
  data: data
})

// 更新角色
export const editRole = (data, id) => axios({
  url: `backend-roles/${id}`,
  method: 'put',
  data: data
})
