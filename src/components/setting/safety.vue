<template>
  <v-card>
    <div class="v-card__text"><h4>密码</h4></div>
    <v-card ref="form">
      <v-card-text>
        <v-text-field
          v-model="pwd"
          :append-icon="show ? 'visibility_off' : 'visibility'"
          :rules="[Rules.required, rules.min(8)]"
          :type="show ? 'text' : 'password'"
          label="原密码"
          counter
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field
          v-model="pwd"
          :rules="[Rules.required, Rules.min(8)]"
          label="新密码"
          counter
        ></v-text-field>
        <v-text-field
          v-model="pwd"
          :rules="[Rules.required, rules.min(8)]"
          :type="password"
          label="确认密码"
          counter
        ></v-text-field>
        <v-text-field
          v-model="pwd"
          :rules="[Rules.required, Rules.length(6)]"
          :type="password"
          label="验证码"
          counter
        ></v-text-field>
        <img src="https://cas.baidu.com/?action=image" alt="">
      </v-card-text>
      <v-divider class="mt-5"></v-divider>
      <v-card-actions>
        <v-btn flat>Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-slide-x-reverse-transition>
          <v-tooltip
            v-if="formHasErrors"
            left
          >
            <v-btn
              slot="activator"
              icon
              class="my-0"
              @click="resetForm"
            >
              <v-icon>refresh</v-icon>
            </v-btn>
            <span>Refresh form</span>
          </v-tooltip>
        </v-slide-x-reverse-transition>
        <v-btn color="primary" flat @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import Rules from '../../public/rules'

export default {
  name: 'safety',
  data: () => ({
    show: false,
    errorMessages: '',
    name: null,
    pwd: '',
    address: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    formHasErrors: false,
    password: 'Password',
    Rules,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match'),
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  }),

  computed: {
    form () {
      return {
        name: this.name,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        country: this.country
      }
    }
  },

  watch: {
    name () {
      this.errorMessages = ''
    }
  },

  methods: {
    addressCheck () {
      this.errorMessages = this.address && !this.name
        ? 'Hey! I\'m required'
        : ''

      return true
    },
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit () {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
    }
  }
}
</script>
