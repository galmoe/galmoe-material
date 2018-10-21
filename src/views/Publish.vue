<template>
  <v-container grid-list-xl class="n">
    <v-layout row wrap>
      <v-flex md12>
        <v-card class="t-container">
          <nav class="t t-fixed" data-booted="true">
            <div class="v-toolbar__content" style="height: 43px;">
              <div class="v-toolbar__title">
                <router-link to="publish" class="t-link">发布</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="manager" class="t-link">管理</router-link>
              </div>
              <div class="v-toolbar__title">
                <router-link to="edit" class="t-link">编辑</router-link>
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
  name: 'publish',
  data () {
    return {
    }
  }
}
</script>
