<template>
<v-card>
  <div class="v-card__text"><h4>账户</h4></div>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <div class="avatar-upload-container clearfix">
          <img :src="(avatar_s ? avatar_s: 'https://raw.githubusercontent.com/galmoe/galmoe-ts/master/public/images/Akkarin.webp')"
               style="width: 150px; height: 150px;">
          <label class="btn button-change-avatar text-center" @click="showUpload = true">Upload</label>
          <upload :containerMaxW="500" :containerMaxH="500" :visible="showUpload" @close="showUpload=false" :type="'avatar'" />
        </div>
        <v-text-field
          ref="uname"
          v-model="uname"
          :rules="[Rules.required, Rules.hasBlank, Rules.min(3), Rules.max(10)]"
          label="昵称"
          required
        ></v-text-field>
        <v-text-field
          ref="sign"
          :rules="[Rules.max(35)]"
          v-model="sign"
          label="签名"
          counter="35"
          required
        ></v-text-field>
        <v-text-field
          ref="email"
          v-model="email"
          :rules="[Rules.required, Rules.email]"
          label="邮箱"
          required
        ></v-text-field>
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
import upload from '@/components/upload'
import { mapState } from 'vuex'
import api from '../../../api'

export default {
  name: 'account',
  data: () => ({
    uname: '',
    sign: '',
    email: '',
    Rules,
    valid: true,
    showUpload: false
  }),
  created () {
    api.session.privateInfo().then(({ session }) => {
      this.uname = session.uname
      this.sign = session.sign
      this.email = session.email
    })
  },
  computed: {
    ...mapState({
      avatar_s: state => state.session.avatar_s
    })
  },
  methods: {
    submit () {
      const data = {
        uname: this.uname,
        sign: this.sign,
        email: this.email
      }
      if (this.$refs.form.validate()) {
        api.session.update(data).then(({ type }) => {
          if (type === 'success') {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          }
        })
      }
    }
  },
  components: {
    upload
  }
}
</script>
<style scoped>
  .avatar-upload-container {
    width: 150px;
    overflow: hidden;
  }
  .btn {
    position: relative;
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-repeat: repeat-x;
    background-position: -1px -1px;
    background-size: 110% 110%;
    border: 1px solid rgba(27,31,35,0.2);
    border-radius: 0.25em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: #24292e;
    background-color: #eff3f6;
    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
  }
  .btn:hover {
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);
    background-position: -0.5em;
    border-color: rgba(27,31,35,0.35);
  }
  .button-change-avatar {
    margin-top: 16px;
    width: 150px;
    overflow: hidden;
  }
</style>
