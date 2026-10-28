
import os
from typing import Annotated

from ai_layer.llm import get_llm_chain
from ai_layer.query_handler import query_chain
from api_layer.monitoring.logger import logger
from fastapi import APIRouter, Form, HTTPException
from langchain_core.callbacks import CallbackManagerForRetrieverRun
from langchain_core.documents import Document
from langchain_core.retrievers import BaseRetriever
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from pinecone import Pinecone

router = APIRouter()


class SimpleRetriever(BaseRetriever):
    docs: list[Document]

    def _get_relevant_documents(
        self,
        query: str,
        *,
        run_manager: CallbackManagerForRetrieverRun,
    ) -> list[Document]:
        return self.docs


@router.post("/ask/")
async def ask_question(
    question: Annotated[str, Form()],
):
    try:
        logger.info("User query received")

        pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
        index = pc.Index(os.environ["PINECONE_INDEX_NAME"])

        embed_model = GoogleGenerativeAIEmbeddings(
            model="models/gemini-embedding-001",
            output_dimensionality=768,
        )
        
        embedded_query = embed_model.embed_query(question)

        res = index.query(
            vector=embedded_query,
            top_k=3,
            include_metadata=True,
        )

        docs = []
        for match in res.matches or []:
            metadata = match.metadata or {}
            docs.append(
                Document(
                    page_content=metadata.get("text", ""),
                    metadata=metadata,
                )
            )

        retriever = SimpleRetriever(docs=docs)
        chain = get_llm_chain(retriever)
        result = query_chain(chain, question)

        logger.info("Query successful")
        return result

    except (ValueError, KeyError):
        logger.exception("Invalid query or missing configuration")
        raise HTTPException(
            status_code=400,
            detail="The query or required configuration is invalid.",
        ) from None
