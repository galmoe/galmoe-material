<template>
  <v-card>
    <div class="v-card__text"><h4>管理</h4></div>
    <div id="related">
      <div class="related-item" v-for="(post, index) in posts" :key="index">
        <div class="s-thumb">
          <router-link :to="{name: 'post', params:{pid: post.pid}}" :title="post.title">
            <img :src="post.thumb" :alt="post.title">
          </router-link>
        </div>
        <div class="meta-container">
          <router-link :to="{name: 'post', params:{pid: post.pid}}" :title="post.title" class="meta-title">{{ post.title }}</router-link>
          <span class="meta-item"><v-icon small color="grey">remove_red_eye</v-icon>&nbsp;&nbsp;{{ post.pv | formatNumber }}</span>
          <span class="meta-item"><v-icon small color="grey">thumb_up</v-icon>&nbsp;&nbsp;{{ post.lv | formatNumber }}</span>
          <span class="meta-item"><v-icon small color="grey">favorite</v-icon>&nbsp;&nbsp;{{ post.fv | formatNumber }}</span>
          <span class="meta-item"><v-icon small color="grey">access_time</v-icon>&nbsp;发布于&nbsp;{{ post.date | timeFilter('days') }}</span>
          <span class="meta-item">
            <v-btn icon small @click="edit(post.pid)"><v-icon small>edit</v-icon></v-btn>编辑
          </span>
          <span class="meta-item">
            <v-btn icon small @click="remove(post.pid)"><v-icon small>delete</v-icon></v-btn>删除
          </span>
        </div>
      </div>
    </div>
    <div class="text-xs-center">
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
  name: 'publish',
  created () {
    this.fetchData()
  },
  data () {
    return {
      posts: [],
      total: 1,
      page: 1
    }
  },
  methods: {
    fetchData () {
      const data = {
        page: this.page || 1
      }
      api.publish.list(data).then(({ data }) => {
        this.posts = data.posts
        this.page = data.page
        this.total = Math.ceil(data.total / 25)
        this.$vuetify.goTo(0)
      })
    },
    edit (pid) {
      this.$router.push({ path: `/publish/edit/${pid}` })
    },
    remove (pid) {
      const data = {
        pid
      }
      api.publish.remove(data)
    }
  },
  watch: {
    '$router': 'fetchData'
  }
}
</script>
