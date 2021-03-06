import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '@/libs/custfilter';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.prototype.$qs = qs;



Vue.config.productionTip = false
Vue.use(ElementUI,{ size: 'small' });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
