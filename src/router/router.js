import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import PageEdit from '../pages/PageEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/share',
      name: 'share',
      component: PageEdit
    }
  ]
})