import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        requireAuth: true,
      },
      component: () => import('@/views/Home/index')
    },
    {
      path: '/strategy',
      name: 'about',
      meta: {
        title: '策略库',
        requireAuth: true,
     },
      component: () => import('@/views/Strategy/index')
    },
    {
      path: '/centre',
      name: 'centre',
      meta: {
        title: '招标中心',
        requireAuth: true,
      },
      component: () => import('@/views/TenderingCentre/index')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index')
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log(to,from)
//   next()
// })


//判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
      if (sessionStorage.getItem('username')) {// 判断是否登录
        next()
      } else {// 没登录则跳转到登录界面
        next({
          path: '/login'
        })
      }
  } else {
    next()
  }
 })
export default router
