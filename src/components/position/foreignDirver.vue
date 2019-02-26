<template>
  <div>
    <div class="header margin_bottom_25 cl">
      <div class="float_left margin_right_20">{{$t('data.foreignDirver')}}</div>
    </div>
    <div>
      <el-form ref="foreignDriverForm" :model="foreignDriverForm" :rules="rules" label-width="130px">

        <el-form-item :label="$t('data.employers')" prop="user_id">
          <common-select v-model="foreignDriverForm.user_id" :placeholder="$t('operation.select')" :search="true" interface="webUser" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.employerNationality')" prop="nationality">
          <el-input class="max_width_300" v-model.trim="foreignDriverForm.nationality" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.startTime')" prop="on_board_date">
          <el-date-picker
            value-format="timestamp"
            class="width_300"
            v-model="foreignDriverForm.on_board_date"
            type="date"
            :placeholder="$t('data.selectDate')">
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="$t('data.needDirver')" prop="amount">
          <common-select v-model="foreignDriverForm.amount" :placeholder="$t('operation.select')" :options="dirverAmount" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.carNumber')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="foreignDriverForm.car_amount" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('data.carValue')" prop="car_types">
          <common-select v-model="foreignDriverForm.car_types" :placeholder="$t('operation.selectMore')" :options="optInfo.car_types" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.hireNationality')" prop="nationalities">
          <common-select v-model="foreignDriverForm.nationalities" :placeholder="$t('operation.selectMore')" :options="optInfo.nationalities" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.nowWorkPlace')" prop="employee_workplaces">
          <common-select v-model="foreignDriverForm.employee_workplaces" :placeholder="$t('operation.select')" :options="optInfo.workplaces" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.workplaces')" prop="service_area_id">
          <common-select v-model="foreignDriverForm.service_area_id" :placeholder="$t('operation.select')" :options="optInfo.service_areas" class="width_300"></common-select>
        </el-form-item>

        <div class="cl">
          <div class="publiceColor">{{$t('data.serveFor')}}:</div>
          <el-form-item :label="$t('data.adult')" prop="name" class="float_left">
            <el-input-number class="full_width max_width_100" :controls="false" v-model="foreignDriverForm.adult_amount" :min="0" />
          </el-form-item>
          <el-form-item :label="$t('data.child')" prop="name" class="float_left">
            <el-input-number class="full_width max_width_100" :controls="false" v-model="foreignDriverForm.children_amount" :min="0" />
          </el-form-item>
        </div>

        <el-form-item :label="$t('data.workHour')" prop="onlineTime">
          <el-time-picker
            v-if="foreignDriverForm.onlineTime&&foreignDriverForm.onlineTime.length>0"
            is-range
            v-model="foreignDriverForm.onlineTime"
            range-separator="~"
            :start-placeholder="$t('data.onlineTime')"
            :end-placeholder="$t('data.offlineTime')">
          </el-time-picker>
        </el-form-item>

        <el-form-item :label="$t('data.age')" prop="age">
          <common-select v-model="foreignDriverForm.age" :placeholder="$t('operation.select')" :options="optInfo.ages" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.sex')" prop="name">
          <common-select v-model="foreignDriverForm.sex" :placeholder="$t('operation.select')" :options="sex" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.degreeEducation')" prop="educational_degrees">
          <common-select v-model="foreignDriverForm.educational_degrees" :placeholder="$t('data.selectMore')" :options="optInfo.educational_degrees" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <div class="cl">
          <div class="publiceColor">{{$t('data.language')}}:</div>
          <el-form-item :label="ele.label" v-for="(ele,idx) in optInfo.languages" :key="idx" required class="float_left">
            <common-select v-model="foreignDriverForm[`language${idx+1}`]" :placeholder="$t('operation.select')" :options="optInfo.language_grades" class="max_width_100"></common-select>
          </el-form-item>
        </div>

        <el-form-item :label="$t('data.reqireWorkState')" prop="working_states">
          <common-select v-model="foreignDriverForm.working_states" :placeholder="$t('data.selectMore')" :options="optInfo.working_states" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.recommended')" prop="name">
          <common-select v-model="foreignDriverForm.need_recommendation_letter" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.contactBeforeEmployer')" prop="name">
          <common-select v-model="foreignDriverForm.can_contact_previous_employer" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.experienceYear')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="foreignDriverForm.driving_age" :min="0" />
          <!-- <common-select v-model="foreignDriverForm.experience_years" :placeholder="$t('operation.select')" :options="optInfo.experience_years" class="width_300"></common-select> -->
        </el-form-item>

        <el-form-item :label="$t('data.needDv')" required>
          <common-select v-model="foreignDriverForm.work_with_others" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.room')" required>
          <common-select v-model="foreignDriverForm.accommodate_with_others" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.specialSkill')">
          <common-select v-model="foreignDriverForm.abilities" :placeholder="$t('operation.selectMore')" :options="optInfo.abilities" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.weekend')" prop="vacation_id">
          <common-select v-model="foreignDriverForm.vacation_id" :placeholder="$t('operation.select')" :options="optInfo.vacations" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.pay')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="foreignDriverForm.monthly_wage" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('status.status')" required>
          <common-select v-model="foreignDriverForm.status" :placeholder="$t('operation.select')" :options="optInfo.statuses" class="width_300"></common-select>
        </el-form-item>

        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="foreignDriverForm.loading">{{foreignDriverForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { addJob, editJob } from '@/assets/api/job'
import { any, anyNeed, sex, dirverAmount } from '@/assets/js/options'
import { cloneObject, messageTips } from '@/assets/js/utils'
import { formatDate, formatHour } from '@/assets/js/format'
import { userEmployer, nationality, selectDirverAmount, dirverAblity, selectAs, workPlace, workState, workAreas, age, timeDate, selectDirverExperiences, degreeEducation, holiday, skill, hireNationality, carType } from '@/assets/js/rules'
export default {
  props: ['optionList', 'webUsers'],
  data () {
    return {
      any,
      anyNeed,
      sex,
      dirverAmount,
      optInfo: {},
      job: {},
      id: this.$route.query.id,
      rules: {
        user_id: userEmployer,
        nationality,
        amount: selectDirverAmount,
        driving_service_id: dirverAblity,
        driving_type_id: selectAs,
        service_area_id: workPlace,
        employee_workplaces: workAreas,
        on_board_date: timeDate,
        onlineTime: timeDate,
        age: age,
        educational_degrees: degreeEducation,
        experience_years: selectDirverExperiences,
        vacation_id: holiday,
        nationalities: hireNationality,
        working_states: workState,
        abilities: skill,
        car_types: carType
      },
      foreignDriverForm: {
        loading: false,
        type_id: this.$route.query.type || 0,
        user_id: '',
        nationality: '',
        on_board_date: '',
        amount: '',
        car_amount: 0,
        car_types: [],
        nationalities: [],
        employee_workplaces: '',
        service_area_id: '',
        adult_amount: 0,
        children_amount: 0,
        onlineTime: this.$route.query.id ? [] : ['2018 12 5 00:00:00', '2018 12 5 23:59:59'],
        age: '',
        sex: 1,
        educational_degrees: '',
        languages: [],
        working_states: '',
        need_recommendation_letter: 1,
        can_contact_previous_employer: 1,
        experience_years: '',
        work_with_others: 1,
        accommodate_with_others: 1,
        abilities: '',
        vacation_id: '',
        monthly_wage: 0,
        status: ''
      }
    }
  },
  computed: {
    form () {
      return this.$refs.foreignDriverForm
    }
  },
  watch: {
    optionList (val) {
      this.optInfo = this.cloneObject(val.form_fields, true)
      this.job = this.cloneObject(val.job, true)
      // 调整语言
      this.optInfo.languages.forEach((ele, idx) => {
        this.$set(this.foreignDriverForm, `language${idx + 1}`, '1')
        this.foreignDriverForm.languages.push({
          id: idx + 1,
          grade_id: 1
        })
      })
      // 编辑页
      if (this.id) {
        this.foreignDriverForm.user_id = this.job.user_name
        this.foreignDriverForm.nationality = this.job.nationality
        this.foreignDriverForm.on_board_date = new Date(this.job.on_board_date).getTime()
        this.foreignDriverForm.amount = this.job.amount
        this.foreignDriverForm.car_amount = this.job.car_amount
        this.foreignDriverForm.car_types = this.job.car_types
        this.foreignDriverForm.nationalities = this.job.nationalities
        this.foreignDriverForm.employee_workplaces = this.job.employee_workplaces
        this.foreignDriverForm.service_area_id = this.job.service_area_id
        this.foreignDriverForm.adult_amount = this.job.adult_amount
        this.foreignDriverForm.children_amount = this.job.children_amount
        this.foreignDriverForm.onlineTime[0] = `2018 12 5 ${this.job.work_start_time}`
        this.foreignDriverForm.onlineTime[1] = `2018 12 5 ${this.job.work_end_time}`
        this.foreignDriverForm.age = this.job.age
        this.foreignDriverForm.sex = parseInt(this.job.sex)
        this.foreignDriverForm.educational_degrees = this.job.educational_degrees
        this.foreignDriverForm.working_states = this.job.working_states
        this.foreignDriverForm.need_recommendation_letter = parseInt(this.job.need_recommendation_letter)
        this.foreignDriverForm.can_contact_previous_employer = parseInt(this.job.can_contact_previous_employer)
        this.foreignDriverForm.work_with_others = parseInt(this.job.work_with_others)
        this.foreignDriverForm.accommodate_with_others = parseInt(this.job.accommodate_with_others)
        this.foreignDriverForm.driving_age = this.job.driving_age
        this.foreignDriverForm.abilities = this.job.abilities
        this.foreignDriverForm.vacation_id = this.job.vacation_id
        this.foreignDriverForm.monthly_wage = this.job.monthly_wage
        this.foreignDriverForm.status = this.job.status
        this.job.languages.forEach((ele, idx) => {
          this.foreignDriverForm[`language${idx + 1}`] = ele.grade_id
        })
      }
    }
  },
  methods: {
    cloneObject,
    submit () {
      this.form.validate().then(res => {
        this.foreignDriverForm.loading = true
        let sendData = this.cloneObject(this.foreignDriverForm)
        if (sendData.user_id === this.job.user_name) sendData.user_id = this.job.user_id

        let date = Number(sendData.on_board_date) / 1000
        sendData.on_board_date = formatDate(date)
        sendData.work_start_time = formatHour(sendData.onlineTime[0])
        sendData.work_end_time = formatHour(sendData.onlineTime[1])
        delete sendData.onlineTime

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
          this.foreignDriverForm.loading = false
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
