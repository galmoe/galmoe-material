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
          <a :href="`/post/${ post.pid }`" target="_blank" class="thumb">
            <img :src="post.thumb" :alt="post.title" :title="post.title">
          </a>
        </div>
        <div class="detail">
          <div class="detail-spacing">
            <a :href="`/post/${ post.pid }`" :title="post.title" target="_blank" class="d-title">
              {{ post.title }}
            </a>
            <span class="d-info"><span class="d-info-pv">{{ post.pv | formatNumber }} pv</span>{{ post.date | timeFilter('days') }}</span>
          </div>
        </div>
      </div>
      <div v-if="posts.length === 0" class="no-data">
        <img src="https://raw.githubusercontent.com/galmoe/galmoe-ts/master/public/images/nodata.png" alt="">
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
      <div class="item" v-for="(post, index) in favs" :key="index">
        <div class="thumb">
          <a :href="`/post/${ post.pid }`" target="_blank" class="thumb">
            <img :src="post.thumb" :alt="post.title" :title="post.title">
          </a>
        </div>
        <div class="detail">
          <div class="detail-spacing">
            <a :href="`/post/${ post.pid }`" :title="post.title" target="_blank" class="d-title">
              {{ post.title }}
            </a>
            <span class="d-info"><span class="d-info-pv">{{ post.pv | formatNumber }} pv</span>{{ post.date | timeFilter('days') }}</span>
          </div>
        </div>
      </div>
      <div v-if="favs.length === 0" class="no-data">
        <img src="https://raw.githubusercontent.com/galmoe/galmoe-ts/master/public/images/nodata.png" alt="">
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
import api from '../../../api'
import { mapState } from 'vuex'

export default {
  name: 'home',
  created () {
    this.fetchData()
  },
  data () {
    return {
      Rules,
      comment: '',
      posts: [],
      favs: [],
      data: [
        { uid: 1, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' },
        { uid: 2, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' },
        { uid: 3, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' }
      ],
      page: 1
    }
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme
    })
  },
  methods: {
    async fetchData () {
      await Promise.all([this.getPost(), this.getFav()])
    },
    async getPost () {
      const data = {
        uid: this.$route.params.uid
      }
      api.user.post(data).then(({ data }) => {
        this.posts = data.posts
      })
    },
    async getFav () {
      const data = {
        uid: this.$route.params.uid
      }
      api.user.fav(data).then(({ data }) => {
        this.favs = data.posts
      })
    },
    getComment () {
    //
    },
    pageChange () {
      this.$router.push({
        name: 'home',
        query: {
          page: this.page
        }
      })
      this.$vuetify.goTo(0)
    },
    submitComment () {
      if ((this.comment || '').length <= 3) return
      if ((this.comment || '').length > 1000) return
      if ((/^\s*$/).test(this.comment)) return
      console.log('submitComment', this.comment)
    }
  },
  watch: {
    '$router': 'fetchData'
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
