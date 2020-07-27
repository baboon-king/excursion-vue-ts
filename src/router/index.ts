import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/user/reg',
    name: 'reg',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/user/updata',
    name: 'updataUserInfo',
    component: () => import('@/views/UpdataUserInfo.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/Product.vue')
  },
  {
    path: '/travelAround',
    name: 'travelAround',
    component: () => import('@/views/TravelAround.vue')
  },
  {
    path: '/independentTravel',
    name: 'independentTravel',
    component: () => import('@/views/IndependentTravel.vue')
  },
  {
    path: '/familyTour',
    name: 'familyTour',
    component: () => import('@/views/FamilyTour.vue')
  },
  {
    path: '/attraction/details/:id',
    name: 'attractionDetails',
    component: () => import('@/views/AttractionDetails.vue')
  },
  {
    path: '/product/details/:id',
    name: 'productDetails',
    component: () => import('@/views/ProductDetails.vue')
  },
  {
    path: '/user/order',
    name: 'userOrder',
    component: () => import('@/views/UserOrder.vue')
  },
]

const router = new VueRouter({
  // mode: "history",
  routes
})

export default router
