// 前端用户管理
import WebUserManage from '../../pages/webUserManage'
import ListWebUserManage from '../../pages/webUserManage/list.vue'
import AddWebUserManage from '../../pages/webUserManage/add'
import EditWebUserManage from '../../pages/webUserManage/edit'

export default {
  path: '/WebUserManage',
  name: 'WebUserManage',
  component: WebUserManage,
  redirect: '/WebUserManage',
  children: [
    {
      path: '/WebUserManage',
      component: ListWebUserManage
    },
    {
      path: '/WebUserManage/AddWebUserManage',
      name: 'AddWebUserManage',
      component: AddWebUserManage
    },
    {
      path: '/WebUserManage/EditWebUserManage',
      name: 'EditWebUserManage',
      component: EditWebUserManage,
      meta: {
        need: 'id',
        redirect: 'WebUserManage'
      }
    }
  ]
}
