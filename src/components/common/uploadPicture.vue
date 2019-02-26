<template>
<ul class="uploadBox">
  <li class="picture" v-for="(ele, idx) in fileList" :key="idx">
    <bg-image :thumb="ele.path">
      <div class="delete_icon" @click="deletePic(idx)">
          <div class="absolute_center">
              <i class="el-icon-delete"></i>
          </div>
      </div>
    </bg-image>
  </li>
  <li v-if="fileList.length < max" class="picker" @click="$refs.picker.click()">
    <i class="el-icon-plus absolute_center"></i>
  </li>
  <form ref="picker_from">
    <input ref="picker" type="file" @change="onSelect" multiple>
  </form>
</ul>
</template>
<script>
import bgImage from '../../components/common/image'
import { createObjectURL, imgToBase64, messageTips } from '../../assets/js/utils.js'
import { uploadPic } from '@/assets/api/user'
export default {
  components: {
    bgImage
  },
  props: {
    // 文件限制大小
    limitSize: {
      type: Number,
      default: 1024 * 1024 * 1
    },
    min: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [String, Number],
      default: 1
    }
  },
  data () {
    return {
      fileList: [],
      imageTypeLimit: ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']
    }
  },
  computed: {
    picker_from () {
      return this.$refs.picker_from
    }
  },
  methods: {
    // 点击上传图片
    onSelect () {
      let files = this.$refs.picker.files
      if (!this.checkFiles(files)) return false
      Object.keys(files).forEach(idx => {
        let file = files[idx]
        let url = createObjectURL(file)
        imgToBase64(url).then(res => {
          this.fileList.push({
            path: res, // base64
            file: file, // 文件流
            relative_path: ''
          })
        })
      })
      this.picker_from.reset()
    },
    // 删除图片
    deletePic (idx) {
      this.fileList.splice(idx, 1)
    },
    // 检测文件数量
    checkFileNumber () {
      if (this.filesList.length < this.min) {
        messageTips(this.$t('pleaseSelectImage'))
        return false
      }
      return true
    },
    // 请求上传图片
    upload () {
      return new Promise((resolve, reject) => {
        let uploadFiles = []
        let uploadfilesIndex = [] // 多图上传的时候用到
        let noUploadFiles = []
        this.fileList.forEach((ele, idx) => {
          if (ele.relative_path === '') {
            uploadFiles.push(ele.file)
            uploadfilesIndex.push(idx)
          } else {
            noUploadFiles.push(ele.relative_path)
          }
        })
        // 没有重新上传图片（是后台返回来的图片相对路径）
        // 目前接口只能单张图片上传，如需多张，去掉下标
        if (uploadFiles.length === 0) {
          resolve({ relative_path: noUploadFiles[0] })
        } else {
          let formData = new FormData()
          formData.append('type', 'form')
          formData.append('file', uploadFiles[0])
          uploadPic(formData, true).then(res => {
            let url = res.data.url
            resolve({ relative_path: url })
            // 如果是多图上传的话
            // resolve(noUploadFiles.concat(url))
          }).catch((error) => {
            reject(error)
          })
        }
      })
    },
    // 数据回来设置文件
    setFile (path, relativePath, file = {}) {
      this.fileList.push({
        path: path,
        file: file,
        relative_path: relativePath
      })
    },
    // 校验文件
    checkFiles (files) {
      let result = true
      let limitType = this.imageTypeLimit
      let limitSize = this.limitSize
      let len = files.length
      let nowLen = this.filesList ? this.filesList.length : 0
      if (nowLen + len > this.max) {
        messageTips(`最多上传${this.max}个文件`, 'error')
        return false
      }
      Object.keys(files).forEach(idx => {
        let file = files[idx]
        let type = file.type
        let size = file.size
        if (!limitType.includes(type) && result) {
          result = false
          messageTips(this.$t('tips.fileTypeError'), 'error')
        }
        if (limitSize < size && result) {
          result = false
          messageTips(this.$t('tips.fileSizeError', {
            size: limitSize / 1024 / 1024
          }), 'error')
        }
      })
      return result
    },
    // 清空文件
    clearFile () {
      this.fileList.splice(0, this.fileList.length)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../config/ui.scss";
.uploadBox{
  li{
    margin-right: 10px;
    &:last-of-type{
      margin-right: 0;
    }
  }
  .picture{
    float: left;
    width: 100px;
    height: 100px;
    &:hover .delete_icon{
      display: block;
    }
    .delete_icon{
      position: relative;
      display: none;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      i{
        color: white;
        font-size: 18px;
      }
    }
  }
  .picker{
    width: 100px;
    height: 100px;
    float: left;
    font-size: 20px;
    border: 1px solid #cccccc;
    color: #cccccc;
    position: relative;
    &:hover{
      i{
        color: $publicColor;
        transition: all .15s;
      }
      border-color: $publicColor;
    }
  }
}
input[type=file]{
display: none;
}
</style>
