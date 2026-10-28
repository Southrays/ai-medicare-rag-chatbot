# AI Medicare frontend

React + Vite + Tailwind CSS v4 frontend for the AI Medicare document chatbot. It is designed to resemble the provided off-white/sage UI reference and connects to a FastAPI backend.

Tailwind CSS v4 is integrated through `@tailwindcss/vite`; no `tailwind.config.js` or PostCSS configuration is required.

## Requirements

- Node.js 18+ (Node 20+ recommended)
- Your FastAPI backend running locally

## Install and run

From this folder:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Backend connection

Create a `.env` file in this frontend folder (or copy `.env.example` to `.env`) and set:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Restart Vite after changing environment variables.

The frontend currently expects:
- `POST /ask/` with form field `question`
- `POST /upload/` with form field `files` containing one uploaded file

Check your FastAPI route paths and form field names. If your upload endpoint uses a different path or expects `file` instead of `files`, update `src/services/api.js`.

## FastAPI CORS

Because Vite runs on port 5173 and FastAPI on port 8000, enable CORS in FastAPI for the frontend origin:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Keep only one CORS middleware configuration.

## Notes

- Do not put Google, Anthropic, or Pinecone secrets in frontend environment variables. The browser must only call your FastAPI backend.
- Tailwind CSS is enabled and the custom component styles preserve the intended off-white and muted-sage design. The interface handles upload, chat, loading, and request-error states. The actual upload endpoint must accept the listed file types and return appropriate responses.
- Medical information is for general informational support and does not replace a qualified clinician.
