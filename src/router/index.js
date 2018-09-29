import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import { routeConfig } from '@/router/config'

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    ...routeConfig,
    {
      path: '*',
      redirect: '/'
    }
  ]
})
export default router
