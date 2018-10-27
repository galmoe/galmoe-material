<template>
  <v-card>
    <div class="v-card__text"><h4>密码</h4></div>
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            v-model="pwdOr"
            :rules="[Rules.required, Rules.min(8), Rules.max(20)]"
            type="password"
            label="原密码"
            required
          ></v-text-field>
          <v-text-field
            v-model.lazy="pwd"
            :rules="[Rules.required, Rules.min(8), Rules.max(20)]"
            label="新密码"
            type="password"
            :error-messages="pwdMatch"
            required
          ></v-text-field>
          <v-text-field
            v-model.lazy="pwdRe"
            :rules="[Rules.required, Rules.min(8), Rules.max(20)]"
            type="password"
            label="确认密码"
            @change="checkPwdMatchF"
            :error-messages="pwdMatch"
            required
          ></v-text-field>
          <v-text-field
            v-model="captcha"
            :rules="[Rules.required, Rules.length(6)]"
            label="验证码"
            required
          ></v-text-field>
          <img :src="captchaURL"
               ref="captcha"
               @click="changeCaptcha"
               alt="点击刷新"
               title="点击刷新"
               class="captcha">
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-btn block color="success" :disabled="!valid" @click="submit">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import Rules from '../../public/rules'
import { backEnd } from '../../../config'
import api from '../../../api'

export default {
  name: 'safety',
  data: () => ({
    valid: true,
    pwdOr: '',
    pwd: '',
    pwdRe: '',
    captcha: '',
    captchaURL: `${backEnd}/api/captcha`,
    pwdMatch: '',
    Rules
  }),
  methods: {
    checkPwdMatchF () {
      this.pwdMatch = this.pwd === this.pwdRe ? '' : '输入密码不一致'
    },
    changeCaptcha () {
      this.$refs.captcha.src = `${backEnd}/api/captcha?${Date.now()}`
    },
    submit () {
      const data = {
        pwdOr: this.pwdOr,
        pwd: this.pwd,
        captcha: this.captcha
      }
      if (this.$refs.form.validate()) {
        api.session.safety(data).then(({ type }) => {
          if (type === 'success') {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          }
        })
      }
    }
  }
}
</script>
