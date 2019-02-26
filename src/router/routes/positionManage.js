// 职位管理
import PositionManage from '../../pages/positionManage'
import ListPositionManage from '../../pages/positionManage/list'
import AddPositionManage from '../../pages/positionManage/add'
import EditPositionManage from '../../pages/positionManage/edit'

export default {
  path: '/PositionManage',
  name: 'PositionManage',
  component: PositionManage,
  redirect: '/PositionManage',
  children: [
    {
      path: '/PositionManage',
      name: 'PositionManage',
      component: ListPositionManage
    },
    {
      path: '/PositionManage/AddPositionManage',
      name: 'AddPositionManage',
      component: AddPositionManage
    },
    {
      path: '/PositionManage/EditPositionManage',
      name: 'EditPositionManage',
      component: EditPositionManage,
      meta: {
        need: 'id',
        redirect: 'PositionManage'
      }
    }
  ]
}
