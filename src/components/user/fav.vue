<template>
  <v-card>
    <div class="v-card__text"><h4>收藏</h4></div>
    <div id="related">
      <div class="related-item" v-for="(post, index) in posts" :key="index">
        <div class="s-thumb">
          <a :href="`/post/${ post.pid }`" :title="post.title" target="_blank" class="thumb">
            <img :src="`${post.thumb}?w=230`" :alt="post.title">
          </a>
        </div>
        <div class="meta-container">
          <a :href="`/post/${ post.pid }`" :title="post.title" target="_blank" class="meta-title">{{ post.title }}</a>
          <span class="meta-item"><v-icon small color="grey">remove_red_eye</v-icon>&nbsp;&nbsp;{{ post.pv | formatNumber }}</span>
          <span class="meta-item"><v-icon small color="grey">thumb_up</v-icon>&nbsp;&nbsp;{{ post.lv | formatNumber }}</span>
          <span class="meta-item">
            <v-btn icon small class="red--text lighten-3" @click="favAct($event, post.pid)"><v-icon small>favorite</v-icon></v-btn>{{ post.fv | formatNumber }}
          </span>
          <span class="meta-item"><v-icon small color="grey">access_time</v-icon>&nbsp;收藏于&nbsp;{{ post.date | timeFilter('days') }}</span>
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
import api from '../../../api'

export default {
  name: 'fav',
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
      api.user.fav(data).then(({ data }) => {
        this.posts = data.posts
        this.$vuetify.goTo(0)
      })
    },
    favAct (ev, pid) {
      let el = ev.target.parentElement.parentElement
      if (el.type !== 'button') return
      if (el.classList.contains('red--text')) {
        el.classList.remove('red--text')
      } else {
        el.classList.add('red--text')
      }
    }
  },
  watch: {
    '$router': 'fetchData'
  }
}
</script>
