import base64
from io import BytesIO
from PIL import Image
import numpy as np

def convert_image_format(imageBase64):
    header, image_data = imageBase64.split(',', 1)

    image_bytes = base64.b64decode(image_data)
    image = Image.open(BytesIO(image_bytes)).convert('L') 

    image = image.resize((28, 28)) 

    image_array = np.array(image)
    image_array = image_array.reshape((1, 28, 28, 1))

    print(f"Converted image to shape {image_array}")

    return image_array