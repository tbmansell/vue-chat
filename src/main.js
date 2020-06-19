import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Store from './services/Store'
import Config from './services/Config'

Vue.config.productionTip = true

// Bind the following to every Vue instance
Vue.prototype.$http = axios
Vue.prototype.$store = Store
Vue.prototype.$load = Store.get
Vue.prototype.$save = Store.set
Vue.prototype.$config = Config

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
