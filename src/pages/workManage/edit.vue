<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="workForm" :model="workForm" :rules="rules" label-width="100px">
        <el-form-item :label="$t('data.cnName')" prop="zhName">
          <el-input class="max_width_300" v-model.trim="workForm.zhName" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.enName')" prop="enName">
          <el-input class="max_width_300" v-model.trim="workForm.enName" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.thumb')" required>
          <upload-picture ref="upload"></upload-picture>
        </el-form-item>
        <el-form-item :label="$t('status.sort')" prop="sorting">
          <el-input class="max_width_300" v-model.trim="workForm.sorting" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('status.status')" required>
          <el-radio-group v-model="workForm.status">
            <el-radio v-for="(item,index) in activeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="workForm.loading">{{workForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/common/uploadPicture'
import { work, editWork } from '@/assets/api/work'
import { zhName, enName, sorting } from '@/assets/js/rules'
import { activeOptions } from '@/assets/js/options'
import { messageTips } from '@/assets/js/utils'
export default {
  components: {
    UploadPicture
  },
  data () {
    return {
      activeOptions,
      rules: {
        zhName,
        enName,
        sorting
      },
      id: this.$route.query.id,
      workForm: {
        zhName: '',
        enName: '',
        image: '',
        sorting: 99,
        status: 1,
        loading: false
      }
    }
  },
  computed: {
    form () {
      return this.$refs.workForm
    }
  },
  created () {
    this.request()
  },
  methods: {
    request () {
      work(this.id).then(res => {
        let data = res.data
        this.workForm.zhName = data.languages.zh.name
        this.workForm.enName = data.languages.en.name
        this.workForm.sorting = data.sorting
        this.workForm.status = parseInt(data.status)
        this.$refs.upload.setFile(data.image, data.image)
      })
    },
    submit () {
      this.form.validate().then(res => {
        if (!this.$refs.upload.checkFileNumber) return false
        this.loading = true
        this.$refs.upload.upload().then(res => {
          this.workForm.image = res.relative_path
          let sendData = {
            sorting: this.workForm.sorting,
            status: this.workForm.status,
            image: this.workForm.image,
            language: {
              zh: {
                name: this.workForm.zhName
              },
              en: {
                name: this.workForm.enName
              }
            }
          }
          let fn = editWork(sendData, this.id)
          fn.then(res => {
            messageTips(this.$t('tips.editSuccess'))
            this.$router.replace({
              name: 'WorkManage'
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
