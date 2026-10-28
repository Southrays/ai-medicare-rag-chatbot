import { FileText, CircleHelp, HeartPulse, ClipboardPlus, ChevronRight, Plus } from 'lucide-react'

const suggestions = [
  { title: 'Summarize a document', description: 'Get a clear summary of your medical records or reports.', icon: FileText, prompt: 'Please summarize my medical document in clear, simple language.' },
  { title: 'Explain a medical term', description: 'Break down complex medical terms in simple language.', icon: CircleHelp, prompt: 'Can you explain a medical term in simple language?' },
  { title: 'Answer health questions', description: 'Ask about symptoms, conditions, medications, and more.', icon: HeartPulse, prompt: 'I have a health-related question.' },
  { title: 'Understand my results', description: 'Help me understand the information in my lab results.', icon: ClipboardPlus, prompt: 'Help me understand my lab results and what the values may mean.' },
]

export default function WelcomePanel({ onSuggestion }) {
  return (
    <div className="welcome-panel">
      <div className="welcome-mark"><Plus size={38} strokeWidth={4} /></div>
      <h1>Welcome to AI Medicare</h1>
      <p className="welcome-copy">
        I’m your AI medical assistant. Upload a document or ask me a question,<br className="desktop-break" />
        and I’ll help you understand your health information, explain medical terms,<br className="desktop-break" />
        and provide helpful, clear guidance.
      </p>
      <div className="suggestion-grid">
        {suggestions.map(({ title, description, icon: Icon, prompt }) => (
          <button className="suggestion-card" key={title} onClick={() => onSuggestion(prompt)}>
            <span className="suggestion-icon"><Icon size={23} strokeWidth={1.8} /></span>
            <span className="suggestion-content">
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
            <ChevronRight className="suggestion-chevron" size={18} />
          </button>
        ))}
      </div>
    </div>
  )
}