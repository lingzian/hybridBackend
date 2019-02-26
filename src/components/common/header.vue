<template>
  <div class="header cl">
    <div class="right_info">
      <language class="language"></language>
      <span class="user">
        <router-link :to="{path:'/SystemManage/BackendManage/EditBackendManage', query: {id: accountId}}">
          <i class="icon-user"></i>{{userName}}
        </router-link>
      </span>
      <span class="exit pointer" @click="exit"><i class="icon-exit"></i>{{$t('operation.exit')}}</span>
    </div>
  </div>
</template>

<script>
import Language from '@/components/common/language'
import { exitConfirm, messageTips } from '@/assets/js/utils'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user')

export default {
  components: {
    Language
  },
  computed: {
    ...mapState(['userName', 'accountId'])
  },
  methods: {
    ...mapActions(['logout']),
    exit () {
      exitConfirm().then(() => {
        this.logout().then(() => {
          messageTips(this.$t('tips.logoutSuccess'))
          this.$router.replace({
            name: 'SignIn'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/config/ui.scss";
.header {
  height: $headerHeight;
  line-height: $headerHeight;
  background-color: $publicColor;
  width: 100%;
  position: absolute;
  top: 0;
  color: #fff;
  z-index: 1;
  padding: 0 40px;
  overflow: hidden;
  .right_info {
    float: right;
    .language {
      display: inline-block;
      line-height: normal;
      margin-right: 20px;
    }
    .user {
      font-size: 15px;
      margin-right: 20px;
      a{
        text-decoration: none;
        color: white;
        cursor: pointer;
      }
      i {
        padding-right: 4px;
      }
    }
    .exit {
      font-size: 15px;
      transition: all 0.15s;
      i {
        padding-right: 4px;
      }
      &:hover {
        color: $publicColor / 4;
      }
    }
  }
  &.isMerchant .right_info .exit:hover{
    color: $publicColor * 1.2;
  }
}
</style>
