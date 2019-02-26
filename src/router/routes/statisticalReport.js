// 统计报表
import StatisticalReport from '../../pages/statisticalReport'
import WebUserReport from '../../pages/statisticalReport/webUserReport'
import JobReport from '../../pages/statisticalReport/jobReport'

export default {
  path: '/StatisticalReport',
  name: 'StatisticalReport',
  component: StatisticalReport,
  children: [
    {
      path: '/StatisticalReport/WebUserReport',
      name: 'WebUserReport',
      component: WebUserReport
    },
    {
      path: '/StatisticalReport/JobReport',
      name: 'JobReport',
      component: JobReport
    }
  ]
}
