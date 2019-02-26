<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="serviceForm" :model="serviceForm" :rules="rules" label-width="100px">

        <el-form-item :label="$t('data.cnName')" prop="zhName">
          <el-input class="max_width_390" v-model.trim="serviceForm.zhName" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.enName')" prop="enName">
          <el-input class="max_width_390" v-model.trim="serviceForm.enName" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.topOfName')">
          <el-select v-model="serviceForm.parent_id " :placeholder="$t('operation.select')" class="full_width max_width_390">
            <el-option
              v-for="item in serviceType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('status.sort')" prop="sorting">
          <el-input-number class="full_width max_width_390" :controls="false" v-model="serviceForm.sorting" :min="0" :max="999"/>
        </el-form-item>

        <el-form-item :label="$t('status.status')" required>
          <el-radio-group v-model="serviceForm.status">
            <el-radio v-for="(item,index) in activeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="serviceForm.loading">{{serviceForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { addService, editService, service, allService } from '@/assets/api/serveArea'
import { zhName, enName } from '@/assets/js/rules'
import { messageTips } from '@/assets/js/utils'
import { activeOptions } from '@/assets/js/options'
export default {
  props: ['edit'],
  data () {
    return {
      activeOptions,
      rules: {
        zhName,
        enName
      },
      serviceForm: {
        parent_id: '',
        zhName: '',
        enName: '',
        sorting: 99,
        status: 1,
        loading: false
      },
      serviceType: []
    }
  },
  computed: {
    form () {
      return this.$refs.serviceForm
    }
  },
  created () {
    this.getAdvOption() // 获取所有上级地区
    if (this.edit) {
      this.request()
    }
  },
  methods: {
    getAdvOption () {
      let sendData = {
        except: this.edit
      }
      allService(this.edit ? sendData : {}).then(res => {
        let data = res.data.items
        this.serviceType = data.map(ele => {
          return {
            value: parseInt(ele.id),
            label: ele.name
          }
        })
      })
    },
    request () {
      service(this.edit).then(res => {
        let data = res.data
        this.serviceForm.parent_id = parseInt(data.parent_id)
        this.serviceForm.zhName = data.languages.zh.name
        this.serviceForm.enName = data.languages.en.name
        this.serviceForm.sorting = data.sorting
        this.serviceForm.status = parseInt(data.status)
      })
    },
    submit () {
      this.form.validate().then(res => {
        this.loading = true
        let sendData = {
          parent_id: this.serviceForm.parent_id,
          sorting: this.serviceForm.sorting,
          status: this.serviceForm.status,
          languages: {
            zh: {
              name: this.serviceForm.zhName
            },
            en: {
              name: this.serviceForm.enName
            }
          }
        }
        let fn = this.edit ? editService(sendData, this.edit) : addService(sendData)
        fn.then(res => {
          this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
          this.$router.replace({
            name: 'ServiceArea'
          })
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>
