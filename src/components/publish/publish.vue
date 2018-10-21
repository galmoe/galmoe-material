<template>
  <v-card>
    <div class="v-card__text"><h4>{{ (isEdit)? '编辑': '发布'}}</h4></div>
    <v-text-field
      prepend-icon="title"
      label="标题"
    ></v-text-field>
    <mavonEditor :toolbars="toolbars"
                 :subfield="false"
                 v-model="mkdown"
                 @change="getEditorContent">
    </mavonEditor>
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs6>
          <div class="v-card__text"><h4><v-icon small>cloud_download</v-icon>&nbsp;&nbsp;下载</h4></div>
          <v-text-field
            prepend-icon="link"
            label="链接"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            label="提取码"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock_open"
            label="解压码"
          ></v-text-field>
          <v-text-field
            prepend-icon="info"
            label="备注"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <div class="v-card__text"><h4><v-icon small>send</v-icon>&nbsp;&nbsp;发布</h4></div>
          <v-select
            prepend-icon="done_outline"
            v-model="select"
            :items="items"
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
            <v-flex xs3>
              <img :src="captchaURL"
                   @click="getNewCaptcha"
                   alt="点击刷新"
                   title="点击刷新"
                   class="captcha">
            </v-flex>
          </v-layout>
          <v-btn
            @click=""
          >
            submit
          </v-btn>
          <v-btn @click="">clear</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import Rules from '../../public/rules'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

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
      select: null,
      items: [
        '文章',
        '游戏',
        '音乐',
        '其他'
      ],
      Rules,
      captchaURL: 'https://cas.baidu.com/?action=image',
      mkdown: '#### markdown语法支持',
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
      editorContent: '',
      articleContent: '',
      commentStatus: true,
      // download
      download: {
        link: '',
        pwd: '',
        compressPwd: '',
        meta: ''
      },
      articleTitle: ''
    }
  },
  computed: {
    isEdit: function () {
      return this.$route.meta.type === 'edit'
    }
  },
  methods: {
    getEditorContent (val, render) {
      this.articleContent = render
    },
    getNewCaptcha () {
      // this.$refs.captcha.src = `${backEnd}/api/captcha?` + Date.now()
      this.captchaURL = `https://cas.baidu.com/?action=image&random=${Date.now()}`
    }
  },
  components: {
    mavonEditor
  }
}

</script>
