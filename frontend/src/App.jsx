import { useRef, useState } from 'react'
import Brand from './components/Brand'
import DocumentSidebar from './components/DocumentSidebar'
import ChatPanel from './components/ChatPanel'

export default function App() {
  const [documents, setDocuments] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const fileInputRef = useRef(null)

  return (
    <div className="app-shell">
      <header className="mobile-brand-bar"><Brand /></header>
      <div className={`app-layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <DocumentSidebar documents={documents} setDocuments={setDocuments} />
        <ChatPanel
          onAttach={() => fileInputRef.current?.click()}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <input
        ref={fileInputRef}
        className="visually-hidden"
        type="file"
        accept=".pdf"
        onChange={(event) => {
          // The sidebar owns uploads. Dispatching a click to its file input keeps one upload flow.
          const sidebarInput = document.querySelector('.sidebar input[type="file"]')
          if (sidebarInput && event.target.files?.length) {
            const transfer = new DataTransfer()
            Array.from(event.target.files).forEach((file) => transfer.items.add(file))
            sidebarInput.files = transfer.files
            sidebarInput.dispatchEvent(new Event('change', { bubbles: true }))
          }
          event.target.value = ''
        }}
      />
    </div>
  )
}