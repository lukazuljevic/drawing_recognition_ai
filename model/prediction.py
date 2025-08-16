import tensorflow as tf
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from convertImageFormat import convert_image_format
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Session
from datetime import datetime

from database import Base, get_db
from auth import User, get_current_user

api_router = APIRouter()

model = tf.keras.models.load_model("model.h5")

labels = [
    "airplane", "anvil", "banana", "car", "carrot", "donut", "door", "drill",
    "fork", "house", "lollipop", "microwave", "moon", "mushroom", "pants",
    "pencil", "pineapple", "radio", "shovel", "smiley face", "sun", "toe",
    "traffic light", "t-shirt", "wine glass"
]

class Prediction(Base):
    __tablename__ = "prediction"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    image_base64 = Column(String, nullable=False)
    predicted_label = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    correct = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", backref="predictions")

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
async def predict(
    request: PredictionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    predicted_label, confidence = predict_from_base64(request.imageBase64)

    new_prediction = Prediction(
        user_id=current_user.id,
        image_base64=request.imageBase64,
        predicted_label=predicted_label,
        confidence=float(confidence),
    )
    
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return {
        "prediction": predicted_label,
        "confidence": round(float(confidence), 2),
    }