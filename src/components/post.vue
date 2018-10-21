<template>
  <div>
    <v-layout justify-start row wrap="wrap" grid-list-md="grid-list-md">
      <v-flex xs12 md4 class="p-item" v-for="post in posts" :key="post.aid">
          <v-card class="my-4" hover>
            <v-card-title>
              <router-link :to="{name:'user',params:{uid: post.author.uid}}">
                <img class="avatar" :src="post.author.avatar" alt="">
              </router-link>
              <div class="post-header">
                  <div class="post-author-name">
                    <router-link :to="{name:'user',params:{uid: post.author.uid}}" class="user-link">
                      {{ post.author.uname }}
                    </router-link>
                  </div>
                  <div class="post-category">
                    <div class="ca-category">
                      <svg viewBox="0 0 48 48" height="100%" width="100%"><path d="M20 14l10 10-10 10z"></path></svg>
                    </div>
                    <router-link :to="{name:'category',params:{cateid: post.cateid}}" class="category-link">
                      {{ post.cateName }}
                    </router-link>
                  </div>
              </div>
            </v-card-title>
            <router-link :to="{name:'article',params:{aid: post.aid}}" class="v-list__tile title-link">
              {{ post.title }}
            </router-link>
            <router-link :to="{name:'article',params:{aid: post.aid}}">
              <v-img
                class="white--text"
                :src="post.thumb"
              >
            </v-img>
            </router-link>
            <v-card-text>
              {{ post.content }}
            </v-card-text>
            <v-card-actions>
              <v-btn icon small class="light-blue--text">
                <v-icon small >thumb_up</v-icon>
              </v-btn>233
              <v-btn icon small class="red--text lighten-3">
                <v-icon small>favorite</v-icon>
              </v-btn>233
              <v-btn icon small>
                <v-icon small>chat</v-icon>
              </v-btn>233
              <v-spacer></v-spacer>
              <v-btn flat small class="primary--text">more</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
    </v-layout>
    <!--page-->
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="9"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
  data () {
    return {
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
      posts: [
        {
          author: {
            uname: 'Beats0',
            uid: 1,
            avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'
          },
          aid: 1,
          title: 'rick and monty',
          cateid: 6,
          cateName: 'anime',
          content: 'FUCK/LOVE YOU',
          thumb: 'https://ws1.sinaimg.cn/large/006nOlwNly1fwg51fvtygj30if0okq4p.jpg'
        },
        {
          author: {
            uname: 'Beats0',
            uid: 1,
            avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'
          },
          aid: 2,
          title: 'eden*',
          cateid: 6,
          cateName: 'galgame',
          content: 'A tale of the planet\'s final love story told using the full force of minori\'s critically acclaimed illustrative style, engaging musical compositions, and the highly talented staff that has led fans coming back for more every single time!',
          thumb: 'https://ws1.sinaimg.cn/large/006nOlwNgy1fp0v3noihrj337b29eu0x.jpg'
        },
        {
          author: {
            uname: 'Beats0 post.author.unamepost.author.unamepost.author.unamepost.author.unamepost.author.uname',
            uid: 1,
            avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'
          },
          aid: 3,
          title: 'some title',
          cateid: 3,
          cateName: 'some long text some long text some long text some long text ',
          content: 'some content some content some content some content some content some content some content',
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019607/9362470BA0D8CC701D2DD2C3A9331EB14AD13B64/'
        },
        {
          author: {
            uname: 'Beats0',
            uid: 1,
            avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'
          },
          aid: 4,
          cateid: 3,
          cateName: 'anime',
          title: 'title',
          content: 'content',
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019392/1AC565DD04AFE9CDBC650907AB45719D41EEB788/'
        },
        {
          author: {
            uname: 'Beats0',
            uid: 1,
            avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'
          },
          aid: 5,
          title: 'title',
          cateid: 5,
          cateName: 'anime',
          content: '',
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525019206/A07E7B66D21F401D66C8FAF7E33A509582A1736B/'
        },
        {
          author: {
            uname: 'Beats0',
            uid: 1,
            avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'
          },
          aid: 10,
          title: 'neko',
          cateid: 6,
          cateName: 'anime',
          content: '^.^',
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525014680/9BFA1439EFA7DF58FDE0A90BB805A10D15D5FBAA/'
        },
        {
          author: {
            uname: 'Beats0',
            uid: 1,
            avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'
          },
          aid: 11,
          title: 'title',
          cateid: 6,
          cateName: 'anime',
          content: 'content',
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525018984/4A9B8293970480323541BE309DD4300D9339C675/'
        }
      ],
      page: 2
    }
  }
}
</script>
