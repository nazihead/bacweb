// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http'
import Vuex from 'vuex'
import store from './store/index'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.prototype.$store = store
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
