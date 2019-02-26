<template>
  <div>
    <div class="header margin_bottom_25 cl">
      <div class="float_left margin_right_20">{{$t('data.bbCare')}}</div>
    </div>
    <div>
      <el-form ref="careForm" :model="careForm" :rules="rules" label-width="130px">

        <el-form-item :label="$t('data.employers')" prop="user_id">
          <common-select v-model="careForm.user_id" :placeholder="$t('operation.select')" :search="true" interface="webUser" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.employerNationality')" prop="nationality">
          <el-input class="max_width_300" v-model.trim="careForm.nationality" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.age')" prop="age">
          <common-select v-model="careForm.age" :placeholder="$t('operation.select')" :options="optInfo.ages" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.startTime')" prop="on_board_date">
          <el-date-picker
          value-format="timestamp"
            class="width_300"
            v-model="careForm.on_board_date"
            type="date"
            :placeholder="$t('data.selectDate')">
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="$t('data.serveMonth')" prop="working_months">
          <common-select v-model="careForm.working_months" :placeholder="$t('operation.select')" :options="serveMonth" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.workHours')" prop="working_hours">
          <common-select v-model="careForm.working_hours" :placeholder="$t('operation.select')" :options="optInfo.working_hours" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.workplaces')" prop="service_area_id">
          <common-select v-model="careForm.service_area_id" :placeholder="$t('operation.select')" :options="optInfo.service_areas" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.havePet')" required>
          <common-select v-model="careForm.has_pet" :placeholder="$t('operation.select')" :options="any" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.haveForeign')" required>
          <common-select v-model="careForm.has_existing_employee" :placeholder="$t('operation.select')" :options="any" class="width_300"></common-select>
        </el-form-item>

        <div class="cl">
          <div class="publiceColor">{{$t('data.language')}}:</div>
          <el-form-item :label="ele.label" v-for="(ele,idx) in optInfo.languages" :key="idx" required class="float_left">
            <common-select v-model="careForm[`language${idx+1}`]" :placeholder="$t('operation.select')" :options="optInfo.language_grades" class="max_width_100"></common-select>
          </el-form-item>
        </div>

        <el-form-item :label="$t('data.experienceYear')" prop="experience_years">
          <common-select v-model="careForm.experience_years" :placeholder="$t('operation.select')" :options="optInfo.experience_years" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.need_certificate')" required>
          <common-select v-model="careForm.need_certificate" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.pay')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="careForm.monthly_wage" :min="0" />
        </el-form-item>
        <el-form-item :label="$t('status.status')" required>
          <common-select v-model="careForm.status" :placeholder="$t('operation.select')" :options="optInfo.statuses" class="width_300"></common-select>
        </el-form-item>

        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="careForm.loading">{{careForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { addJob, editJob } from '@/assets/api/job'
import { anyNeed, any, serveMonth } from '@/assets/js/options'
import { cloneObject, messageTips } from '@/assets/js/utils'
import { formatDate } from '@/assets/js/format'
import { userEmployer, nationality, workPlace, timeDate, serveTimeMount, serveTimeHour, experience, age } from '@/assets/js/rules'
export default {
  props: ['optionList', 'webUsers'],
  data () {
    return {
      anyNeed,
      any,
      serveMonth,
      optInfo: {}, // 选项下拉
      job: {}, // 详情信息
      id: this.$route.query.id,
      rules: {
        user_id: userEmployer,
        nationality,
        on_board_date: timeDate,
        service_area_id: workPlace,
        working_months: serveTimeMount,
        working_hours: serveTimeHour,
        experience_years: experience,
        age
      },
      careForm: {
        loading: false,
        type_id: this.$route.query.type || 0,
        user_id: '',
        nationality: '',
        age: '',
        on_board_date: '',
        working_months: '',
        working_hours: '',
        service_area_id: '',
        has_pet: 1,
        has_existing_employee: 1,
        languages: [],
        experience_years: '',
        need_certificate: 1,
        monthly_wage: '',
        status: ''
      }
    }
  },
  computed: {
    form () {
      return this.$refs.careForm
    }
  },
  watch: {
    optionList (val) {
      this.optInfo = this.cloneObject(val.form_fields, true)
      this.job = this.cloneObject(val.job, true)
      // 调整语言
      this.optInfo.languages.forEach((ele, idx) => {
        this.$set(this.careForm, `language${idx + 1}`, '1')
        this.careForm.languages.push({
          id: idx + 1,
          grade_id: 1
        })
      })

      // 编辑页
      if (this.id) {
        this.careForm.user_id = this.job.user_name
        this.careForm.nationality = this.job.nationality
        this.careForm.on_board_date = new Date(this.job.on_board_date).getTime()
        this.careForm.working_months = this.job.working_months
        this.careForm.age = this.job.age
        this.careForm.working_hours = this.job.working_hours
        this.careForm.service_area_id = this.job.service_area_id
        this.careForm.has_pet = parseInt(this.job.has_pet)
        this.careForm.has_existing_employee = parseInt(this.job.has_existing_employee)
        this.careForm.experience_years = this.job.experience_years
        this.careForm.need_certificate = parseInt(this.job.need_certificate)
        this.careForm.monthly_wage = this.job.monthly_wage
        this.careForm.status = this.job.status
        this.job.languages.forEach((ele, idx) => {
          this.careForm[`language${idx + 1}`] = ele.grade_id
        })
      }
    }
  },
  methods: {
    cloneObject,
    submit () {
      this.form.validate().then(res => {
        this.careForm.loading = true

        let sendData = this.cloneObject(this.careForm)
        if (sendData.user_id === this.job.user_name) sendData.user_id = this.job.user_id

        let date = Number(sendData.on_board_date) / 1000
        sendData.on_board_date = formatDate(date)

        sendData.languages.forEach((ele, idx) => {
          ele.grade_id = sendData[`language${idx + 1}`]
          delete sendData[`language${idx + 1}`]
        })

        let fn = this.id ? editJob(sendData, this.id) : addJob(sendData)
        fn.then(res => {
          this.id ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
          this.$router.replace({
            name: 'PositionManage'
          })
        }).finally(() => {
          this.careForm.loading = false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/config/ui.scss';
.header{
  color: $publicColor;
  font-size: 18px;
}
.publiceColor{
  color: #51AE9C;
  font-size: 15px;
}
</style>
