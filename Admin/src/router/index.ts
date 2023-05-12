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
      path: '/chat',
      name: 'chat',
      component: () => import('../views/Chat.vue')
    },
    {
      path: '/chat/:studentID',
      name: 'personalChat',
      component: () => import('../views/Chat.vue')
    },
    {
      path: '/user/:studentID',
      name: 'User',
      component: () => import('../views/User.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin.vue')
    },
  ]
})

export default router
