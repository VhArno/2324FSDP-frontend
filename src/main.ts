import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import { getCsrfCookie } from './services/authService'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)

<<<<<<< Updated upstream
app.mount('#app')

await getCsrfCookie().catch(() => {})
=======
await getCsrfCookie()

app.mount('#app')
>>>>>>> Stashed changes
