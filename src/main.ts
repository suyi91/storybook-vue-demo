import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/main.css'
import 'element-plus/theme-chalk/index.css'

import { createApp, defineComponent } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import FormPage from './pages/FormPage.vue'
import TablePage from './pages/TablePage.vue'
import MarketingTaskPage from './demoPages/marketingTaskPage/index.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

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

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .mount('#app')
