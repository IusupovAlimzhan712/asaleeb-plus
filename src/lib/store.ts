import { create } from 'zustand'
import i18n, { STORAGE_LANG_KEY } from '../i18n'

export type Lang = 'ar' | 'en'
export type Theme = 'dark' | 'light'

const STORAGE_THEME_KEY = 'asaleeb-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem(STORAGE_THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return 'light'
}

interface AppState {
  lang: Lang
  theme: Theme
  chatOpen: boolean
  menuOpen: boolean
  setLang: (lang: Lang) => void
  toggleLang: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setChatOpen: (open: boolean) => void
  setMenuOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  lang: (i18n.language as Lang) || 'ar',
  theme: getInitialTheme(),
  chatOpen: false,
  menuOpen: false,
  setLang: (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem(STORAGE_LANG_KEY, lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    set({ lang })
  },
  toggleLang: () => get().setLang(get().lang === 'ar' ? 'en' : 'ar'),
  setTheme: (theme) => {
    localStorage.setItem(STORAGE_THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
    set({ theme })
  },
  toggleTheme: () => get().setTheme(get().theme === 'dark' ? 'light' : 'dark'),
  setChatOpen: (chatOpen) => set({ chatOpen }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}))
