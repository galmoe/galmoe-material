<template>
    <v-card>
      <div class="v-card__text"><h4>关注者</h4></div>
      <v-list two-line subheader>
        <v-list-tile
          v-for="f in data"
          :key="f.uid"
          avatar
          @click=""
        >
          <v-list-tile-avatar>
            <img :src="f.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ f.uname }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ f.sign }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn outline small><i aria-hidden="true" class="v-icon material-icons">add</i>关注</v-btn>
            <!--<v-btn outline small color="red"><i aria-hidden="true" class="v-icon material-icons theme&#45;&#45;light red&#45;&#45;text">remove</i>取消关注</v-btn>-->
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
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
  name: 'followers',
  data () {
    return {
      data: [
        { uid: 1, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', sign: 'some sign here' },
        { uid: 2, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', sign: 'Jan 17, 2014' },
        { uid: 3, uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', sign: 'Jan 28, 2014' }
      ],
      page: 2
    }
  }
}
</script>
