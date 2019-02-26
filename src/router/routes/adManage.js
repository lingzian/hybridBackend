// 广告管理
import AdManage from '../../pages/advManage'
import ListAdManage from '../../pages/advManage/list.vue'
import AddAdManage from '../../pages/advManage/add'
import EditAdManage from '../../pages/advManage/edit'

export default {
  path: '/AdManage',
  name: 'AdManage',
  component: AdManage,
  redirect: '/AdManage',
  children: [
    {
      path: '/AdManage',
      name: 'AdManage',
      component: ListAdManage
    },
    {
      path: '/AdManage/AddAdManage',
      name: 'AddAdManage',
      component: AddAdManage
    },
    {
      path: '/AdManage/EditAdManage',
      name: 'EditAdManage',
      component: EditAdManage,
      meta: {
        need: 'id',
        redirect: 'AdManage'
      }
    }
  ]
}
