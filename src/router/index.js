import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/index')
    },
    {
      path: '/strategy',
      name: 'about',
      component: () => import('@/views/Strategy/index')
    },
    {
      path: '/centre',
      name: 'centre',
      component: () => import('@/views/TenderingCentre/index')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Text/index')
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
})
export default router
