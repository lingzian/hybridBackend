<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <ul>
        <li>{{$t('data.total')}}{{user.total}}</li>
        <li>{{$t('data.todayPosition')}}{{user.today}}</li>
        <li>{{$t('data.yesterdayPosition')}}{{user.yesterday}}</li>
        <li>{{$t('data.weekPosition')}}{{user.this_week}}</li>
        <li>{{$t('data.monthPosition')}}{{user.this_month}}</li>
        <li>{{$t('data.lastMonthPosition')}}{{user.last_month}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { job } from '@/assets/api/report'
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    job().then(res => {
      let data = res.data
      this.user = data
    })
  }
}
</script>
