// 公司管理
import CompanyManage from '../../pages/companyManage'
import ListCompanyManage from '../../pages/companyManage/list'
import AddCompany from '../../pages/companyManage/add'
import EditCompany from '../../pages/companyManage/edit'

export default {
  path: '/CompanyManage',
  name: 'CompanyManage',
  component: CompanyManage,
  redirect: '/CompanyManage',
  children: [
    {
      path: '/CompanyManage',
      name: 'CompanyManage',
      component: ListCompanyManage
    },
    {
      path: '/CompanyManage/AddCompany',
      name: 'AddCompany',
      component: AddCompany
    },
    {
      path: '/CompanyManage/EditCompany',
      name: 'EditCompany',
      component: EditCompany,
      meta: {
        need: 'id',
        redirect: 'CompanyManage'
      }
    }
  ]
}
