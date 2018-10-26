<template>
  <v-snackbar
    v-model="show"
    top
    :color="type"
    :timeout="timeout"
  >
    {{ msg }}
    <v-btn
      flat
      @click="closeMsg"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      timeout: 5000
    }
  },
  computed: {
    ...mapState({
      msg: state => state.message.msg,
      type: state => state.message.type
    }),
    ...mapGetters({
      hasMsg: 'message/hasMsg'
    }),
    show: {
      get () {
        return this.hasMsg
      },
      set (value) {
        if (!value) {
          this.closeMsg()
        }
      }
    }
  },
  methods: {
    ...mapActions({
      closeMsg: 'message/closeMsg'
    })
  }
}
</script>
