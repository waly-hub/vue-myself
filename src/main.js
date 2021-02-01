import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/core/index.js'
import './permission'
import '../mock/user.js'

Vue.config.productionTip = false
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
