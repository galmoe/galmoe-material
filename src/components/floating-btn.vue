<template>
  <v-speed-dial
    v-model="fab"
    :bottom="bottom"
    :right="right"
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
  >
    <v-btn
      slot="activator"
      v-model="fab"
      color="blue darken-2"
      dark
      fab
    >
      <v-icon>account_circle</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="green"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="indigo"
    >
      <v-icon>add</v-icon>
      <span class="num">233</span>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="red"
    >
      <v-icon>delete</v-icon>
    </v-btn>
    <v-btn
      >
    <v-badge right>
      <span slot="badge">6</span>
      <v-icon>delete</v-icon>
    </v-badge>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    direction: 'top',
    fab: true,
    fling: false,
    hover: true,
    tabs: null,
    right: true,
    bottom: true,
    transition: 'slide-x-reverse-transition'
  })
}
</script>
<style>
.v-speed-dial {
    position: fixed;
  }
</style>
