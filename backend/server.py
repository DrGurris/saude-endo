from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from utils.database import Database
from routes.auth import router as auth_router
from routes.questionnaire import router as questionnaire_router
from routes.symptoms import router as symptoms_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await Database.connect()
    yield
    # Shutdown
    await Database.disconnect()

app = FastAPI(
    title="Saude API",
    description="API para la plataforma de salud femenina Saude - Clínica de la Mujer",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(questionnaire_router)
app.include_router(symptoms_router)

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Saude API"}

@app.get("/")
async def root():
    return {"message": "Bienvenida a Saude API", "docs": "/docs"}
