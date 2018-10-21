<!--<template>-->
  <!--<vueCropper-->
    <!--ref="cropper3"-->
    <!--:img="example3.img"-->
    <!--:autoCrop="example3.autoCrop"-->
    <!--:autoCropWidth="example3.autoCropWidth"-->
    <!--:autoCropHeight="example3.autoCropHeight"-->
    <!--:fixedBox="example3.fixedBox"-->
  <!--&gt;</vueCropper>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
  <!--name: 'upload',-->
  <!--data: function () {-->
    <!--return {-->
      <!--example3: {-->
        <!--img: 'https://lh3.googleusercontent.com/-xqohPJaBCsk/W6ISMlMnPHI/AAAAAAAAAH0/0MXsnEG3qEsKny5mTcPbIbRvLJhb3rs8wCJkCGAYYCw/w1355-h763-n-rw-no/yande.re%2B329218%2Banimal_ears%2Bfixed%2Bnekomimi%2Bnekotyabatake%2Bno_bra%2Bojitea%2Bopen_shirt%2Bpantsu%2Bpanty_pull%2Bpsycho_logic_love_comedy%2Btail%2Bthighhighs.jpg',-->
        <!--autoCrop: true,-->
        <!--autoCropWidth: 200,-->
        <!--autoCropHeight: 200,-->
        <!--fixedBox: true-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->

<template>
  <div class="cropper">
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
      :fixedNumber="opt.fixedNumber"
    ></vueCropper>
    <v-btn outline small color="primary"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">cloud_upload</i><label class="btn" for="uploads">&nbsp;选择</label></v-btn>
    <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
           accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
    <v-btn outline small color="primary" @click="rotateLeft()"><v-icon small>rotate_left</v-icon></v-btn>
    <v-btn outline small color="primary" @click="rotateRight()"><v-icon small>rotate_right</v-icon></v-btn>
    <v-btn outline small color="primary"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">done_outline</i>&nbsp;确定</v-btn>
    <v-btn outline small color="primary" @click="logBlob()"><i aria-hidden="true" class="v-icon material-icons theme--light primary--text">done_outline</i>&nbsp;log</v-btn>
    <a @click="down()" class="btn">download(blob)</a>
    <a :href="downImg" download="demo.png" ref="downloadDom"></a>
  </div>
</template>

<script>
export default {
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
        autoCropWidth: 200,
        autoCropHeight: 200,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
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
    imgLoad (msg) {
      console.log(msg)
    }
  }
}
</script>

<!--<template>-->
  <!--<v-layout row justify-center>-->
    <!--<v-dialog v-model="dialog" scrollable max-width="300px">-->
      <!--<v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>-->
      <!--<v-card>-->
        <!--<vueCropper-->
          <!--ref="cropper3"-->
          <!--:img="example3.img"-->
          <!--:autoCrop="example3.autoCrop"-->
          <!--:autoCropWidth="example3.autoCropWidth"-->
          <!--:autoCropHeight="example3.autoCropHeight"-->
          <!--:fixedBox="example3.fixedBox"-->
        <!--&gt;</vueCropper>-->
      <!--</v-card>-->
    <!--</v-dialog>-->
  <!--</v-layout>-->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--dialogm1: '',-->
        <!--dialog: false,-->
        <!--example3: {-->
          <!--img: 'https://lh3.googleusercontent.com/-xqohPJaBCsk/W6ISMlMnPHI/AAAAAAAAAH0/0MXsnEG3qEsKny5mTcPbIbRvLJhb3rs8wCJkCGAYYCw/w1355-h763-n-rw-no/yande.re%2B329218%2Banimal_ears%2Bfixed%2Bnekomimi%2Bnekotyabatake%2Bno_bra%2Bojitea%2Bopen_shirt%2Bpantsu%2Bpanty_pull%2Bpsycho_logic_love_comedy%2Btail%2Bthighhighs.jpg',-->
          <!--autoCrop: true,-->
          <!--autoCropWidth: 200,-->
          <!--autoCropHeight: 200,-->
          <!--fixedBox: true-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
