<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="advForm" :model="advForm" :rules="rules" label-width="100px">

        <el-form-item :label="$t('data.cnName')" prop="zhName">
          <el-input class="max_width_390" v-model.trim="advForm.zhName" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.enName')" prop="enName">
          <el-input class="max_width_390" v-model.trim="advForm.enName" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.thumb')" required>
          <upload-picture ref="upload"></upload-picture>
        </el-form-item>

        <el-form-item :label="$t('data.adType')" prop="type_id">
          <el-select v-model="advForm.type_id" :placeholder="$t('operation.select')" class="full_width max_width_390">
            <el-option
              v-for="item in advType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('data.operationType')" prop="action">
          <el-radio-group v-model="advForm.action">
            <el-radio v-for="(item,index) in activeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="'url'" prop="url" v-if="advForm.action == '1'">
          <el-input class="max_width_390" v-model.trim="advForm.url" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.showTime')" prop="onlineTime">
          <el-date-picker
            v-model="advForm.onlineTime"
            :picker-options="disabledBeforeDateIncludesToday"
            :editable="false"
            :clearable="false"
            class="full_width max_width_390"
            value-format="timestamp"
            type="datetimerange"
            :start-placeholder="$t('data.onlineTime')"
            :end-placeholder="$t('data.offlineTime')">
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="$t('status.sort')" prop="sorting">
          <el-input-number class="full_width max_width_390" :controls="false" v-model="advForm.sorting" :min="0" :max="999"/>
        </el-form-item>

        <el-form-item :label="$t('status.status')" required>
          <el-radio-group v-model="advForm.status">
            <el-radio v-for="(item,index) in activeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="advForm.loading">{{advForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/common/uploadPicture'
import { addAdvertisting, editAdvertisting, advertisting, allAdv } from '@/assets/api/advertisting'
import { disabledBeforeDateIncludesToday } from '@/assets/js/logic'
import { zhName, enName, sorting, url, timeDate, advSelect } from '@/assets/js/rules'
import { activeOptions, action } from '@/assets/js/options'
import { messageTips } from '@/assets/js/utils'
export default {
  props: ['edit'],
  components: {
    UploadPicture
  },
  data () {
    return {
      disabledBeforeDateIncludesToday,
      activeOptions,
      action,
      rules: {
        zhName,
        enName,
        sorting,
        url,
        type_id: advSelect,
        onlineTime: timeDate
      },
      advForm: {
        type_id: '',
        zhName: '',
        enName: '',
        image: '',
        action: 0,
        url: '',
        onlineTime: '',
        sorting: 99,
        status: 1,
        loading: false
      },
      advType: []
    }
  },
  computed: {
    form () {
      return this.$refs.advForm
    }
  },
  created () {
    this.getAdvOption() // 获取所有广告类型
    if (this.edit) {
      this.request()
    }
  },
  methods: {
    getAdvOption () {
      allAdv().then(res => {
        let data = res.data.items
        this.advType = data.map(ele => {
          return {
            value: parseInt(ele.id),
            label: ele.name
          }
        })
      })
    },
    request () {
      advertisting(this.edit).then(res => {
        let data = res.data
        this.advForm.type_id = parseInt(data.type_id)
        this.advForm.zhName = data.languages.zh.name
        this.advForm.enName = data.languages.en.name
        this.advForm.sorting = data.sorting
        this.advForm.status = parseInt(data.status)
        this.$refs.upload.setFile(data.image, data.image)
        this.advForm.action = parseInt(data.action)
        this.advForm.url = data.url
        this.advForm.onlineTime = [new Date(data.start_time * 1000), new Date(data.end_time * 1000)]
      })
    },
    submit () {
      this.form.validate().then(res => {
        if (!this.$refs.upload.checkFileNumber) return false
        this.loading = true
        this.$refs.upload.upload().then(res => {
          this.advForm.image = res.relative_path
          let sendData = {
            type_id: this.advForm.type_id,
            action: this.advForm.action,
            start_time: this.advForm.onlineTime[0] / 1000,
            end_time: this.advForm.onlineTime[1] / 1000,
            sorting: this.advForm.sorting,
            status: this.advForm.status,
            image: this.advForm.image,
            languages: {
              zh: {
                name: this.advForm.zhName
              },
              en: {
                name: this.advForm.enName
              }
            }
          }
          let fn = this.edit ? editAdvertisting(sendData, this.edit) : addAdvertisting(sendData)
          fn.then(res => {
            this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
            this.$router.replace({
              name: 'AdManage'
            })
          }).finally(() => {
            this.loading = false
          })
        })
      })
    }
  }
}
</script>
