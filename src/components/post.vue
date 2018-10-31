<template>
  <div class="full">
    <v-layout justify-start row wrap="wrap" grid-list-md="grid-list-md">
      <v-flex xs12 md4 class="p-item" v-for="post in posts" :key="post.pid">
          <v-card class="my-4" hover>
            <v-card-title>
              <router-link :to="{name:'user',params:{uid: post.uid}}">
                <img class="avatar" :src="post.avatar" alt="">
              </router-link>
              <div class="post-header">
                  <div class="post-author-name">
                    <router-link :to="{name:'user',params:{uid: post.uid}}" class="user-link">
                      {{ post.uname }}
                    </router-link>
                  </div>
                  <div class="post-category">
                    <div class="ca-category">
                      <svg viewBox="0 0 48 48" height="100%" width="100%"><path d="M20 14l10 10-10 10z"></path></svg>
                    </div>
                    <router-link :to="{name:'category',params:{ category: post.category }}" class="category-link">
                      {{ post.category }}
                    </router-link>
                  </div>
              </div>
            </v-card-title>
            <router-link :to="{name:'post',params:{ pid: post.pid }}" class="v-list__tile title-link">
              {{ post.title }}
            </router-link>
            <router-link :to="{name:'post',params:{ pid: post.pid}} ">
              <v-img
                class="white--text"
                :src="post.thumb"
                v-if="post.thumb"
              >
            </v-img>
            </router-link>
            <v-card-text>
              {{ post.intro }}
            </v-card-text>
            <v-card-actions>
              <v-btn icon small class="light-blue--text">
                <v-icon small >thumb_up</v-icon>
              </v-btn>{{ (post.lv ? post.lv : '') }}
              <v-btn icon small class="red--text lighten-3">
                <v-icon small>favorite</v-icon>
              </v-btn>{{ (post.fv ? post.fv : '') }}
              <v-btn icon small>
                <v-icon small>chat</v-icon>
              </v-btn>{{ (post.cv ? post.cv : '') }}
              <v-spacer></v-spacer>
              <v-btn flat small class="primary--text">more</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
    </v-layout>
    <!--page-->
    <div class="text-xs-center" v-if="total !== 1">
      <v-pagination
        v-model="page"
        :length="total"
        :total-visible="9"
        circle
        @input="pageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import api from '../../api'

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
    pageChange () {
      this.$router.push({
        name: 'home',
        query: {
          type: this.$route.meta.type,
          page: this.page
        }
      })
      this.$vuetify.goTo(0)
    },
    fetchData () {
      if (this.$route.meta.type) {
        this.$route.query.type = this.$route.meta.type
      }
      api.fetchData(this.$route.query).then(res => {
        console.log('res ===>', res)
        this.posts = res.data.posts
        this.page = res.data.page
        this.total = Math.ceil(res.data.total / 25)
        // this.$router.push({
        //   path: '',
        //   query: {
        //     q: this.q,
        //     page: this.currentPage
        //   }})
      })
    }
    // fetchData (page) {
    //   api.post.list(this.$route.query)
    //   api.getBillList(page)
    //     .then(response => {
    //       this.bills = response.data.content
    //       console.log(this.bills)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }
  },
  // computed: {
  //   currentPage: {
  //     get: function () {
  //
  //     },
  //     set: function () {
  //
  //     }
  //   },
  // },
  watch: {
    '$route': 'fetchData'
  }
}
</script>
