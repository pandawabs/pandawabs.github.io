import { createApp } from 'vue'
import { createGtag } from 'vue-gtag'
import App from './App.vue'
import './style.css'

const gtag = createGtag({
  tagId: import.meta.env.PROD ? 'G-RTPE2FSJ8K' : ''
})
const app = createApp(App)

app.use(gtag)
app.mount('#app')
