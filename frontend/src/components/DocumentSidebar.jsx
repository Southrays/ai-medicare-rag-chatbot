import { useRef, useState } from 'react'
import { FileText, FileImage, File, UploadCloud, ShieldCheck, X, CheckCircle2, LoaderCircle } from 'lucide-react'
import { uploadDocument } from '../services/api'

function fileIcon(name = '') {
  if (/\.(png|jpe?g|webp)$/i.test(name)) return FileImage
  if (/\.pdf$/i.test(name)) return FileText
  return File
}

export default function DocumentSidebar({ documents, setDocuments }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  async function handleFiles(fileList) {
    const files = Array.from(fileList || [])
    setError('')
    for (const file of files) {
      if (!/\.(pdf)$/i.test(file.name)) {
        setError(`${file.name}: unsupported file type. Add a PDF file`)
        continue
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name}: file exceeds the 10 MB limit.`)
        continue
      }
      const id = `${file.name}-${file.lastModified}-${Math.random()}`
      setDocuments((prev) => [...prev, { id, name: file.name, size: file.size, status: 'uploading' }])
      try {
        await uploadDocument(file)
        setDocuments((prev) => prev.map((doc) => doc.id === id ? { ...doc, status: 'uploaded' } : doc))
      } catch (err) {
        setDocuments((prev) => prev.map((doc) => doc.id === id ? { ...doc, status: 'failed' } : doc))
        setError(`${file.name}: ${err.message}`)
      }
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  function removeDocument(id) {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="section-heading">
          <h2>Your Documents</h2>
          <span className="count-pill">{documents.length}</span>
        </div>
        <p className="sidebar-description">Upload a medical document for me to reference in our conversation.</p>

        <button
          type="button"
          className={`dropzone ${dragging ? 'dropzone-active' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            handleFiles(event.dataTransfer.files)
          }}
        >
          <UploadCloud size={34} strokeWidth={1.7} />
          <strong>Drag and drop a file here</strong>
          <span>or <span className="browse-text">click to browse</span></span>
          <small>PDF Documents</small>
        </button>
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.txt"
          multiple
          onChange={(event) => handleFiles(event.target.files)}
        />

        {error && <div className="upload-error" role="alert">{error}</div>}

        <div className="uploaded-heading">Uploaded Documents</div>
        {documents.length === 0 ? (
          <div className="empty-documents">
            <File size={28} strokeWidth={1.6} />
            <strong>No documents uploaded yet</strong>
            <span>Upload a document to get started.</span>
          </div>
        ) : (
          <div className="document-list">
            {documents.map((doc) => {
              const Icon = fileIcon(doc.name)
              return (
                <div className="document-item" key={doc.id}>
                  <span className="document-icon"><Icon size={19} /></span>
                  <span className="document-details">
                    <strong title={doc.name}>{doc.name}</strong>
                    <small>
                      {doc.status === 'uploading' ? 'Uploading…' : doc.status === 'uploaded' ? 'Uploaded successfully' : 'Upload failed'}
                    </small>
                  </span>
                  {doc.status === 'uploading'
                    ? <LoaderCircle className="spin status-icon" size={17} />
                    : doc.status === 'uploaded'
                      ? <CheckCircle2 className="success-icon" size={17} />
                      : <button className="icon-button remove-doc" onClick={() => removeDocument(doc.id)} aria-label={`Remove ${doc.name}`}><X size={16} /></button>}
                  {doc.status === 'uploaded' && <button className="icon-button remove-doc" onClick={() => removeDocument(doc.id)} aria-label={`Remove ${doc.name}`}><X size={16} /></button>}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="privacy-note">
        <span className="privacy-icon"><ShieldCheck size={19} /></span>
        <p><strong>Your data is private and secure.</strong><br />Files are used to support your conversation and responses.</p>
      </div>
    </aside>
  )
}