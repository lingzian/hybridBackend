<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="60px"
      >
        <div>

          <el-form-item
            :label="$t('data.username')"
            prop="name"
          >
            <el-input
              class="max_width_300"
              v-model.trim="roleForm.name"
              :spellcheck="false"
            />
          </el-form-item>

          <el-form-item
            :label="$t('data.description')"
            prop="description"
          >
            <el-input
              class="max_width_300"
              v-model.trim="roleForm.description"
              :spellcheck="false"
            />
          </el-form-item>

          <select-auths
            ref="auths"
            :roleId="edit"
            :role="permissions"
          ></select-auths>

        </div>
      </el-form>

      <div class="text_center margin_top_15">
        <el-button
          type="primary"
          @click="submit"
          :loading="loading"
        >{{ loading ? $t('operation.operation') : $t('operation.submit')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addRole, role, editRole } from '@/assets/api/role'
import { name, description } from '@/assets/js/rules'
import { cloneObject, messageTips } from '@/assets/js/utils'
import SelectAuths from '@/components/auth/selectAuthsTable'
export default {
  props: ['edit'],
  components: {
    SelectAuths
  },
  computed: {
    form () {
      return this.$refs.roleForm
    }
  },
  data () {
    return {
      rules: {
        name,
        description
      },
      loading: false,
      permissions: [], // 限权
      roleForm: {
        name: '',
        description: '',
        roles: []
      }
    }
  },
  created () {
    if (this.edit) {
      this.request()
    }
  },
  methods: {
    request () {
      role(this.edit).then(res => {
        let data = res.data
        this.roleForm.name = data.name
        this.roleForm.description = data.description
        this.permissions = data.permissions
      })
    },
    submit () {
      this.form.validate().then(res => {
        this.loading = true
        let auth = this.$refs.auths.getResult()
        let sendData = cloneObject(this.roleForm, true)
        sendData.permissions = auth
        let fn = this.edit ? editRole(sendData, this.edit) : addRole(sendData)
        fn.then(res => {
          this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
          this.$router.replace({
            name: 'RoleManage'
          })
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }

}
</script>
