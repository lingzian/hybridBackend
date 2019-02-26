import axios from '@/plugins/axios'

// 国籍列表
export const nationalitys = data => axios({
  url: 'nationalities',
  method: 'get',
  params: data || {}
})

// 新增国籍
export const addNationality = data => axios({
  url: 'nationalities',
  method: 'post',
  data: data
})

// 删除国籍
export const delNationality = id => axios({
  url: `nationalities/${id}`,
  method: 'delete'
})

// 国籍详情
export const nationality = id => axios({
  url: `nationalities/${id}`,
  method: 'get'
})

// 编辑国籍
export const editNationality = (data, id) => axios({
  url: `nationalities/${id}`,
  method: 'put',
  data: data
})
