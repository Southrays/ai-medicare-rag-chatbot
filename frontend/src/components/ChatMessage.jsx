import { Plus } from 'lucide-react'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'
  return (
    <article className={`message-row ${isUser ? 'message-user-row' : 'message-assistant-row'}`}>
      {!isUser && <span className="assistant-avatar"><Plus size={17} strokeWidth={3.5} /></span>}
      <div className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'}`}>
        {message.pending ? (
          <div className="typing-indicator" aria-label="AI Medicare is thinking"><i /><i /><i /></div>
        ) : (
          <div className="message-text">{message.content}</div>
        )}
      </div>
    </article>
  )
}