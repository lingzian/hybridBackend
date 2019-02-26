<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-tabs v-model="cardActiveName" type="card">
        <el-tab-pane :label="$t('data.baseMessage')" name="base">
          <el-form ref="accountForm" :model="accountForm" :rules="rules" label-width="60px">
            <div class="accountForm_box">
              <el-form-item :label="$t('data.account')" prop="username">
                <el-input
                  class="max_width_300"
                  v-model.trim="accountForm.username"
                  :spellcheck="false"
                />
              </el-form-item>

              <el-form-item v-if="edit" :label="$t('data.password')">
                <el-input
                  type="password"
                  class="max_width_300"
                  v-model.trim="accountForm.password"
                  :spellcheck="false"
                />
              </el-form-item>

              <el-form-item v-else :label="$t('data.password')" prop="password">
                <el-input
                  type="password"
                  class="max_width_300"
                  v-model.trim="accountForm.password"
                  :spellcheck="false"
                />
              </el-form-item>

              <el-form-item :label="$t('data.role')" prop="roles">
                <common-select
                  v-model="accountForm.roles"
                  :placeholder="$t('data.selectMore')"
                  :search="true"
                  :multiple="true"
                  interface="role"
                  class="width_300"
                ></common-select>
              </el-form-item>

              <!-- 首页的更改密码，有需要再添加上去 -->
              <!-- <el-form-item v-else :label="'密码'">
                <el-button type="danger" size="mini" @click="secret.dialog = true">修改密码</el-button>
              </el-form-item>-->
              <!-- <el-form-item :label="$t('data.role')" prop="role_id">
                <common-select class="max_width_300" v-model="accountForm.role_id" model="role"></common-select>
              </el-form-item>-->
              <el-form-item :label="$t('data.username')" prop="name">
                <el-input
                  class="max_width_300"
                  v-model.trim="accountForm.name"
                  :spellcheck="false"
                />
              </el-form-item>

              <el-form-item :label="$t('data.phone')" prop="tel">
                <el-input class="max_width_300" v-model.trim="accountForm.tel" :spellcheck="false"/>
              </el-form-item>

              <el-form-item :label="$t('data.email')" prop="email">
                <el-input
                  class="max_width_300"
                  v-model.trim="accountForm.email"
                  :spellcheck="false"
                />
              </el-form-item>

              <el-form-item :label="$t('data.status')" required>
                <el-radio-group v-model="accountForm.status">
                  <el-radio
                    v-for="(item,index) in activeOptions"
                    :key="index"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
        <!-- 权限 -->
        <el-tab-pane :label="$t('data.auths')" name="auths">
          <select-auths ref="auths" :roleId="edit" :role="permissions"></select-auths>
        </el-tab-pane>

        <div class="text_center margin_top_15">
          <el-button
            type="primary"
            @click="submit"
            :loading="loading"
          >{{ loading ? $t('operation.operation') : $t('operation.submit')}}</el-button>
        </div>
      </el-tabs>

      <el-dialog
        width="600px"
        :title="$t('data.changePass')"
        :visible.sync="secret.dialog"
        @closed="dialogClose"
      >
        <el-form ref="secretForm" :model="secret" :rules="rules" label-width="120px">
          <el-form-item :label="$t('data.beforePass')" prop="beforePassword" required>
            <el-input
              type="password"
              class="max_width_300"
              v-model.trim="secret.beforePassword"
              :spellcheck="false"
            />
          </el-form-item>

          <el-form-item :label="$t('data.newPass')" prop="new_password">
            <el-input
              type="password"
              class="max_width_300"
              v-model.trim="secret.new_password"
              :spellcheck="false"
            />
          </el-form-item>

          <el-form-item :label="$t('data.sureNewPass')" prop="retype_new_password">
            <el-input
              type="password"
              class="max_width_300"
              v-model.trim="secret.retype_new_password"
              :spellcheck="false"
            />
          </el-form-item>

          <div class="text_center">
            <el-button
              type="primary"
              @click="submitSecret"
              :loading="secret.loading"
            >{{secret.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addBackendUser, backendUser, changePassword, editbackendUser } from '@/assets/api/system'
import { account, password, roleSelect, mobile, email, realName, berforePassword } from '@/assets/js/rules'
import { exitConfirm, cloneObject, messageTips } from '@/assets/js/utils'
import { activeOptions } from '@/assets/js/options'
import SelectAuths from '@/components/auth/selectAuthsTable'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
const { mapActions } = createNamespacedHelpers('user')

export default {
  props: ['edit'],
  components: {
    SelectAuths
  },
  data () {
    return {
      cardActiveName: 'base',
      userId: '',
      rules: {
        username: account,
        password,
        new_password: password,
        retype_new_password: password,
        berforePassword,
        roles: roleSelect,
        tel: mobile,
        email,
        name: realName
      },
      accountForm: {
        username: '',
        password: '',
        roles: '',
        name: '',
        tel: '',
        email: '',
        status: 1
      },
      permissions: [],
      loading: false,
      secret: {
        beforePassword: '',
        new_password: '',
        retype_new_password: '',
        dialog: false,
        loading: false
      },
      activeOptions
    }
  },
  computed: {
    ...mapState(['accountId']),
    secretForm () {
      return this.$refs.secretForm
    },
    form () {
      return this.$refs.accountForm
    }
  },
  created () {
    if (this.edit) {
      this.requestData()
    }
  },
  methods: {
    ...mapActions(['logout']),
    // 修改密码的弹框
    dialogClose () {
      this.secretForm.clearValidate()
      this.secret.beforePassword = ''
      this.secret.new_password = ''
      this.secret.retype_new_password = ''
      this.secret.loading = false
      this.secret.dialog = false
    },
    // 编辑请求的内容
    requestData () {
      backendUser(this.edit).then(res => {
        let data = res.data
        this.permissions = data.permissions
        this.userId = data.id
        this.accountForm.username = data.username
        this.accountForm.roles = data.roles
        this.accountForm.status = parseInt(data.status)
        this.accountForm.name = data.name
        this.accountForm.tel = data.tel
        this.accountForm.email = data.email
      })
    },
    // 修改密码
    submitSecret () {
      this.secretForm.validate().then(res => {
        this.secret.loading = true
        let sendData = {
          password: this.secret.beforePassword,
          new_password: this.secret.new_password,
          retype_new_password: this.secret.retype_new_password
        }
        changePassword(sendData).then(res => {
          this.dialogClose()
          messageTips(this.$t('tips.changeSuccess'))
          // 修改的是当前账户的话就退出登录
          let username = this.accountId
          if (username === this.userId) {
            exitConfirm().then(() => {
              this.logout().then(() => {
                messageTips(this.$t('tips.logoutSuccess'))
                this.$router.replace({
                  name: 'SignIn'
                })
              })
            })
          }
        })
      })
    },
    // 提交
    submit () {
      this.form.validate().then(res => {
        this.loading = true
        let auth = this.$refs.auths.getResult()
        let sendData = cloneObject(this.accountForm)
        sendData.permissions = auth
        let fn = this.edit ? editbackendUser(sendData, this.edit) : addBackendUser(sendData)
        fn.then(res => {
          this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
          this.$router.replace({
            name: 'BackendManage'
          })
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {
        this.cardActiveName = 'base'
      })
    }
  }
}
</script>
