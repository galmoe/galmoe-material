<template>
  <div ref="commentEl">
    <v-tabs
      left
      slot="extension"
      v-model="tab"
    >
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <!--TODO: reply-->
          <div class="v-list__tile v-list__tile--avatar">
            <div class="v-list__tile__avatar">
              <a href="/u/1" class="v-avatar">
                <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4">
              </a>
            </div>
            <div class="v-list__tile__content">
                <v-textarea
                  v-model="comment"
                  auto-grow
                  :rules="[Rules.blank, Rules.min(3), Rules.max(1000)]"
                  counter="1000"
                  label="发表评论"
                  rows="1"
                  append-icon="send"
                  @click:append="submitComment"
                >
                </v-textarea>
            </div>
          </div>
          <!--TODO: comment lists-->
          <div class="v-list__tile v-list__tile--avatar" v-for="(c, index) in lists" :key="c.cid">
            <div class="v-list__tile__avatar">
              <a :href="`/u/${c.uid}`" class="v-avatar" target="_blank"><img :src="c.avatar"></a>
            </div>
            <div class="v-list__tile__content">
              <div class="v-list-header">
                <a :href="`/u/${c.uid}`" target="_blank">{{ c.uname }}</a>
                <span class="time">{{ c.date | timeFilter('days') }}</span>
                <v-list-tile-action>
                  <v-menu bottom left>
                    <v-btn small slot="activator" icon>
                      <v-icon small>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile @click="removeComment(c.cid)">
                        <v-list-tile-title>删除</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="report(c.cid)">
                        <v-list-tile-title>举报</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile-action>
              </div>
              <div class="content" v-html="c.content"></div>
              <div class="comment-info">
                <!--TODO: add action color-->
                <!--<v-btn flat icon small color="blue lighten-2">-->
                <v-btn flat icon small><v-icon small>thumb_up</v-icon></v-btn>{{ c.lv }}
                <v-btn flat icon small><v-icon small>thumb_down</v-icon></v-btn>{{ c.dv }}
                <v-btn outline hover small class="no-border" v-if="c.rv" @click="loadMoreReplies(c.cid)">查看 {{ c.rv }} 条回复</v-btn>
                <v-btn outline hover small class="no-border" @click="showCurrentComment(c.cid)">{{ (c.cid === current ? '取消' : '') }}回复</v-btn>
              </div>
              <!--reply box-->
              <div class="reply" v-if="current === c.cid">
                <div class="v-list__tile v-list__tile--avatar">
                  <div class="v-list__tile__avatar">
                    <a href="/u/1" class="v-avatar">
                      <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4">
                    </a>
                  </div>
                  <div class="v-list__tile__content">
                    <v-textarea
                      v-model="comment"
                      auto-grow
                      autofocus
                      :rules="[Rules.blank, Rules.min(3), Rules.max(1000)]"
                      counter="1000"
                      label="发表评论"
                      rows="1"
                      append-icon="send"
                      @click:append="submitComment"
                    >
                    </v-textarea>
                  </div>
                </div>
              </div>
              <!--replies-->
              <div class="replies">
                <div class="v-list__tile v-list__tile--avatar">
                  <div class="v-list__tile__avatar">
                    <a href="/u/1" class="v-avatar"><img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4"></a>
                  </div>
                  <div class="v-list__tile__content">
                    <div class="v-list-header">
                      <a href="/u/1">Beats0</a>
                      <span class="time">2018-10-06 12:15</span>
                      <v-list-tile-action>
                        <v-menu bottom left>
                          <v-btn small slot="activator" icon>
                            <v-icon small>more_vert</v-icon>
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
                      <div class="content">
                        meta-box some comment
                        meta-box some comment
                        meta-box some comment
                        meta-box some comment
                      </div>
                      <div class="comment-info">
                      <v-btn flat icon small>
                        <v-icon small>thumb_up</v-icon>
                      </v-btn>233
                      <v-btn flat icon small>
                        <v-icon small>thumb_down</v-icon>
                      </v-btn>1
                      <v-btn outline hover small class="no-border">回复</v-btn>
                    </div>
                  </div>
                </div>
              </div>
              <!--secend reply-->
              <div class="reply">
                <div class="v-list__tile v-list__tile--avatar">
                  <div class="v-list__tile__avatar">
                    <a href="/u/1" class="v-avatar">
                      <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4">
                    </a>
                  </div>
                  <div class="v-list__tile__content">
                    <v-textarea
                      v-model="comment"
                      auto-grow
                      :rules="[Rules.required, Rules.blank, Rules.min(3), Rules.max(1000)]"
                      counter="1000"
                      label="发表评论"
                      rows="1"
                      append-icon="send"
                      @click:append="submitComment"
                    >
                    </v-textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="total"
        :total-visible="7"
        circle
        @input="getComment"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Rules from '../public/rules'
import { debounce } from '../public/utils'
import api from '../../api'

export default {
  name: 'comment',
  mounted () {
    window.addEventListener('scroll', debounce(this.commentInit, 200))
  },
  // beforeDestroy () {
  //  ...
  // },
  data () {
    return {
      tab: null,
      items: [
        '按时间排序', '按热度排序'
      ],
      comment: undefined,
      current: 0,
      currentR: 0,
      Rules,
      // reply
      valid: false,
      reply: '',
      // comment
      isCommentInit: false,
      page: 1,
      total: 1,
      sort: 't',
      lists: [],
      replies: []
    }
  },
  computed: {
    pid: function () {
      return this.$route.params.pid
    }
  },
  methods: {
    log () {
      console.log(1)
    },
    commentInit () {
      if (this.isCommentInit === false) {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if (scrollTop + 400 > this.$refs.commentEl.offsetTop) {
          console.log('this.$refs.commentEl.offsetTop', this.$refs.commentEl.offsetTop, 'scrollTop', scrollTop)
          console.log('you can view=========>')
          this.getComment()
          this.isCommentInit = true
        }
      }
    },
    getComment () {
      const data = {
        page: this.page,
        sort: this.sort
      }
      api.commnet.get(this.pid, data).then(({ data }) => {
        this.lists = data.lists
        this.page = data.page
        this.total = Math.ceil(data.total / 25)
      })
    },
    submitComment () {
      if ((this.comment || '').length <= 3) return
      if ((this.comment || '').length > 1000) return
      if ((/^\s*$/).test(this.comment)) return
      const data = {
        content: this.comment
      }
      api.commnet.post(this.pid, data).then(res => {
        if (res.type === 'success') {
          this.comment = ''
        }
      })
    },
    showCurrentComment (cid) {
      this.current = this.current === cid ? 0 : cid
    },
    showCurrentReply (cid) {
      this.currentR = this.currentR === cid ? 0 : cid
    },
    showReplies (cid) {

    },
    // TODO: load more
    loadMoreComments (cid) {
    //
    },
    loadMoreReplies (cid) {
      const data = {
        cid
      }
      api.reply.get(data).then(({ data }) => {
        console.log('data', data)
      })
    },
    removeComment (cid) {
      window.alert(cid)
    },
    report (cid) {
      window.alert(cid)
    }
  }
}
</script>

<style scoped>
  a {
    color: unset;
  }
  .v-list__tile--avatar {
    height: auto;
    margin: 5px auto;
  }
  .v-avatar {
    height: 40px;
    width: 40px;
    margin-top: 5px;
  }
  .v-list__tile {
    align-items: flex-start;
  }
  .time {
    font-size: 11px;
    color: grey;
    margin-left: 10px;
  }
  .v-list-header {
    width: 100%;
  }
  .v-list__tile__action {
    float: right;
    min-width: 25px;
    margin-top: 10px;
  }
  .v-list__tile__content > .v-list__tile__action {
    float: right;
    min-width: 30px;
  }
  .content {
    font-size: 1.083rem;
  }
  .comment-info {
    font-size: 0.95rem;
  }
</style>
