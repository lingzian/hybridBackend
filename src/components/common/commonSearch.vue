<template>
  <div class="search">
    <el-form inline class="table_form" size="small" @submit.native.prevent>

      <template v-for="item in options">
        <el-form-item :key="item.key" :label="item.name">

          <el-input v-if="item.type === 'text'" v-model.trim="inputForm[item.key]" :spellcheck="false" clearable></el-input>

          <el-select v-if="item.type === 'select'" v-model="inputForm[item.key]" placeholder="" clearable>
            <el-option
              v-for="i in item.options"
              :key="i.value"
              :label="i.label"
              :value="i.value">
            </el-option>
          </el-select>

          <el-date-picker
            v-if="item.type === 'date'"
            v-model="inputForm[item.key]"
            :editable="false"
            :clearable="false"
            class="full_width max_width_390"
            value-format="timestamp"
            type="datetimerange"
            :start-placeholder="$t('data.startTimes')"
            :end-placeholder="$t('data.endTime')">
          </el-date-picker>

        </el-form-item>
      </template>

      <el-form-item>
        <el-button @click="search" :loading="loading" type="warning">{{ $t('operation.search') }}</el-button>
        <el-button @click="clean" >{{ $t('operation.clear') }}</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { cloneObject, addEvent } from '@/assets/js/utils'
import { works } from '@/assets/api/work'
import { allService } from '@/assets/api/serveArea'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      searchForm: {},
      inputForm: {}
    }
  },
  created () {
    this.options.forEach(ele => {
      if (ele.need) {
        if (ele.need === 'works') {
          works().then(res => {
            ele.options = this.requestOperation(res)
          })
        } else if (ele.need === 'service') {
          allService().then(res => {
            ele.options = this.requestOperation(res)
          })
        }
      }
      this.$set(this.inputForm, ele.key, ele.default)
    })
    addEvent(document, 'keyup.login', event => {
      event = event || window.event
      if (event.keyCode === 13) this.search()
    })
  },
  methods: {
    // 搜索
    search (repeatPage = true) {
      let searchForm = cloneObject(this.inputForm)
      if (searchForm.onlineTime) {
        searchForm.from_date = Number(searchForm.onlineTime[0] / 1000)
        searchForm.to_date = Number(searchForm.onlineTime[1] / 1000)
        delete searchForm.onlineTime
      }
      if (repeatPage) {
        this.$parent.$refs.pagination && (this.$parent.$refs.pagination.page = 1)
      }
      this.searchForm = searchForm
      this.$emit('search', searchForm)
    },
    // 清空
    clean () {
      let defaultObj = {}
      this.options.forEach(ele => {
        defaultObj[ele.key] = ele.default || ''
      })
      this.inputForm = Object.assign(this.inputForm, defaultObj)
      this.search()
    },
    // 整理结构
    requestOperation (res) {
      let data = res.data
      let options = data.items.map(ele => {
        return {
          label: ele.name,
          value: ele.id
        }
      })
      return options
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/config/ui.scss";
.search{
  overflow: hidden;
  margin-bottom: 10px;
}
</style>
