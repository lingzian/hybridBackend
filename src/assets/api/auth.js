import axios from '@/plugins/axios'

// 所有限权
export const getAuths = data => axios({
  url: 'all/backend-permissions',
  method: 'get',
  params: data || {}
})

// 权限列表
export const auths = data => axios({
  url: 'backend-permissions',
  method: 'get',
  params: data || {}
})
