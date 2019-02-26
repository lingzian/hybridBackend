import axios from '@/plugins/axios'

/*
  后台用户列表
*/
export const backendUsers = data => axios({
  url: 'backend-users',
  method: 'get',
  params: data || {}
})

/*
  后台用户详情
*/
export const backendUser = id => axios({
  url: `backend-users/${id}`,
  method: 'get'
})

/*
  编辑后台用户
*/
export const editbackendUser = (data, id) => axios({
  url: `backend-users/${id}`,
  method: 'PUT',
  data: data
})

/*
  添加后台用户
*/
export const addBackendUser = data => axios({
  url: 'backend-users',
  method: 'post',
  data: data
})

/*
  删除后台用户
*/
export const delBackendUser = id => axios({
  url: `backend-users/${id}`,
  method: 'DELETE'
})

/*
  修改用户密码
*/
export const changePassword = data => axios({
  url: 'my/password',
  method: 'PUT',
  data: data
})
