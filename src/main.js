import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Antd from 'ant-design-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
