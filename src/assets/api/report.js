import axios from '@/plugins/axios'

// 职位统计
export const job = data =>
  axios({
    url: 'statistics/job',
    method: 'get',
    params: data || {}
  })

//  用户统计
export const user = data =>
  axios({
    url: 'statistics/user',
    method: 'get',
    params: data || {}
  })
