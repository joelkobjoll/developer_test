import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import data from './data';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.use(BootstrapVue);
Vue.use(data);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
