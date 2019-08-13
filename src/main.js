import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Antd from 'ant-design-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import 'ant-design-vue/dist/antd.less'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import touch from 'vue-directive-touch';

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.use(touch);

// Vue.use(VueAwesomeSwiper);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
