<template>
<v-card>
  <div class="v-card__text"><h4>账户</h4></div>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <div class="avatar-upload-container">
          <img :src="(avatar_s ? avatar_s: 'https://raw.githubusercontent.com/galmoe/galmoe-ts/master/public/images/akkarin.jpg')"
               style="width: 150px; height: 150px;" @click="showUpload = true">
          <v-btn outline @click="showUpload = true">
            <i aria-hidden="true" class="v-icon material-icons">cloud_upload</i>上传头像
          </v-btn>
          <upload :containerMaxW="500" :containerMaxH="500" :visible="showUpload" @close="showUpload=false" @uploadCb="getSrc" :type="'avatar'" />
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
import upload from '@/components/upload'
import Rules from '../../public/rules'
import { mapState, mapActions } from 'vuex'
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
    ...mapActions({
      uploadCb: 'user/uploadCb'
    }),
    getSrc (src) {
      const payload = {
        src,
        type: 'avatar'
      }
      this.uploadCb(payload)
    },
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
