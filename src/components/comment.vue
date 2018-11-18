<template>
  <div ref="commentEl">
    <div class="v-tabs" slot="extension" data-booted="true">
      <div class="v-tabs__bar">
        <div class="v-tabs__wrapper">
          <div class="v-tabs__container">
            <div class="v-tabs__slider-wrapper" style="left: 0; width: 94px;" ref="slider">
              <div class="v-tabs__slider primary"></div>
            </div>
            <div class="v-tabs__div" @click="changeSort('t')"><a :class="['v-tabs__item', {'v-tabs__item--active': sort === 't'}]">按时间排序</a></div>
            <div class="v-tabs__div" @click="changeSort('h')"><a :class="['v-tabs__item', {'v-tabs__item--active': sort === 'h'}]">按热度排序</a></div>
            <div class="v-tabs__div"><span class="v-tabs__item"> 共 {{ ct }} 条评论 </span></div>
          </div>
        </div>
      </div>
    </div>
    <v-card flat class="comment">
      <div class="text-xs-center loading" v-if="loading">
        <v-progress-circular
          color="primary"
          indeterminate
          :width="2"
        ></v-progress-circular>
      </div>
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
            append-icon="sentiment_satisfied_alt"
            append-outer-icon="send"
            @click:append="showSticker = !showSticker"
            @click:append-outer="submitComment"
          >
          </v-textarea>
          <transition name="fade">
            <div class="sticker-container" v-if="showSticker">
              <div class="sticker-box scroll-sm">
                <ul class="sticker-list" v-if="commentTable === 1">
                  <li class="emoji-popover" v-for="n in 50" :key="n" @click="handleAppendEmoji(n)">
                    <img :src="`https://galmoe.github.io/sticker/emoji/${n}.png`">
                  </li>
                </ul>
                <ul class="sticker-list" v-else>
                  <li class="sticker-popover" v-for="sticker in stickers" :key="sticker.src" @click="handleAppendSticker(sticker.src)">
                    <img class="sticker" :src="sticker.src" alt="">
                  </li>
                </ul>
              </div>
              <div class="sticker-pagination">
                <ul :class="[ 'sticker-menu', { 'show-page': commentTable === 2 } ]">
                  <li class="page"><span><v-btn icon small class="light-blue--text"><v-icon small>chevron_left</v-icon></v-btn></span></li>
                  <li class="page"><span class="sticker-page light-blue--text">{{ stickerPage }}/{{ stickerPages }}</span></li>
                  <li class="page"><span><v-btn icon small class="light-blue--text"><v-icon small>chevron_right</v-icon></v-btn></span></li>
                  <li><span><v-btn icon small class="light-blue--text" @click="commentTable = 1"><v-icon small>sentiment_satisfied_alt</v-icon></v-btn></span></li>
                  <li><span><v-btn icon small class="light-blue--text" @click="fetchStickerData"><v-icon small>insert_photo</v-icon></v-btn></span></li>
                  <li><span><v-btn icon small class="light-blue--text"><v-icon small>cloud_upload</v-icon><input id="sticker-uploader" type="file" accept="image/png, image/jpeg, image/gif, image/jpg,  image/webp" @change="uploadImg($event)"></v-btn></span></li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="v-list__tile v-list__tile--avatar" v-for="c in lists" :key="c.cid">
        <div class="v-list__tile__avatar">
          <a :href="`/u/${c.uid}`" class="v-avatar" target="_blank"><img :src="c.avatar"></a>
        </div>
        <div class="v-list__tile__content">
          <div class="v-list-header">
            <a :href="`/u/${c.uid}`" target="_blank">{{ c.uname }}</a>
            <span class="time">{{ c.date | timeFilter  }}</span>
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
            <div class="text-xs-center" v-if="replies[`loading${c.cid}`]">
              <v-progress-circular
                color="primary"
                indeterminate
                :width="2"
              ></v-progress-circular>
            </div>
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
                  <v-btn outline hover small class="no-border" @click="showCurrentReply(r.cid, r.uname)">回复</v-btn>
                </div>
              </div>
            </div>
          </div>
          <!--send sub reply-->
          <transition name="fade">
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
            <v-btn outline hover small class="no-border" v-if="c.rv && replies[`page${c.cid}`] < replies[`pages${c.cid}`]" @click="loadMoreReplies(c.cid)">加载更多回复<v-icon small>keyboard_arrow_down</v-icon></v-btn>
          </transition>
        </div>
      </div>
    </v-card>
    <div class="text-xs-center" v-show="page && page <= pages">
      <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="7"
        circle
        @input="pageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Rules from '../public/rules'
import * as xss from 'xss'
import * as _ from 'lodash'
import axiosUpload from '../../api/upload'
import { getElementViewTop } from '../public/dom'
import { commentFilter, replyFilter } from '../filters/xss'
import api from '../../api'
import { mapState } from 'vuex'

export default {
  name: 'comment',
  destroyed () {
    document.removeEventListener('scroll', this.commentInit)
    document.removeEventListener('click', this.clickOutSide)
  },
  mounted () {
    document.addEventListener('scroll', _.debounce(this.commentInit, 200))
    document.addEventListener('click', this.clickOutSide)
  },
  data () {
    return {
      tab: null,
      items: [
        '按时间排序', '按热度排序'
      ],
      comment: '',
      current: 0,
      reply: '',
      currentRname: '',
      receiver: 0,
      currentR: 0,
      currentShowR: 0,
      parent: 0,
      Rules,
      // comment
      isCommentInit: false,
      page: 0,
      currentPage: 0,
      pages: 0,
      cv: 0,
      ct: 0,
      sort: 't',
      lists: [],
      started: 0,
      replies: {},
      loading: true,
      showSticker: false,
      stickers: {},
      stickerPage: 0,
      stickerPages: 0,
      commentTable: 1
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
    changeSort (sort) {
      if (this.sort === sort) return
      console.log(sort)
      this.sort = sort
      this.page = 1
      this.getComment()
      this.$refs.slider.style.left = this.sort === 't' ? '0px' : '94px'
    },
    clickOutSide (ev) {
      if (!this.showSticker) return
      console.log(ev)
      ev = ev || window.event
      let el = ev.target || ev.srcElement || {}, n = null, r = el
      for (el.nodeType && (r = el.parentNode); r.parentNode;) {
        console.log(el.nodeType)
        n || r.tagName !== 'A' && r.tagName !== 'a' || (n = r), r = r.parentNode
        if ([...(r.classList || [])].includes('sticker-container')) {
          console.log('yes')
        }
        console.log('no')
        this.showSticker = false
      }
    },
    commentInit () {
      if (this.isCommentInit === false) {
        if (getElementViewTop(this.$refs.commentEl) <= 500) {
          this.getComment()
          this.isCommentInit = true
        }
      }
    },
    pageChange () {
      if (this.pages === 0) {
        this.getComment()
      } else if (this.pages !== 0 && this.pages !== 1 && this.page - 1 < this.pages && this.page !== this.currentPage) {
        this.getComment()
      }
    },
    getComment () {
      this.lists = []
      this.replies = {}
      this.loading = true
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
        this.loading = false
        this.currentPage = this.page
      })
    },
    fetchStickerData () {
      // TODO: get init sticker json data
      // if (this.stickerPage !== 0 && this.sticker + 1 > this.sickers) return
      if (_.isEmpty(this.stickers)) {
        const data = {
          page: this.stickerPage + 1
        }
        api.img.sticker(data).then(res => {
          this.stickers = res.stickers
          this.stickerPage = res.page
          this.stickerPages = res.pages
        })
      }
      console.log(2)
      this.commentTable = 2
    },
    uploadImg (ev) {
      let formData = new FormData()
      formData.append('image', ev.target.files[0])
      axiosUpload(formData).then(({ data }) => {
        if (data.type === 'success') {
          this.comment += `<img src="${data.src}">`
        }
      })
    },
    handleAppendSticker (src) {
      this.comment += `<img src="${src}" class="sticker">`
    },
    handleAppendEmoji (n) {
      this.comment += `<img src="https://galmoe.github.io/sticker/emoji/${n}.png">`
    },
    submitComment () {
      console.log('submit')
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
            content: xss(this.comment, commentFilter),
            date: Date.now()
          }
          this.lists.unshift(data)
          this.comment = ''
          this.showSticker = false
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
    },
    showReplies (cid) {
      this.currentShowR = this.currentShowR === cid ? 0 : cid
      this.reply = ''
      if (!this.replies[`load${cid}`]) {
        this.$set(this.replies, `loading${cid}`, true)
        this.loadMoreReplies(cid)
      }
      this.$set(this.replies, `show${cid}`, !this.replies[`show${cid}`])
    },
    showCurrentReply (cid, uname) {
      this.current = 0
      this.receiver = cid
      this.currentRname = '@' + uname
      // this.currentR = this.currentR === cid ? 0 : cid
      this.currentR = cid
      this.parent = cid
    },
    loadMoreReplies (cid) {
      const data = {
        cid,
        page: this.replies[`page${cid}`] + 1 || 1
      }
      api.reply.get(data).then(({ data }) => {
        if (!data) return
        const { replies, page, pages } = data
        // replies
        let _replies = this.replies[`r${cid}`] || []
        _replies = [..._replies, ...replies]
        this.$set(this.replies, `r${cid}`, _replies)
        // pages
        this.$set(this.replies, `page${cid}`, page)
        // pages
        this.$set(this.replies, `pages${cid}`, pages)
        // loaded
        this.$set(this.replies, `load${cid}`, true)
        // loading
        this.$set(this.replies, `loading${cid}`, false)
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
