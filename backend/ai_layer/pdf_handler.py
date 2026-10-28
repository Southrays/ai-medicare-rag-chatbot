import os
import shutil
from pathlib import Path

from fastapi import UploadFile

UPLOAD_DIR= Path("../uploaded_docs")

def save_uploaded_files(files:list[UploadFile])-> list[str]:
    os.makedirs(UPLOAD_DIR,exist_ok=True)
    
    file_paths: list[str] = []
    for file in files:
        if not file.filename:
            continue

        filename = Path(file.filename).name
        temp_path = UPLOAD_DIR / filename

        with temp_path.open("wb") as f:
            shutil.copyfileobj(file.file, f)

        file_paths.append(str(temp_path))

    return file_paths