import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import OmOss from '../views/OmOss.vue'
import Bruker from '../views/Bruker.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/omoss',
      name: 'omoss',
      component: OmOss
    }, 
    {
      path: '/Bruker',
      name: 'Bruker',
      component: Bruker
    }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
