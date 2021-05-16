import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('@/views/404')
  }
]

const router = new VueRouter({
  routes
})

export default router
