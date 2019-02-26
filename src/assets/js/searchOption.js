import i18n from '@/plugins/i18n'
/*
  web前端用户
*/
export const webUserSearch = [
  {
    name: i18n.t('data.name'),
    key: 'username',
    type: 'text'
  },
  {
    name: i18n.t('data.type'),
    key: 'type',
    type: 'select',
    options: [
      {
        label: i18n.t('data.employers'),
        value: 1
      },
      {
        label: i18n.t('data.employees'),
        value: 2
      }
    ]
  }
]

/*
  后台用户
*/
export const backendSearch = [
  {
    name: i18n.t('data.name'),
    key: 'username',
    type: 'text'
  },
  {
    name: i18n.t('status.status'),
    key: 'status',
    type: 'select',
    options: [
      {
        label: i18n.t('data.able'),
        value: 1
      },
      {
        label: i18n.t('data.disable'),
        value: 0
      }
    ]
  }
]

/*
  限权列表 /
*/
export const authSearch = [
  {
    name: i18n.t('data.name'),
    key: 'keyword',
    type: 'text'
  }
]

/*
  角色列表 /
*/
export const roleSearch = [
  {
    name: i18n.t('data.name'),
    key: 'keyword',
    type: 'text'
  }
]

/*
  公司列表
*/
export const companySearch = [
  {
    name: i18n.t('data.name'),
    key: 'name',
    type: 'text'
  }
]

/*
  工种列表
*/
export const workSearch = [
  {
    name: i18n.t('data.name'),
    key: 'name',
    type: 'text'
  }
]

/*
  操作日志
*/
export const userLogSearch = [
  {
    name: i18n.t('data.userName'),
    key: 'name',
    type: 'text'
  },
  {
    name: i18n.t('data.username'),
    key: 'username',
    type: 'text'
  },
  {
    name: i18n.t('data.operationTime'),
    key: 'onlineTime',
    type: 'date'
  }
]

/*
  工作地区
*/
export const workplaceSearch = [
  {
    name: i18n.t('data.name'),
    key: 'name',
    type: 'text'
  },
  {
    name: i18n.t('status.status'),
    key: 'status',
    type: 'select',
    options: [
      {
        label: i18n.t('data.able'),
        value: 1
      },
      {
        label: i18n.t('data.disable'),
        value: 0
      }
    ]
  }
]

// 广告列表
export const advSearch = [
  {
    name: i18n.t('data.name'),
    key: 'name',
    type: 'text'
  },
  {
    name: i18n.t('status.status'),
    key: 'status',
    type: 'select',
    options: [
      {
        label: i18n.t('data.able'),
        value: 1
      },
      {
        label: i18n.t('data.disable'),
        value: 0
      }
    ]
  }
]

/*
  技能列表
*/
export const skillSearch = [
  {
    name: i18n.t('data.name'),
    key: 'name',
    type: 'text'
  },
  {
    name: i18n.t('status.status'),
    key: 'status',
    type: 'select',
    options: [
      {
        label: i18n.t('data.able'),
        value: 1
      },
      {
        label: i18n.t('data.disable'),
        value: 0
      }
    ]
  },
  {
    name: i18n.t('data.type'),
    key: 'type',
    type: 'select',
    options: [
      {
        label: i18n.t('data.mainSkill'),
        value: 1
      },
      {
        label: i18n.t('data.specialSkills'),
        value: 2
      }
    ]
  }
]

/*
  国籍列表
*/
export const nationalitySearch = [
  {
    name: i18n.t('data.name'),
    key: 'name',
    type: 'text'
  },
  {
    name: i18n.t('status.status'),
    key: 'status',
    type: 'select',
    options: [
      {
        label: i18n.t('data.able'),
        value: 1
      },
      {
        label: i18n.t('data.disable'),
        value: 0
      }
    ]
  }
]

/*
  简历列表
*/
export const resumeSearch = [
  {
    name: i18n.t('data.selectWork'),
    key: 'type_id',
    type: 'select',
    need: 'works',
    options: []
  },
  {
    name: i18n.t('status.status'),
    key: 'status',
    type: 'select',
    options: [
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
  }
]

/*
  职位列表
*/
export const positionSearch = [
  {
    name: i18n.t('data.selectWork'),
    key: 'type_id',
    type: 'select',
    need: 'works',
    options: []
  },
  {
    name: i18n.t('status.status'),
    key: 'status',
    type: 'select',
    options: [
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
  }
]

/*
  服务地区列表
*/
export const serviceSearch = [
  {
    name: i18n.t('data.areaName'),
    key: 'name',
    type: 'text'
  },
  {
    name: i18n.t('data.topOfName'),
    key: 'parent_id',
    type: 'select',
    need: 'service',
    options: []
  }
]
