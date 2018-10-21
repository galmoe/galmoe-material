<template>
  <v-app :dark="isDark">
    <!--TODO: sidebar-->
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
          <v-list-tile>
            <v-list-tile-title class="title">
              <router-link :to="'/'" :class="[{'theme--dark': isDark},'root-link']">
                Galmoe material
              </router-link>
            </v-list-tile-title>
            <v-btn icon @click.stop="drawer = !drawer">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile>
          <div class="theme-sw">
            <v-switch
              v-model="themeM"
              :label="`${theme} theme`"
              :dark="isDark"
              hide-details
              @click="changeTheme"
            ></v-switch>
          </div>
          <!--v-switch(:label="(!dark ? 'Light' : 'Dark') + ' Theme'", v-model="dark", :dark="dark", hide-details)-->
          <!--div-->
        <hr :class="['v-divider',{'theme--dark': isDark}]">
        <template v-for="menu in menus">
          <v-layout
            v-if="menu.heading"
            :key="menu.heading"
            row
            align-center
          >
          </v-layout>
          <v-list-group
            v-else-if="menu.children"
            v-model="menu.model"
            :key="menu.text"
            :append-icon="menu.model ? menu.icon : menu['icon-alt']"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ menu.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in menu.children"
              :key="i"
              @click="log"
              :to="child.href"
              :target="child.target"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="menu.text" @click="log" :to='menu.href'>
            <v-list-tile-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ menu.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <a href="https://s.team/chat/fj8rkCr0" :class="['v-list__tile v-list__tile--link', {'theme--dark': isDark}]" target="_blank">
          <div class="v-list__tile__action">
            <i aria-hidden="true" :class="['v-icon material-icons', {'theme--dark': isDark}]">chat_bubble</i></div>
          <div class="v-list__tile__content"><div class="v-list__tile__title">
          聊天
        </div></div>
        </a>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      :color="(isDark ? '' : 'white')"
      :dark="isDark"
      height="46px"
      app
      fixed
    >
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <button type="button" class="v-btn v-btn--icon v-btn--large">
          <router-link :to="'/'">
            <div class="v-avatar v-avatar--tile" style="height: 32px; width: 32px;"><img
              src="https://avatars1.githubusercontent.com/u/42090849?s=200&v=4" alt="galmoe material"></div>
          </router-link>
        </button>
        <span class="hidden-sm-and-down"><a href="/" :class="[{'theme--dark': isDark},'site']">galmoe material</a></span>
      </v-toolbar-title>
      <!--TODO: search layout-->
      <!--<v-text-field-->
      <!--flat-->
      <!--hide-details-->
      <!--prepend-inner-icon="search"-->
      <!--single-line-->
      <!--height="30px"-->
      <!--label="Search"-->
      <!--class="ser-ctrl"-->
      <!--&gt;</v-text-field>-->
      <v-spacer></v-spacer>
      <!--toolbar right-->
      <v-text-field
        v-model="q"
        v-show="showSearch"
        :color="(isDark ? 'white' : 'black')"
        :dark="isDark"
        :autofocus="true"
        height="30"
        placeholder="Search"
        @keyup.enter="handleSubmit"
      ></v-text-field>
      <v-btn icon @click="handleShowSearch">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon :to="'/publish'">
        <v-icon>send</v-icon>
      </v-btn>
      <v-btn icon :to="'/notification'">
        <v-icon>notifications</v-icon>
      </v-btn>
      <!--TODO: login-->
      <v-btn icon>
        <v-icon @click.stop="showLogin=true">person</v-icon>
      </v-btn>
      <v-menu bottom offset-y>
        <button slot="activator" type="button" class="v-btn v-btn--icon v-btn--large">
          <div class="v-avatar" style="height: 32px; width: 32px;">
            <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4"
                 alt="Beats0">
          </div>
        </button>
        <v-list>
          <v-list-tile v-for="m of userMenu" :key="m" @click="userMenuSelect(m)">
            <v-list-tile-title>{{ m }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <message />
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer height="60">
      <v-card-actions class="justify-center l">
        <router-link to="'/'">galmoe material</router-link>
      </v-card-actions>
    </v-footer>
    <toTop />
      <login :visible="showLogin" @close="showLogin=false"/>
  </v-app>
</template>

<script>
import message from '@/components/message'
import login from '@/components/login'
import toTop from '@/components/to-top'
import userMenu from '@/public/userMenu'
// import api from '../../api'
// import adminMenu from '@/public/adminMenu'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'layout',
  created () {
    // api.user.getMessage()
    // api.user.getErrMessage()
  },
  data: () => ({
    themeM: true,
    showLogin: false,
    showSearch: false,
    q: '',
    dialog: false,
    drawer: null,
    userMenu: ['主页', '设置和安全', '退出']
  }),
  methods: {
    ...mapActions({
      changeTheme: 'theme/changeTheme'
    }),
    log () {
      console.log(1)
    },
    handleShowSearch () {
      this.showSearch = !this.showSearch
    },
    handleSubmit () {
      window.alert(this.q)
    },
    userMenuSelect (item) {
      if (item === '主页') {
        this.$router.push({ name: 'user', params: { uid: 1 } })
      } else if (item === '设置和安全') {
        this.$router.push({ name: 'setting' })
      } else {
        window.alert('you log out')
      }
    }
  },
  components: {
    toTop,
    message,
    login
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme
    }),
    ...mapGetters({
      isDark: 'theme/isDark'
    }),
    menus: function () {
      // let profile = ''
      // return profile === 'admin' ? adminMenu : userMenu
      return userMenu
    }
  }
}
</script>
