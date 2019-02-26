<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="companyForm" :model="companyForm" :rules="rules" label-width="100px">
        <el-form-item :label="$t('data.name')" prop="name">
          <el-input class="max_width_300" v-model.trim="companyForm.name" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.address')" prop="address">
          <el-input class="max_width_300" v-model.trim="companyForm.address" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.contacts')" prop="contacts">
          <el-input class="max_width_300" v-model.trim="companyForm.contacts" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.phone')" prop="tel">
          <el-input class="max_width_300" v-model.trim="companyForm.tel" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.webName')" prop="userName">
          <el-input class="max_width_300" v-model.trim="companyForm.userName" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('status.status')" required>
          <el-radio-group v-model="companyForm.status">
            <el-radio v-for="(item,index) in activeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="companyForm.loading">{{companyForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addCompany, editCompany, company } from '@/assets/api/company'
import { name, address, contacts, mobile, webName } from '@/assets/js/rules'
import { activeOptions } from '@/assets/js/options'
import { messageTips } from '@/assets/js/utils'
export default {
  props: ['edit'],
  data () {
    return {
      activeOptions,
      rules: {
        name,
        address,
        tel: mobile,
        contacts,
        userName: webName
      },
      companyForm: {
        name: '',
        address: '',
        contacts: '',
        tel: '',
        userName: '',
        status: 1,
        loading: false
      }
    }
  },
  computed: {
    form () {
      return this.$refs.companyForm
    }
  },
  created () {
    if (this.edit) {
      this.request()
    }
  },
  methods: {
    request () {
      company(this.edit).then(res => {
        let data = res.data
        this.companyForm.name = data.name
        this.companyForm.userName = data.username
        this.companyForm.address = data.address
        this.companyForm.contacts = data.contacts
        this.companyForm.tel = data.tel
        this.companyForm.status = parseInt(data.status)
      })
    },
    submit () {
      this.form.validate().then(res => {
        this.loading = true
        let sendData = {
          name: this.companyForm.name,
          address: this.companyForm.address,
          contacts: this.companyForm.contacts,
          tel: this.companyForm.tel,
          username: this.companyForm.userName,
          status: this.companyForm.status
        }
        let fn = this.edit ? editCompany(sendData, this.edit) : addCompany(sendData)
        fn.then(res => {
          this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
          this.$router.replace({
            name: 'CompanyManage'
          })
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>
