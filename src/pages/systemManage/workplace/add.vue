<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="workplaceForm" :model="workplaceForm" :rules="rules" label-width="100px">
        <el-form-item :label="$t('data.cnName')" prop="zhName">
          <el-input class="max_width_300" v-model.trim="workplaceForm.zhName" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.enName')" prop="enName">
          <el-input class="max_width_300" v-model.trim="workplaceForm.enName" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('data.thumb')" required>
          <upload-picture ref="upload"></upload-picture>
        </el-form-item>
        <el-form-item :label="$t('status.sort')" prop="sorting">
          <el-input class="max_width_300" v-model.trim="workplaceForm.sorting" :spellcheck="false"/>
        </el-form-item>
        <el-form-item :label="$t('status.status')" required>
          <el-radio-group v-model="workplaceForm.status">
            <el-radio v-for="(item,index) in activeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="workplaceForm.loading">{{workplaceForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../../components/common/uploadPicture'
import { workplace, editWorkplace, addWorkplace } from '@/assets/api/workplace'
import { zhName, enName, sorting } from '@/assets/js/rules'
import { activeOptions } from '@/assets/js/options'
import { messageTips } from '@/assets/js/utils'
export default {
  props: ['edit'],
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
      workplaceForm: {
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
      return this.$refs.workplaceForm
    }
  },
  created () {
    if (this.edit) {
      this.request()
    }
  },
  methods: {
    request () {
      workplace(this.id).then(res => {
        let data = res.data
        this.workplaceForm.zhName = data.languages.zh.name
        this.workplaceForm.enName = data.languages.en.name
        this.workplaceForm.sorting = data.sorting
        this.workplaceForm.status = parseInt(data.status)
        this.$refs.upload.setFile(data.image, data.image)
      })
    },
    submit () {
      this.form.validate().then(res => {
        if (!this.$refs.upload.checkFileNumber) return false
        this.loading = true
        this.$refs.upload.upload().then(res => {
          this.workplaceForm.image = res.relative_path
          let sendData = {
            sorting: this.workplaceForm.sorting,
            status: this.workplaceForm.status,
            image: this.workplaceForm.image,
            languages: {
              zh: {
                name: this.workplaceForm.zhName
              },
              en: {
                name: this.workplaceForm.enName
              }
            }
          }
          let fn = this.edit ? editWorkplace(sendData, this.id) : addWorkplace(sendData)
          fn.then(res => {
            this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
            this.$router.replace({
              name: 'Workplace'
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
