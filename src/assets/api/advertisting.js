import axios from '@/plugins/axios'

// 广告列表
export const advertistings = data => axios({
  url: 'ads',
  method: 'get',
  params: data || {}
})

// 新增广告
export const addAdvertisting = data => axios({
  url: 'ads',
  method: 'post',
  data: data
})

// 广告详情
export const advertisting = id => axios({
  url: `ads/${id}`,
  method: 'get'
})

// 编辑广告
export const editAdvertisting = (data, id) => axios({
  url: `ads/${id}`,
  method: 'put',
  data: data
})

// 删除广告

export const delAdvertisting = id => axios({
  url: `ads/${id}`,
  method: 'delete'
})

// 所有广告类型
export const allAdv = () => axios({
  url: 'all/ad-types',
  method: 'get'
})
