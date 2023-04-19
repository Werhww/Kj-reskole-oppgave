import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueDragscroll from "vue-dragscroll"

import './main.css'

const app = createApp(App)

app.use(router).use(VueDragscroll)
app.mount('#app')
