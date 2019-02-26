import axios from '@/plugins/axios'

// 公司列表
export const companys = data => axios({
  url: 'companies',
  method: 'get',
  params: data || {}
})

// 公司详情
export const company = id => axios({
  url: `companies/${id}`,
  method: 'get'
})

// 新增公司
export const addCompany = data => axios({
  url: 'companies',
  method: 'post',
  data: data
})

// 编辑公司
export const editCompany = (data, id) => axios({
  url: `companies/${id}`,
  method: 'put',
  data: data
})

// 删除公司
export const delCompany = id => axios({
  url: `companies/${id}`,
  method: 'delete'
})
