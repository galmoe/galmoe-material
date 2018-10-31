<template>
  <div>
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
                  label="发表评论"
                  rows="1"
                  append-icon="send"
                  @click:append="submitComment"
                >
                </v-textarea>
            </div>
          </div>
          <!--TODO: comment lists-->
          <div class="v-list__tile v-list__tile--avatar">
            <div class="v-list__tile__avatar">
              <a href="/u/1" class="v-avatar" style="height: 40px; width: 40px;"><img
                src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4"></a>
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
                <v-btn flat icon small color="blue lighten-2">
                  <v-icon small>thumb_up</v-icon>
                </v-btn>233
                <v-btn flat icon small color="blue lighten-2">
                  <v-icon small>thumb_down</v-icon>
                </v-btn>1
                <v-btn outline hover small class="no-border">回复</v-btn>
                <div class="operation">
                  <div class="spot"></div>
                  <div class="opera-list" style="display: none;">
                    <ul>
                      <li class="blacklist">加入黑名单</li>
                      <li class="report">举报</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="reply">
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
                    <a href="/u/1" class="v-avatar" style="height: 40px; width: 40px;"><img
                      src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4"></a>
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
                      <v-btn flat icon small color="blue lighten-2">
                        <v-icon small>thumb_up</v-icon>
                      </v-btn>233
                      <v-btn flat icon small color="blue lighten-2">
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
          <div class="v-list__tile v-list__tile--avatar">
            <div class="v-list__tile__avatar">
              <a href="/u/1" class="v-avatar" style="height: 40px; width: 40px;"><img
                src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4"></a>
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
                <v-btn flat icon small color="blue lighten-2">
                  <v-icon small>thumb_up</v-icon>
                </v-btn>233
                <v-btn flat icon small color="blue lighten-2">
                  <v-icon small>thumb_down</v-icon>
                </v-btn>1
                <v-btn outline hover small class="no-border">回复</v-btn>
                <div class="operation">
                  <div class="spot"></div>
                  <div class="opera-list" style="display: none;">
                    <ul>
                      <li class="blacklist">加入黑名单</li>
                      <li class="report">举报</li>
                    </ul>
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
        :length="15"
        :total-visible="7"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Rules from '../public/rules'

export default {
  name: 'comment',
  data () {
    return {
      page: 2,
      tab: null,
      items: [
        '按时间排序', '按热度排序'
      ],
      comment: undefined,
      Rules,
      // reply
      valid: false,
      reply: ''
    }
  },
  methods: {
    log () {
      console.log(1)
    },
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
  a {
    color: unset;
  }
  .v-list__tile--avatar {
    height: auto;
    margin: 5px auto;
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
