import { createI18n } from 'vue-i18n'
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'

export default createI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  },
  numberFormats: {
    zh:{
      currency: {
        style: "currency",
        currency:"RMB"
      }
    },
    en:{
      currency: {
        style: "currency",
        currency:"USD"
      }}
  }
})
