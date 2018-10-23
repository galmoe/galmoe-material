<template>
  <v-container grid-list-xl>
    <v-layout row wrap v-scroll="onScroll">
      <v-flex md12>
        <v-card class="h">
          <div class="v-parallax u">
            <div class="parallax-img-container">
              <img
                src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfzijcndvj315o0ogtgr.jpg"
                class="parallax-img"
                :style="{top: `${offsetTop}px`}">
            </div>
            <div class="banner-editor">
              <v-dialog v-model="dialog" width="1155">
                <v-btn icon  slot="activator" class="grey darken-2 white--text">
                  <v-icon>camera_alt</v-icon>
                </v-btn>
                <v-card style="height: 600px">
                  <upload :containerMaxW="1155" :containerMaxH="550" />
                </v-card>
              </v-dialog>
            </div>
            <div class="u-info">
              <a href="#" class="u-link">
                <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4" alt="Beats0" class="u-avatar">
              </a>
              <div class="u-basic">
                <div class="u-name">Beats0</div>
                <div class="u-sign-spacing">
                  <h4 title="Twitter、Github、Steam @Beats0 写代码，吃吃吃" class="u-sign">
                    Twitter、Github、Steam @Beats0
                    写代码，吃吃吃
                  </h4>
                </div>
              </div>
              <div class="u-action">
                <v-btn outline small><i aria-hidden="true" class="v-icon material-icons">add</i>&nbsp;关注</v-btn>
                <v-btn outline small><i aria-hidden="true" class="v-icon material-icons">remove</i>&nbsp;取消关注</v-btn>
                <v-btn outline small><i aria-hidden="true" class="v-icon material-icons">chat_bubble_outline</i>&nbsp;发消息</v-btn>
                <v-list-tile-action class="v-btn v-btn--outline v-btn--depressed v-btn--small">
                  <v-menu bottom left>
                    <v-btn small slot="activator" icon class="un">
                      <v-icon small class="un">more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile @click="">
                        <v-list-tile-title>删除</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="">
                        <v-list-tile-title>举报</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile-action>
              </div>
            </div>
          </div>
          <nav :class="['t', {'t-fixed': isFix}]" data-booted="true">
            <div class="v-toolbar__content" style="height: 43px;">
              <div class="v-toolbar__title">
                <router-link to="home" :class="[`theme--${theme}`,'t-link']">首页</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="post" :class="[`theme--${theme}`,'t-link']">发布</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="fav" :class="[`theme--${theme}`,'t-link']">收藏</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="about" :class="[`theme--${theme}`,'t-link']">简介</router-link>
              </div>
                <div class="v-toolbar__title">
                  <router-link to="following" :class="[`theme--${theme}`,'t-link']">
                    <span>关注&nbsp;</span>
                    <span class="num">233</span>
                  </router-link>
                </div>
                <div class="v-toolbar__title">
                  <router-link to="follower" :class="[`theme--${theme}`,'t-link']">
                    <span>关注者&nbsp;</span>
                    <span class="num">233</span>
                  </router-link>
                </div>
              </div>
          </nav>
        </v-card>
      </v-flex>
      <v-flex md12 class="u-wrap">
        <v-card class="h">
          <router-view></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import upload from '@/components/upload'
import { mapState } from 'vuex'

export default {
  name: 'user',
  data () {
    return {
      dialog: false,
      uid: this.$route.params.uid,
      isFix: false,
      bars: [
        { 'class': '' }
      ],
      offsetTop: 0
    }
  },
  mounted () {
    console.log(this.uid)
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme
    })
  },
  methods: {
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      if (this.offsetTop >= 500) {
        this.isFix = true
      } else {
        this.isFix = false
      }
    }
  },
  components: {
    upload
  }
}
</script>
