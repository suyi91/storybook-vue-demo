import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/main.css'
import 'element-plus/theme-chalk/index.css'

import { createApp, defineComponent } from 'vue'
import App from './App.vue'
import Element from 'element-plus'

import FormPage from './pages/FormPage.vue'
import TablePage from './pages/TablePage.vue'
import MarketingTaskPage from './demoPages/marketingTaskPage/index.vue'

const Default = defineComponent({ render: () => null })

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Default },
    { path: '/form', component: FormPage },
    { path: '/table', component: TablePage },
    { path: '/demo/marketingTaskPage', component: MarketingTaskPage },
  ]
})

createApp(App)
  .use(router)
  .use(Element)
  .mount('#app')
