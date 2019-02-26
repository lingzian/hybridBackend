import axios from '@/plugins/axios'

// 技能列表
export const skills = data => axios({
  url: 'abilities',
  method: 'get',
  params: data || {}
})

// 新增技能
export const addSkill = data => axios({
  url: 'abilities',
  method: 'post',
  data: data
})

// 删除技能
export const delSkill = id => axios({
  url: `abilities/${id}`,
  method: 'delete'
})

// 技能详情
export const skill = id => axios({
  url: `abilities/${id}`,
  method: 'get'
})

// 编辑技能
export const editSkill = (data, id) => axios({
  url: `abilities/${id}`,
  method: 'put',
  data: data
})
