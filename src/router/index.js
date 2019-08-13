import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import HelloWord from '../components/HelloWord.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'app',
            component: App
        },
        {
            path: '/hello',
            name: 'HelloWord',
            component: HelloWord
        }
    ]
})