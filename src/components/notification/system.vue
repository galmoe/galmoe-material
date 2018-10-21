<template>
  <v-card>
    <div class="v-card__text"><h4>消息</h4></div>
    <div class="i-container">
      <div class="i-item" v-for="c in data">
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
          <div class="i-content">
            content content content content content content content content content content content content
            <br>
            content content content
            <br>
            content content content
          </div>
          <div class="i-bottom">
            material material material material material
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
  </v-card>
</template>

<script>
export default {
  name: 'system',
  data () {
    return {
      data: [
        { uid: 1, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' },
        { uid: 2, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' },
        { uid: 3, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', t: '2018-02-03', content: 'some comment here' }
      ],
      page: 2
    }
  }
}
</script>
