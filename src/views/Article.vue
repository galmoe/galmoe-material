<template>
  <v-container grid-list-xl>
    <v-layout row wrap v-scroll="onScroll">
      <!--left-->
      <v-flex md8>
        <v-card>
          <div class="v-parallax">
            <div class="parallax-img-container">
              <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfzijcndvj315o0ogtgr.jpg"
                   class="parallax-img"
                   :style="{top: `${offsetTop}px`}">
            </div>
            <v-card-text>
              <h2>Rick and Morty</h2>
              <h4>24. The Wedding Squanchers</h4>
              <div class="meta-box">
                <time datetime="2018-10-08T06:51:34.734Z" title="Mon Oct 08 2018 14:51:34 GMT+0800 (中国标准时间)" class="time">2018年10月08日</time>
                <span class="count">阅读 369</span>
              </div>
              <hr :class="['v-divider', `theme--${theme}`]">
            </v-card-text>
            <div class="v-list__tile v-list__tile--avatar">
              <div class="v-list__tile__avatar">
                <router-link :to="{ name: 'user', params: {uid: 1} }" class="v-avatar" style="height: 40px; width: 40px;">
                  <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4"/>
                </router-link>
              </div>
              <div class="v-list__tile__content">
                <div class="v-list__tile__title">
                  <router-link :to="{ name: 'user', params: {uid: 1} }">Beats0</router-link>
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
            <v-breadcrumbs-item :to="'/category/anime'">Anime</v-breadcrumbs-item>
            <v-breadcrumbs-item disabled>Rick and Morty</v-breadcrumbs-item>
          </v-breadcrumbs>
          <!--v-html-->
          <v-card-text id="article-content" v-viewer class="images">
            <p>And that's how the family end up on the tiny planet in a small makeshift cabin. Everyone minus Rick was in the cabin watching a television Myra hand put together.</p>
            <p>"Well, it's official. The obscure planet known as earth, formerly the hiding place of interstellar terrorist and fugitive Rick Sanchez, has just become the 6,048th planet to join the galactic federation."</p>
            <p>"The plucky little ball of water and dirt, which is where it gets its name, is dominated by seven billion primate-descended natives who love to eat spaghetti and pray to kangaroos. Spaghetti, kangaroos? I've got to check this place out."</p>
            <p>"Well, you can. Contact the ministry of tourism for details. Up next, teenagers are calling it gahahcashhha! And it's not what you think."</p>
            <p>The TV shut off Summer having been the one who did it.</p>
            <p>"What are you-what did you do that for?" Morty asked</p>
            <p>"Dramatic effect." Summer answered</p>
            <p>The door to the cabin opened and in came Rick wearing a winter coat and holding a flag with a large R on it. "Good morning, family. Oh, do I smell bacon?"</p>
            <p>"Yes, we discovered a species of tiny pig off the coast of new Australia about 30 yards east." Beth said</p>
            <p>"Or 300 yards west." Morty said</p>
            <p>"We'd offer you some, but we hunted it to extinction for breakfast." Summer said</p>
            <p>"Well, I thought I'd walk to the South pole and do a little bit of exploring. If you guys need me, just yell or throw something so hard that it goes around the world and hits me." Rick said before leaving.</p>
            <p>"Okay, now that he's gone, can we please talk about our situation?" Jerry said</p>
            <p>"Dad, you can't talk about people behind their back. You know, it's a small world." Morty said</p>
            <p>"Please, he's in the South pole! And we need to have a serious conversation. I'm just saying, we keep acting like there's only two options, but there's not. So, yes, if we went back to earth, as long as Rick was out there, they'd want to interrogate us. But, and this is purely hypothetical, what if we turned your father in to the government?" Jerry said</p>
            <p>Beth stood up glaring at her husband. "Jerry, so help me God, if you ever bring this up again, no more bacon."</p>
            <p>"There already is no more bacon! This world sucks! Our life sucks! Why are we doing this for someone that would never do anything for anyone but himself?" Jerry said</p>
            <p>"That's not the point, dad! We love Rick. F-for the most part." Morty said</p>
            <p>"Yeah, you don't love people in hopes of a reward, dad, you love them unconditionally." Summer said</p>
            <p>"Yeah, Rick may be an asshole among assholes, but he's our asshole!" Myra said</p>
            <p>"That's very good, kids. I'm proud of you." Beth smiled</p>
            <p>"Okay, so let me get this straight. For the rest of your lives, no matter how much it hurts you, no matter how much it destroys our children's futures, we're gonna do whatever Rick wants, whenever he wants?" Jerry said</p>
            <p>"Yes." Everyone answered</p>
            <p>"Why?!" Jerry shouted</p>
            <p>"Because I don't want him to leave again, you dumb asshole!" Beth screamed her eyes tearing up.</p>
            <p>"Great job dad, you made mom cry." Myra stood up walking over to the door. "If anyone needs me I'm going to take use the bathroom."</p>
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlqxx6xj31hc0rl7uy.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlqjii5j31h90rq4oi.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlqy3jxj31hc0ro7w7.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlswugwj31hc0rlki6.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlquephj31hc0rke6q.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlql7gfj31hc0rphc4.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlsdql7j31hc0rn7wh.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlsy8k7j31hc0rkb29.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlsuj1ej31hc0rrhdt.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwls82nej31hc0rfe81.jpg" alt="">
            <img src="https://ws1.sinaimg.cn/large/006nOlwNly1fwfwlscisjj31hc0rke81.jpg" alt="">
            <!--<iframe src="//player.bilibili.com/player.html?aid=33030227&cid=57812220&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>-->
          </v-card-text>
          <!--download-->
          <div class="v-card__text"><h4>下载</h4></div>
          <hr :class="['v-divider', `theme--${theme}`]">
          <v-layout row wrap>
            <v-flex xs6>
              <div class="download-container">
                <v-text-field
                  v-model="captchaIpt"
                  outline
                  label="验证码"
                  append-icon="send"
                  @click:append="captcha_cb"
                ></v-text-field>
                <v-btn outline small color="green" @click="openLink" v-if="showLink"><i aria-hidden="true" class="v-icon material-icons">cloud_download</i>下载</v-btn>
              </div>
            </v-flex>
            <v-flex xs6>
              <img :src="captchaURL"
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
            <tag />
        </v-card>
      </v-flex>
      <!--right-->
      <v-flex md4>
        <v-card>
          <div class="v-card__text"><h4>推荐</h4></div>
          <div id="related">
            <div class="related-item" v-for="(s, i) in similar" :key="i">
              <div class="s-thumb">
                <router-link :to="{ name: 'article', params: {aid: i} }">
                  <img :src="s.thumb" alt="">
                </router-link>
              </div>
              <div class="meta-container">
                <router-link :to="{ name: 'article', params: {aid: i} }" class="meta-title">{{ i }}</router-link>
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
import 'viewerjs/dist/viewer.css'
import tag from '@/components/tag'
import comment from '@/components/comment'
import Rules from '../public/rules'
import { mapState } from 'vuex'

export default {
  name: 'varticle',
  data () {
    return {
      Rules,
      pid: this.$route.params.pid,
      like: 233,
      isLike: false,
      fav: 233,
      isFav: false,
      captcha: '111111',
      captchaURL: 'https://cas.baidu.com/?action=image',
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
      // this.$refs.captcha.src = `${backEnd}/api/captcha?` + Date.now()
      this.captchaURL = `https://cas.baidu.com/?action=image&random=${Date.now()}`
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
  }
}
</script>
