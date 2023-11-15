import './assets/main.css'
import 'element-plus/theme-chalk/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import Element from 'element-plus'

createApp(App)
  .use(Element)
  .mount('#app')
