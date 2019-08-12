import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
