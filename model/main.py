import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

from convertImageFormat import convert_image_format
import numpy as np
import tensorflow as tf
from fastapi import FastAPI

app = FastAPI()

model = tf.keras.models.load_model('model.h5')

labels = [
    "airplane", "anvil", "banana", "car", "carrot", "donut", "door", "drill",
    "fork", "house", "lollipop", "microwave", "moon", "mushroom", "pants",
    "pencil", "pineapple", "radio", "shovel", "smiley face", "sun", "toe",
    "traffic light", "t-shirt", "wine glass"
]

def predict_from_base64(base64_img):
    image = convert_image_format(base64_img)
    prediction = model.predict(image)[0] 

    top_indices = prediction.argsort()[-2:][::-1]
    top_labels = [(labels[i], prediction[i]) for i in top_indices]

    return top_labels  

@app.post("/predict")
async def predict(base64_img: str, previous_label: str = None):
    top_predictions = predict_from_base64(base64_img)
    first_label, first_confidance = top_predictions[0]
    second_label, second_confidance = top_predictions[1]

    if previous_label == first_label:
        predicted_label = second_label
        confidence = second_confidance
    else:
        predicted_label = first_label
        confidence = first_confidance

    return {
        "prediction": predicted_label,
        "confidence": round(float(confidence), 2),
    }
