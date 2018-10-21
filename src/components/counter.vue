<template>
  <div>
    <button @click="increment">increment</button>
    <br>
    <button @click="decrement">decrement</button>
    <br>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <br>
    <button @click="incrementAsync">incrementAsync</button>
    <br>
    <!--1x-->
    <!--<div style="width: 100%">now {{ $store.state.counter.count }}, is {{ evenOrOdd }}</div>-->
    <!--2x-->
    <div style="width: 100%">now {{ count }}, is {{ evenOrOdd }}</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'counter',
  // 1x
  /* computed: {
      evenOrOdd () {
        return this.$store.state.counter.count % 2 === 0 ? 'even' : 'odd'
      }
    },
    methods: {
      // ...mapActions('/counter/')
      increment () {
        this.$store.dispatch('counter/increment')
      },
      decrement () {
        this.$store.dispatch('counter/decrement')
      },
      incrementIfOdd () {
        this.$store.dispatch('counter/incrementIfOdd')
      },
      incrementAsync () {
        this.$store.dispatch('counter/incrementAsync')
      }
    } */
  // 2x
  computed: {
    ...mapState({
      count: state => state.counter.count
    }),
    // v2
    // ...mapGetters({
    //   evenOrOdd: 'counter/evenOrOdd'
    // })
    // v3
    ...mapGetters('counter', ['evenOrOdd'])
  },
  methods: {
    // v1
    // ...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
    // v2
    // ...mapActions({
    //   increment: 'counter/increment',
    //   decrement: 'counter/decrement',
    //   incrementIfOdd: 'counter/incrementIfOdd',
    //   incrementAsync: 'counter/incrementAsync'
    // }),
    // v3
    ...mapActions('counter', [
      'increment',
      'decrement',
      'incrementIfOdd',
      'incrementAsync'
    ])
    // incrementIfOdd () {
    //   this.$store.dispatch('counter/incrementIfOdd')
    // },
  }
}
</script>
