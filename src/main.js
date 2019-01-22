// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import {store} from './store/store'
import VueRouter from 'vue-router'
import {routes} from './routes'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.http.options.root = 'https://example.firebaseio.com/data.json'

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode:'history' //アドレスの#を取るのに必要
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
