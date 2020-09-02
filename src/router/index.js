import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const RsatestComponent = () => import('../views/Rsatest.vue')
const ObserveComponent  = () => import('../views/Observe.vue')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // rem
  {
    path:'/remtest',
    name: 'Remdemo',
    component: () => import(/* webpackChunkName: "remtest" */ '../views/remDemo/Remtest.vue')
  },
  // scroll
  {
    path:'/scrolltest',
    name: 'Scrolldemo',
    component: () => import(/* webpackChunkName: "scrolltest" */ '../views/scrollDemo/Scrolltest.vue')
  },
  // echart
  {
    path:'/echarttest',
    name: 'Echartdemo',
    component: () => import(/* webpackChunkName: "echarttest" */ '../views/echartDemo/Echart.vue')
  },
  // tree
  {
    path: '/tree',
    name: 'Tree',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Tree" */ '../views/treeDemo/Tree.vue')
  },
  {
    path:'/rsatest',
    name: 'Rsatest',
    component: RsatestComponent
  },
  {
    path:'/observe',
    name: 'Observe',
    component: ObserveComponent
  }
]

const router = new VueRouter({
  routes
})

export default router
