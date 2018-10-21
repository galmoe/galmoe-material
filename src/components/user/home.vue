<template>
  <div>
    <!--publish-->
    <div class="v-card__text">
      <h4><router-link to="post">发布
        <v-btn flat icon small>
          <v-icon small>send</v-icon>
        </v-btn></router-link></h4>
    </div>
    <div class="content-container">
      <div class="item" v-for="(post, index) in posts" :key="index">
        <div class="thumb">
          <router-link :to="{name: 'article', params:{aid: post.aid}}" class="thumb">
            <img :src="post.thumb" :alt="post.title" :title="post.title">
          </router-link>
        </div>
        <div class="detail">
          <div class="detail-spacing">
            <router-link :to="{name: 'article', params:{aid: post.aid}}" :title="post.title" class="d-title">{{post.title}}</router-link>
            <router-link :to="{name: 'user', params:{uid: post.uid}}" class="d-info d-author">{{post.uname}}</router-link>
            <span class="d-info">{{post.t}}</span>
          </div>
        </div>
      </div>
    </div>
    <hr :class="['v-divider', `theme--${theme}`]">
    <!--fav-->
    <div class="v-card__text">
      <h4><router-link to="post">收藏
        <v-btn flat icon small class="red--text lighten-3">
          <v-icon small>favorite</v-icon>
        </v-btn></router-link></h4>
    </div>
    <div class="content-container">
      <div class="item" v-for="(post, index) in posts" :key="index">
        <div class="thumb">
          <router-link :to="{name: 'article', params:{aid: post.aid}}" class="thumb">
            <img :src="post.thumb" :alt="post.title" :title="post.title">
          </router-link>
        </div>
        <div class="detail">
          <div class="detail-spacing">
            <router-link :to="{name: 'article', params:{aid: post.aid}}" :title="post.title" class="d-title">{{post.title}}</router-link>
            <router-link :to="{name: 'user', params:{uid: post.uid}}" class="d-info d-author">{{post.uname}}</router-link>
            <span class="d-info">{{post.t}}</span>
          </div>
        </div>
      </div>
    </div>
    <hr :class="['v-divider', `theme--${theme}`]">
    <!--comment-->
    <div class="v-card__text">
      <h4>留言
        <v-btn flat icon small>
          <v-icon small>chat</v-icon>
        </v-btn>
      </h4>
    </div>
    <hr :class="['v-divider', `theme--${theme}`]">
    <div class="v-list__tile v-list__tile--avatar">
        <div class="v-list__tile__avatar">
          <a href="/u/1" class="v-avatar" style="height: 40px; width: 40px;">
            <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4">
          </a>
        </div>
        <div class="v-list__tile__content">
          <v-textarea
            v-model="comment"
            auto-grow
            :rules="[Rules.required, Rules.blank, Rules.min(3), Rules.max(1000)]"
            counter="1000"
            label="留言"
            rows="1"
            append-icon="send"
            @click:append="submitComment"
          >
          </v-textarea>
        </div>
      </div>
    <div class="i-container">
      <div class="i-item" v-for="c in data" :key="c.uid">
        <div class="i-avatar">
          <a href="#">
            <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4" class="i-face" alt="">
          </a>
        </div>
        <div class="i-main-container">
          <div class="i-title">
            <a class="i-link" href="#">Beats0</a>
            <span class="i-time">2018-02-03</span>
            <v-list-tile-action>
              <v-menu bottom left>
                <v-btn small slot="activator" icon>
                  <v-icon small>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>删除</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>举报</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-action>
          </div>
          <div class="i-content">
            content content content content content content content content content content content content
            <br>
            content content content
            <br>
            content content content
          </div>
        </div>
      </div>
    </div>
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Rules from '../../public/rules'
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      Rules,
      comment: '',
      posts: [
        {
          title: 'title1 title1 title1title1 title1 title1 title1title1 title1 title1 title1title1',
          aid: 1,
          uname: 'Beats0Beats0Beats0Beats0Beats0',
          uid: 1,
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019607/9362470BA0D8CC701D2DD2C3A9331EB14AD13B64/',
          v: 233,
          t: '2018-03-22',
          content: 'some content some content some content some content some content some content some content some content some content some content some content some content '
        },
        {
          title: 'title2',
          aid: 2,
          uname: 'Beats0',
          uid: 1,
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019392/1AC565DD04AFE9CDBC650907AB45719D41EEB788/',
          v: 233,
          t: 2018,
          content: 'some content some content some content some content some content some content some content some content some content some content some content some content '
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
      data: [
        { uid: 1, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' },
        { uid: 2, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' },
        { uid: 3, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' }
      ],
      page: 2
    }
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme
    })
  },
  methods: {
    submitComment () {
      if ((this.comment || '').length <= 3) return
      if ((this.comment || '').length > 1000) return
      if ((/^\s*$/).test(this.comment)) return
      console.log('submitComment', this.comment)
    }
  }
}
</script>
<style scoped>
  .v-list__tile--avatar {
    height: auto;
    margin: 10px auto;
  }
  .v-list__tile {
    align-items: flex-start;
  }
</style>
