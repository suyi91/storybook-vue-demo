import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/main.css'
import 'element-plus/theme-chalk/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import Element from 'element-plus'

import FormPage from './pages/FormPage.vue'
import TablePage from './pages/TablePage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/form', component: FormPage },
    { path: '/table', component: TablePage }
  ]
})

createApp(App)
  .use(router)
  .use(Element)
  .mount('#app')
