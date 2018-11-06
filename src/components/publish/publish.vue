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
      v-model="sub_title"
      prepend-icon="sub_titles"
      label="摘要(选填)"
      :rules="[Rules.max(40)]"
    ></v-text-field>
    <div class="thumb-uploader">
      <upload :containerMaxW="1050" :containerMaxH="585" :autoCropWidth="1000" :fixedNumber="[1000, 580]" :visible="showUpload" @close="showUpload=false" :type="'thumb'" @uploadCb="getSrc" />
      <div class="upload-container" v-show="showThumbLabel" @click="showUpload = true">
        <v-icon>add_photo_alternate</v-icon>
        <p>支持2MB内的JPG／JPEG／BMP／PNG格式的高清图片</p>
        <p>建议大于960*540像素</p>
      </div>
      <img :src="thumb" v-if="thumb" class="upload-img">
      <v-btn outline @click="showUpload = true">
        <i aria-hidden="true" class="v-icon material-icons">cloud_upload</i>上传封面
      </v-btn>
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
            v-model="download.compress"
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
          <div class="v-card__text">
            <h4><v-icon small>send</v-icon>&nbsp;&nbsp;发布</h4>
            <h5 v-if="link"><a :href="link" target="_blank">已发布&nbsp;&nbsp;{{ title }} 至 {{ category }}, 点击查看</a></h5>
          </div>
          <v-select
            prepend-icon="done_outline"
            v-model="category"
            :items="categories"
            :rules="[Rules.required]"
            label="分类"
            required
          ></v-select>
          <v-btn block color="success" @click="submit">确定</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import upload from '@/components/upload'
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
      this.fetchData()
    }
  },
  data () {
    return {
      showUpload: false,
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
      sub_title: '',
      thumb: '',
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
        compress: '',
        meta: ''
      },
      link: ''
    }
  },
  computed: {
    isEdit: function () {
      return this.$route.meta.type === 'edit'
    }
  },
  methods: {
    fetchData () {
      const data = {
        pid: this.$route.params.pid
      }
      api.publish.edit(data).then(({ data }) => {
        this.title = data.title
        this.sub_title = data.sub_title
        this.thumb = data.thumb
        this.mkdown = data.mkdown
        this.content = data.content
        this.download.link = data.link
        this.download.category = data.category
        this.download.compress = data.compress
        this.download.download = data.download
        this.download.meta = data.meta
      })
    },
    getSrc (src) {
      this.showThumbLabel = false
      this.thumb = src
    },
    getContent (val, render) {
      this.content = render
    },
    changeCaptcha () {
      this.$refs.captcha.src = `${backEnd}/api/captcha?${Date.now()}`
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
        sub_title: this.sub_title,
        thumb: this.thumb,
        mkdown: this.mkdown,
        content: this.content,
        category: this.category,
        compress: this.compress,
        download: this.download
      }
      if (this.isEdit) {
        data.pid = this.$route.params.pid
        api.publish.update(data)
      } else {
        api.publish.publish(data).then(({ link }) => {
          this.link = link
        })
      }
    }
  },
  components: {
    mavonEditor,
    upload
  },
  watch: {
    '$router': 'fetchData'
  }
}

</script>
