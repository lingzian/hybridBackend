import axios from '@/plugins/axios'

/*
  登录
*/

export const login = data => axios({
  url: 'login',
  method: 'post',
  data: data
})

/*
  退出登录
*/
export const logout = data => axios({
  url: 'logout',
  method: 'post',
  data: data
})

/*
  图片上传
*/
export const uploadPic = (data, isFormData) => axios({
  url: 'upload/images',
  method: 'post',
  data: data,
  isFormData: isFormData || false
})

/*
  视频上传
*/
export const uploadVideo = (data, isFormData) => axios({
  url: 'upload/videos',
  method: 'post',
  data: data,
  isFormData: isFormData || false
})
