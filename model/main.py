

# app = FastAPI()

# @app.post("/predict")
# def predict(data: imageBase64):

# image = convert_image_format(imageBase64)

from fastapi import FastAPI
from convertImageFormat import convert_image_format
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf



model = tf.keras.models.load_model('model.h5')

def predict_from_base64(base64_img):
    img_array = convert_image_format(base64_img)
    prediction = model.predict(img_array) 
    predicted_class = np.argmax(prediction, axis=1)[0]
    confidence = prediction[0][predicted_class]
    print(f"Predicted class: {prediction}, Confidence: {confidence}")

