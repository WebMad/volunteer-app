import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js';
import Vuex from 'vuex'
import axios from './plugins/axios'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
Vue.config.productionTip = false

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(IconsPlugin);
Vue.use(Vuex);

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
