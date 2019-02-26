// 工种管理

import WorkManage from '../../pages/workManage'
import ListWorkManage from '../../pages/workManage/list'
import EditWorkManage from '../../pages/workManage/edit'

export default{
  path: '/WorkManage',
  name: 'WorkManage',
  component: WorkManage,
  redirect: '/WorkManage',
  children: [
    {
      path: '/WorkManage',
      name: 'WorkManage',
      component: ListWorkManage
    },
    {
      path: '/WorkManage/EditWorkManage',
      name: 'EditWorkManage',
      component: EditWorkManage,
      meta: {
        need: 'id',
        redirect: 'WorkManage'
      }
    }
  ]
}
