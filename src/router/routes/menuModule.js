// 菜单管理
import IndexMenu from '../../pages/menuModule'
import ListIndexMenu from '../../pages/menuModule/list'
import AddIndexMenu from '../../pages/menuModule/add'
import EditIndexMenu from '../../pages/menuModule/edit'

export default {
  path: '/IndexMenu',
  name: 'IndexMenu',
  component: IndexMenu,
  redirect: '/IndexMenu',
  children: [
    {
      path: '/IndexMenu',
      name: 'IndexMenu',
      component: ListIndexMenu
    },
    {
      path: '/IndexMenu/AddIndexMenu',
      name: 'AddIndexMenu',
      component: AddIndexMenu
    },
    {
      path: '/IndexMenu/EditIndexMenu',
      name: 'EditIndexMenu',
      component: EditIndexMenu,
      meta: {
        need: 'id',
        redirect: 'IndexMenu'
      }
    }
  ]
}
