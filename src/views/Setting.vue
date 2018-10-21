<template>
  <v-container grid-list-xl class="n">
    <v-layout row wrap>
      <v-flex md12>
        <v-card class="t-container">
          <nav class="t t-fixed" data-booted="true">
            <div class="v-toolbar__content" style="height: 43px;">
              <div class="v-toolbar__title">
                <router-link to="account" class="t-link">账户</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="safety" class="t-link">安全</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="privacy" class="t-link">隐私</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="record" class="t-link">记录</router-link>
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
  name: 'setting',
  data () {
    return {
    }
  }
}
</script>
