import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import ar from './ar.json'

export const STORAGE_LANG_KEY = 'asaleeb-lang'

const savedLang = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_LANG_KEY) : null

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang === 'en' ? 'en' : 'ar',
  fallbackLng: 'ar',
  interpolation: { escapeValue: false },
})

export default i18n
