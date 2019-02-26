// 系统管理
import SystemManage from '../../pages/systemManage'

// 权限
import AuthManage from '../../pages/systemManage/authManage/index'
import AddAuthManage from '../../pages/systemManage/authManage/add'
import EditAuthManage from '../../pages/systemManage/authManage/edit'

// 角色
import RoleManage from '../../pages/systemManage/roleManage/index'
import AddRoleManage from '../../pages/systemManage/roleManage/add'
import EditRoleManage from '../../pages/systemManage/roleManage/edit'

// 后端用户
import BackendManage from '../../pages/systemManage/backendManage/index'
import AddBackendManage from '../../pages/systemManage/backendManage/add'
import EditBackendManage from '../../pages/systemManage/backendManage/edit'

// 工作地区
import Workplace from '../../pages/systemManage/workplace/index'
import AddWorkplace from '../../pages/systemManage/workplace/add'
import EditWorkplace from '../../pages/systemManage/workplace/edit'

// 国籍
import NationalityManage from '../../pages/systemManage/nationality/index'
import AddNationalityManage from '../../pages/systemManage/nationality/add'
import EditNationalityManage from '../../pages/systemManage/nationality/edit'

// 技能管理
import SkillManage from '../../pages/systemManage/skill/index'
import AddSkillManage from '../../pages/systemManage/skill/add'
import EditSkillManage from '../../pages/systemManage/skill/edit'

// 服务地区
import ServiceArea from '../../pages/systemManage/serviceArea/index'
import AddServiceArea from '../../pages/systemManage/serviceArea/add'
import EditServiceArea from '../../pages/systemManage/serviceArea/edit'

export default {
  path: '/SystemManage',
  name: 'SystemManage',
  component: SystemManage,
  children: [
    {
      path: '/SystemManage/AuthManage',
      name: 'AuthManage',
      component: AuthManage
    },
    {
      path: '/SystemManage/RoleManage/AddAuthManage',
      name: 'AddAuthManage',
      component: AddAuthManage
    },
    {
      path: '/SystemManage/RoleManage/EditAuthManage',
      name: 'EditAuthManage',
      component: EditAuthManage,
      meta: {
        need: 'id',
        redirect: 'AuthManage'
      }
    },
    {
      path: '/SystemManage/RoleManage',
      name: 'RoleManage',
      component: RoleManage
    },
    {
      path: '/SystemManage/RoleManage/AddRoleManage',
      name: 'AddRoleManage',
      component: AddRoleManage
    },
    {
      path: '/SystemManage/RoleManage/EditRoleManage',
      name: 'EditRoleManage',
      component: EditRoleManage,
      meta: {
        need: 'id',
        redirect: 'RoleManage'
      }
    },
    {
      path: '/SystemManage/BackendManage',
      name: 'BackendManage',
      component: BackendManage
    },
    {
      path: '/SystemManage/BackendManage/AddBackendManage',
      name: 'AddBackendManage',
      component: AddBackendManage
    },
    {
      path: '/SystemManage/BackendManage/EditBackendManage',
      name: 'EditBackendManage',
      component: EditBackendManage,
      meta: {
        need: 'id',
        redirect: 'BackendManage'
      }
    },
    {
      path: '/SystemManage/Workplace',
      name: 'Workplace',
      component: Workplace
    },
    {
      path: '/SystemManage/Workplace/AddWorkplace',
      name: 'AddWorkplace',
      component: AddWorkplace
    },
    {
      path: '/SystemManage/Workplace/EditWorkplace',
      name: 'EditWorkplace',
      component: EditWorkplace,
      meta: {
        need: 'id',
        redirect: 'Workplace'
      }
    },
    {
      path: '/SystemManage/NationalityManage',
      name: 'NationalityManage',
      component: NationalityManage
    },
    {
      path: '/SystemManage/NationalityManage/AddNationalityManage',
      name: 'AddNationalityManage',
      component: AddNationalityManage
    },
    {
      path: '/SystemManage/NationalityManage/EditNationalityManage',
      name: 'EditNationalityManage',
      component: EditNationalityManage,
      meta: {
        need: 'id',
        redirect: 'NationalityManage'
      }
    },
    {
      path: '/SystemManage/SkillManage',
      name: 'SkillManage',
      component: SkillManage
    },
    {
      path: '/SystemManage/SkillManage/AddSkillManage',
      name: 'AddSkillManage',
      component: AddSkillManage
    },
    {
      path: '/SystemManage/SkillManage/EditSkillManage',
      name: 'EditSkillManage',
      component: EditSkillManage,
      meta: {
        need: 'id',
        redirect: 'SkillManage'
      }
    },
    {
      path: '/SystemManage/ServiceArea',
      name: 'ServiceArea',
      component: ServiceArea
    },
    {
      path: '/SystemManage/ServiceArea/AddServiceArea',
      name: 'AddServiceArea',
      component: AddServiceArea
    },
    {
      path: '/SystemManage/ServiceArea/EditServiceArea',
      name: 'EditServiceArea',
      component: EditServiceArea,
      meta: {
        need: 'id',
        redirect: 'ServiceArea'
      }
    }
  ]
}
