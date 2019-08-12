import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueAxios, axios)

Vue.use(VueAwesomeSwiper);


new Vue({
  render: h => h(App),
}).$mount('#app')
