import { useRef, useState } from 'react'
import { Paperclip, Send, X } from 'lucide-react'

export default function ChatComposer({ onSend, disabled, onAttach }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  function submit(event) {
    event.preventDefault()
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
  }

  function handleChange(event) {
    setValue(event.target.value)
    event.target.style.height = 'auto'
    event.target.style.height = `${Math.min(event.target.scrollHeight, 140)}px`
  }

  return (
    <div className="composer-wrap">
      <form className="composer" onSubmit={submit}>
        <button className="composer-attach icon-button" type="button" onClick={onAttach} aria-label="Attach a document" title="Upload a document">
          <Paperclip size={20} />
        </button>
        <textarea
          ref={inputRef}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              submit(event)
            }
          }}
          placeholder="Type your message here..."
          aria-label="Message AI Medicare"
          disabled={disabled}
        />
        {value && <button className="composer-clear icon-button" type="button" onClick={() => setValue('')} aria-label="Clear message"><X size={16} /></button>}
        <button className="send-button" type="submit" disabled={!value.trim() || disabled} aria-label="Send message">
          <Send size={19} />
        </button>
      </form>
      <p className="medical-disclaimer">AI-generated information may be inaccurate. This assistant does not replace professional medical advice.</p>
    </div>
  )
}