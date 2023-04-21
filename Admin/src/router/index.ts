import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/chat/:studentID',
      name: 'chat',
      component: () => import('../views/Chat.vue')
    },
    {
      path: '/user/:studentID',
      name: 'User',
      component: () => import('../views/User.vue')
    },
  ]
})

export default router
