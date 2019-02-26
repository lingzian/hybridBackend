<template>
  <el-dropdown class="float_right" trigger="click">
    <el-button type="primary" >{{$t('menu.Add')}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
    <el-dropdown-menu slot="dropdown">
      <router-link :to="{name:'AddPositionManage',query:{type:ele.id}}" v-for="(ele,idx) in options" :key="idx">
        <el-dropdown-item>{{ele.name}}</el-dropdown-item>
      </router-link>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { works } from '@/assets/api/work'
export default {
  data () {
    return {
      options: ''
    }
  },
  created () {
    this.request()
  },
  methods: {
    request () {
      works().then(res => {
        let data = res.data.items
        this.options = data
      })
    }
  }
}
</script>
