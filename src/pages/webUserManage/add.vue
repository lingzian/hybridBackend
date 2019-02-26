<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>

      <div class="form_item cl" v-if="info.avatar">
        <div class="item_title">{{$t('data.headPic')}}:</div>
        <images :thumb="info.avatar" width="100" height="100"></images>
      </div>

      <div class="form_item cl" v-if="info.no">
        <div class="item_title">{{$t('data.number')}}:</div>
        <div class="item_detail">{{info.no}}</div>
      </div>

      <div class="form_item cl" v-if="info.username">
        <div class="item_title">{{$t('data.userName')}}:</div>
        <div class="item_detail">{{info.username}}</div>
      </div>

      <div class="form_item cl" v-if="info.name">
        <div class="item_title">{{$t('data.username')}}:</div>
        <div class="item_detail">{{info.name}}</div>
      </div>

      <div class="form_item cl" v-if="info.sex_name">
        <div class="item_title">{{$t('data.sex')}}:</div>
        <div class="item_detail">{{info.sex_name}}</div>
      </div>

      <div class="form_item cl" v-if="info.email">
        <div class="item_title">{{$t('data.email')}}:</div>
        <div class="item_detail">{{info.email}}</div>
      </div>

      <div class="form_item cl" v-if="info.tel">
        <div class="item_title">{{$t('data.phone')}}:</div>
        <div class="item_detail">{{info.tel}}</div>
      </div>

      <div class="form_item cl" v-if="info.tel_area_code">
        <div class="item_title">{{$t('data.phoneNum')}}:</div>
        <div class="item_detail">{{info.tel_area_code}}</div>
      </div>

      <div class="form_item cl" v-if="info.birthday">
        <div class="item_title">{{$t('data.birthday')}}:</div>
        <div class="item_detail">{{info.birthday}}</div>
      </div>

      <div class="form_item cl" v-if="info.age">
        <div class="item_title">{{$t('data.age')}}:</div>
        <div class="item_detail">{{info.age}}</div>
      </div>

      <div class="form_item cl" v-if="info.status">
        <div class="item_title">{{$t('status.status')}}:</div>
        <div class="item_detail">{{info.status | formatStatuss}}</div>
      </div>

      <div class="form_item cl" v-if="info.create_time">
        <div class="item_title">{{$t('data.createTime')}}:</div>
        <div class="item_detail">{{info.create_time | formatTime}}</div>
      </div>

      <div class="form_item cl" v-if="info.update_time">
        <div class="item_title">{{$t('data.updateTime')}}:</div>
        <div class="item_detail">{{info.update_time | formatTime}}</div>
      </div>

    </div>
  </div>
</template>

<script>
import { webUser } from '@/assets/api/web'
export default {
  props: ['edit'],
  data () {
    return {
      loading: false,
      info: {}
    }
  },
  created () {
    this.request()
  },
  methods: {
    request () {
      webUser(this.edit).then(res => {
        let data = res.data
        this.info = data
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
  border: 1px solid #1890ff;
  .item_title{
    color:rgba(0, 0, 0, 0.7);
    font-weight: bold;
    font-size: 15px;
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
</style>
