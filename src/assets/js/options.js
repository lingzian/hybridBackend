import i18n from '@/plugins/i18n'

/*
  语言 cn 简体中文 tw 繁体中文
*/
export const languageOptions = [
  {
    value: 'cn',
    label: i18n.t('data.cn')
  },
  {
    value: 'tw',
    label: i18n.t('data.tw')
  },
  {
    value: 'en',
    label: i18n.t('data.en')
  }
]

/*
  雇主/雇员
*/
export const employerOremployee = [
  {
    label: i18n.t('data.employers'),
    value: 1
  },
  {
    label: i18n.t('data.employees'),
    value: 2
  }
]
/*
  1.主要技能 2.特殊技能
*/
export const skillOptions = [
  {
    label: i18n.t('data.mainSkill'),
    value: 1
  },
  {
    label: i18n.t('data.specialSkills'),
    value: 2
  }
]

/*
  活动状态 0 禁用 1 可用
*/
export const activeOptions = [
  {
    label: i18n.t('data.able'),
    value: 1
  },
  {
    label: i18n.t('data.disable'),
    value: 0
  }
]

/*
  活动状态 0 禁用 1 可用 2 待验证
*/
export const statusOptions = [
  {
    label: i18n.t('data.able'),
    value: 1
  },
  {
    label: i18n.t('data.disable'),
    value: 0
  },
  {
    label: i18n.t('data.verify'),
    value: 2
  }
]

/*
  操作方式： 0: 无 1: url
*/
export const action = [
  {
    label: i18n.t('data.url'),
    value: 1
  },
  {
    label: i18n.t('data.nothing'),
    value: 0
  }
]

/*
  操作方式： 0: 不需要 1: 需要
*/
export const anyNeed = [
  {
    label: i18n.t('data.need'),
    value: 1
  },
  {
    label: i18n.t('data.dontNeed'),
    value: 0
  }
]

/*
  操作方式： 0: 没有 1: 有
*/
export const any = [
  {
    label: i18n.t('data.have'),
    value: 1
  },
  {
    label: i18n.t('data.none'),
    value: 0
  }
]

/*
  所属工种 1: 外籍家傭 2: 陪月 3： 兼职家务助理 4： 保姆/照顾者 5： 外籍司机 6： 外机司机
*/
export const jobOptions = [
  {
    label: i18n.t('data.foreignWorker'),
    value: 1
  },
  {
    label: i18n.t('data.bbCare'),
    value: 2
  },
  {
    label: i18n.t('data.houseWork'),
    value: 3
  },
  {
    label: i18n.t('data.bbsister'),
    value: 4
  },
  {
    label: i18n.t('data.foreignDirver'),
    value: 5
  },
  {
    label: i18n.t('data.foreignDirver'),
    value: 6
  }
]

/*
  操作方式： 1: 男 2: 女
*/
export const sex = [
  {
    label: i18n.t('data.man'),
    value: 1
  },
  {
    label: i18n.t('data.girl'),
    value: 2
  }
]

/*
  司机人数
*/
export const dirverAmount = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '3+',
    value: '3+'
  }
]

/*
  服务月数
*/
export const serveMonth = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  }
]

/*
  菜单类型： 1: App页面 2: URL
*/
export const menuType = [
  {
    label: i18n.t('data.AppPage'),
    value: '1'
  },
  {
    label: 'URL',
    value: '2'
  }
]

/*
  用户类型
*/
export const userType = [
  {
    label: i18n.t('data.visitor'),
    value: '0'
  },
  {
    label: i18n.t('data.employers'),
    value: '1'
  },
  {
    label: i18n.t('data.employees'),
    value: '2'
  }
]
