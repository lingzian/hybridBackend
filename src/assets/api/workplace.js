import axios from '@/plugins/axios'

// 工作地区列表
export const workplaces = data => axios({
  url: 'workplaces',
  method: 'get',
  params: data || {}
})

// 新增工作地区
export const addWorkplace = data => axios({
  url: 'workplaces',
  method: 'post',
  data: data
})

// 删除工作地区
export const delWorkplace = id => axios({
  url: `workplaces/${id}`,
  method: 'delete'
})

// 工作地区详情
export const workplace = id => axios({
  url: `workplaces/${id}`,
  method: 'get'
})

// 编辑工作地区
export const editWorkplace = (data, id) => axios({
  url: `workplaces/${id}`,
  method: 'put',
  data: data
})
