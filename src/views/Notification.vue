<template>
  <v-container grid-list-xl class="n">
    <v-layout row wrap>
      <v-flex md12>
        <v-card class="t-container">
          <nav class="t t-fixed" data-booted="true">
            <div class="v-toolbar__content" style="height: 43px;">
              <div class="v-toolbar__title">
                <router-link to="resent" class="t-link">普通消息</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="system" class="t-link">系统消息</router-link>
              </div>
            </div>
          </nav>
        </v-card>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'notification',
  data () {
    return {
      isFix: false
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      if (this.offsetTop >= 500) {
        this.isFix = true
      } else {
        this.isFix = false
      }
    }
  }
}
</script>
