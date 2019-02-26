import axios from '@/plugins/axios'

// 工种列表
export const jobs = data => axios({
  url: 'jobs',
  method: 'get',
  params: data || {}
})

// 外籍家傭 编辑
export const editJob = (data, id) => axios({
  url: `jobs/${id}`,
  method: 'put',
  data: data
})

// 外籍家傭 新增
export const addJob = data => axios({
  url: 'jobs',
  method: 'post',
  data: data
})

// 外籍家傭 详情
export const WorkerOption = data => axios({
  url: 'jobs/data',
  method: 'get',
  params: data || {}
})
