import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';
import store from './store';
import qs from 'qs';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vant);
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
