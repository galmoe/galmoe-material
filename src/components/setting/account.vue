<template>
<v-card>
  <div class="v-card__text"><h4>账户</h4></div>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        ref="name"
        v-model="name"
        :rules="[Rules.required, Rules.hasBlank, Rules.min(3), Rules.max(10)]"
        label="昵称"
      ></v-text-field>
      <v-text-field
        ref="sign"
        :rules="[Rules.required, Rules.min(3), Rules.max(35)]"
        v-model="sign"
        label="签名"
        counter="35"
      ></v-text-field>
      <v-text-field
        ref="email"
        v-model="email"
        :rules="[Rules.required, Rules.email]"
        label="邮箱"
      ></v-text-field>
    </v-card-text>
    <v-divider class="mt-5"></v-divider>
    <v-card-actions>
      <v-btn flat>Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</v-card>
</template>

<script>
import Rules from '../../public/rules'

export default {
  name: 'account',
  data: () => ({
    name: null,
    sign: '',
    email: '',
    Rules
  }),
  computed: {
    form () {
      return {
        name: this.name,
        sign: this.sign,
        email: ''
      }
    }
  },
  methods: {
    submit () {
      window.alert('submit')
    }
  }
}
</script>
