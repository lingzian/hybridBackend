// 简历管理
import ResumeManage from '../../pages/resumeManage'
import ListResumeManage from '../../pages/resumeManage/list'
import AddResumeManage from '../../pages/resumeManage/add'
import EditResumeManage from '../../pages/resumeManage/edit'

export default {
  path: '/ResumeManage',
  name: 'ResumeManage',
  component: ResumeManage,
  redirect: '/ResumeManage',
  children: [
    {
      path: '/ResumeManage',
      name: 'ResumeManage',
      component: ListResumeManage
    },
    {
      path: '/ResumeManage/AddResumeManage',
      name: 'AddResumeManage',
      component: AddResumeManage
    },
    {
      path: '/ResumeManage/EditResumeManage',
      name: 'EditResumeManage',
      component: EditResumeManage,
      meta: {
        need: 'id',
        redirect: 'ResumeManage'
      }
    }
  ]
}
