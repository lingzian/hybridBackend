<template>
  <div class="inline_block full_width">
    <el-select v-if="search"
      :multiple="multiple"
      v-model="result"
      :placeholder="placeholder"
      @change="change"
      filterable
      remote
      :remote-method="remoteMethod"
      class="full_width">
      <el-option
        v-for="item in infoOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-else
      v-model="result"
      :placeholder="placeholder"
      class="full_width"
      :multiple="multiple"
      :loading="loading"
      @change="change"
      >
      <el-option
        v-for="item in infoOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { webUsers } from '@/assets/api/web'
import { roles } from '@/assets/api/role'
export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: null,
    interface: {
      default: '',
      type: String
    },
    search: {
      default: false,
      type: Boolean
    },
    multiple: {
      default: false,
      type: Boolean
    },
    placeholder: {
      type: String,
      default: ''
    },
    // 接口数据类型
    options: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      result: this.value || '',
      infoOptions: this.options || ''
    }
  },
  created () {
    if (this.search) {
      this.request()
    }
  },
  watch: {
    value () {
      this.result = this.value
    },
    options (val) {
      this.infoOptions = val
    }
  },
  methods: {
    request () {

    },
    remoteMethod (val) {
      if (val === '') return false
      this.loading = true
      if (this.interface === 'webUser') {
        let sendData = {
          username: val,
          type: 1
        }
        webUsers(sendData).then(res => {
          this.infoOptions = res.data.items.map(ele => {
            return {
              label: ele.username,
              value: ele.id
            }
          })
        })
      }
      if (this.interface === 'role') {
        let sendData = {
          keyword: val
        }
        roles(sendData).then(res => {
          this.infoOptions = res.data.items.map(ele => {
            return {
              label: ele.name,
              value: ele.name
            }
          })
        })
      }
    },
    change () {
      this.$emit('change', this.result)
    }
  }
}
</script>
