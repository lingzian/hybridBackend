<template>
  <div class="sign_in_bg">
    <el-form ref="userInfo" :model="userInfo" class="userinfo" :rules="rules">
      <h2>雇傭易</h2>
      <el-form-item class="label" prop="account">
        <el-input
          :spellcheck="false"
          v-model.trim="userInfo.account"
          prefix-icon="icon-account"
          :placeholder="$t('tips.pleaseInputAccount')"
          class="userinput"
          clearable></el-input>
      </el-form-item>
      <el-form-item  class="label" prop="password">
        <el-input
          :spellcheck="false"
          type="password"
          v-model.trim="userInfo.password"
          prefix-icon="icon-password"
          :placeholder="$t('tips.pleaseInputPassword')"
          class="userinput"
          clearable></el-input>
      </el-form-item>

      <div class="text_center">
        <el-button :loading="loading" @click="submit" class="sub">{{loading ? $t('operation.inSignIn') : $t('operation.signIn')}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  messageTips,
  addEvent,
  removeEvent
} from '@/assets/js/utils'
import { account, password } from '@/assets/js/rules'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

export default {
  data () {
    return {
      userInfo: {
        account: '',
        password: ''
      },
      loading: false,
      rules: {
        account,
        password
      }
    }
  },
  created () {
    addEvent(document, 'keyup.login', event => {
      event = event || window.event
      if (event.keyCode === 13) this.submit()
    })
    this.$once('hook:beforeDestroy', () => {
      removeEvent(document, 'keyup.login')
    })
  },
  methods: {
    ...mapActions(['signIn']),
    // 提交
    submit () {
      this.$refs.userInfo.validate().then(() => {
        this.loading = true
        let sendData = {
          username: this.userInfo.account,
          password: this.userInfo.password
        }
        this.signIn(sendData).then(res => {
          this.$router.replace({
            name: 'Index'
          })
          if (res.data.code === '403') {
            messageTips(this.$t('tips.loginSuccess'))
          }
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/config/ui.scss";
.sign_in_bg {
  height: 100%;
  background: url('../assets/images/wood_bg.jpg') center center;
  background-size: auto;
  h2{
    text-align: center;
    margin-bottom: 30px;
    color: $publicColor / 1.1;
  }
  .userinfo {
    width: 350px;
    height: 330px;
    padding: 30px 40px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(0,-60%);
    box-shadow: 22px 1.5px 61px 15px rgba(0, 0, 0, 0.1);
    .label {
      padding-bottom: 10px;
    }
    .userinput {
      width: 280px;
    }
    .sub {
      width: 280px;
      background: $publicColor;
      margin-top: 10px;
      color: #fff;
      &:hover {
        background: $publicColor / 1.1;
      }
    }
  }
}
</style>
