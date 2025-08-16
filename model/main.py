from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from auth import api_router as auth_router
from prediction import api_router as prediction_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dovoljno za dev, promini kasnije,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(prediction_router, prefix="/api")

@app.get("/health", status_code=200)
async def health_check():
    return {"status": "ok"}
