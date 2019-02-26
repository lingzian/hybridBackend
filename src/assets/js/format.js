import i18n from '@/plugins/i18n'
/*
  没有数据 转换成 未填写
*/
export const formatDataNull = data => {
  if (!data) {
    return i18n.t('data.noWrite')
  } else {
    return data
  }
}

/*
  秒位时间戳 转换日期
*/
export const formatDate = timestamp => {
  if (!timestamp || timestamp === '0') {
    return i18n.t('data.nothing')
  }
  timestamp = parseInt(timestamp) * 1000
  let date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  let dateRes = `${year}-${month}-${day}`
  return dateRes
}
// 时间戳转换时间
export const formatHour = timestamp => {
  if (!timestamp || timestamp === '0') {
    return i18n.t('data.nothing')
  }
  let date = new Date(timestamp)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  let time = `${hours}:${minutes}:${seconds}`
  return time
}

/*
  日期 转换 秒位时间戳
*/
export const formatDateContrary = date => {
  const dateSplit = date.split('-').map(ele => parseInt(ele))
  const newDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2])
  return newDate.getTime() / 1000
}

/*
  秒位时间戳 转换日期时间
*/
export const formatTime = (timestamp, isLast) => {
  if (!timestamp || timestamp === '0') {
    return i18n.t('data.nothing')
  }
  let dateRes = formatDate(timestamp)
  timestamp = parseInt(timestamp) * 1000
  let date = new Date(timestamp)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  let time = `${dateRes} ${hours}:${minutes}:${seconds}`
  if (isLast) {
    return time.split(' ')[0] + ' 23:59:59'
  } else {
    return time
  }
}

/*
  转换活动状态 0 禁用 1 可用
*/
export const formatActive = status => {
  status = parseInt(status)
  if (status === 0) {
    return i18n.t('data.disable')
  } else if (status === 1) {
    return i18n.t('data.able')
  } else {
    return status
  }
}

/*
  转换活动状态 0 禁用 1 可用 2 待验证
*/
export const formatStatus = status => {
  status = parseInt(status)
  if (status === 0) {
    return i18n.t('data.disable')
  } else if (status === 1) {
    return i18n.t('data.able')
  } else if (status === 2) {
    return i18n.t('data.verify')
  } else {
    return status
  }
}
/*
  转换活动状态 0 禁用 1 可用 2 待审核 3审核失败
*/
export const formatStatuss = status => {
  status = parseInt(status)
  if (status === 0) {
    return i18n.t('data.disable')
  } else if (status === 1) {
    return i18n.t('data.able')
  } else if (status === 2) {
    return i18n.t('data.toAudit')
  } else if (status === 3) {
    return i18n.t('data.faileAudit')
  } else {
    return status
  }
}

/*
  转换活动状态 1 雇主 2 雇員
*/
export const formatType = type => {
  type = parseInt(type)
  if (type === 1) {
    return i18n.t('data.employers')
  } else if (type === 2) {
    return i18n.t('data.employees')
  } else {
    return type
  }
}

/*
  广告操作方式 1 url 0 无
*/
export const formatAction = action => {
  action = parseInt(action)
  if (action === 1) {
    return i18n.t('data.url')
  } else if (action === 0) {
    return i18n.t('data.nothing')
  } else {
    return action
  }
}

/*
  技能 1.主要技能 2.特殊技能
*/
export const formatSkillType = action => {
  action = parseInt(action)
  if (action === 1) {
    return i18n.t('data.mainSkill')
  } else if (action === 2) {
    return i18n.t('data.specialSkills')
  } else {
    return action
  }
}

// 婚姻状态
export const formatMarital = val => {
  if (val === '1') {
    return i18n.t('data.getMarried')
  } else {
    return i18n.t('data.unMarried')
  }
}

// 可以 不可以
export const formatCan = val => {
  if (val === '1') {
    return i18n.t('data.can')
  } else {
    return i18n.t('data.cannot')
  }
}

// 需要 不需要
export const formatNeed = val => {
  if (val === '1') {
    return i18n.t('data.need')
  } else {
    return i18n.t('data.dontNeed')
  }
}

// 有 没有
export const formatHave = val => {
  if (val === '1') {
    return i18n.t('data.have')
  } else {
    return i18n.t('data.none')
  }
}

// 类型: 1:App页面 2:URL
export const formatPageType = val => {
  if (val === '1') {
    return i18n.t('data.AppPage')
  } else {
    return i18n.t('data.url')
  }
}

/*
  转换活动状态 1 成功 2 失败
*/
export const formatSuccess = status => {
  status = parseInt(status)
  if (status === 1) {
    return i18n.t('data.success')
  } else if (status === 1) {
    return i18n.t('data.faile')
  } else {
    return status
  }
}
