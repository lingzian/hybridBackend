<template>
  <ul class="uploadBox cl">
    <li class="picture" v-for="(ele, idx) in videoFileList" :key="idx">
      <bg-image :thumb="ele.pic.path" class="bgImage">

        <div class="repeat_previewr pointer" v-if="!onlyRead">
          <div class="edit_icon" @click="$refs.pic_picker.click()">
            <div class="absolute_center">
              <i class="el-icon-edit"></i>
              <div class="tips">
                {{$t('data.changePic')}}
              </div>
            </div>
          </div>

          <div class="delete_icon" @click="deletePic(idx)" v-if="!onlyRead">
            <div class="absolute_center">
                <i class="el-icon-delete"></i>
                <div class="tips">
                  {{$t('operation.del')}}
                </div>
            </div>
          </div>
        </div>

        <div class="playMiddle absolute_center" v-if="onlyRead" @click="play(ele.path)"><i class="el-icon-caret-right absolute_center" /></div>

      </bg-image>

      <div class="file_name pointer" @click="play(ele.path)" v-if="!onlyRead">
        <div class="name text_single_overflow">{{ele.files ? ele.files.name :' '}}</div>
        <div class="play"><i class="el-icon-caret-right absolute_center" /></div>
      </div>

    </li>

    <li v-if="videoFileList.length < max" class="picker" @click="$refs.video_picker.click()">
      <i class="el-icon-plus absolute_center"></i>
    </li>

    <form ref="pic_picker_from" class="pic_picker_from" >
      <input ref="pic_picker" type="file" @change="onSelectPic()">
    </form>
    <form ref="video_picker_from">
      <input ref="video_picker" type="file" @change="onSelectVideo" multiple>
    </form>

  </ul>
</template>
<script>
import bgImage from '../../components/common/image'
import { createObjectURL, imgToBase64, captureVideoImage, messageTips } from '../../assets/js/utils.js'
import { uploadVideo } from '@/assets/api/user'
export default {
  components: {
    bgImage
  },
  props: {
    // 图片文件限制大小
    picLimitSize: {
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
    },
    onlyRead: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      videoFileList: [],
      imageTypeLimit: ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'],
      videoTypeLimit: ['video/mp4', 'video/avi', 'video/rmvb', 'video/wmv', 'video/3gp', 'video/rm']
    }
  },
  computed: {
    pic_picker_from () {
      return this.$refs.pic_picker_from
    },
    video_picker_from () {
      return this.$refs.video_picker_from
    }
  },
  methods: {
    // 点击上传视频
    onSelectVideo () {
      let files = this.$refs.video_picker.files
      if (!this.checkVideoFiles(files)) return false
      Object.keys(files).forEach(ele => {
        let file = files[ele]
        let url = createObjectURL(file)
        captureVideoImage(url, false).then(res => {
          this.video_picker_from.reset()
          this.videoFileList.push({
            path: url,
            relative_path: '',
            files: file,
            pic: {
              path: res,
              relative_path: '',
              file: ''
            }
          })
        })
      })
    },
    // 点击上传图片
    onSelectPic () {
      let files = this.$refs.pic_picker.files
      if (!this.checkPicFiles(files)) return false
      let file = files[0]
      let url = createObjectURL(file)
      imgToBase64(url).then(res => {
        this.videoFileList[0].pic.path = res
        this.videoFileList[0].pic.file = file
      })
      this.pic_picker_from.reset()
    },
    // 删除视频
    deletePic (idx) {
      this.videoFileList.splice(idx, 1)
    },
    // 检测文件数量
    checkFileNumber () {
      if (this.filesList.length < this.min) {
        messageTips(this.$t('pleaseSelectImage'))
        return false
      }
      return true
    },
    // 请求上传视频和封面图
    upload () {
      return new Promise((resolve, reject) => {
        let uploadFilesVideo = []
        let uploadfilesIndexVideo = []
        let noUploadFilesVideo = []

        let uploadFilesPic = []
        let uploadfilesIndexPic = []
        let noUploadFilesPic = []
        this.videoFileList.forEach((ele, idx) => {
          if (ele.relative_path === '') {
            uploadFilesVideo.push(ele.file)
            uploadfilesIndexVideo.push(idx)
          } else {
            noUploadFilesVideo.push(ele.relative_path)
          }
          if (ele.pic.relative_path === '') {
            uploadFilesPic.push(ele.pic.relative_path)
            uploadfilesIndexPic.push(idx)
          } else {
            noUploadFilesPic.push(ele.pic.relative_path)
          }
        })

        if (uploadFilesVideo.length === 0) {
          resolve({ path: noUploadFilesVideo[0] })
        } else {
          let formData = new FormData()
          formData.append('type', 'form')
          formData.append('file', uploadFilesVideo[0])
          formData.append('file', uploadFilesPic[0])
          uploadVideo(formData, true).then(res => {
            let data = res.data
            resolve({ video_relative_path: data.media, pic_relative_path: data.image })
            // 如果是多图上传的话
            // resolve(noUploadFiles.concat(url))
          }).catch((error) => {
            reject(error)
          })
        }
      })
    },
    // 数据回来设置文件
    setFile (videoPath, videoRelativePath, picPath, picRelativePath, file = {}) {
      this.videoFileList.push({
        path: videoPath,
        file: file,
        relative_path: videoRelativePath,
        pic: {
          path: picPath,
          relative_path: picRelativePath
        }
      })
    },
    // 校验文件
    checkPicFiles (files, type) {
      let result = true
      let limitType = this.imageTypeLimit
      let limitSize = this.picLimitSize
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
    checkVideoFiles (files) {
      let result = true
      let limitType = this.videoTypeLimit
      let len = files.length
      let nowLen = this.videoFileList ? this.videoFileList.length : 0
      if (nowLen + len > this.max) {
        messageTips(`最多上传${this.max}个文件`, 'error')
        return false
      }
      Object.keys(files).forEach(idx => {
        let file = files[idx]
        let type = file.type
        // let size = file.size
        if (!limitType.includes(type) && result) {
          result = false
          messageTips('文件格式不正确，请上传 [mp4, avi, rmvb, wmv,3gp,rm] 格式的文件', 'error')
        }
      })
      return result
    },
    // 清空文件
    clearFile () {
      this.videoFileList.splice(0, this.videoFileList.length)
    },
    // 播放
    play (path) {
      window.open(path)
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
    width: 300px;
    height: 200px;
    position: relative;
    .repeat_previewr,
    .image_view{
      width: 100% !important;
      height:100% !important;
    }
    .bgImage:hover .edit_icon,
    .bgImage:hover .delete_icon{
      display: block;
    }
    .delete_icon{
      position: relative;
      display: none;
      float: left;
      color: white;
      text-align: center;
      width: 50%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      i{
        font-size:25px;
      }
      &:hover{
        color: #1890ff;
      }
    }
    .edit_icon{
      position: relative;
      float: left;
      display: none;
      color: white;
      text-align: center;
      width: 50%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      i{
        font-size: 25px;
      }
      &:hover{
        color: #1890ff;
      }
    }
  }
  .picker{
    width: 300px;
    height: 230px;
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
  .file_name{
    margin-top: 5px;
    .name{
      display: inline-block;
      max-width: 275px;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .play{
      display: inline-block;
      position: relative;
      width: 20px;
      height: 20px;
      overflow: hidden;
      border: 1px solid #ccc;
      border-radius: 50%;
      vertical-align: middle;
      margin-left: 5px;
    }
    &:hover{
      color: #1890ff;
    }
  }
  .playMiddle{
    cursor: pointer;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border: 2px solid #ccc;
    border-radius: 50%;
    font-size: 20px;
    color: white;
    &:hover{
      color: #1890ff;
    }
  }
  .playMiddle:hover{
    border-color: #1890ff;
  }
}
input[type=file]{
  display: none;
}
</style>
