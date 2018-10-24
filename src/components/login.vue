<template>
  <v-dialog v-model="show" width="800px">
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
          <v-flex xs12>
            <v-text-field
              v-model.lazy="uname"
              prepend-icon="account_circle"
              label="昵称"
              @change="checkUnameF"
              :rules="[Rules.required, Rules.hasBlank, Rules.min(3), Rules.max(10)]"
              :error="check.uname.isErr"
              :error-messages="check.uname.msg"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model.lazy="email"
              prepend-icon="mail"
              label="邮箱"
              @change="checkEmailF"
              :error="check.uname.isErr"
              :error-messages="check.uname.msg"
              :rules="[Rules.required, Rules.email]"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="pwd"
              prepend-icon="lock"
              label="密码"
              type="password"
              :rules="[Rules.required, Rules.min(8), Rules.max(20)]"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="pwdRe"
              label="确认密码"
              type="password"
              :rules="[Rules.required, match]"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="验证码"
              prepend-icon="verified_user"
              :rules="[Rules.required, Rules.length(6)]"
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
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="handleRegister">注册</v-btn>
        <v-btn flat @click.stop="handleCancel">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Rules from '../public/rules'
import api from '../../api'

export default {
  name: 'login',
  props: ['visible'],
  data: () => ({
    tabs: ['login', 'register'],
    current: 'login',
    captchaURL: 'https://cas.baidu.com/?action=image',
    uname: '',
    email: '',
    pwd: '',
    pwdRe: '',
    Rules,
    check: {
      uname: {
        isErr: false,
        msg: ''
      },
      email: {
        isErr: false,
        msg: ''
      }
    }
  }),
  methods: {
    selectTab (tab) {
      this.current = tab
    },
    changeCaptcha () {
      // this.$refs.captcha.src = `${backEnd}/api/captcha?` + Date.now()
      this.captchaURL = `https://cas.baidu.com/?action=image&random=${Date.now()}`
    },
    // register
    checkUnameF () {
      api.check.uname({ uname: this.uname }).then((req) => {
        if (req.status === 'failed') {
          this.check.uname.isErr = true
          this.check.uname.msg = req.msg
        } else {
          this.check.uname.isErr = false
        }
      })
    },
    checkEmailF () {
      api.check.email({ email: this.email }).then((req) => {
        if (req.status === 'failed') {
          this.check.email.isErr = true
          this.check.email.msg = req.msg
        } else {
          this.check.email.isErr = false
        }
      })
    },
    handleLogin () {
    //
    },
    handleRegister () {
      this.show = false
    },
    handleCancel () {
      this.show = false
    }
  },
  computed: {
    match () {
      if (this.pwdRe !== this.pwd) {
        return '输入密码不一致'
      }
      return ''
    },
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
