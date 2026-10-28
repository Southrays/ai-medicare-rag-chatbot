from dotenv import load_dotenv
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import (
    create_stuff_documents_chain,
)
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

def get_llm_chain(retriever):
    model = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash-lite",
        temperature=0,
    )

    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            """You are MediBot, an AI assistant that helps users
    understand medical documents.

    Answer using only the provided context.

    Context:
    {context}

    If the context does not contain the answer, say:
    "I'm sorry, but I couldn't find relevant information
    in the provided documents."

    Respond calmly, factually, and respectfully.
    Do not invent facts or provide medical diagnoses.
    """
        ),
        ("human", "{input}"),
    ])

    document_chain = create_stuff_documents_chain(
        model,
        prompt,
    )

    retrieval_chain = create_retrieval_chain(
        retriever,
        document_chain,
    )

    return retrieval_chain
