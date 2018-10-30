<template>
  <v-card>
    <div class="v-card__text"><h4>{{ (isEdit)? '编辑': '发布 (markdown语法支持)'}}</h4></div>
    <v-text-field
      v-model="title"
      prepend-icon="title"
      label="标题"
      :rules="[Rules.required, Rules.max(40)]"
    ></v-text-field>
    <v-text-field
      v-model="subTitle"
      prepend-icon="subtitles"
      label="摘要(选填)"
      :rules="[Rules.max(40)]"
    ></v-text-field>
    <div class="thumb-uploader">
      <div class="upload-container" v-show="showThumbLabel">
        <v-icon>add_photo_alternate</v-icon>
      </div>
      <img :src="thumb" alt="" v-if="thumb">
      <div>
        <label class="btn button-upload text-center">
          选择
          <input type="file" accept="image/jpeg, image/jpg, image/png, image/bmp" class="file-chooser" ref="thumb">
        </label>
        <label class="btn button-upload btn-success text-center" @click="upload">
          确定
        </label>
      </div>
    </div>
    <mavonEditor  v-model="mkdown"
                  ref=md
                  :toolbars="toolbars"
                  :subfield="false"
                  @imgAdd="imgAdd"
                  @imgDel="imgDel"
                  @change="getContent">
    </mavonEditor>
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs6>
          <div class="v-card__text"><h4><v-icon small>cloud_download</v-icon>&nbsp;&nbsp;下载</h4></div>
          <v-text-field
            v-model="download.link"
            prepend-icon="link"
            label="链接"
          ></v-text-field>
          <v-text-field
            v-model="download.pwd"
            prepend-icon="lock"
            label="提取码"
          ></v-text-field>
          <v-text-field
            v-model="download.compressPwd"
            prepend-icon="lock_open"
            label="解压码"
          ></v-text-field>
          <v-text-field
            v-model="download.meta"
            prepend-icon="info"
            label="备注"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <div class="v-card__text"><h4><v-icon small>send</v-icon>&nbsp;&nbsp;发布</h4></div>
          <v-select
            prepend-icon="done_outline"
            v-model="category"
            :items="categories"
            :rules="[Rules.required]"
            label="分类"
            required
          ></v-select>
          <v-layout row wrap>
            <v-flex>
              <v-text-field
                label="验证码"
                prepend-icon="verified_user"
                :rules="[Rules.required, Rules.length(6)]"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <img :src="captchaURL"
                   ref="captcha"
                   @click="changeCaptcha"
                   alt="点击刷新"
                   title="点击刷新"
                   class="captcha">
            </v-flex>
          </v-layout>
          <v-btn block color="success" @click="submit">确定</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import Rules from '../../public/rules'
import { backEnd } from '../../../config'
import api from '../../../api'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axiosUpload from '../../../api/upload'
export default {
  name: 'publish',
  created () {
    if (this.$route.meta.type === 'edit') {
      // get init data
      console.log(this.$route.query)
    }
  },
  data () {
    return {
      showThumbLabel: true,
      category: null,
      categories: [
        '文章',
        '游戏',
        '音乐',
        '其他'
      ],
      Rules,
      title: '',
      subTitle: '',
      thumb: '',
      captchaURL: `${backEnd}/api/captcha`,
      captcha: '',
      mkdown: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        // table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        // /* 2.1.8 */
        // alignleft: true, // 左对齐
        // aligncenter: true, // 居中
        // alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: false, // 单双栏模式
        preview: true // 预览
      },
      content: '',
      // download
      download: {
        link: '',
        pwd: '',
        compressPwd: '',
        meta: ''
      }
    }
  },
  computed: {
    isEdit: function () {
      return this.$route.meta.type === 'edit'
    }
  },
  methods: {
    getContent (val, render) {
      this.content = render
    },
    changeCaptcha () {
      this.$refs.captcha.src = `${backEnd}/api/captcha?${Date.now()}`
    },
    upload: function () {
      let f = this.$refs.thumb
      console.dir(f.files[0])
      let formData = new FormData()
      formData.append('img', f.files[0])
      axiosUpload(formData)
        .then(res => {
          if (res.data.type === 'success') {
            this.showThumbLabel = false
            this.thumb = res.data.src
          }
        })
    },
    imgAdd (pos, $file) {
      let formData = new FormData()
      formData.append('image', $file)
      axiosUpload(formData)
        .then((res) => {
          this.$refs.md.$img2Url(pos, res.data.src)
        })
    },
    // TODO: BUG: delete function error
    imgDel (pos) {
      // let filename = this.img_file[pos]['name']
      // let res = this.$refs.md.$refs.toolbar_left.$imgDelByFilename(filename)
      // console.log(res)
      // if (res) {
      //   alert('删除成功!')
      //   // delete this.img_file[pos];
      // } else {
      //   alert('删除失败!')
      // }
    },
    submit () {
      const data = {
        title: this.title,
        subTitle: this.subTitle,
        thumb: this.thumb,
        mkdown: this.mkdown,
        content: this.content,
        category: this.categorySelected,
        download: this.download
      }
      console.log(data)
      api.publish.publish(data)
    }
  },
  components: {
    mavonEditor
  }
}

</script>

<style scoped>
  .thumb-uploader {
    text-align: center;
    max-height: 400px;
    margin-bottom: 20px;
  }
  .thumb-uploader > img {
    max-height: 300px;
  }
  .upload-container {
    height: 200px;
    width: 200px;
    margin: 0 auto;
    text-align: center;
    color: #99a2aa;
    padding-top: 68px;
    position: relative;
    cursor: pointer;
    background: #f5f4f4;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
  }
  .upload-container:hover {
    border-color: #409eff;
  }
  .upload-container > i {
    font-size: 70px;
  }
  .btn {
    position: relative;
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-repeat: repeat-x;
    background-position: -1px -1px;
    background-size: 110% 110%;
    border: 1px solid rgba(27,31,35,0.2);
    border-radius: 0.25em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: #24292e;
    background-color: #eff3f6;
    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
  }
  .btn:hover {
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);
    background-position: -0.5em;
    border-color: rgba(27,31,35,0.35);
  }
  .button-upload {
    margin-top: 16px;
    width: 100px;
    margin-right: 10px;
    overflow: hidden;
  }
  .btn-success {
    color: #fff;
    background-color: #28a745;
    background-image: linear-gradient(-180deg,#34d058,#28a745 90%);
  }
  .btn-success:hover {
    background-color: #269f42;
    background-image: linear-gradient(-180deg,#2fcb53,#269f42 90%);
    background-position: -0.5em;
    border-color: rgba(27,31,35,0.5);
  }
  .file-chooser {
    display: none;
  }
</style>
