import axios from '@/plugins/axios'

// 工种列表
export const works = data => axios({
  url: 'job-types',
  method: 'get',
  params: data || {}
})

// 工种详情
export const work = id => axios({
  url: `job-types/${id}`,
  method: 'get'
})

// 编辑工种
export const editWork = (data, id) => axios({
  url: `job-types/${id}`,
  method: 'put',
  data: data
})
