import Main from '../../view/main'

// 首页
import Index from '../../pages/index'

// 广告管理
import AdManage from './adManage'

// 菜单管理
import MenuModule from './menuModule'

// 消息管理
import MessManage from './messManage'

// 公司管理
import CompanyManage from './companyManage'

// 职位管理
import PositionManage from './positionManage'

// 简历管理
import ResumeManage from './resumeManage'

// 前端用户管理
import WebUserManage from './webUserManage'

// 工种管理
import WorkManage from './workManage'

// 系统管理
import SystemManage from './systemManage'

// 统计报表
import StatisticalReport from './statisticalReport'

// 操作日志
import OperationLog from './operationLog'

export default {
  path: '/',
  name: 'Main',
  component: Main,
  children: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    AdManage,
    MenuModule,
    MessManage,
    CompanyManage,
    PositionManage,
    ResumeManage,
    WebUserManage,
    WorkManage,
    SystemManage,
    StatisticalReport,
    OperationLog
  ]
}
