import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import * as filters from './filters'
import { timeFilter } from './public/utils'
import Vuetify from 'vuetify'
import vueCropper from 'vue-cropper'
import Viewer from 'v-viewer'

// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(vueCropper)
Vue.use(Viewer)

Vue.config.productionTip = false

// filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.filter('timeFilter', (date, limit) => {
  console.log('date', date, limit)
  debugger
  return timeFilter(date, limit)
})

// directives
Vue.directive('permission-click', {
  bind: (el, binding, vnode) => {
    el.addEventListener('click', (e) => {
      if (!store.getters['session/isLogined']) {
        store.dispatch('session/SHOWLOGIN')
      } else {
        typeof binding.value === 'function' && binding.value()
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#galmoe')
