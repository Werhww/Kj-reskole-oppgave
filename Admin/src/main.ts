import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue_dragscroll from 'vue-dragscroll'

import './main.css'

const app = createApp(App)

app.use(router).use(vue_dragscroll)

app.mount('#app')
