import { useEffect, useRef, useState } from 'react'
import { Menu, CircleUserRound, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import Brand from './Brand'
import WelcomePanel from './WelcomePanel'
import ChatMessage from './ChatMessage'
import ChatComposer from './ChatComposer'
import { askQuestion } from '../services/api'

export default function ChatPanel({ onAttach, sidebarOpen, setSidebarOpen }) {
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, sending])

  async function sendMessage(text) {
    if (sending) return
    setError('')
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content: text }])
    setSending(true)
    try {
      const data = await askQuestion(text)
      const answer = extractAnswer(data)
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: answer }])
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  function extractAnswer(data) {
    if (typeof data === 'string') return data
    return data?.response ?? data?.answer ?? data?.message ?? JSON.stringify(data, null, 2)
  }

  return (
    <main className="chat-panel">
      <header className="chat-header">
        <button className="icon-button sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle documents sidebar">
          {sidebarOpen ? <PanelLeftClose size={19} /> : <PanelLeftOpen size={19} />}
        </button>
        <div className="chat-heading">
          <span className="chat-heading-title">AI Medical Assistant</span>
          <span className="status-line"><span className="status-dot" /> Ready to help</span>
        </div>
        <div className="header-actions">
          <span className="desktop-brand"><Brand /></span>
          <button className="profile-button" aria-label="Profile"><CircleUserRound size={21} /></button>
        </div>
      </header>

      <section className={`conversation ${messages.length === 0 ? 'conversation-empty' : ''}`} aria-live="polite">
        {messages.length === 0 ? (
          <WelcomePanel onSuggestion={sendMessage} />
        ) : (
          <div className="message-list">
            {messages.map((message) => <ChatMessage message={message} key={message.id} />)}
            {sending && <ChatMessage message={{ id: 'pending', role: 'assistant', pending: true }} />}
            {error && (
              <div className="chat-error" role="alert">
                <span>{error}</span>
                <button onClick={() => sendMessage(messages[messages.length - 1]?.content || '')}>Try again</button>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </section>

      <ChatComposer onSend={sendMessage} disabled={sending} onAttach={onAttach} />
    </main>
  )
}