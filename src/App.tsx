import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/layout/Loader'
import ScrollToTop from './components/layout/ScrollToTop'
import CustomCursor from './components/ui/CustomCursor'
import ChatWidget from './components/chatbot/ChatWidget'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useAppStore } from './lib/store'

export default function App() {
  const { i18n } = useTranslation()
  const { lang, theme } = useAppStore()

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.title = i18n.t('meta.title')
  }, [i18n, lang])

  return (
    <>
      <Loader />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
