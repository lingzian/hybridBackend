import axios from '@/plugins/axios'

// 简历列表
export const resumes = data => axios({
  url: 'resumes',
  method: 'get',
  params: data || {}
})

// 简历详情
export const resume = id => axios({
  url: `resumes/${id}`,
  method: 'get'
})

// 编辑简历状态
export const editResume = (data, id) => axios({
  url: `resumes/${id}/status`,
  method: 'put',
  data: data
})

// 简历状态可选项
export const resumeState = data => axios({
  url: 'resumes/statuses',
  method: 'get',
  params: data || {}
})
