import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import Vuetify from 'vuetify'
import vueCropper from 'vue-cropper'
import Viewer from 'v-viewer'

// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(vueCropper)
Vue.use(Viewer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#galmoe')
