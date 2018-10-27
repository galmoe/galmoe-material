<template>
  <v-card>
    <div class="v-card__text"><h4>管理</h4></div>
    <div id="related">
      <div class="related-item" v-for="(post, index) in posts" :key="index">
        <div class="s-thumb">
          <router-link :to="{name: 'post', params:{pid: post.pid}}" :title="post.title">
            <img :src="post.thumb" :alt="post.title">
          </router-link>
        </div>
        <div class="meta-container">
          <router-link :to="{name: 'post', params:{pid: post.pid}}" :title="post.title" class="meta-title">{{post.title}}</router-link>
          <span class="meta-item"><v-icon small color="grey">remove_red_eye</v-icon>&nbsp;233</span>
          <span class="meta-item"><v-icon small color="grey">thumb_up</v-icon>&nbsp;233</span>
          <span class="meta-item"><v-icon small color="grey">favorite</v-icon>233</span>
          <span class="meta-item"><v-icon small color="grey">access_time</v-icon>&nbsp;发布于&nbsp;{{post.t}}</span>
          <span class="meta-item">
            <v-btn icon small><v-icon small>edit</v-icon></v-btn>编辑
          </span>
          <span class="meta-item">
            <v-btn icon small><v-icon small>delete</v-icon></v-btn>删除
          </span>
        </div>
      </div>
    </div>
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="maxPage"
        :total-visible="7"
        circle
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'publish',
  data () {
    return {
      posts: [
        {
          author: {
            uname: 'Beats0',
            uid: 1,
            avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'
          },
          pid: 1,
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
          pid: 2,
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
          pid: 3,
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
          pid: 4,
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
          pid: 5,
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
          pid: 10,
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
          pid: 11,
          title: 'title',
          cateid: 6,
          cateName: 'anime',
          content: 'content',
          thumb: 'https://steamuserimages-a.akamaihd.net/ugc/915793902525018984/4A9B8293970480323541BE309DD4300D9339C675/'
        }
      ],
      page: 2,
      maxPage: 15
    }
  }
}
</script>
