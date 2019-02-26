<template>
  <div>
    <div class="header margin_bottom_25 cl">
      <div class="float_left margin_right_20">{{$t('data.localDirver')}}</div>
    </div>
    <div>
      <el-form ref="driverForm" :model="driverForm" :rules="rules" label-width="135px">

        <el-form-item :label="$t('data.employers')" prop="user_id">
          <common-select v-model="driverForm.user_id" :placeholder="$t('operation.select')" :search="true" interface="webUser" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.employerNationality')" prop="nationality">
          <el-input class="max_width_300" v-model.trim="driverForm.nationality" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.startTime')" prop="on_board_date">
          <el-date-picker
            value-format="timestamp"
            class="width_300"
            v-model="driverForm.on_board_date"
            type="date"
            :placeholder="$t('data.selectDate')">
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="$t('data.needDirver')" prop="amount">
          <common-select v-model="driverForm.amount" :placeholder="$t('operation.select')" :options="dirverAmount" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.carValue')" prop="car_types">
          <common-select v-model="driverForm.car_types" :placeholder="$t('operation.selectMore')" :options="optInfo.car_types" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.license')" prop="driving_service_id">
          <common-select v-model="driverForm.driving_service_id" :placeholder="$t('operation.select')" :options="optInfo.driving_services" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.AS')" prop="driving_type_id">
          <common-select v-model="driverForm.driving_type_id" :placeholder="$t('operation.select')" :options="optInfo.driving_types" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.carNumber')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="driverForm.car_amount" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('data.workplaces')" prop="service_areas">
          <common-select v-model="driverForm.service_areas" :placeholder="$t('operation.selectMore')" :options="optInfo.service_areas" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <div class="cl">
          <div class="publiceColor">{{$t('data.serveFor')}}:</div>
          <el-form-item :label="$t('data.adult')" prop="name" class="float_left">
            <el-input-number class="full_width max_width_100" :controls="false" v-model="driverForm.adult_amount" :min="0" />
          </el-form-item>
          <el-form-item :label="$t('data.child')" prop="name" class="float_left">
            <el-input-number class="full_width max_width_100" :controls="false" v-model="driverForm.children_amount" :min="0" />
          </el-form-item>
          <el-form-item :label="$t('data.clerk')" prop="name" label-width="150px" class="float_left">
            <el-input-number class="full_width max_width_100" :controls="false" v-model="driverForm.employee_amount" :min="0" />
          </el-form-item>
        </div>

        <el-form-item :label="$t('data.workHour')" prop="onlineTime">
          <el-time-picker
            v-if="driverForm.onlineTime&&driverForm.onlineTime.length>0"
            is-range
            v-model="driverForm.onlineTime"
            range-separator="~"
            :start-placeholder="$t('data.onlineTime')"
            :end-placeholder="$t('data.offlineTime')">
          </el-time-picker>
        </el-form-item>

        <el-form-item :label="$t('data.OT')" prop="provide_overtime_allowance">
          <common-select v-model="driverForm.provide_overtime_allowance" :placeholder="$t('operation.select')" :options="any" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.overTimeAllow')" prop="overtime_allowance" v-if="provideOvertimeAllowance === 1">
          <el-input-number class="full_width max_width_300" :controls="false" v-model="driverForm.overtime_allowance" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('data.returnTrip')" prop="provide_return_allowance">
          <common-select v-model="driverForm.provide_return_allowance" :placeholder="$t('operation.select')" :options="any" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.returnResidence')" prop="allow_driving_to_residence">
          <common-select v-model="driverForm.allow_driving_to_residence" :placeholder="$t('operation.select')" :options="any" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.provideMeal')" prop="provide_meal_allowance">
          <common-select v-model="driverForm.provide_meal_allowance" :placeholder="$t('operation.select')" :options="any" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.age')" prop="age">
          <common-select v-model="driverForm.age" :placeholder="$t('operation.select')" :options="optInfo.ages" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.sex')" prop="sex">
          <common-select v-model="driverForm.sex" :placeholder="$t('operation.select')" :options="sex" class="width_300"></common-select>
        </el-form-item>

        <el-form-item :label="$t('data.degreeEducation')" prop="educational_degrees">
          <common-select v-model="driverForm.educational_degrees" :placeholder="$t('data.selectMore')" :options="optInfo.educational_degrees" :multiple="true" class="width_300"></common-select>
        </el-form-item>

        <div class="cl">
          <div class="publiceColor">{{$t('data.language')}}:</div>
          <el-form-item :label="ele.label" v-for="(ele,idx) in optInfo.languages" :key="idx" required class="float_left">
            <common-select v-model="driverForm[`language${idx+1}`]" :placeholder="$t('operation.select')" :options="optInfo.language_grades" class="max_width_100"></common-select>
          </el-form-item>
        </div>

        <el-form-item :label="$t('data.hkDirver')" prop="driving_age">
          <!-- <common-select v-model="driverForm.driving_age" :placeholder="$t('operation.select')" :options="optInfo.driving_ages" class="width_300"></common-select> -->
          <el-input-number class="full_width max_width_300" :controls="false" v-model="driverForm.driving_age" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('data.displayCNDrive')" v-if="driverForm.driving_service_ids === '1'" prop="chinese_driving_age">
          <!-- <common-select v-model="driverForm.chinese_driving_age" :placeholder="$t('operation.select')" :options="optInfo.driving_ages" class="width_300"></common-select> -->
          <el-input-number class="full_width max_width_300" :controls="false" v-model="driverForm.chinese_driving_age" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('data.pay')" required>
          <el-input-number class="full_width max_width_300" :controls="false" v-model="driverForm.monthly_wage" :min="0" />
        </el-form-item>

        <el-form-item :label="$t('status.status')" required>
          <common-select v-model="driverForm.status" :placeholder="$t('operation.select')" :options="optInfo.statuses" class="width_300"></common-select>
        </el-form-item>

        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="driverForm.loading">{{driverForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
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
import { userEmployer, nationality, selectDirverAmount, dirverAblity, selectAs, workArea, age, timeDate, selectDirverExperience, degreeEducation, holiday, carType, sexs, chineseDrivingAge } from '@/assets/js/rules'
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
        service_areas: workArea,
        on_board_date: timeDate,
        onlineTime: timeDate,
        age: age,
        educational_degrees: degreeEducation,
        driving_age: selectDirverExperience,
        vacation_id: holiday,
        car_types: carType,
        sexs,
        chinese_driving_age: chineseDrivingAge
      },
      driverForm: {
        loading: false,
        type_id: this.$route.query.type || 0,
        user_id: '',
        nationality: '',
        on_board_date: '',
        amount: '',
        car_types: [],
        driving_type_id: '',
        driving_service_id: '',
        driving_service_ids: '0',
        car_amount: 0,
        service_areas: '',
        chinese_driving_age: '1',
        adult_amount: 0,
        children_amount: 0,
        employee_amount: '',
        onlineTime: this.$route.query.id ? [] : ['2018 12 5 00:00:00', '2018 12 5 23:59:59'],
        provide_overtime_allowance: 1,
        overtime_allowance: 0,
        provide_return_allowance: 1,
        allow_driving_to_residence: 1,
        provide_meal_allowance: 1,
        age: '',
        sex: 1,
        educational_degrees: '',
        languages: [],
        monthly_wage: 0,
        driving_age: '',
        status: ''
      }
    }
  },
  computed: {
    form () {
      return this.$refs.driverForm
    },
    drivingServiceId () {
      return this.driverForm.driving_service_id
    },
    provideOvertimeAllowance () {
      return this.driverForm.provide_overtime_allowance
    }
  },
  watch: {
    optionList (val) {
      this.optInfo = this.cloneObject(val.form_fields, true)
      this.job = this.cloneObject(val.job, true)
      // 调整语言
      this.optInfo.languages.forEach((ele, idx) => {
        this.$set(this.driverForm, `language${idx + 1}`, '1')
        this.driverForm.languages.push({
          id: idx + 1,
          grade_id: 1
        })
      })
      // 编辑页
      if (this.id) {
        this.driverForm.user_id = this.job.user_name
        this.driverForm.nationality = this.job.nationality
        this.driverForm.on_board_date = new Date(this.job.on_board_date).getTime()
        this.driverForm.amount = this.job.amount
        this.driverForm.car_types = this.job.car_types
        this.driverForm.driving_type_id = this.job.driving_type_id
        this.driverForm.driving_service_id = this.job.driving_service_id
        this.driverForm.service_areas = this.job.service_areas
        this.driverForm.car_amount = this.job.car_amount
        this.driverForm.adult_amount = this.job.adult_amount
        this.driverForm.children_amount = this.job.children_amount
        this.driverForm.employee_amount = this.job.employee_amount
        this.driverForm.onlineTime[0] = `2018 12 5 ${this.job.work_start_time}`
        this.driverForm.onlineTime[1] = `2018 12 5 ${this.job.work_end_time}`
        this.driverForm.provide_overtime_allowance = parseInt(this.job.provide_overtime_allowance)
        this.driverForm.overtime_allowance = parseInt(this.job.overtime_allowance)
        this.driverForm.provide_return_allowance = parseInt(this.job.provide_return_allowance)
        this.driverForm.allow_driving_to_residence = parseInt(this.job.allow_driving_to_residence)
        this.driverForm.provide_meal_allowance = parseInt(this.job.provide_meal_allowance)
        this.driverForm.age = this.job.age
        this.driverForm.sex = parseInt(this.job.sex)
        this.driverForm.driving_age = this.job.driving_age
        this.driverForm.chinese_driving_age = this.job.chinese_driving_age
        this.driverForm.monthly_wage = this.job.monthly_wage
        this.driverForm.educational_degrees = this.job.educational_degrees
        this.driverForm.status = this.job.status
        this.job.languages.forEach((ele, idx) => {
          this.driverForm[`language${idx + 1}`] = ele.grade_id
        })
      }
    },
    drivingServiceId (val) {
      this.optInfo.driving_services.forEach(ele => {
        if (ele.value === val) {
          this.driverForm.driving_service_ids = ele.chinese_driving_age
        } else {
          return '0'
        }
      })
    }
  },
  methods: {
    cloneObject,
    submit () {
      this.form.validate().then(res => {
        this.driverForm.loading = true
        let sendData = this.cloneObject(this.driverForm)
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
          this.driverForm.loading = false
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
