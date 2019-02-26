// 操作日志
import OperationLog from '../../pages/operationLog'
import BackendUserLog from '../../pages/operationLog/backendUserLog'
import SystemLog from '../../pages/operationLog/systemLog'

export default {
  path: '/OperationLog',
  name: 'OperationLog',
  component: OperationLog,
  children: [
    {
      path: '/OperationLog/BackendUserLog',
      name: 'BackendUserLog',
      component: BackendUserLog
    },
    {
      path: '/OperationLog/SystemLog',
      name: 'SystemLog',
      component: SystemLog
    }
  ]
}
