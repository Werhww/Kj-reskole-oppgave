import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Booking from '../views/Booking.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Booking
    }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
