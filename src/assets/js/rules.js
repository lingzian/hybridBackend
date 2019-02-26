import i18n from '@/plugins/i18n'
import { cloneObject } from './utils'
const noRequired = arr => {
  let newArr = cloneObject(arr, true)
  newArr.forEach(ele => {
    ele.required = false
  })
  return newArr
}

/*
  账号
*/
export const account = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '' || value === undefined) {
        if (this.required) {
          callback(new Error(i18n.t('tips.pleaseInputAccount')))
        } else {
          callback()
        }
      } else if (!/^[0-9a-zA-Z]{3,20}$/.test(value)) {
        callback(new Error(i18n.t('tips.accountFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  密码
*/
export const password = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '' || value === undefined) {
        if (this.required) {
          callback(new Error(i18n.t('tips.pleaseInputPassword')))
        } else {
          callback()
        }
      } else if (!/^[0-9a-zA-Z!@#$%^&*()_+,.]{6,20}$/.test(value)) {
        callback(new Error(i18n.t('tips.passwordFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  密码(非必填)
*/
export const passwordNoRequire = noRequired(password)

/*
  原始密码
*/
export const berforePassword = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '' || value === undefined) {
        if (this.required) {
          callback(new Error(i18n.t('tips.pleaseInputBeforePassword')))
        } else {
          callback()
        }
      } else if (!/^[0-9a-zA-Z!@#$%^&*()_+,.]{6,20}$/.test(value)) {
        callback(new Error(i18n.t('tips.passwordFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  性别选择
*/
export const sexSelect = [
  {
    required: true,
    message: i18n.t('data.selectSex'),
    trigger: 'change'
  }
]

/*
  雇主/雇员
*/
export const employer = [
  {
    required: true,
    message: i18n.t('data.selectEmployers'),
    trigger: 'change'
  }
]

/*
  雇主/雇员
*/
export const userEmployer = [
  {
    required: true,
    message: i18n.t('data.selectEmployer'),
    trigger: 'change'
  }
]

/*
  名称
*/
export const name = [
  {
    required: true,
    message: i18n.t('data.inputName'),
    trigger: 'blur'
  }
]

/*
  姓氏
*/
export const surname = [
  {
    required: true,
    message: i18n.t('data.inputSureName'),
    trigger: 'blur'
  }
]

/*
  中文名称
*/
export const zhName = [
  {
    required: true,
    message: i18n.t('data.inputZhName'),
    trigger: 'blur'
  }
]

/*
  英文名称
*/
export const enName = [
  {
    required: true,
    message: i18n.t('data.inputEnName'),
    trigger: 'blur'
  }
]
/*
  请输入描述
*/
export const description = [
  {
    required: true,
    message: i18n.t('data.inputDescription'),
    trigger: 'blur'
  }
]

/*
  排序
*/
export const sorting = [
  {
    required: true,
    message: i18n.t('data.inputSoring'),
    trigger: 'blur'
  }
]

/*
  邮箱
*/
export const email = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '' || value === undefined) {
        if (this.required) {
          callback(new Error(i18n.t('tips.pleaseInputEmail')))
        } else {
          callback()
        }
      } else if (
        !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
          value
        )
      ) {
        callback(new Error(i18n.t('tips.emailFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  邮箱(非必填)
*/
export const emailNoRequire = noRequired(email)

/*
  角色选择
*/
export const roleSelect = [
  {
    required: true,
    message: i18n.t('data.selectRole'),
    trigger: 'blur'
  }
]
/*
  选择目前工作地點
*/
export const workPlace = [
  {
    required: true,
    message: i18n.t('data.selectWorkPlace'),
    trigger: 'blur'
  }
]
/*
  选择工作地點
*/
export const workPlaces = [
  {
    required: true,
    message: i18n.t('data.selectWorkplaces'),
    trigger: 'blur'
  }
]
/*
  选择工作地點
*/
export const workArea = [
  {
    required: true,
    message: i18n.t('data.writeWorkPlace'),
    trigger: 'blur'
  }
]
/*
  选择工作地区
*/
export const workAreas = [
  {
    required: true,
    message: i18n.t('data.selectPlace'),
    trigger: 'blur'
  }
]
/*
  广告选择
*/
export const advSelect = [
  {
    required: true,
    message: i18n.t('data.selectAdv'),
    trigger: 'change'
  }
]

/*
  上级地区选择
*/
export const serviceSelect = [
  {
    required: true,
    message: i18n.t('data.selectService'),
    trigger: 'change'
  }
]

/*
  电话
*/
export const mobile = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '' || value === undefined) {
        if (this.required) {
          callback(new Error(i18n.t('tips.pleaseInputMobile')))
        } else {
          callback()
        }
      } else if (!/^[1][0-9]{10}$|^[6][0-9]{7}$|^[2][8][0-9]{6}$/.test(value)) {
        callback(new Error(i18n.t('tips.mobileFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  电话(非必填)
*/
export const mobileNoRequire = noRequired(mobile)

/*
  姓名
*/
export const realName = [
  {
    required: true,
    message: i18n.t('data.inputRealName'),
    trigger: 'blur'
  }
]

/*
  地址
*/
export const address = [
  {
    required: true,
    message: i18n.t('data.inputAddress'),
    trigger: 'blur'
  }
]

/*
  联系人
*/
export const contacts = [
  {
    required: true,
    message: i18n.t('data.inputContacts'),
    trigger: 'blur'
  }
]

/*
  前端用户名
*/
export const webName = [
  {
    required: true,
    message: i18n.t('data.inputWebName'),
    trigger: 'blur'
  }
]

/*
  url
*/
export const url = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '' || value === undefined) {
        callback(new Error(i18n.t('tips.pleaseInputURL')))
      } else if (
        !/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i.test(value)
      ) {
        callback(new Error(i18n.t('tips.pleaseInputCorrectURL')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  时间日期
*/
export const timeDate = [
  {
    required: true,
    message: i18n.t('tips.pleaseSelectTimeDate'),
    trigger: ['blur', 'change']
  }
]

/*
  请选择雇主国籍
*/
export const nationality = [
  {
    required: true,
    message: i18n.t('data.selectNationality'),
    trigger: 'change'
  }
]

/*
  请选择雇佣国籍
*/
export const hireNationality = [
  {
    required: true,
    message: i18n.t('data.selectHireNationality'),
    trigger: 'change'
  }
]

/*
  请选择佣工年龄
*/
export const hireAge = [
  {
    required: true,
    message: i18n.t('data.selectHireAge'),
    trigger: 'change'
  }
]
/*
  请选择年龄
*/
export const age = [
  {
    required: true,
    message: i18n.t('data.selectAge'),
    trigger: 'change'
  }
]

/*
  请选择性别
*/
export const sex = [
  {
    required: true,
    message: i18n.t('data.selectSex'),
    trigger: 'change'
  }
]

/*
  请选择工作状况
*/
export const workState = [
  {
    required: true,
    message: i18n.t('data.selectWorkState'),
    trigger: 'blur'
  }
]

/*
  请选择教育程度
*/
export const degreeEducation = [
  {
    required: true,
    message: i18n.t('data.selectDegreeEducation'),
    trigger: 'blur'
  }
]

/*
  请选择语言
*/
export const language = [
  {
    required: true,
    message: i18n.t('data.selectLanguage'),
    trigger: 'change'
  }
]

/*
  请选择每周假日
*/
export const holiday = [
  {
    required: true,
    message: i18n.t('data.selectHoliday'),
    trigger: 'change'
  }
]

/*
  请选择技能
*/
export const skill = [
  {
    required: true,
    message: i18n.t('data.selectSkill'),
    trigger: 'blur'
  }
]

/*
  请填写薪金
*/
export const pay = [
  {
    required: true,
    message: i18n.t('data.selectPay'),
    trigger: 'blur'
  }
]

/*
  请选择服务时间(月)
*/
export const serveTimeMount = [
  {
    required: true,
    message: i18n.t('data.selectMount'),
    trigger: 'blur'
  }
]
/*
  请选择服务时间(小时)
*/
export const serveTimeHour = [
  {
    required: true,
    message: i18n.t('data.selectTimeHour'),
    trigger: 'blur'
  }
]
/*
  请选择经验
*/
export const experience = [
  {
    required: true,
    message: i18n.t('data.selectExperience'),
    trigger: 'blur'
  }
]

/*
  请选择服务天数
*/
export const serveDay = [
  {
    required: true,
    message: i18n.t('data.selectServeDay'),
    trigger: 'blur'
  }
]
/*
  请选择服务(每星期)
*/
export const serveWeek = [
  {
    required: true,
    message: i18n.t('data.selectServeWeek'),
    trigger: 'blur'
  }
]
/*
  请选择工作所需小时
*/
export const serveNeedHour = [
  {
    required: true,
    message: i18n.t('data.selectNeedHour'),
    trigger: 'blur'
  }
]
/*
  请选择要求时段
*/
export const needTime = [
  {
    required: true,
    message: i18n.t('data.needTimes'),
    trigger: 'blur'
  }
]
/*
  请选择司机人数
*/
export const selectDirverAmount = [
  {
    required: true,
    message: i18n.t('data.selectDirver'),
    trigger: 'blur'
  }
]
/*
  请选择驾驶执照能力
*/
export const dirverAblity = [
  {
    required: true,
    message: i18n.t('data.selectDirverAblity'),
    trigger: 'blur'
  }
]
/*
  请选择车种
*/
export const carType = [
  {
    required: true,
    message: i18n.t('data.selectCar'),
    trigger: 'blur'
  }
]
/*
  担任
*/
export const selectAs = [
  {
    required: true,
    message: i18n.t('data.selectAs'),
    trigger: 'blur'
  }
]
/*
  请选择香港驾驶经验
*/
export const selectDirverExperience = [
  {
    required: true,
    message: i18n.t('data.selectDirverExperience'),
    trigger: 'blur'
  }
]
/*
  请选择经验年数
*/
export const selectDirverExperiences = [
  {
    required: true,
    message: i18n.t('data.selectDirverExperiences'),
    trigger: 'blur'
  }
]
/*
  请选择App页面ID
*/
export const selectMenuPage = [
  {
    required: true,
    message: i18n.t('data.selectMenuPage'),
    trigger: 'blur'
  }
]
/*
  请选择婚姻状况
*/
export const selectMarriedStatus = [
  {
    required: true,
    message: i18n.t('data.selectMarriedStatus'),
    trigger: 'blur'
  }
]
/*
  请选择住宿
*/
export const selectAccommodation = [
  {
    required: true,
    message: i18n.t('data.selectAccommodation'),
    trigger: 'blur'
  }
]

/**
 * 請填寫工作範圍
 *
 */
export const inputWorkScope = [
  {
    required: true,
    message: i18n.t('data.inputWorkScope'),
    trigger: 'blur'
  }
]

// 性別
export const sexs = [
  {
    required: true,
    validator (rule, value, callback) {
      callback()
    },
    trigger: 'change'
  }
]
// 中澳駕駛經驗
export const chineseDrivingAge = [
  {
    required: true,
    validator (rule, value, callback) {
      callback()
    },
    trigger: 'change'
  }
]
