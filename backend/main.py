from api_layer.middlewares.exception_handlers import catch_exception_middleware
from api_layer.routes import ask_question, upload_pdfs
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Medical Assistant API", 
    description="API for AI medical assistant chatbot"
)


#CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


#Middleware Exception Handler
app.middleware("http")(catch_exception_middleware)

#Routers
app.include_router(ask_question.router)
app.include_router(upload_pdfs.router)
