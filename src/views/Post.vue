<template>
  <v-container grid-list-xl>
    <v-layout row wrap v-scroll="onScroll">
      <!--left-->
      <v-flex md8>
        <v-card>
          <div class="v-parallax">
            <div class="parallax-img-container">
              <img :src="post.thumb"
                   class="parallax-img"
                   :style="{top: `${offsetTop}px`}">
            </div>
            <v-card-text>
              <h2>{{ post.title }}</h2>
              <h4>{{ post.sub_title }}</h4>
              <div class="meta-box">
                <time datetime="2018-10-08T06:51:34.734Z" title="Mon Oct 08 2018 14:51:34 GMT+0800 (中国标准时间)" class="time">2018年10月08日</time>
                <span class="count">阅读 {{ post.pv }}</span>
              </div>
              <hr :class="['v-divider', `theme--${theme}`]">
            </v-card-text>
            <div class="v-list__tile v-list__tile--avatar">
              <div class="v-list__tile__avatar">
                <router-link :to="{ name: 'user', params: { uid: post.uid } }" class="v-avatar" style="height: 40px; width: 40px;">
                  <img :src="post.avatar"/>
                </router-link>
              </div>
              <div class="v-list__tile__content">
                <div class="v-list__tile__title">
                  <router-link :to="{ name: 'user', params: {uid: post.uid} }">Beats0</router-link>
                </div>
              </div>
              <div class="v-list__tile__action">
                <v-btn outline small color="primary"><i aria-hidden="true" class="v-icon material-icons primary--text">add</i>关注</v-btn>
                <v-btn outline small color="red"><i aria-hidden="true" class="v-icon material-icons red--text">remove</i>取消关注</v-btn>
              </div>
            </div>
          </div>
          <v-breadcrumbs>
            <v-icon slot="divider">chevron_right</v-icon>
            <v-breadcrumbs-item :to="'/'">首页</v-breadcrumbs-item>
            <v-breadcrumbs-item :to="`/category/${post.category}`">{{ post.category }}</v-breadcrumbs-item>
            <v-breadcrumbs-item disabled>{{ post.title }}</v-breadcrumbs-item>
          </v-breadcrumbs>
          <!--v-html-->
          <v-card-text id="post-content" v-viewer class="images" v-html="post.content"></v-card-text>
          <!--download-->
          <div class="v-card__text" v-if="post.link"><h4>下载</h4></div>
          <hr :class="['v-divider', `theme--${theme}`]" v-if="post.link">
          <v-layout row wrap v-if="post.link">
            <v-flex xs6>
              <div class="download-container">
                <v-text-field
                  v-model="captchaIpt"
                  outline
                  label="验证码"
                  append-icon="send"
                  @click:append="captcha_cb"
                ></v-text-field>
                <v-btn outline color="green" @click="openLink">
                  <i aria-hidden="true" class="v-icon material-icons">cloud_download</i>下载
                </v-btn>
                  <v-tooltip top>
                    <v-btn outline color="success" slot="activator">提取码</v-btn>
                    <span>复制</span>
                  </v-tooltip>
                <v-tooltip top>
                  <v-btn outline color="success" slot="activator">解压码</v-btn>
                  <span>复制</span>
                </v-tooltip>
              </div>
            </v-flex>
            <v-flex xs6>
              <img :src="captchaURL"
                   ref="captcha"
                   @click="changeCaptcha"
                   alt="点击刷新"
                   title="点击刷新"
                   class="captcha">
            </v-flex>
          </v-layout>
          <!--info-->
          <div class="v-card__text"><h4>备注</h4></div>
          <hr :class="['v-divider', `theme--${theme}`]">
          <v-card-text>
            <p>第二季</p>
            <p>pan.baidu.com/s/1GQRQuBfBJYFHsQx0XmOKoQ</p>
            <p>第三季</p>
            <p>pan.baidu.com/s/1bZ797CUSpfxc5j-vSTMYqw</p>
          </v-card-text>
          <!--action-->
          <v-card-actions>
            <v-btn icon :outline="!isLike" @click="like_cb">
              <v-icon :class="[{'light-blue--text': isLike}]">thumb_up</v-icon>
            </v-btn>&nbsp;{{ like }}&nbsp;
            <v-btn icon :outline="!isFav" @click="fav_cb">
              <v-icon :class="[{'red--text lighten-3': isFav}]">favorite</v-icon>
            </v-btn>&nbsp;{{ fav }}&nbsp;
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <v-btn flat slot="activator">
                more
              </v-btn>
              <v-list>
                <v-list-tile @click="">
                  <v-list-tile-title>举报</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-card-actions>
          <!--tag-->
            <div class="v-card__text"><h4>Tag</h4></div>
          <hr :class="['v-divider', `theme--${theme}`]">
            <tag :tags="post.tag"/>
        </v-card>
      </v-flex>
      <!--right-->
      <v-flex md4>
        <v-card>
          <div class="v-card__text"><h4>推荐</h4></div>
          <div id="related">
            <div class="related-item" v-for="(s, i) in similar" :key="i">
              <div class="s-thumb">
                <router-link :to="{ name: 'post', params: {pid: i} }">
                  <img :src="s.thumb" alt="">
                </router-link>
              </div>
              <div class="meta-container">
                <router-link :to="{ name: 'post', params: {pid: i} }" class="meta-title">{{ i }}</router-link>
                <span class="meta-author"><v-icon small color="grey">person</v-icon><router-link :to="{ name: 'user', params: {uid: 1} }">Beats0</router-link></span>
                <span class="meta-item"><v-icon small color="grey">remove_red_eye</v-icon>&nbsp;233</span>
                <span class="meta-item"><v-icon small color="grey">thumb_up</v-icon>&nbsp;233</span>
              </div>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex md8>
        <v-card>
          <div class="v-card__text"><h4>评论</h4></div>
          <hr :class="['v-divider', `theme--${theme}`]">
          <comment />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import tag from '@/components/tag'
import comment from '@/components/comment'
import Rules from '../public/rules'
import { mapState } from 'vuex'
import api from '../../api'
import { backEnd } from '../../config'
import 'viewerjs/dist/viewer.css'

export default {
  name: 'varticle',
  created () {
    this.fetchData()
  },
  data () {
    return {
      post: {},
      Rules,
      pid: this.$route.params.pid,
      like: 233,
      isLike: false,
      fav: 233,
      isFav: false,
      captcha: '',
      captchaURL: `${backEnd}/api/captcha`,
      offsetTop: 0,
      captchaIpt: '',
      showLink: false,
      link: 'https://pan.baidu.com/s/1bZ797CUSpfxc5j-vSTMYqw',
      similar: [
        { thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019127/DA6093ACF7035120832A27484995AEF0C04B091F/' },
        { thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019316/2E074CB8784B2CB98F2EEDC039120BD0DC82831E/' },
        { thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019520/D692FF7433624D5843CD8DDE397BCF976BAAB886/' },
        { thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019747/5BCEE727BBA4ED1EF39057EB96752942E65CA9A2/' },
        { thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525016818/A9ADB55D815F5AF6453E4FDC347CE4E73A941131/' },
        { thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525013803/FEFB00C65DE42078A44C7C6F112BFD97D16CCE28/' }
      ]
    }
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme
    })
  },
  methods: {
    fetchData () {
      api.post.detail(this.$route.params.pid).then(({ data }) => {
        this.post = data
      })
    },
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
    captcha_cb () {
      if (this.captchaIpt === this.captcha) {
        this.showLink = true
      } else {
        window.alert('captcha error')
      }
    },
    changeCaptcha () {
      this.$refs.captcha.src = `${backEnd}/api/captcha?${Date.now()}`
    },
    openLink () {
      const re = /^http/
      if (re.test(this.link)) {
        window.open(this.link)
      } else {
        window.open(`https://${this.link}`)
      }
    },
    like_cb () {
      if (this.isLike) {
        this.isLike = false
        this.like--
      } else {
        this.isLike = true
        this.like++
      }
    },
    fav_cb () {
      if (this.isFav) {
        this.isFav = false
        this.fav--
      } else {
        this.isFav = true
        this.fav++
      }
    }
  },
  components: {
    tag,
    comment
    // floatingBtn
  },
  watch: {
    '$router': 'fetchData'
  }
}
</script>
