<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="menuForm" :model="menuForm" :rules="rules" label-width="100px">

        <el-form-item :label="$t('data.cnName')" prop="zhName">
          <el-input class="max_width_390" v-model.trim="menuForm.zhName" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.enName')" prop="enName">
          <el-input class="max_width_390" v-model.trim="menuForm.enName" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.thumb')" required>
          <upload-picture ref="upload"></upload-picture>
        </el-form-item>

        <el-form-item :label="$t('data.type')" prop="type_id">
          <el-select v-model="menuForm.type" :placeholder="$t('operation.select')" class="full_width max_width_390">
            <el-option
              v-for="item in menuType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="'url'" prop="url" v-if="menuForm.type == '2'">
          <el-input class="max_width_390" v-model.trim="menuForm.url" :spellcheck="false"/>
        </el-form-item>

        <el-form-item :label="$t('data.appID')" prop="type" v-if="menuForm.type == '1'">
          <el-select v-model="menuForm.activity" :placeholder="$t('operation.select')" class="full_width max_width_390">
            <el-option
              v-for="item in menuPage"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item :label="$t('status.sort')" prop="sorting">
          <el-input-number class="full_width max_width_390" :controls="false" v-model="menuForm.sorting" :min="0" :max="999"/>
        </el-form-item> -->
        <el-form-item :label="$t('data.userType')">
          <el-checkbox-group
            v-model="menuForm.userType">
            <el-checkbox v-for="(ele,idx) in userType" :label="ele.value" :key="idx">{{ele.label}} <el-input-number class="max_width_100" size="mini" :controls="false" :min="0" v-model.trim="menuForm.userSoring[`sorting${idx+1}`]" :placeholder="'排序'" :spellcheck="false"/></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item :label="$t('status.status')" required>
          <el-radio-group v-model="menuForm.status">
            <el-radio v-for="(item,index) in activeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="text_center">
          <el-button type="primary" @click="submit" :loading="menuForm.loading">{{menuForm.loading ? $t('operation.inSubmit') : $t('operation.submit')}}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/common/uploadPicture'
import { addMenus, editMenus, menu, allMenu } from '@/assets/api/menuModule'
import { zhName, enName, sorting, url, selectMenuPage } from '@/assets/js/rules'
import { menuType, activeOptions, userType } from '@/assets/js/options'
import { messageTips } from '@/assets/js/utils'
export default {
  props: ['edit'],
  components: {
    UploadPicture
  },
  data () {
    return {
      activeOptions,
      userType,
      menuType,
      rules: {
        zhName,
        enName,
        sorting,
        url,
        activity: selectMenuPage
      },
      menuForm: {
        type: '1',
        zhName: '',
        enName: '',
        image: '',
        url: '',
        activity: '',
        status: 1,
        userType: ['0'],
        userSoring: {
          sorting1: 127,
          sorting2: 127,
          sorting3: 127
        },
        loading: false
      },
      menuPage: []
    }
  },
  computed: {
    form () {
      return this.$refs.menuForm
    }
  },
  created () {
    this.getMenuOption() // 获取所有广告类型
    if (this.edit) {
      this.request()
    }
  },
  methods: {
    getMenuOption () {
      allMenu().then(res => {
        let data = res.data.items
        this.menuPage = data.map(ele => {
          return {
            value: ele.id,
            label: ele.name
          }
        })
      })
    },
    request () {
      menu(this.edit).then(res => {
        let data = res.data
        this.menuForm.type = data.type
        this.menuForm.status = parseInt(data.status)
        this.$refs.upload.setFile(data.image, data.image)
        this.menuForm.url = data.url
        this.menuForm.user_types = data.user_types
        this.menuForm.activity = data.activity
        this.menuForm.zhName = data.languages.zh.name
        this.menuForm.enName = data.languages.en.name
        this.menuForm.userType.splice(0, 1)
        data.user_types.forEach((ele, idx) => {
          this.menuForm.userType.push(ele.type)
          this.menuForm.userSoring[`sorting${parseInt(ele.type) + 1}`] = ele.sorting
        })
      })
    },
    submit () {
      this.form.validate().then(res => {
        if (!this.$refs.upload.checkFileNumber) return false
        this.menuForm.loading = true
        this.$refs.upload.upload().then(res => {
          this.menuForm.image = res.relative_path
          let userTypes = this.menuForm.userType.map((ele, idx) => {
            return {
              type: ele,
              sorting: this.menuForm.userSoring[`sorting${parseInt(ele) + 1}`]
            }
          })
          let sendData = {
            type: this.menuForm.type,
            status: this.menuForm.status,
            image: this.menuForm.image,
            activity: this.menuForm.activity,
            url: this.menuForm.url,
            user_types: userTypes,
            languages: {
              zh: {
                name: this.menuForm.zhName
              },
              en: {
                name: this.menuForm.enName
              }
            }
          }
          let fn = this.edit ? editMenus(sendData, this.edit) : addMenus(sendData)
          fn.then(res => {
            this.edit ? messageTips(this.$t('tips.editSuccess')) : messageTips(this.$t('tips.addSuccess'))
            this.$router.replace({
              name: 'IndexMenu'
            })
          }).finally(() => {
            this.menuForm.loading = false
          })
        })
      })
    }
  }
}
</script>
