<template>
  <v-container grid-list-xl class="n">
    <v-layout row wrap>
      <v-flex md12>
        <v-card class="t-container">
          <nav class="t t-fixed" data-booted="true">
            <div class="v-toolbar__content" style="height: 43px;">
              <div class="v-toolbar__title">
                <router-link to="about" class="t-link">关于</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="usage" class="t-link">使用</router-link>
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
  name: 'about'
}
</script>
