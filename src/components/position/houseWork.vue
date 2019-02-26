<template>
  <div>
    <div class="header margin_bottom_25 cl">
      <div class="float_left margin_right_20">{{$t('data.houseWork')}}</div>
    </div>
    <div>
      <el-form ref="houseWorkForm" :model="houseWorkForm" :rules="rules" label-width="135px">

         <el-form-item :label="$t('data.employers')" prop="user_id">
          <common-select v-model="houseWorkForm.user_id" :placeholder="$t('operation.select')" :search="true" interface="webUser" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.employerNationality')" prop="nationality">
          <el-input class="max_width_300" v-model.trim="houseWorkForm.nationality" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.workplaces')" prop="service_area_id">
          <common-select v-model="houseWorkForm.service_area_id" :placeholder="$t('operation.select')" :options="optInfo.service_areas" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.serveDay')" prop="working_days">
          <common-select v-model="houseWorkForm.working_days" :placeholder="$t('data.selectMore')" :options="optInfo.working_days" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.serveWeek')" prop="service_times">
          <common-select v-model="houseWorkForm.service_times" :placeholder="$t('data.selectMore')" :options="optInfo.service_times" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.workTime')" prop="work_hours">
          <common-select v-model="houseWorkForm.work_hours" :placeholder="$t('data.selectMore')" :options="optInfo.work_hours" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.needTime')" prop="time_slots">
          <common-select v-model="houseWorkForm.time_slots" :placeholder="$t('data.selectMore')" :options="optInfo.time_slots" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.havePet')" required>
          <common-select v-model="houseWorkForm.has_pet" :placeholder="$t('operation.select')" :options="any" class="width_300"></common-select>
        </el-form-item>

        <div class="cl">
          <div class="publiceColor">{{$t('data.language')}}:</div>
          <el-form-item :label="ele.label" v-for="(ele,idx) in optInfo.languages" :key="idx" required class="float_left">
            <common-select v-model="houseWorkForm[`language${idx+1}`]" :placeholder="$t('operation.select')" :options="optInfo.language_grades" class="max_width_100"></common-select>
          </el-form-item>
        </div>

        <el-form-item :label="$t('data.experienceYear')" prop="experience_years">
          <common-select v-model="houseWorkForm.experience_years" :placeholder="$t('operation.select')" :options="optInfo.experience_years" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.age')" prop="age">
          <common-select v-model="houseWorkForm.age" :placeholder="$t('operation.select')" :options="optInfo.ages" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.salaryHour')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="houseWorkForm.hourly_wage" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('status.status')" required>
          <common-select v-model="houseWorkForm.status" :placeholder="$t('operation.select')" :options="optInfo.statuses" class="width_300"></common-select>
        </el-form-item>

        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="houseWorkForm.loading">{{houseWorkForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { addJob, editJob } from '@/assets/api/job'
import { anyNeed, any } from '@/assets/js/options'
import { cloneObject, messageTips } from '@/assets/js/utils'
import { userEmployer, nationality, workPlace, serveDay, serveWeek, serveNeedHour, needTime, experience, age } from '@/assets/js/rules'
export default {
  props: ['optionList', 'webUsers'],
  data () {
    return {
      anyNeed,
      any,
      uer: null,
      optInfo: {},
      job: {},
      id: this.$route.query.id,
      rules: {
        user_id: userEmployer,
        nationality,
        age,
        service_area_id: workPlace,
        working_days: serveDay,
        service_times: serveWeek,
        work_hours: serveNeedHour,
        time_slots: needTime,
        experience_years: experience
      },
      houseWorkForm: {
        loading: false,
        type_id: this.$route.query.type || 0,
        user_id: '',
        nationality: '',
        service_area_id: '',
        working_days: '',
        service_times: '',
        work_hours: '',
        time_slots: '',
        has_pet: 1,
        experience_years: '',
        age: '',
        languages: [],
        hourly_wage: '',
        status: ''
      }
    }
  },
  computed: {
    form () {
      return this.$refs.houseWorkForm
    }
  },
  watch: {
    // 雇主
    webUsers (val) {
      this.user = val.map(ele => {
        return {
          label: ele.username,
          value: ele.id
        }
      })
    },
    optionList (val) {
      this.optInfo = this.cloneObject(val.form_fields, true)
      this.job = this.cloneObject(val.job, true)
      // 调整语言
      this.optInfo.languages.forEach((ele, idx) => {
        this.$set(this.houseWorkForm, `language${idx + 1}`, '1')
        this.houseWorkForm.languages.push({
          id: idx + 1,
          grade_id: 1
        })
      })

      // 编辑页
      if (this.id) {
        this.houseWorkForm.user_id = this.job.user_name
        this.houseWorkForm.nationality = this.job.nationality
        this.houseWorkForm.service_area_id = this.job.service_area_id
        this.houseWorkForm.working_days = this.job.working_days
        this.houseWorkForm.service_times = this.job.service_times
        this.houseWorkForm.work_hours = this.job.work_hours
        this.houseWorkForm.time_slots = this.job.time_slots
        this.houseWorkForm.has_pet = parseInt(this.job.has_pet)
        this.houseWorkForm.experience_years = this.job.experience_years
        this.houseWorkForm.age = this.job.age
        this.houseWorkForm.hourly_wage = this.job.hourly_wage
        this.houseWorkForm.status = this.job.status
        this.job.languages.forEach((ele, idx) => {
          this.houseWorkForm[`language${idx + 1}`] = ele.grade_id
        })
      }
    }
  },
  methods: {
    cloneObject,
    submit () {
      this.form.validate().then(res => {
        this.houseWorkForm.loading = true

        let sendData = this.cloneObject(this.houseWorkForm)
        if (sendData.user_id === this.job.user_name) sendData.user_id = this.job.user_id

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
          this.houseWorkForm.loading = false
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
