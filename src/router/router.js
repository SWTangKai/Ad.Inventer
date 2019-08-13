import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import front from '../pages/frontpage'
import PageEdit from '../pages/PageEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'front',
      component: front
    },
    {
      path: '/index',
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