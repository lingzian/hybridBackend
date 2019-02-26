import axios from '@/plugins/axios'

// 前端用戶列表
export const webUsers = data => axios({
  url: 'users',
  method: 'get',
  params: data || {}
})

// 前端用户详情
export const webUser = id => axios({
  url: `users/${id}`,
  method: 'get'
})
