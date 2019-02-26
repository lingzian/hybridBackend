<template>
  <el-select v-if="!loading" class="transparent_select language_select" v-model="locale" @change="changeLanguage">
    <el-option
      v-for="item in languageOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <div v-else>
    <i class="el-icon-loading"></i>
    <span>{{$t('operation.inChangeLanguage')}}</span>
  </div>
</template>

<script>
import { languageOptions } from '@/assets/js/options'
export default {
  data () {
    return {
      languageOptions,
      locale: this.$i18n.locale,
      loading: false
    }
  },
  methods: {
    changeLanguage (locale) {
      this.loading = true
      localStorage.setItem('language', locale)
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.language_select {
  width: 100px;
}
</style>
