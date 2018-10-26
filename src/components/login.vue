<template>
  <v-dialog v-model="show" width="500px">
    <v-tabs
      fixed-tabs
      centered
    >
      <v-tab
        v-for="t of tabs"
        :key="t"
        @click="selectTab(t)"
      >
        {{ t }}
      </v-tab>
    </v-tabs>
    <v-card v-show="current==='login'">
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model.trim="email"
                prepend-icon="mail"
                label="邮箱"
                :rules="[Rules.required, Rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model.trim="pwd"
                type="password"
                prepend-icon="lock"
                label="密码"
                :rules="[Rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="captcha"
                label="验证码"
                prepend-icon="verified_user"
                :rules="[Rules.required, Rules.length(6)]"
                required
              ></v-text-field>
          </v-form>
        </v-layout>
      </v-container>
    </v-card>
    <v-card v-show="current==='register'">
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-form ref="formR" v-model="validR" lazy-validation>
              <v-text-field
                v-model.lazy="uname"
                prepend-icon="account_circle"
                label="昵称"
                @change="checkUnameF"
                :rules="[Rules.required, Rules.hasBlank, Rules.min(3), Rules.max(10)]"
                :error-messages="checkMsg.uname"
                required
              ></v-text-field>
              <v-text-field
                v-model.lazy="email"
                prepend-icon="mail"
                label="邮箱"
                @change="checkEmailF"
                :error-messages="checkMsg.email"
                :rules="[Rules.required, Rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model="pwd"
                prepend-icon="lock"
                label="密码"
                type="password"
                :rules="[Rules.required, Rules.min(8), Rules.max(20)]"
                required
              ></v-text-field>
              <v-text-field
                v-model.lazy="pwdRe"
                prepend-icon="lock"
                label="确认密码"
                type="password"
                :rules="[Rules.required]"
                @change="checkPwdMatchF"
                :error-messages="checkMsg.pwdMatch"
                required
              ></v-text-field>
              <v-text-field
                label="验证码"
                prepend-icon="verified_user"
                :rules="[Rules.required, Rules.length(6)]"
                required
              ></v-text-field>
          </v-form>
        </v-layout>
      </v-container>
    </v-card>
    <v-card>
      <img :src="captchaURL"
           v-if="show"
           ref="captcha"
           @click="changeCaptcha"
           alt="点击刷新"
           title="点击刷新"
           class="captcha">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" @click="handleLogin" v-if="current==='login'">登录</v-btn>
        <v-btn :disabled="!validR" @click="handleRegister" v-if="current==='register'">注册</v-btn>
        <v-btn flat @click.stop="handleCancel">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Rules from '../public/rules'
import api from '../../api'
import { backEnd } from '../../config'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'login',
  props: ['visible'],
  data: () => ({
    valid: true,
    validR: true,
    tabs: ['login', 'register'],
    current: 'login',
    captchaURL: `${backEnd}/api/captcha`,
    uname: '',
    email: '',
    pwd: '',
    pwdRe: '',
    captcha: '',
    Rules,
    checkMsg: {
      uname: '',
      email: '',
      pwdMatch: ''
    }
  }),
  methods: {
    ...mapActions({
      closeLogin: 'session/closeLogin'
    }),
    selectTab (tab) {
      this.current = tab
    },
    changeCaptcha () {
      this.$refs.captcha.src = `${backEnd}/api/captcha?${Date.now()}`
    },
    // register
    checkUnameF () {
      api.check.uname({ uname: this.uname }).then((req) => {
        this.checkMsg.uname = req.status === 'failed' ? '昵称已被注册' : ''
      })
    },
    checkEmailF () {
      api.check.email({ email: this.email }).then((req) => {
        this.checkMsg.email = req.status === 'failed' ? '邮箱已被注册' : ''
      })
    },
    checkPwdMatchF () {
      if (this.pwd !== this.pwdRe && this.pwdRe.length) {
        this.checkMsg.pwdMatch = '输入密码不一致'
      } else {
        this.checkMsg.pwdMatch = ''
      }
    },
    handleLogin () {
      const data = {
        email: this.email,
        pwd: this.pwd,
        captcha: this.captcha
      }
      if (this.$refs.form.validate()) {
        api.session.login(data).then(({ session }) => {
          if (session) {
            this.$refs.form.reset()
            this.show = false
          }
        })
      }
    },
    handleRegister () {
      const data = {
        uname: this.uname,
        email: this.email,
        pwd: this.pwd,
        pwdRe: this.pwdRe,
        captcha: this.captcha
      }
      if (this.$refs.formR.validate()) {
        console.log(data)
        // api.session.register(data).then(({ data }) => {
        //   console.log(data)
        // })
        this.$refs.formR.reset()
        this.show = false
      }
    },
    handleCancel () {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      showLogin_s: state => state.session.showLogin_s
    }),
    show: {
      get () {
        return this.showLogin_s
      },
      set (value) {
        if (!value) {
          this.closeLogin()
        }
      }
    }
  }
}
</script>
