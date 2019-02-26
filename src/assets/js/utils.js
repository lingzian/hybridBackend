import Vue from 'vue'
import i18n from '@/plugins/i18n'
/*
  消息提示
*/
export const messageTips = (str, type) => {
  Vue.prototype.$message({
    message: str,
    type: type || 'success'
  })
}

/*
  删除确认
*/
export const deleteConfirm = msg => {
  return Vue.prototype.$confirm(msg || i18n.t('tips.deleteConfirmation'), i18n.t('tips.tips'), {
    confirmButtonText: i18n.t('operation.sure'),
    cancelButtonText: i18n.t('operation.cancel'),
    type: 'warning'
  })
}

/*
  退出确认
*/
export const exitConfirm = () => deleteConfirm(i18n.t('tips.exitConfirmation'))

/*
  事件解绑
*/
export const removeEvent = (element, eType, bol) => {
  if (!element.eventSave) return false
  let handleType = eType.split('.')[0]
  let handleName = eType.split('.')[1] || 'all'
  if (!element.eventSave[handleName + handleType]) return false
  let handle = element.eventSave[handleName + handleType]
  if (element.addEventListener) {
    bol = bol === undefined ? false : bol
    element.removeEventListener(handleType, handle, bol)
  } else if (element.attachEvent) {
    element.detachEvent('on' + handleType, handle)
  } else {
    element['on' + handleType] = null
  }
}

/*
  绑定事件
*/
export const addEvent = (element, eType, handle, bol) => {
  if (!element.eventSave) {
    element.eventSave = {}
  }
  let handleType = eType.split('.')[0]
  let handleName = eType.split('.')[1] || 'all'
  if (!handleType) return false
  if (element.eventSave[handleName + handleType] !== undefined) {
    removeEvent(element, eType)
  }
  element.eventSave[handleName + handleType] = handle
  if (element.addEventListener) {
    bol = bol === undefined ? false : bol
    element.addEventListener(handleType, handle, bol)
  } else if (element.attachEvent) {
    element.attachEvent('on' + handleType, handle)
  } else {
    element['on' + handleType] = handle
  }
}

/*
  cookie
*/
export const cookie = {
  set (key, value, hours) {
    let d = new Date()
    d.setTime(d.getTime() + 60 * 60 * 1000 * hours)
    window.document.cookie =
      key + '=' + value + ';path=' + process.env.VUE_APP_BASE_URL + ';expires=' + d.toGMTString()
  },
  get (key) {
    let v = window.document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
    return v ? v[2] : null
  },
  del (key) {
    this.set(key, '', -1)
  }
}

/*
  生成uuid
*/
export const createUUID = () => {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  let uuid = s.join('')
  return uuid
}

/*
  获取设备
*/
export const getOperatingSystem = () => {
  let system = navigator.userAgent
  if (/window/gi.test(system)) {
    return 'windows'
  } else if (/mac/gi.test(system)) {
    return 'macOS'
  }
}

/*
  删除节点
*/
export const removeNode = node => {
  node && node.parentNode.removeChild(node)
}

/*
  克隆数组、对象
*/
export const cloneObject = (obj, complex) => {
  if (!complex) {
    return JSON.parse(JSON.stringify(obj))
  } else {
    let newObj = obj instanceof Array ? [] : {}
    for (let k in obj) {
      newObj[k] = typeof obj[k] === 'object' ? cloneObject(obj[k], true) : obj[k]
    }
    return newObj
  }
}

// 創建文件url
export const createObjectURL = file => {
  let url = ''
  if (window.createObjectURL !== undefined) {
    url = window.createObjectURL(file)
  } else if (window.URL !== undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

// 回收文件url
export const revokeObjectURL = url => {
  if (window.createObjectURL !== undefined) {
    window.revokeObjectURL(url)
  } else if (window.URL !== undefined) {
    window.URL.revokeObjectURL(url)
  } else if (window.webkitURL !== undefined) {
    window.webkitURL.revokeObjectURL(url)
  }
}

// 圖片轉換base64
export const imgToBase64 = (fileUrl, isRevokeURL = true) => {
  return new Promise(resolve => {
    let img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = fileUrl
    img.onload = () => {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      let url = canvas.toDataURL('image/jpg')
      if (isRevokeURL) {
        revokeObjectURL(fileUrl)
      }
      resolve(url)
    }
  })
}

// 獲取視頻的圖片base64
export const captureVideoImage = (fileUrl, isRevokeURL = true) => {
  return new Promise(resolve => {
    let video = document.createElement('video')
    video.crossOrigin = 'Anonymous'
    video.src = fileUrl
    video.onloadeddata = () => {
      let canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
      let url = canvas.toDataURL('image/jpg')
      if (isRevokeURL) {
        revokeObjectURL(fileUrl)
      }
      resolve(url)
    }
  })
}
