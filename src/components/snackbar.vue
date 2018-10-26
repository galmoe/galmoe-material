<template>
  <v-card>
    <v-snackbar
      v-model="show"
      top
      :color="color"
      :timeout="timeout"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="show = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: 'snackbar',
  data () {
    return {
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: 'Hello, I\'m a snackbar'
    }
  },
  computed: {
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
