<template>
  <v-dialog v-model="show" :width="containerMaxW">
    <v-card style="height: 600px">
    <div class="cropper" :style="{width: `${containerMaxW}px`, height: `${containerMaxH}px`}">
      <vueCropper
        ref="cropper"
        :img="opt.img"
        :outputSize="opt.size"
        :outputType="opt.outputType"
        :info="opt.info"
        :canScale="opt.canScale"
        :autoCrop="opt.autoCrop"
        :autoCropWidth="autoCropWidth"
        :autoCropHeight="autoCropHeight"
        :fixed="opt.fixed"
        :fixedBox="opt.fixedBox"
        :fixedNumber="fixedNumber"
      ></vueCropper>
      <v-btn outline small color="primary"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">cloud_upload</i><label class="btn" for="uploads">&nbsp;选择</label></v-btn>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
      <v-btn outline small color="primary" @click="rotateLeft()"><v-icon small>rotate_left</v-icon></v-btn>
      <v-btn outline small color="primary" @click="rotateRight()"><v-icon small>rotate_right</v-icon></v-btn>
      <v-btn outline small color="primary" @click="upload()"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">check</i>&nbsp;确定</v-btn>
      <v-btn outline small color="primary" @click.stop="handleCancel"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">close</i>&nbsp;取消</v-btn>
    </div>
    </v-card>
  </v-dialog>
</template>

<script>
import axiosUpload from '../../api/upload'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    containerMaxW: {
      type: Number,
      default: 500
    },
    containerMaxH: {
      type: Number,
      default: 500
    },
    autoCropWidth: {
      type: Number,
      default: 200
    },
    autoCropHeight: {
      type: Number,
      default: 200
    },
    fixedNumber: {
      type: Array,
      default: function () {
        return [200, 200]
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      opt: {
        img: '',
        info: true,
        size: 1,
        outputType: 'webp',
        canScale: true,
        autoCrop: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedBox: false,
        uploadCbLink: ''
      },
      src: '',
      downImg: '#'
    }
  },
  methods: {
    handleCancel () {
      this.show = false
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    upload () {
      this.$refs.cropper.getCropBlob((data) => {
        let formData = new FormData()
        formData.append('img', new Blob([data]))
        formData.append('type', this.type)
        axiosUpload(formData)
          .then(res => {
            if (res.data.type === 'success') {
              this.$emit('uploadCb', res.data.src)
              this.show = false
            }
          })
      })
    },
    uploadImg (e) {
      // 上传图片
      // this.opt.img
      const file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.opt.img = data
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>
