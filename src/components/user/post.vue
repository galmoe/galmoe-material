<template>
  <v-card>
    <div class="v-card__text"><h4>发布</h4></div>
    <div id="related">
      <div class="related-item" v-for="(post, index) in posts" :key="index">
        <div class="s-thumb">
          <a :href="`/post/${ post.pid }`" :title="post.title" target="_blank">
            <img :src="post.thumb" :alt="post.title">
          </a>
        </div>
        <div class="meta-container">
          <a :href="`/post/${ post.pid }`" :title="post.title" target="_blank" class="meta-title">{{ post.title }}</a>
          <span class="meta-item"><v-icon small color="grey">remove_red_eye</v-icon>&nbsp;233</span>
          <span class="meta-item"><v-icon small color="grey">thumb_up</v-icon>&nbsp;233</span>
          <span class="meta-item">
            <v-btn icon small class="red--text lighten-3"><v-icon small>favorite</v-icon></v-btn>233
          </span>
          <span class="meta-item"><v-icon small color="grey">access_time</v-icon>&nbsp;发布于&nbsp;{{ post.date | timeFilter('days') }}</span>
        </div>
      </div>
      <div v-if="posts.length === 0" class="no-data">
        <img src="https://raw.githubusercontent.com/galmoe/galmoe-ts/master/public/images/nodata.png" alt="">
      </div>
    </div>
    <div class="text-xs-center" v-if="total !== 1">
      <v-pagination
        v-model="page"
        :length="total"
        :total-visible="7"
        circle
        @input="fetchData"
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
// import { mapGetters } from 'vuex'
import api from '../../../api'

export default {
  name: 'post',
  created () {
    this.fetchData()
  },
  data () {
    return {
      posts: [],
      page: 1,
      total: 1
    }
  },
  methods: {
    fetchData () {
      const data = {
        uid: this.$route.params.uid,
        page: this.page,
        count: 25
      }
      api.user.post(data).then(({ data }) => {
        this.posts = data.posts
        this.$vuetify.goTo(0)
      })
    }
  },
  watch: {
    '$router': 'fetchData'
  }
}
</script>
