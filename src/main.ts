import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueQueryPlugin } from '@tanstack/vue-query'

import router from './router'
import { getCsrfCookie } from './services/authService'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'

const app = createApp(App)
app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')

await getCsrfCookie().catch(() => {})
