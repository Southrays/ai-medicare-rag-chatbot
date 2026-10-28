
from ai_layer.load_vectorstore import load_vectorstore
from api_layer.monitoring.logger import logger
from fastapi import APIRouter, HTTPException, UploadFile

router = APIRouter()


@router.post("/upload_pdfs/")
async def upload_pdfs(
    files: list[UploadFile],
):
    try:
        logger.info("Received uploaded files")
        load_vectorstore(files)
        logger.info("Document added to vectorstore")

        return {
            "message": "Files processed and vectorstore updated"
        }

    except ValueError:
        logger.exception("Invalid PDF upload")
        raise HTTPException(
            status_code=400,
            detail="The uploaded files could not be processed."
        ) from None
