<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <ul>
        <li>{{$t('data.total')}}{{user.total}}</li>
        <li>{{$t('data.todayRegistered')}}{{user.today}}</li>
        <li>{{$t('data.yesterdayRegistered')}}{{user.yesterday}}</li>
        <li>{{$t('data.weekRegistered')}}{{user.this_week}}</li>
        <li>{{$t('data.monthRegistered')}}{{user.this_month}}</li>
        <li>{{$t('data.lastMonthRegistered')}}{{user.last_month}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { user } from '@/assets/api/report'
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    user().then(res => {
      let data = res.data
      this.user = data
    })
  }
}
</script>
