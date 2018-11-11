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
      <v-tab>共 {{ total }} 条评论</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat class="comment">
          <!--TODO: reply-->
          <div class="v-list__tile v-list__tile--avatar">
            <div class="v-list__tile__avatar">
              <a :href="`/u/${uid_s}`" class="v-avatar">
                <img :src="avatar_s">
              </a>
            </div>
            <div class="v-list__tile__content">
                <v-textarea
                  v-model="comment"
                  auto-grow
                  :rules="[Rules.max(1000)]"
                  counter="1000"
                  label="发表评论"
                  rows="1"
                  append-icon="send"
                  @click:append="submitComment"
                >
                </v-textarea>
            </div>
          </div>
          <div class="v-list__tile v-list__tile--avatar" v-for="c in lists" :key="c.cid">
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
              <div class="content trans" v-html="c.content"></div>
              <div class="comment-info">
                <!--TODO: add action color-->
                <!--<v-btn flat icon small color="blue lighten-2">-->
                <v-btn flat icon small><v-icon small>thumb_up</v-icon></v-btn>{{ c.lv }}
                <v-btn flat icon small><v-icon small>thumb_down</v-icon></v-btn>{{ c.dv }}
                <v-btn outline hover small class="no-border" v-if="c.rv" @click="showReplies(c.cid)">{{ (lists[`show${c.cid}`] ? '隐藏' : '查看') }} {{ c.rv }} 条回复<v-icon small>keyboard_arrow_{{ (lists[`show${c.cid}`] ? 'up' : 'down') }}</v-icon></v-btn>
                <v-btn outline hover small class="no-border" @click="showCurrentComment(c.cid)">{{ (c.cid === current ? '取消' : '') }}回复</v-btn>
              </div>
              <!--replies-->
              <div class="replies">
                <div class="v-list__tile v-list__tile--avatar" v-for="r in replies[`r${c.cid}`]" :key="r.rid">
                  <div class="v-list__tile__avatar">
                    <a :href="`/u/${r.uid}`" target="_blank" class="v-avatar"><img :src="r.avatar"></a>
                  </div>
                  <div class="v-list__tile__content">
                    <div class="v-list-header">
                      <a :href="`/u/${r.uid}`">{{ r.uname }}</a>
                      <span class="time">{{ r.date | timeFilter('days') }}</span>
                      <v-list-tile-action>
                        <v-menu bottom left>
                          <v-btn small slot="activator" icon>
                            <v-icon small>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-tile @click="removeComment(r.rid)">
                              <v-list-tile-title>删除</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="report(r.rid)">
                              <v-list-tile-title>举报</v-list-tile-title>
                            </v-list-tile>
                          </v-list>
                        </v-menu>
                      </v-list-tile-action>
                    </div>
                      <div class="content trans" v-html="r.content"></div>
                      <div class="comment-info">
                      <v-btn flat icon small>
                        <v-icon small>thumb_up</v-icon>
                      </v-btn>233
                      <v-btn flat icon small>
                        <v-icon small>thumb_down</v-icon>
                      </v-btn>1
                      <v-btn outline hover small class="no-border" @click="showCurrentReply(r.cid, r.uname)">回复 {{ r.rid }}</v-btn>
                    </div>
                  </div>
                </div>
              </div>
              <!--send sub reply-->
              <div class="reply" v-if="currentR === c.cid || current === c.cid">
                <div class="v-list__tile v-list__tile--avatar">
                  <div class="v-list__tile__avatar">
                    <a :href="`/u/${uid_s}`" class="v-avatar">
                      <img :src="avatar_s">
                    </a>
                  </div>
                  <div class="v-list__tile__content">
                    <v-textarea
                      v-model="reply"
                      auto-grow
                      autofocus
                      :rules="[Rules.max(1000)]"
                      counter="1000"
                      rows="1"
                      :prefix="currentRname"
                      append-icon="send"
                      @click:append="submitReply(c.cid)"
                    >
                    </v-textarea>
                  </div>
                </div>
              </div>
              <v-btn outline hover small class="no-border" v-if="c.rv && replies[`page${c.cid}`] <= replies[`maxPage${c.cid}`]" @click="loadMoreReplies(c.cid)">加载更多回复<v-icon small>keyboard_arrow_down</v-icon></v-btn>
            </div>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <div class="text-xs-center loading">
      <!--<v-pagination-->
        <!--v-model="page"-->
        <!--:length="total"-->
        <!--:total-visible="7"-->
        <!--circle-->
        <!--@input="getComment"-->
      <!--&gt;</v-pagination>-->
      <v-progress-circular
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import Rules from '../public/rules'
import { debounce } from '../public/utils'
import * as xss from 'xss'
import * as _ from 'lodash'
import { commentFilter, replyFilter } from '../filters/xss'
import api from '../../api'
import { mapState } from 'vuex'

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
      reply: '',
      currentCname: '',
      currentRname: '',
      receiver: 0,
      currentR: 0,
      currentShowR: 0,
      parent: 0,
      Rules,
      valid: false,
      // comment
      isCommentInit: false,
      page: 1,
      pages: 0,
      total: 1,
      sort: 't',
      lists: [],
      replies: {}
    }
  },
  computed: {
    ...mapState({
      uid_s: state => state.session.uid_s,
      avatar_s: state => state.session.avatar_s,
      uname_s: state => state.session.uname_s
    }),
    pid: function () {
      return this.$route.params.pid
    }
  },
  methods: {
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
        const keys = _.keys(data)
        const values = _.values(data)
        for (let i = 0; i < keys.length; i++) {
          this[keys[i]] = values[i]
        }
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
          // reply data callback
          const { cid } = res
          const data = {
            cid,
            uid: this.uid_s,
            uname: this.uname_s,
            avatar: this.avatar_s,
            content: xss(this.comment, replyFilter),
            date: Date.now()
          }
          this.lists.unshift(data)
          this.comment = ''
        }
      })
    },
    submitReply (cid) {
      // send reply data
      let content = ''
      if (this.current === cid) {
        content = xss(this.reply, replyFilter)
      } else {
        content = xss(`<a href="/u/${this.receiver}" target="_blank">${this.currentRname}</a> ${this.reply}`, replyFilter)
      }
      const data = {
        uid: this.uid_s,
        cid,
        receiver: this.receiver,
        uname: this.uname_s,
        r_name: this.currentRname,
        content,
        parent: this.parent
      }
      api.reply.post(data).then(res => {
        console.log('res', res)
        if (res.type === 'success') {
          // reply data callback
          data.rid = res.rid
          data.avatar = this.avatar_s
          data.date = Date.now()
          let _replies = this.replies[`r${cid}`] || []
          _replies = [..._replies, data]
          // reset reply status
          this.$set(this.replies, `r${cid}`, _replies)
          this.reply = ''
          this.current = 0
          this.currentR = 0
        }
      })
    },
    showCurrentComment (cid) {
      this.current = this.current === cid ? 0 : cid
      this.reply = ''
      this.parent = 0
      this.currentRname = ''
      debugger
    },
    showReplies (cid) {
      this.currentShowR = this.currentShowR === cid ? 0 : cid
      this.reply = ''
      if (!this.replies[`load${cid}`]) {
        this.loadMoreReplies(cid)
      }
      this.$set(this.replies, `show${cid}`, !this.replies[`show${cid}`])
    },
    showCurrentReply (cid, uname) {
      this.receiver = cid
      this.currentRname = '@' + uname
      // this.currentR = this.currentR === cid ? 0 : cid
      this.currentR = cid
      this.parent = cid
    },
    // TODO: load more
    loadMoreComments (cid) {
    //
    },
    loadMoreReplies (cid) {
      const data = {
        cid,
        page: this.replies[`page${cid}`] || 1
      }
      api.reply.get(data).then(({ data }) => {
        if (!data) return
        const { replies, page, total } = data
        // replies
        let _replies = this.replies[`r${cid}`] || []
        _replies = [..._replies, ...replies]
        this.$set(this.replies, `r${cid}`, _replies)
        // pages
        this.$set(this.replies, `page${cid}`, page + 1)
        // maxPage
        this.$set(this.replies, `maxPage${cid}`, Math.ceil(total / 10))
        // loaded
        this.$set(this.replies, `load${cid}`, true)
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
    padding: 0;
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
</style>
