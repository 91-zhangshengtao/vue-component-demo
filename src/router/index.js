import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const RsatestComponent = () => import('../views/Rsatest.vue')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tree',
    name: 'Tree',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tree" */ '../views/Tree.vue')
  },
  {
    path:'/rsatest',
    name: 'Rsatest',
    component: RsatestComponent
  }
]

const router = new VueRouter({
  routes
})

export default router
