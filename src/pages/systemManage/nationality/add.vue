<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="nationalityForm" :model="nationalityForm" :rules="rules" label-width="100px">
        <el-form-item :label="$t('data.cnName')" prop="zhName">
          <el-input class="max_width_300" v-model.trim="nationalityForm.zhName" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.enName')" prop="enName">
          <el-input class="max_width_300" v-model.trim="nationalityForm.enName" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('status.sort')" prop="sorting">
          <el-input class="max_width_300" v-model.trim="nationalityForm.sorting" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('status.status')" required>
          <el-radio-group v-model="nationalityForm.status">
            <el-radio v-for="(item,index) in activeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="nationalityForm.loading">{{nationalityForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { nationality, editNationality, addNationality } from '@/assets/api/nationality'
import { zhName, enName, sorting } from '@/assets/js/rules'
import { activeOptions } from '@/assets/js/options'
import { messageTips } from '@/assets/js/utils'
export default {
  props: ['edit'],
  data () {
    return {
      activeOptions,
      rules: {
        zhName,
        enName,
        sorting
      },
      nationalityForm: {
        zhName: '',
        enName: '',
        sorting: 99,
        status: 1,
        loading: false
      }
    }
  },
  computed: {
    form () {
      return this.$refs.nationalityForm
    }
  },
  created () {
    if (this.edit) {
      this.request()
    }
  },
  methods: {
    request () {
      nationality(this.edit).then(res => {
        console.log(res)
        let data = res.data
        this.nationalityForm.zhName = data.languages.zh.name
        this.nationalityForm.enName = data.languages.en.name
        this.nationalityForm.sorting = data.sorting
        this.nationalityForm.status = parseInt(data.status)
      })
    },
    submit () {
      this.form.validate().then(res => {
        this.loading = true
        this.nationalityForm.image = res.relative_path
        let sendData = {
          sorting: this.nationalityForm.sorting,
          status: this.nationalityForm.status,
          languages: {
            zh: {
              name: this.nationalityForm.zhName
            },
            en: {
              name: this.nationalityForm.enName
            }
          }
        }
        let fn = this.edit ? editNationality(sendData, this.edit) : addNationality(sendData)
        fn.then(res => {
          this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
          this.$router.replace({
            name: 'NationalityManage'
          })
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>
