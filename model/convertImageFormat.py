import base64
from io import BytesIO
from PIL import Image
import numpy as np

def convert_image_format(imageBase64):
    header, image_data = imageBase64.split(',', 1)

    image_bytes = base64.b64decode(image_data)
    image = Image.open(BytesIO(image_bytes)).convert('L') 

    image = image.resize((128, 128)) 
    image_array = np.array(image).astype("float32") / 255.0
    image_array = image_array.reshape((1, 128, 128, 1))

    return image_array
