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
          <v-flex xs12>
            <v-text-field
              prepend-icon="mail"
              label="邮箱"
              :rules="[Rules.required, Rules.email]"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              type="password"
              prepend-icon="verified_user"
              label="密码"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="验证码"
              prepend-icon="update"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <img :src="captchaURL"
                 @click="changeCaptcha"
                 alt="点击刷新"
                 title="点击刷新"
                 class="captcha">
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn flat color="primary">More</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click.stop="show=false">Cancel</v-btn>
        <v-btn flat @click="dialog = false">Save</v-btn>
      </v-card-actions>
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
            <img :src="captchaURL"
                 ref="captcha"
                 @click="changeCaptcha"
                 alt="点击刷新"
                 title="点击刷新"
                 class="captcha">
          </v-form>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!validR" @click="handleRegister">注册</v-btn>
        <v-btn flat @click.stop="handleCancel">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Rules from '../public/rules'
import api from '../../api'
import { backEnd } from '../../config'

export default {
  name: 'login',
  props: ['visible'],
  data: () => ({
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
    //
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
        api.session.register(data).then(({ data }) => {
          console.log(data)
        })
        this.show = false
      }
    },
    handleCancel () {
      this.show = false
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>
