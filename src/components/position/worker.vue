<template>
  <div>
    <div class="header margin_bottom_25 cl">
      <div class="float_left margin_right_20">{{$t('data.foreignWorker')}}</div>
    </div>
    <div>

      <el-form ref="workerForm" :model="workerForm" :rules="rules" label-width="130px">

        <el-form-item :label="$t('data.employers')" prop="user_id">
          <common-select v-model="workerForm.user_id" :placeholder="$t('operation.select')" :search="true" interface="webUser" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.employerNationality')" prop="nationality">
          <el-input class="max_width_300" v-model.trim="workerForm.nationality" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.lifeArea')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="workerForm.area" :min="0" />
        </el-form-item>

        <div class="cl">
          <div class="publiceColor">{{$t('data.takecare')}}:</div>
          <el-form-item :label="$t('data.adult')" required class="float_left">
            <el-input-number class="full_width max_width_100" :controls="false" v-model="workerForm.adult_amount" :min="0" />
          </el-form-item>
          <el-form-item :label="$t('data.child')" required class="float_left">
            <el-input-number class="full_width max_width_100" :controls="false" v-model="workerForm.children_amount" :min="0" />
          </el-form-item>
          <el-form-item :label="$t('data.baby')" required label-width="150px" class="float_left">
            <el-input-number class="full_width max_width_100" :controls="false" v-model="workerForm.baby_amount" :min="0" />
          </el-form-item>
        </div>

        <el-form-item :label="$t('data.carNumber')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="workerForm.car_amount" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('data.petNumber')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="workerForm.pet_amount" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('data.hireNationality')" prop="nationalities">
          <!-- <common-select v-model="workerForm.nationalities" :placeholder="$t('operation.select')" :options="optInfo.nationalities" class="width_300"></common-select> -->
          <common-select v-model="workerForm.nationalities" :placeholder="$t('data.selectMore')" :options="optInfo.nationalities" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.nowWorkPlace')" prop="employee_workplaces">
          <common-select v-model="workerForm.employee_workplaces" :placeholder="$t('data.selectMore')" :options="optInfo.workplaces" :multiple="true" class="width_300"></common-select>
        </el-form-item>

         <el-form-item :label="$t('data.workplace')" prop="service_area_id">
          <common-select v-model="workerForm.service_area_id" :placeholder="$t('operation.select')" :options="optInfo.service_areas" class="width_300"></common-select>
        </el-form-item>

        <!-- <el-form-item :label="$t('data.workplaces')" prop="workplace_id">
          <el-input class="max_width_300" v-model.trim="workerForm.work_area" :spellcheck="false"/>
        </el-form-item> -->

        <el-form-item :label="$t('data.hireAge')" prop="age">
          <common-select v-model="workerForm.age" :placeholder="$t('operation.select')" :options="optInfo.ages" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.sex')" required>
          <common-select v-model="workerForm.sex" :placeholder="$t('operation.select')" :options="sex" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.marriedStatus')" prop="marital_statuses">
          <common-select v-model="workerForm.marital_statuses" :placeholder="$t('data.selectMore')" :options="optInfo.marital_statuses" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.accommodation')" prop="accommodations">
          <common-select v-model="workerForm.accommodations" :placeholder="$t('operation.select')" :options="optInfo.accommodations" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.startTime')" prop="on_board_date">
          <el-date-picker
            value-format="timestamp"
            class="width_300"
            v-model="workerForm.on_board_date"
            type="date"
            :placeholder="$t('data.selectDate')">
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="$t('data.reqireWorkState')" prop="working_states">
          <common-select v-model="workerForm.working_states" :placeholder="$t('data.selectMore')" :options="optInfo.working_states" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.degreeEducation')" prop="educational_degrees">
          <common-select v-model="workerForm.educational_degrees" :placeholder="$t('data.selectMore')" :options="optInfo.educational_degrees" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <div class="cl">
          <div class="publiceColor">{{$t('data.language')}}:</div>
          <el-form-item :label="ele.label" v-for="(ele,idx) in optInfo.languages" :key="idx" required class="float_left">
            <common-select v-model="workerForm[`language${idx+1}`]" :placeholder="$t('operation.select')" :options="optInfo.language_grades" class="max_width_100"></common-select>
          </el-form-item>
        </div>

        <el-form-item :label="$t('data.recommended')" prop="need_recommendation_letter" required>
          <common-select v-model="workerForm.need_recommendation_letter" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.contactEmployer')" prop="can_contact_previous_employer" required>
          <common-select v-model="workerForm.can_contact_previous_employer" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.experience')" prop="experience_years" required>
          <common-select v-model="workerForm.experience_years" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.driveAge')" prop="driving_age" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="workerForm.driving_age" :min="0"/>
        </el-form-item>

        <el-form-item :label="$t('data.skills')" prop="abilities">
          <common-select v-model="workerForm.abilities" :placeholder="$t('data.selectMore')" :options="optInfo.abilities" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.workWithsomeOne')" required >
          <common-select v-model="workerForm.work_with_others" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.room')" required >
          <common-select v-model="workerForm.accommodate_with_others" :placeholder="$t('operation.select')" :options="anyNeed" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.weekend')" prop="vacation_id">
          <common-select v-model="workerForm.vacation_id" :placeholder="$t('operation.select')" :options="optInfo.vacations" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.pay')" required>
          <el-input-number class="full_width max_width_300" :controls="false" :placeholder="$t('data.miniWage')" v-model="workerForm.monthly_wage" :min="0"/>
        </el-form-item>

        <el-form-item :label="$t('data.workScope')" prop="duty">
          <el-input type="textarea" :rows="4" :placeholder="$t('data.writeEnglish')" v-model="workerForm.duty"></el-input>
        </el-form-item>

        <el-form-item :label="$t('status.status')" required>
          <common-select v-model="workerForm.status" :placeholder="$t('operation.select')" :options="optInfo.statuses" class="width_300"></common-select>
        </el-form-item>

        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="workerForm.loading">{{workerForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { addJob, editJob } from '@/assets/api/job'
import { anyNeed, sex } from '@/assets/js/options'
import { cloneObject, messageTips } from '@/assets/js/utils'
import { formatDate } from '@/assets/js/format'
import { userEmployer, nationality, hireNationality, workPlace, workPlaces, hireAge, timeDate, workState, degreeEducation, holiday, skill, selectAccommodation, selectMarriedStatus, inputWorkScope } from '@/assets/js/rules'
export default {
  props: ['optionList', 'webUsers'],
  data () {
    return {
      anyNeed,
      sex,
      optInfo: {},
      job: {},
      id: this.$route.query.id,
      rules: {
        user_id: userEmployer,
        nationality,
        nationalities: hireNationality,
        employee_workplaces: workPlace,
        service_area_id: workPlaces,
        age: hireAge,
        abilities: skill,
        on_board_date: timeDate,
        working_states: workState,
        educational_degrees: degreeEducation,
        vacation_id: holiday,
        marital_statuses: selectMarriedStatus,
        accommodations: selectAccommodation,
        duty: inputWorkScope
      },
      workerForm: {
        loading: false,
        type_id: this.$route.query.type || 0,
        user_id: '',
        nationality: '',
        area: '',
        adult_amount: '',
        children_amount: '',
        baby_amount: '',
        car_amount: '',
        pet_amount: '',
        nationalities: [],
        employee_workplaces: '',
        service_area_id: '',
        age: '',
        sex: 1,
        marital_statuses: '',
        accommodations: '',
        on_board_date: '',
        working_states: '',
        languages: [],
        educational_degrees: '',
        need_recommendation_letter: 1,
        can_contact_previous_employer: 1,
        experience_years: 1,
        abilities: '',
        work_with_others: 1,
        accommodate_with_others: 1,
        vacation_id: '',
        monthly_wage: '',
        duty: '',
        driving_age: 0,
        status: ''
      }
    }
  },
  computed: {
    form () {
      return this.$refs.workerForm
    }
  },
  watch: {
    optionList (val) {
      this.optInfo = this.cloneObject(val.form_fields, true)
      this.job = this.cloneObject(val.job, true)
      // 调整语言
      this.optInfo.languages.forEach((ele, idx) => {
        this.$set(this.workerForm, `language${idx + 1}`, '1')
        this.workerForm.languages.push({
          id: idx + 1,
          grade_id: 1
        })
      })
      // 编辑页
      if (this.id) {
        this.workerForm.user_id = this.job.user_name
        this.workerForm.nationality = this.job.nationality
        this.workerForm.area = this.job.area
        this.workerForm.adult_amount = this.job.adult_amount
        this.workerForm.children_amount = this.job.children_amount
        this.workerForm.baby_amount = this.job.baby_amount
        this.workerForm.car_amount = this.job.car_amount
        this.workerForm.pet_amount = this.job.pet_amount
        this.workerForm.nationalities = this.job.nationalities
        this.workerForm.employee_workplaces = this.job.employee_workplaces
        this.workerForm.service_area_id = this.job.service_area_id
        this.workerForm.service_area_id = this.job.service_area_id
        this.workerForm.age = this.job.age
        this.workerForm.sex = parseInt(this.job.sex)
        this.workerForm.marital_statuses = this.job.marital_statuses
        this.workerForm.accommodations = this.job.accommodations
        this.workerForm.on_board_date = new Date(this.job.on_board_date).getTime()
        this.workerForm.working_states = this.job.working_states
        this.workerForm.educational_degrees = this.job.educational_degrees
        this.workerForm.need_recommendation_letter = parseInt(this.job.need_recommendation_letter)
        this.workerForm.can_contact_previous_employer = parseInt(this.job.can_contact_previous_employer)
        this.workerForm.experience_years = parseInt(this.job.experience_years)
        this.workerForm.driving_age = parseInt(this.job.driving_age)
        this.workerForm.abilities = this.job.abilities
        this.workerForm.work_with_others = parseInt(this.job.work_with_others)
        this.workerForm.accommodate_with_others = parseInt(this.job.accommodate_with_others)
        this.workerForm.vacation_id = this.job.vacation_id
        this.workerForm.monthly_wage = this.job.monthly_wage
        this.workerForm.duty = this.job.duty
        this.workerForm.status = this.job.status
        this.job.languages.forEach((ele, idx) => {
          this.workerForm[`language${idx + 1}`] = ele.grade_id
        })
      }
    }
  },
  methods: {
    cloneObject,
    submit () {
      this.form.validate().then(res => {
        this.workerForm.loading = true
        let sendData = this.cloneObject(this.workerForm)
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
          this.workerForm.loading = false
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
