import axios from '@/plugins/axios'

// 后台用户操作日志
export const operations = data =>
  axios({
    url: 'backend-user-operations',
    method: 'get',
    params: data || {}
  })
