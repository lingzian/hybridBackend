<template>
  <div class="main">
    <menu-item></menu-item>
    <div class="content">
      <header-item></header-item>
      <div class="viewer">
        <router-view class="publicView"/>
      </div>
    </div>
  </div>
</template>

<script>
import { removeEvent } from '@/assets/js/utils'
import MenuItem from '@/components/common/menu'
import HeaderItem from '@/components/common/header'
export default {
  components: {
    MenuItem,
    HeaderItem
  },
  beforeDestroy () {
    removeEvent(document, 'keyup.login')
  }
}
</script>

<style lang="scss" scoped>
.main{
  height: 100%;
  display: flex;
  .content{
    padding-top: 80px;
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    .viewer{
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 10px;
      background-color: #f0f2f5;
      .publicView{
        padding: 0 !important;
        margin-bottom: 0 !important;
      }
    }
  }
}
</style>
