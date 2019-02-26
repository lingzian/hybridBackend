<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="cl auditBar">
      <div class="float_right">
        {{$t('data.audit')}}：
        <el-select v-model="auditState" :placeholder="$t('operation.select')" class="audit" size="small">
          <el-option
            v-for="item in resumeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="submit" :loading="loading">{{loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
      </div>
    </div>
    <div>
      <div class="form_item cl" v-if="info.user_name">
        <div class="item_title">{{$t('data.username')}}:</div>
        <div class="item_detail">{{info.user_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.nickname">
        <div class="item_title">{{$t('data.name')}}:</div>
        <div class="item_detail">{{info.nickname}}</div>
      </div>
      <div class="form_item cl" v-if="info.type_name">
        <div class="item_title">{{$t('data.workID')}}:</div>
        <div class="item_detail">{{info.type_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.user_no">
        <div class="item_title">{{$t('data.number')}}:</div>
        <div class="item_detail">{{info.user_no}}</div>
      </div>
      <div class="form_item cl" v-if="info.sex_name">
        <div class="item_title">{{$t('data.sex')}}:</div>
        <div class="item_detail">{{info.sex_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.age">
        <div class="item_title">{{$t('data.age')}}:</div>
        <div class="item_detail">{{info.age}}</div>
      </div>
      <div class="form_item cl" v-if="info.nationality_name">
        <div class="item_title">{{$t('data.nationality')}}:</div>
        <div class="item_detail">{{info.nationality_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.type_id !== ('5' && '6' && '2')">
        <div class="item_title">{{$t('data.maritalStatus')}}:</div>
        <div class="item_detail">{{info.marital_status | formatMarital}}</div>
      </div>
      <!-- <div class="form_item cl" v-if="info.religion">
        <div class="item_title">{{$t('data.religious')}}:</div>
        <div class="item_detail">{{info.religion}}</div>
      </div> -->
      <div class="form_item cl"  v-if="info.children_amount">
        <div class="item_title">{{$t('data.childrenNum')}}:</div>
        <div class="item_detail">{{info.children_amount}}</div>
      </div>
      <div class="form_item cl" v-if="info.introduce">
        <div class="item_title">{{$t('data.introduceMyself')}}:</div>
        <div class="item_detail">{{info.introduce}}</div>
      </div>
      <div class="form_item cl" v-if="info.major">
        <div class="item_title">{{$t('data.major')}}:</div>
        <div class="item_detail">{{info.major}}</div>
      </div>
      <div class="form_item cl" v-if="info.faculty">
        <div class="item_title">{{$t('data.subject')}}:</div>
        <div class="item_detail">{{info.faculty}}</div>
      </div>
      <div class="form_item cl" v-if="info.education">
        <div class="item_title">{{$t('data.degreeEducation')}}:</div>
        <div class="item_detail">{{info.education}}</div>
      </div>
      <div class="form_item cl" v-if="info.languages">
        <div class="item_title">{{$t('data.language')}}:</div>
        <div class="item_detail">{{info.languages}}</div>
      </div>
      <div class="form_item cl" v-if="info.certificate_no">
        <div class="item_title">{{$t('data.certificateNum')}}:</div>
        <div class="item_detail">{{info.certificate_no}}</div>
      </div>
      <div class="form_item cl" v-if="info.working_state_name && info.type_id !== ('2')">
        <div class="item_title">{{$t('data.workingState')}}:</div>
        <div class="item_detail">{{info.working_state_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.working_state_reason_name">
        <div class="item_title">{{$t('data.workingStateReason')}}:</div>
        <div class="item_detail">{{info.working_state_reason_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.workplace_name">
        <div class="item_title">{{$t('data.nowWorkPlace')}}:</div>
        <div class="item_detail">{{info.workplace_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.workplaces">
        <div class="item_title">{{$t('data.expectedWorkArea')}}:</div>
        <div class="item_detail">{{info.workplaces}}</div>
      </div>
      <div class="form_item cl" v-if="info.images && info.images.length>0">
        <div class="item_title">{{$t('data.thumb')}}:</div>
        <images v-for="(ele,idx) in info.images" :key="idx" :thumb="ele" width="100" height="100"></images>
      </div>

      <div class="form_item cl" v-if="info.videos && info.videos.length>0">
        <div class="item_title">{{$t('data.video')}}:</div>
        <upload-video :ref="`video${idx}`" v-for="(ele,idx) in info.videos" :key="idx" :onlyRead="true"></upload-video>
      </div>

      <div class="form_item cl" v-if="info.children_ages && info.children_ages.length > 0">
        <div class="item_title">{{$t('data.childAge')}}:</div>
        <div class="item_detail">{{info.children_ages}}</div>
      </div>
      <div class="form_item cl" v-if="info.employment_times">
        <div class="item_title">{{$t('data.employNum')}}:</div>
        <div class="item_detail">{{info.employment_times}}</div>
      </div>
      <div class="form_item cl" v-if="info.working_hours && info.working_hours!=='0000-00-00'">
        <div class="item_title">{{$t('data.workHour')}}:</div>
        <div class="item_detail">{{info.working_hours}}</div>
      </div>
      <div class="form_item_grounp cl">
        <div class="form_item cl" v-if="info.hourly_wage && info.hourly_wage!=='0.00'">
          <div class="item_title">{{$t('data.hourWage')}}:</div>
          <div class="item_detail">${{info.hourly_wage}}</div>
        </div>
        <div class="form_item cl" v-if="info.monthly_wage && info.monthly_wage!=='0.00'">
          <div class="item_title">{{$t('data.monthlySalary')}}:</div>
          <div class="item_detail">${{info.monthly_wage}}</div>
        </div>
        <div class="form_item cl" v-if="info.monthly_wage_all_day && info.monthly_wage_all_day!=='0.00'">
          <div class="item_title">{{$t('data.monthlySalarys')}}:</div>
          <div class="item_detail">${{info.monthly_wage_all_day}}</div>
        </div>
      </div>
      <div class="form_item cl" v-if="info.abilities && info.abilities.length > 0">
        <div class="item_title">{{$t('data.mainSkill')}}:</div>
        <div class="item_detail">{{info.abilities}}</div>
      </div>
      <div class="form_item cl" v-if="info.special_abilities && info.special_abilities.length > 0">
        <div class="item_title">{{$t('data.specialSkills')}}:</div>
        <!-- <div class="item_detail" v-for="(ele,idx) in info.special_abilities" :key="idx">{{ele}}</div> -->
        <div class="item_detail">{{info.special_abilities}}</div>
      </div>
      <div class="form_item cl" v-if="info.extra_ability">
        <div class="item_title">{{$t('data.additionalSkill')}}:</div>
        <div class="item_detail">{{info.extra_ability}}</div>
      </div>
      <div class="form_item cl" v-if="info.experience_years">
        <div class="item_title">{{$t('data.experienceYear')}}:</div>
        <div class="item_detail">{{info.experience_years}}</div>
      </div>
      <div class="form_item cl" v-if="info.service_areas && info.service_areas.length>0">
        <div class="item_title">{{$t('menu.ServiceArea')}}:</div>
        <div class="item_detail">{{info.service_areas}}</div>
      </div>
      <div class="form_item cl" v-if="info.top_service_areas && info.top_service_areas.length>0">
        <div class="item_title">{{$t('data.oneServeArea')}}:</div>
        <div class="item_detail" v-for="(ele,idx) in info.top_service_areas" :key="idx">{{ele}}</div>
      </div>
      <div class="form_item cl" v-if="info.car_type_name && info.type_id === ('5' && '6')">
        <div class="item_title">{{$t('data.carValue')}}:</div>
        <div class="item_detail">{{info.car_type_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.driving_age && info.type_id === ('5' && '6')">
        <div class="item_title">{{$t('data.drivingExperience')}}:</div>
        <div class="item_detail">{{info.driving_age}}</div>
      </div>
      <div class="form_item cl" v-if="info.chinese_driving_age && info.type_id === ('5' && '6')">
        <div class="item_title">{{$t('data.chinaDrivingExperience')}}:</div>
        <div class="item_detail">{{info.chinese_driving_age}}</div>
      </div>
      <div class="form_item cl" v-if="info.driving_service_name && info.type_id === ('5' && '6')">
        <div class="item_title">{{$t('data.drivingService')}}:</div>
        <div class="item_detail">{{info.driving_service_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.driving_type_name && info.type_id === ('5' && '6')">
        <div class="item_title">{{$t('data.drivingType')}}:</div>
        <div class="item_detail">{{info.driving_type_name}}</div>
      </div>
      <div class="form_item cl" v-if="info.chinese_experience_years && info.type_id !== ('5' && '6')">
        <div class="item_title">{{$t('data.chinaYear')}}:</div>
        <div class="item_detail">{{info.chinese_experience_years}}</div>
      </div>
      <div class="form_item cl" v-if="info.foreign_experience_years && info.type_id !== ('5' && '6')">
        <div class="item_title">{{$t('data.foreignYear')}}:</div>
        <div class="item_detail">{{info.foreign_experience_years}}</div>
      </div>
      <div class="form_item cl" v-if="info.last_experience_years && info.type_id !== ('5' && '6')">
        <div class="item_title">{{$t('data.serveLast')}}:</div>
        <div class="item_detail">{{info.last_experience_years}}</div>
      </div>
      <div class="form_item cl" v-if="info.take_care_of_children_times && info.type_id !== ('5' && '6')">
        <div class="item_title">{{$t('data.takecareBaby')}}:</div>
        <div class="item_detail">{{info.take_care_of_children_times}}</div>
      </div>
      <div class="form_item cl" v-if="info.working_days && info.working_days.length>0">
        <div class="item_title">{{$t('data.workDay')}}:</div>
        <!-- <div class="item_detail" v-for="(ele,idx) in info.working_days" :key="idx">{{ele}}</div> -->
        <div class="item_detail" >{{info.working_days}}</div>
      </div>
      <div class="form_item cl" v-if="info.accept_pet && info.type_id !== ('5' && '6')">
        <div class="item_title">{{$t('data.acceptPets')}}:</div>
        <div class="item_detail">{{info.accept_pet | formatCan}}</div>
      </div>
      <div class="form_item cl" v-if="info.accommodate_with_others && info.type_id !== '2'&&'5'&&'6'">
        <div class="item_title">{{$t('data.shareRoom')}}:</div>
        <div class="item_detail">{{info.accommodate_with_others | formatCan}}</div>
      </div>
      <div class="form_item cl" v-if="info.work_with_others && info.type_id !== ('2')">
        <div class="item_title">{{$t('data.togeterWork')}}:</div>
        <div class="item_detail">{{info.work_with_others | formatCan}}</div>
      </div>
      <div class="form_item cl" v-if="info.need_existing_employee && info.type_id !== ('5' && '6')">
        <div class="item_title">{{$t('data.needEmployment')}}:</div>
        <div class="item_detail">{{info.need_existing_employee | formatNeed}}</div>
      </div>
      <div class="form_item cl" v-if="info.has_recommendation_letter && info.type_id !== ('2')">
        <div class="item_title">{{$t('data.haveRecommendation')}}:</div>
        <div class="item_detail">{{info.has_recommendation_letter | formatHave}}</div>
      </div>
      <div class="form_item cl" v-if="info.can_contact_previous_employer && info.type_id !== ('2' && '5' && '6')">
        <div class="item_title">{{$t('data.haveConcatemployer')}}:</div>
        <div class="item_detail">{{info.can_contact_previous_employer | formatCan}}</div>
      </div>
      <div class="form_item cl" v-if="info.take_care_of_elder && info.type_id !== ('2')">
        <div class="item_title">{{$t('data.careOlder')}}:</div>
        <div class="item_detail">{{info.take_care_of_elder | formatCan}}</div>
      </div>
      <div class="form_item cl" v-if="info.visa_expire_date">
        <div class="item_title">{{$t('data.expiryDate')}}:</div>
        <div class="item_detail">{{info.visa_expire_date}}</div>
      </div>
      <div class="form_item cl" v-if="info.create_time">
        <div class="item_title">{{$t('data.createTime')}}:</div>
        <div class="item_detail">{{info.create_time | formatTime}}</div>
      </div>
      <div class="form_item cl" v-if="info.update_time">
        <div class="item_title">{{$t('data.updateTime')}}:</div>
        <div class="item_detail">{{info.update_time | formatTime}}</div>
      </div>
      <div class="form_item cl" v-if="info.status">
        <div class="item_title">{{$t('status.status')}}:</div>
        <div class="item_detail">{{info.status | formatStatuss}}</div>
      </div>

      <div class="item_title" v-if="info.experiences && info.experiences.length>0">{{$t('data.workExperience')}}:</div>

      <div class="form_items cl" v-if="info.experiences && info.experiences.length>0">

        <div v-for="(ele,idx) in info.experiences" :key="idx" class="workBox">
          <div class="workIcon">{{idx+1}}</div>
          <div class="form_item cl" v-if="ele.look_after">

            <div v-for="(element,index) in ele.look_after" :key="index" class="experienceBox padding_20">

              <div class="form_item cl" v-if="element.name">
                <div class="item_detail">{{element.name}}</div>
              </div>

              <div class="form_item cl" v-if="element.image">
                <images :thumb="element.image" width="100" height="100"></images>
              </div>

            </div>

          </div>
          <div class="padding_20">
            <div class="form_item cl" v-if="ele.nationality">
              <div class="item_title">{{$t('data.nationality')}}:</div>
              <div class="item_detail">{{ele.nationality}}</div>
            </div>

            <div class="form_item cl" v-if="ele.country">
              <div class="item_title">{{$t('data.countries')}}:</div>
              <div class="item_detail">{{ele.country}}</div>
            </div>

            <div class="form_item cl" v-if="ele.employer">
              <div class="item_title">{{$t('data.nameOfEmployer')}}:</div>
              <div class="item_detail">{{ele.employer}}</div>
            </div>

            <div class="form_item cl" v-if="ele.workplace">
              <div class="item_title">{{$t('data.workplace')}}:</div>
              <div class="item_detail">{{ele.workplace}}</div>
            </div>

            <div class="form_item cl" v-if="ele.area">
              <div class="item_title">{{$t('data.liftArea')}}:</div>
              <div class="item_detail">{{ele.area}}</div>
            </div>

            <div class="form_item cl" v-if="ele.start_date">
              <div class="item_title">{{$t('data.startTimes')}}:</div>
              <div class="item_detail">{{ele.start_date}}</div>
            </div>

            <div class="form_item cl" v-if="ele.end_date">
              <div class="item_title">{{$t('data.endTime')}}:</div>
              <div class="item_detail">{{ele.end_date}}</div>
            </div>

            <div class="form_item cl" v-if="ele.remark">
              <div class="item_title">{{$t('data.note')}}:</div>
              <div class="item_detail">{{ele.remark}}</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { resume, editResume, resumeState } from '@/assets/api/resume'
import { messageTips } from '@/assets/js/utils'
import UploadVideo from '../../components/common/uploadVideo'
export default {
  props: ['edit'],
  components: {
    UploadVideo
  },
  data () {
    return {
      loading: false,
      info: {},
      resumeOptions: [],
      auditState: ''
    }
  },
  created () {
    this.request()
  },
  methods: {
    request () {
      resumeState().then(res => {
        let data = res.data.items
        this.resumeOptions = data
      })
      resume(this.edit).then(res => {
        let data = res.data
        this.info = data
        this.auditState = data.status
        if (data.videos && data.videos.length > 0) {
          data.videos.forEach((ele, idx) => {
            let path = ele.media
            let image = ele.image
            this.$nextTick(() => {
              this.$refs[`video${idx}`][0].setFile(path, path, image, image)
            })
          })
        }
      })
    },
    submit () {
      this.loading = false
      let sendData = {
        status: this.auditState
      }
      editResume(sendData, this.edit).then(res => {
        messageTips(this.$t('tips.editSuccess'))
        this.$router.replace({
          name: 'ResumeManage'
        })
      }).finally(() => {
        this.loading = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form_item{
  line-height: 30px;
  margin-bottom: 10px;
  &>div{
    float: left;
  }
  .item_title{
    color:rgba(0, 0, 0, 0.7);
    font-weight: bold;
    font-size: 15px;
    margin-right: 10px;
  }
  .item_detail{
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
}
.form_items{
  padding: 10px;
  .item_title{
    color:rgba(0, 0, 0, 0.7);
    font-weight: bold;
    font-size: 15px;
  }
  .experienceBox{
    margin-right: 50px;
  }
  & .experienceBox::last-child{
    margin-right: 0;
  }
}
.form_item_grounp{
  &>div{
    float: left;
    margin-right: 10px;
  }
}
.auditBar{
  margin-bottom: 10px;
}
.audit{
  margin-right: 20px;
}
.workBox{
  border: 1px solid #1890ff;
  margin-bottom: 10px;
  .workIcon{
    width: 100px;
    height: 20px;
    background: #1890ff;
    font-size: 16px;
    line-height: 20px;
    color: white;
    text-align: center;
  }
}

</style>
