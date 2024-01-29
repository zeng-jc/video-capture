import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'video.js/dist/video-js.css'
import './assets/reset.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
