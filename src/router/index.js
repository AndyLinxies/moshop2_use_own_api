import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '../components/navBar.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NavBar',
    component: NavBar
  },
  {
    path: '/dashboard/',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue')
  },
  {
    path: '/dashboard/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Profile.vue')
  },
  {
    path: '/dashboard/personal-shop',
    name: 'PersonalShop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/PersonalShop.vue')
  },
  {
    path: '/dashboard/panier',
    name: 'Panier',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Panier.vue')
  },
  {
    path: '/dashboard/commandes',
    name: 'Commandes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Commandes.vue')
  },
  {
    path: '/dashboard/all-shops',
    name: 'AllShops',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AllShops" */ '../pages/AllShops.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
