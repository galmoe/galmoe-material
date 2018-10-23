<template>
  <div class="cropper" :style="{width: `${containerMaxW}px`, height: `${containerMaxH}px`}">
    <vueCropper
      ref="cropper"
      :img="opt.img"
      :outputSize="opt.size"
      :outputType="opt.outputType"
      :info="opt.info"
      :canScale="opt.canScale"
      :autoCrop="opt.autoCrop"
      :autoCropWidth="opt.autoCropWidth"
      :autoCropHeight="opt.autoCropHeight"
      :fixed="opt.fixed"
      :fixedBox="opt.fixedBox"
      :fixedNumber="opt.fixedNumber"
    ></vueCropper>
    <v-btn outline small color="primary"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">cloud_upload</i><label class="btn" for="uploads">&nbsp;选择</label></v-btn>
    <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
           accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
    <v-btn outline small color="primary" @click="rotateLeft()"><v-icon small>rotate_left</v-icon></v-btn>
    <v-btn outline small color="primary" @click="rotateRight()"><v-icon small>rotate_right</v-icon></v-btn>
    <v-btn outline small color="primary" @click="upload()"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">done_outline</i>&nbsp;确定</v-btn>
    <v-btn outline small color="primary" @click="logBlob()"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">done_outline</i>&nbsp;log</v-btn>
    <a @click="down()" class="btn">download(blob)</a>
    <a :href="downImg" download="demo.png" ref="downloadDom"></a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    containerMaxW: {
      type: Number,
      default: 500
    },
    containerMaxH: {
      type: Number,
      default: 500
    }
    // autoCropWidth: {
    //   type: Number,
    //   default: 200
    // },
    // autoCropHeight: {
    //   type: Number,
    //   default: 200
    // }
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
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 1150,
        autoCropHeight: 500,
        // 开启宽度和高度比例
        fixed: true,
        fixedBox: false,
        fixedNumber: [1150, 500],
        uploadCbLink: ''
      },
      downImg: '#'
    }
  },
  methods: {
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    logBlob () {
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data)
      })
    },
    upload () {
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data)
        const formData = new FormData()
        formData.append('file', new Blob([data]))
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
        axios.post('http://localhost:3000/api/upload', formData, config)
          .then(res => {
            if (res.data.type === 'success') {
              console.log(res.data.src)
            }
            // if (response.data.code === 0) {
            //   self.ImgUrl = response.data.data
            // }
            // console.log(response.data)
          })
      })
    },
    uploadImg (e) {
      // 上传图片
      // this.opt.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
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
    },
    down () {
      // event.preventDefault()
      // 输出
      this.$refs.cropper.getCropBlob(data => {
        this.downImg = window.URL.createObjectURL(data)
        if (window.navigator.msSaveBlob) {
          var blobObject = new Blob([data])
          window.navigator.msSaveBlob(blobObject, 'demo.png')
        } else {
          this.$nextTick(() => {
            this.$refs.downloadDom.click()
          })
        }
      })
    },
    imgLoad (msg) {
      console.log(msg)
    }
  }
}
</script>
