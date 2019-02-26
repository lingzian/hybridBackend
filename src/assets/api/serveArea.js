import axios from '@/plugins/axios'

// 服务地区列表
export const services = data => axios({
  url: 'service-areas',
  method: 'get',
  params: data || {}
})

// 新增服务地区
export const addService = data => axios({
  url: 'service-areas',
  method: 'post',
  data: data
})

// 删除服务地区
export const delService = id => axios({
  url: `service-areas/${id}`,
  method: 'delete'
})

// 服务地区详情
export const service = id => axios({
  url: `service-areas/${id}`,
  method: 'get'
})

// 编辑服务地区
export const editService = (data, id) => axios({
  url: `service-areas/${id}`,
  method: 'put',
  data: data
})

// 所有一级地区
export const allService = (data) => axios({
  url: 'all/top-service-areas',
  method: 'get',
  params: data || {}
})
