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

        <!-- <el-form-item :label="$t('data.belongWork')" required>
          <el-radio-group v-model="nationalityForm.job_types">
            <el-radio v-for="(item,index) in jobOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item> -->

        <el-form-item :label="$t('data.belongWork')" required>
          <common-select v-model="nationalityForm.job_types" :placeholder="$t('data.selectMore')" :options="jobOptions" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.skillType')" required>
          <el-radio-group v-model="nationalityForm.type">
            <el-radio v-for="(item,index) in skillOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
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
import { skill, editSkill, addSkill } from '@/assets/api/skill'
import { zhName, enName, sorting } from '@/assets/js/rules'
import { activeOptions, skillOptions, jobOptions } from '@/assets/js/options'
import { messageTips } from '@/assets/js/utils'
export default {
  props: ['edit'],
  data () {
    return {
      activeOptions,
      skillOptions,
      jobOptions,
      rules: {
        zhName,
        enName,
        sorting
      },
      nationalityForm: {
        zhName: '',
        enName: '',
        job_types: [],
        type: 1,
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
      skill(this.edit).then(res => {
        let data = res.data
        this.nationalityForm.zhName = data.languages.zh.name
        this.nationalityForm.enName = data.languages.en.name
        this.nationalityForm.sorting = data.sorting
        this.nationalityForm.type = parseInt(data.type)
        this.nationalityForm.status = parseInt(data.status)
        this.nationalityForm.job_types = data.job_types.map(ele => {
          return parseInt(ele)
        })
      })
    },
    submit () {
      this.form.validate().then(res => {
        this.loading = true
        this.nationalityForm.image = res.relative_path
        let sendData = {
          sorting: this.nationalityForm.sorting,
          status: this.nationalityForm.status,
          type: this.nationalityForm.type,
          job_types: this.nationalityForm.job_typesw,
          languages: {
            zh: {
              name: this.nationalityForm.zhName
            },
            en: {
              name: this.nationalityForm.enName
            }
          }
        }
        let fn = this.edit ? editSkill(sendData, this.edit) : addSkill(sendData)
        fn.then(res => {
          this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
          this.$router.replace({
            name: 'SkillManage'
          })
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>
