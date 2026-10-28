# AI Medicare

AI Medicare is an AI-powered medical document assistant that uses Retrieval-Augmented Generation (RAG) to help users understand health and wellness information from their uploaded PDF documents.

## Features

- Upload and process medical PDF documents.
- Extract text, split documents into chunks, and generate embeddings.
- Store and retrieve document vectors using Pinecone.
- Ask questions and generate context-aware answers using Google Gemini.
- Retrieve relevant document passages to support answers.

## Tech Stack

- **Backend:** Python, FastAPI
- **AI:** LangChain, Google Gemini
- **Embeddings and Vector Database:** Gemini Embeddings, Pinecone
- **PDF Processing:** PyPDFLoader
- **Frontend:** React

## Getting Started

1. Clone the repository.
2. Install the backend dependencies.
3. Configure your environment variables in a `.env` file.
4. Start the FastAPI server.
5. Launch the frontend and upload a PDF to begin asking questions.

## Environment Variables

Configure the required API keys in your `.env` file:

```env
GOOGLE_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

## Disclaimer

AI Medicare is an informational tool, not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.