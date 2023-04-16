import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'
import Icon from './directives/icon'
import i18n from './includes/i18n'
// import { registerSW } from 'virtual:pwa-register'
import GlobalComponents from './includes/_global'
import prograssBar from './includes/prograss-bar'

import './assets/base.css'
import './assets/main.css'
import 'nprogress/nprogress.css'

// registerSW({ immediate: true })

prograssBar(router)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
app.use(i18n)
app.use(GlobalComponents)

app.directive('icon', Icon)

app.mount('#app')
