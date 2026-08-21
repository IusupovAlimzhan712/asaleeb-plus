import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { useAppStore } from '../../lib/store'
import { getChatResponse } from './responses'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
}

let idCounter = 0
const nextId = () => ++idCounter

export default function ChatWidget() {
  const { t } = useTranslation()
  const { chatOpen, setChatOpen, lang } = useAppStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const quickReplies = t('chatbot.quickReplies', { returnObjects: true }) as unknown as string[]

  useEffect(() => {
    setMessages([{ id: nextId(), from: 'bot', text: t('chatbot.welcome') }])
  }, [lang, t])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { id: nextId(), from: 'user', text: trimmed }])
    setInput('')
    setTyping(true)
    const delay = 500 + Math.min(900, trimmed.length * 18)
    setTimeout(() => {
      const reply = getChatResponse(trimmed, lang, t('chatbot.fallback'))
      setMessages((m) => [...m, { id: nextId(), from: 'bot', text: reply }])
      setTyping(false)
    }, delay)
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        aria-label={t('chatbot.launcherLabel')}
        whileTap={{ scale: 0.92 }}
        className="fixed z-[9999] flex h-14 w-14 items-center justify-center rounded-full shadow-[var(--shadow-soft)] cursor-pointer focus-ring"
        style={{
          background: 'var(--accent)',
          color: 'var(--accent-foreground)',
          insetInlineEnd: 'max(1.5rem, env(safe-area-inset-right))',
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {chatOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label={t('chatbot.title')}
            className="glass-overlay fixed z-[9999] flex h-[min(28rem,70dvh)] w-[min(92vw,23rem)] flex-col overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]"
            style={{
              insetInlineEnd: 'max(1.5rem, env(safe-area-inset-right))',
              bottom: 'calc(6rem + env(safe-area-inset-bottom))',
            }}
          >
            <div className="flex items-center gap-3 border-b p-4" style={{ borderColor: 'var(--border)' }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--accent)' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-foreground)' }} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{t('chatbot.title')}</p>
                <p className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-faint)' }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#4ade80' }} />
                  {t('chatbot.online')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label={t('chatbot.close')}
                className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[var(--surface-strong)] focus-ring"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div key={m.id} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <p
                    className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                    style={
                      m.from === 'user'
                        ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderEndEndRadius: 4 }
                        : { background: 'var(--surface-strong)', borderStartStartRadius: 4 }
                    }
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <span className="flex items-center gap-1 rounded-2xl px-4 py-3" style={{ background: 'var(--surface-strong)' }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: 'var(--text-faint)' }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {messages.length <= 1 && !typing && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {Array.isArray(quickReplies) &&
                    quickReplies.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="cursor-pointer rounded-full border px-3 py-1.5 text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-ring"
                        style={{ borderColor: 'var(--border-strong)' }}
                      >
                        {q}
                      </button>
                    ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t p-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 rounded-full border bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{ borderColor: 'var(--border)' }}
              />
              <button
                type="submit"
                aria-label={t('chatbot.send')}
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
                style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
              >
                <Send size={15} className="rtl:-scale-x-100" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
