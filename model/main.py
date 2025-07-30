import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

from convertImageFormat import convert_image_format
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()
api_router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model('model.h5')

labels = [
    "airplane", "anvil", "banana", "car", "carrot", "donut", "door", "drill",
    "fork", "house", "lollipop", "microwave", "moon", "mushroom", "pants",
    "pencil", "pineapple", "radio", "shovel", "smiley face", "sun", "toe",
    "traffic light", "t-shirt", "wine glass"
]

class PredictionRequest(BaseModel):
    imageBase64: str
    previousLabel: Optional[str] = None

def predict_from_base64(base64_img):
    image = convert_image_format(base64_img)
    prediction = model.predict(image)[0]

    top_index = prediction.argmax()
    top_label = labels[top_index]
    confidence = prediction[top_index]

    return top_label, confidence

@api_router.post("/prediction")
async def predict(request: PredictionRequest):
    predicted_label, confidence = predict_from_base64(request.imageBase64)

    return {
        "prediction": predicted_label,
        "confidence": round(float(confidence), 2),
    }

@api_router.get("/health")
async def health_check():
    return {"status": "ok"}

app.include_router(api_router)

