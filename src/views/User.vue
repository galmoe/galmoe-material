<template>
  <v-container grid-list-xl>
    <v-layout row wrap v-scroll="onScroll">
      <v-flex md12>
        <v-card class="h">
          <div class="v-parallax u">
            <div class="parallax-img-container">
              <img
                :src="background"
                class="parallax-img"
                :style="{top: `${offsetTop}px`}">
            </div>
            <div class="banner-editor">
              <v-btn icon class="grey darken-2 white--text" @click="showUpload=true">
                <v-icon>camera_alt</v-icon>
              </v-btn>
              <upload :containerMaxW="1155" :containerMaxH="550" :visible="showUpload" :autoCropWidth="1150" :fixedNumber="[1150, 500]" :type="'background'" @close="showUpload=false" />
            </div>
            <div class="u-info">
              <a href="#" class="u-link">
                <img :src="avatar" :alt="uname" class="u-avatar">
              </a>
              <div class="u-basic">
                <div class="u-name">{{ uname }}</div>
                <div class="u-sign-spacing">
                  <h4 :title="sign" class="u-sign">{{ sign }}</h4>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'user',
  data () {
    return {
      showUpload: false,
      uid: this.$route.params.uid,
      isFix: false,
      offsetTop: 0
    }
  },
  created () {
    this.getUserInfo(this.uid)
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme,
      uname: state => state.user.uname,
      avatar: state => state.user.avatar,
      sign: state => state.user.sign,
      background: state => state.user.background
    })
  },
  methods: {
    ...mapActions({
      getUserInfo: 'user/getUserInfo'
    }),
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
