<template>
  <!--<div class="v-card__text">-->
  <!--<h4><router-link to="fav">收藏-->
  <!--<v-btn flat icon small color="blue lighten-2">-->
  <!--<v-icon small>send</v-icon>-->
  <!--</v-btn></router-link></h4>-->
  <!--</div>-->
  <v-card>
    <div class="v-card__text"><h4>发布</h4></div>
    <div id="related">
      <div class="related-item" v-for="(post, index) in posts" :key="index">
        <div class="s-thumb">
          <router-link :to="{name: 'article', params:{aid: post.aid}}" :title="post.title">
            <img :src="post.thumb" :alt="post.title">
          </router-link>
        </div>
        <div class="meta-container">
          <router-link :to="{name: 'article', params:{aid: post.aid}}" :title="post.title" class="meta-title">{{post.title}}</router-link>
          <span class="meta-item"><v-icon small color="grey">remove_red_eye</v-icon>&nbsp;233</span>
          <span class="meta-item"><v-icon small color="grey">thumb_up</v-icon>&nbsp;233</span>
          <span class="meta-item">
            <v-btn icon small class="red--text lighten-3"><v-icon small>favorite</v-icon></v-btn>233
          </span>
          <span class="meta-item"><v-icon small color="grey">access_time</v-icon>&nbsp;发布于&nbsp;{{post.t}}</span>
        </div>
      </div>
    </div>
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="maxPage"
        :total-visible="7"
        circle
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'post',
  data () {
    return {
      posts: [
        {
          title: 'title1 title1 title1title1 title1 title1 title1title1 title1 title1 title1title1',
          aid: 1,
          uname: 'Beats0Beats0Beats0Beats0Beats0',
          uid: 1,
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019607/9362470BA0D8CC701D2DD2C3A9331EB14AD13B64/',
          v: 233,
          t: '2018-03-22'
        },
        {
          title: 'title2',
          aid: 2,
          uname: 'Beats0',
          uid: 1,
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019392/1AC565DD04AFE9CDBC650907AB45719D41EEB788/',
          v: 233,
          t: 2018
        },
        {
          title: 'some title',
          aid: 3,
          uname: 'Beats0',
          uid: 1,
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019206/A07E7B66D21F401D66C8FAF7E33A509582A1736B/',
          v: 233,
          t: 2018
        },
        {
          title: 'some title',
          aid: 3,
          uname: 'Beats0',
          uid: 1,
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525018984/4A9B8293970480323541BE309DD4300D9339C675/',
          v: 233,
          t: 2018
        },
        {
          title: 'some title',
          aid: 3,
          uname: 'Beats0',
          uid: 1,
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525014680/9BFA1439EFA7DF58FDE0A90BB805A10D15D5FBAA/',
          v: 233,
          t: 2018
        }
      ],
      page: 2,
      maxPage: 15
    }
  }
  // computed: {
  //   ...mapGetters({
  //     isDark: 'theme/isDark'
  //   })
  // }
}
</script>
