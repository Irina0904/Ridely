import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCustomMarker from 'vue2-gmap-custom-marker'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueGeolocation)
Vue.use(GmapCustomMarker)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAIr6PgP2qeOEGiFdENEAItAd_sOsbpA-g',
    mapId: '14b7289127689dad'
  },
  installComponents: true
})

Vue.config.productionTip = false
export const serverBus = new Vue()

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
