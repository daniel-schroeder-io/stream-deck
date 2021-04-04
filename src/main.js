import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
require('dotenv').config();
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css' 
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
