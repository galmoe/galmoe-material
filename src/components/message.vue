<template>
  <div class="message">
    <v-alert
      :value="hasMsg"
      dismissible
      :color="type"
      :icon="iconType"
      outline
      transition="fade-transition"
    >
      {{ msg }}
    </v-alert>

    <!--<div class="text-xs-center">-->
      <!--<v-btn-->
        <!--v-if="!hasMsg"-->
        <!--color="primary"-->
        <!--dark-->
        <!--@click="closeMsg"-->
      <!--&gt;-->
        <!--Reset-->
      <!--</v-btn>-->
    <!--</div>-->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'message',
  data () {
    return {
      alert: true,
      vtype: 'error'
    }
  },
  computed: {
    ...mapState({
      msg: state => state.message.msg,
      type: state => state.message.type
    }),
    ...mapGetters({
      hasMsg: 'message/hasMsg',
      iconType: 'message/iconType'
    })
  },
  methods: {
    ...mapActions({
      closeMsg: 'message/closeMsg'
    })
  }
}
</script>
