<template>
  <v-layout row wrap>
    <v-flex md8>
      <div class="v-card__text">
        <h4>介绍</h4>
        <p v-if="!showEdit" class="trans">{{ intro }}</p>
        <div v-if="!intro" class="no-data">
          <img src="https://raw.githubusercontent.com/galmoe/galmoe-ts/master/public/images/nodata.png" alt="">
        </div>
        <v-textarea v-if="showEdit"
          v-model="intro"
          auto-grow
          :rules="[Rules.blank, Rules.max(1000)]"
          counter="1000"
          rows="1"
        >
        </v-textarea>
      </div>
    </v-flex>
    <v-flex md4>
      <div class="v-card__text">
        <h4>信息</h4>
        <v-btn icon small><v-icon small>access_time</v-icon></v-btn>&nbsp;注册于&nbsp;{{ register | timeFilter('days') }}
        <br>
        <v-btn icon small class="red--text lighten-3" @click="report"><v-icon small title="举报">flag</v-icon></v-btn>&nbsp;举报&nbsp;
        <br>
        <div v-if="isMyself">
          <v-btn icon small @click="edit"><v-icon small>edit</v-icon></v-btn>&nbsp;编辑
          <br>
          <v-btn icon small @click="save"><v-icon small>done</v-icon></v-btn>&nbsp;保存
          <br>
          <v-btn icon small @click="cancel"><v-icon small>clear</v-icon></v-btn>&nbsp;取消
        </div>
      </div>
    </v-flex>
    <v-flex md8>
      <div class="v-card__text">
        <h4>链接</h4>
        <div class="links-container">
          <div class="link-list" v-for="(link, i) in links" :key="i">
            <v-btn icon small @click="delLink(i)" v-if="showEdit" title="删除"><v-icon small>highlight_off</v-icon></v-btn>
            <a :href="link.url"  target="_blank">{{ link.title }}</a>
          </div>
          <div v-if="!links" class="no-data">
            <img src="https://raw.githubusercontent.com/galmoe/galmoe-ts/master/public/images/nodata.png" alt="">
          </div>
        </div>
        <div class="links-container" v-if="showEdit">
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                v-model="titleIpt"
                label="名称"
                :rules="[Rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="urlIpt"
                label="链接"
                :rules="[Rules.required]"
                append-icon="send"
                @click:append="addLink"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Rules from '../../public/rules'
import api from '../../../api'
import { mapGetters } from 'vuex'

export default {
  name: 'about',
  created () {
    this.fetchData()
  },
  data () {
    return {
      Rules,
      intro: '',
      showEdit: false,
      titleIpt: '',
      urlIpt: '',
      register: '',
      links: []
    }
  },
  computed: {
    ...mapGetters({
      isMyself: 'session/isMyself'
    })
  },
  methods: {
    fetchData () {
      const data = {
        uid: this.$route.params.uid
      }
      api.user.about(data).then(({ data }) => {
        this.intro = data.intro
        this.register = data.register
        this.links = data.links
      })
    },
    report () {
      window.alert('report')
    },
    edit () {
      this.showEdit = true
    },
    addLink () {
      this.links.push({ title: this.titleIpt, url: this.urlIpt })
      this.titleIpt = ''
      this.urlIpt = ''
    },
    delLink (i) {
      this.links.splice(i, 1)
    },
    save () {
      const data = {
        intro: this.intro,
        links: this.links
      }
      api.user.updateAbout(data).then(res => {
        console.log(res)
        this.showEdit = false
      })
    },
    cancel () {
      this.showEdit = false
    }
  },
  watch: {
    '$router': 'fetchData'
  }
}
</script>
